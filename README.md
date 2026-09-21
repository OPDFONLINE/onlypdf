# OnlyPDF.online

Free, browser-first PDF tools. This repo currently contains the **foundation**
described in Step 1 of the project spec:

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Global layout with header and footer
- Homepage with hero, the six tool cards, a privacy section, and FAQ
- Basic `/tools/...` routing for all six tools, with a shared page shell
  (upload UI, instructions, FAQ, related tools) ready for real PDF logic
- About, Privacy, Terms, and Contact pages
- Custom 404 page

No PDF processing logic is wired up yet — each tool page currently shows a
working upload UI with a disabled "coming soon" action. That's intentional:
per the spec, each tool is implemented one at a time, in its own step.

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
  home/                # Hero, ToolGrid, PrivacySection
  tools/                # ToolCard, ToolPageShell
  ui/                   # Faq
lib/
  tools.ts             # single source of truth for tool metadata
```

## Next steps (per the spec's development sequence)

1. Build Merge PDF using `pdf-lib` inside `components/tools/ToolPageShell.tsx`
   (or a tool-specific client component), replacing the disabled button.
2. Repeat for Split, Delete Pages, Extract Pages, Rearrange, and Rotate.
3. Test all six tools against a range of real PDF files.
4. Add the Supabase schema, admin authentication, and admin dashboard.
5. Build the blog CMS and the Pexels/Pixabay image workflow.
6. Add SEO infrastructure (sitemap, robots.txt, JSON-LD), analytics, and
   admin-controlled ad configuration.

See the full spec document for details on each of these steps.

## Deployment

This project is set up to deploy on Vercel with GitHub as the source. Connect
the repository in the Vercel dashboard and it will build with the default
Next.js settings — no extra configuration is required for this stage.

No environment variables are required yet. See `.env.example` for what will
be added when Supabase, Resend, and the image providers are introduced.
