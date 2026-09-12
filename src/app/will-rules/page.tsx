import type { Metadata } from "next";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/og";
import { getAllStates } from "@/lib/stateData";
import { getStateUrl } from "@/lib/stateSlugs";
import type { StateRequirements } from "@/lib/types";

export const metadata: Metadata = {
  title: "Will Rules by Topic — Which States Require What",
  description:
    "One page per rule instead of one page per state: notarization, witness counts, handwritten wills, electronic wills, oral wills and minimum age — with the jurisdictions that fall on each side, drawn from our own state research.",
  alternates: {
    canonical: "https://idonthaveawill.com/will-rules",
  },
  openGraph: buildOpenGraph({
    title: "Will Rules by Topic — Which States Require What",
    description:
      "The state rules that actually differ — notarization, witnesses, handwritten and electronic wills — each with the list of jurisdictions it applies to.",
    path: "/will-rules",
  }),
};

/**
 * /will-rules — the state research, sliced the other way round.
 *
 * /will-requirements is keyed by state: pick Ohio, read Ohio's rules. But the
 * question people actually type is keyed by the rule — "what states require a
 * will to be notarized", "can a handwritten will hold up". This page answers
 * those, and every jurisdiction named links back to its own state guide.
 *
 * Nothing on this page is authored: each count and each list is computed from
 * data/states/all_states.json at build time, so it can't drift away from the
 * state guides or from the comparison table on /will-requirements. The rule
 * copy defines the rule and stops there — the numbers are the data's job.
 */

type WillRule = {
  /** Anchor id, and the stable key if these ever become their own routes. */
  slug: string;
  label: string;
  /** The question a reader arrives with, used as the section heading. */
  question: string;
  /**
   * Noun phrase naming the set, so the count can be appended after it and
   * still read correctly at any value — including 1, where "N jurisdictions
   * require…" would not.
   */
  setLabel: string;
  /** What the rule IS. Deliberately free of counts and state names. */
  definition: string;
  /** Jurisdictions this rule picks out. */
  matches: (s: StateRequirements) => boolean;
  /** Optional per-jurisdiction detail, also derived from the data. */
  detail?: (s: StateRequirements) => string | null;
};

/**
 * Exported so that any future per-rule route reads its list from here rather
 * than restating it — the same reason the state slugs live in one module.
 *
 * Order is editorial, not by size: notarization is the single highest-volume
 * question this site gets asked (the same reason /will-requirements opens with
 * a short-answer block about it), and a strict count sort would bury it under
 * the handwritten-wills list.
 */
export const WILL_RULES: WillRule[] = [
  {
    slug: "notarization",
    label: "Notarization required",
    question: "Which states require a will to be notarized?",
    setLabel: "Jurisdictions where the will itself must be notarized",
    definition:
      "Whether the will itself has to be signed in front of a notary to be valid — not the optional notarized affidavit some states let you attach afterward.",
    matches: (s) => s.notarization.required,
  },
  {
    slug: "handwritten-wills",
    label: "Handwritten wills recognized",
    question: "Which states recognize a handwritten (holographic) will?",
    setLabel: "Jurisdictions that recognize a handwritten will",
    definition:
      "A holographic will is written and signed in the testator's own hand, usually without witnesses. Where it is recognized at all, it is recognized narrowly: the material provisions and the signature generally have to be handwritten.",
    matches: (s) => s.holographic_wills.recognized,
  },
  {
    slug: "electronic-wills",
    label: "Electronic wills recognized",
    question: "Which states recognize an electronic will?",
    setLabel: "Jurisdictions with an electronic wills statute",
    definition:
      "A will signed and witnessed by electronic means under a statute written for it. Some of these statutes are on the books but not yet in force.",
    matches: (s) => s.electronic_wills.recognized,
    detail: (s) => {
      if (!s.electronic_wills.effective_date) return null;
      const effective = new Date(s.electronic_wills.effective_date);
      if (Number.isNaN(effective.getTime()) || effective <= new Date()) return null;
      return `effective ${effective.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })}`;
    },
  },
  {
    slug: "oral-wills",
    label: "Oral wills recognized",
    question: "Which states recognize an oral (nuncupative) will?",
    setLabel: "Jurisdictions that recognize an oral will",
    definition:
      "A will spoken aloud rather than written down. Where it survives, it is hedged in — typically last illness or military service, witnesses present, and only a limited amount of personal property.",
    matches: (s) => s.nuncupative_wills.recognized,
  },
  {
    slug: "three-witnesses",
    label: "Three or more witnesses",
    question: "Which states ask for three or more witnesses?",
    setLabel: "Jurisdictions asking for three or more witnesses",
    definition:
      "The number of people who must watch the will be signed and then sign it themselves. Two is the common figure; a longer list is not.",
    matches: (s) => s.witness_requirements.count >= 3,
    detail: (s) => `${s.witness_requirements.count} witnesses`,
  },
  {
    slug: "fewer-than-two-witnesses",
    label: "Fewer than two witnesses",
    question: "Which states ask for fewer than two witnesses at signing?",
    setLabel: "Jurisdictions asking for fewer than two witnesses",
    definition:
      "The other end of the same rule — jurisdictions whose statute asks for fewer signatures at execution than the usual two. Witnesses are still worth having: they are what a probate court leans on if the will is ever questioned.",
    matches: (s) => s.witness_requirements.count < 2,
    detail: (s) =>
      s.witness_requirements.count === 0
        ? "none required at signing"
        : `${s.witness_requirements.count} witness`,
  },
  {
    slug: "no-self-proving-affidavit",
    label: "No self-proving affidavit",
    question: "Which states don't offer a self-proving affidavit?",
    setLabel: "Jurisdictions with no self-proving affidavit on offer",
    definition:
      "A self-proving affidavit is a notarized statement attached to a signed will so the court does not have to locate your witnesses years later. Where it isn't offered, the witnesses themselves may have to be found and asked to testify.",
    matches: (s) => !s.self_proving_affidavit.available,
  },
  {
    slug: "no-proxy-signature",
    label: "No signing on your behalf",
    question: "Which states don't allow someone to sign for you?",
    setLabel: "Jurisdictions that do not allow a proxy signature",
    definition:
      "Proxy signing is another person putting the testator's signature on the will, in their presence and at their direction, when they physically cannot sign it themselves.",
    matches: (s) => !s.signature_requirement.proxy_signing_allowed,
  },
  {
    slug: "minimum-age",
    label: "Minimum age other than 18",
    // `!== 18` rather than `< 18`: the heading has to stay true if a
    // jurisdiction ever sets the age above 18, not just below it.
    question: "Which states set the minimum age at something other than 18?",
    setLabel: "Jurisdictions setting the age at something other than 18",
    definition:
      "The age at which a person may make a valid will. Separate statutes often carve out married or enlisted testators regardless of the headline number — your state guide spells those out.",
    matches: (s) => s.minimum_age.standard !== 18,
    detail: (s) => `age ${s.minimum_age.standard}`,
  },
];

export default function WillRulesHub() {
  const states = getAllStates();
  const total = states.length;

  const rules = WILL_RULES.map((rule) => ({
    ...rule,
    jurisdictions: states.filter(rule.matches),
  }))
    // A rule no jurisdiction falls under has nothing to show. It is dropped
    // rather than rendered as an empty card — and it is dropped here, once, so
    // the summary grid and the sections below can never disagree.
    .filter((rule) => rule.jurisdictions.length > 0);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Will Rules by Topic",
    numberOfItems: rules.length,
    itemListElement: rules.map((rule, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: rule.question,
      url: `https://idonthaveawill.com/will-rules#${rule.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://idonthaveawill.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Will Rules by Topic",
        item: "https://idonthaveawill.com/will-rules",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <h1 className="font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Will Rules by Topic
      </h1>
      <p className="mt-4 text-[var(--color-ink-soft)] max-w-3xl leading-relaxed">
        Most of what makes a will valid is the same everywhere: put it in
        writing, sign it, have people watch you sign it. The handful of rules
        below are the ones that genuinely differ from one state line to the
        next. Each one lists the jurisdictions it applies to, and every
        jurisdiction links to its own guide.{" "}
        <Link href="/will-requirements" className="text-[var(--color-accent)] hover:underline">
          Looking up one state instead?
        </Link>
      </p>

      <div className="mt-6 iha-callout">
        This information is for general reference only and is not legal advice.
        Laws change &mdash; always verify current requirements with a licensed
        attorney in your state.
      </div>

      {/* Summary grid — one card per rule, counted from the same arrays the
          sections below render, so a card can never promise a list that is not
          there. */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <a
            key={rule.slug}
            href={`#${rule.slug}`}
            className="block p-5 bg-[var(--color-cream-deep)] border-l-2 border-[var(--color-accent)] hover:bg-[var(--color-cream)] transition-colors group"
          >
            <div className="font-[family-name:var(--font-display)] text-[26px] font-medium text-[var(--color-ink)]">
              {rule.jurisdictions.length}{" "}
              <span className="text-[15px] text-[var(--color-ink-soft)]">
                of {total}
              </span>
            </div>
            <div className="mt-1 font-medium text-[14px] text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
              {rule.label}
            </div>
            <div className="mt-2 text-xs text-[var(--color-ink-soft)] leading-snug">
              {rule.question}
            </div>
          </a>
        ))}
      </div>

      {/* One section per rule. */}
      <div className="mt-16 space-y-14">
        {rules.map((rule) => (
          <section key={rule.slug} id={rule.slug} className="scroll-mt-8">
            <h2 className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)] leading-tight">
              {rule.question}
            </h2>
            <p className="mt-3 text-[var(--color-ink)] leading-relaxed max-w-3xl">
              {rule.setLabel}:{" "}
              <strong className="font-medium">
                {rule.jurisdictions.length} of {total}
              </strong>
              , from the statutes cited on each state&apos;s own guide.
            </p>
            <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed max-w-3xl text-[15px]">
              {rule.definition}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {rule.jurisdictions.map((s) => {
                const detail = rule.detail ? rule.detail(s) : null;
                return (
                  <li key={s.abbreviation}>
                    <Link
                      href={getStateUrl(s.state)}
                      className="inline-flex items-baseline gap-2 px-3 py-2 border border-[var(--color-rule)] rounded-xl hover:border-[var(--color-accent)] hover:bg-[var(--color-cream-deep)] transition-all group"
                    >
                      <span className="text-[14px] font-medium text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                        {s.state}
                      </span>
                      {detail && (
                        <span className="text-[11.5px] text-[var(--color-ink-soft)]">
                          {detail}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-8 bg-[var(--color-cream-deep)]">
        <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--color-ink)]">
          Your state&apos;s rules, applied for you
        </h2>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Pick your state at the start and the draft comes out formatted for it,
          with the signing checklist that goes with it. Free, and nothing you
          type leaves your browser.
        </p>
        <Link href="/create" className="mt-4 inline-flex items-center gap-2 iha-seal">
          Get Started &mdash; Free
        </Link>
      </div>
    </div>
  );
}
