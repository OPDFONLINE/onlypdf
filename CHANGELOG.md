# Changelog

## Admin Batch — 2026-09-25

- Reorganized the admin navigation into Overview, Insights, Content, and Growth groups.
- Added a control-center dashboard with tool, blog, analytics, and configuration status.
- Added Site Settings management for routine site identity/editorial defaults.
- Wired homepage metadata and hero supporting copy to public site settings.
- Added Monetization placement management with provider/slot configuration.
- Added idempotent Supabase admin-core migration for `admin_users`, `tools`, `site_settings`, `ad_placements`, and `image_usage`.
- Added shared server-side admin authorization helper.
- Fixed tool-management RLS so disabled tool overrides remain readable by the public configuration reader and can actually take effect.
- Kept ad configuration separate from rendering so no provider is injected into the live UX by this batch.

### Verification

- Changed TypeScript/TSX files were syntax-parsed successfully with TypeScript 5.8.
- A full `npm install` / Next.js production build could not be completed in this environment because npm registry access failed with `EAI_AGAIN`. The package remains Vercel-compatible and should be build-verified by the next deployment.
