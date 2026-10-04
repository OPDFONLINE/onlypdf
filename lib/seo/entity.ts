import { SITE_NAME, SITE_URL } from "@/lib/seo/metadata";

/**
 * Who publishes and who writes: one place for the Organization and the
 * pen-named author, so every page describes them identically.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const AUTHOR_ID = `${SITE_URL}/#author-david-valle`;
export const LOGO_URL = `${SITE_URL}/logo.png`; // 512x512, made by scripts/generate-brand-images.mjs
export const LOGO_SIZE = 512;
export const SITE_TAGLINE = "Simple PDF tools. Right in your browser.";

/** Pen name used for all articles. The URL points at the site itself. */
export const SITE_AUTHOR = { name: "David Valle", url: SITE_URL } as const;

/**
 * Real profile pages that belong to OnlyPDF (Product Hunt, LinkedIn, GitHub,
 * X, AlternativeTo...). Add a URL here ONLY when the profile exists and you
 * control it: `sameAs` tells search and AI systems "these accounts are the
 * same entity", so an invented or dead link does harm. While the list is
 * empty the property is left out of the markup entirely.
 */
export const SOCIAL_PROFILES: string[] = [];

/** Author fields that are really "the site", not a person. They are shown as the pen name. */
const GENERIC_AUTHOR = /^(onlypdf(\s+(team|editorial|staff))?|editorial(\s+team)?|staff|admin|team)$/i;

/** The name to show and mark up for an article. Empty or generic values become the pen name; a real different name is kept. */
export function resolveAuthorName(raw?: string | null): string {
  const name = (raw || "").trim();
  return !name || GENERIC_AUTHOR.test(name) ? SITE_AUTHOR.name : name;
}

export function authorSchema(name: string) {
  if (name === SITE_AUTHOR.name) return { "@type": "Person", "@id": AUTHOR_ID, name, url: SITE_AUTHOR.url };
  return { "@type": "Person", name };
}

/** Profile URL for <meta property="article:author">; only the pen name has one. */
export function authorProfileUrl(name: string): string | undefined {
  return name === SITE_AUTHOR.name ? SITE_AUTHOR.url : undefined;
}

/** Small publisher block for Article and tool markup. Same @id as the full Organization on the homepage. */
export function publisherSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: LOGO_SIZE, height: LOGO_SIZE },
  };
}

/** Full Organization entity for the homepage. */
export function organizationSchema(description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: LOGO_SIZE, height: LOGO_SIZE },
    description: description || undefined,
    slogan: SITE_TAGLINE,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
      availableLanguage: "English",
    },
    sameAs: SOCIAL_PROFILES.length > 0 ? SOCIAL_PROFILES : undefined,
  };
}
