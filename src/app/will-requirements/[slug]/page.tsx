import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStates } from "@/lib/stateData";
import { slugToState, stateToSlug, getStateUrl } from "@/lib/stateSlugs";
import { COMMUNITY_PROPERTY_STATES } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStates().map((s) => ({
    slug: stateToSlug(s.state),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const state = slugToState(slug);
  if (!state) return {};

  const title = `${state.state} Will Requirements — How to Make a Valid Will in ${state.abbreviation}`;
  const description = `Learn what's required to make a legally valid will in ${state.state}. ${state.witness_requirements.count} witnesses${state.notarization.required ? ", notarization required" : ""}, minimum age ${state.minimum_age.standard}${state.holographic_wills.recognized ? ", holographic wills accepted" : ""}. Free will drafting tool included.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://idonthaveawill.com/will-requirements/${slug}`,
    },
    openGraph: {
      title: `Will Requirements in ${state.state}`,
      description,
    },
  };
}

function YesNo({ value, yesLabel, noLabel }: { value: boolean; yesLabel?: string; noLabel?: string }) {
  return value ? (
    <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2.5 py-1 rounded-full text-sm font-medium">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {yesLabel ?? "Yes"}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-sm font-medium">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      {noLabel ?? "No"}
    </span>
  );
}

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const state = slugToState(slug);
  if (!state) notFound();

  const isCommunity = COMMUNITY_PROPERTY_STATES.includes(state.abbreviation);
  const allStates = getAllStates();
  const neighbors = allStates
    .filter((s) => s.abbreviation !== state.abbreviation)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many witnesses do I need for a will in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${state.state} requires ${state.witness_requirements.count} witness${state.witness_requirements.count !== 1 ? "es" : ""} for a valid will. ${state.witness_requirements.qualifications}. ${state.witness_requirements.presence_rules}.`,
        },
      },
      {
        "@type": "Question",
        name: `Does a will need to be notarized in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: state.notarization.required
            ? `Yes, ${state.state} requires notarization for a will to be valid. ${state.notarization.notes}`
            : `No, notarization is not required for a will to be valid in ${state.state}. ${state.notarization.notes}`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${state.state} accept handwritten (holographic) wills?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: state.holographic_wills.recognized
            ? `Yes, ${state.state} recognizes holographic wills. ${state.holographic_wills.notes}`
            : `No, ${state.state} does not recognize holographic wills. ${state.holographic_wills.notes}`,
        },
      },
      {
        "@type": "Question",
        name: `What is the minimum age to make a will in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The minimum age to make a will in ${state.state} is ${state.minimum_age.standard}. ${state.minimum_age.exceptions}`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/will-requirements" className="hover:text-gray-600">Will Requirements</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{state.state}</span>
        </nav>

        <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)]">
          How to Make a Valid Will in {state.state}
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          {state.state} has specific rules about who can make a will, how it must be
          signed, how many witnesses are needed, and whether notarization is
          required. Here&apos;s everything you need to know about creating a valid
          last will and testament in {state.abbreviation}.
        </p>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          This is general information, not legal advice. Laws can change.
          Consult a {state.state} attorney to confirm current requirements.
        </div>

        {/* At-a-glance card */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-lg font-bold text-[var(--color-brand)] mb-4">
            {state.state} Will Requirements at a Glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Minimum age</span>
              <span className="font-semibold text-[var(--color-brand)]">{state.minimum_age.standard}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Witnesses required</span>
              <span className="font-semibold text-[var(--color-brand)]">{state.witness_requirements.count}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Notarization required</span>
              <YesNo value={state.notarization.required} yesLabel="Required" noLabel="Not required" />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Self-proving affidavit</span>
              <YesNo value={state.self_proving_affidavit.available} yesLabel="Available" noLabel="Not available" />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Holographic (handwritten) wills</span>
              <YesNo value={state.holographic_wills.recognized} yesLabel="Accepted" noLabel="Not accepted" />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Electronic wills</span>
              <YesNo value={state.electronic_wills.recognized} yesLabel="Recognized" noLabel="Not recognized" />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Oral (nuncupative) wills</span>
              <YesNo value={state.nuncupative_wills.recognized} yesLabel="Limited" noLabel="Not recognized" />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Property system</span>
              <span className="font-semibold text-[var(--color-brand)]">
                {isCommunity ? "Community property" : "Common law"}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed sections */}
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Who Can Make a Will in {state.state}?
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              You must be at least <strong>{state.minimum_age.standard} years old</strong> to
              make a will in {state.state}.{" "}
              {state.minimum_age.exceptions && (
                <span>{state.minimum_age.exceptions}. </span>
              )}
              {state.testamentary_capacity}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Signing Requirements
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.writing_requirement}.{" "}
              {state.signature_requirement.proxy_signing_allowed
                ? `If you are physically unable to sign, ${state.signature_requirement.proxy_signing_rules}.`
                : "The testator must personally sign the will."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Witness Requirements in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.state} requires <strong>{state.witness_requirements.count} witness{state.witness_requirements.count !== 1 ? "es" : ""}</strong>.{" "}
              {state.witness_requirements.qualifications}.{" "}
              {state.witness_requirements.presence_rules}.
            </p>
            <p className="mt-2 text-gray-600 leading-relaxed">
              <strong>Interested witnesses:</strong> {state.witness_requirements.interested_witness_rules}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Notarization in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.notarization.required ? (
                <><strong>Notarization is required</strong> in {state.state} for your will to be valid. </>
              ) : (
                <>Notarization is <strong>not required</strong> for a will to be valid in {state.state}. </>
              )}
              {state.notarization.notes}
            </p>
          </section>

          {state.self_proving_affidavit.available && (
            <section>
              <h2 className="text-xl font-bold text-[var(--color-brand)]">
                Self-Proving Affidavit
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {state.state} allows a self-proving affidavit, which simplifies probate
                by eliminating the need for witnesses to testify in court.{" "}
                {state.self_proving_affidavit.requirements}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Handwritten (Holographic) Wills
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.holographic_wills.recognized ? (
                <>{state.state} <strong>does recognize</strong> holographic wills. </>
              ) : (
                <>{state.state} <strong>does not recognize</strong> holographic wills. </>
              )}
              {state.holographic_wills.notes}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Electronic Wills
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.electronic_wills.recognized ? (
                <>{state.state} <strong>recognizes</strong> electronic wills. </>
              ) : (
                <>{state.state} <strong>does not currently recognize</strong> electronic wills. </>
              )}
              {state.electronic_wills.notes}
            </p>
          </section>

          {state.nuncupative_wills.recognized && (
            <section>
              <h2 className="text-xl font-bold text-[var(--color-brand)]">
                Oral (Nuncupative) Wills
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {state.nuncupative_wills.notes}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              How to Revoke a Will in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              In {state.state}, a will can be revoked by:
            </p>
            <ul className="mt-2 space-y-2 text-gray-600">
              {state.revocation.methods.map((method, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
            {state.revocation.notes && (
              <p className="mt-2 text-sm text-gray-500">{state.revocation.notes}</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Special Provisions in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {state.special_provisions}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Relevant {state.state} Statutes
            </h2>
            <ul className="mt-3 space-y-2">
              {state.statute_citations.map((cite, i) => (
                <li key={i} className="text-sm font-mono text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  {cite}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-[var(--color-brand)] rounded-2xl">
          <h2 className="text-xl font-bold text-white">
            Ready to draft your {state.state} will?
          </h2>
          <p className="mt-2 text-gray-300">
            Our free tool asks plain-English questions and generates a draft
            formatted for {state.state}&apos;s requirements.
          </p>
          <Link
            href="/create"
            className="mt-4 inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started — Free
          </Link>
        </div>

        {/* Related states */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[var(--color-brand)]">
            Will Requirements in Other States
          </h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {neighbors.map((s) => (
              <Link
                key={s.abbreviation}
                href={getStateUrl(s.state)}
                className="p-3 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50 transition-all text-sm"
              >
                <span className="font-medium text-[var(--color-brand)]">{s.state}</span>
                <span className="block text-xs text-gray-400 mt-0.5">
                  {s.witness_requirements.count} witnesses
                  {s.notarization.required ? " + notary" : ""}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/will-requirements"
            className="mt-4 inline-block text-sm text-[var(--color-accent)] hover:underline"
          >
            View all 50 states + DC →
          </Link>
        </div>
      </div>
    </>
  );
}
