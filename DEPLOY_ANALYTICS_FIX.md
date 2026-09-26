# OnlyPDF Analytics Fix — Deployment Note

## What was fixed

1. Fixed the Supabase migration-order bug:
   - `0003_analytics_events.sql` no longer references `admin_users` before that table exists.
   - `0005_admin_core.sql` creates the admin-only analytics read policy after `admin_users` exists.
   - Added `0007_analytics_repair.sql` to safely repair an already-deployed database where the analytics table/policy is missing.

2. Fixed silent analytics read failures:
   - Admin analytics now checks Supabase query errors instead of converting database failures into zero values.
   - The admin page now shows the actual configuration/database problem when analytics cannot load.

3. Updated `.env.example` to mark Supabase configuration as required for admin + analytics.

## Required production step

Vercel deployment does not automatically execute Supabase SQL migrations.

After deploying this code, run:

`supabase/migrations/0007_analytics_repair.sql`

in the production Supabase SQL Editor, or apply it through your normal Supabase migration workflow.

Also verify these Vercel environment variables exist:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The service-role key must remain server-side only.

## Expected result

After deployment + migration:

- Public page views create `page_view` events.
- Tool processing starts create `tool_start` events.
- Successful downloads create `tool_complete` events.
- Admin → Analytics reads those events from Supabase.
- A database/configuration failure is shown as an explicit error instead of misleading zeros.

No PDF contents, filenames, or PDF bytes are sent to analytics.
