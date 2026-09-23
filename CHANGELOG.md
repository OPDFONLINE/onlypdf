# What's in this zip

New/changed files from this session (JPG to PDF + PDF to JPG tools), same
folder structure as the repo — copy over the matching paths.

## New files

- `lib/pdf/imagesToPdf.ts` — combines JPG/JPEG/PNG images into a PDF (pdf-lib)
- `lib/pdf/renderPageImages.ts` — renders PDF pages to full-res JPG/PNG (pdfjs-dist)
- `components/tools/JpgToPdfTool.tsx` — the JPG to PDF tool (multi-image upload,
  drag-to-reorder, page size: fit / A4 / US Letter)
- `components/tools/PdfToImageTool.tsx` — the PDF to JPG tool (page thumbnails,
  select pages, JPG/PNG format toggle, single file or ZIP download)
- `app/tools/jpg-to-pdf/page.tsx` — route for the new tool
- `app/tools/pdf-to-jpg/page.tsx` — route for the new tool

## Modified files

- `tailwind.config.ts` — added two new accent colors (`lime`, `violet`) for
  the new tool badges
- `lib/tools.ts` — added `ToolColor` variants `lime`/`violet`, and the two
  new tool entries (name, description, instructions, FAQ) — this alone is
  what makes the tools appear on the homepage grid, `/tools` index, and
  related-tools sidebars, since those are all data-driven from this file
- `lib/toolColors.ts` — added the `lime` and `violet` class mappings
- `app/layout.tsx` — site-wide meta description now mentions image conversion
- `app/tools/page.tsx` — tools index meta description now mentions image conversion
- `components/home/SeoContent.tsx` — added two new SEO sections (JPG to PDF,
  PDF to JPG) and updated the closing "more tools" paragraph now that these
  are live, not just planned (now ~895 words total)
- `README.md` — tools table and roadmap updated

## Notes

- Both tools reuse existing infrastructure: `PdfPageThumb` for thumbnails/
  drag UI, `createZip` from `lib/pdf/zip.ts` for multi-file downloads, and
  the same `ToolPageFrame` chrome as Rearrange/Rotate.
- `npm install && npm run build` hasn't been run against these changes in
  this environment (no network access here) — please confirm the build
  locally or on Vercel before deploying. I did run a manual TypeScript
  syntax/logic check against each new file and fixed a couple of real
  issues it caught (a Set-to-array type ambiguity, a missing explicit
  return type) before packaging this.
