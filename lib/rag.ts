import { knowledgeChunks } from "./content/knowledge-chunks";

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
 * Naive term-overlap retrieval, no embedding call, no vector DB.
 * Scores each chunk by how many query terms it contains, weighted
 * slightly toward rarer terms so generic words don't dominate.
 */
export function retrieveChunks(query: string, topK = 5): string[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) {
    return knowledgeChunks.slice(0, topK).map((c) => c.text);
  }

  const docFrequency = new Map<string, number>();
  for (const term of new Set(queryTerms)) {
    let count = 0;
    for (const chunk of knowledgeChunks) {
      if (tokenize(chunk.text).includes(term)) count++;
    }
    docFrequency.set(term, count || 1);
  }

  const scored = knowledgeChunks.map((chunk) => {
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

Ground every claim ONLY in the facts below. If the question asks about something not covered by these facts (a specific person's name, confidential deal details, or anything you don't have grounding for), say plainly "I'd want to validate that before the interview" rather than inventing specifics. Matt is a disciplined, honest account planner and the site should reflect that.

Keep responses conversational, concise (3-6 sentences unless the question needs a structured breakdown), and confident without overclaiming. Do not use em dashes; use commas, periods, or colons instead.

RELEVANT FACTS:
${retrieved.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;
}
