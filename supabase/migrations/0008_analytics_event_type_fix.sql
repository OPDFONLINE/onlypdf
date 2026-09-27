-- Fixes a legacy column that predates these migrations: some earlier version
-- of analytics_events had a NOT NULL "event_type" column that this codebase
-- never writes to (it writes "event_name" instead). Every insert from
-- /api/analytics has been failing ever since with:
--   null value in column "event_type" ... violates not-null constraint
-- This safely relaxes that constraint without touching any existing data,
-- and does nothing if the column was never there in the first place.

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'analytics_events'
      and column_name = 'event_type'
  ) then
    alter table public.analytics_events alter column event_type drop not null;
  end if;
end $$;
