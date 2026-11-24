import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getWillCount, type WillStatsClient } from "./logic";

export const revalidate = 300;

export async function GET() {
  // Cast: the real SupabaseClient's generic builder types are structurally
  // deep enough that TS's comparison against the minimal WillStatsClient
  // shape hits "excessively deep" (TS2589). The real client is a superset
  // of WillStatsClient at runtime; this cast only skips the structural
  // check, not a real behavior difference.
  const result = await getWillCount(supabaseAdmin as unknown as WillStatsClient);

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json(
    { count: result.count },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
