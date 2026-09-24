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
| JPG to PDF | `/tools/jpg-to-pdf` | pdf-lib (image embedding) |
| PDF to JPG | `/tools/pdf-to-jpg` | pdfjs-dist (rendering) + built-in ZIP writer

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
    page.tsx            # tools index (reads admin overrides)
    merge-pdf/page.tsx
    split-pdf/page.tsx
    ... one folder per tool
  admin/
    layout.tsx          # shared metadata (noindex) for /admin/*
    login/page.tsx       # Supabase sign-in (or setup instructions)
    (protected)/         # route group: everything here requires a signed-in admin
      layout.tsx          # session + admin_users check, sidebar nav
      page.tsx             # dashboard overview
      tools/page.tsx        # tool management
  api/
    admin/tools/route.ts  # PATCH: upsert a tool override (admin-only)
  about/ privacy/ terms/ contact/
components/
  layout/              # Header, Footer
  home/                # Hero, ToolGrid, PrivacySection, SeoContent, CtaBand
  tools/                # ToolCard, ToolPageShell, ToolPageFrame,
                         # RearrangePdfTool, RotatePdfTool, PdfPageThumb, ...
  admin/                # AdminLoginForm, SignOutButton, ToolsManager
  ui/                   # Faq
lib/
  tools.ts             # static source of truth for tool metadata
  toolProcessors.ts    # (files, selectedPages) -> Blob for the simple tools
  pdf/                 # one file per PDF operation
  supabase/
    env.ts               # env var access + isSupabaseConfigured flags
    client.ts            # browser client (login form only)
    server.ts            # cookie-bound server client (session-aware)
    public.ts            # cookie-free client, safe to cache
    service.ts           # service-role client, server-only, RLS-bypassing
    tools.ts             # merges lib/tools.ts with Supabase overrides
middleware.ts          # protects /admin/*
supabase/
  migrations/
    0001_admin_foundation.sql
```

## Admin panel

`/admin` is a Supabase-authenticated admin panel. There is no public sign-up
— admin accounts are created directly in the Supabase dashboard, per the
spec's requirement that admin access never depend only on a hidden URL.

**What's live right now:**

- Secure sign-in (`/admin/login`) backed by Supabase Auth, with session
  handling via middleware and an `admin_users` authorization check (being a
  valid Supabase user isn't enough — the account also has to be listed in
  `admin_users`).
- A dashboard overview (`/admin`) with tool counts and an honest "no data
  yet" state for analytics — nothing here is faked.
- Tool management (`/admin/tools`): enable/disable any tool, rename it,
  edit its description and SEO title/description, set homepage visibility,
  mark it featured, and control display order. Saved changes go live on the
  homepage and `/tools` index within about a minute (or immediately, since
  saving also triggers on-demand revalidation).

**Setup:**

1. Create a Supabase project.
2. Run `supabase/migrations/0001_admin_foundation.sql` against it (Supabase
   dashboard → SQL Editor, or the Supabase CLI).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your
   environment (see `.env.example`). `SUPABASE_SERVICE_ROLE_KEY` isn't
   required for the admin panel itself yet — it's reserved for the
   analytics-writing route described below, once that's built.
4. In the Supabase dashboard, go to Authentication → Users and create your
   admin account (email + password). There's no public sign-up page.
5. Copy that user's ID and run:
   `insert into public.admin_users (id, email) values ('<uuid>', '<email>');`
6. Sign in at `/admin/login`.

Without Supabase configured, `/admin/login` shows setup instructions instead
of a broken form, and the public site behaves exactly as before (every tool
enabled, in file order) — connecting Supabase is entirely optional until
you're ready to use the admin panel.

**Known limits of this pass** (next increments, in spec order):

- The 12 individual `/tools/[slug]` pages and the header/footer nav still
  read the static `lib/tools.ts` data directly. Disabling a tool currently
  hides it from the homepage and `/tools` index, but its URL is still
  reachable and it's still linked from the nav — wiring `enabled` into a
  `notFound()` check and pulling the admin-edited name/SEO copy into those
  12 pages is the next small step.
- Tool page body content (the instructions list) and FAQ editing aren't in
  the admin panel yet — only the fields listed above.
- No analytics collection, blog CMS, image workflow, or ad configuration
  yet. The `site_settings` and `analytics_events` tables already exist in
  the migration for when those are built.

## Next up

Per the product spec, remaining steps are:

1. Test all tools against a range of real PDF and image files (large,
   scanned, password-protected PDFs; unusual image formats/color profiles).
2. Extend admin tool management to the 12 individual tool pages, header, and
   footer (see "Known limits" above).
3. Build the blog CMS and the Pexels/Pixabay image workflow.
4. Add SEO infrastructure (sitemap, robots.txt, JSON-LD), analytics
   collection, and admin-controlled ad configuration.

See the full spec document for details on each of these steps.

## Deployment

This project is set up to deploy on Vercel with GitHub as the source. Connect
the repository in the Vercel dashboard and it will build with the default
Next.js settings.

The public site needs no environment variables. Set the Supabase variables
in `.env.example` (also as Vercel project environment variables) to enable
`/admin`.


### Compress PDF

The project now includes `/tools/compress-pdf`, with High / Medium / Express automatic compression and a target-size mode (for example, 10 MB or 800 KB). Compression runs in the browser using the existing `pdfjs-dist` and `pdf-lib` dependencies.
