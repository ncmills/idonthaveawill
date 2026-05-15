import type { Metadata } from "next";
import Link from "next/link";
import { getAllStates } from "@/lib/stateData";
import { getStateUrl } from "@/lib/stateSlugs";

const PAGE_URL = "https://idonthaveawill.com/data/2026-state-will-laws-report";

export const metadata: Metadata = {
  title: "2026 State-by-State Will Laws Report — All 50 States + DC",
  description:
    "Open dataset on U.S. will requirements: witnesses, notarization, holographic wills, electronic wills, self-proving affidavits — every state ranked side-by-side, with statute citations. Free to cite or embed.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "2026 State-by-State Will Laws Report",
    description:
      "Open dataset on U.S. will requirements — every state, every rule, with statute citations.",
  },
};

export default function StateWillLawsReportPage() {
  const states = getAllStates();
  const total = states.length;
  const notaryRequired = states.filter((s) => s.notarization.required);
  const holographic = states.filter((s) => s.holographic_wills.recognized);
  const electronic = states.filter((s) => s.electronic_wills.recognized);
  const nuncupative = states.filter((s) => s.nuncupative_wills.recognized);
  const selfProving = states.filter((s) => s.self_proving_affidavit.available);
  const witness2 = states.filter((s) => s.witness_requirements.count === 2);
  const witness3 = states.filter((s) => s.witness_requirements.count === 3);
  const minAge18 = states.filter((s) => s.minimum_age.standard === 18);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "2026 U.S. State Will Laws Dataset",
    description: `Per-state legal requirements for executing a valid will across all ${total} U.S. jurisdictions: minimum age, witness count, witness qualifications, notarization, holographic wills, electronic wills, nuncupative wills, self-proving affidavits, and statute citations.`,
    url: PAGE_URL,
    keywords: [
      "will requirements",
      "U.S. wills",
      "holographic wills",
      "electronic wills",
      "notarization",
      "self-proving affidavit",
      "state law",
    ],
    creator: {
      "@type": "Organization",
      name: "I Don't Have a Will",
      url: "https://idonthaveawill.com",
    },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    citation: `I Don't Have a Will. (2026). 2026 State-by-State Will Laws Report. Retrieved from ${PAGE_URL}`,
    spatialCoverage: { "@type": "Place", name: "United States" },
    temporalCoverage: "2026",
    variableMeasured: [
      "Minimum testator age",
      "Required witness count",
      "Notarization required (boolean)",
      "Holographic wills recognized (boolean)",
      "Electronic wills recognized (boolean)",
      "Nuncupative wills recognized (boolean)",
      "Self-proving affidavit available (boolean)",
      "Primary statute citation",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://idonthaveawill.com" },
      { "@type": "ListItem", position: 2, name: "Data", item: "https://idonthaveawill.com/data" },
      { "@type": "ListItem", position: 3, name: "2026 Report", item: PAGE_URL },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="text-[12px] text-[var(--color-ink-soft)] mb-6">
        <Link href="/data" className="hover:underline">
          ← Open data library
        </Link>
      </nav>

      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-3">
        Annual Report · 2026
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[36px] md:text-[48px] font-medium text-[var(--color-ink)] leading-[1.05] tracking-[-0.01em]">
        2026 state-by-state will laws report.
      </h1>
      <p className="mt-4 text-[var(--color-ink-soft)] max-w-2xl leading-relaxed text-[17px]">
        How every U.S. state regulates the execution of a valid will, in one
        place. Numbers come from primary-source state statutes, last verified
        in 2026. Tables below are free to cite, screenshot, or embed under a
        CC BY 4.0 license.
      </p>

      {/* Headline stats */}
      <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="States covered" value={`${total}`} />
        <Stat
          label="Notarization required"
          value={`${notaryRequired.length} state${notaryRequired.length === 1 ? "" : "s"}`}
          sub={notaryRequired.map((s) => s.abbreviation).join(", ") || undefined}
        />
        <Stat
          label="Holographic wills"
          value={`${holographic.length} states`}
          sub="accept handwritten unwitnessed wills"
        />
        <Stat
          label="Electronic wills"
          value={`${electronic.length} states`}
          sub="enacted e-wills statutes"
        />
      </section>

      {/* Key findings */}
      <section className="mt-16">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-4">
          Key findings · 2026
        </h2>
        <ul className="space-y-3 text-[16px] leading-[1.65] text-[var(--color-ink)] max-w-2xl">
          <li>
            <strong>Only Louisiana</strong> requires a will to be notarized to
            be legally valid (La. C.C. art. 1577 — notarial testament). Every
            other state accepts wills with witnesses alone.
          </li>
          <li>
            <strong>{witness2.length} states require 2 witnesses</strong>,
            {witness3.length === 1
              ? " 1 state requires 3"
              : ` ${witness3.length} states require 3`}
            . Witnesses must generally be adult, mentally competent, and
            disinterested.
          </li>
          <li>
            <strong>{holographic.length} of {total} jurisdictions</strong>{" "}
            recognize holographic (handwritten, unwitnessed) wills — typically
            only when the material provisions and signature are in the
            testator&apos;s own handwriting.
          </li>
          <li>
            <strong>{electronic.length} jurisdictions</strong> have adopted
            electronic-wills statutes. The remaining {total - electronic.length} still
            require a physical signed-and-witnessed document.
          </li>
          <li>
            <strong>{selfProving.length} of {total} jurisdictions</strong>{" "}
            offer a self-proving affidavit — an optional notarized statement
            attached to the will that speeds up probate.
          </li>
          <li>
            <strong>{minAge18.length} states</strong> set the standard minimum
            testator age at 18; the rest vary, with limited exceptions for
            emancipated minors and members of the armed forces.
          </li>
          <li>
            <strong>{nuncupative.length} jurisdictions</strong> still recognize
            nuncupative (oral) wills in narrow circumstances — typically
            mariners at sea and members of the armed forces in active service.
          </li>
        </ul>
      </section>

      {/* Full state table */}
      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] font-medium text-[var(--color-ink)] mb-2">
          Full state table
        </h2>
        <p className="text-[14px] text-[var(--color-ink-soft)] mb-6">
          Click any state name for the full breakdown including statute citations.
        </p>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-[14px] border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[var(--color-cream-deep)] border-b border-[var(--color-rule)]">
                <th className="text-left p-3 font-medium text-[var(--color-ink)]">State</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Min age</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Witnesses</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Notary req.</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Holographic</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">E-wills</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Nuncupative</th>
                <th className="text-center p-3 font-medium text-[var(--color-ink)]">Self-proving</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s) => (
                <tr
                  key={s.abbreviation}
                  className="border-b border-[var(--color-rule)] hover:bg-[var(--color-cream-deep)]"
                >
                  <td className="p-3">
                    <Link
                      href={getStateUrl(s.state)}
                      className="text-[var(--color-accent)] hover:underline font-medium"
                    >
                      {s.state}
                    </Link>{" "}
                    <span className="text-[11px] font-mono text-[var(--color-ink-soft)]">
                      {s.abbreviation}
                    </span>
                  </td>
                  <td className="text-center p-3 font-mono text-[var(--color-ink-soft)]">
                    {s.minimum_age.standard}
                  </td>
                  <td className="text-center p-3 font-mono text-[var(--color-ink-soft)]">
                    {s.witness_requirements.count}
                  </td>
                  <Cell ok={s.notarization.required} positive />
                  <Cell ok={s.holographic_wills.recognized} />
                  <Cell ok={s.electronic_wills.recognized} />
                  <Cell ok={s.nuncupative_wills.recognized} />
                  <Cell ok={s.self_proving_affidavit.available} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-16 pt-8 border-t border-[var(--color-rule)]">
        <h2 className="font-[family-name:var(--font-display)] text-[22px] md:text-[26px] font-medium text-[var(--color-ink)] mb-4">
          Methodology
        </h2>
        <div className="space-y-4 text-[15px] leading-[1.65] text-[var(--color-ink-soft)] max-w-2xl">
          <p>
            <strong className="text-[var(--color-ink)]">Source.</strong> Every
            entry comes from the underlying state probate statute — not from
            secondary sources or aggregator sites. Individual state pages link
            to the citation (e.g.,{" "}
            <em>La. C.C. art. 1577</em>, <em>EPTL § 3-2.2</em>).
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">What we coded.</strong>{" "}
            For each jurisdiction we recorded the minimum testator age,
            required witness count, witness presence rules, whether a notarial
            seal is required for validity (not the optional self-proving
            affidavit), whether holographic / electronic / nuncupative forms
            are recognized, and the controlling statute citation. Edge cases
            and exceptions are noted on individual state pages.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Update cadence.</strong>{" "}
            Verified annually. Material changes mid-year (new e-wills statute,
            UPC adoption, etc.) trigger an out-of-cycle update; the
            &quot;last verified&quot; date for each state is on its dedicated
            page.
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">Limitations.</strong>{" "}
            This is general legal information for research and citation, not
            legal advice. Statutes evolve, and edge cases (military service
            wills, foreign testators, blind testators, electronic-will
            jurisdictional reach) are not always cleanly captured in a binary
            cell. Use individual state pages for nuance.
          </p>
        </div>
      </section>

      {/* Cite / embed */}
      <section className="mt-16 pt-8 border-t border-[var(--color-rule)]">
        <h2 className="font-[family-name:var(--font-display)] text-[22px] md:text-[26px] font-medium text-[var(--color-ink)] mb-4">
          Cite this report
        </h2>
        <div className="space-y-4 text-[14px] text-[var(--color-ink-soft)] max-w-2xl">
          <p>
            This dataset is free to cite, screenshot, embed, or republish under
            a{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="text-[var(--color-ink)] underline"
              rel="noopener"
            >
              CC BY 4.0 license
            </a>
            . If you reference these tables, link back so readers can verify
            the source.
          </p>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-2">
              Suggested citation
            </p>
            <pre className="bg-[var(--color-cream-deep)] border border-[var(--color-rule)] p-3 text-[12px] font-mono text-[var(--color-ink)] overflow-x-auto whitespace-pre-wrap">
{`I Don't Have a Will. (2026). 2026 State-by-State Will Laws Report.
Retrieved from ${PAGE_URL}`}
            </pre>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-2">
              Embed (link card)
            </p>
            <pre className="bg-[var(--color-cream-deep)] border border-[var(--color-rule)] p-3 text-[12px] font-mono text-[var(--color-ink)] overflow-x-auto">
{`<a href="${PAGE_URL}">
  2026 State Will Laws Report — I Don't Have a Will
</a>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="mt-12 text-[12px] text-[var(--color-ink-soft)] max-w-2xl">
        This report is general legal information for research and citation; it
        is not legal advice. Statutes change — always verify current
        requirements with a licensed attorney in your state before acting on
        any specific point.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="p-5 bg-[var(--color-cream-deep)] border border-[var(--color-rule)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-2">
        {label}
      </div>
      <div className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] font-medium text-[var(--color-ink)] leading-tight">
        {value}
      </div>
      {sub && (
        <div className="text-[12px] text-[var(--color-ink-soft)] mt-1">
          {sub}
        </div>
      )}
    </div>
  );
}

function Cell({ ok, positive = false }: { ok: boolean; positive?: boolean }) {
  // For most fields, "Yes" is neutral. For notarization, "Yes" is a friction
  // signal (only Louisiana), so we render it with emphasis.
  if (ok) {
    return (
      <td className={`text-center p-3 font-medium ${positive ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]"}`}>
        Yes
      </td>
    );
  }
  return (
    <td className="text-center p-3 text-[var(--color-ink-soft)]">No</td>
  );
}
