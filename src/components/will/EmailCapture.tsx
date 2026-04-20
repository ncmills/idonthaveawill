"use client";

import { useState } from "react";
import { trackEmailCaptured } from "@/lib/tracking";

interface EmailCaptureProps {
  stateAbbr: string;
}

export default function EmailCapture({ stateAbbr }: EmailCaptureProps) {
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
        body: JSON.stringify({ email, state: stateAbbr }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setStatus("success");
      trackEmailCaptured("review");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="border-l-2 border-[var(--color-sage)] pl-6 py-4">
        <p className="font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink)]">
          You&apos;re signed up.
        </p>
        <p className="mt-1 text-[14px] text-[var(--color-ink-soft)]">
          We&apos;ll send you a reminder once a year to review your will. No spam, ever.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-cream-deep)] p-6 md:p-8 border border-[var(--color-rule)]">
      <p className="iha-caps">Annual correspondence</p>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-[22px] md:text-[24px] font-medium text-[var(--color-ink)] leading-tight">
        A yearly reminder to review your will.
      </h3>
      <p className="mt-3 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-ink-soft)]">
        Life changes — marriages, moves, new kids. We&apos;ll email you once a year to
        remind you to check if your will needs updating. That&apos;s it.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor="iha-review-email">
          Your email address
        </label>
        <input
          id="iha-review-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="iha-input flex-1"
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
        <p className="mt-3 text-[12.5px] text-[var(--color-ink)]" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="mt-3 text-[12px] text-[var(--color-ink-soft)]">
        We only store your email and state. No names, no will content, nothing else.
        Unsubscribe anytime.
      </p>
    </div>
  );
}
