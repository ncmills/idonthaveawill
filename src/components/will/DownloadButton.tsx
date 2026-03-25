"use client";

import { useState } from "react";
import type { GeneratedWill } from "@/lib/types";

interface Props {
  will: GeneratedWill;
}

export default function DownloadButton({ will }: Props) {
  const [loading, setLoading] = useState<"word" | "pdf" | null>(null);

  async function handleDownloadWord() {
    setLoading("word");
    try {
      const { downloadWord } = await import("@/lib/downloadWord");
      await downloadWord(will);
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
    } catch (e) {
      console.error("PDF download failed:", e);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  const btnBase =
    "inline-flex items-center gap-2 font-medium px-5 py-2 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDownloadWord}
        disabled={loading !== null}
        className={`${btnBase} bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "word" ? "Generating..." : "Word Document"}
      </button>

      <button
        onClick={handleDownloadPdf}
        disabled={loading !== null}
        className={`${btnBase} bg-white border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {loading === "pdf" ? "Generating..." : "PDF Document"}
      </button>
    </div>
  );
}
