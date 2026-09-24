import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Privileged Supabase client using the service-role key. This bypasses row
 * level security entirely, so it's reserved for a small number of trusted,
 * server-only operations — currently just writing analytics_events rows
 * from route handlers, since that table intentionally has no public insert
 * policy (see supabase/migrations/0001_admin_foundation.sql).
 *
 * The "server-only" import makes any accidental Client Component import of
 * this file fail at build time instead of silently shipping the service
 * key. Never call this from anything under a "use client" file.
 */
export function createSupabaseServiceClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
