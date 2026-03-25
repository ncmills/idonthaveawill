import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates } from "@/lib/stateData";
import { getStateUrl } from "@/lib/stateSlugs";

export const metadata: Metadata = {
  title: "Will Requirements by State — All 50 States + DC",
  description:
    "Find the legal requirements for making a valid will in your state. Covers witnesses, notarization, holographic wills, minimum age, and more for all 50 US states and Washington DC.",
  alternates: {
    canonical: "https://idonthaveawill.com/will-requirements",
  },
  openGraph: {
    title: "Will Requirements by State — All 50 States + DC",
    description:
      "Every state has different rules for making a valid will. Find your state's requirements for witnesses, notarization, signatures, and more.",
  },
};

export default function WillRequirementsHub() {
  const states = getAllStates();

  const statesWithNotarization = states.filter((s) => s.notarization.required);
  const statesWithHolographic = states.filter((s) => s.holographic_wills.recognized);
  const statesWithEwills = states.filter((s) => s.electronic_wills.recognized);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)]">
        Will Requirements by State
      </h1>
      <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
        Every state has its own rules about what makes a will legally valid —
        from how many witnesses you need, to whether your will must be
        notarized, to whether a handwritten will counts. Below you&apos;ll find
        a guide for each of the 50 US states and Washington DC.
      </p>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        This information is for general reference only and is not legal advice.
        Laws change — always verify current requirements with a licensed
        attorney in your state.
      </div>

      {/* Quick stats */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="text-2xl font-bold text-[var(--color-brand)]">
            {statesWithNotarization.length === 1 ? "1 state" : `${statesWithNotarization.length} states`}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            require notarization ({statesWithNotarization.map((s) => s.abbreviation).join(", ")})
          </div>
        </div>
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="text-2xl font-bold text-[var(--color-brand)]">
            {statesWithHolographic.length} states
          </div>
          <div className="text-sm text-gray-500 mt-1">
            accept handwritten (holographic) wills
          </div>
        </div>
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="text-2xl font-bold text-[var(--color-brand)]">
            {statesWithEwills.length} states
          </div>
          <div className="text-sm text-gray-500 mt-1">
            recognize electronic wills
          </div>
        </div>
      </div>

      {/* State grid */}
      <h2 className="mt-12 text-2xl font-bold text-[var(--color-brand)]">
        Choose Your State
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {states.map((state) => (
          <Link
            key={state.abbreviation}
            href={getStateUrl(state.state)}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50 transition-all group"
          >
            <div>
              <span className="font-medium text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                {state.state}
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">
                {state.witness_requirements.count} witnesses
                {state.notarization.required ? " + notary" : ""}
              </span>
            </div>
            <span className="text-sm font-mono text-gray-300 group-hover:text-[var(--color-accent)]">
              {state.abbreviation}
            </span>
          </Link>
        ))}
      </div>

      {/* Comparison table */}
      <h2 className="mt-16 text-2xl font-bold text-[var(--color-brand)]">
        Quick Comparison
      </h2>
      <p className="mt-2 text-gray-500 text-sm">
        Key requirements at a glance across all jurisdictions.
      </p>
      <div className="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <p className="text-xs text-gray-400 mb-2 sm:hidden">Swipe to see all columns &rarr;</p>
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 border-b border-gray-200 font-medium text-gray-700">State</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">Min Age</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">Witnesses</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">Notary Required</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">Holographic</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">E-Wills</th>
              <th className="text-center p-3 border-b border-gray-200 font-medium text-gray-700">Self-Proving</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s) => (
              <tr key={s.abbreviation} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-100">
                  <Link href={getStateUrl(s.state)} className="text-[var(--color-accent)] hover:underline font-medium">
                    {s.state}
                  </Link>
                </td>
                <td className="text-center p-3 border-b border-gray-100">{s.minimum_age.standard}</td>
                <td className="text-center p-3 border-b border-gray-100">{s.witness_requirements.count}</td>
                <td className="text-center p-3 border-b border-gray-100">{s.notarization.required ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-gray-100">{s.holographic_wills.recognized ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-gray-100">{s.electronic_wills.recognized ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-gray-100">{s.self_proving_affidavit.available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-8 bg-gray-50 rounded-2xl">
        <h2 className="text-xl font-bold text-[var(--color-brand)]">
          Ready to draft your will?
        </h2>
        <p className="mt-2 text-gray-500">
          Our free tool walks you through plain-English questions and generates a
          draft formatted for your state.
        </p>
        <Link
          href="/create"
          className="mt-4 inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started — Free
        </Link>
      </div>
    </div>
  );
}
