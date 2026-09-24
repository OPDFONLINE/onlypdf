export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * True once the public Supabase URL + anon key are set. This is what the
 * admin panel, login page, and public tool-settings reader check before
 * trying to talk to Supabase at all, so the site works out of the box
 * before anyone has connected a project.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * True once the service-role key is also set. Only privileged, server-only
 * code (see service.ts) needs this — it's never read from a Client Component.
 */
export const isSupabaseServiceConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);
