-- Shared rate-limit counters for public endpoints (currently the contact form).
-- Only the server (service role) can use this: RLS is on with no policies, and
-- the function is executable by service_role only. Keys hold a salted one-way
-- hash of the visitor's IP, never the address itself, and rows are deleted after
-- two days.
--
-- Safe to run more than once.

begin;

create table if not exists public.rate_limits (
  bucket text not null,
  window_start timestamptz not null,
  hits integer not null default 0,
  primary key (bucket, window_start)
);
create index if not exists rate_limits_window_start_idx on public.rate_limits (window_start);
alter table public.rate_limits enable row level security;

-- Counts one hit and returns true while the caller is still within the limit.
create or replace function public.rate_limit_hit(p_bucket text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window timestamptz;
  v_hits integer;
begin
  if p_window_seconds < 1 or p_limit < 1 then
    raise exception 'invalid rate limit arguments';
  end if;
  v_window := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  insert into public.rate_limits as r (bucket, window_start, hits)
  values (p_bucket, v_window, 1)
  on conflict (bucket, window_start) do update set hits = r.hits + 1
  returning r.hits into v_hits;

  -- Keep the table tiny. This table only sees a handful of writes per day.
  delete from public.rate_limits where window_start < now() - interval '2 days';

  return v_hits <= p_limit;
end;
$$;

revoke all on function public.rate_limit_hit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;

commit;
