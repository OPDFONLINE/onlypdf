import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPost, getRelatedPosts, type PostSummary } from "@/lib/blog/posts";
import { renderBlogContent, extractTableOfContents, TableOfContents, RelatedLinks } from "@/lib/blog/render";
import { getSiteSettings } from "@/lib/supabase/settings";
import { getAdPlacement } from "@/lib/supabase/ads";
import { AdSlot } from "@/components/ads/AdSlot";
import { isValidAdsensePublisherId, isValidAdsenseSlotId } from "@/lib/ads/validate";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleDates } from "@/lib/seo/lastmod";
import { articleCrumbs, articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { authorProfileUrl, resolveAuthorName } from "@/lib/seo/entity";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

// Moderate ISR instead of the previous unbounded default caching: this page
// reads via the public (cookie-free) Supabase client, so nothing here forces
// dynamic rendering on its own, and Next's fetch Data Cache can otherwise
// freeze a page on whatever it first rendered. A short revalidate window
// keeps pages fast (still cached) while guaranteeing they catch up with
// content/image changes within a minute, instead of staying stale forever.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedPost(params.slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: articleDates(post.published_at, post.updated_at).datePublished,
    modifiedTime: articleDates(post.published_at, post.updated_at).dateModified,
    authors: authorProfileUrl(resolveAuthorName(post.author)) ? [authorProfileUrl(resolveAuthorName(post.author)) as string] : undefined,
    author: { name: resolveAuthorName(post.author), url: authorProfileUrl(resolveAuthorName(post.author)) },
    section: post.category,
    // Featured images are re-encoded JPEGs (up to 1600px wide), which every
    // social crawler accepts. Articles without one fall back to the default.
    images: post.featured_image_url
      ? [{ url: post.featured_image_url, alt: post.featured_image_title || post.title }]
      : undefined,
  });
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const post = await getPublishedPost(params.slug);
  if (!post) notFound();

  const [settings, sidebarAd, similar] = await Promise.all([
    getSiteSettings(),
    getAdPlacement("blog_sidebar"),
    getRelatedPosts(post, 5),
  ]);
  const toc = extractTableOfContents(post.content);

  const showAd = Boolean(sidebarAd?.enabled && sidebarAd.provider === "adsense" && isValidAdsenseSlotId(sidebarAd.slot_id) && isValidAdsensePublisherId(settings.google_adsense_publisher_id));

  return (
    <div className="container-page max-w-6xl py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="max-w-3xl">
          <JsonLd data={articleSchema(post)} />
          <JsonLd data={breadcrumbSchema(articleCrumbs(post))} />
          <Breadcrumbs crumbs={articleCrumbs(post)} className="mb-6" />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{post.category || "PDF guide"}</p>
          <h1 className="mt-3 text-3xl sm:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-lg leading-8 text-ink-muted">{post.excerpt}</p>}
          <p className="mt-8 text-xs text-ink-soft">By {resolveAuthorName(post.author)}</p>
          {post.featured_image_url && (
            <div className="mt-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                title={post.featured_image_title || post.title}
                className="w-full rounded-card border border-border object-cover"
              />
            </div>
          )}
          <div className="mt-10 space-y-5">{renderBlogContent(post.content, <TableOfContents items={toc} />)}</div>
          <RelatedLinks slugs={post.related_slugs || []} />
          {similar.length > 0 && (
            <div className="mt-12 lg:hidden">
              <SimilarArticles posts={similar} />
            </div>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {showAd && <AdSlot publisherId={settings.google_adsense_publisher_id} slotId={sidebarAd?.slot_id} />}
            {similar.length > 0 && <SimilarArticles posts={similar} />}
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Sidebar / mobile card listing 3-5 similar (or, failing that, recent) articles. */
function SimilarArticles({ posts }: { posts: PostSummary[] }) {
  return (
    <section className="rounded-card border-2 border-border bg-surface p-4" aria-label="Similar articles">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">Similar articles</p>
      <ul className="mt-3 divide-y divide-border">
        {posts.map((item) => (
          <li key={item.id}>
            <Link href={`/blog/${item.slug}`} className="group flex gap-3 py-3 first:pt-0 last:pb-0">
              {item.featured_image_url ? (
                <img
                  src={item.featured_image_url}
                  alt=""
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
                />
              ) : (
                <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent-dark">
                  P
                </span>
              )}
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{item.category || "PDF guide"}</span>
                <span className="mt-0.5 block text-sm font-semibold leading-snug text-ink group-hover:text-accent-dark">{item.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="mt-4 inline-block text-xs font-semibold text-accent-dark hover:underline">
        Browse all articles →
      </Link>
    </section>
  );
}
