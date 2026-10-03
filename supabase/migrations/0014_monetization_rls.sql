-- Monetization + settings access fix.
--
-- 1) ad_placements had only an admin policy, so visitors (the anon role) could
--    never read the placement rows and no ad would ever render. Visitors may now
--    read ENABLED placements only.
-- 2) site_settings had "Anyone can read site settings" (using true), which let
--    anyone with the public anon key read EVERY setting, including contact_email
--    and default_author. Public reads are now limited to the seven keys the site
--    actually renders publicly.
-- 3) Removes a duplicate admin policy. The remaining admin policy is recreated
--    here so admins keep full access.
--
-- Safe to run more than once.

begin;

-- 1. Ads: public may read enabled placements only
alter table public.ad_placements enable row level security;
drop policy if exists "Public can read enabled ad placements" on public.ad_placements;
create policy "Public can read enabled ad placements"
on public.ad_placements for select to anon, authenticated
using (enabled = true);

-- 2. Settings: public may read only the keys that are meant to be public
alter table public.site_settings enable row level security;
drop policy if exists "Public can read public site settings" on public.site_settings;
create policy "Public can read public site settings"
on public.site_settings for select to anon, authenticated
using (key = any (array[
  'site_name',
  'site_tagline',
  'homepage_title',
  'homepage_description',
  'google_site_verification',
  'google_adsense_publisher_id',
  'other_verification_meta'
]));
drop policy if exists "Anyone can read site settings" on public.site_settings;

-- 3. Admin access: one policy instead of two identical ones
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all to authenticated
using (exists (select 1 from public.admin_users where id = auth.uid()))
with check (exists (select 1 from public.admin_users where id = auth.uid()));
drop policy if exists "Admins can write site settings" on public.site_settings;

commit;

-- Check: expect exactly these policies.
--   ad_placements: Admins can manage ad placements, Public can read enabled ad placements
--   site_settings: Admins can manage site settings, Public can read public site settings
select tablename, policyname, cmd, roles, qual
from pg_policies
where schemaname = 'public' and tablename in ('site_settings', 'ad_placements')
order by tablename, policyname;
