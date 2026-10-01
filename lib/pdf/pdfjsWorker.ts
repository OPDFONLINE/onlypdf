/**
 * Points pdf.js at the worker file served from our own origin
 * (/pdf.worker.min.mjs) instead of a third-party CDN.
 *
 * The file is copied from node_modules/pdfjs-dist at install/build time by
 * scripts/copy-pdf-worker.mjs, so it always matches the installed pdfjs-dist
 * version. The ?v= query only busts browser/CDN caches after an upgrade.
 */
export function configurePdfjsWorker(pdfjsLib: { version: string; GlobalWorkerOptions: { workerSrc: string } }) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs?v=${encodeURIComponent(pdfjsLib.version)}`;
}
