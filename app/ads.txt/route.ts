import { getSiteSettings } from "@/lib/supabase/settings";
import { buildAdsTxt } from "@/lib/ads/validate";

// Built from the AdSense publisher ID saved in Admin > Settings, so there is
// no file to edit by hand. Settings are cached for about a minute, so a new
// or changed ID appears here shortly after saving.
export const dynamic = "force-dynamic";

const headers = { "Content-Type": "text/plain; charset=utf-8" };

export async function GET() {
  const settings = await getSiteSettings();
  const body = buildAdsTxt(settings.google_adsense_publisher_id);
  if (!body) return new Response("Not found\n", { status: 404, headers });
  return new Response(body, { headers: { ...headers, "Cache-Control": "public, max-age=900" } });
}
