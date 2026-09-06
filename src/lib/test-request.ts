/**
 * Automated-traffic stamp, ported from the sibling sites'
 * `lib/signals-server.ts` (`isTestRequest`).
 *
 * SECRET-GATED ON PURPOSE. An unsecured "this is a test" flag would let a real
 * visitor mark their own conversion as test and vanish from the funnel — the
 * flag has to be something only a daemon, an e2e run or a smoke probe can set.
 *
 * With `SIGNAL_TEST_SECRET` unset this returns false for every request, which
 * is the safe direction: unstamped real traffic is a correct reading, stamped
 * fake traffic counted as real is not.
 */
export function isTestRequest(req: Request): boolean {
  const secret = process.env.SIGNAL_TEST_SECRET;
  if (!secret) return false;
  return req.headers.get("x-sn-test-run") === secret;
}

/*
 * PORTED 2026-09-05 for adv-1025c236c49e (mechanism is_test_stamping:offsite-outpost).
 * Byte-identical rule to maid-of-honor-hq/src/lib/signals-server.ts#isTestRequest, so
 * every site agrees about what "test" means.
 *
 * This site had `isReservedTestEmail` (src/lib/testEmailGuard.ts) but no header signal.
 * The reserved guard protects /api/subscribe -> email_subscribers. It does NOT protect
 * /api/funnel or /api/stats, which take no email at all — for those two the header is
 * the ONLY signal that can exist.
 */
