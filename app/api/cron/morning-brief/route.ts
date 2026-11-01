import { generateMorningBrief, saveBrief } from "@/lib/gtm/brief";
import { aiConfigured } from "@/lib/gtm/search";

// Search plus writing can take a minute or two; give it room.
export const maxDuration = 300;

/** Runs daily before 6am Sydney time (see vercel.json). */
export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!aiConfigured()) {
    return new Response("AI Gateway is not configured", { status: 503 });
  }

  const brief = await generateMorningBrief();
  await saveBrief(brief);

  return Response.json({
    ok: true,
    date: brief.date,
    items: brief.sections.reduce((n, s) => n + s.items.length, 0),
    sources: brief.sources.length,
  });
}
