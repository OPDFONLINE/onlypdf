insert into public.ad_placements (placement_key, provider, enabled, notes)
values ('blog_sidebar', 'none', false, 'Sticky sidebar ad on single blog article pages.')
on conflict (placement_key) do nothing;
