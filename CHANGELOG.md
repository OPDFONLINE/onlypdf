# Phase 3 / UX Changelog

- Added Analytics to the admin navigation.
- Added explicit active and pending navigation feedback.
- Added Blog CMS and public blog routes.
- Added draft/publish/schedule workflow.
- Removed Vercel Cron scheduled publishing to avoid deployment/account Cron limits.
- Added blog SEO/content metadata fields and preview.
- Added Supabase `blog_posts` migration with admin RLS and public published-only reads.

# Blog & footer redesign
- Single article sidebar now lists 3-5 similar articles (related slugs, then topic cluster, then category, then recent) instead of article images. Shown below the article on mobile.
- Public /blog redesigned: hero post, category filter, 9-per-page pagination (`?page=`).
- Admin Blog: server-side search, status/category filters, status counts, pagination (10 per page), tabbed editor (Content / SEO / Media / Settings) with Markdown toolbar and search preview. Admin sidebar has a Blog sub-menu (All posts, Published, Drafts, Scheduled, New article).
- Footer: tools split into "PDF Tools" (8) and "Convert Tools" (4: PDF to Word, Word to PDF, JPG to PDF, PDF to JPG).
- Added blog batch 3 (10 articles): illustrate via /api/admin/blog/illustrate?slug=<slug>.
- Added blog batch 4 (5 pillar guides, 1370-1650 words) and aligned batch 3 categories/clusters with batches 1-2.
- Added blog batch 5 (5 pillar guides, 1470-1770 words).
- Removed public image credit line; hid duplicate in-body H1 title; added blog batch 6 (5 guides).
- Removed visible publish dates from the blog index, hero, cards, similar-articles sidebar and article page (JSON-LD dates kept).

# Watermark remover upgrade
- Smart mode: scans pages for tagged watermarks, semi-transparent text/images/shapes, stamp layers (Form XObjects added by pdftk, qpdf, pypdf and similar) and Watermark/Stamp annotations, and deletes the chosen ones for real, with Before/After preview and page scope.
- Manual mode: multiple boxes, move/resize, undo/redo, per-box page scope, zoom and pan, auto/white/custom/picked cover colour, cover preview, larger touch handles.
- Rotated (/Rotate) and offset-CropBox pages are handled correctly.
- Updated tool copy (lib/tools.ts, homepage SEO text), rewrote the two watermark articles, refreshed the watermark wording in the tool-chooser and scanned-vs-digital guides.
- Sitemap now revalidates hourly so newly published articles appear without a redeploy.
