import type { Metadata } from "next";

export const SITE_URL = "https://onlypdf.online";
export const SITE_NAME = "OnlyPDF";
export const SITE_LOCALE = "en_US";

/** Fallbacks for the homepage; Admin > Settings values take priority. */
export const HOME_DEFAULT_TITLE = "OnlyPDF — Simple PDF Tools. Right in Your Browser.";
export const HOME_DEFAULT_DESCRIPTION =
  "Free PDF tools that run in your browser. Merge, split, compress, edit, convert PDF and Word files, and remove watermarks in your browser, with no sign-up and no file uploads.";

/** Appends the brand unless the title already contains it (avoids "OnlyPDF — OnlyPDF"). */
export function withBrand(title: string): string {
  return title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} — ${SITE_NAME}`;
}

function normalizePath(path: string): string {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
}

export type PageMetadataInput = {
  /** Page title without the brand suffix; it is added automatically. */
  title: string;
  description?: string;
  /** Path of the canonical URL, e.g. "/tools/merge-pdf". */
  path: string;
  siteName?: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  authors?: string[];
  section?: string | null;
  /** Absolute or root-relative image URLs for Open Graph and Twitter. */
  images?: string[];
  robots?: Metadata["robots"];
};

/**
 * One place that builds per-page metadata. Next.js replaces the parent's
 * `openGraph` and `twitter` objects wholesale when a page defines its own,
 * so every page must carry its own url, title and description; otherwise
 * it inherits the homepage values from the root layout.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const path = normalizePath(input.path);
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const title = withBrand(input.title);
  const description = input.description || undefined;
  const siteName = input.siteName || SITE_NAME;
  const images = input.images && input.images.length > 0 ? input.images : undefined;

  const openGraph: Metadata["openGraph"] =
    input.type === "article"
      ? {
          type: "article",
          url,
          title,
          description,
          siteName,
          locale: SITE_LOCALE,
          publishedTime: input.publishedTime || undefined,
          modifiedTime: input.modifiedTime || undefined,
          authors: input.authors && input.authors.length > 0 ? input.authors : undefined,
          section: input.section || undefined,
          images,
        }
      : { type: "website", url, title, description, siteName, locale: SITE_LOCALE, images };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: { card: "summary_large_image", title, description, images },
    robots: input.robots,
  };
}
