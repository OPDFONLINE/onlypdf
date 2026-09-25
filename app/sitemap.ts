import type { MetadataRoute } from "next";
import { getEffectiveTools } from "@/lib/supabase/tools";
import { getPublishedPosts } from "@/lib/blog/posts";

const BASE_URL = "https://onlypdf.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, posts] = await Promise.all([getEffectiveTools(), getPublishedPosts()]);
  const now = new Date();

  const staticRoutes = ["/", "/tools", "/blog", "/about", "/privacy", "/terms", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...tools.filter((tool) => tool.enabled).map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || now),
      changeFrequency: "monthly" as const,
    })),
  ];
}
