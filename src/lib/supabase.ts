import { createClient } from "@supabase/supabase-js";

/**
 * Two Supabase clients with distinct blast radii.
 *
 * - `supabaseAdmin` uses the SERVICE_ROLE key, bypasses RLS, and should only
 *   be reachable from server-only code (API routes, server components). Use
 *   for reads of cross-user analytics aggregates (e.g. `/api/stats/count`
 *   pulls all rows regardless of the caller) or mutations that need to skip
 *   RLS for system-level auditing.
 *
 * - `supabaseAnon` uses the PUBLIC anon key and obeys RLS policies. Once the
 *   migration at `supabase/migrations/0001_public_insert_policies.sql` has
 *   been applied in the dashboard, every route that only needs insert/upsert
 *   on `funnel_events`, `will_stats`, or `email_subscribers` should switch
 *   to this client so a compromised serverless function cannot exfiltrate
 *   unrelated data.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!.trim();
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
export const supabaseAnon = createClient(supabaseUrl, anonKey);

/** @deprecated prefer `supabaseAdmin` (explicit about privilege) or `supabaseAnon`. */
export const supabase = supabaseAdmin;
