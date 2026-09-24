import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!adminRow) {
    return NextResponse.json({ error: "This account isn't an admin." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.slug !== "string" || !body.slug.trim()) {
    return NextResponse.json({ error: "A tool slug is required." }, { status: 400 });
  }

  const instructions = Array.isArray(body.instructions)
    ? body.instructions.filter((item: unknown): item is string => typeof item === "string")
        .map((item: string) => item.trim())
        .filter(Boolean)
    : null;

  const faq = Array.isArray(body.faq)
    ? body.faq
        .filter(
          (item: unknown): item is { question: string; answer: string } =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as { question?: unknown }).question === "string" &&
            typeof (item as { answer?: unknown }).answer === "string"
        )
        .map((item: { question: string; answer: string }) => ({
          question: item.question.trim(),
          answer: item.answer.trim(),
        }))
        .filter((item: { question: string; answer: string }) => item.question && item.answer)
    : null;

  const patch = {
    slug: body.slug.trim(),
    enabled: Boolean(body.enabled),
    name: typeof body.name === "string" && body.name.trim() ? body.name.trim() : null,
    one_liner: typeof body.one_liner === "string" && body.one_liner.trim() ? body.one_liner.trim() : null,
    description:
      typeof body.description === "string" && body.description.trim() ? body.description.trim() : null,
    seo_title: typeof body.seo_title === "string" && body.seo_title.trim() ? body.seo_title.trim() : null,
    seo_description:
      typeof body.seo_description === "string" && body.seo_description.trim()
        ? body.seo_description.trim()
        : null,
    instructions,
    faq,
    sort_order: Number.isFinite(body.sort_order) ? Number(body.sort_order) : null,
    featured: Boolean(body.featured),
    homepage_visible: body.homepage_visible !== false,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("tools").upsert(patch, { onConflict: "slug" });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateTag("tools");
  revalidatePath("/");
  revalidatePath("/tools");

  return NextResponse.json({ ok: true });
}
