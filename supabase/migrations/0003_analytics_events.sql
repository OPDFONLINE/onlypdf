-- Real privacy-conscious analytics event storage.
-- The public never receives a direct insert policy; the Next.js analytics
-- route writes through the server-only service-role client.
create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  tool_slug text,
  path text not null,
  referrer text,
  source text not null default 'direct',
  device_category text,
  country_code text,
  session_id uuid,
  created_at timestamptz not null default now()
);

alter table public.analytics_events
  add column if not exists event_name text,
  add column if not exists tool_slug text,
  add column if not exists path text,
  add column if not exists referrer text,
  add column if not exists source text,
  add column if not exists device_category text,
  add column if not exists country_code text,
  add column if not exists session_id uuid,
  add column if not exists created_at timestamptz;

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_event_name_created_at_idx on public.analytics_events (event_name, created_at desc);
create index if not exists analytics_events_tool_slug_created_at_idx on public.analytics_events (tool_slug, created_at desc);

alter table public.analytics_events enable row level security;

drop policy if exists "Admins can read analytics events" on public.analytics_events;
create policy "Admins can read analytics events"
on public.analytics_events
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.id = auth.uid()
  )
);
