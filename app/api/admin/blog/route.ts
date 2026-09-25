import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ImageSource = {
  provider?: unknown;
  providerImageId?: unknown;
  sourceUrl?: unknown;
  photographer?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

async function admin() {
  const db = await createSupabaseServerClient();
  if (!db) return null;
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const { data } = await db.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  return data ? db : null;
}

function postBody(body: Record<string, unknown>) {
  const status = body.status === "published" || body.status === "scheduled" ? body.status : "draft";
  return {
    title: clean(body.title) || "Untitled article",
    slug: (clean(body.slug) || "untitled-article").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120),
    status,
    excerpt: clean(body.excerpt),
    content: typeof body.content === "string" ? body.content : "",
    seo_title: clean(body.seo_title),
    seo_description: clean(body.seo_description),
    featured_image_url: clean(body.featured_image_url),
    image_provider: (() => {
      const source = body.image_source && typeof body.image_source === "object" ? body.image_source as Record<string, unknown> : null;
      return source?.provider === "pexels" || source?.provider === "pixabay" ? source.provider : null;
    })(),
    image_source_url: (() => {
      const source = body.image_source && typeof body.image_source === "object" ? body.image_source as Record<string, unknown> : null;
      return typeof source?.sourceUrl === "string" ? source.sourceUrl : null;
    })(),
    image_photographer: (() => {
      const source = body.image_source && typeof body.image_source === "object" ? body.image_source as Record<string, unknown> : null;
      return typeof source?.photographer === "string" ? source.photographer : null;
    })(),
    image_photographer_url: (() => {
      const source = body.image_source && typeof body.image_source === "object" ? body.image_source as Record<string, unknown> : null;
      return typeof source?.photographerUrl === "string" ? source.photographerUrl : null;
    })(),
    category: clean(body.category),
    topic_cluster: clean(body.topic_cluster),
    related_slugs: Array.isArray(body.related_slugs)
      ? body.related_slugs.filter((value): value is string => typeof value === "string").map((value) => value.trim()).filter(Boolean).slice(0, 20)
      : [],
    author: clean(body.author),
    published_at: status === "published" ? (clean(body.published_at) || new Date().toISOString()) : null,
    scheduled_at: status === "scheduled" ? clean(body.scheduled_at) : null,
    updated_at: new Date().toISOString(),
  };
}

async function recordImageUsage(db: Awaited<ReturnType<typeof createSupabaseServerClient>>, body: Record<string, unknown>, articleId: string) {
  if (!db) return;
  const source = (body.image_source && typeof body.image_source === "object" ? body.image_source : null) as ImageSource | null;
  if (!source || (source.provider !== "pexels" && source.provider !== "pixabay") || typeof source.providerImageId !== "string" || typeof source.sourceUrl !== "string") return;

  const { error } = await db.from("image_usage").insert({
    provider: source.provider,
    provider_image_id: source.providerImageId,
    source_url: source.sourceUrl,
    photographer: typeof source.photographer === "string" ? source.photographer : null,
    article_id: articleId,
    usage_date: new Date().toISOString(),
  });
  if (error) console.error("Image usage record failed", error.message);
}

export async function POST(request: Request) {
  const db = await admin();
  if (!db) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { data, error } = await db.from("blog_posts").insert(postBody(body as Record<string, unknown>)).select("id,slug").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await recordImageUsage(db, body as Record<string, unknown>, data.id);
  revalidatePath("/blog");
  if (data.slug) revalidatePath(`/blog/${data.slug}`);
  return NextResponse.json({ id: data.id });
}

export async function PATCH(request: Request) {
  const db = await admin();
  if (!db) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string") {
    return NextResponse.json({ error: "Article id is required." }, { status: 400 });
  }

  const post = postBody(body as Record<string, unknown>);
  const { data: previous } = await db.from("blog_posts").select("slug").eq("id", body.id).maybeSingle();
  const { error } = await db.from("blog_posts").update(post).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await recordImageUsage(db, body as Record<string, unknown>, body.id);
  revalidatePath("/blog");
  if (previous?.slug) revalidatePath(`/blog/${previous.slug}`);
  revalidatePath(`/blog/${post.slug}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const db = await admin();
  if (!db) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string") {
    return NextResponse.json({ error: "Article id is required." }, { status: 400 });
  }

  const { error } = await db.from("blog_posts").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidatePath("/blog");
  return NextResponse.json({ ok: true });
}
