import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/blog/posts";
import { renderBlogContent, extractTableOfContents, extractContentImages, TableOfContents, RelatedLinks } from "@/lib/blog/render";
import { getSiteSettings } from "@/lib/supabase/settings";
import { getAdPlacement } from "@/lib/supabase/ads";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";

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
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const post = await getPublishedPost(params.slug);
  if (!post) notFound();

  const [settings, sidebarAd] = await Promise.all([getSiteSettings(), getAdPlacement("blog_sidebar")]);
  const toc = extractTableOfContents(post.content);
  const contentImages = extractContentImages(post.content);
  const sidebarImages = [
    ...(post.featured_image_url ? [{ url: post.featured_image_url, alt: post.title }] : []),
    ...contentImages,
  ].slice(0, 5);

  const showAd = Boolean(sidebarAd?.enabled && sidebarAd.provider === "adsense" && sidebarAd.slot_id && settings.google_adsense_publisher_id);

  return (
    <div className="container-page max-w-6xl py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="max-w-3xl">
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.seo_description || post.excerpt || undefined,
              datePublished: post.published_at || undefined,
              dateModified: post.updated_at || undefined,
              author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: "OnlyPDF" },
              mainEntityOfPage: { "@type": "WebPage", "@id": `https://onlypdf.online/blog/${post.slug}` },
            }}
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{post.category || "PDF guide"}</p>
          <h1 className="mt-3 text-3xl sm:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-5 text-lg leading-8 text-ink-muted">{post.excerpt}</p>}
          <div className="mt-8 flex gap-3 text-xs text-ink-soft">
            {post.author && <span>By {post.author}</span>}
            {post.published_at && (
              <span>{new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            )}
          </div>
          {post.featured_image_url && (
            <div className="mt-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                title={post.featured_image_title || post.title}
                className="w-full rounded-card border border-border object-cover"
              />
              {post.image_photographer && post.image_provider && (
                <p className="mt-2 text-xs text-ink-soft">
                  Photo by {post.image_photographer} on {post.image_provider}
                  {post.image_source_url && (
                    <>
                      {" "}
                      ·{" "}
                      <a href={post.image_source_url} target="_blank" rel="noreferrer" className="underline">
                        Source
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
          <TableOfContents items={toc} />
          <div className="mt-10 space-y-5">{renderBlogContent(post.content)}</div>
          <RelatedLinks slugs={post.related_slugs || []} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {showAd && <AdSlot publisherId={settings.google_adsense_publisher_id} slotId={sidebarAd?.slot_id} />}
            {sidebarImages.length > 0 && (
              <div className="rounded-card border-2 border-border bg-surface p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">From this guide</p>
                <div className="mt-3 space-y-3">
                  {sidebarImages.map((img, i) => (
                    <img key={i} src={img.url} alt={img.alt} loading="lazy" className="w-full rounded-lg border border-border object-cover" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
