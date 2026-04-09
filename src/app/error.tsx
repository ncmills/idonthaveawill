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
    <section className="max-w-2xl mx-auto px-4 py-24 md:py-32 text-center">
      <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-bold text-[var(--color-brand)]">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Don&apos;t worry — your answers are saved in your browser session.
        Try again or start fresh.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-block px-8 py-3 bg-[var(--color-brand)] text-white font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/create"
          className="inline-block px-8 py-3 border-2 border-[var(--color-brand)] text-[var(--color-brand)] font-semibold rounded-lg hover:bg-gray-50 transition"
        >
          Back to Questionnaire
        </Link>
      </div>
    </section>
  );
}
