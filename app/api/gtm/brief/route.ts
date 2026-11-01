import {
  generateMorningBrief,
  getLatestBrief,
  isStale,
  saveBrief,
  type MorningBrief,
} from "@/lib/gtm/brief";
import { aiConfigured } from "@/lib/gtm/search";

export const maxDuration = 300;

// One generation at a time per warm instance, so a burst of first visitors
// doesn't trigger a burst of searches.
let inFlight: Promise<MorningBrief> | null = null;

/**
 * Returns the latest morning brief. The daily cron normally keeps it fresh;
 * if it's missing or more than 30 hours old (say the cron failed), this
 * rebuilds it once so the page never sits empty.
 */
export async function GET() {
  const latest = await getLatestBrief();
  if (!isStale(latest)) return Response.json(latest);

  if (!aiConfigured()) {
    return latest
      ? Response.json(latest)
      : new Response("AI Gateway is not configured", { status: 503 });
  }

  try {
    inFlight ??= generateMorningBrief().then(async (brief) => {
      await saveBrief(brief);
      return brief;
    });
    const brief = await inFlight;
    return Response.json(brief);
  } catch {
    return latest
      ? Response.json(latest)
      : new Response("Couldn't build the brief right now", { status: 502 });
  } finally {
    inFlight = null;
  }
}
