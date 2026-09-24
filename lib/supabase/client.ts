"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Browser-side Supabase client, used only by the admin login form
 * (components/admin/AdminLoginForm.tsx) to call supabase.auth.signInWithPassword
 * and supabase.auth.signOut. Every other admin read/write goes through a
 * Server Component or a route handler instead.
 */
export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase isn't configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
