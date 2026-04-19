import Link from "next/link";
import WillCounter from "./WillCounter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)]">
      {/* Paper grain — extremely subtle, stationery texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1a1815 0.6px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Top editorial rule + section marker */}
      <div className="relative max-w-5xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-4">
          <span className="iha-caps">Est. a quiet afternoon</span>
          <hr className="iha-rule flex-1" />
          <span className="iha-caps hidden sm:inline">Vol. I · Plain Language</span>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] leading-[1.08] tracking-[-0.015em] text-[44px] sm:text-[60px] md:text-[76px]">
          You Don&apos;t Have a Will.
          <br />
          <span className="italic font-medium">Let&apos;s Fix That.</span>
        </h1>

        <p className="mt-8 text-[17px] md:text-[18px] text-[var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto">
          A free tool that helps you draft a simple will in about ten minutes.
          No account. Your answers never leave the browser.
        </p>

        <div className="mt-12 flex justify-center">
          <Link href="/create" className="iha-seal">
            <span className="iha-seal-mark" aria-hidden="true" />
            Begin the Draft
          </Link>
        </div>

        <p className="mt-6 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-ink-soft)]">
          Drafts prepared for all fifty states &amp; the District of Columbia.
        </p>

        {/* State anchor links — set as quiet editorial list */}
        <div className="mt-5 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[13px] text-[var(--color-ink-soft)]">
          <Link
            href="/will-requirements/california"
            className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors"
          >
            California
          </Link>
          <span className="text-[var(--color-rule)]" aria-hidden="true">·</span>
          <Link
            href="/will-requirements/texas"
            className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors"
          >
            Texas
          </Link>
          <span className="text-[var(--color-rule)]" aria-hidden="true">·</span>
          <Link
            href="/will-requirements/florida"
            className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors"
          >
            Florida
          </Link>
          <span className="text-[var(--color-rule)]" aria-hidden="true">·</span>
          <Link
            href="/will-requirements/new-york"
            className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-sage)] hover:text-[var(--color-ink)] transition-colors"
          >
            New York
          </Link>
          <span className="text-[var(--color-rule)]" aria-hidden="true">·</span>
          <Link
            href="/will-requirements"
            className="font-[family-name:var(--font-display)] italic text-[var(--color-sage-deep)] hover:text-[var(--color-ink)] transition-colors"
          >
            view all states →
          </Link>
        </div>

        <WillCounter />

        {/* Invisible estate-planning links — SEO cross-linking, preserved */}
        <div className="sr-only" aria-hidden="true">
          <Link href="/estate-planning/california" tabIndex={-1}>Estate Planning in California</Link>
          <Link href="/estate-planning/texas" tabIndex={-1}>Estate Planning in Texas</Link>
          <Link href="/estate-planning/florida" tabIndex={-1}>Estate Planning in Florida</Link>
          <Link href="/estate-planning/new-york" tabIndex={-1}>Estate Planning in New York</Link>
          <Link href="/estate-planning/pennsylvania" tabIndex={-1}>Estate Planning in Pennsylvania</Link>
          <Link href="/estate-planning/illinois" tabIndex={-1}>Estate Planning in Illinois</Link>
          <Link href="/estate-planning/ohio" tabIndex={-1}>Estate Planning in Ohio</Link>
          <Link href="/estate-planning/georgia" tabIndex={-1}>Estate Planning in Georgia</Link>
          <Link href="/estate-planning/north-carolina" tabIndex={-1}>Estate Planning in North Carolina</Link>
          <Link href="/estate-planning/michigan" tabIndex={-1}>Estate Planning in Michigan</Link>
        </div>
      </div>

      {/* Closing rule into next section */}
      <div className="relative max-w-5xl mx-auto px-6 pb-8">
        <hr className="iha-rule" />
      </div>
    </section>
  );
}
