import Link from "next/link";

/**
 * The Reference Shelf — surfaces the site's reference libraries on the homepage.
 *
 * These libraries (Will Requirements, Estate Planning, the blog) and the open-data
 * report previously lived ONLY in the header/footer nav, so a visitor scanning the
 * homepage never learned they existed. This block makes the depth scannable and
 * shows the scale (all 50 states + DC, counts) that sells it. Voice + tokens match
 * the rest of the editorial homepage (Chapter One / Chapter Two).
 */

const libraries = [
  {
    kicker: "All 50 states + DC",
    title: "Will Requirements by State",
    description:
      "Witness counts, notarization, holographic and electronic wills, and the exact signing checklist for every state — eighteen states covered in an in-depth guide.",
    href: "/will-requirements",
    cta: "Browse state requirements",
  },
  {
    kicker: "All 50 states + DC",
    title: "Estate Planning Guides",
    description:
      "Plain-English guides to intestate succession, probate, trusts, and community-property rules — one for every state.",
    href: "/estate-planning",
    cta: "Read the guides",
  },
  {
    kicker: "Nine guides",
    title: "Notes on Wills & Estate Planning",
    description:
      "Who needs a will, how to write one, and what commonly goes wrong — plain-English reads, no legalese.",
    href: "/blog",
    cta: "Open the folio",
  },
];

export default function OfferingLibrary() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-cream-deep)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="iha-caps">Chapter Three</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
            A reference shelf, free to read.
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed">
            Beyond the will maker, a plain-English library on the rules that
            govern wills in every state.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {libraries.map((lib) => (
            <Link
              key={lib.href}
              href={lib.href}
              className="group flex flex-col p-6 border border-[var(--color-rule)] bg-[var(--color-cream)] hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors"
            >
              <p className="iha-caps text-[11px]">{lib.kicker}</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[21px] font-medium text-[var(--color-ink)] leading-snug tracking-[-0.01em]">
                {lib.title}
              </h3>
              <p className="mt-3 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed flex-1">
                {lib.description}
              </p>
              <span className="mt-5 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-sage-deep)] group-hover:text-[var(--color-ink)] transition-colors">
                {lib.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Open-data report — a distinct, citable authority asset. Previously
            reachable only via the sitemap; surfaced here and in the footer. */}
        <Link
          href="/data"
          className="group mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 border border-[var(--color-rule)] bg-[var(--color-cream)] hover:border-[var(--color-ink)] transition-colors"
        >
          <div className="sm:flex-1">
            <p className="iha-caps text-[11px]">Open data &middot; 51 jurisdictions</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[21px] font-medium text-[var(--color-ink)] leading-snug tracking-[-0.01em]">
              The 2026 State-by-State Will Laws Report
            </h3>
            <p className="mt-2 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">
              A free, citable dataset of every state&apos;s witness,
              notarization, holographic, and electronic-will rules — sourced
              from statute and refreshed annually.
            </p>
          </div>
          <span className="font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-sage-deep)] group-hover:text-[var(--color-ink)] transition-colors whitespace-nowrap">
            View the data &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
