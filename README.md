# OnlyPDF.online

Free, browser-first PDF tools.

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Global layout with header and footer
- Homepage with hero, tool grid, privacy section, SEO content, and FAQ
- `/tools/...` routing with a shared page shell (upload UI, instructions,
  FAQ, related tools) for simple tools, plus dedicated components for tools
  that need page thumbnails
- About, Privacy, Terms, and Contact pages
- Custom 404 page

## PDF tools (all client-side, no file upload to a server)

| Tool | Slug | Library |
| --- | --- | --- |
| Merge PDF | `/tools/merge-pdf` | pdf-lib |
| Split PDF | `/tools/split-pdf` | pdf-lib + a tiny built-in ZIP writer |
| Delete PDF Pages | `/tools/delete-pdf-pages` | pdf-lib |
| Extract PDF Pages | `/tools/extract-pdf-pages` | pdf-lib |
| Rearrange PDF Pages | `/tools/rearrange-pdf` | pdf-lib + pdfjs-dist (thumbnails) |
| Rotate PDF | `/tools/rotate-pdf` | pdf-lib + pdfjs-dist (thumbnails) |

Rearrange and Rotate render page thumbnails with `pdfjs-dist` so people can
see and pick pages visually, then apply the change with `pdf-lib`. The
`pdfjs-dist` worker is loaded from a CDN (pinned to the installed package
version) rather than bundled, to keep the build simple. Nothing about the
file itself ever leaves the browser — the worker is just the rendering
engine's own script.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```text
app/
  layout.tsx          # root layout, fonts, metadata
  page.tsx             # homepage
  tools/
    page.tsx            # tools index
    merge-pdf/page.tsx
    split-pdf/page.tsx
    delete-pdf-pages/page.tsx
    extract-pdf-pages/page.tsx
    rearrange-pdf/page.tsx
    rotate-pdf/page.tsx
  about/ privacy/ terms/ contact/
components/
  layout/              # Header, Footer
  home/                # Hero, ToolGrid, PrivacySection, SeoContent, CtaBand
  tools/                # ToolCard, ToolPageShell, ToolPageFrame,
                         # RearrangePdfTool, RotatePdfTool, PdfPageThumb
  ui/                   # Faq
lib/
  tools.ts             # single source of truth for tool metadata
  toolProcessors.ts    # (files, selectedPages) -> Blob for the simple tools
  pdf/                 # one file per PDF operation
```

## Next up

Per the product spec, the next tools planned are the image/PDF converters:

- JPG/JPEG to PDF
- PNG to PDF
- PDF to JPG/JPEG/PNG

After the tool library is solid, remaining steps from the spec:

1. Test all tools against a range of real PDF files (including large,
   scanned, and password-protected PDFs, to confirm error handling).
2. Build the Supabase schema and secure admin authentication.
3. Build the admin dashboard (tool management, analytics, ad config).
4. Build the blog CMS and the Pexels/Pixabay image workflow.
5. Add SEO infrastructure (sitemap, robots.txt, JSON-LD), analytics, and
   admin-controlled ad configuration.

See the full spec document for details on each of these steps.

## Deployment

This project is set up to deploy on Vercel with GitHub as the source. Connect
the repository in the Vercel dashboard and it will build with the default
Next.js settings — no extra configuration is required for this stage.

No environment variables are required yet. See `.env.example` for what will
be added when Supabase, Resend, and the image providers are introduced.
