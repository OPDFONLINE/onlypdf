Cumulative SEO patch (safe to apply over any earlier patch from this series):
  P0-1 + P0-3  per-page OG/Twitter metadata and canonical URLs  (lib/seo/metadata.ts + page files)
  P0-2         default OG image, article OG image, favicon.ico, apple-touch-icon
  P0-4         real <lastmod> dates in sitemap.xml  (app/sitemap.ts, lib/seo/lastmod.ts, lib/supabase/tools.ts)
Unzip over the repository root (paths are relative to it), then run: npm run typecheck && npm run build
New files: lib/seo/metadata.ts, lib/seo/lastmod.ts, public/og-default.png, app/apple-icon.png, app/favicon.ico, scripts/generate-brand-images.mjs.
Maintenance: when you edit the visible content of /about, /contact, /privacy, /terms (or tool text in code), bump the matching date in lib/seo/lastmod.ts.
