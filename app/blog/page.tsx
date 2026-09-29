import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedSummaries, type PostSummary } from "@/lib/blog/posts";
import { Pagination } from "@/components/ui/Pagination";

export const revalidate = 60;

const PAGE_SIZE = 9;

type SearchParams = { page?: string; category?: string };

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const page = Math.max(parseInt(searchParams.page || "1", 10) || 1, 1);
  const category = searchParams.category?.trim();
  const title = category ? `${category} articles` : "Blog";
  return {
    title: page > 1 ? `${title} - Page ${page}` : title,
    description: "PDF tips, guides, workflows, and practical document advice from OnlyPDF.",
    // Filtered/paginated views point search engines back to the main listing.
    alternates: { canonical: "/blog" },
    robots: category || page > 1 ? { index: false, follow: true } : undefined,
  };
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const all = await getPublishedSummaries();

  const categoryCounts = new Map<string, number>();
  for (const post of all) {
    const name = post.category || "PDF guide";
    categoryCounts.set(name, (categoryCounts.get(name) || 0) + 1);
  }
  const categories = [...categoryCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  const requestedCategory = searchParams.category?.trim() || "";
  const activeCategory = categoryCounts.has(requestedCategory) ? requestedCategory : "";
  const posts = activeCategory ? all.filter((p) => (p.category || "PDF guide") === activeCategory) : all;

  const hero = posts[0];
  const rest = posts.slice(1);
  const totalPages = Math.max(Math.ceil(rest.length / PAGE_SIZE), 1);
  const page = Math.min(Math.max(parseInt(searchParams.page || "1", 10) || 1, 1), totalPages);
  const pagePosts = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const showHero = page === 1 && hero;
  // Beyond page 1 the newest post is not repeated; it only ever appears as the hero.
  const listing: PostSummary[] = pagePosts;

  const chipBase = "rounded-pill border px-4 py-1.5 text-sm font-semibold transition-colors";
  const chipIdle = "border-border bg-surface text-ink-muted hover:border-accent hover:text-accent-dark";
  const chipActive = "border-accent bg-accent text-white";

  return (
    <div className="container-page py-12 md:py-16">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-dark">OnlyPDF Blog</p>
        <h1 className="mt-3 text-3xl sm:text-5xl">Guides for working with PDFs</h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted">Practical, step-by-step advice for merging, compressing, converting, and organizing documents.</p>
      </header>

      {categories.length > 1 && (
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Blog categories">
          <Link href="/blog" className={`${chipBase} ${activeCategory ? chipIdle : chipActive}`}>
            All <span className="opacity-70">({all.length})</span>
          </Link>
          {categories.map(([name, count]) => (
            <Link
              key={name}
              href={`/blog?category=${encodeURIComponent(name)}`}
              aria-current={activeCategory === name ? "page" : undefined}
              className={`${chipBase} ${activeCategory === name ? chipActive : chipIdle}`}
            >
              {name} <span className="opacity-70">({count})</span>
            </Link>
          ))}
        </nav>
      )}

      {showHero && (
        <article className="group mt-10 overflow-hidden rounded-card border-2 border-border bg-surface shadow-soft lg:grid lg:grid-cols-2">
          <Link href={`/blog/${hero.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-accent-soft lg:aspect-auto lg:min-h-[22rem]">
            {hero.featured_image_url ? (
              <img
                src={hero.featured_image_url}
                alt={hero.title}
                title={hero.featured_image_title || hero.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-pink text-6xl font-extrabold text-white/90">P</span>
            )}
            <span className="absolute left-4 top-4 rounded-pill bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-dark">Latest</span>
          </Link>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">{hero.category || "PDF guide"}</p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">
              <Link href={`/blog/${hero.slug}`} className="hover:text-accent-dark">{hero.title}</Link>
            </h2>
            {hero.excerpt && <p className="mt-4 leading-7 text-ink-muted">{hero.excerpt}</p>}
            <p className="mt-5 text-xs text-ink-soft">
              {hero.author && <span>By {hero.author}</span>}
              {hero.author && hero.published_at && <span> · </span>}
              {hero.published_at && <span>{formatDate(hero.published_at)}</span>}
            </p>
            <Link href={`/blog/${hero.slug}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-pill bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
              Read article <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      )}

      {listing.length > 0 && (
        <section aria-label="Articles" className="mt-12">
          <h2 className="text-xl">{page === 1 ? "More articles" : `Articles · page ${page}`}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listing.map((post) => (
              <article key={post.id} className="group flex flex-col overflow-hidden rounded-card border-2 border-border bg-surface transition-shadow hover:shadow-soft">
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-accent-soft">
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      title={post.featured_image_title || post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span aria-hidden="true" className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-pink text-4xl font-extrabold text-white/90">P</span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">{post.category || "PDF guide"}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent-dark">{post.title}</Link>
                  </h3>
                  {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-muted">{post.excerpt}</p>}
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-ink-soft">
                    <span>{formatDate(post.published_at)}</span>
                    <Link href={`/blog/${post.slug}`} className="font-semibold text-accent-dark hover:underline">Read →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} basePath="/blog" params={{ category: activeCategory || undefined }} className="mt-10" />
        </section>
      )}

      {posts.length === 0 && (
        <p className="mt-10 rounded-card border-2 border-border bg-surface p-6 text-sm text-ink-muted">No published articles yet.</p>
      )}
    </div>
  );
}
