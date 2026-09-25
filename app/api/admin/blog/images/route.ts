import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/supabase/admin";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { searchProvider, type ImageProvider } from "@/lib/images/providers";

const PROVIDERS = new Set<ImageProvider>(["pexels", "pixabay"]);
const BUCKET = "blog-images";

async function requireAdmin() {
  const context = await getAdminContext();
  return context;
}

export async function GET(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() || "";
  const provider = url.searchParams.get("provider") as ImageProvider | null;

  if (!query || !provider || !PROVIDERS.has(provider)) {
    return NextResponse.json({ error: "A search query and image provider are required." }, { status: 400 });
  }

  try {
    const results = await searchProvider(provider, query);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image search failed." },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  const context = await requireAdmin();
  if (!context) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const provider = (body as { provider?: unknown }).provider;
  const imageUrl = (body as { imageUrl?: unknown }).imageUrl;
  const sourceUrl = (body as { sourceUrl?: unknown }).sourceUrl;
  const providerImageId = (body as { providerImageId?: unknown }).providerImageId;
  const photographer = (body as { photographer?: unknown }).photographer;
  const photographerUrl = (body as { photographerUrl?: unknown }).photographerUrl;
  const articleId = (body as { articleId?: unknown }).articleId;

  if (
    typeof provider !== "string" ||
    !PROVIDERS.has(provider as ImageProvider) ||
    typeof imageUrl !== "string" ||
    typeof sourceUrl !== "string" ||
    typeof providerImageId !== "string"
  ) {
    return NextResponse.json({ error: "A valid image selection is required." }, { status: 400 });
  }

  const service = createSupabaseServiceClient();
  if (!service) return NextResponse.json({ error: "Supabase service configuration is missing." }, { status: 503 });

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    return NextResponse.json({ error: "Could not download the selected image." }, { status: 502 });
  }

  const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "The selected resource is not an image." }, { status: 400 });
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  if (buffer.length > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "The source image is larger than the 8 MB admin upload limit." }, { status: 400 });
  }

  const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  const safeProvider = provider.toLowerCase();
  const path = `${safeProvider}/${providerImageId}-${Date.now()}.${extension}`;

  const { error: uploadError } = await service.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: false, cacheControl: "31536000" });

  if (uploadError) {
    return NextResponse.json(
      { error: `Image storage is not ready. Run the media migration first. (${uploadError.message})` },
      { status: 503 }
    );
  }

  const { data: publicUrl } = service.storage.from(BUCKET).getPublicUrl(path);

  if (typeof articleId === "string" && articleId) {
    const { error } = await service.from("image_usage").insert({
      provider,
      provider_image_id: providerImageId,
      source_url: sourceUrl,
      photographer: typeof photographer === "string" ? photographer : null,
      article_id: articleId,
      usage_date: new Date().toISOString(),
    });
    if (error) console.error("Image usage record failed", error.message);
  }

  return NextResponse.json({
    url: publicUrl.publicUrl,
    provider,
    providerImageId,
    sourceUrl,
    photographer: typeof photographer === "string" ? photographer : null,
    photographerUrl: typeof photographerUrl === "string" ? photographerUrl : null,
  });
}
