import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/metadata";
import { articleDates } from "@/lib/seo/lastmod";
import { authorSchema, publisherSchema, resolveAuthorName } from "@/lib/seo/entity";

export type Crumb = { name: string; path: string };

function absolute(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized.replace(/\/+$/, "")}`;
}

/**
 * BreadcrumbList for a page. The names must match the breadcrumb the visitor
 * actually sees on the page (components/ui/Breadcrumbs.tsx), which is what
 * Google's structured-data policy asks for.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/**
 * WebApplication markup for a tool page. It deliberately has no rating or
 * review fields: we have no real ones and must not invent them. Without them
 * Google shows no rich result for it; it still tells search and AI systems
 * what the page is.
 */
export function toolSchema(tool: { slug: string; name: string; description: string; seoDescription?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absolute(`/tools/${tool.slug}`),
    description: tool.seoDescription || tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ["Processes files in your browser", "No file uploads", "No sign-up required"],
    publisher: publisherSchema(),
  };
}

/** Home > Tools > <tool name> */
export function toolCrumbs(tool: { slug: string; name: string }): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: tool.name, path: `/tools/${tool.slug}` },
  ];
}

/** Home > Blog > <article title> */
export function articleCrumbs(post: { slug: string; title: string }): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
}

/** Google asks for headlines of at most 110 characters; longer titles are cut at a word boundary. */
export function clipHeadline(title: string, max = 110): string {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

type ArticleForSchema = {
  slug: string;
  title: string;
  seo_description?: string | null;
  excerpt?: string | null;
  category?: string | null;
  author?: string | null;
  featured_image_url?: string | null;
  published_at: string | null;
  updated_at: string | null;
};

/** Article markup. Dates are machine-readable only (the site shows no dates to readers, by decision). */
export function articleSchema(post: ArticleForSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: clipHeadline(post.title),
    description: post.seo_description || post.excerpt || undefined,
    image: [post.featured_image_url ? absolute(post.featured_image_url) : DEFAULT_OG_IMAGE.url],
    ...articleDates(post.published_at, post.updated_at),
    author: authorSchema(resolveAuthorName(post.author)),
    publisher: publisherSchema(),
    mainEntityOfPage: { "@type": "WebPage", "@id": absolute(`/blog/${post.slug}`) },
    articleSection: post.category || undefined,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}
