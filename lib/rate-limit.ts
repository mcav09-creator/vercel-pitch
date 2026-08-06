/**
 * Best-effort, in-process rate limit for the chat route.
 *
 * The authoritative enforcement is a Vercel Firewall custom rule (path
 * `/api/chat`, rate_limit action, keyed by IP) staged on this project —
 * see the PR description for the exact rule and its publish status. That
 * rule is edge-level and holds even under cold starts or multi-region
 * traffic, which this in-memory check cannot guarantee on its own since
 * Fluid Compute instances don't share memory across regions or across
 * scale-up events. This module exists as an immediate, zero-provisioning
 * second layer: it catches abusive bursts hitting a single warm instance
 * without waiting on the firewall rule to be reviewed and published.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

// Prevent unbounded growth of the map across a long-lived warm instance.
const MAX_TRACKED_KEYS = 5_000;

export function checkInProcessRateLimit(key: string): {
  limited: boolean;
  remaining: number;
} {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart >= WINDOW_MS) {
    if (buckets.size >= MAX_TRACKED_KEYS) {
      buckets.clear();
    }
    buckets.set(key, { count: 1, windowStart: now });
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  existing.count += 1;
  if (existing.count > MAX_REQUESTS_PER_WINDOW) {
    return { limited: true, remaining: 0 };
  }

  return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - existing.count };
}
