import type { MetadataRoute } from "next";
import { getEffectiveTools } from "@/lib/supabase/tools";
import { getPublishedPosts } from "@/lib/blog/posts";
import { STATIC_PAGE_LASTMOD, latestDate } from "@/lib/seo/lastmod";

const BASE_URL = "https://onlypdf.online";

// Re-generate hourly so newly published articles appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, posts] = await Promise.all([getEffectiveTools(), getPublishedPosts()]);
  const now = new Date();
  const enabledTools = tools.filter((tool) => tool.enabled);

  const toolEntries = enabledTools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: latestDate([STATIC_PAGE_LASTMOD.toolsBaseline, tool.updatedAt], STATIC_PAGE_LASTMOD.toolsBaseline, now),
  }));

  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    // Never earlier than the publish date, never in the future.
    lastModified: latestDate([post.updated_at, post.published_at], post.published_at || STATIC_PAGE_LASTMOD.blogBaseline, now),
  }));

  const toolsIndexModified = latestDate(toolEntries.map((entry) => entry.lastModified), STATIC_PAGE_LASTMOD.toolsBaseline, now);
  const blogIndexModified = latestDate(
    [STATIC_PAGE_LASTMOD.blogBaseline, ...postEntries.map((entry) => entry.lastModified)],
    STATIC_PAGE_LASTMOD.blogBaseline,
    now,
  );
  // The homepage lists the tools and the newest articles, so it changes with either.
  const homeModified = latestDate(
    [STATIC_PAGE_LASTMOD.homeBaseline, toolsIndexModified, blogIndexModified],
    STATIC_PAGE_LASTMOD.homeBaseline,
    now,
  );

  const fixed = (date: string) => new Date(date);

  return [
    { url: `${BASE_URL}/`, lastModified: homeModified },
    { url: `${BASE_URL}/tools`, lastModified: toolsIndexModified },
    { url: `${BASE_URL}/blog`, lastModified: blogIndexModified },
    { url: `${BASE_URL}/about`, lastModified: fixed(STATIC_PAGE_LASTMOD.about) },
    { url: `${BASE_URL}/contact`, lastModified: fixed(STATIC_PAGE_LASTMOD.contact) },
    { url: `${BASE_URL}/privacy`, lastModified: fixed(STATIC_PAGE_LASTMOD.privacy) },
    { url: `${BASE_URL}/terms`, lastModified: fixed(STATIC_PAGE_LASTMOD.terms) },
    ...toolEntries,
    ...postEntries,
  ];
}
