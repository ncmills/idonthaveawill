import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates } from "@/lib/stateData";
import { stateToSlug } from "@/lib/stateSlugs";

export const metadata: Metadata = {
  title: "Estate Planning by State — All 50 States + DC",
  description:
    "A plain-English guide to estate planning in every US state. Learn about wills, trusts, probate, and how to protect your family. Free will drafting tool included.",
  alternates: {
    canonical: "https://idonthaveawill.com/estate-planning",
  },
  openGraph: {
    title: "Estate Planning by State — All 50 States + DC",
    description:
      "Everything you need to know about estate planning in your state. Start with a free will.",
  },
};

export default function EstatePlanningHub() {
  const states = getAllStates();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)]">
        Estate Planning by State
      </h1>
      <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
        Every state has its own rules for wills, trusts, and probate. Estate
        planning starts with understanding what your state requires &mdash;
        and the single most important step is creating a valid will. Below
        you&apos;ll find a guide for each of the 50 US states and Washington
        DC.
      </p>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        This information is for general reference only and is not legal advice.
        Laws change &mdash; always verify current requirements with a licensed
        attorney in your state.
      </div>

      {/* What is estate planning */}
      <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <h2 className="text-lg font-bold text-[var(--color-brand)]">
          What Is Estate Planning?
        </h2>
        <p className="mt-2 text-gray-600 leading-relaxed">
          Estate planning is the process of deciding what happens to your money,
          property, and family if you die or become incapacitated. It typically
          involves creating a will, setting up powers of attorney, and making
          sure your beneficiary designations are up to date. You don&apos;t need
          to be wealthy &mdash; if you have a bank account, a car, or children,
          you need an estate plan.
        </p>
      </div>

      {/* State grid */}
      <h2 className="mt-12 text-2xl font-bold text-[var(--color-brand)]">
        Choose Your State
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {states.map((state) => (
          <Link
            key={state.abbreviation}
            href={`/estate-planning/${stateToSlug(state.state)}`}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50 transition-all group"
          >
            <div>
              <span className="font-medium text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                {state.state}
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">
                Estate planning guide
              </span>
            </div>
            <span className="text-sm font-mono text-gray-300 group-hover:text-[var(--color-accent)]">
              {state.abbreviation}
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-8 bg-gray-50 rounded-2xl">
        <h2 className="text-xl font-bold text-[var(--color-brand)]">
          Start with a will &mdash; it takes 10 minutes
        </h2>
        <p className="mt-2 text-gray-500">
          A will is the foundation of every estate plan. Our free tool walks you
          through plain-English questions and generates a draft formatted for
          your state.
        </p>
        <Link
          href="/create"
          className="mt-4 inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started &mdash; Free
        </Link>
      </div>
    </div>
  );
}
