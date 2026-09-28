import { unstable_cache } from "next/cache";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/public-env";

export type AdPlacement = { provider: string; enabled: boolean; slot_id: string | null };

const getCachedAdPlacement = unstable_cache(
  async (key: string): Promise<AdPlacement | null> => {
    if (!isSupabaseConfigured) return null;
    const supabase = createSupabasePublicClient();
    if (!supabase) return null;
    const { data } = await supabase.from("ad_placements").select("provider, enabled, slot_id").eq("placement_key", key).maybeSingle();
    return data ?? null;
  },
  ["public-ad-placement"],
  { tags: ["ad-placements"], revalidate: 60 }
);

export async function getAdPlacement(key: string) {
  return getCachedAdPlacement(key);
}
