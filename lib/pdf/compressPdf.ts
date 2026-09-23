/**
 * Browser-side PDF compression by rasterizing each page to JPEG and rebuilding
 * the document. This is intentionally client-side so source files never need
 * to be uploaded to a server.
 */

export type CompressionPreset = "high" | "medium" | "express";

export type CompressionResult = {
  blob: Blob;
  originalBytes: number;
  outputBytes: number;
  preset?: CompressionPreset;
  targetBytes?: number;
  reachedTarget: boolean;
};

type PageBitmap = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
};

const PRESETS: Record<CompressionPreset, { scale: number; quality: number }> = {
  high: { scale: 1.55, quality: 0.78 },
  medium: { scale: 1.1, quality: 0.62 },
  express: { scale: 0.78, quality: 0.46 },
};

const MAX_PAGE_PIXELS = 2_800_000;
const TARGET_CANDIDATES = [
  { scale: 1.55, quality: 0.82 },
  { scale: 1.4, quality: 0.76 },
  { scale: 1.25, quality: 0.7 },
  { scale: 1.1, quality: 0.64 },
  { scale: 0.98, quality: 0.58 },
  { scale: 0.88, quality: 0.52 },
  { scale: 0.78, quality: 0.46 },
  { scale: 0.68, quality: 0.4 },
  { scale: 0.58, quality: 0.34 },
  { scale: 0.5, quality: 0.28 },
];

function clampScale(width: number, height: number, scale: number): number {
  const pixels = width * height * scale * scale;
  if (pixels <= MAX_PAGE_PIXELS) return scale;
  return Math.sqrt(MAX_PAGE_PIXELS / (width * height));
}

async function fileBytes(file: File): Promise<ArrayBuffer> {
  try {
    return await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }
}

async function loadPdf(file: File) {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  try {
    return await pdfjsLib.getDocument({ data: await fileBytes(file) }).promise;
  } catch {
    throw new Error(
      `"${file.name}" couldn't be opened. It may be corrupted or password-protected.`
    );
  }
}

async function renderPages(file: File): Promise<PageBitmap[]> {
  const pdfDoc = await loadPdf(file);
  const pages: PageBitmap[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
      const page = await pdfDoc.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = clampScale(baseViewport.width, baseViewport.height, PRESETS.high.scale);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new Error("Your browser couldn't create a canvas for compression.");

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport }).promise;

      pages.push({ width: baseViewport.width, height: baseViewport.height, canvas });
      page.cleanup();
    }
  } finally {
    await pdfDoc.destroy();
  }

  return pages;
}

async function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );
  if (!blob) throw new Error("Your browser couldn't encode a compressed PDF page.");
  return blob;
}

async function buildPdf(pages: PageBitmap[], scale: number, quality: number): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();

  for (const source of pages) {
    const targetScale = clampScale(source.width, source.height, scale);
    const targetWidth = Math.max(1, Math.round(source.width * targetScale));
    const targetHeight = Math.max(1, Math.round(source.height * targetScale));
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Your browser couldn't create a canvas for compression.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, targetWidth, targetHeight);
    context.drawImage(source.canvas, 0, 0, targetWidth, targetHeight);

    const jpeg = await canvasToJpeg(canvas, quality);
    const image = await pdfDoc.embedJpg(await jpeg.arrayBuffer());
    const page = pdfDoc.addPage([source.width, source.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: source.width,
      height: source.height,
    });
  }

  const bytes = await pdfDoc.save({ useObjectStreams: true });
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

export async function compressPdfWithPreset(
  file: File,
  preset: CompressionPreset
): Promise<CompressionResult> {
  if (file.size === 0) throw new Error("The selected PDF is empty.");
  const pages = await renderPages(file);
  const settings = PRESETS[preset];
  const compressed = await buildPdf(pages, settings.scale, settings.quality);
  const blob = compressed.size < file.size ? compressed : file;

  return {
    blob,
    originalBytes: file.size,
    outputBytes: blob.size,
    preset,
    reachedTarget: compressed.size <= file.size,
  };
}

export async function compressPdfToTarget(
  file: File,
  targetBytes: number,
  onProgress?: (message: string) => void
): Promise<CompressionResult> {
  if (file.size === 0) throw new Error("The selected PDF is empty.");
  if (!Number.isFinite(targetBytes) || targetBytes < 32 * 1024) {
    throw new Error("Enter a target size of at least 32 KB.");
  }

  if (targetBytes >= file.size) {
    return {
      blob: file,
      originalBytes: file.size,
      outputBytes: file.size,
      targetBytes,
      reachedTarget: true,
    };
  }

  const pages = await renderPages(file);
  let best: Blob | null = null;

  for (let index = 0; index < TARGET_CANDIDATES.length; index += 1) {
    const candidate = TARGET_CANDIDATES[index];
    if (!candidate) continue;
    onProgress?.(`Testing compression level ${index + 1} of ${TARGET_CANDIDATES.length}…`);
    const blob = await buildPdf(pages, candidate.scale, candidate.quality);
    if (!best || blob.size < best.size) best = blob;

    if (blob.size <= targetBytes) {
      return {
        blob,
        originalBytes: file.size,
        outputBytes: blob.size,
        targetBytes,
        reachedTarget: true,
      };
    }
  }

  if (!best) throw new Error("The PDF couldn't be compressed.");

  // Never hand back a larger file as a "compressed" result.
  const finalBlob = best.size < file.size ? best : file;
  return {
    blob: finalBlob,
    originalBytes: file.size,
    outputBytes: finalBlob.size,
    targetBytes,
    reachedTarget: finalBlob.size <= targetBytes,
  };
}
