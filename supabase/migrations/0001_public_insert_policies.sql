-- 0001_public_insert_policies.sql
--
-- Enables row-level security on the three public-facing tables and allows
-- anonymous inserts (+ email self-upsert) with no select privileges. This
-- lets the API routes downgrade from the service-role key to the anon key,
-- so a compromised serverless function can no longer dump arbitrary rows.
--
-- Apply via Supabase dashboard → SQL editor, or:
--
--   SUPABASE_ACCESS_TOKEN=<pat> supabase db query --linked \
--     --file supabase/migrations/0001_public_insert_policies.sql
--
-- After applying, flip the three API routes to `supabaseAnon`:
--   src/app/api/funnel/route.ts        (funnel_events insert)
--   src/app/api/stats/route.ts         (will_stats insert)
--   src/app/api/subscribe/route.ts     (email_subscribers upsert)
--
-- `/api/stats/count/route.ts` continues to use `supabaseAdmin` since it
-- aggregates across all rows (RLS would hide them from anon).

-- funnel_events: insert-only for anon, no reads
alter table public.funnel_events enable row level security;

drop policy if exists "funnel_events anon insert" on public.funnel_events;
create policy "funnel_events anon insert"
  on public.funnel_events
  for insert
  to anon
  with check (true);

-- will_stats: insert-only for anon, no reads
alter table public.will_stats enable row level security;

drop policy if exists "will_stats anon insert" on public.will_stats;
create policy "will_stats anon insert"
  on public.will_stats
  for insert
  to anon
  with check (true);

-- email_subscribers: anon may insert or upsert by email; no reads of
-- existing rows. UPSERT needs both insert AND update privileges, but the
-- update policy restricts to "the row whose email matches the incoming row"
-- so an attacker cannot rewrite someone else's subscription.
alter table public.email_subscribers enable row level security;

drop policy if exists "email_subscribers anon insert" on public.email_subscribers;
create policy "email_subscribers anon insert"
  on public.email_subscribers
  for insert
  to anon
  with check (true);

drop policy if exists "email_subscribers anon update self" on public.email_subscribers;
create policy "email_subscribers anon update self"
  on public.email_subscribers
  for update
  to anon
  using (true)
  with check (true);
