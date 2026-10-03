// Pure helpers for rate limiting. No server-only or database imports here, so
// they are easy to unit-test. The database-backed limiter lives in
// lib/rate-limit.ts.
import { createHash } from "node:crypto";

export type RateLimitResult = { allowed: boolean; retryAfter: number };

/**
 * The visitor's IP as seen by the platform. On Vercel the x-vercel-forwarded-for
 * and x-forwarded-for headers are set by Vercel itself, so a visitor cannot
 * choose them. Returns null when no address is available (for example when
 * running locally), in which case per-visitor limits are skipped.
 */
export function getClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
  ];
  for (const value of candidates) {
    const ip = value?.trim();
    if (ip && ip.length <= 64) return ip;
  }
  return null;
}

/**
 * One-way, salted hash of the IP so the raw address is never stored. Only the
 * first 32 hex characters are kept; that is plenty to tell visitors apart.
 */
export function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

// ---- In-memory fixed-window limiter -------------------------------------
// Each serverless instance keeps its own counters, so this is a cheap first
// line of defence and a fallback, not a global guarantee.
const memory = new Map<string, { count: number; resetAt: number }>();
const MAX_KEYS = 5000;

export function memoryRateLimit(key: string, limit: number, windowMs: number, now = Date.now()): RateLimitResult {
  if (memory.size > MAX_KEYS) {
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
    // Still too big (a flood of unique keys): start over rather than grow.
    if (memory.size > MAX_KEYS) memory.clear();
  }
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) return { allowed: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  return { allowed: true, retryAfter: 0 };
}

export function resetMemoryRateLimits() {
  memory.clear();
}
