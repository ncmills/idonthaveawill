import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ALLOWED_EVENTS = [
  "step_viewed",
  "step_completed",
  "will_generated",
  "download",
  "email_captured",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, ...properties } = body;

    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    // Strip any string value longer than 50 chars to prevent PII leakage
    const safeProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(properties)) {
      if (typeof value === "string" && value.length > 50) continue;
      safeProps[key] = value;
    }

    if (!supabaseUrl || !supabaseKey) {
      console.log("[funnel] received (no Supabase):", event, safeProps);
      return NextResponse.json({ success: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("funnel_events").insert({
      event,
      properties: safeProps,
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
