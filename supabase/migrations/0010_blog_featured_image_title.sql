-- Adds a separate "hover title" for the featured image, distinct from its
-- alt text, so editors can control the tooltip text shown on hover without
-- affecting the accessible alt description.
alter table public.blog_posts
  add column if not exists featured_image_title text;
