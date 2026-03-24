import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(request: Request) {
  try {
    const { email, state } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Validate state is a 2-letter code (no PII can sneak in)
    if (state && (typeof state !== "string" || state.length !== 2)) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    // Store in Supabase (primary store)
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("email_subscribers").upsert(
        { email, state, subscribed_at: new Date().toISOString() },
        { onConflict: "email" }
      );
      if (error) {
        console.error("[subscribe] supabase error:", error);
      }
    }

    // Sync to Resend audience (if configured)
    if (AUDIENCE_ID && resend) {
      try {
        await resend.contacts.create({
          email,
          audienceId: AUDIENCE_ID,
          firstName: state || "",
          unsubscribed: false,
        });
      } catch (resendErr) {
        // Don't fail the request if Resend sync fails
        console.error("[subscribe] resend sync error:", resendErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[subscribe] error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
