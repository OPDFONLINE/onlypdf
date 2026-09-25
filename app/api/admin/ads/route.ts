import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/admin";

const PROVIDERS = new Set(["none", "adsense", "journey", "ezoic", "direct"]);

export async function PATCH(request: Request) {
  const context = await getAdminContext();
  if (!context) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string") {
    return NextResponse.json({ error: "Placement id is required." }, { status: 400 });
  }
  const provider = typeof body.provider === "string" && PROVIDERS.has(body.provider) ? body.provider : "none";
  const patch = {
    provider,
    enabled: Boolean(body.enabled),
    slot_id: typeof body.slot_id === "string" ? body.slot_id.trim() || null : null,
    notes: typeof body.notes === "string" ? body.notes.trim() || null : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await context.supabase.from("ad_placements").update(patch).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
