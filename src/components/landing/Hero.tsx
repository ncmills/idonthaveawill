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

      {/* Top editorial rule + section marker — full-bleed gutters */}
      <div className="relative px-6 sm:px-10 lg:px-20 pt-10">
        <div className="flex items-center gap-4">
          <span className="iha-caps">Est. a quiet afternoon</span>
          <hr className="iha-rule flex-1" />
          <span className="iha-caps hidden sm:inline">Vol. I · Plain Language</span>
        </div>
      </div>

      <div className="relative px-6 sm:px-10 lg:px-20 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          {/* Headline block — left */}
          <div>
            <h1 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-ink)] leading-[1.08] tracking-[-0.015em] text-[44px] sm:text-[60px] md:text-[72px]">
              You Don&apos;t Have a Will.
              <br />
              <span className="italic font-medium">Let&apos;s Fix That.</span>
            </h1>

            <p className="mt-8 text-[17px] md:text-[18px] text-[var(--color-ink-soft)] leading-relaxed max-w-xl">
              A free tool that helps you draft a simple will in about ten minutes.
              No account. Your answers never leave the browser.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <Link href="/create" className="iha-seal">
                <span className="iha-seal-mark" aria-hidden="true" />
                Begin the Draft
              </Link>
            </div>

            <p className="mt-6 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-ink-soft)]">
              Drafts prepared for all fifty states &amp; the District of Columbia.
            </p>

            {/* State anchor links — set as quiet editorial list */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[var(--color-ink-soft)]">
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
          </div>

          {/* Document preview card — right, reaches toward the edge */}
          <div className="relative hidden sm:block">
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-[var(--color-cream-deep)] translate-x-2 translate-y-3"
            />
            <article
              aria-label="Sample will draft preview"
              className="relative bg-white border border-[var(--color-rule)] p-8 md:p-10 font-[family-name:var(--font-mono)] text-[12px] md:text-[12.5px] text-[var(--color-ink)] leading-[1.7]"
            >
              <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)] pb-5 mb-5 border-b border-[var(--color-rule)]">
                <span>Draft · Not for Execution</span>
                <span>Page 1 of 7</span>
              </div>

              <h2 className="text-center font-[family-name:var(--font-display)] text-[19px] md:text-[21px] font-medium tracking-wide text-[var(--color-ink)]">
                LAST WILL AND TESTAMENT
              </h2>
              <p className="mt-2 text-center text-[10px] tracking-[0.25em] uppercase text-[var(--color-ink-soft)]">
                of [Your Full Legal Name]
              </p>

              <hr className="iha-rule my-6" />

              <p>
                I,{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Your Full Legal Name]
                </span>
                , a resident of{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [City]
                </span>
                , in the State of{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Your State]
                </span>
                , being of sound mind and memory, do hereby make, publish, and
                declare this to be my Last Will and Testament.
              </p>

              <h3 className="mt-6 font-medium tracking-wide text-[12px]">
                ARTICLE I &mdash; APPOINTMENT OF EXECUTOR
              </h3>
              <p className="mt-2 text-[var(--color-ink-soft)]">
                I appoint{" "}
                <span className="bg-[var(--color-cream)] px-1 text-[var(--color-sage-deep)]">
                  [Executor Name]
                </span>{" "}
                to serve as Executor of this my Last Will and Testament&hellip;
              </p>
            </article>
          </div>
        </div>
      </div>

      {/* Closing rule into next section */}
      <div className="relative px-6 sm:px-10 lg:px-20 pb-8">
        <hr className="iha-rule" />
      </div>
    </section>
  );
}
