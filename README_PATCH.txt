Cumulative patch: P0-1 + P0-3 (per-page OG/Twitter metadata, canonical) and P0-2 (default OG image, article OG image, favicon.ico, apple-touch-icon).
Unzip over the repository root (paths are relative to it), then run: npm run typecheck && npm run build
New files: lib/seo/metadata.ts, public/og-default.png, app/apple-icon.png, app/favicon.ico, scripts/generate-brand-images.mjs.
Safe to apply even if the earlier P0-1 patch is already applied.
