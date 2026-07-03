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

const CALIFORNIA: StateDeepDive = {
  seoDescription:
    "California will requirements (2026): two witnesses present at the same time, notarization NOT required, and handwritten (holographic) wills are valid. The Prob. Code § 6110 and § 6111 rules, why notarizing does nothing in California, the community-property protection for a spouse, the omitted-spouse and omitted-child shares, and Superior Court probate — in plain English.",
  intro: [
    "California is more forgiving than most states about how a will is signed: it recognizes handwritten wills, it does not require a notary, and since 2009 a court can even rescue a will that was witnessed incorrectly. But that flexibility creates its own traps — people lean on a notary that does nothing, or write a \"holographic\" will on a printed form that quietly fails.",
    "The statute facts above give you the rules. This section covers where California wills actually go wrong, and the protections built into California law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a California will goes wrong",
    intro:
      "Most California wills that fail, fail on how they were signed — not on what they say. These are the recurring ones.",
    items: [
      {
        title: "Notarizing the will instead of getting two witnesses",
        body:
          "California asks for one thing above all: your will must be signed by at least two witnesses who are present at the same time (Prob. Code § 6110). Notarization is not required — and it is not a substitute. A carefully notarized will signed by fewer than two qualifying witnesses is not validly executed, and its only lifeline is the court's clear-and-convincing \"harmless error\" rule. Get the two witnesses; the notary is optional and cannot replace them.",
      },
      {
        title: "Assuming a notary makes the will \"self-proving\"",
        body:
          "Unlike many states, California has no traditional self-proving affidavit. Notarizing your will does not let your witnesses skip proving it after you die. California proves a will through a subscribing witness's sworn declaration — Judicial Council form DE-131, under Prob. Code § 8220 — completed after death. Keep a record of who your witnesses were and how to reach them; a notary stamp will not stand in for them.",
      },
      {
        title: "A \"holographic\" will that is typed or filled in on a form",
        body:
          "California does recognize handwritten wills, but only if your signature and the material provisions are in your own handwriting (Prob. Code § 6111). People fill in a store-bought or printed form, sign it without witnesses, and assume it counts. If the key terms are printed rather than handwritten and there are no two witnesses, it is neither a valid witnessed will nor a valid holographic one.",
      },
      {
        title: "Using a beneficiary as one of your witnesses",
        body:
          "An interested witness does not void a California will (Prob. Code § 6112). But if a gift goes to one of your two witnesses and there are not two other disinterested witnesses, the law presumes that person pressured you into it — and unless they can disprove that, they keep no more than they would have inherited with no will at all. Use witnesses who inherit nothing.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, California has not adopted electronic wills. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid California will. The valid route is still a physical document signed in wet ink with two witnesses physically present at the same time (Prob. Code § 6110).",
      },
    ],
  },
  sections: [
    {
      heading: "California protects a spouse through community property, not an elective share",
      body: [
        "California is a community-property state. Almost everything a married couple earns or acquires during the marriage is community property (Family Code § 760), and at death one-half of it already belongs to the surviving spouse outright (Prob. Code § 100). Your will only controls your half of the community property plus your own separate property — you cannot give away your spouse's half.",
        "This is why California has no New York-style elective share: there is no post-death \"claim one-third against the will,\" because the spouse is protected by owning half the marital estate by operation of law. If your plan depends on how community versus separate property is divided, sort that out while drafting — the court applies the community-property math regardless of what the will says.",
      ],
    },
    {
      heading: "The spouse or child you forgot: California's omitted-heir rules",
      body: [
        "If you marry after signing your will and never update it, your new spouse is an \"omitted spouse\" and can claim a statutory share — your half of the community and quasi-community property, plus a share of your separate property equal to what they would have inherited with no will, capped at one-half of that separate property (Prob. Code §§ 21610–21612).",
        "The same idea protects a child born or adopted after the will who is left unprovided for: they take what they would have received had you died without a will (Prob. Code § 21620). Both rules fall away if the omission was clearly intentional and stated in the will, or if you provided for the person outside the will. The safe move is simple: revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Handwritten wills are valid — but the whole plan has to be in your hand",
      body: [
        "A California holographic will needs no witnesses and no notary. What it needs is that your signature and all of the material provisions — who gets what — are in your own handwriting (Prob. Code § 6111). A statement of intent can sit on a commercially printed form, but the dispositive terms cannot be typed.",
        "Date it. An undated holographic will that conflicts with another will can be thrown out to the extent of the conflict unless you can prove it came later (Prob. Code § 6111(b)). A handwritten will is a genuine emergency option in California, but a witnessed, typed will is far easier to prove and far harder to attack.",
      ],
    },
    {
      heading: "The 2009 safety valve: a botched signing can still be saved",
      body: [
        "Since 2009, California has had a harmless-error rule: if a will was not witnessed correctly, a court can still admit it if the person offering it proves by clear and convincing evidence that you intended the document to be your will (Prob. Code § 6110(c)(2)).",
        "Do not treat this as a shortcut. It forgives a defect in witnessing — not a will you never signed and not a document that isn't in writing. It is an expensive courtroom rescue, argued after you are gone, not a substitute for signing in front of two witnesses in the first place.",
      ],
    },
    {
      heading: "Where a California will is proved: the Superior Court",
      body: [
        "California probates wills in the probate division of the Superior Court, in the county where you were domiciled — your primary residence — at death (Prob. Code § 7051). If you lived outside California but owned property here, the case is filed in the California county where that property sits.",
        "This is the court that decides whether your will was validly executed, which is exactly why the two-witness formalities carry so much weight. A clean signing, with a witness available to complete a DE-131 declaration, is what keeps a California probate uncontested and moving.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in California?",
      answer:
        "No. A California will is valid when you sign it and two witnesses, present at the same time, also sign it (Prob. Code § 6110). Notarization is not required, and it does not make the will \"self-proving\" the way it does in some states — California instead proves a will after death through a subscribing witness's sworn statement (form DE-131, Prob. Code § 8220). Notarizing adds nothing to a California will's validity and never replaces the two witnesses.",
    },
    {
      question: "Can I write my own will by hand in California?",
      answer:
        "Yes. California recognizes holographic (handwritten) wills with no witnesses and no notary, as long as your signature and all of the material provisions are in your own handwriting (Prob. Code § 6111). If you use a printed or store-bought form and the key terms are typed, it is not a valid holographic will — and without two witnesses it is not a valid witnessed will either.",
    },
    {
      question: "How many witnesses does a California will need?",
      answer:
        "Two. Both must be present at the same time and must witness either your signing or your acknowledgment of the will, understanding that the document is your will (Prob. Code § 6110). They should be disinterested — not people who inherit under the will — because a gift to one of your witnesses triggers a presumption of undue influence (Prob. Code § 6112).",
    },
    {
      question: "Can my spouse be left out of my California will?",
      answer:
        "Not entirely. California is a community-property state: your spouse already owns half of what you acquired together during the marriage, and your will only controls your half plus your separate property (Prob. Code § 100; Family Code § 760). There is no New York-style elective share, but a spouse you marry after signing the will can claim a statutory \"omitted spouse\" share (Prob. Code § 21610).",
    },
    {
      question: "Can I sign my will electronically in California?",
      answer:
        "Not as of 2026. California has not adopted electronic wills, so a valid will must be a physical document signed in wet ink with two witnesses physically present at the same time (Prob. Code § 6110). A scanned PDF or a will \"witnessed\" over video is not valid in California.",
    },
  ],
  sources: [
    { label: "Prob. Code § 6100 — Persons who may make a will", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6100." },
    { label: "Prob. Code § 6110 — Execution; witnesses; harmless error", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6110." },
    { label: "Prob. Code § 6111 — Holographic wills", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6111." },
    { label: "Prob. Code § 6112 — Interested witnesses", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6112." },
    { label: "Prob. Code § 6120 — Revocation of a will", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6120." },
    { label: "Prob. Code § 6122 — Effect of dissolution of marriage", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6122." },
    { label: "Prob. Code § 6240 — California statutory will form", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6240." },
    { label: "Prob. Code § 8220 — Proof of will by affidavit of subscribing witness", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=8220." },
    { label: "Prob. Code § 21610 — Share of omitted spouse", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=21610." },
    { label: "Prob. Code § 21620 — Share of omitted child", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=21620." },
    { label: "Prob. Code § 7051 — County of proper venue for probate", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=7051." },
    { label: "Family Code § 760 — Community property defined", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=760." },
    { label: "California Courts — Wills, estates & probate (self-help)", url: "https://selfhelp.courts.ca.gov/probate" },
  ],
};

export const STATE_DEEP_DIVES: Record<string, StateDeepDive> = {
  NY: NEW_YORK,
  CA: CALIFORNIA,
};

export function getStateDeepDive(abbr: string): StateDeepDive | undefined {
  return STATE_DEEP_DIVES[abbr.toUpperCase()];
}
