import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Server-side Supabase client bound to the current request's cookies, so it
 * reflects whoever is signed in (or isn't). Use this for anything that needs
 * to know "who is the current admin" — session checks, admin_users lookups,
 * and authenticated writes from route handlers.
 *
 * Returns null when Supabase hasn't been configured yet, so callers can show
 * a friendly "connect Supabase" message instead of crashing.
 */
export async function createSupabaseServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render, where cookies can't be
          // written. Middleware (middleware.ts) refreshes the session
          // cookie on every /admin request instead, so this is safe to
          // ignore here.
        }
      },
    },
  });
}
