import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { AnonymizedStats } from "@/lib/statsSchema";
import { validateNoPI } from "@/lib/statsSchema";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    const stats: AnonymizedStats = await request.json();

    // Validate no PII leaked through
    if (!validateNoPI(stats)) {
      return NextResponse.json(
        { error: "Invalid payload — suspected PII" },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      // If Supabase isn't configured yet, just log and succeed
      console.log("[stats] received (no Supabase configured):", JSON.stringify(stats));
      return NextResponse.json({ success: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("will_stats").insert({
      state: stats.state,
      marital_status: stats.marital_status,
      has_children: stats.has_children,
      child_count: stats.child_count,
      has_minor_children: stats.has_minor_children,
      has_special_needs_children: stats.has_special_needs_children,
      has_guardian: stats.has_guardian,
      has_specific_bequests: stats.has_specific_bequests,
      bequest_count: stats.bequest_count,
      has_real_estate_bequests: stats.has_real_estate_bequests,
      residuary_type: stats.residuary_type,
      residuary_beneficiary_count: stats.residuary_beneficiary_count,
      include_digital_assets: stats.include_digital_assets,
      has_pets: stats.has_pets,
      has_disinheritances: stats.has_disinheritances,
      include_no_contest: stats.include_no_contest,
      include_simultaneous_death: stats.include_simultaneous_death,
      has_funeral_wishes: stats.has_funeral_wishes,
      is_community_property_state: stats.is_community_property_state,
    });

    if (error) {
      console.error("[stats] supabase insert error:", error);
      return NextResponse.json({ error: "Failed to store stats" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[stats] error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
