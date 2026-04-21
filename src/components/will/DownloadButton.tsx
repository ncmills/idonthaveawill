"use client";

import { useState, useEffect } from "react";
import type { GeneratedWill } from "@/lib/types";
import { trackDownload, trackEmailCaptured } from "@/lib/tracking";

interface Props {
  will: GeneratedWill;
  stateAbbr?: string;
}

const EMAIL_KEY = "idonthaveawill_email";

export default function DownloadButton({ will, stateAbbr }: Props) {
  const [loading, setLoading] = useState<"word" | "pdf" | null>(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(EMAIL_KEY);
    if (stored) setEmailSubmitted(true);
  }, []);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setSubmitting(true);
    setEmailError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state: stateAbbr || null }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      sessionStorage.setItem(EMAIL_KEY, email);
      setEmailSubmitted(true);
      trackEmailCaptured("review");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDownloadWord() {
    setLoading("word");
    try {
      const { downloadWord } = await import("@/lib/downloadWord");
      await downloadWord(will);
      trackDownload("word");
    } catch (e) {
      console.error("Word download failed:", e);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  async function handleDownloadPdf() {
    setLoading("pdf");
    try {
      const { downloadPdf } = await import("@/lib/downloadPdf");
      downloadPdf(will);
      trackDownload("pdf");
    } catch (e) {
      console.error("PDF download failed:", e);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  if (!emailSubmitted) {
    return (
      <div className="w-full sm:w-auto">
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
          <label className="sr-only" htmlFor="iha-download-email">
            Your email address
          </label>
          <input
            id="iha-download-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com (optional)"
            className="iha-input flex-1"
          />
          <button
            type="submit"
            disabled={submitting || !email}
            className="iha-seal justify-center disabled:opacity-60"
          >
            <span className="iha-seal-mark" aria-hidden="true" />
            {submitting ? "Unlocking…" : "Unlock + remind me"}
          </button>
        </form>
        {emailError && (
          <p className="mt-2 text-[12.5px] text-[var(--color-ink)]" role="alert">
            {emailError}
          </p>
        )}
        <p className="mt-2 text-[12px] text-[var(--color-ink-soft)]">
          Optional. If you leave one, we&apos;ll send a single annual reminder to review your will.{" "}
          <button
            type="button"
            onClick={() => setEmailSubmitted(true)}
            className="underline decoration-[var(--color-rule)] decoration-[1.5px] underline-offset-[3px] hover:decoration-[var(--color-ink)] transition-colors"
          >
            Skip and download
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <button
        onClick={handleDownloadWord}
        disabled={loading !== null}
        aria-busy={loading === "word"}
        className="iha-seal justify-center"
      >
        <span className="iha-seal-mark" aria-hidden="true" />
        {loading === "word" ? "Generating…" : "Word document"}
      </button>

      <button
        onClick={handleDownloadPdf}
        disabled={loading !== null}
        aria-busy={loading === "pdf"}
        className="inline-flex items-center justify-center gap-2.5 px-6 py-[0.95rem] bg-[var(--color-cream)] border border-[var(--color-ink)] text-[var(--color-ink)] text-[0.92rem] font-medium tracking-[0.02em] uppercase transition-colors hover:bg-[var(--color-cream-deep)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading === "pdf" ? "Generating…" : "PDF"}
      </button>
    </div>
  );
}
