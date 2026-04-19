"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
      <p className="iha-caps">An interruption</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[40px] md:text-[52px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Something went wrong.
      </h1>
      <p className="mt-6 font-[family-name:var(--font-display)] italic text-[18px] text-[var(--color-ink-soft)]">
        Don&apos;t worry — your answers are saved in your browser session.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={() => reset()} className="iha-seal cursor-pointer">
          <span className="iha-seal-mark" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink)] underline decoration-[var(--color-rule)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--color-ink)] transition-colors px-4 py-2"
        >
          Back to questionnaire →
        </Link>
      </div>
    </section>
  );
}
