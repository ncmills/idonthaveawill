import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (!AUDIENCE_ID) {
      // If no audience configured yet, just log and succeed
      // This lets the UI work before Resend audience is set up
      console.log(`[subscribe] email=${email} state=${state} (no audience configured)`);
      return NextResponse.json({ success: true });
    }

    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      firstName: state || "", // Store state in firstName field as a tag
      unsubscribed: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[subscribe] error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
