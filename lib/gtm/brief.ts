import { generateText, Output } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { get, put } from "@vercel/blob";
import { z } from "zod";
import { territoryAccounts } from "./accounts";
import {
  GTM_MODEL,
  citedSources,
  formatSourcesForPrompt,
  runSearches,
  sydneyDate,
  validIds,
  type Source,
} from "./search";

export const BRIEF_PATHNAME = "gtm/morning-brief-latest.json";

export type BriefItem = {
  headline: string;
  summary: string;
  soWhat: string;
  sourceIds: number[];
  accounts: string[];
};

export type BriefSection = {
  key: "universities" | "policy" | "edtech" | "trends";
  title: string;
  items: BriefItem[];
};

export type MorningBrief = {
  date: string;
  generatedAt: string;
  topLine: string;
  conversationStarter: string;
  sections: BriefSection[];
  sources: Source[];
};

const SECTION_TITLES: Record<BriefSection["key"], string> = {
  universities: "University news",
  policy: "Policy & funding",
  edtech: "Ed-tech & IT",
  trends: "Trends to watch",
};

const itemSchema = z.object({
  headline: z.string().describe("Short, specific headline in Australian English"),
  summary: z.string().describe("One or two sentences on what happened, only from the sources"),
  soWhat: z
    .string()
    .describe("One sentence on why it matters to a seller of observability and AI governance into universities"),
  sourceIds: z.array(z.number()).describe("Ids of the sources this item is based on"),
  accounts: z
    .array(z.string())
    .describe("Slugs of territory accounts this item directly concerns, from the given list, or empty"),
});

const briefSchema = z.object({
  topLine: z.string().describe("One sentence: the single most important thing in Australian higher ed today"),
  conversationStarter: z
    .string()
    .describe("One natural line an AE could open a customer call with today, grounded in the news"),
  universities: z.array(itemSchema).max(4),
  policy: z.array(itemSchema).max(3),
  edtech: z.array(itemSchema).max(3),
  trends: z.array(itemSchema).max(3),
});

export async function generateMorningBrief(): Promise<MorningBrief> {
  const accountQueries = territoryAccounts.map((a) => `${a.name} news`);
  const sources = await runSearches(
    [
      [
        "Australian universities news",
        "Australian university announcement this week",
        "university job cuts restructure Australia",
        "university IT outage OR cyber incident Australia",
        "Universities Australia statement",
      ],
      [
        "Australian higher education policy funding announcement",
        "Universities Accord ATEC update",
        "international student caps Australia universities",
        "TEQSA regulation universities",
        "federal education minister universities announcement",
      ],
      [
        "edtech higher education Australia",
        "university AI policy Australia students",
        "university cloud digital transformation Australia",
        "university chief information officer Australia technology",
        "learning management system universities Australia",
      ],
      accountQueries.slice(0, 5),
      accountQueries.slice(5),
    ],
    { recency: "week", maxResults: 8 },
  );

  if (sources.length === 0) {
    throw new Error("Search returned no sources");
  }

  const accountList = territoryAccounts.map((a) => `${a.slug} = ${a.name}`).join("; ");

  const { output } = await generateText({
    model: gateway(GTM_MODEL),
    output: Output.object({ schema: briefSchema }),
    system: `You write a crisp morning briefing on Australian higher education for an enterprise account executive who sells observability and AI governance to universities.
Rules:
- Use ONLY the numbered sources provided. Every item must cite at least one source id. Never invent facts, names, numbers or dates.
- Prefer news from the past 7 days. Skip anything clearly older, anything not about Australian tertiary education, and duplicates.
- Australian English spelling. No em dashes. Plain, specific, no hype.
- Put each story in the best-fitting section; leave a section short or empty rather than padding it.
- Tag territory accounts only when the story is directly about that institution. Territory accounts: ${accountList}.`,
    prompt: `Today is ${sydneyDate()} (Sydney).\n\nSOURCES:\n${formatSourcesForPrompt(sources)}`,
  });

  if (!output) throw new Error("No brief generated");

  const slugs = new Set(territoryAccounts.map((a) => a.slug));
  const allCited: number[] = [];
  const clean = (items: z.infer<typeof itemSchema>[]): BriefItem[] =>
    items
      .map((item) => {
        const ids = validIds(item.sourceIds, sources);
        allCited.push(...ids);
        return {
          headline: item.headline,
          summary: item.summary,
          soWhat: item.soWhat,
          sourceIds: ids,
          accounts: item.accounts.filter((s) => slugs.has(s)),
        };
      })
      .filter((item) => item.sourceIds.length > 0);

  const sections: BriefSection[] = (["universities", "policy", "edtech", "trends"] as const).map(
    (key) => ({ key, title: SECTION_TITLES[key], items: clean(output[key]) }),
  );

  return {
    date: sydneyDate(),
    generatedAt: new Date().toISOString(),
    topLine: output.topLine,
    conversationStarter: output.conversationStarter,
    sections,
    sources: citedSources(sources, allCited),
  };
}

export async function saveBrief(brief: MorningBrief): Promise<void> {
  await put(BRIEF_PATHNAME, JSON.stringify(brief), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getLatestBrief(): Promise<MorningBrief | null> {
  try {
    const result = await get(BRIEF_PATHNAME, { access: "private" });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as MorningBrief;
  } catch {
    return null;
  }
}

export function isStale(brief: MorningBrief | null, maxHours = 30): boolean {
  if (!brief) return true;
  return Date.now() - new Date(brief.generatedAt).getTime() > maxHours * 3_600_000;
}
