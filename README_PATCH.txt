Cumulative SEO patch (safe to apply over any earlier patch from this series):
  P0-1 + P0-3  per-page OG/Twitter metadata and canonical URLs  (lib/seo/metadata.ts + page files)
  P0-2         default OG image, article OG image, favicon.ico, apple-touch-icon
  P0-4         real <lastmod> dates in sitemap.xml  (app/sitemap.ts, lib/seo/lastmod.ts, lib/supabase/tools.ts)
  P0-5         privacy/terms: draft notes removed, real "Last updated" date, 3 small accuracy fixes (app/privacy, app/terms)
  P0-6         machine-readable-only article dates (articleDates helper -> JSON-LD + Open Graph); no visible dates, by decision
  P0-7         <html lang="en-US">   P0-8  X-Robots-Tag noindex on /admin and /api (next.config.mjs)
  P1-5         IndexNow, no cron: key file, helper (lib/seo/indexnow.ts), pings on save in the admin blog/tools APIs, and two admin buttons (components/admin/IndexNowPanel.tsx, app/api/admin/indexnow/route.ts)
  P2-1 + P2-2  WebApplication + BreadcrumbList JSON-LD on all 15 tool pages, BreadcrumbList on articles, visible breadcrumbs (lib/seo/schema.ts, components/seo/ToolSchema.tsx, components/ui/Breadcrumbs.tsx, tool page templates, app/blog/[slug]/page.tsx)
  P2-3 + P2-4  Article schema (image, publisher+logo, author), Organization on the homepage, pen-name author David Valle (lib/seo/entity.ts, lib/seo/schema.ts, public/logo.png, blog pages, app/page.tsx)
  NOTE: every article now shows "By David Valle" (stored 'OnlyPDF Team' values are replaced at display time; the database is not changed).
  TO DO LATER: add your real profile URLs to SOCIAL_PROFILES in lib/seo/entity.ts (empty now, so sameAs is left out).
IF YOU APPLIED AN EARLIER VERSION OF THIS PATCH: delete the folder app/api/cron (the cron job was removed). vercel.json in this patch has no crons; no CRON_SECRET is needed.
Unzip over the repository root (paths are relative to it), then run: npm run typecheck && npm run build
Note: next.config.mjs, app/layout.tsx, vercel.json, .env.example and the admin API route files are full files; if you changed them since the zip you uploaded, merge by hand.
New files: lib/seo/entity.ts, public/logo.png, lib/seo/metadata.ts, lib/seo/lastmod.ts, lib/seo/schema.ts, lib/seo/indexnow.ts, components/seo/ToolSchema.tsx, components/ui/Breadcrumbs.tsx, public/og-default.png, app/apple-icon.png, app/favicon.ico, scripts/generate-brand-images.mjs.
Maintenance: when you edit the visible content of /about, /contact, /privacy, /terms (or tool text in code), bump the matching date in lib/seo/lastmod.ts and the "Last updated" line on the page.
