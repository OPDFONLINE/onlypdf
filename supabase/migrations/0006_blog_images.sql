-- Store the attribution metadata needed to render a public credit beside featured images.
alter table public.blog_posts
  add column if not exists image_provider text,
  add column if not exists image_source_url text,
  add column if not exists image_photographer text,
  add column if not exists image_photographer_url text;

-- Blog image storage for provider-selected images.
-- The bucket is public because published article images must be fetchable by browsers.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where id = auth.uid())
);

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
on storage.objects for update to authenticated
using (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where id = auth.uid())
)
with check (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where id = auth.uid())
);

drop policy if exists "Public can read blog images" on storage.objects;
create policy "Public can read blog images"
on storage.objects for select to public
using (bucket_id = 'blog-images');

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where id = auth.uid())
);
