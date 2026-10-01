// Copies the pdf.js worker from node_modules into public/ so the site can
// serve it from its own origin (no third-party CDN, strict CSP friendly).
// Runs on postinstall / predev / prebuild, so the copied file always matches
// the installed pdfjs-dist version.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const targetDir = resolve(root, "public");
const target = resolve(targetDir, "pdf.worker.min.mjs");

if (!existsSync(source)) {
  console.warn("[copy-pdf-worker] pdfjs-dist is not installed yet, skipping.");
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);
console.log("[copy-pdf-worker] Copied pdf.worker.min.mjs to public/");
