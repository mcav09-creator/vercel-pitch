import { generateText, isStepCount } from "ai";
import { gateway } from "@ai-sdk/gateway";

export const GTM_MODEL = "anthropic/claude-sonnet-5";

/** Low-quality, partisan or social sources the brief should never cite. */
const EXCLUDED_DOMAINS = [
  "-wsws.org",
  "-reddit.com",
  "-facebook.com",
  "-x.com",
  "-twitter.com",
  "-tiktok.com",
  "-youtube.com",
  "-instagram.com",
  "-quora.com",
  "-pinterest.com",
  "-medium.com",
];

export type Source = {
  id: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  date?: string;
};

export function aiConfigured(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);
}

/**
 * Runs live web searches through AI Gateway's Perplexity Search tool and
 * returns a de-duplicated, numbered list of real sources.
 *
 * Search is a separate step from writing on purpose: the writing step only
 * ever sees these numbered sources and can only cite them by id, and the
 * server maps ids back to URLs. So every link on the page is a link the
 * search actually returned, never one a model made up.
 */
export async function runSearches(
  queryGroups: string[][],
  options: { recency?: "day" | "week" | "month" | "year"; maxResults?: number } = {},
): Promise<Source[]> {
  const groups = queryGroups.map((g) => g.slice(0, 5)).filter((g) => g.length > 0);
  const instructions = groups
    .map((g, i) => `Call ${i + 1}: query = ${JSON.stringify(g)}`)
    .join("\n");

  const result = await generateText({
    model: gateway(GTM_MODEL),
    tools: {
      perplexity_search: gateway.tools.perplexitySearch({
        country: "AU",
        searchLanguageFilter: ["en"],
        searchDomainFilter: EXCLUDED_DOMAINS,
        maxResults: options.maxResults ?? 8,
        maxTokensPerPage: 512,
        ...(options.recency ? { searchRecencyFilter: options.recency } : {}),
      }),
    },
    stopWhen: isStepCount(groups.length + 2),
    system:
      "You are a search runner. Call the perplexity_search tool exactly once for each call listed, using the query array exactly as given. Run them all, then reply with the single word DONE. Do not summarise.",
    prompt: instructions,
  });

  const found: Omit<Source, "id">[] = [];
  const seen = new Set<string>();

  const visit = (value: unknown, depth: number) => {
    if (depth > 8 || value === null || typeof value !== "object") return;
    if (Array.isArray(value)) {
      for (const v of value) visit(v, depth + 1);
      return;
    }
    const obj = value as Record<string, unknown>;
    if (typeof obj.url === "string" && typeof obj.title === "string") {
      const url = normaliseUrl(obj.url);
      if (url && !seen.has(url)) {
        seen.add(url);
        found.push({
          title: obj.title.trim(),
          url,
          domain: new URL(url).hostname.replace(/^www\./, ""),
          snippet: typeof obj.snippet === "string" ? obj.snippet.slice(0, 700) : "",
          date:
            typeof obj.date === "string"
              ? obj.date
              : typeof obj.lastUpdated === "string"
                ? obj.lastUpdated
                : undefined,
        });
      }
      return;
    }
    for (const v of Object.values(obj)) visit(v, depth + 1);
  };

  for (const step of result.steps) {
    for (const part of step.content) {
      if (part.type === "tool-result") visit(part, 0);
    }
  }

  return found.map((s, i) => ({ ...s, id: i + 1 }));
}

function normaliseUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

export function formatSourcesForPrompt(sources: Source[]): string {
  return sources
    .map(
      (s) =>
        `[${s.id}] ${s.title} (${s.domain}${s.date ? `, ${s.date}` : ""})\n${s.snippet.replace(/\s+/g, " ").trim()}`,
    )
    .join("\n\n");
}

/** Keeps only source ids that exist, de-duplicated. */
export function validIds(ids: number[] | undefined, sources: Source[]): number[] {
  const known = new Set(sources.map((s) => s.id));
  return [...new Set((ids ?? []).filter((id) => known.has(id)))];
}

/** Only the sources actually cited, so the page carries no unused links. */
export function citedSources(sources: Source[], ids: Iterable<number>): Source[] {
  const wanted = new Set(ids);
  return sources.filter((s) => wanted.has(s.id));
}

export function sydneyDate(d = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export const TONE_RULES = `Judgement and tone (this is published on a public page a hiring manager will read):
- Never frame strikes, industrial action, job losses, redundancies, First Nations matters, student welfare, safety incidents or anyone's misfortune as a sales opportunity. Report them plainly as context.
- Only draw a sales angle where there is a genuine link to technology, digital services, AI, data, reliability, security or institutional strategy. If there's no honest angle, say what it means for the institution instead.
- Prefer reputable sources: government, universities, peak bodies, and established news and trade press.
- Be understated and specific. No hype, no forced connections.`;

export const DATADOG_CONTEXT = `Context for a Datadog Strategic Account Executive covering Australian higher education:
- Datadog is an observability and security platform: infrastructure and application monitoring, logs, digital experience and synthetic monitoring, cloud security, and LLM and AI agent observability (what an agent did, what data it touched, what it cost).
- Datadog runs a local site in the AWS Sydney Region (telemetry stays in Australia) and holds IRAP PROTECTED assessment, which removes data-sovereignty and procurement objections.
- UNSW Sydney is an existing, public Datadog customer: its platform team has presented at Datadog Summit and Datadog Live Sydney on making reliability a shared priority for engineering and leadership.
- The May 2026 Canvas (Instructure) breach took the LMS offline across many Australian universities right before exams; universities can't see inside critical third-party SaaS.
- Typical objections: consumption pricing vs fixed budgets; "Microsoft already covers this"; "observability is a nice-to-have".
- Datadog integrates with ServiceNow (incidents, CMDB) which many universities already run.
- The AE, Matt Cavallaro, has relationships with AWS solutions architects, the HEDx higher-ed community, and MortarCaps, and spent five years selling into Australian education at Salesforce.`;
