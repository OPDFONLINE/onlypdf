create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique,
  status text not null default 'draft' check (status in ('draft','published','scheduled')),
  excerpt text, content text not null default '', seo_title text, seo_description text,
  featured_image_url text, category text, topic_cluster text, related_slugs text[] not null default '{}',
  author text, published_at timestamptz, scheduled_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists blog_posts_status_published_idx on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category);
alter table public.blog_posts enable row level security;
drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts" on public.blog_posts for select to anon, authenticated using (status='published' and published_at is not null and published_at <= now());
drop policy if exists "Admins can manage blog posts" on public.blog_posts;
create policy "Admins can manage blog posts" on public.blog_posts for all to authenticated using (exists (select 1 from public.admin_users where admin_users.id=auth.uid())) with check (exists (select 1 from public.admin_users where admin_users.id=auth.uid()));
