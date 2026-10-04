import type { Metadata } from "next";

export const SITE_URL = "https://onlypdf.online";
export const SITE_NAME = "OnlyPDF";
export const SITE_LOCALE = "en_US";

/** Shared social preview image (1200x630) in /public, used when a page has no image of its own. */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-default.png`,
  width: 1200,
  height: 630,
  alt: "OnlyPDF: simple PDF tools that work in your browser",
};

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

export type SeoImage = string | { url: string; width?: number; height?: number; alt?: string };

function absoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function resolveImages(images: SeoImage[] | undefined) {
  const list = images && images.length > 0 ? images : [DEFAULT_OG_IMAGE];
  return list.map((image) =>
    typeof image === "string" ? { url: absoluteUrl(image) } : { ...image, url: absoluteUrl(image.url) }
  );
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
  /** Person shown in <meta name="author"> (article pages). */
  author?: { name: string; url?: string };
  section?: string | null;
  /** Open Graph / Twitter images. Falls back to the shared default image when omitted. */
  images?: SeoImage[];
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
  const images = resolveImages(input.images);

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
    authors: input.author ? [{ name: input.author.name, url: input.author.url }] : undefined,
    robots: input.robots,
  };
}
