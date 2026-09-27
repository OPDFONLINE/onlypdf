import "server-only";
import sharp from "sharp";
import { searchProvider } from "@/lib/images/providers";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

const BUCKET = "blog-images";
const MAX_BYTES = 100 * 1024;

export type ResolvedImage = {
  provider: "pexels" | "pixabay";
  providerImageId: string;
  sourceUrl: string;
  photographer: string | null;
  photographerUrl: string | null;
  alt: string;
  publicUrl: string;
};

async function findUnusedImage(query: string, usedIds: Set<string>) {
  for (const provider of ["pexels", "pixabay"] as const) {
    const results = await searchProvider(provider, query);
    for (const candidate of results) {
      const key = `${candidate.provider}:${candidate.providerImageId}`;
      if (!usedIds.has(key) && candidate.imageUrl) return candidate;
    }
  }
  return null;
}

/** Downloads and re-encodes progressively smaller/lower-quality JPEGs until under MAX_BYTES. */
async function downloadAndCompress(imageUrl: string): Promise<Buffer> {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Could not download image (${res.status})`);
  const original = Buffer.from(await res.arrayBuffer());

  let width = 1600;
  const qualitySteps = [80, 70, 60, 50, 40, 30, 25, 20];
  for (let attempt = 0; attempt < qualitySteps.length; attempt += 1) {
    const quality = qualitySteps[attempt] ?? 20;
    const buffer = await sharp(original)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (buffer.length <= MAX_BYTES) return buffer;
    if (attempt % 2 === 1) width = Math.round(width * 0.8);
  }
  return sharp(original).resize({ width: 800 }).jpeg({ quality: 15, mozjpeg: true }).toBuffer();
}

/**
 * Resolves one image slot: search (Pexels first, then Pixabay) for a query,
 * skip anything already used anywhere on the site, download + compress it
 * under 100KB, upload to Supabase Storage, and record it in image_usage so
 * it can never be picked again for any future article.
 */
export async function resolveAndStoreImage(
  query: string,
  usedIds: Set<string>,
  articleId: string
): Promise<ResolvedImage | null> {
  const candidate = await findUnusedImage(query, usedIds);
  if (!candidate) return null;

  const service = createSupabaseServiceClient();
  if (!service) throw new Error("Supabase service role is not configured.");

  const compressed = await downloadAndCompress(candidate.imageUrl);
  const extension = "jpg";
  const path = `${candidate.provider}/${candidate.providerImageId}-${Date.now()}.${extension}`;

  const { error: uploadError } = await service.storage
    .from(BUCKET)
    .upload(path, compressed, { contentType: "image/jpeg", upsert: false, cacheControl: "31536000" });
  if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

  const { data: publicUrlData } = service.storage.from(BUCKET).getPublicUrl(path);

  const { error: usageError } = await service.from("image_usage").insert({
    provider: candidate.provider,
    provider_image_id: candidate.providerImageId,
    source_url: candidate.sourceUrl,
    photographer: candidate.photographer,
    article_id: articleId,
  });
  if (usageError) console.error("image_usage insert failed:", usageError.message);

  usedIds.add(`${candidate.provider}:${candidate.providerImageId}`);

  return {
    provider: candidate.provider,
    providerImageId: candidate.providerImageId,
    sourceUrl: candidate.sourceUrl,
    photographer: candidate.photographer,
    photographerUrl: candidate.photographerUrl,
    alt: candidate.alt,
    publicUrl: publicUrlData.publicUrl,
  };
}

export async function loadGloballyUsedImageIds(): Promise<Set<string>> {
  const service = createSupabaseServiceClient();
  const used = new Set<string>();
  if (!service) return used;
  const { data, error } = await service.from("image_usage").select("provider, provider_image_id");
  if (error) {
    console.error("Could not read image_usage:", error.message);
    return used;
  }
  for (const row of data ?? []) used.add(`${row.provider}:${row.provider_image_id}`);
  return used;
}
