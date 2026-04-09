import Link from "next/link";
import WillCounter from "./WillCounter";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand)]">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-6xl font-bold text-white leading-tight">
          You Don&apos;t Have a Will.
          <br />
          <span className="text-[var(--color-accent)]">Let&apos;s Fix That.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          A free tool that helps you draft a simple will in about 10 minutes.
          <br className="hidden md:block" />
          No account needed. Your data never leaves your browser.
        </p>

        <Link
          href="/create"
          className="mt-10 inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/20"
        >
          Get Started — Free
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="mt-6 text-sm text-gray-400">
          Helps you draft a will for all 50 states + Washington DC
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-400">
          <Link href="/will-requirements/california" className="hover:text-gray-300 transition-colors">California</Link>
          <Link href="/will-requirements/texas" className="hover:text-gray-300 transition-colors">Texas</Link>
          <Link href="/will-requirements/florida" className="hover:text-gray-300 transition-colors">Florida</Link>
          <Link href="/will-requirements/new-york" className="hover:text-gray-300 transition-colors">New York</Link>
          <Link href="/will-requirements" className="hover:text-gray-300 transition-colors">All States →</Link>
        </div>
        <WillCounter />

        {/* Invisible estate-planning state links for SEO cross-linking */}
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
    </section>
  );
}
