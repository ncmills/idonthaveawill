// Per-state editorial "deep dive" layer.
//
// WHY THIS EXISTS: the 51 state pages under /will-requirements/[slug] all render
// from the same template over all_states.json. Google indexed a representative
// subset (e.g. New York) and dropped the rest (e.g. California) as
// "Crawled - currently not indexed" — a duplication-at-scale / commodity-content
// verdict against high-authority incumbents (Nolo, LegalZoom, FindLaw). Adding
// more *templated* sections makes that worse. The only on-page lever is genuine,
// non-templated differentiation per state.
//
// This module is that layer. It is OPT-IN per state: a state with no entry here
// renders exactly as before. New York is the first test case — if it lifts off
// page 2, roll the pattern to CA/FL/TX.
//
// LEGAL ACCURACY: every statute reference below was verified against the NY
// Senate primary statute text (nysenate.gov) and nycourts.gov on 2026-06-21.
// Do NOT add facts or citations to this file from memory — verify against a
// primary source first (per the project's research-before-drafting rule).

export interface DeepDivePitfall {
  title: string;
  body: string;
}

export interface DeepDiveSection {
  heading: string;
  body: string[]; // one string per paragraph
}

export interface DeepDiveFaq {
  question: string;
  answer: string;
}

export interface DeepDiveSource {
  label: string;
  url: string;
}

export interface StateDeepDive {
  /** Optional override for the page's <meta name="description">. */
  seoDescription?: string;
  /** Lede paragraph(s) that open the deep-dive region. */
  intro: string[];
  pitfalls: {
    heading: string;
    intro?: string;
    items: DeepDivePitfall[];
  };
  /** Free-form editorial sections rendered in order. */
  sections: DeepDiveSection[];
  /** State-specific FAQs — rendered visibly AND merged into FAQPage JSON-LD. */
  faqs: DeepDiveFaq[];
  /** Primary sources, shown as a "Sources" list to signal real research. */
  sources: DeepDiveSource[];
}

const NEW_YORK: StateDeepDive = {
  seoDescription:
    "New York will requirements (2026): sign at the end, declare it's your will to two witnesses, and get them to sign within 30 days. The strict EPTL § 3-2.1 rules, the spousal elective share you can't write around, Surrogate's Court probate, and the military/mariner exception — explained in plain English.",
  intro: [
    "New York is one of the strictest states in the country about how a will is signed and witnessed, and its Surrogate's Courts are known for enforcing those formalities to the letter. A will that would pass in a neighboring state can be refused in New York over a single technicality.",
    "The statute facts above tell you the rules. This section tells you where New York wills actually go wrong, and the protections built into New York law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a New York will gets thrown out",
    intro:
      "Most invalid wills in New York fail on execution, not on what they say. These are the recurring ones.",
    items: [
      {
        title: "Signing anywhere but the very end",
        body:
          "EPTL § 3-2.1 requires your signature to be \"at the end thereof.\" Anything written below your signature is disregarded — and if a gift or instruction sits beneath the signature line, you can quietly unravel part of your own plan. Sign last, and sign at the bottom.",
      },
      {
        title: "Forgetting to \"publish\" the will",
        body:
          "New York is one of the few states with a publication requirement: you must actually declare to your witnesses that the document is your will (EPTL § 3-2.1). A silent signing — where witnesses watch you sign but are never told what they're signing — can be challenged. Say the words out loud.",
      },
      {
        title: "Missing the 30-day attestation window",
        body:
          "Both witnesses must sign within a single 30-day period after you sign or acknowledge your signature (EPTL § 3-2.1). Mailing a will around to collect signatures over the course of two months can invalidate it. The safe move is to get the testator and both witnesses in one room at one time.",
      },
      {
        title: "Using a beneficiary as a witness",
        body:
          "Under EPTL § 3-3.2, a gift to someone who also served as a witness is void unless at least two other disinterested witnesses signed. The will itself survives — but that person's inheritance may not. Keep your witnesses neutral parties who inherit nothing.",
      },
      {
        title: "Assuming a handwritten note counts",
        body:
          "Outside a narrow military and mariner exception, New York does not recognize handwritten (holographic) or oral wills at all (EPTL § 3-2.2). A heartfelt letter in a drawer, however clear, is not a valid will in New York.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in New York",
      body: [
        "Even if your will leaves a surviving spouse nothing, New York gives them a right of election: they can claim the greater of $50,000 or one-third of the net estate, regardless of what the will says (EPTL § 5-1.1-A).",
        "You cannot write around this without a valid waiver signed by the spouse. If part of your plan depends on leaving a spouse less than that share, build the elective share into the plan rather than ignoring it — otherwise the math the court applies may not be the math you intended.",
      ],
    },
    {
      heading: "Where a New York will is proved: Surrogate's Court",
      body: [
        "New York probates wills in Surrogate's Court — a court that exists in each of the state's 62 counties. Your will is filed in the county where you were domiciled (your primary residence) at death.",
        "This is the court that decides whether your will was validly executed, which is exactly why the signing formalities above carry so much weight. A clean execution, with a SCPA § 1406 witness affidavit attached, is what keeps a probate uncontested and fast.",
      ],
    },
    {
      heading: "New York's alternative: a SCPA § 1406 witness affidavit",
      body: [
        "New York does not use the classic notarized \"self-proving affidavit\" found in many states. Instead, SCPA § 1406 lets your two witnesses swear an affidavit — before a notary — at the time of signing, confirming the will was properly executed.",
        "Without it, the Surrogate's Court may have to track down your witnesses years later to testify in person. With it, the will can usually be admitted to probate without producing them at all. Execute the affidavit the same day you sign the will; it is far harder to arrange later.",
      ],
    },
    {
      heading: "The military and mariner exception",
      body: [
        "New York's one carve-out for handwritten and oral wills (EPTL § 3-2.2) covers members of the armed forces during a war or armed conflict, civilians serving with or accompanying those forces, and mariners at sea. A wartime note or a spoken wish in these circumstances can be a valid will with no witnesses at all.",
        "These wills expire, though. A service member's expires one year after discharge; a civilian's one year after they stop serving with the force; and a mariner's three years after it was made. For everyone else, in every ordinary situation, the witnessed-and-signed rules are the only route.",
      ],
    },
    {
      heading: "Electronic wills are coming — in December 2027",
      body: [
        "New York enacted an electronic wills law (S2224 / A1614) that allows electronic execution and remote witnessing by audio-video technology, effective December 2027. Until that date, it has no effect.",
        "For any will signed today, the safe and valid route remains a wet-ink signature with two witnesses physically present. Don't rely on a scanned PDF or a video signing yet.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I write my own will by hand in New York?",
      answer:
        "For almost everyone, no. New York only recognizes handwritten (holographic) or oral wills for active members of the armed forces during a conflict and for mariners at sea, and even those expire after a set time. Everyone else needs a typed or printed will, signed at the end, and witnessed by two people (EPTL § 3-2.1 and § 3-2.2).",
    },
    {
      question: "Can my spouse override my New York will?",
      answer:
        "A surviving spouse can claim an elective share — the greater of $50,000 or one-third of the net estate — no matter what the will says (EPTL § 5-1.1-A). You cannot fully disinherit a spouse in New York without a valid signed waiver.",
    },
    {
      question: "Does a will need to be notarized in New York?",
      answer:
        "No. Notarization is not required for a New York will to be valid. But you should have your two witnesses sign an affidavit before a notary at the time of signing (SCPA § 1406) so the will can be admitted to probate without locating the witnesses years later. New York doesn't use a traditional self-proving affidavit — the § 1406 witness affidavit serves the same practical purpose.",
    },
    {
      question: "Where is a will probated in New York?",
      answer:
        "In the Surrogate's Court of the county where the person was domiciled at death. Every one of New York's 62 counties has a Surrogate's Court.",
    },
  ],
  sources: [
    { label: "EPTL § 3-1.1 — Who may make a will", url: "https://www.nysenate.gov/legislation/laws/EPT/3-1.1" },
    { label: "EPTL § 3-2.1 — Execution and attestation of wills", url: "https://www.nysenate.gov/legislation/laws/EPT/3-2.1" },
    { label: "EPTL § 3-2.2 — Nuncupative and holographic wills", url: "https://www.nysenate.gov/legislation/laws/EPT/3-2.2" },
    { label: "EPTL § 3-3.2 — Interested witnesses", url: "https://www.nysenate.gov/legislation/laws/EPT/3-3.2" },
    { label: "EPTL § 3-4.1 — Revocation of wills", url: "https://www.nysenate.gov/legislation/laws/EPT/3-4.1" },
    { label: "EPTL § 5-1.1-A — Right of election by surviving spouse", url: "https://www.nysenate.gov/legislation/laws/EPT/5-1.1-A" },
    { label: "SCPA § 1406 — Proof of will by affidavit of attesting witness", url: "https://www.nysenate.gov/legislation/laws/SCP/1406" },
    { label: "NY Courts — Surrogate's Court", url: "https://www.nycourts.gov/courts/nyc/surrogates/" },
  ],
};

export const STATE_DEEP_DIVES: Record<string, StateDeepDive> = {
  NY: NEW_YORK,
};

export function getStateDeepDive(abbr: string): StateDeepDive | undefined {
  return STATE_DEEP_DIVES[abbr.toUpperCase()];
}
