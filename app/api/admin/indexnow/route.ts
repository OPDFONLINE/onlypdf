import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/admin";
import { selectNewlyLivePosts, submitToIndexNow } from "@/lib/seo/indexnow";
import sitemap from "@/app/sitemap";

const COOLDOWN_KEY = "indexnow_last_manual";
const LAST_RUN_KEY = "indexnow_last_run";
const COOLDOWN_MS = 10 * 60 * 1000; // search engines ask for sensible spacing between submissions
const FALLBACK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Admin buttons.
 *  mode "all": every URL in sitemap.xml, in one request.
 *  mode "new": articles that went live on their own (future published_at that has
 *              passed) since the last time this button was used. Articles saved
 *              while already live were pinged at save time, so they are skipped.
 */
export async function POST(request: Request) {
  const context = await getAdminContext();
  if (!context) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { mode?: unknown } | null;
  const mode = body?.mode === "new" ? "new" : "all";
  const db = context.supabase;
  const now = new Date();

  const { data: rows } = await db.from("site_settings").select("key, value").in("key", [COOLDOWN_KEY, LAST_RUN_KEY]);
  const stored = Object.fromEntries((rows ?? []).map((row) => [row.key as string, (row.value as string | null) ?? ""]));

  const last = stored[COOLDOWN_KEY] ? new Date(stored[COOLDOWN_KEY]).getTime() : 0;
  if (Number.isFinite(last) && now.getTime() - last < COOLDOWN_MS) {
    const minutes = Math.ceil((COOLDOWN_MS - (now.getTime() - last)) / 60000);
    return NextResponse.json({ error: `Already submitted recently. Try again in about ${minutes} minute(s).` }, { status: 429 });
  }

  let urls: string[];
  let candidates = 0;
  if (mode === "all") {
    urls = (await sitemap()).map((entry) => entry.url);
  } else {
    const parsed = stored[LAST_RUN_KEY] ? new Date(stored[LAST_RUN_KEY]) : null;
    const since = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date(now.getTime() - FALLBACK_WINDOW_MS);
    const { data: posts, error } = await db
      .from("blog_posts")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .gt("published_at", since.toISOString())
      .lte("published_at", now.toISOString());
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const live = selectNewlyLivePosts(posts ?? [], since, now);
    candidates = live.length;
    if (live.length === 0) {
      await db.from("site_settings").upsert({ key: LAST_RUN_KEY, value: now.toISOString(), updated_at: now.toISOString() }, { onConflict: "key" });
      return NextResponse.json({ ok: true, submitted: 0, candidates: 0, message: "No scheduled articles went live since the last check. Nothing to send." });
    }
    urls = [...live.map((post) => `/blog/${post.slug}`), "/blog"];
  }

  const result = await submitToIndexNow(urls);
  if (result.skipped === "not-production") {
    return NextResponse.json({ ...result, candidates, message: "Skipped: IndexNow only runs on the production deployment." });
  }
  if (result.skipped === "disabled") {
    return NextResponse.json({ ...result, candidates, message: "Skipped: INDEXNOW_DISABLED is set to true." });
  }
  if (result.ok) {
    const stamp = now.toISOString();
    const writes = [{ key: COOLDOWN_KEY, value: stamp, updated_at: stamp }];
    if (mode === "new") writes.push({ key: LAST_RUN_KEY, value: stamp, updated_at: stamp });
    await db.from("site_settings").upsert(writes, { onConflict: "key" });
  }
  return NextResponse.json({ ...result, candidates }, { status: result.ok ? 200 : 502 });
}
