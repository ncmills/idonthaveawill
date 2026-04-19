import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-28 md:py-40 text-center">
      <p className="iha-caps">Errata</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-[72px] md:text-[96px] font-medium text-[var(--color-ink)] leading-none tracking-[-0.02em]">
        404
        <span
          className="text-[var(--color-sage)] font-semibold"
          style={{ fontSize: "1.3em", lineHeight: 0, verticalAlign: "baseline" }}
          aria-hidden="true"
        >
          .
        </span>
        <span className="sr-only">.</span>
      </h1>
      <p className="mt-6 font-[family-name:var(--font-display)] italic text-[20px] md:text-[22px] text-[var(--color-ink-soft)]">
        This page doesn&apos;t exist — but your will should.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/create" className="iha-seal">
          <span className="iha-seal-mark" aria-hidden="true" />
          Draft your will
        </Link>
        <Link
          href="/will-requirements"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink)] underline decoration-[var(--color-rule)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--color-ink)] transition-colors px-4 py-2"
        >
          Browse state requirements →
        </Link>
      </div>
    </section>
  );
}
