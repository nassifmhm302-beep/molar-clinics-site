// Lightweight in-memory rate limiter suitable for a single Node.js instance.
// Protects public form endpoints from accidental double submits and basic spam.
const hits = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 60_000;

export function isRateLimited(key: string, limit = 5): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) {
    return true;
  }
  return false;
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
