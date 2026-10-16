import "server-only";
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

/**
 * Shared Upstash Redis client (HTTP-based, so it suits serverless functions with no connection pool).
 * `null` when the env vars aren't set: features that use it (rate limiting, visitor counter) switch off
 * instead of crashing, so the site still runs locally without an Upstash account.
 */
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? // Fail fast (~0.3s) if Upstash is down, instead of the default 5 retries (~4s) that would stall every request.
      Redis.fromEnv({ retry: { retries: 2, backoff: (retryCount) => 100 * 2 ** retryCount } })
    : null;

/** Namespaces every key by deployment, so local dev and Vercel previews never touch production data. */
export const keyPrefix = `portfolio:${process.env.VERCEL_ENV ?? "development"}`;

/**
 * Identifies a visitor by a hash of their IP address, so raw IPs are never stored.
 * On Vercel, `x-forwarded-for` is set by the platform and can't be spoofed by the client;
 * when self-hosting without a trusted proxy in front, it can be.
 */
export function visitorId(headers: { get(name: string): string | null }): string {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
