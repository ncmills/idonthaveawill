import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Data on U.S. Will Laws | I Don't Have a Will",
  description:
    "Free, citable datasets on U.S. will-law requirements: witnesses, notarization, holographic wills, electronic wills, self-proving affidavits. All 50 states + DC, refreshed annually.",
  alternates: { canonical: "https://idonthaveawill.com/data" },
};

const DATASETS = [
  {
    slug: "2026-state-will-laws-report",
    title: "2026 State-by-State Will Laws Report",
    summary:
      "Every U.S. state's witness count, notarization rules, holographic-will status, electronic-will adoption, and self-proving-affidavit availability — in one place.",
    coverage: "51 jurisdictions",
    available: true,
  },
];

export default function DataIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-3">
        Open Data Library
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-[36px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Open data on U.S. will laws.
      </h1>
      <p className="mt-4 text-[var(--color-ink-soft)] max-w-2xl leading-relaxed">
        Citable, embed-friendly datasets on how every U.S. state regulates
        wills — sourced from state statutes, refreshed annually, published in
        plain HTML so anyone can link to them, screenshot them, or cite them
        in a brief, blog post, or law-review article.
      </p>

      <ul className="mt-12 space-y-4">
        {DATASETS.filter((d) => d.available).map((d) => (
          <li
            key={d.slug}
            className="border border-[var(--color-rule)] bg-[var(--color-cream-deep)] p-6 hover:border-[var(--color-accent)] transition-colors"
          >
            <Link href={`/data/${d.slug}`} className="block group">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-2">
                {d.coverage}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--color-ink)] group-hover:underline">
                {d.title}
              </h2>
              <p className="mt-2 text-[15px] leading-[1.55] text-[var(--color-ink-soft)]">
                {d.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 pt-8 border-t border-[var(--color-rule)]">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)] mb-3">
          About this data
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)] max-w-2xl">
          All datasets compile primary-source state statutes — not summaries
          of summaries. We cite the section number where it matters and flag
          last-verified dates. This is general legal information, not legal
          advice. If you cite our tables, link back to the page you pulled
          the numbers from; that&apos;s how we keep this work free.
        </p>
      </section>
    </div>
  );
}
