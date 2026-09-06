-- funnel_events.is_test + will_stats.is_test — harness traffic must not corrupt a reading.
--
-- finding_id: adv-1025c236c49e (mechanism is_test_stamping:offsite-outpost, data-db lens).
-- Propagated from offsite-outpost#75 (36437de): the signal is STAMPED, never used to skip the
-- write — the smoke harness reads its own row back.
--
-- THESE TWO ARE ANALYTICS, NOT LEAD INVENTORY, and that is why they still qualify:
--   funnel_events is the funnel this site measures itself by. A smoke run that merely WALKS the
--     site fires src/lib/tracking.ts and inflates the numbers it is supposed to be measuring.
--   will_stats is an anonymized RESEARCH dataset (the route rejects anything resembling PII via
--     validateNoPI). Harness rows do not merely add noise here — they bias the distribution the
--     table exists to describe, and nothing downstream could tell them apart.
--
-- The site already had `isReservedTestEmail` (src/lib/testEmailGuard.ts), but it guards
-- /api/subscribe -> email_subscribers, which was never the finding. NEITHER of these two routes
-- takes an email at all, so the reserved half of the fleet's composed signal has nothing to read
-- and the `x-sn-test-run` header is the only signal that can exist for them.
--
-- ⚠️ NOT APPLIED BY THIS PR, AND ORDER MATTERS. Both tables exist in the shared database, so these
-- ALTERs can apply on their own — but the routes send is_test unconditionally and PostgREST rejects
-- the whole row on an unknown column. APPLY THIS BEFORE THE CODE DEPLOYS or analytics writes start
-- returning 500. Checked against the linked project 2026-09-05: wp_leads was the only table in the
-- shared DB carrying the column.

ALTER TABLE public.funnel_events
  ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE public.will_stats
  ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN public.funnel_events.is_test IS
  'True when the event came from automated traffic (the x-sn-test-run secret). Stamped, never used '
  'to skip the write. EXCLUDE IT when computing funnel conversion or the harness inflates the funnel.';

COMMENT ON COLUMN public.will_stats.is_test IS
  'True when the row came from automated traffic. Stamped, never used to skip the write. EXCLUDE IT '
  'from any published statistic — these rows are synthetic and would bias the distribution.';

-- Existing rows keep FALSE: they predate the signal, and marking them true would assert something
-- about their origin that nothing here measured. Note this means pre-2026-09 analytics still mix
-- harness and real traffic; the column fixes the reading going forward, not retroactively.
CREATE INDEX IF NOT EXISTS funnel_events_is_test_idx
  ON public.funnel_events (is_test) WHERE is_test = FALSE;
CREATE INDEX IF NOT EXISTS will_stats_is_test_idx
  ON public.will_stats (is_test) WHERE is_test = FALSE;
