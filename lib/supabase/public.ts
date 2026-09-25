import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/public-env";

/**
 * A Supabase client that never touches cookies, so it's safe to call from
 * inside unstable_cache() (used by lib/supabase/tools.ts to cache the
 * public tool-settings read). It uses the anon key, so it can only read
 * whatever the "Anyone can read ..." RLS policies allow — never write.
 *
 * Returns null when Supabase hasn't been configured yet.
 */
export function createSupabasePublicClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
