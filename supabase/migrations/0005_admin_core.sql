-- OnlyPDF Admin Core
-- Idempotent schema for admin authorization, tool configuration, site settings,
-- advertising placements, and blog image usage tracking.

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

alter table public.admin_users
  add column if not exists email text,
  add column if not exists role text not null default 'admin',
  add column if not exists created_at timestamptz not null default now();

create index if not exists admin_users_role_idx on public.admin_users(role);
alter table public.admin_users enable row level security;
drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record"
on public.admin_users for select to authenticated
using (id = auth.uid());

create table if not exists public.tools (
  slug text primary key,
  enabled boolean not null default true,
  name text,
  one_liner text,
  description text,
  seo_title text,
  seo_description text,
  instructions jsonb,
  faq jsonb,
  sort_order integer,
  featured boolean not null default false,
  homepage_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.tools
  add column if not exists enabled boolean not null default true,
  add column if not exists name text,
  add column if not exists one_liner text,
  add column if not exists description text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists instructions jsonb,
  add column if not exists faq jsonb,
  add column if not exists sort_order integer,
  add column if not exists featured boolean not null default false,
  add column if not exists homepage_visible boolean not null default true,
  add column if not exists updated_at timestamptz not null default now();

alter table public.tools enable row level security;
drop policy if exists "Public can read enabled tools" on public.tools;
drop policy if exists "Public can read tool configuration" on public.tools;
create policy "Public can read tool configuration"
on public.tools for select to anon, authenticated
using (true);
drop policy if exists "Admins can manage tools" on public.tools;
create policy "Admins can manage tools"
on public.tools for all to authenticated
using (exists (select 1 from public.admin_users where id = auth.uid()))
with check (exists (select 1 from public.admin_users where id = auth.uid()));

create table if not exists public.site_settings (
  key text primary key,
  value text,
  description text,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all to authenticated
using (exists (select 1 from public.admin_users where id = auth.uid()))
with check (exists (select 1 from public.admin_users where id = auth.uid()));
drop policy if exists "Public can read public site settings" on public.site_settings;
create policy "Public can read public site settings"
on public.site_settings for select to anon, authenticated
using (key in ('site_name', 'site_tagline', 'homepage_title', 'homepage_description'));

create table if not exists public.ad_placements (
  id uuid primary key default gen_random_uuid(),
  placement_key text not null unique,
  provider text not null default 'none',
  enabled boolean not null default false,
  slot_id text,
  notes text,
  updated_at timestamptz not null default now()
);
alter table public.ad_placements enable row level security;
drop policy if exists "Admins can manage ad placements" on public.ad_placements;
create policy "Admins can manage ad placements"
on public.ad_placements for all to authenticated
using (exists (select 1 from public.admin_users where id = auth.uid()))
with check (exists (select 1 from public.admin_users where id = auth.uid()));

create table if not exists public.image_usage (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_image_id text,
  source_url text not null,
  photographer text,
  article_id uuid references public.blog_posts(id) on delete cascade,
  usage_date timestamptz not null default now()
);
create index if not exists image_usage_article_idx on public.image_usage(article_id);
create index if not exists image_usage_provider_image_idx on public.image_usage(provider, provider_image_id);
alter table public.image_usage enable row level security;
drop policy if exists "Admins can manage image usage" on public.image_usage;
create policy "Admins can manage image usage"
on public.image_usage for all to authenticated
using (exists (select 1 from public.admin_users where id = auth.uid()))
with check (exists (select 1 from public.admin_users where id = auth.uid()));

insert into public.ad_placements (placement_key, provider, enabled, notes)
values
  ('home_top', 'none', false, 'Homepage placement below the hero; never cover tool controls.'),
  ('home_mid', 'none', false, 'Homepage content placement.'),
  ('tool_before_result', 'none', false, 'Keep clear of upload and processing controls.'),
  ('tool_after_result', 'none', false, 'Post-result placement.'),
  ('blog_article', 'none', false, 'Blog article placement.')
on conflict (placement_key) do nothing;
