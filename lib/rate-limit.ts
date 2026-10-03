import "server-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { supabaseServiceRoleKey } from "@/lib/supabase/env";
import { getClientIp, hashIp, memoryRateLimit, type RateLimitResult } from "@/lib/rate-limit-core";

export { getClientIp, hashIp, memoryRateLimit };
export type { RateLimitResult };

/** Salted hash of the visitor's IP, or null when the platform gives us none. */
export function getClientKey(request: Request): string | null {
  const ip = getClientIp(request.headers);
  if (!ip) return null;
  return hashIp(ip, process.env.RATE_LIMIT_SALT || supabaseServiceRoleKey || "onlypdf");
}

/**
 * Counts one hit against a shared, database-backed fixed window, so the limit
 * holds across all serverless instances. Falls back to the in-memory limiter
 * if the database is unavailable, so a database hiccup never blocks real
 * visitors outright.
 */
export async function persistentRateLimit(bucket: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const supabase = createSupabaseServiceClient();
  if (supabase) {
    const { data, error } = await supabase.rpc("rate_limit_hit", {
      p_bucket: bucket,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (!error && typeof data === "boolean") {
      const retryAfter = data ? 0 : windowSeconds - (Math.floor(Date.now() / 1000) % windowSeconds);
      return { allowed: data, retryAfter };
    }
    console.error("rate_limit_hit failed, using in-memory fallback", error?.message);
  }
  return memoryRateLimit(bucket, limit, windowSeconds * 1000);
}
