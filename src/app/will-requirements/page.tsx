import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates } from "@/lib/stateData";
import { getStateUrl } from "@/lib/stateSlugs";

export const metadata: Metadata = {
  title: "Will Requirements by State: Notarization, Witnesses & Handwritten Wills",
  description:
    "Louisiana is the only U.S. state that requires a will to be notarized. 48 states use a self-proving affidavit instead. Full witness, holographic, and signing rules for all 50 states + DC.",
  alternates: {
    canonical: "https://idonthaveawill.com/will-requirements",
  },
  openGraph: {
    title: "Will Requirements by State (50 States + DC)",
    description:
      "Which states require a will to be notarized? Only Louisiana. Full breakdown of witness counts, holographic wills, and electronic wills for every state.",
  },
};

export default function WillRequirementsHub() {
  const states = getAllStates();

  const statesWithNotarization = states.filter((s) => s.notarization.required);
  const statesWithHolographic = states.filter((s) => s.holographic_wills.recognized);
  const statesWithEwills = states.filter((s) => s.electronic_wills.recognized);
  const statesWithSelfProving = states.filter((s) => s.self_proving_affidavit.available);
  const witness2 = states.filter((s) => s.witness_requirements.count === 2).length;
  const witness3 = states.filter((s) => s.witness_requirements.count === 3).length;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What states require a will to be notarized?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Louisiana is the only U.S. state that requires a notarial testament to be executed before a notary and two witnesses (La. C.C. art. 1577). Every other state lets you make a valid will with witnesses alone. However, ${statesWithSelfProving.length} states offer an optional self-proving affidavit — a separate notarized statement attached to the will — which speeds up probate by removing the need to call witnesses to testify.`,
        },
      },
      {
        "@type": "Question",
        name: "How many witnesses does a will need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${witness2} states require 2 witnesses; ${witness3} state${witness3 === 1 ? "s require" : "s require"} 3. Witnesses generally must be at least 18, mentally competent, and disinterested (not named as beneficiaries). Most states also require witnesses to sign in the testator's presence and, in some, in each other's presence.`,
        },
      },
      {
        "@type": "Question",
        name: "Do all states recognize handwritten (holographic) wills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `No. ${statesWithHolographic.length} states recognize holographic (handwritten, unwitnessed) wills, typically only if the material provisions and signature are in the testator's handwriting. The remaining ${50 + 1 - statesWithHolographic.length} states require witnesses regardless of whether the will is handwritten or typed.`,
        },
      },
      {
        "@type": "Question",
        name: "Are electronic (digital) wills legal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${statesWithEwills.length} states have enacted electronic wills statutes that recognize wills signed and witnessed via electronic means under specific procedural rules. The majority of states still require a physical signed and witnessed paper document.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Will Requirements by State
      </h1>
      <p className="mt-4 text-[var(--color-ink-soft)] max-w-3xl leading-relaxed">
        Every state has its own rules about what makes a will legally valid —
        from how many witnesses you need, to whether your will must be
        notarized, to whether a handwritten will counts. Below you&apos;ll find
        a guide for each of the 50 US states and Washington DC.
      </p>

      {/* Featured-snippet answer block: top GSC query is
          "what states require a will to be notarized" — answer is Louisiana only. */}
      <div className="mt-8 p-6 border-l-2 border-[var(--color-accent)] bg-[var(--color-cream-deep)]">
        <div className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)] font-medium">
          Short answer
        </div>
        <p className="mt-2 text-[var(--color-ink)] leading-relaxed">
          <strong>Louisiana</strong> is the only U.S. state that requires a will to be
          notarized to be legally valid (La. C.C. art. 1577 — notarial testament).
          Every other state lets you make a valid will with witnesses alone.
        </p>
        <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
          {statesWithSelfProving.length} states offer an optional{" "}
          <em>self-proving affidavit</em> — a separate notarized statement attached
          to the will. It&apos;s not required for the will to be valid, but it
          speeds up probate by removing the need to call witnesses to testify.
        </p>
      </div>

      <div className="mt-6 iha-callout">
        This information is for general reference only and is not legal advice.
        Laws change — always verify current requirements with a licensed
        attorney in your state.
      </div>

      {/* Quick stats */}
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        <div className="p-5 bg-[var(--color-cream-deep)] border border-[var(--color-rule)]">
          <div className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
            {statesWithNotarization.length === 1 ? "1 state" : `${statesWithNotarization.length} states`}
          </div>
          <div className="text-sm text-[var(--color-ink-soft)] mt-1">
            require notarization ({statesWithNotarization.map((s) => s.abbreviation).join(", ")})
          </div>
        </div>
        <div className="p-5 bg-[var(--color-cream-deep)] border border-[var(--color-rule)]">
          <div className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
            {statesWithHolographic.length} states
          </div>
          <div className="text-sm text-[var(--color-ink-soft)] mt-1">
            accept handwritten (holographic) wills
          </div>
        </div>
        <div className="p-5 bg-[var(--color-cream-deep)] border border-[var(--color-rule)]">
          <div className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
            {statesWithEwills.length} states
          </div>
          <div className="text-sm text-[var(--color-ink-soft)] mt-1">
            recognize electronic wills
          </div>
        </div>
      </div>

      {/* State grid */}
      <h2 className="mt-12 font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
        Choose Your State
      </h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {states.map((state) => (
          <Link
            key={state.abbreviation}
            href={getStateUrl(state.state)}
            className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-rule)] hover:border-[var(--color-accent)] hover:bg-[var(--color-cream)] transition-all group"
          >
            <div>
              <span className="font-medium text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                {state.state}
              </span>
              <span className="block text-xs text-[var(--color-ink-soft)] mt-0.5">
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
      <h2 className="mt-16 font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
        Quick Comparison
      </h2>
      <p className="mt-2 text-[var(--color-ink-soft)] text-sm">
        Key requirements at a glance across all jurisdictions.
      </p>
      <div className="mt-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <p className="text-xs text-[var(--color-ink-soft)] mb-2 sm:hidden">Swipe to see all columns &rarr;</p>
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[var(--color-cream-deep)]">
              <th className="text-left p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">State</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">Min Age</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">Witnesses</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">Notary Required</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">Holographic</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">E-Wills</th>
              <th className="text-center p-3 border-b border-[var(--color-rule)] font-medium text-[var(--color-ink)]">Self-Proving</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s) => (
              <tr key={s.abbreviation} className="hover:bg-[var(--color-cream-deep)]">
                <td className="p-3 border-b border-[var(--color-rule)]">
                  <Link href={getStateUrl(s.state)} className="text-[var(--color-accent)] hover:underline font-medium">
                    {s.state}
                  </Link>
                </td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.minimum_age.standard}</td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.witness_requirements.count}</td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.notarization.required ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.holographic_wills.recognized ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.electronic_wills.recognized ? "Yes" : "No"}</td>
                <td className="text-center p-3 border-b border-[var(--color-rule)]">{s.self_proving_affidavit.available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ — answers the four highest-impression GSC queries hitting this page. */}
      <h2 className="mt-16 font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
        Common Questions
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="font-medium text-[var(--color-ink)] text-lg">
            What states require a will to be notarized?
          </h3>
          <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">
            Louisiana is the only U.S. state that requires a notarial testament
            to be executed before a notary and two witnesses (La. C.C. art. 1577).
            Every other state lets you make a valid will with witnesses alone.
            However, {statesWithSelfProving.length} states offer an optional{" "}
            <em>self-proving affidavit</em> — a separate notarized statement attached
            to the will — which speeds up probate by removing the need to call
            witnesses to testify.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-[var(--color-ink)] text-lg">
            How many witnesses does a will need?
          </h3>
          <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">
            {witness2} states require 2 witnesses;{" "}
            {witness3 === 1 ? "1 state requires" : `${witness3} states require`} 3.
            Witnesses generally must be at least 18, mentally competent, and
            disinterested (not named as beneficiaries). Most states also require
            witnesses to sign in the testator&apos;s presence and, in some, in
            each other&apos;s presence.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-[var(--color-ink)] text-lg">
            Do all states recognize handwritten (holographic) wills?
          </h3>
          <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">
            No. {statesWithHolographic.length} states recognize holographic
            (handwritten, unwitnessed) wills, typically only if the material
            provisions and signature are in the testator&apos;s handwriting.
            The remaining {51 - statesWithHolographic.length} jurisdictions
            require witnesses regardless of whether the will is handwritten or typed.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-[var(--color-ink)] text-lg">
            Are electronic (digital) wills legal?
          </h3>
          <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">
            {statesWithEwills.length} states have enacted electronic wills
            statutes that recognize wills signed and witnessed via electronic
            means under specific procedural rules. The majority of states still
            require a physical, signed, and witnessed paper document.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-8 bg-[var(--color-cream-deep)]">
        <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--color-ink)]">
          Ready to draft your will?
        </h2>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Our free tool walks you through plain-English questions and generates a
          draft formatted for your state.
        </p>
        <Link
          href="/create"
          className="mt-4 inline-flex items-center gap-2 iha-seal"
        >
          Get Started — Free
        </Link>
      </div>
    </div>
  );
}
