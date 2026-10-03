import { SITE_NAME, SITE_URL } from "@/lib/seo/metadata";

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
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
