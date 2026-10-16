import { Ratelimit } from "@upstash/ratelimit";
import { keyPrefix, redis, visitorId } from "@/lib/redis";

// A visitor is counted at most once per 30 minutes, so reloads, tab-hopping and React Strict Mode's
// double-run effects in development don't inflate the number.
const DEDUPE_SECONDS = 30 * 60;
const totalKey = `${keyPrefix}:views:total`;

// Caps how often one visitor can hit this endpoint. Mainly protects the Upstash command quota: a script
// looping on this URL would otherwise burn through it, which would also switch off the contact form's
// rate limiter. Blocked visitors are remembered in memory, so repeat spam costs no Redis calls at all.
const limiter = redis
  ? new Ratelimit({ redis, prefix: `${keyPrefix}:views:limit`, limiter: Ratelimit.fixedWindow(10, "1 m") })
  : null;

// POST because it changes state (increments the counter); called by <VisitorCounter /> after the page
// loads, which keeps the page itself statically generated.
export async function POST(request: Request) {
  if (!redis || !limiter) return Response.json({ count: null });

  // Browsers always send Origin on POST, so this stops other websites from inflating the counter by making
  // their visitors' browsers call this endpoint. (Scripts like curl can still call it; the limiter covers those.)
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return Response.json({ count: null }, { status: 403 });
  }

  try {
    const id = visitorId(request.headers);
    if (!(await limiter.limit(id)).success) return Response.json({ count: null }, { status: 429 });

    // SET NX succeeds only if the key doesn't exist yet, i.e. this visitor hasn't been counted recently.
    const firstVisit = await redis.set(`${keyPrefix}:views:seen:${id}`, 1, { nx: true, ex: DEDUPE_SECONDS });
    const count = firstVisit ? await redis.incr(totalKey) : ((await redis.get<number>(totalKey)) ?? 0);
    return Response.json({ count });
  } catch (error) {
    console.error("[views] Redis unavailable", error);
    return Response.json({ count: null }, { status: 503 });
  }
}
