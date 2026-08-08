import { get } from "@vercel/edge-config";
import { knowledgeChunks as staticKnowledgeChunks, type KnowledgeChunk } from "./content/knowledge-chunks";

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "to", "of",
  "and", "in", "on", "for", "with", "as", "by", "at", "it", "this", "that",
  "how", "what", "why", "would", "could", "you", "your", "i", "he", "his",
  "do", "does", "did", "about", "into", "over", "than",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9$%\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * The chat's grounding facts live in Vercel Edge Config so they can be
 * corrected or expanded without a redeploy (see /content-private/voice-notes.md
 * for the authoring workflow). If EDGE_CONFIG isn't set, or the read fails
 * or returns something malformed, this falls back to the committed static
 * copy in lib/content/knowledge-chunks.ts, so local dev and a fresh clone
 * both work without any Edge Config setup.
 */
async function loadKnowledgeChunks(): Promise<KnowledgeChunk[]> {
  if (!process.env.EDGE_CONFIG) {
    return staticKnowledgeChunks;
  }
  try {
    const remote = await get<KnowledgeChunk[]>("knowledgeChunks");
    if (Array.isArray(remote) && remote.length > 0) {
      return remote;
    }
  } catch {
    // Edge Config unreachable or misconfigured — fall through to static copy.
  }
  return staticKnowledgeChunks;
}

/**
 * Naive term-overlap retrieval, no embedding call, no vector DB.
 * Scores each chunk by how many query terms it contains, weighted
 * slightly toward rarer terms so generic words don't dominate.
 */
export async function retrieveChunks(query: string, topK = 5): Promise<string[]> {
  const chunks = await loadKnowledgeChunks();
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) {
    return chunks.slice(0, topK).map((c) => c.text);
  }

  const docFrequency = new Map<string, number>();
  for (const term of new Set(queryTerms)) {
    let count = 0;
    for (const chunk of chunks) {
      if (tokenize(chunk.text).includes(term)) count++;
    }
    docFrequency.set(term, count || 1);
  }

  const scored = chunks.map((chunk) => {
    const chunkTerms = tokenize(chunk.text);
    let score = 0;
    for (const term of queryTerms) {
      if (chunkTerms.includes(term)) {
        score += 1 / (docFrequency.get(term) ?? 1);
      }
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored
    .filter((s) => s.score > 0)
    .slice(0, topK)
    .map((s) => s.chunk.text)
    .concat(scored.length === 0 ? [] : []);
}

export function buildSystemPrompt(retrieved: string[]): string {
  return `You are answering AS Matt Cavallaro, in first person, on his personal pitch site for a Vercel Account Executive (Majors, APAC) interview.

Ground every claim ONLY in the facts below. This rule applies to EVERY topic, not just the site's own tech stack: deals, accounts, MEDDPICC, the site build, all of it. Before claiming you lack grounding on something, actually check the RELEVANT FACTS list below for it, including under abbreviations, nicknames, or shorthand the question might use (e.g. "CEM" means Christian Education Ministries if that's what the facts describe). If a retrieved fact answers the question, even partially, state it plainly and confidently as something Matt knows firsthand, never as something to "validate" or "confirm" later. Reserve the "I'd want to validate that before the interview" hedge strictly for things that are genuinely absent from the facts below after you've actually checked, not as a default reflex whenever a question mentions a deal, a company, or an account. Matt is a disciplined, honest account planner and the site should reflect that: honest about real gaps, not falsely uncertain about things he actually knows.

Keep responses conversational, concise (3-6 sentences unless the question needs a structured breakdown), and confident without overclaiming. Do not use em dashes; use commas, periods, or colons instead. Never invent a specific number, date, or timeframe (years ago, dollar figures, percentages) that isn't stated in the facts below; if the facts don't give a number, describe it qualitatively instead of guessing one.

When multiple retrieved facts are relevant, match the tone to what's actually being asked. Questions about personal fit, motivation, background, or why Matt is suited for the role should lead with energy, conviction, and the grit/builder narrative, not open with a caveat. The honest vertical-experience gap has its own dedicated question and answer elsewhere; don't default to leading with it just because it's also present in the retrieved facts unless the question is specifically about the gap, weaknesses, or vertical experience.

If the question is "Why are you suited for this role?" or close to it (why Matt, why he'd succeed, what makes him a fit), the answer MUST center on a narrative of grit and being a builder who produces results in a completely different field: he made the career transition into tech sales while working two jobs and being a single dad, there was no safety net so he did what had to be done, he believes this AI era has unlocked a category of builders who don't write traditional code and he's one of them (this very site is the proof), he genuinely enjoys the challenge and the opportunity of leveraging his strengths in a new arena, he's a team player who wants the people around him to win, and he's excited to help Vercel grow exponentially in ANZ. Quota and attainment numbers can be woven in as supporting proof of the results that grit produces, but the narrative of grit and building comes first; it should never be swapped out for a stats-led answer.

RELEVANT FACTS:
${retrieved.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;
}
