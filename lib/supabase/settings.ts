import { unstable_cache } from "next/cache";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/public-env";

const getCachedSiteSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    if (!isSupabaseConfigured) return {};
    const supabase = createSupabasePublicClient();
    if (!supabase) return {};
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["site_name", "site_tagline", "homepage_title", "homepage_description"]);
    return Object.fromEntries((data ?? []).map((row) => [row.key, row.value ?? ""]));
  },
  ["public-site-settings"],
  { tags: ["site-settings"], revalidate: 60 },
);

export async function getSiteSettings() {
  return getCachedSiteSettings();
}
