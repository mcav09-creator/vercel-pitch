import { ipAddress } from "@vercel/functions";
import { findAccount } from "@/lib/gtm/accounts";
import { generateAccountDive, getCachedDive, saveDive } from "@/lib/gtm/account";
import { aiConfigured } from "@/lib/gtm/search";

export const maxDuration = 300;

// Fresh account research costs real searches, so it's tighter than chat:
// 6 new deep dives per IP per 10 minutes. Cached dives don't count.
const WINDOW_MS = 10 * 60_000;
const MAX_NEW_DIVES = 6;
const buckets = new Map<string, { count: number; start: number }>();

function limited(key: string): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.start > WINDOW_MS) {
    if (buckets.size > 5_000) buckets.clear();
    buckets.set(key, { count: 1, start: now });
    return false;
  }
  b.count += 1;
  return b.count > MAX_NEW_DIVES;
}

const inFlight = new Map<string, Promise<unknown>>();

export async function POST(req: Request) {
  let slug = "";
  try {
    ({ slug } = (await req.json()) as { slug: string });
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  return handle(req, slug);
}

/** Same plan via GET (?slug=monash): idempotent, since each account is built once a day. */
export async function GET(req: Request) {
  return handle(req, new URL(req.url).searchParams.get("slug") ?? "");
}

async function handle(req: Request, slug: string) {
  const account = findAccount(slug);
  if (!account) return new Response("Unknown account", { status: 404 });

  // Each account is researched at most once a day; everyone after that
  // gets the cached plan instantly.
  const cached = await getCachedDive(account.slug);
  if (cached) return Response.json(cached);

  if (!aiConfigured()) {
    return new Response("AI Gateway is not configured", { status: 503 });
  }
  if (limited(ipAddress(req) ?? "unknown")) {
    return new Response("That's a lot of research in a short time. Try again in a few minutes.", {
      status: 429,
      headers: { "Retry-After": "600" },
    });
  }

  try {
    let job = inFlight.get(account.slug);
    if (!job) {
      job = generateAccountDive(account).then(async (dive) => {
        await saveDive(dive);
        return dive;
      });
      inFlight.set(account.slug, job);
    }
    return Response.json(await job);
  } catch {
    return new Response("Couldn't research that account right now. Try again shortly.", {
      status: 502,
    });
  } finally {
    inFlight.delete(account.slug);
  }
}
