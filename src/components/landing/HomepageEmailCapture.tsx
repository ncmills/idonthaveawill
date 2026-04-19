"use client";

import { useState } from "react";
import { trackEmailCaptured } from "@/lib/tracking";

export default function HomepageEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state: null }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEmailCaptured("homepage");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <section className="py-16 bg-[var(--color-cream-deep)]">
        <div className="max-w-xl mx-auto px-6">
          <div className="border-l-2 border-[var(--color-sage)] pl-6">
            <p className="font-[family-name:var(--font-display)] italic text-[20px] text-[var(--color-ink)]">
              You&apos;re signed up.
            </p>
            <p className="mt-2 text-[15px] text-[var(--color-ink-soft)]">
              We&apos;ll send you a reminder once a year to review your will.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-24 bg-[var(--color-cream-deep)]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="iha-caps">Annual correspondence</p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)] leading-tight">
          A yearly reminder to review your will.
        </h3>
        <p className="mt-4 font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink-soft)]">
          Life changes. We&apos;ll email you once a year to check if your will needs updating. That&apos;s it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <label className="sr-only" htmlFor="iha-home-email">
            Your email address
          </label>
          <input
            id="iha-home-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-rule)] text-[var(--color-ink)] text-[15px] placeholder:text-[var(--color-ink-soft)]/70 focus:outline-none focus:border-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-sage)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream-deep)]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="iha-seal justify-center disabled:opacity-60"
          >
            <span className="iha-seal-mark" aria-hidden="true" />
            {status === "loading" ? "Signing up…" : "Remind me"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-[13px] text-[var(--color-ink)]" role="alert">
            {errorMsg}
          </p>
        )}

        <p className="mt-4 text-[12px] text-[var(--color-ink-soft)]">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
