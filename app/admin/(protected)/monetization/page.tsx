import type { Metadata } from "next";
import { getAdminContext } from "@/lib/supabase/admin";
import { MonetizationManager } from "@/components/admin/MonetizationManager";

export const metadata: Metadata = { title: "Monetization" };

export default async function AdminMonetizationPage() {
  const context = await getAdminContext();
  const { data } = context
    ? await context.supabase.from("ad_placements").select("id, placement_key, provider, enabled, slot_id, notes").order("placement_key")
    : { data: [] };
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Monetization</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">Configure ad providers and placements without hard-coding one network. Keep ads away from upload, processing, and download controls.</p>
      <MonetizationManager initialPlacements={data ?? []} />
    </div>
  );
}
