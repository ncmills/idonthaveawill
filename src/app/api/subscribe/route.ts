import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const US_STATE_ABBRS = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT",
  "VT","VA","WA","WV","WI","WY",
]);

export async function POST(request: Request) {
  try {
    const { email: rawEmail, state } = await request.json();

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const email = rawEmail.trim().toLowerCase();

    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Validate state against real US-state/DC list so junk like "XX" / "ZZ" can't
    // pollute Resend or email_subscribers.
    const validState =
      typeof state === "string" && US_STATE_ABBRS.has(state.toUpperCase())
        ? state.toUpperCase()
        : null;


    // Store in Supabase (primary store)
    {
      const { error } = await supabaseAdmin.from("email_subscribers").upsert(
        { email, state: validState, subscribed_at: new Date().toISOString() },
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
          unsubscribed: false,
        });
      } catch (resendErr) {
        // Don't fail the request if Resend sync fails
        console.error("[subscribe] resend sync error:", resendErr);
      }
    }

    console.log(`[LEAD] subscribe email=${email} state=${validState ?? "-"}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[subscribe] error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
