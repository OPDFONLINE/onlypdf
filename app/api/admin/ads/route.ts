import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/admin";
import { isValidAdsenseSlotId } from "@/lib/ads/validate";

const PROVIDERS = new Set(["none", "adsense", "journey", "ezoic", "direct"]);

export async function PATCH(request: Request) {
  const context = await getAdminContext();
  if (!context) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string") {
    return NextResponse.json({ error: "Placement id is required." }, { status: 400 });
  }
  const provider = typeof body.provider === "string" && PROVIDERS.has(body.provider) ? body.provider : "none";
  const slotId = typeof body.slot_id === "string" ? body.slot_id.trim() || null : null;
  const notes = typeof body.notes === "string" ? body.notes.trim() || null : null;
  if (slotId && slotId.length > 100) return NextResponse.json({ error: "Slot ID is too long." }, { status: 400 });
  if (notes && notes.length > 500) return NextResponse.json({ error: "Notes are too long (500 characters max)." }, { status: 400 });
  if (provider === "adsense" && slotId && !isValidAdsenseSlotId(slotId)) {
    return NextResponse.json({ error: "An AdSense ad unit (slot) ID is digits only, for example 1234567890." }, { status: 400 });
  }
  if (provider === "adsense" && Boolean(body.enabled) && !slotId) {
    return NextResponse.json({ error: "Add the AdSense ad unit (slot) ID before enabling this placement." }, { status: 400 });
  }
  const patch = {
    provider,
    enabled: Boolean(body.enabled),
    slot_id: slotId,
    notes,
    updated_at: new Date().toISOString(),
  };
  const { error } = await context.supabase.from("ad_placements").update(patch).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
