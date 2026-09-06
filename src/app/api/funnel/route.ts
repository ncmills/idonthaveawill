import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isTestRequest } from "@/lib/test-request";

const ALLOWED_EVENTS = [
  "step_viewed",
  "step_completed",
  "will_generated",
  "download",
  "email_captured",
];

const ALLOWED_PROPERTY_KEYS = new Set([
  "step",
  "step_id",
  "step_index",
  "step_label",
  "state",
  "format",
  "source",
  "duration_ms",
  "total_steps",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, ...properties } = body;

    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    // Only allow whitelisted property keys, and strip long string values
    const safeProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(properties)) {
      if (!ALLOWED_PROPERTY_KEYS.has(key)) continue;
      if (typeof value === "string" && value.length > 50) continue;
      safeProps[key] = value;
    }

    const { error } = await supabaseAdmin.from("funnel_events").insert({
      event,
      properties: safeProps,
      // Stamped, never skipped (offsite-outpost#75, adv-1025c236c49e). This is an
      // ANALYTICS stream, not lead inventory, but it is the same disease: a smoke
      // run that walks the site fires src/lib/tracking.ts and inflates the funnel
      // it is supposed to be measuring, with no way to tell those rows apart.
      //
      // The header is the ONLY signal available here — this route takes no email,
      // so the reserved-address half of the fleet's composed signal has nothing to
      // read. That is a property of the payload, not an omission.
      is_test: isTestRequest(request),
    });

    if (error) {
      console.error("[funnel] supabase insert error:", error);
      return NextResponse.json({ error: "Failed to store" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
