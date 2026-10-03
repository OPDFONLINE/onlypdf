/**
 * <lastmod> values for sitemap.xml.
 *
 * Search engines only trust lastmod when it matches real content changes, and
 * stop using it for sites that report "now" on every request. So every date
 * here is either a stored edit time (blog posts, tools edited in the admin) or
 * a fixed constant below.
 *
 * MAINTENANCE: when you change the visible content of one of these pages in
 * code, bump its date below (YYYY-MM-DD) in the same commit.
 */
export const STATIC_PAGE_LASTMOD = {
  about: "2026-10-03",
  contact: "2026-10-03",
  privacy: "2026-10-03",
  terms: "2026-10-03",
  /** Tool pages and the homepage when no admin edit or newer article is later. */
  toolsBaseline: "2026-10-03",
  homeBaseline: "2026-10-03",
  blogBaseline: "2026-10-03",
} as const;

/** Parses a date string; returns null for empty or invalid values. */
export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Latest valid date in the list, never later than `now`. Falls back to `fallback`. */
export function latestDate(values: Array<Date | string | null | undefined>, fallback: string, now = new Date()): Date {
  let best: Date | null = null;
  for (const value of values) {
    const date = value instanceof Date ? value : parseDate(value);
    if (!date || date.getTime() > now.getTime()) continue;
    if (!best || date.getTime() > best.getTime()) best = date;
  }
  return best ?? new Date(fallback);
}

/**
 * Machine-readable article dates (JSON-LD and Open Graph). The site does not
 * show dates to readers on purpose, so these are the only date signals.
 * dateModified is never earlier than datePublished and never in the future.
 */
export function articleDates(
  publishedAt: string | null | undefined,
  updatedAt: string | null | undefined,
  now = new Date(),
): { datePublished?: string; dateModified?: string } {
  const published = parseDate(publishedAt);
  let modified: Date | null = null;
  for (const date of [parseDate(updatedAt), published]) {
    if (date && date.getTime() <= now.getTime() && (!modified || date.getTime() > modified.getTime())) modified = date;
  }
  return { datePublished: published?.toISOString(), dateModified: modified?.toISOString() };
}
