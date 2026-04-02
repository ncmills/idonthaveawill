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
    if (!email || !email.includes("@")) return;

    setSubmitting(true);
    setEmailError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, state: stateAbbr || "XX" }),
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

  const btnBase =
    "inline-flex items-center justify-center gap-2 font-medium px-5 py-2.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base";

  if (!emailSubmitted) {
    return (
      <div className="w-full sm:w-auto">
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={submitting}
            className={`${btnBase} bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {submitting ? "..." : "Unlock Download"}
          </button>
        </form>
        {emailError && <p className="mt-1 text-red-600 text-xs">{emailError}</p>}
        <p className="mt-1 text-gray-400 text-xs">Enter your email to download. We&apos;ll send one annual reminder to review your will.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <button
        onClick={handleDownloadWord}
        disabled={loading !== null}
        className={`${btnBase} bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "word" ? "Generating..." : "Word Document"}
      </button>

      <button
        onClick={handleDownloadPdf}
        disabled={loading !== null}
        className={`${btnBase} bg-white border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "pdf" ? "Generating..." : "PDF Document"}
      </button>
    </div>
  );
}
