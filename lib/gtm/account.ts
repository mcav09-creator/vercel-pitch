import { generateText, Output } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { get, put } from "@vercel/blob";
import { z } from "zod";
import type { GtmAccount } from "./accounts";
import {
  DATADOG_CONTEXT,
  TONE_RULES,
  GTM_MODEL,
  citedSources,
  formatSourcesForPrompt,
  runSearches,
  sydneyDate,
  validIds,
  type Source,
} from "./search";

export type Cited = { text: string; sourceIds: number[] };

export type Stakeholder = {
  role: string;
  name: string | null;
  why: string;
  sourceIds: number[];
};

export type SequenceStep = {
  day: number;
  channel: "Email" | "LinkedIn" | "Call";
  owner: "BDR" | "AE";
  persona: string;
  subject: string;
  message: string;
};

export type AccountDive = {
  slug: string;
  account: string;
  date: string;
  generatedAt: string;
  existingCustomer: boolean;
  snapshot: Cited;
  whyNow: Cited[];
  priorities: Cited[];
  stakeholders: Stakeholder[];
  angle: { hypothesis: string; entryPoint: string; proofPoint: string };
  objections: { objection: string; response: string }[];
  sequence: SequenceStep[];
  sources: Source[];
};

const cited = z.object({
  text: z.string(),
  sourceIds: z.array(z.number()),
});

const diveSchema = z.object({
  snapshot: cited.describe("Two or three sentences: what this institution is, its scale and current direction"),
  whyNow: z.array(cited).max(4).describe("Recent, specific signals that make now a good time to engage"),
  priorities: z.array(cited).max(4).describe("Stated strategic or digital priorities"),
  stakeholders: z
    .array(
      z.object({
        role: z.string().describe("Job title or function to target, e.g. Chief Information Officer"),
        name: z
          .string()
          .nullable()
          .describe("Person's name ONLY if it appears verbatim in the cited sources, otherwise null"),
        why: z.string().describe("Why this person matters to the deal, in one sentence"),
        sourceIds: z.array(z.number()),
      }),
    )
    .max(5),
  angle: z.object({
    hypothesis: z.string().describe("The specific problem Datadog could solve here, tied to the signals"),
    entryPoint: z.string().describe("Where to land first: which system, team or use case"),
    proofPoint: z.string().describe("The most relevant proof point or reference from the context"),
  }),
  objections: z
    .array(z.object({ objection: z.string(), response: z.string() }))
    .max(3),
  sequence: z
    .array(
      z.object({
        day: z.number().describe("Day of the sequence, starting at 1"),
        channel: z.enum(["Email", "LinkedIn", "Call"]),
        owner: z.enum(["BDR", "AE"]).describe("BDR for early technical-team touches, AE for executive touches"),
        persona: z.string().describe("Who the touch is for, by role"),
        subject: z.string().describe("Email subject, or a short label for LinkedIn and calls"),
        message: z
          .string()
          .describe("The message itself, ready to send, under 110 words. Use [First name] if no name is known."),
      }),
    )
    .min(4)
    .max(5),
});

export async function generateAccountDive(account: GtmAccount): Promise<AccountDive> {
  const n = account.name;
  const sources = await runSearches(
    [
      [`${n} news`, `${n} announcement`, `${n} job cuts OR restructure OR budget`],
      [
        `${n} strategic plan`,
        `${n} digital strategy technology`,
        `${n} IT outage OR cyber incident OR system issue`,
        `${n} cloud OR AI OR technology partnership`,
      ],
      [
        `${n} chief information officer`,
        `${n} chief digital officer OR director of IT`,
        `${n} vice-chancellor`,
      ],
    ],
    { maxResults: 7 },
  );

  if (sources.length === 0) throw new Error("Search returned no sources");

  const customerNote = account.existingCustomer
    ? `${n} is ALREADY a Datadog customer. Frame everything as expansion and reference, not a new logo.`
    : `${n} is not a known Datadog customer. Frame this as a new-logo pursuit.`;

  const { output } = await generateText({
    model: gateway(GTM_MODEL),
    output: Output.object({ schema: diveSchema }),
    system: `You are an expert enterprise sales strategist preparing an account plan for Matt Cavallaro, a Datadog AE covering Australian higher education.

${DATADOG_CONTEXT}

Rules:
- Facts about the institution (snapshot, signals, priorities, people) must come ONLY from the numbered sources and cite their ids. Never invent facts, numbers, dates or names.
- A stakeholder's name is allowed only if it appears verbatim in a cited source; otherwise set name to null and give the role.
- Prefer recent signals. If the sources are thin, say less rather than guessing.
- The angle, objections and sequence are your recommendations; keep them grounded in the signals you found.
- The sequence is 4 or 5 touches over about two weeks, mixing email, LinkedIn and a call, written in Matt's voice: warm, specific, peer-to-peer, no hype, no jargon. Reference a real signal in the first touch.
- Australian English spelling. Never use em dashes.

${TONE_RULES}`,
    prompt: `Account: ${n} (${account.state}). ${customerNote}\nToday is ${sydneyDate()} (Sydney).\n\nSOURCES:\n${formatSourcesForPrompt(sources)}`,
  });

  if (!output) throw new Error("No account plan generated");

  const allCited: number[] = [];
  const keep = (c: { text: string; sourceIds: number[] }): Cited | null => {
    const ids = validIds(c.sourceIds, sources);
    if (ids.length === 0) return null;
    allCited.push(...ids);
    return { text: c.text, sourceIds: ids };
  };

  const snapshot = keep(output.snapshot) ?? { text: output.snapshot.text, sourceIds: [] };

  const stakeholders: Stakeholder[] = output.stakeholders.map((s) => {
    const ids = validIds(s.sourceIds, sources);
    allCited.push(...ids);
    // Keep a name only if it really appears in a cited source.
    const haystack = citedSources(sources, ids)
      .map((src) => `${src.title} ${src.snippet}`)
      .join(" ")
      .toLowerCase();
    const name = s.name && haystack.includes(s.name.toLowerCase()) ? s.name : null;
    return { role: s.role, name, why: s.why, sourceIds: ids };
  });

  return {
    slug: account.slug,
    account: n,
    date: sydneyDate(),
    generatedAt: new Date().toISOString(),
    existingCustomer: Boolean(account.existingCustomer),
    snapshot,
    whyNow: output.whyNow.map(keep).filter((c): c is Cited => c !== null),
    priorities: output.priorities.map(keep).filter((c): c is Cited => c !== null),
    stakeholders,
    angle: output.angle,
    objections: output.objections,
    sequence: [...output.sequence].sort((a, b) => a.day - b.day),
    sources: citedSources(sources, allCited),
  };
}

function cachePath(slug: string, date: string) {
  return `gtm/accounts/${slug}-${date}.json`;
}

export async function getCachedDive(slug: string): Promise<AccountDive | null> {
  try {
    const result = await get(cachePath(slug, sydneyDate()), { access: "private" });
    if (!result) return null;
    return JSON.parse(await new Response(result.stream).text()) as AccountDive;
  } catch {
    return null;
  }
}

export async function saveDive(dive: AccountDive): Promise<void> {
  await put(cachePath(dive.slug, dive.date), JSON.stringify(dive), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
