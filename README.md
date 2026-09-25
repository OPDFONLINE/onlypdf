# OnlyPDF — Production Readiness Patch

This repository contains the current OnlyPDF application plus the latest production-readiness fixes.

## Included in this patch

- Supabase SSR middleware for reliable admin session refresh.
- Dynamic `sitemap.xml` and `robots.txt`.
- Canonical metadata for tool and blog routes.
- WebSite, WebApplication, and Article JSON-LD structured data.
- Pexels/Pixabay admin image search with server-side API keys.
- Selected blog images copied into Supabase Storage instead of permanently hotlinking Pixabay URLs.
- Blog image usage/source/creator metadata recording.
- Resend-powered contact form with server-side delivery.
- Production environment variable documentation for Supabase, Resend, Pexels, and Pixabay.
- Existing Analytics, Blog CMS, admin navigation, monetization settings, and Cron-free deployment behavior are preserved.

## Required Supabase migration

Run the new migration after the existing migrations:

`supabase/migrations/0006_blog_images.sql`

This creates the public `blog-images` storage bucket and admin-only storage write policies.

## Required production environment variables

Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Resend contact delivery:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

Blog image search:
- `PEXELS_API_KEY`
- `PIXABAY_API_KEY`

Keep all provider/API secrets server-side. Do not prefix them with `NEXT_PUBLIC_`.

## Scheduled publishing

Blog scheduling fields remain available, but Vercel Cron is intentionally not used. A scheduled article is not automatically published merely because its scheduled time has passed. Automatic publishing needs a separate scheduler (for example, a trusted external job or a Supabase-based scheduler) before it should be advertised as fully automatic.

## Build verification

The available environment could not complete `npm install` before timeout, so this patch has not been independently verified with a clean local Next.js build. Treat Vercel's production build as the final deployment gate.
