import "server-only";
import { SITE_URL } from "@/lib/seo/metadata";

/**
 * IndexNow (Bing, Yandex, Naver, Seznam and others; Google does not take part).
 * The key is public by design: it must be readable at KEY_LOCATION so search
 * engines can confirm that we own the site. The matching file lives in /public.
 */
export const INDEXNOW_KEY = "482ae613ed5691c187b60ffb9031ed21";
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

export type IndexNowResult = {
  ok: boolean;
  /** HTTP status from the endpoint, or 0 when nothing was sent. */
  status: number;
  submitted: number;
  skipped?: "not-production" | "disabled" | "no-urls";
  message?: string;
};

/** Turns paths or URLs into unique absolute URLs on our own host; anything else is dropped. */
export function normalizeUrls(inputs: string[]): string[] {
  const host = new URL(SITE_URL).host;
  const seen = new Set<string>();
  for (const input of inputs) {
    // Only absolute http(s) URLs or root-relative paths, with no spaces or control characters.
    if (!/^(https?:\/\/|\/)[^\s\u0000-\u001f]*$/i.test(input)) continue;
    try {
      const url = new URL(input, SITE_URL);
      if (url.host !== host || (url.protocol !== "https:" && url.protocol !== "http:")) continue;
      url.protocol = "https:";
      url.hash = "";
      seen.add(url.toString());
    } catch {
      // ignore malformed entries
    }
  }
  return [...seen].slice(0, MAX_URLS_PER_REQUEST);
}

/** Only the real production deployment should notify search engines. */
export function indexNowEnabled(env: NodeJS.ProcessEnv = process.env): "ok" | "not-production" | "disabled" {
  if (env.INDEXNOW_DISABLED === "true") return "disabled";
  if (env.NODE_ENV !== "production") return "not-production";
  if (env.VERCEL_ENV && env.VERCEL_ENV !== "production") return "not-production";
  return "ok";
}

/**
 * Tells IndexNow that these URLs were added, changed or removed (removed pages
 * are fine too: the engine re-checks and sees the 404). Never throws; a failed
 * ping must not break an admin save. A 200 only means "received", not "indexed".
 */
export async function submitToIndexNow(inputs: string[]): Promise<IndexNowResult> {
  const state = indexNowEnabled();
  if (state !== "ok") return { ok: true, status: 0, submitted: 0, skipped: state };

  const urlList = normalizeUrls(inputs);
  if (urlList.length === 0) return { ok: true, status: 0, submitted: 0, skipped: "no-urls" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(SITE_URL).host, key: INDEXNOW_KEY, keyLocation: INDEXNOW_KEY_LOCATION, urlList }),
      signal: controller.signal,
      cache: "no-store",
    });
    const ok = response.status === 200 || response.status === 202;
    return { ok, status: response.status, submitted: ok ? urlList.length : 0, message: ok ? undefined : `IndexNow answered HTTP ${response.status}.` };
  } catch (error) {
    return { ok: false, status: 0, submitted: 0, message: error instanceof Error ? error.message : "IndexNow request failed." };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Posts that went live by themselves (future published_at passed) and were not
 * edited since. Posts saved while already live were pinged at save time, so
 * they are excluded to avoid duplicate submissions.
 */
export function selectNewlyLivePosts<T extends { slug: string; published_at: string | null; updated_at: string | null }>(
  posts: T[],
  since: Date,
  now: Date,
): T[] {
  return posts.filter((post) => {
    const published = post.published_at ? new Date(post.published_at) : null;
    const updated = post.updated_at ? new Date(post.updated_at) : null;
    if (!published || Number.isNaN(published.getTime())) return false;
    if (published <= since || published > now) return false;
    return !updated || Number.isNaN(updated.getTime()) || updated.getTime() <= published.getTime();
  });
}

/** True when the article is publicly visible right now (same rule as the public blog queries). */
export function postIsLive(post: { status: string; published_at: string | null }, now = new Date()): boolean {
  if (post.status !== "published" || !post.published_at) return false;
  const published = new Date(post.published_at);
  return !Number.isNaN(published.getTime()) && published.getTime() <= now.getTime();
}
