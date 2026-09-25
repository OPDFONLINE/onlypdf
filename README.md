# OnlyPDF — Phase 3 + Navigation UX Patch

## Included
- Admin Analytics navigation item at `/admin/analytics` with active/pending state.
- Admin Blog CMS at `/admin/blog`.
- Blog draft, publish, scheduled publish, preview, edit and delete.
- Blog SEO title/description, slug, excerpt, category, topic cluster, related article slugs, author and featured image URL fields.
- Public `/blog` index and `/blog/[slug]` article pages.
- Blog scheduling fields are retained, but automatic Vercel Cron publishing is disabled.
- Public navigation active + loading feedback for top tools, dropdown tools, mobile tools, Blog, About, Contact and All Tools.
- Admin sidebar active + loading feedback.

## Supabase
Run `supabase/migrations/0004_blog_posts.sql` after the existing migrations.

## Vercel
Vercel Cron is intentionally disabled to avoid Vercel Cron limits. No `CRON_SECRET` is required by this project for scheduled publishing.

## Testing limitation
Local dependency installation timed out in the available environment, so a clean Next.js build/typecheck could not be completed here. Do not treat this patch as build-verified until Vercel reports a successful build.
