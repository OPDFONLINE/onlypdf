export type ImageProvider = "pexels" | "pixabay";

export type ImageSearchResult = {
  provider: ImageProvider;
  providerImageId: string;
  sourceUrl: string;
  imageUrl: string;
  photographer: string | null;
  photographerUrl: string | null;
  alt: string;
};

export async function searchProvider(
  provider: ImageProvider,
  query: string
): Promise<ImageSearchResult[]> {
  const normalized = query.trim().slice(0, 100);
  if (!normalized) return [];

  if (provider === "pexels") {
    const key = process.env.PEXELS_API_KEY;
    if (!key) throw new Error("Pexels is not configured. Add PEXELS_API_KEY to the production environment.");
    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", normalized);
    url.searchParams.set("per_page", "12");
    url.searchParams.set("orientation", "landscape");
    url.searchParams.set("locale", "en-US");

    const response = await fetch(url, {
      headers: { Authorization: key },
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error(`Pexels search failed (${response.status}).`);
    const data = (await response.json()) as {
      photos?: Array<{
        id: number;
        url: string;
        photographer: string;
        photographer_url: string;
        alt: string;
        src?: { medium?: string; large?: string };
      }>;
    };

    return (data.photos ?? [])
      .map((photo) => ({
        provider: "pexels" as const,
        providerImageId: String(photo.id),
        sourceUrl: photo.url,
        imageUrl: photo.src?.large || photo.src?.medium || "",
        photographer: photo.photographer || null,
        photographerUrl: photo.photographer_url || null,
        alt: photo.alt || `${normalized} photo`,
      }))
      .filter((item) => item.imageUrl);
  }

  const key = process.env.PIXABAY_API_KEY;
  if (!key) throw new Error("Pixabay is not configured. Add PIXABAY_API_KEY to the production environment.");
  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", key);
  url.searchParams.set("q", normalized);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("orientation", "horizontal");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", "12");
  url.searchParams.set("lang", "en");

  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Pixabay search failed (${response.status}).`);
  const data = (await response.json()) as {
    hits?: Array<{
      id: number;
      pageURL: string;
      webformatURL: string;
      user: string;
      tags: string;
    }>;
  };

  return (data.hits ?? [])
    .map((photo) => ({
      provider: "pixabay" as const,
      providerImageId: String(photo.id),
      sourceUrl: photo.pageURL,
      imageUrl: photo.webformatURL,
      photographer: photo.user || null,
      photographerUrl: photo.user ? `https://pixabay.com/users/${encodeURIComponent(photo.user)}/` : null,
      alt: photo.tags || `${normalized} photo`,
    }))
    .filter((item) => item.imageUrl);
}
