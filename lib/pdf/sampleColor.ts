import type { WatermarkRect } from "@/lib/pdf/removeWatermark";

export type Rgb = { r: number; g: number; b: number };

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't read the page preview."));
    img.src = src;
  });
}

function median(values: number[]) {
  if (values.length === 0) return 255;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 255;
}

async function readPixels(dataUrl: string) {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Your browser couldn't read the page preview.");
  ctx.drawImage(img, 0, 0);
  return { data: ctx.getImageData(0, 0, canvas.width, canvas.height).data, w: canvas.width, h: canvas.height };
}

/**
 * Returns a function that estimates the background colour around a rectangle:
 * the median colour of a thin ring just outside it. This lets a cover-up blend
 * with tinted or coloured pages instead of leaving a white patch.
 */
export async function createRingSampler(dataUrl: string): Promise<(rect: WatermarkRect) => Rgb> {
  const { data, w, h } = await readPixels(dataUrl);
  const gap = Math.max(2, Math.round(w * 0.006));
  const thick = Math.max(2, Math.round(w * 0.008));

  return (rect) => {
    const x0 = Math.round(rect.x * w) - gap;
    const y0 = Math.round(rect.y * h) - gap;
    const x1 = Math.round((rect.x + rect.width) * w) + gap;
    const y1 = Math.round((rect.y + rect.height) * h) + gap;
    const rs: number[] = [];
    const gs: number[] = [];
    const bs: number[] = [];

    const take = (ax: number, ay: number, bx: number, by: number) => {
      const sx = Math.max(0, ax);
      const sy = Math.max(0, ay);
      const ex = Math.min(w, bx);
      const ey = Math.min(h, by);
      for (let y = sy; y < ey; y += 1) {
        for (let x = sx; x < ex; x += 1) {
          const i = (y * w + x) * 4;
          rs.push(data[i] ?? 255);
          gs.push(data[i + 1] ?? 255);
          bs.push(data[i + 2] ?? 255);
        }
      }
    };

    take(x0 - thick, y0 - thick, x1 + thick, y0); // top strip
    take(x0 - thick, y1, x1 + thick, y1 + thick); // bottom strip
    take(x0 - thick, y0, x0, y1); // left strip
    take(x1, y0, x1 + thick, y1); // right strip

    return { r: median(rs), g: median(gs), b: median(bs) };
  };
}

/** Median colour of a small patch around a point (0..1), used by the colour picker. */
export async function samplePoint(dataUrl: string, x: number, y: number): Promise<Rgb> {
  const { data, w, h } = await readPixels(dataUrl);
  const cx = Math.round(x * w);
  const cy = Math.round(y * h);
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const px = Math.min(w - 1, Math.max(0, cx + dx));
      const py = Math.min(h - 1, Math.max(0, cy + dy));
      const i = (py * w + px) * 4;
      rs.push(data[i] ?? 255);
      gs.push(data[i + 1] ?? 255);
      bs.push(data[i + 2] ?? 255);
    }
  }
  return { r: median(rs), g: median(gs), b: median(bs) };
}

export function rgbToHex({ r, g, b }: Rgb) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function hexToRgb(hex: string): Rgb {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return { r: 255, g: 255, b: 255 };
  const n = parseInt(m[1] ?? "ffffff", 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
