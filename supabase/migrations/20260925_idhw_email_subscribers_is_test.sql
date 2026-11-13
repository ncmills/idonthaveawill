-- email_subscribers.is_test — the third write path, widened to the same guard.
--
-- finding_id: adv-1025c236c49e (mechanism is_test_stamping:offsite-outpost, data-db lens).
-- Follows 20260905_idhw_is_test.sql, which stamped funnel_events + will_stats and recorded that
-- email_subscribers "was never the finding" because it already had isReservedTestEmail
-- (src/lib/testEmailGuard.ts). That reading was too narrow:
--
--   isReservedTestEmail rejects RFC-2606 / throwaway DOMAINS (example.com, mailinator.com, ...).
--   It cannot see a harness or e2e run that signs up with an ordinary-looking address, and
--   src/components/will/EmailCapture.tsx, DownloadButton.tsx and HomepageEmailCapture.tsx all POST
--   straight to /api/subscribe with no automated-traffic check at all. So the site's HIGHEST-value
--   table — real lead inventory, also synced live to the Resend audience — was the one write path
--   with no `x-sn-test-run` signal, while the two analytics routes had it.
--
-- Same rule as the other two columns: STAMPED, never used to skip the write. The smoke harness
-- still gets its row (and still reaches Resend, which the reserved-domain guard already bounds).
--
-- ⚠️ NOT APPLIED BY THIS PR, AND ORDER MATTERS. /api/subscribe sends is_test unconditionally and
-- PostgREST rejects the whole row on an unknown column. APPLY THIS BEFORE THE CODE DEPLOYS or
-- subscribe writes start logging a supabase error and silently dropping leads.

ALTER TABLE public.email_subscribers
  ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN public.email_subscribers.is_test IS
  'True when the signup came from automated traffic (the x-sn-test-run secret). Stamped, never used '
  'to skip the write. EXCLUDE IT from lead counts and any list export. The route upserts on email, '
  'so this reflects the MOST RECENT write for that address, not its first.';

-- Existing rows keep FALSE: they predate the signal, and marking them true would assert something
-- about their origin that nothing here measured. Pre-2026-09 lead counts still mix harness and real
-- signups; the column fixes the reading going forward, not retroactively.
CREATE INDEX IF NOT EXISTS email_subscribers_is_test_idx
  ON public.email_subscribers (is_test) WHERE is_test = FALSE;
