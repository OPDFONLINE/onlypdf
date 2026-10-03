import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getAdminContext } from "@/lib/supabase/admin";
import { isValidAdsensePublisherId } from "@/lib/ads/validate";

const ALLOWED_KEYS = new Set([
  "site_name",
  "site_tagline",
  "homepage_title",
  "homepage_description",
  "contact_email",
  "default_author",
  "google_site_verification",
  "google_adsense_publisher_id",
  "other_verification_meta",
]);

export async function PATCH(request: Request) {
  const context = await getAdminContext();
  if (!context) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const updates = Object.entries(body as Record<string, unknown>)
    .filter(([key, value]) => ALLOWED_KEYS.has(key) && typeof value === "string")
    .map(([key, value]) => ({ key, value: String(value).trim(), updated_at: new Date().toISOString() }));

  if (updates.length === 0) return NextResponse.json({ error: "No valid settings supplied." }, { status: 400 });

  for (const { key, value } of updates) {
    if (value.length > (key === "other_verification_meta" ? 2000 : 500)) {
      return NextResponse.json({ error: `The value for "${key}" is too long.` }, { status: 400 });
    }
    if (key === "google_adsense_publisher_id" && value !== "" && !isValidAdsensePublisherId(value)) {
      return NextResponse.json({ error: "Enter the AdSense publisher ID as ca-pub- followed by 16 digits, for example ca-pub-1234567890123456. Leave it empty to turn AdSense off." }, { status: 400 });
    }
  }

  const { error } = await context.supabase.from("site_settings").upsert(updates, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  revalidateTag("site-settings");
  return NextResponse.json({ ok: true });
}
