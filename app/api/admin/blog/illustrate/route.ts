import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/admin";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { batch1Articles } from "@/lib/blog/batch1-articles";
import { loadGloballyUsedImageIds, resolveAndStoreImage } from "@/lib/images/illustrate";

// Each run only processes ONE article (see slug param below), which keeps
// this comfortably under serverless time limits even on the Hobby plan.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const context = await getAdminContext();
  if (!context) return NextResponse.json({ error: "Unauthorized. Log into /admin first, then open this link in the same browser." }, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({
      message: "Pass ?slug=<article-slug> to illustrate and publish one article as a draft.",
      availableSlugs: batch1Articles.map((a) => a.slug),
    });
  }

  const article = batch1Articles.find((a) => a.slug === slug);
  if (!article) {
    return NextResponse.json({ error: `Unknown slug "${slug}".`, availableSlugs: batch1Articles.map((a) => a.slug) }, { status: 400 });
  }

  const service = createSupabaseServiceClient();
  if (!service) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 503 });

  try {
    const usedIds = await loadGloballyUsedImageIds();
    const log: string[] = [];

    // Create (or find) the row first so image_usage can reference a real article_id.
    const { data: shell, error: shellError } = await service
      .from("blog_posts")
      .upsert(
        {
          title: article.title,
          slug: article.slug,
          status: "draft",
          excerpt: article.excerpt,
          content: article.content,
          seo_title: article.seo_title,
          seo_description: article.seo_description,
          category: article.category,
          topic_cluster: article.topic_cluster,
          related_slugs: article.related_slugs,
          author: article.author,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();
    if (shellError || !shell) throw new Error(shellError?.message || "Could not create article row.");
    const articleId = shell.id as string;

    const featured = await resolveAndStoreImage(article.featuredImageQuery, usedIds, articleId);
    log.push(
      featured
        ? `Featured image: ${featured.provider}:${featured.providerImageId}`
        : `! No unused featured image found for "${article.featuredImageQuery}"`
    );

    let content = article.content;
    for (const { marker, query } of article.images) {
      const token = `{{IMG:${marker}}}`;
      const resolved = await resolveAndStoreImage(query, usedIds, articleId);
      if (resolved) {
        content = content.replace(token, `![${resolved.alt}|${article.title}](${resolved.publicUrl})`);
        log.push(`Image ${marker} ("${query}"): ${resolved.provider}:${resolved.providerImageId}`);
      } else {
        content = content.replace(
          token,
          `_(Image ${marker} could not be sourced automatically — add one manually in Admin > Blog before publishing.)_`
        );
        log.push(`! Image ${marker} ("${query}"): no unused match found`);
      }
    }

    const updatePayload: Record<string, unknown> = { content, updated_at: new Date().toISOString() };
    if (featured) {
      updatePayload.featured_image_url = featured.publicUrl;
      updatePayload.featured_image_title = article.title;
      updatePayload.image_provider = featured.provider;
      updatePayload.image_source_url = featured.sourceUrl;
      updatePayload.image_photographer = featured.photographer;
      updatePayload.image_photographer_url = featured.photographerUrl;
    }

    const { error: updateError } = await service.from("blog_posts").update(updatePayload).eq("id", articleId);
    if (updateError) throw new Error(updateError.message);

    return NextResponse.json({
      ok: true,
      slug: article.slug,
      editUrl: `/admin/blog`,
      previewNote: "Saved as a draft. Review it in Admin > Blog before publishing.",
      log,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Illustration run failed." }, { status: 500 });
  }
}
