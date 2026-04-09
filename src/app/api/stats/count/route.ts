import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("will_stats")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[stats/count] error:", error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json(
      { count: count ?? 0 },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error("[stats/count] error:", error);
    return NextResponse.json({ count: 0 });
  }
}
