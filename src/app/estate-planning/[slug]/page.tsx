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

  const title = `${state.state} Estate Planning (2026): Wills, Probate & Intestate Laws`;
  const description = `A plain-English guide to ${state.state} estate planning: wills, probate, intestate succession, and how to protect your family. Free will drafting tool. Updated 2026.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://idonthaveawill.com/estate-planning/${slug}`,
    },
    openGraph: {
      title: `Estate Planning in ${state.state}`,
      description,
    },
  };
}

export default async function EstatePlanningStatePage({ params }: Props) {
  const { slug } = await params;
  const state = slugToState(slug);
  if (!state) notFound();

  const isCommunity = COMMUNITY_PROPERTY_STATES.includes(state.abbreviation);
  const allStates = getAllStates();
  const currentIndex = allStates.findIndex(
    (s) => s.abbreviation === state.abbreviation
  );
  const neighbors = allStates
    .filter((_, i) => i !== currentIndex)
    .slice(Math.max(0, currentIndex - 3), Math.max(6, currentIndex + 3))
    .slice(0, 6);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://idonthaveawill.com" },
      { "@type": "ListItem", position: 2, name: "Estate Planning", item: "https://idonthaveawill.com/estate-planning" },
      { "@type": "ListItem", position: 3, name: state.state },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is estate planning in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Estate planning in ${state.state} is the process of arranging how your assets will be managed and distributed after your death or if you become incapacitated. It typically includes creating a will, designating beneficiaries, and understanding ${state.state}'s specific legal requirements for valid documents.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need a lawyer for estate planning in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${state.state} does not require you to hire a lawyer to create a valid will. However, for complex estates, blended families, business interests, or trusts, consulting a ${state.state} estate planning attorney is strongly recommended. A simple will is a good starting point for most people.`,
        },
      },
      {
        "@type": "Question",
        name: `What documents do I need for estate planning in ${state.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The core estate planning documents in ${state.state} include: a last will and testament, a durable power of attorney, a healthcare directive (living will), and beneficiary designations on financial accounts. A will is the most important first step, and our free tool can help you draft one.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${state.state} a community property state?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isCommunity
            ? `Yes, ${state.state} is a community property state. This means most assets acquired during marriage are owned equally by both spouses. This affects how property can be distributed in your will.`
            : `No, ${state.state} follows common law (separate property) rules. Each spouse owns the property they earn or acquire individually, though there are spousal inheritance protections.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/estate-planning" className="hover:text-gray-600">
            Estate Planning
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{state.state}</span>
        </nav>

        <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)]">
          Estate Planning in {state.state}
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
          Estate planning doesn&apos;t have to be complicated. In{" "}
          {state.state}, the most important step is creating a valid will
          &mdash; a legal document that says who gets your property, who raises
          your kids, and who handles your affairs. Below is a plain-English
          overview of what {state.state} requires and how to get started.
        </p>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          This is general information, not legal advice. Laws can change.
          Consult a {state.state} attorney to confirm current requirements.
        </div>

        {/* Quick overview */}
        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Why Estate Planning Matters in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              If you die without a will in {state.state} (called &ldquo;dying
              intestate&rdquo;), the state&apos;s default inheritance laws
              decide who gets your assets. A judge &mdash; not you &mdash;
              picks who manages your estate and, if you have minor children,
              who raises them. Estate planning puts you in control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              The Core Documents
            </h2>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-brand)]">
                  1. Last Will and Testament
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  The foundation of any estate plan. Specifies who inherits your
                  property, names guardians for minor children, and designates an
                  executor. In {state.state}, you need{" "}
                  {state.witness_requirements.count} witness
                  {state.witness_requirements.count !== 1 ? "es" : ""}
                  {state.notarization.required
                    ? " and notarization"
                    : ""}{" "}
                  for a valid will.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-brand)]">
                  2. Durable Power of Attorney
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Designates someone to manage your finances if you become
                  incapacitated. Without one, your family may need court
                  approval to pay your bills or manage your accounts.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-brand)]">
                  3. Healthcare Directive (Living Will)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Spells out your medical care wishes if you can&apos;t
                  communicate them yourself. Also names a healthcare agent to
                  make decisions on your behalf.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-brand)]">
                  4. Beneficiary Designations
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Retirement accounts, life insurance, and bank accounts often
                  pass directly to named beneficiaries &mdash; outside your
                  will. Keeping these up to date is a critical part of estate
                  planning.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              {state.state} Will Requirements at a Glance
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Your will is the most important document in your estate plan.
              Here&apos;s what {state.state} requires:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                <span>
                  <strong>Minimum age:</strong> {state.minimum_age.standard}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                <span>
                  <strong>Witnesses:</strong>{" "}
                  {state.witness_requirements.count} required.{" "}
                  {state.witness_requirements.qualifications}.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                <span>
                  <strong>Notarization:</strong>{" "}
                  {state.notarization.required
                    ? "Required for a valid will."
                    : "Not required, but recommended for a self-proving affidavit."}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                <span>
                  <strong>Property system:</strong>{" "}
                  {isCommunity ? "Community property" : "Common law (separate property)"}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-accent)] mt-1 shrink-0">&#8226;</span>
                <span>
                  <strong>Holographic wills:</strong>{" "}
                  {state.holographic_wills.recognized
                    ? "Recognized"
                    : "Not recognized"}
                </span>
              </li>
            </ul>
            <p className="mt-4">
              <Link
                href={getStateUrl(state.state)}
                className="text-[var(--color-accent)] hover:underline font-medium"
              >
                See full {state.state} will requirements &rarr;
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Will vs. Trust in {state.state}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              A will takes effect after you die and goes through{" "}
              {state.state}&apos;s probate process. A living trust takes effect
              immediately and can help your estate avoid probate entirely.
              Trusts are more complex and typically used for larger estates or
              specific tax planning. For most people, a simple will is the
              right starting point &mdash; you can always add a trust later.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--color-brand)]">
              Common Estate Planning Mistakes
            </h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex gap-2">
                <span className="text-red-400 mt-1 shrink-0">&#10005;</span>
                <span>
                  <strong>Not having a will at all.</strong> 67% of Americans
                  don&apos;t have one. Without it, {state.state}&apos;s
                  default laws decide everything.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 mt-1 shrink-0">&#10005;</span>
                <span>
                  <strong>Forgetting to update beneficiary designations.</strong>{" "}
                  These override your will. If an ex-spouse is still listed on
                  your 401(k), they could inherit it.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 mt-1 shrink-0">&#10005;</span>
                <span>
                  <strong>Not naming a guardian for minor children.</strong>{" "}
                  Without a will, a court chooses who raises your kids.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 mt-1 shrink-0">&#10005;</span>
                <span>
                  <strong>Improper execution.</strong> {state.state} requires{" "}
                  {state.witness_requirements.count} witness
                  {state.witness_requirements.count !== 1 ? "es" : ""}
                  {state.notarization.required ? " and notarization" : ""}.
                  Missing a step can invalidate the entire document.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-[var(--color-brand)] rounded-2xl">
          <h2 className="text-xl font-bold text-white">
            Start Your {state.state} Estate Plan Today
          </h2>
          <p className="mt-2 text-gray-300">
            The first step is a will. Our free tool walks you through
            plain-English questions and generates a draft formatted for{" "}
            {state.state}&apos;s requirements.
          </p>
          <Link
            href="/create"
            className="mt-4 inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Draft Your Will &mdash; Free
          </Link>
        </div>

        {/* Related states */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[var(--color-brand)]">
            Estate Planning in Other States
          </h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {neighbors.map((s) => (
              <Link
                key={s.abbreviation}
                href={`/estate-planning/${stateToSlug(s.state)}`}
                className="p-3 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50 transition-all text-sm"
              >
                <span className="font-medium text-[var(--color-brand)]">
                  {s.state}
                </span>
                <span className="block text-xs text-gray-400 mt-0.5">
                  {s.witness_requirements.count} witnesses
                  {s.notarization.required ? " + notary" : ""}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/estate-planning"
            className="mt-4 inline-block text-sm text-[var(--color-accent)] hover:underline"
          >
            View all 50 states + DC &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
