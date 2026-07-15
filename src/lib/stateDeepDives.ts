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

const GEORGIA: StateDeepDive = {
  seoDescription:
    "Georgia will requirements (2026): two witnesses who sign in your presence, notarization NOT required, and no handwritten (holographic) wills at all. The O.C.G.A. § 53-4-20 rules, why Georgia has no spousal elective share — a spouse can be disinherited, subject only to Year's Support — the age-14 minimum, the beneficiary-witness trap, and Probate Court, in plain English.",
  intro: [
    "Georgia is strict in one direction and unusually loose in two others. It flatly refuses to recognize handwritten (holographic) wills — a will needs two witnesses, no exceptions — yet it lets a 14-year-old make one, and it lets you disinherit your spouse entirely. Most people get at least one of these backwards.",
    "The statute facts above give you the rules. This section covers where Georgia wills actually go wrong, and the one protection Georgia law builds in for a surviving spouse that surprises almost everyone: not an elective share, but Year's Support.",
  ],
  pitfalls: {
    heading: "Five ways a Georgia will goes wrong",
    intro:
      "Most Georgia wills that fail, fail on how they were signed — or on a wrong assumption about what Georgia protects. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "Georgia does not recognize holographic (handwritten, unwitnessed) wills at all. Every will must be in writing and attested and subscribed by two or more competent witnesses in the testator's presence (O.C.G.A. § 53-4-20). A heartfelt letter in your own hand, however clear and however clearly signed, is not a valid will in Georgia without those two witnesses.",
      },
      {
        title: "Using a beneficiary as one of your two witnesses",
        body:
          "If a witness is also a beneficiary, the will still stands and the witness is still competent — but the gift to that witness is void unless at least two other witnesses signed who are not beneficiaries (O.C.G.A. § 53-4-23). Sign with two neutral witnesses who inherit nothing, and the problem never arises.",
      },
      {
        title: "Assuming you can't disinherit a spouse",
        body:
          "You can. Georgia has no elective or forced share — a spouse left out of the will has no automatic claim to a fixed fraction of the estate. What a surviving spouse (and minor children) can do is petition the Probate Court for Year's Support (O.C.G.A. § 53-3-1), which is a different and often smaller thing. Plan around Year's Support, not a New York-style elective share that Georgia doesn't have.",
      },
      {
        title: "Relying on a notary instead of two witnesses",
        body:
          "Notarization does not make a Georgia will valid — two witnesses do (O.C.G.A. § 53-4-20). A notary matters only for the optional self-proving affidavit, which speeds probate but adds nothing to the will's underlying validity (O.C.G.A. § 53-4-24). A carefully notarized will signed by fewer than two competent witnesses is not validly executed.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Georgia has not adopted an electronic wills act, and § 53-4-20 requires witnesses to attest \"in the presence of the testator.\" A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid Georgia will. The valid route is still a physical document signed in wet ink with two witnesses physically present.",
      },
    ],
  },
  sections: [
    {
      heading: "Georgia has no elective share — a spouse can be disinherited, but Year's Support fills the gap",
      body: [
        "This is the single most surprising Georgia rule. Georgia is not a community-property state and it has no elective or forced share for a surviving spouse. If your will leaves your spouse nothing, the will controls — there is no statute letting the spouse claim a guaranteed one-third or one-half against it the way New York or the community-property states allow.",
        "What Georgia gives a surviving spouse and minor children instead is Year's Support: a claim, filed in the Probate Court, for property from the estate sufficient to support them for 12 months from the date of death (O.C.G.A. § 53-3-1). Year's Support takes priority over most debts and even over the will's own bequests, but its amount is what the court finds necessary for support — not a fixed fraction of the estate. If your plan depends on leaving a spouse little or nothing, understand that Year's Support, not an elective share, is what they can assert.",
      ],
    },
    {
      heading: "No handwritten wills: two witnesses, and no exceptions",
      body: [
        "Georgia is a two-witness state with none of the carve-outs some states keep. A will must be in writing, signed by the testator (or by someone else in the testator's presence and at the testator's express direction), and attested and subscribed in the testator's presence by two or more competent witnesses (O.C.G.A. § 53-4-20). A witness may attest by mark, but the two-witness floor never drops.",
        "There is no holographic-will exception, no nuncupative (oral) will, and no military or mariner carve-out of the kind New York keeps. Because there is no harmless-error or dispensing power in Georgia's code, a court cannot rescue a will that was signed with only one witness by finding you \"intended\" it to be your will. Get two competent, disinterested witnesses in the room, or the document is not a will.",
      ],
    },
    {
      heading: "The beneficiary-witness trap: the will stands, the gift falls",
      body: [
        "Using someone who inherits under the will as one of your witnesses is a classic Georgia mistake. It does not void the will, and it does not make the witness incompetent. What it does is void the gift to that witness — unless there are at least two other subscribing witnesses who are not beneficiaries (O.C.G.A. § 53-4-23).",
        "There is a narrow spouse exception: you may witness a will that leaves a gift to your own spouse, and that fact goes only to your credibility, not to the gift's validity (O.C.G.A. § 53-4-23(b)). The safe practice is simpler than the exceptions — use two witnesses who take nothing under the will, and no gift is ever at risk.",
      ],
    },
    {
      heading: "The self-proving affidavit, and where a Georgia will is probated",
      body: [
        "Georgia does not require notarization for a will to be valid, but it does offer a self-proving affidavit: at signing (or any later date during the lifetimes of the testator and witnesses), the testator and both witnesses swear before a notary that the will was properly executed (O.C.G.A. § 53-4-24). A self-proved will can be admitted to probate without tracking down the witnesses to testify — but it can still be contested, revoked, or amended exactly like any other will.",
        "Georgia probates wills in the Probate Court, which has exclusive jurisdiction over the probate of wills (O.C.G.A. § 53-5-1). The petition is filed in the Probate Court of the county where the testator was domiciled — the primary residence — at death. This is the court that decides whether your will was validly executed, which is exactly why the two-witness formality carries so much weight; a self-proving affidavit is what keeps that probate uncontested and quick.",
      ],
    },
    {
      heading: "Marriage, a new child, and divorce all rewrite a Georgia will",
      body: [
        "If you marry, have a child, or adopt a child after signing a will that made no provision in contemplation of that event, Georgia does not throw the whole will out — but the new spouse or child takes the share they would have received had you died with no will at all, paid from the residue of the estate (O.C.G.A. § 53-4-48). A gift to a class of \"my children\" is presumed to include later-born or later-adopted members, so naming your existing kids does not by itself defeat the protection.",
        "Divorce cuts the other way. Every provision of a will made before your final divorce or annulment, where no provision was made in contemplation of it, takes effect as if your former spouse had predeceased you (O.C.G.A. § 53-4-49) — the ex is written out by operation of law. If you later remarry that same person and never revoked the will, those provisions revive. The safe move is the same in every case: revisit the will after any marriage, divorce, birth, or adoption. And remember a will can be revoked outright at any time before death (O.C.G.A. § 53-4-40), including by destroying it with intent to revoke (O.C.G.A. § 53-4-44).",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Georgia?",
      answer:
        "No. A Georgia will is valid when you sign it and two competent witnesses attest and subscribe it in your presence (O.C.G.A. § 53-4-20). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit (O.C.G.A. § 53-4-24), which lets the will be admitted to probate without producing the witnesses — but that affidavit speeds probate and adds nothing to whether the will is legally valid. The two witnesses are what matter.",
    },
    {
      question: "Can I write my own will by hand in Georgia?",
      answer:
        "You can write it by hand, but it is not valid unless two competent witnesses also attest and subscribe it in your presence (O.C.G.A. § 53-4-20). Georgia does not recognize holographic wills — a handwritten, unwitnessed will has no legal effect here, unlike in California or Texas. Handwriting the document is fine; skipping the two witnesses is fatal.",
    },
    {
      question: "How many witnesses does a will need in Georgia?",
      answer:
        "Two. A Georgia will must be attested and subscribed by two or more competent witnesses, and they must sign in the testator's presence (O.C.G.A. § 53-4-20). Choose witnesses who are not beneficiaries: if a witness also inherits under the will, that gift is void unless two other non-beneficiary witnesses signed (O.C.G.A. § 53-4-23).",
    },
    {
      question: "Can my spouse be left out of a Georgia will?",
      answer:
        "Yes. Georgia has no elective or forced share and is not a community-property state, so a spouse can be disinherited by the will. The one protection is Year's Support: a surviving spouse (and minor children) can petition the Probate Court for property sufficient to support them for 12 months after death, which takes priority over most debts and bequests (O.C.G.A. § 53-3-1). That is a support claim, not a fixed share of the estate.",
    },
    {
      question: "Can I sign my will electronically in Georgia?",
      answer:
        "Not as of 2026. Georgia has not adopted an electronic wills act, and the statute requires witnesses to attest in the testator's presence (O.C.G.A. § 53-4-20). A scanned PDF, an e-signature, or a will \"witnessed\" over video is not a valid Georgia will. The valid route is a physical document signed in wet ink with two witnesses physically present.",
    },
  ],
  sources: [
    { label: "O.C.G.A. § 53-4-10 — Minimum age (14) to make a will", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-10/" },
    { label: "O.C.G.A. § 53-4-11 — Testamentary capacity", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-11/" },
    { label: "O.C.G.A. § 53-4-20 — Required writing; signing; two witnesses", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-20/" },
    { label: "O.C.G.A. § 53-4-23 — Interested (beneficiary) witness", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-23/" },
    { label: "O.C.G.A. § 53-4-24 — Self-proved will or codicil", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-24/" },
    { label: "O.C.G.A. § 53-4-40 — Right to revoke a will", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-40/" },
    { label: "O.C.G.A. § 53-4-44 — Revocation by physical act", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-44/" },
    { label: "O.C.G.A. § 53-4-48 — Child born or spouse after execution", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-48/" },
    { label: "O.C.G.A. § 53-4-49 — Effect of divorce or annulment", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-4-49/" },
    { label: "O.C.G.A. § 53-3-1 — Year's Support for spouse and minor children", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-3-1/" },
    { label: "O.C.G.A. § 53-5-1 — Probate Court jurisdiction and venue", url: "https://codes.findlaw.com/ga/title-53-wills-trusts-and-administration-of-estates/ga-code-sect-53-5-1/" },
    { label: "GeorgiaLegalAid — What should I know about making a will?", url: "https://www.georgialegalaid.org/resource/what-should-i-know-about-making-a-will" },
    { label: "Georgia.gov — Write a Will", url: "https://georgia.gov/write-will" },
    { label: "Georgia Courts — Council of Probate Court Judges", url: "https://georgiacourts.gov/council-of-probate-judges-of-georgia/" },
  ],
};

const NORTH_CAROLINA: StateDeepDive = {
  seoDescription:
    "North Carolina will requirements (2026): two competent witnesses who sign in your presence, no notary required, and handwritten (holographic) wills valid with no witnesses. The strict § 31-3.3 rules, why NC has no harmless-error rescue, the sliding-scale elective share a spouse can claim, the 2021 repeal of the old \"found among valuable papers\" rule, and Clerk of Superior Court probate — in plain English.",
  intro: [
    "North Carolina sits in the middle on formality: it recognizes handwritten wills and does not require a notary, but it demands strict compliance with its execution statute and gives judges no power to forgive a signing that went wrong. A will that misses a formality is simply invalid — there is no harmless-error safety valve to fall back on.",
    "The statute facts above give you the rules. This section covers where North Carolina wills actually go wrong, a 2021 change that quietly made handwritten wills easier, and the spousal protections built into North Carolina law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a North Carolina will goes wrong",
    intro:
      "Most North Carolina wills that fail, fail on how they were signed — not on what they say. And because North Carolina has no harmless-error rule, a defect is usually fatal. These are the recurring ones.",
    items: [
      {
        title: "Assuming there is a safety net for a botched signing",
        body:
          "North Carolina requires strict compliance: no will is valid unless it complies with the requirements of the Chapter (§ 31-3.1). Unlike California, North Carolina has not adopted a harmless-error or \"dispensing power\" rule, so a court cannot rescue a will that was signed or witnessed incorrectly no matter how clear your intent was. Get the formalities right the first time — there is no do-over after death.",
      },
      {
        title: "A \"holographic\" will that isn't entirely in your handwriting",
        body:
          "North Carolina recognizes handwritten wills, but only if the will is \"written entirely in the handwriting of the testator\" and signed by the testator (§ 31-3.4). People fill in a store-bought or typed form in their own hand and assume it counts. If material words are printed or typed rather than handwritten, and there are no two witnesses, it is neither a valid holographic will nor a valid attested one.",
      },
      {
        title: "Using a beneficiary as one of your two witnesses",
        body:
          "A gift to someone who also served as a witness is void unless at least two other disinterested witnesses signed the will (§ 31-10). North Carolina's rule is all-or-nothing: without two other disinterested witnesses, the interested witness and their spouse \"shall take nothing under the will.\" The will itself survives, but that person's inheritance does not. Keep your witnesses neutral parties who inherit nothing.",
      },
      {
        title: "Relying on a notary instead of two witnesses",
        body:
          "An attested North Carolina will must be signed by the testator and attested by at least two competent witnesses who sign in the testator's presence (§ 31-3.3). Notarization is not required and does not substitute for a witness. A notary's role is separate: it makes the will \"self-proved\" for probate (§ 31-11.6), not validly executed. A notarized will signed by fewer than two witnesses is not a valid will.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, North Carolina has not adopted electronic wills. The only electronic provision in Chapter 31 lets a licensed attorney store an electronic copy of an already-executed paper will (Article 11) — it does not authorize signing a will electronically. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid North Carolina will. The valid route is still wet ink with two witnesses physically present.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in North Carolina",
      body: [
        "North Carolina is not a community-property state, but it still protects a surviving spouse through an elective share. A spouse who is left too little can claim a percentage of the decedent's \"Total Net Assets\" that increases with the length of the marriage: it starts at 15% for marriages under five years, rises to 25% at five years and one-third at ten years, and reaches one-half (50%) for marriages of fifteen years or more (§ 30-3.1).",
        "On top of the elective share, a surviving spouse is entitled to a year's allowance of $60,000 for support, taken ahead of most claims against the estate (§ 30-15). You cannot write around these protections by leaving the spouse out of the will. If part of your plan depends on leaving a spouse less than the statutory share, build the elective share into the plan rather than ignoring it.",
      ],
    },
    {
      heading: "The spouse or child you forgot — and the ex-spouse you didn't remove",
      body: [
        "Marriage, divorce, and new children can rewrite an old will by operation of law. If you marry after signing your will and never update it, the new spouse can petition for an elective share just as if the will had been made after the marriage (§ 31-5.3). A child born or adopted after the will who is left unprovided for takes the share they would have received had you died without a will, unless the will shows the omission was intentional or otherwise provided for them (§ 31-5.5).",
        "Divorce cuts the other way. If your marriage ends by absolute divorce or annulment after you sign, your former spouse is \"deemed to have predeceased\" you for every gift, appointment, and fiduciary role in the will (§ 31-5.4) — so an ex-spouse named as executor or beneficiary is automatically written out. None of this is a substitute for redrafting: the safe move is to revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Handwritten wills are valid — and North Carolina just made them easier",
      body: [
        "A North Carolina holographic will needs no witnesses and no notary. What it needs is that the will is written entirely in the testator's own handwriting and signed by the testator, with the signature either subscribed or placed in or on the will in the testator's own hand (§ 31-3.4). Printed matter that does not affect the meaning can appear, but the dispositive terms must be handwritten.",
        "Until 2021, North Carolina also required a holographic will to be found after death among the testator's valuable papers, in a safe-deposit box or safe place, or in the custody of a person the testator left it with for safekeeping. Session Laws 2021-85 repealed that location requirement effective July 8, 2021, so a valid handwritten will now stands no matter where it turns up. North Carolina also recognizes nuncupative (oral) wills, but only in a narrow deathbed situation — made in one's last sickness or imminent peril of death, before two witnesses specially asked to witness it (§ 31-3.5) — and they can pass only limited personal property.",
      ],
    },
    {
      heading: "North Carolina has no harmless-error rescue",
      body: [
        "Some states let a judge admit a will that was signed incorrectly if the intent is clear by clear and convincing evidence. North Carolina does not. Section 31-3.1 makes a will invalid unless it complies with the Chapter's requirements, and there is no dispensing-power provision to soften that. The formalities in § 31-3.3 — a writing, the testator's signature, and at least two competent witnesses who sign in the testator's presence — are the whole ballgame.",
        "This is exactly why the interested-witness trap and the two-witness rule carry so much weight here. A missing witness or a beneficiary-witness cannot be argued away after the fact. Execute cleanly, in front of two disinterested witnesses, and — for probate ease — add the self-proving acknowledgment before a notary the same day.",
      ],
    },
    {
      heading: "Where a North Carolina will is proved: the Clerk of Superior Court",
      body: [
        "North Carolina probates wills before the Clerk of Superior Court, who serves as the judge of probate, in the county where the decedent was domiciled — the primary residence — at death (§ 28A-3-1). If the decedent lived outside North Carolina but owned property here, the case is filed in a North Carolina county where that property sits.",
        "You make probate far smoother by having the will self-proved. Under § 31-11.6, the testator and the two witnesses acknowledge the will before a notary — at signing or later — and the notary's certificate lets the will be admitted without tracking the witnesses down to testify. Notarization is never required for the will to be valid; its only job is to make the will self-proving. There is no separate North Carolina statutory will form to fill in — a will is drafted to meet § 31-3.3 or handwritten to meet § 31-3.4.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in North Carolina?",
      answer:
        "No. A North Carolina will is valid when the testator signs it and at least two competent witnesses sign in the testator's presence (§ 31-3.3) — no notary is required. A notary's only role is to make the will \"self-proved\" so it can be admitted to probate without the witnesses testifying (§ 31-11.6). Notarizing adds nothing to a will's validity and never replaces the two witnesses. A handwritten (holographic) will needs neither witnesses nor a notary (§ 31-3.4).",
    },
    {
      question: "Are handwritten wills legal in North Carolina?",
      answer:
        "Yes. North Carolina recognizes handwritten (holographic) wills with no witnesses and no notary, as long as the will is written entirely in your own handwriting and signed by you (§ 31-3.4). North Carolina used to require that the will also be found after death among your valuable papers or in a safe place, but Session Laws 2021-85 repealed that requirement effective July 8, 2021 — so a valid handwritten will now stands wherever it is found. If material terms are typed, it is not a valid holographic will.",
    },
    {
      question: "How many witnesses does a will need in North Carolina?",
      answer:
        "Two. A typed or printed will must be signed by the testator and attested by at least two competent witnesses who sign in the testator's presence (§ 31-3.3); the witnesses need not sign in each other's presence. They should be disinterested — a gift to a witness is void unless two other disinterested witnesses also signed, and the interested witness then takes nothing under the will (§ 31-10). A handwritten holographic will is the only kind that needs no witnesses at all (§ 31-3.4).",
    },
    {
      question: "Can my spouse be left out of a North Carolina will?",
      answer:
        "Not entirely. North Carolina is not a community-property state, but a surviving spouse can claim an \"elective share\" against the will — a percentage of Total Net Assets that rises with the length of the marriage, from 15% under five years to one-half (50%) at fifteen years or more (§ 30-3.1). A spouse is also entitled to a $60,000 year's allowance for support (§ 30-15). You cannot disinherit a spouse without a valid waiver.",
    },
    {
      question: "Can I sign my will electronically in North Carolina?",
      answer:
        "Not as of 2026. North Carolina has not adopted electronic wills. The only electronic provision in the wills chapter lets a licensed attorney store an electronic copy of an already-signed paper will (Chapter 31, Article 11); it does not allow signing a will electronically. A valid will must be a physical document signed in wet ink with two witnesses physically present (§ 31-3.3), or a holographic will entirely in your own handwriting (§ 31-3.4). A scanned PDF or a will \"witnessed\" over video is not valid.",
    },
  ],
  sources: [
    { label: "N.C.G.S. § 31-1 — Who may make will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-1.html" },
    { label: "N.C.G.S. § 31-3.1 — Will invalid unless statutory requirements complied with", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-3.1.html" },
    { label: "N.C.G.S. § 31-3.3 — Attested written will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-3.3.html" },
    { label: "N.C.G.S. § 31-3.4 — Holographic will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-3.4.html" },
    { label: "N.C.G.S. § 31-3.5 — Nuncupative will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-3.5.html" },
    { label: "N.C.G.S. § 31-5.1 — Revocation of written will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-5.1.html" },
    { label: "N.C.G.S. § 31-5.3 — Effect of subsequent marriage", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-5.3.html" },
    { label: "N.C.G.S. § 31-5.4 — Revocation by divorce or annulment", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-5.4.html" },
    { label: "N.C.G.S. § 31-5.5 — After-born or after-adopted child", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-5.5.html" },
    { label: "N.C.G.S. § 31-10 — Competency of interested witness", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-10.html" },
    { label: "N.C.G.S. § 31-11.6 — Self-proved wills", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_31/GS_31-11.6.html" },
    { label: "N.C.G.S. § 30-3.1 — Right of elective share", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_30/GS_30-3.1.html" },
    { label: "N.C.G.S. § 30-15 — Year's allowance to surviving spouse", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_30/GS_30-15.html" },
    { label: "N.C.G.S. § 28A-3-1 — Venue for probate of will", url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_28A/GS_28A-3-1.html" },
    { label: "N.C. Courts — Estates and wills (self-help)", url: "https://www.nccourts.gov/help-topics/estates-and-wills/estates" },
  ],
};

const TEXAS: StateDeepDive = {
  seoDescription:
    "Texas will requirements (2026): two credible witnesses at least 14 years old, notarization NOT required for validity, and handwritten (holographic) wills fully recognized. The Estates Code § 251.051 execution rules, why Texas has no harmless-error do-over, how community property (not an elective share) protects a spouse, the self-proving affidavit that actually needs a notary, the pretermitted-child and divorce rules, and county-court probate — in plain English.",
  intro: [
    "Texas is flexible in ways that surprise people: it fully recognizes handwritten wills, it lets 14-year-olds serve as witnesses, and it never requires a notary to make a will valid. But it is unforgiving where it counts. Texas has no harmless-error rule — no judge can rescue a will that was signed the wrong way — and because Texas is a community-property state, what you can actually leave a spouse is not what most people assume.",
    "The statute facts above give you the rules. This section covers where Texas wills actually go wrong, and the protections built into Texas law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Texas will goes wrong",
    intro:
      "Most Texas wills that fail, fail on how they were signed — not on what they say. And unlike a growing number of states, Texas gives you no second chance to fix a botched signing. These are the recurring mistakes.",
    items: [
      {
        title: "Notarizing the will instead of getting two witnesses",
        body:
          "A typed Texas will must be attested by two or more credible witnesses who are at least 14 years old and who sign the will in your presence (Estates Code § 251.051). Notarization is not required and is not a substitute — a carefully notarized will signed by only one witness, or none, is simply not executed. And because Texas has no harmless-error rule, there is no courtroom rescue for it. Get the two witnesses; the notary is optional.",
      },
      {
        title: "Using a beneficiary as one of your witnesses",
        body:
          "A gift to someone who also signs as a witness is at risk only when the will cannot be proved without that witness — for example, if your other witness is also a beneficiary (Estates Code § 254.002). If the second witness is disinterested, or the will is self-proved, the gift stands. Even when the witness is a necessary one, the gift survives if a disinterested, credible person corroborates the testimony, and the witness may still take up to their intestate share. The clean fix is simpler than the exceptions: use two witnesses who inherit nothing.",
      },
      {
        title: "A \"holographic\" will that is typed or filled in on a form",
        body:
          "Texas recognizes handwritten wills with no witnesses at all — but only if the will is written wholly in your own handwriting (Estates Code § 251.052). People buy a printed will form, fill in the blanks, and sign it without witnesses. Because the printed words are not in your hand and there are no two witnesses, it is neither a valid holographic will nor a valid attested one.",
      },
      {
        title: "Skipping the self-proving affidavit",
        body:
          "A Texas will is valid without a self-proving affidavit, but skipping it makes probate harder. The affidavit — sworn by you and both witnesses before a notary, who affixes an official seal (Estates Code § 251.104) — lets the will be admitted without tracking down your witnesses to testify years later (§ 251.102). This is the one document in a Texas will where a notary belongs. Sign it the same day you sign the will.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Texas has not adopted electronic wills. Section 251.051 still requires a written document with witnesses who sign in your presence, and Texas's online-notarization law does not turn a PDF into a valid will. A scanned signature or a will \"witnessed\" over a video call is not a valid Texas will — sign a paper original in wet ink with two witnesses physically present.",
      },
    ],
  },
  sections: [
    {
      heading: "Texas protects a spouse through community property, not an elective share",
      body: [
        "Texas is a community-property state. Almost everything either spouse earns or acquires during the marriage is community property (Family Code § 3.002), and one-half of it already belongs to the surviving spouse — you cannot give away your spouse's half in your will. Your will only controls your own half of the community property plus your separate property (property owned before marriage or received by gift, devise, or descent — Family Code § 3.001).",
        "This is why Texas has no New York-style elective share: the spouse is protected by owning half the marital estate outright, not by a claim against the will. The flip side surprises people — Texas has no forced share, so you can leave a spouse nothing out of your own half and your separate property. A surviving spouse still keeps homestead and family-allowance rights in probate, but there is no statute forcing a minimum inheritance. If that is not your intent, say so in the will.",
      ],
    },
    {
      heading: "Handwritten (holographic) wills are valid — but the whole thing has to be in your hand",
      body: [
        "Texas is one of the states that still honors a purely handwritten will. A will written wholly in the testator's handwriting needs no witnesses and no notary (Estates Code § 251.052). That makes it a genuine emergency option — a valid will you can write alone at a kitchen table.",
        "The catch is the word \"wholly.\" If any dispositive part is typed or printed — including the blanks on a store-bought form — it is not a holographic will, and without two witnesses it is not a valid attested will either. A handwritten will can also be made self-proved during your lifetime by attaching your own affidavit (Estates Code § 251.107), but a typed, witnessed will is far easier to prove and far harder to attack.",
      ],
    },
    {
      heading: "Texas gives you no do-over: there is no harmless-error rule",
      body: [
        "Some states — California since 2009, for example — let a court admit a will that was signed incorrectly if there is clear and convincing evidence the person meant it to be their will. Texas has no such dispensing power anywhere in its Estates Code. If the two-witness formalities of Section 251.051 are not met, the will fails — full stop.",
        "That is exactly why the self-proving affidavit matters so much in Texas. Executed correctly before a notary at signing (Estates Code § 251.104), it lets the will into probate without your witnesses having to appear (§ 251.102). Because there is no safety valve for a defective signing, the discipline is simple: two credible witnesses at least 14 years old, everyone signing in your presence, and a self-proving affidavit attached the same day.",
      ],
    },
    {
      heading: "The child you had after signing — and the spouse you divorced",
      body: [
        "Texas automatically protects a child born or adopted after you sign your will — a \"pretermitted child\" — who is neither mentioned nor provided for in the will or outside it (Estates Code §§ 255.051–255.052). If you had no living children when you signed, that child takes the share they would have received had you died without a will (§ 255.054); if you did have children and provided for them, the omitted child shares equally in what those children received (§ 255.053). Note that Texas has no equivalent \"omitted spouse\" statute — marrying after you sign does not rewrite your will for the new spouse the way it does in California.",
        "Divorce, by contrast, is handled for you. If your marriage is dissolved by divorce, annulment, or a void-marriage declaration after you sign, the will is read as if your former spouse — and each of their relatives who is not also your relative — had died before you, unless the will says otherwise (Estates Code § 123.001). You still cannot change a will any other way except by a later will, codicil, or writing executed with the same formalities, or by physically destroying it (§ 253.002). The safe move is to revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Where a Texas will is proved: county court or statutory probate court",
      body: [
        "Texas has no single \"probate court\" statewide. In counties with a statutory probate court, that court hears the case; in counties with a county court at law exercising probate jurisdiction, it shares jurisdiction with the constitutional county court; and in the many smaller counties with neither, the county court itself handles probate (Estates Code § 32.002).",
        "You file in the county where the decedent lived — the county of the deceased's domicile or fixed place of residence at death (Estates Code § 33.001). This is the court that decides whether the will was validly executed, which is why the two-witness formalities and a self-proving affidavit carry so much weight. One last practical note: Texas has no statutory fill-in-the-blank will form in its Estates Code (unlike California's), but the Supreme Court of Texas published free approved will forms in 2023 for simple estates — an administrative resource, not a statute.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Texas?",
      answer:
        "No. A Texas will is valid when you sign it and two or more credible witnesses at least 14 years old also sign it in your presence (Estates Code § 251.051). Notarization is never required to make a Texas will valid. A notary matters only for the optional self-proving affidavit, which is sworn before a notary and lets the will be probated without your witnesses testifying later (Estates Code §§ 251.102, 251.104). Notarizing the will itself adds nothing to its validity and cannot replace the two witnesses.",
    },
    {
      question: "Can I write my own will by hand in Texas?",
      answer:
        "Yes. Texas fully recognizes handwritten (holographic) wills with no witnesses and no notary, as long as the will is written wholly in your own handwriting (Estates Code § 251.052). If any part of the will that gives away property is typed or is the printed text of a store-bought form, it is not a valid holographic will — and without two witnesses it is not a valid attested will either. Date and sign it, and keep it somewhere it will be found.",
    },
    {
      question: "How many witnesses does a will need in Texas?",
      answer:
        "Two. A typed or printed Texas will must be attested by two or more credible witnesses who are at least 14 years old and who sign the will in your presence (Estates Code § 251.051). The only exception is a holographic will written wholly in your own handwriting, which needs no witnesses at all (§ 251.052). Use witnesses who inherit nothing — a gift to a witness is at risk only if the will can't be proved without that witness's testimony (§ 254.002).",
    },
    {
      question: "Can my spouse be left out of a Texas will?",
      answer:
        "Partly. Texas is a community-property state, so your spouse already owns half of everything you acquired together during the marriage, and your will only controls your half plus your separate property (Family Code §§ 3.001, 3.002). Unlike New York, Texas has no elective share, so you can leave a spouse nothing out of your own share — but they keep their own half of the community estate plus homestead and family-allowance rights in probate. Divorce is handled automatically: an ex-spouse is treated as having died before you (Estates Code § 123.001).",
    },
    {
      question: "Can I sign my will electronically in Texas?",
      answer:
        "Not as of 2026. Texas has not adopted electronic or remote wills, so a valid will must be a written document signed with two witnesses physically present in your presence (Estates Code § 251.051). Texas's online-notarization law does not create a valid electronic will, and Texas has no harmless-error rule to rescue one. A scanned PDF, an e-signature, or a will \"witnessed\" over video is not valid — sign a paper original in wet ink.",
    },
  ],
  sources: [
    { label: "Estates Code § 251.001 — Who may execute a will (age, sound mind)", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.251.htm" },
    { label: "Estates Code § 251.051 — Written, signed, and attested (two witnesses, age 14+)", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.251.htm" },
    { label: "Estates Code § 251.052 — Exception for holographic wills", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.251.htm" },
    { label: "Estates Code §§ 251.101–251.104 — Self-proved wills; self-proving affidavit", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.251.htm" },
    { label: "Estates Code § 253.002 — Revocation of will", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.253.htm" },
    { label: "Estates Code § 254.002 — Bequests to certain subscribing witnesses", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.254.htm" },
    { label: "Estates Code §§ 255.051–255.054 — Pretermitted (omitted) child", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.255.htm" },
    { label: "Estates Code § 123.001 — Will provisions made before dissolution of marriage", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.123.htm" },
    { label: "Estates Code § 32.002 — Original jurisdiction for probate proceedings", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.32.htm" },
    { label: "Estates Code § 33.001 — Venue for probate of wills", url: "https://statutes.capitol.texas.gov/Docs/ES/htm/ES.33.htm" },
    { label: "Family Code §§ 3.001–3.002 — Separate and community property", url: "https://statutes.capitol.texas.gov/Docs/FA/htm/FA.3.htm" },
    { label: "TexasLawHelp — Self-Proving Wills in Texas", url: "https://texaslawhelp.org/article/self-proving-wills-in-texas" },
    { label: "TexasLawHelp — Will Forms Approved by the Supreme Court of Texas", url: "https://texaslawhelp.org/article/will-forms-approved-by-the-supreme-court-of-texas" },
  ],
};

const FLORIDA: StateDeepDive = {
  seoDescription:
    "Florida will requirements (2026): sign at the very end, two witnesses present together, no handwritten (holographic) wills, electronic wills allowed since 2020, and the homestead devise trap — explained in plain English.",
  intro: [
    "Any Floridian who is 18 or older — or an emancipated minor — and of sound mind can make a will (§ 732.501), but Florida is strict about how that will is signed. It does not recognize handwritten (holographic) wills, it requires your signature at the very end in front of two witnesses, and it has no \"harmless error\" rule to rescue a will that misses those steps. At the same time, Florida was an early adopter of electronic wills, and its constitutional homestead rules can quietly override what your will says about your house.",
    "The statute facts above give you the rules. This section covers where Florida wills actually go wrong, and the protections built into Florida law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Florida will goes wrong",
    intro:
      "Most Florida wills that fail, fail on how they were signed — or on the homestead — not on what they say. These are the recurring ones.",
    items: [
      {
        title: "Signing anywhere but the very end",
        body:
          "Florida requires the testator to sign \"at the end\" of the will (§ 732.502(1)). Anything added below your signature is on shaky ground, and a signature in the wrong place can undermine the execution itself. Sign last, and sign at the bottom.",
      },
      {
        title: "Assuming a handwritten note counts",
        body:
          "Florida does not recognize holographic (handwritten) wills at all. A will in your own handwriting has no special status — it must still be signed at the end and witnessed by two people like any other will (§ 732.502). Florida even refuses an out-of-state handwritten will that was valid where it was signed (§ 732.502(2)). A handwritten note in a drawer is not a valid Florida will.",
      },
      {
        title: "Witnesses who don't all sign together",
        body:
          "You must sign (or acknowledge your signature) in front of at least two attesting witnesses, and each witness must sign in your presence and in the presence of the other witness (§ 732.502(1)). Collecting witness signatures separately, at different times, risks invalidating the will. The safe move is to get the testator and both witnesses in one room at one time.",
      },
      {
        title: "Leaving your homestead to the wrong person",
        body:
          "If you are survived by a spouse or a minor child, you generally cannot freely devise your Florida homestead in your will (Art. X, § 4, Fla. Const.; § 732.4015). A devise that violates this — for example, leaving the house to one child when a spouse or minor child survives — is void, and the home passes by a constitutional formula instead. Plan the homestead separately from the rest of your will.",
      },
      {
        title: "Skipping the self-proving affidavit",
        body:
          "A Florida will is valid without a notary, but a will that is not \"self-proved\" can force the court to track down your witnesses years later to testify. Adding a notarized self-proving affidavit at signing (§ 732.503) lets the will be admitted to probate without them. The notary is for that affidavit — not for the will's validity — so don't skip it.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Florida",
      body: [
        "Even if your will leaves your spouse nothing, Florida gives a surviving spouse an elective share equal to 30 percent of the \"elective estate\" (§ 732.2065) — a figure that reaches beyond the probate estate into assets like jointly held property, certain trusts, and pay-on-death accounts. A spouse can claim it regardless of what the will says, and you can only cut it off with a valid written waiver.",
        "Florida is not a community-property state, so there is no automatic 50/50 split of marital assets — but the elective share, the homestead protections below, and other rules make a spouse very hard to disinherit. Two more surprises: if you marry after signing your will and never update it, the new spouse takes an intestate share as a \"pretermitted spouse\" (§ 732.301); and a gift to a spouse is automatically void if you later divorce (§ 732.507). Revisit the will after any marriage or divorce.",
      ],
    },
    {
      heading: "Florida's homestead trap: your will may not control your house",
      body: [
        "Florida's homestead is protected by the state constitution, and it carries a rule that catches people off guard: if you are survived by a spouse or a minor child, you generally cannot leave your homestead to whomever you want in your will (Art. X, § 4, Fla. Const.; § 732.4015). A devise that violates this restriction is void — the court disregards it entirely.",
        "There is one narrow exception: you may devise the homestead to your spouse, but only if you have no minor child (§ 732.4015). Otherwise the home passes by a constitutional formula — typically a life estate to the surviving spouse with the remainder to your descendants, or the spouse may instead elect a one-half interest. If your home is your largest asset, do not assume your will governs it; plan the homestead as its own problem.",
      ],
    },
    {
      heading: "Florida does not recognize handwritten wills",
      body: [
        "Unlike about half the states, Florida gives no effect to holographic (handwritten) wills. A will entirely in your own handwriting must still be signed at the end and witnessed by two people, exactly like a typed one (§ 732.502). An unwitnessed handwritten note, however clear and heartfelt, is simply not a valid Florida will.",
        "Florida goes further than most states here. It will honor an out-of-state will that was valid where it was signed — but expressly not if that will was holographic or oral (nuncupative) (§ 732.502(2)). So a handwritten will that is perfectly valid in a state that allows them can still be refused in Florida. If you moved here from such a state, have a properly witnessed will re-executed.",
      ],
    },
    {
      heading: "Electronic wills are legal in Florida — with strict guardrails",
      body: [
        "Florida was an early adopter of electronic wills. Since 2020, the Florida Electronic Wills Act (§§ 732.521–732.526) has let you sign a will with an electronic signature and have two witnesses attend by real-time audio-video technology instead of in person — but only inside a tightly controlled online-notarization session run by a Florida online notary (§ 732.522; § 117.285). It is not a matter of emailing a PDF around for signatures.",
        "Two guardrails matter most. The signed electronic will generally must be held by a \"qualified custodian\" — a regulated company that keeps it in a secure system and later files it with the court (§ 732.524). And remote audio-video witnessing is flatly unavailable if the person signing is a \"vulnerable adult\" as defined in § 415.102 — those witnesses must be physically present (§ 117.285(5)(g)). Done outside these rules, an \"electronic will\" is not valid.",
      ],
    },
    {
      heading: "Where a Florida will is proved, and the affidavit that speeds it up",
      body: [
        "Florida wills are proved in the circuit court — the probate division — of the county where you were domiciled at death (§ 733.101). Whoever holds the original will must deposit it with the clerk of that court within 10 days of learning of the death. If you lived outside Florida but owned property here, venue is the Florida county where that property sits.",
        "You can make probate far faster by making the will \"self-proved\" (§ 732.503): at signing, you and your two witnesses swear a short affidavit before a notary. Notarization is not required for the will to be valid — but a self-proved will can be admitted to probate without the court tracking down your witnesses years later to testify. Execute the affidavit the same day you sign; it is much harder to arrange after the fact.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Florida?",
      answer:
        "No. A Florida will is valid when you sign it at the end and two witnesses sign in your presence and in each other's presence (§ 732.502) — a notary is not required for validity. You should still add a notarized self-proving affidavit (§ 732.503), which lets the will be admitted to probate without locating your witnesses later. That affidavit speeds up probate; it does not make the will valid.",
    },
    {
      question: "Are handwritten wills legal in Florida?",
      answer:
        "No. Florida does not recognize holographic (handwritten) wills — a will written entirely in your own hand must still be signed at the end and witnessed by two people (§ 732.502). Florida even refuses an out-of-state handwritten will that was valid where it was signed (§ 732.502(2)). An unwitnessed handwritten note is not a valid will in Florida.",
    },
    {
      question: "How many witnesses does a will need in Florida?",
      answer:
        "Two. Florida requires at least two attesting witnesses: you must sign the will (or acknowledge your signature) in front of both of them, and each witness must sign in your presence and in the presence of the other witness (§ 732.502(1)). The safest practice is to have the testator and both witnesses together in one room. A witness who inherits under the will does not invalidate it (§ 732.504), but neutral witnesses are still better.",
    },
    {
      question: "Can my spouse be left out of a Florida will?",
      answer:
        "Not entirely. A surviving spouse can claim an elective share equal to 30 percent of your \"elective estate\" no matter what the will says (§ 732.2065), and Florida's homestead rules can override a devise of your home if a spouse survives (Art. X, § 4, Fla. Const.). Florida is not a community-property state, but between the elective share, homestead protection, and the pretermitted-spouse rule (§ 732.301), a spouse is very hard to fully disinherit without a valid written waiver.",
    },
    {
      question: "Can I make an electronic will in Florida?",
      answer:
        "Yes. Since 2020, Florida's Electronic Wills Act (§§ 732.521–732.526) allows a will signed with an electronic signature and witnessed remotely by audio-video technology — but only through a supervised online-notarization session with a Florida online notary, and usually with the signed will held by a \"qualified custodian\" (§ 732.522; § 732.524). Remote witnessing is not allowed if the signer is a \"vulnerable adult\" (§ 117.285(5)(g)). A casually e-signed PDF that skips these steps is not a valid electronic will.",
    },
  ],
  sources: [
    { label: "Fla. Stat. § 732.501 — Who may make a will", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.501" },
    { label: "Fla. Stat. § 732.502 — Execution of wills", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.502" },
    { label: "Fla. Stat. § 732.503 — Self-proof of will", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.503" },
    { label: "Fla. Stat. § 732.504 — Who may witness", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.504" },
    { label: "Fla. Stat. § 732.507 — Effect of subsequent marriage, birth, adoption, or dissolution", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.507" },
    { label: "Fla. Stat. § 732.2065 — Amount of the elective share", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.2065" },
    { label: "Fla. Stat. § 732.301 — Pretermitted spouse", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.301" },
    { label: "Fla. Stat. § 732.4015 — Devise of homestead", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.4015" },
    { label: "Art. X, § 4, Fla. Const. — Homestead; exemptions", url: "https://www.flsenate.gov/Laws/Constitution#A10S04" },
    { label: "Fla. Stat. § 732.522 — Electronic wills: method and place of execution", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.522" },
    { label: "Fla. Stat. § 732.524 — Qualified custodian of an electronic will", url: "https://www.flsenate.gov/Laws/Statutes/2024/0732.524" },
    { label: "Fla. Stat. § 117.285 — Supervising the witnessing of electronic records", url: "https://www.flsenate.gov/Laws/Statutes/2024/0117.285" },
    { label: "Fla. Stat. § 733.101 — Venue of probate proceedings", url: "https://www.flsenate.gov/Laws/Statutes/2024/0733.101" },
    { label: "Florida Courts — self-help center (wills & probate)", url: "https://www.flcourts.gov/Courts-System/Florida-Courts-Help" },
  ],
};

const PENNSYLVANIA: StateDeepDive = {
  seoDescription:
    "Pennsylvania will requirements (2026): sign at the very end, no witnesses required at signing — two witnesses instead prove the will at probate, and handwritten wills are valid. The 20 Pa.C.S. § 2502 execution rule, § 3132 proof requirement, the one-third spousal elective share, Register of Wills probate, and Pennsylvania's distinctive inheritance tax — explained in plain English.",
  intro: [
    "Pennsylvania is unusual: it is one of the few states that does not require any witnesses to be present when you sign your will. What the law requires is that you sign at the very end of the document (20 Pa.C.S. § 2502). Witnesses matter later — two of them are needed to prove your signature when the will is offered for probate (20 Pa.C.S. § 3132) — but they do not have to watch you sign.",
    "That single distinction changes almost everything about how Pennsylvania wills succeed or fail. The statute facts above give you the rules. This section covers where Pennsylvania wills actually go wrong, the protections built into Pennsylvania law that you cannot draft around, and the state's distinctive inheritance tax that most people forget about.",
  ],
  pitfalls: {
    heading: "Five ways a Pennsylvania will goes wrong",
    intro:
      "Because Pennsylvania asks so little at the signing table, the mistakes cluster around the two things it does demand — a signature at the end and someone who can later prove it. These are the recurring ones.",
    items: [
      {
        title: "Signing anywhere but the very end",
        body:
          "Section 2502 requires your will to be \"signed by the testator at the end thereof.\" This is Pennsylvania's one hard formality, and courts enforce it. Any writing placed after your signature is disregarded, so a gift or instruction sitting below the signature line can silently drop out of your plan. Pennsylvania has no harmless-error or \"dispensing power\" statute to rescue a misplaced signature — sign last, and sign at the bottom.",
      },
      {
        title: "Signing with nobody who can ever prove the will",
        body:
          "Pennsylvania does not require witnesses at signing, but it does require two competent witnesses to prove the will at probate (20 Pa.C.S. § 3132). If you sign entirely alone and no one can later authenticate your signature or handwriting, your estate may have to prove the will by handwriting comparison or other evidence — slow and contestable. Having two people witness the signing anyway is the simplest insurance.",
      },
      {
        title: "Skipping the self-proving affidavit",
        body:
          "A self-proved will lets your witnesses swear to the signing once, before a notary, so no one has to be tracked down years later to testify (20 Pa.C.S. § 3132.1). Without it, the Register of Wills may need live witness testimony to admit the will. Execute the § 3132.1 acknowledgment and affidavits at the same time you sign; it is far harder to arrange after the fact.",
      },
      {
        title: "Trying to sign electronically or by video",
        body:
          "As of 2026 Pennsylvania has not adopted electronic wills, and its courts have refused to admit electronically signed wills, holding that the fix is the legislature's job. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid Pennsylvania will. The valid route is still a physical document signed in wet ink at the end (20 Pa.C.S. § 2502).",
      },
      {
        title: "Ignoring the Pennsylvania inheritance tax",
        body:
          "Pennsylvania is one of the few states that taxes inheritances, and the rate depends on who inherits, not on the size of the estate: 0% to a spouse, 4.5% to lineal relatives (children, grandchildren, and parents), 12% to siblings, and 15% to everyone else (72 P.S. § 9116). A will that leaves property to a friend, a niece, or a sibling hands them a tax bill many people never see coming. Factor it into who you leave what.",
      },
    ],
  },
  sections: [
    {
      heading: "Pennsylvania's unusual rule: witnesses prove the will, they don't watch you sign",
      body: [
        "In most states, two witnesses must be physically present and watch you sign. Pennsylvania does not work that way. Under 20 Pa.C.S. § 2502, a will only needs to be in writing and signed by you at the end — no witnesses are required at execution. Witnesses come in at the other end of the process: to admit the will to probate, the Register of Wills requires proof by \"the oaths or affirmations of two competent witnesses\" (20 Pa.C.S. § 3132).",
        "So the witnesses prove the will; they do not validate the signing. There are two narrow exceptions where witnesses are required at execution: if you sign by making a mark, or if someone signs your name for you at your direction, that must happen before two witnesses who also sign (20 Pa.C.S. § 2502). And because Pennsylvania has no harmless-error statute, the signature-at-the-end requirement is strict — there is no judicial safety valve for a will signed in the wrong place.",
      ],
    },
    {
      heading: "You can't fully disinherit a spouse in Pennsylvania",
      body: [
        "Even if your will leaves a surviving spouse nothing, Pennsylvania gives them a right of election: they can elect to take one-third of certain property against the will (20 Pa.C.S. § 2203). That reach is deliberately broad — it captures not just property passing under the will, but certain lifetime transfers where you kept control, joint property with survivorship, and gifts made within a year of death above a small per-recipient threshold, so you cannot easily route assets around it.",
        "Pennsylvania is not a community-property state, so there is no automatic split of marital assets — the elective share is the mechanism instead. The election is personal to the surviving spouse and must be filed within a statutory deadline, and it can be waived by agreement before or after the marriage (20 Pa.C.S. §§ 2206–2207). If your plan depends on leaving a spouse less than a third, build the elective share into the math rather than ignoring it.",
      ],
    },
    {
      heading: "Handwritten wills are valid in Pennsylvania — but sign at the end",
      body: [
        "Because Pennsylvania imposes no witness requirement at execution, a will written entirely in your own hand and signed at the end is valid — a holographic will (20 Pa.C.S. § 2502). Unlike many states, Pennsylvania does not require the handwritten portions to meet any special \"material provisions\" test; the ordinary execution rule applies, so what matters is that it is in writing and signed at the end.",
        "The catch is proof. A handwritten, unwitnessed will still has to be proved at probate by two competent witnesses — here, witnesses to your handwriting and signature rather than to the signing itself (20 Pa.C.S. § 3132). A handwritten will is a genuine option in Pennsylvania, but a typed will signed in front of two witnesses with a self-proving affidavit is far easier to admit and far harder to attack.",
      ],
    },
    {
      heading: "Marriage, divorce, and a new child can rewrite your will by law",
      body: [
        "Pennsylvania automatically adjusts a stale will in three situations (20 Pa.C.S. § 2507). If you marry after signing, your new spouse takes the share they would have received had you died intestate, unless the will gives them more or was made in contemplation of the marriage (§ 2507(3)). If a child is born or adopted after the will and you did not provide for them, that child takes an intestate share unless the will shows the omission was intentional (§ 2507(4)).",
        "Divorce cuts the other way: any provision in favor of a former spouse becomes ineffective if you divorce after making the will, or die during divorce proceedings, unless the will says the gift was meant to survive divorce (§ 2507(2)). A will can also be revoked outright by a later will or codicil, or by physically burning, tearing, canceling, or destroying it with intent to revoke (20 Pa.C.S. § 2505). The safe move is simple: revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Where a Pennsylvania will is proved — and the inheritance tax that follows",
      body: [
        "Pennsylvania wills are proved before the Register of Wills of the county where the decedent had their principal residence at death (20 Pa.C.S. § 3131). The Register admits the will and issues letters; contested matters and the administration of the estate are handled by the Orphans' Court division of that county's Court of Common Pleas. This is the office that applies the signature-at-the-end and two-witness-proof rules, which is exactly why those formalities carry so much weight.",
        "Pennsylvania also imposes an inheritance tax that a will cannot write around — and it is charged to the recipients by relationship, not on the estate as a whole: 0% to a surviving spouse (and to a parent inheriting from a child 21 or younger), 4.5% to lineal relatives (children, grandchildren, and parents), 12% to siblings, and 15% to other heirs (72 P.S. § 9116). Property owned jointly between spouses is exempt, and there is a discount for paying within three months of death. Because the rate turns on who inherits, whom you name in your will directly affects how much of the gift survives the tax.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Pennsylvania?",
      answer:
        "No. Notarization is not required for a Pennsylvania will to be valid — a will only needs to be in writing and signed by you at the end (20 Pa.C.S. § 2502). What a notary does is make the will \"self-proved\": if you and your witnesses sign a notarized acknowledgment and affidavit, the will can be admitted to probate without producing the witnesses later (20 Pa.C.S. § 3132.1). The notary adds convenience at probate, not validity to the will.",
    },
    {
      question: "Does a will need to be witnessed in Pennsylvania?",
      answer:
        "Not at the moment of signing. Pennsylvania is unusual in that it does not require witnesses to be present when you sign your will (20 Pa.C.S. § 2502). Witnesses are needed later: to admit the will to probate, two competent witnesses must prove your signature (20 Pa.C.S. § 3132). So while the law doesn't require witnesses at execution, having two people witness the signing — and sign a self-proving affidavit — makes the will far easier to prove after you die.",
    },
    {
      question: "Can I write my own will by hand in Pennsylvania?",
      answer:
        "Yes. Because Pennsylvania requires no witnesses at execution, a will written entirely in your own handwriting and signed at the end is valid — a holographic will (20 Pa.C.S. § 2502). It still has to be proved at probate by two competent witnesses to your handwriting and signature (20 Pa.C.S. § 3132), so a typed and formally witnessed will is easier to admit. But a handwritten, signed-at-the-end will is genuinely valid in Pennsylvania.",
    },
    {
      question: "Can my spouse be left out of a Pennsylvania will?",
      answer:
        "Not entirely. A surviving spouse can elect to take one-third of certain property against the will, no matter what the will says (20 Pa.C.S. § 2203). Pennsylvania is not a community-property state, so this elective share is the main spousal protection, and it reaches beyond the probate estate to certain lifetime transfers and gifts. You cannot fully disinherit a spouse in Pennsylvania without a valid signed waiver (20 Pa.C.S. § 2207).",
    },
    {
      question: "Does Pennsylvania have an inheritance tax on wills?",
      answer:
        "Yes. Pennsylvania is one of the few states with an inheritance tax, and the rate depends on who inherits, not the size of the estate: 0% to a surviving spouse, 4.5% to lineal relatives (children, grandchildren, and parents), 12% to siblings, and 15% to all other heirs (72 P.S. § 9116). There is no exemption threshold, though property owned jointly between spouses is exempt and paying within three months earns a discount. Whom you name in your will directly changes the tax bill your heirs face.",
    },
  ],
  sources: [
    { label: "20 Pa.C.S. Chapter 25 — Wills (full text)", url: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.025..HTM" },
    { label: "20 Pa.C.S. Chapter 22 — Elective share of surviving spouse", url: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.022..HTM" },
    { label: "20 Pa.C.S. Chapter 31 — Register of Wills; probate", url: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.031..HTM" },
    { label: "20 Pa.C.S. § 2502 — Form and execution of a will (signed at the end)", url: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.025.002.000..HTM" },
    { label: "20 Pa.C.S. § 3132.1 — Self-proved wills", url: "https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/20/00.031.032.001..HTM" },
    { label: "72 P.S. § 9116 — Inheritance tax rates", url: "https://codes.findlaw.com/pa/title-72-ps-taxation-and-fiscal-affairs/pa-st-sect-72-9116/" },
    { label: "PA Department of Revenue — Inheritance Tax (rates by relationship)", url: "https://www.pa.gov/en/agencies/revenue/resources/tax-types-and-information/inheritance-tax.html" },
    { label: "Pennsylvania Courts — Registers of Wills (by county)", url: "https://www.pacourts.us/courts/courts-of-common-pleas/registers-of-wills" },
  ],
};

const ILLINOIS: StateDeepDive = {
  seoDescription:
    "Illinois will requirements (2026): two credible witnesses who sign in your presence, no notary needed, and handwritten (holographic) wills are NOT valid. The 755 ILCS 5/4-3 rules, the spouse's right to renounce and take 1/3–1/2, why Illinois has no harmless-error rescue, its electronic-will and remote-witnessing law, and Circuit Court probate — in plain English.",
  intro: [
    "Illinois is a strict-compliance state: its Probate Act of 1975 spells out exactly how a will must be signed and witnessed, and — unlike California — there is no harmless-error rule to rescue a will that was executed incorrectly. A signing that misses a formality is simply not a valid will, no matter how clear your intent.",
    "The statute facts above give you the rules. This section covers where Illinois wills actually go wrong, the one area where Illinois is ahead of most states (electronic wills and remote witnessing), and the spousal protection you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways an Illinois will goes wrong",
    intro:
      "Most Illinois wills that fail, fail on how they were signed — not on what they say. Illinois gives no second chances on execution, so these mistakes are usually fatal.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "Illinois does not recognize holographic (handwritten, unwitnessed) wills at all. Every will must be in writing and \"attested in the presence of the testator by 2 or more credible witnesses\" (755 ILCS 5/4-3). A heartfelt letter in a drawer, however clearly it states your wishes, is not a valid Illinois will. There is no military or mariner exception here either — everyone needs the two witnesses.",
      },
      {
        title: "Using a beneficiary as one of your witnesses",
        body:
          "A gift to someone who also witnesses your will is void as to that person unless the will is otherwise proved by enough other credible witnesses (755 ILCS 5/4-6). The will itself survives — but the interested witness is cut down to what they would have received if the will had never existed (their intestate share), and no more than the value of the gift. Keep your two witnesses neutral parties who inherit nothing.",
      },
      {
        title: "Counting on a notary to make the will valid",
        body:
          "Notarization does not make an Illinois will valid — two credible witnesses do (755 ILCS 5/4-3). A carefully notarized will signed by fewer than two qualifying witnesses is not validly executed. The notary's real job comes later: notarizing the witnesses' affidavit so the will can be admitted to probate without tracking them down (755 ILCS 5/6-4). Get the two witnesses first; the notary supports the affidavit, not the signing.",
      },
      {
        title: "Expecting a court to fix a botched signing",
        body:
          "Illinois has no harmless-error or \"dispensing power\" statute. Where California lets a judge admit a defectively witnessed will on clear-and-convincing proof of intent, Illinois does not. If the 755 ILCS 5/4-3 formalities are missed, the will fails and the estate passes by intestacy. There is no courtroom rescue — which is exactly why the signing has to be done right the first time.",
      },
      {
        title: "Never updating the will after a divorce or new marriage",
        body:
          "A divorce (dissolution of marriage) automatically revokes every gift, interest, and fiduciary appointment to your former spouse — the law treats them as if they died before you (755 ILCS 5/4-7(b)). Marriage after signing does the opposite: it does not revoke the will, so a spouse you married later can be left with nothing on the will's face and must invoke the renunciation right to claim a share. Revisit the will after any marriage, divorce, or new child.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Illinois",
      body: [
        "Illinois is not a community-property state, and it has no New York-style fixed elective share. Instead, a surviving spouse who is left out or shortchanged can renounce the will and take a statutory share against it: one-third of the entire estate if you leave a descendant, or one-half if you leave no descendant (755 ILCS 5/2-8). The renunciation must be filed in writing with the probate court, generally within 7 months after the will is admitted.",
        "On top of that, the surviving spouse is entitled to a spouse's award — a sum for nine months' support that is set at a statutory minimum of $20,000, plus $10,000 for each minor child living with the spouse (755 ILCS 5/15-1). If part of your plan depends on leaving a spouse less than these amounts, build the renunciation share into the plan rather than ignoring it; the court applies that math regardless of what the will says.",
      ],
    },
    {
      heading: "The child you had — or the spouse you married — after signing",
      body: [
        "If a child is born or adopted after you sign your will and you neither provide for them nor show an intent to disinherit them, that child takes the share they would have received if you had died with no will at all, and the other gifts abate proportionately to fund it (755 ILCS 5/4-10). It is an easy omission to make and an expensive one to litigate.",
        "A spouse you marry after signing is protected differently. Marriage does not revoke an Illinois will, and Illinois has no separate \"omitted spouse\" statute — so a later spouse who is left out relies on the renunciation right (755 ILCS 5/2-8) to claim their one-third or one-half. The safe move is the same in both cases: update the will after any marriage, divorce, birth, or adoption.",
      ],
    },
    {
      heading: "Illinois is ahead on electronic wills and remote witnessing",
      body: [
        "Illinois is one of the states that has actually adopted electronic wills. The Electronic Wills, Electronic Estate Planning Documents, and Remote Witnesses Act (755 ILCS 6/) took effect July 26, 2021 and was broadened effective January 1, 2024. An electronic will can be signed with the testator's electronic signature (or by another at their direction) and attested by two or more credible witnesses who sign electronically in the testator's presence (755 ILCS 6/5-5).",
        "Those witnesses can appear remotely. A remote witness attesting over audio-video technology satisfies the \"presence\" requirement if the statutory conditions are met — including that the witnesses are located in the United States at the time and verify the testator's identity, with signature pages assembled within the deadline the Act sets (755 ILCS 6/15-10). This is a genuine differentiator, but it is a formal legal process — not the same as emailing a signed PDF around, which on its own is not a valid will.",
      ],
    },
    {
      heading: "Making an Illinois will self-proving",
      body: [
        "Illinois does not require a notary for a will to be valid, but you should still make the will self-proving so it can be admitted to probate without producing your witnesses years later. A will is proved by the witnesses' statements, which may be a live court appearance, an attestation clause signed by the witness, or an affidavit signed by the witness at or after the time of attestation and attached to the will (755 ILCS 5/6-4).",
        "The affidavit route is where the notary earns its place: the witnesses swear the affidavit before a notary, and the will can then be admitted without live testimony. Execute that affidavit the same day you sign the will — it is far harder to arrange after the fact, and without it the court may have to locate your witnesses to testify in person.",
      ],
    },
    {
      heading: "Where an Illinois will is proved: the Circuit Court",
      body: [
        "Illinois has no separate probate court. Wills are admitted to probate in the Circuit Court of the county where the decedent had a known place of residence at death (755 ILCS 5/5-1); in Cook County that work is handled by the Circuit Court's Probate Division. If the decedent lived outside Illinois but owned property here, venue falls to the county holding the bulk of the real or personal estate.",
        "This is the court that decides whether your will was validly executed — which is exactly why the two-witness formalities and the self-proving affidavit carry so much weight. A clean signing, with a 755 ILCS 5/6-4 affidavit attached, is what keeps an Illinois probate uncontested and moving.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Illinois?",
      answer:
        "No. An Illinois will is valid when you sign it (or direct someone to sign in your presence) and two or more credible witnesses attest it in your presence (755 ILCS 5/4-3). Notarization is not required for validity. A notary matters only for the optional self-proving affidavit your witnesses can swear, which lets the will be admitted to probate without their live testimony (755 ILCS 5/6-4). Notarizing the will itself adds nothing and never replaces the two witnesses.",
    },
    {
      question: "Can I write my own will by hand in Illinois?",
      answer:
        "Not validly, unless it is witnessed. Illinois does not recognize holographic (handwritten, unwitnessed) wills — every will must be in writing and attested by two or more credible witnesses in your presence (755 ILCS 5/4-3). You can absolutely write your own will, but two qualifying witnesses must sign it. A handwritten note with no witnesses is not a valid Illinois will, and there is no harmless-error rule to save it.",
    },
    {
      question: "How many witnesses does a will need in Illinois?",
      answer:
        "Two. An Illinois will must be attested in the testator's presence by two or more credible witnesses, each of whom signs in your presence (755 ILCS 5/4-3). Those witnesses should be disinterested — people who inherit nothing under the will — because a gift to a witness is void as to that witness unless the will is otherwise proved by enough other credible witnesses (755 ILCS 5/4-6).",
    },
    {
      question: "Can my spouse be left out of an Illinois will?",
      answer:
        "Not entirely. Illinois is not a community-property state and has no fixed elective share, but a surviving spouse can renounce the will and take one-third of the estate if you leave a descendant, or one-half if you leave no descendant (755 ILCS 5/2-8). The spouse is also entitled to a support award with a $20,000 statutory minimum, plus $10,000 per minor child (755 ILCS 5/15-1). You cannot write around these without a valid waiver.",
    },
    {
      question: "Can I sign my will electronically in Illinois?",
      answer:
        "Yes — Illinois is one of the states that allows it. Under the Electronic Wills, Electronic Estate Planning Documents, and Remote Witnesses Act (755 ILCS 6/, effective July 26, 2021 and expanded January 1, 2024), a will can be signed with an electronic signature and attested by two credible witnesses who sign electronically, and those witnesses may appear remotely over audio-video technology if the statutory conditions are met (755 ILCS 6/5-5; 755 ILCS 6/15-10). It is a formal legal process, though — simply emailing a signed PDF is not a valid will.",
    },
  ],
  sources: [
    { label: "755 ILCS 5/4-1 — Capacity of testator (age 18, sound mind)", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K4-1.htm" },
    { label: "755 ILCS 5/4-3 — Signing and attestation of wills", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K4-3.htm" },
    { label: "755 ILCS 5/4-6 — Interested witness", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K4-6.htm" },
    { label: "755 ILCS 5/4-7 — Revocation and effect of dissolution of marriage", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K4-7.htm" },
    { label: "755 ILCS 5/4-10 — Child born after will (after-born child's share)", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K4-10.htm" },
    { label: "755 ILCS 5/2-8 — Renunciation of will by spouse (1/3 or 1/2 share)", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K2-8.htm" },
    { label: "755 ILCS 5/15-1 — Surviving spouse's award", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K15-1.htm" },
    { label: "755 ILCS 5/6-4 — Proof of will by attestation clause or affidavit", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K6-4.htm" },
    { label: "755 ILCS 5/5-1 — Place of probate (Circuit Court, county of residence)", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500050K5-1.htm" },
    { label: "755 ILCS 6/5-5 — Execution of an electronic will", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500060K5-5.htm" },
    { label: "755 ILCS 6/15-10 — Remote attestation for a will (audio-video)", url: "https://www.ilga.gov/documents/legislation/ilcs/documents/075500060K15-10.htm" },
    { label: "Illinois Legal Aid Online — Wills for estate planning (FAQ)", url: "https://www.illinoislegalaid.org/legal-information/wills-estate-planning" },
    { label: "Illinois Courts — Self-Help", url: "https://www.illinoiscourts.gov/self-help/" },
  ],
};

const OHIO: StateDeepDive = {
  seoDescription:
    "Ohio will requirements (2026): two competent witnesses, NO holographic (handwritten unwitnessed) wills, and no self-proving affidavit — so witnesses must still be locatable. The strict ORC § 2107.03 execution rules, why notarizing does nothing, the spousal election to take against the will (one-third to one-half), the $40,000 support allowance and mansion-house right, and county Probate Court — in plain English.",
  intro: [
    "Ohio is a strict-compliance state: its Probate Courts enforce the execution formalities in Ohio Revised Code § 2107.03 to the letter, and Ohio has no \"harmless error\" or dispensing statute that lets a judge rescue a will that was signed or witnessed incorrectly. A will that would survive in a more forgiving state can be refused here over a single defect.",
    "The statute facts above give you the rules. This section covers where Ohio wills actually go wrong — no handwritten-and-unwitnessed wills, no self-proving shortcut, a beneficiary-witness who voids their own gift — and the protections built into Ohio law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways an Ohio will gets thrown out",
    intro:
      "Most invalid Ohio wills fail on how they were signed and witnessed, not on what they say. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "Ohio lets a will be handwritten instead of typed, but it still must be attested and subscribed by two or more competent witnesses (ORC § 2107.03). Ohio does not recognize holographic wills — a handwritten, signed page with no witnesses is not a valid Ohio will. A heartfelt letter in a drawer, however clear, does nothing.",
      },
      {
        title: "Signing anywhere but the end of the document",
        body:
          "ORC § 2107.03 requires the will to be \"signed at the end by the testator.\" Signing in the margin, on an early page, or above later dispositive text invites a challenge to whether the document was properly executed. Sign last, and sign at the very bottom.",
      },
      {
        title: "Using a beneficiary as one of only two witnesses",
        body:
          "If a gift goes to a person who is one of only two witnesses, that gift is void (ORC § 2107.15). The will itself survives, and the witness can still take what they would have inherited without a will — but never more than the value of the voided gift. The fix is simple: use witnesses who inherit nothing, or add a third disinterested witness so the gift is not voided.",
      },
      {
        title: "Relying on a notary to make the will \"self-proving\"",
        body:
          "Ohio has no self-proving affidavit statute. Notarizing your will does not let your witnesses skip proving it after you die — Ohio still proves a will through the testimony of the attesting witnesses (ORC § 2107.18). A notary stamp adds nothing to validity and cannot stand in for a witness. Keep a record of who your witnesses are and how to reach them.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Ohio has not adopted electronic wills. ORC § 2107.03 requires a written will witnessed in the testator's \"conscious presence,\" which the statute expressly defines to exclude anything \"sensed by telephonic, electronic, or other distant communication.\" A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not valid in Ohio.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Ohio",
      body: [
        "Ohio is not a community-property state, but a surviving spouse who is left out or left too little can elect to take against the will (ORC § 2106.01). Instead of what the will provides, the spouse takes an intestate share under ORC § 2105.06 — not to exceed one-half of the net estate when there are fewer than two of the decedent's children surviving, and not to exceed one-third when two or more survive.",
        "The election is not the only protection. The spouse is entitled to a $40,000 allowance for support (ORC § 2106.13) and may elect to take the decedent's entire interest in the mansion house — the family home — as part of that share (ORC § 2106.10). If your plan depends on leaving a spouse less than these amounts, build them into the plan; the Probate Court applies this math regardless of what the will says.",
      ],
    },
    {
      heading: "Ohio has no self-proving affidavit — witnesses still get proved",
      body: [
        "Many states let you notarize a will with a self-proving affidavit so the witnesses never have to be found again. Ohio does not. There is no self-proving affidavit statute in Ohio, so when a will is offered for probate the court looks to the document and, where required, the testimony of the attesting witnesses to confirm it was executed under ORC § 2107.03 (see ORC § 2107.18).",
        "The practical consequence is that your witnesses matter for years after signing. If they cannot be located or have died, proving the will becomes harder and slower. Choose witnesses who are younger than you, disinterested, and easy to track down, and keep a note of their contact information with your estate records.",
      ],
    },
    {
      heading: "Strict compliance: no harmless-error rescue in Ohio",
      body: [
        "Ohio requires strict compliance with its execution statute and has not enacted a harmless-error or dispensing power. Where a state like California can admit a defectively witnessed will on clear-and-convincing proof of intent, an Ohio Probate Court generally cannot — if the two-witness, signed-at-the-end, conscious-presence requirements of ORC § 2107.03 are not met, the will fails.",
        "Ohio's only narrow escape hatch is the oral (nuncupative) will, and it is not a general safety valve. An oral will is valid only for personal property, only if made in the testator's last sickness, only if reduced to writing and subscribed by two competent disinterested witnesses within ten days, and only if offered for probate within three months of death (ORC § 2107.60). For everyone in an ordinary situation, the written-and-witnessed rules are the only route.",
      ],
    },
    {
      heading: "The child you forgot, and the ex-spouse you didn't remove",
      body: [
        "If a child is born after the will (or a child is simply omitted and not provided for), Ohio does not revoke the will — instead the pretermitted child takes a share equal to what they would have received had the testator died intestate with no surviving spouse, funded by proportionate abatement of the other gifts (ORC § 2107.34). This is a floor the law inserts for an overlooked child.",
        "Divorce works automatically the other way. A divorce, dissolution, or annulment revokes every disposition of property to the former spouse and any nomination of them as executor, trustee, or guardian; the property passes as though the ex-spouse had died first (ORC § 2107.33). Those provisions can be revived only by remarrying the same person. Still, the safe move is to redo the will after any marriage, divorce, or new child rather than rely on these defaults.",
      ],
    },
    {
      heading: "Where an Ohio will is proved: county Probate Court",
      body: [
        "Ohio probates wills in the Probate Court of the county where the testator was domiciled — their primary residence — at death (ORC § 2107.11). Every Ohio county has a Probate Court, and it is the court that decides whether your will was validly executed, which is exactly why the § 2107.03 formalities carry so much weight.",
        "Ohio also provides no official statutory fill-in-the-blank will form the way some states do — there is no Ohio equivalent of a state-issued statutory will. A clean, typed will, signed at the end before two disinterested witnesses in your conscious presence, with those witnesses reachable later, is what keeps an Ohio probate uncontested and moving.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Ohio?",
      answer:
        "No. An Ohio will is valid when you sign it at the end and two or more competent witnesses, who saw you sign or heard you acknowledge your signature, also sign in your conscious presence (ORC § 2107.03). Notarization is not required — and because Ohio has no self-proving affidavit statute, a notary stamp does not let your witnesses skip proving the will after you die (ORC § 2107.18). Notarizing adds nothing to an Ohio will's validity and never replaces the two witnesses.",
    },
    {
      question: "Can I write my own will by hand in Ohio?",
      answer:
        "You can handwrite the document, but it still needs two witnesses. Ohio allows a will to be handwritten instead of typed, yet it must be signed at the end and attested by two or more competent witnesses (ORC § 2107.03). Ohio does not recognize holographic wills — a handwritten, signed page with no witnesses is not valid. The one narrow exception is an oral will made in a last illness, which covers only personal property and must be written down and witnessed within ten days (ORC § 2107.60).",
    },
    {
      question: "How many witnesses does a will need in Ohio?",
      answer:
        "Two. Ohio requires a will to be attested and subscribed by two or more competent witnesses, in the testator's conscious presence, who either saw the testator sign or heard the testator acknowledge the signature (ORC § 2107.03). Witnesses must be at least eighteen (ORC § 2107.06) and should be disinterested — if a gift goes to one of only two witnesses, that gift is void (ORC § 2107.15).",
    },
    {
      question: "Can my spouse be left out of an Ohio will?",
      answer:
        "Not entirely. A surviving spouse can elect to take against the will and instead receive an intestate share under ORC § 2105.06 — up to one-half of the net estate when fewer than two children survive, and up to one-third when two or more survive (ORC § 2106.01). Ohio is not a community-property state, but the spouse is also entitled to a $40,000 support allowance (ORC § 2106.13) and may elect to take the mansion house (ORC § 2106.10). You cannot draft around these without a valid waiver.",
    },
    {
      question: "Can I sign my will electronically in Ohio?",
      answer:
        "Not as of 2026. Ohio has not adopted electronic wills, and ORC § 2107.03 requires a written will witnessed in your \"conscious presence\" — a term the statute defines to exclude anything sensed by \"telephonic, electronic, or other distant communication.\" A scanned PDF, an e-signature, or a will \"witnessed\" over video is not valid in Ohio. The valid route is still a physical document signed in wet ink with two witnesses physically present.",
    },
  ],
  sources: [
    { label: "ORC § 2105.06 — Statute of descent and distribution (intestate shares)", url: "https://codes.ohio.gov/ohio-revised-code/section-2105.06" },
    { label: "ORC § 2106.01 — Election by surviving spouse to take under or against the will", url: "https://codes.ohio.gov/ohio-revised-code/section-2106.01" },
    { label: "ORC § 2106.10 — Election to receive the mansion house", url: "https://codes.ohio.gov/ohio-revised-code/section-2106.10" },
    { label: "ORC § 2106.13 — Allowance for support", url: "https://codes.ohio.gov/ohio-revised-code/section-2106.13" },
    { label: "ORC § 2107.02 — Who may make a will", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.02" },
    { label: "ORC § 2107.03 — Method of making a will", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.03" },
    { label: "ORC § 2107.06 — Minimum age to witness a will", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.06" },
    { label: "ORC § 2107.11 — Jurisdiction to probate a will", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.11" },
    { label: "ORC § 2107.15 — Devise or bequest to a witness (interested witness)", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.15" },
    { label: "ORC § 2107.18 — Admission of will to probate", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.18" },
    { label: "ORC § 2107.33 — Revocation of a will; effect of divorce", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.33" },
    { label: "ORC § 2107.34 — Pretermitted / after-born heirs", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.34" },
    { label: "ORC § 2107.60 — Oral (nuncupative) will", url: "https://codes.ohio.gov/ohio-revised-code/section-2107.60" },
    { label: "Ohio Revised Code Chapter 2107 — Wills (index)", url: "https://codes.ohio.gov/ohio-revised-code/chapter-2107" },
  ],
};

const MICHIGAN: StateDeepDive = {
  seoDescription:
    "Michigan will requirements (2026): two witnesses who sign within a reasonable time, notarization NOT required for validity, and handwritten (holographic) wills are valid if dated. The EPIC § 700.2502 rules, Michigan's harmless-error rescue, the self-proving affidavit, the spouse's elective share you can't write around, the fill-in-the-blank statutory will, and Probate Court venue — in plain English.",
  intro: [
    "Michigan is one of the more forgiving states about how a will is made: it recognizes handwritten wills, it does not require a notary for validity, and a court can even rescue a document that was never executed as a will at all if the intent is clear enough. A widely-cited Michigan case even admitted a will typed on a phone through that rule. But that flexibility breeds its own traps — people write an undated \"holographic\" will that fails, or count on the harmless-error rescue as if it were a plan.",
    "The statute facts above give you the rules. This section covers where Michigan wills actually go wrong, and the protections built into Michigan's Estates and Protected Individuals Code (EPIC) that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Michigan will goes wrong",
    intro:
      "Most Michigan wills that fail, fail on how they were made — not on what they say. These are the recurring ones.",
    items: [
      {
        title: "A handwritten will that isn't dated",
        body:
          "Michigan recognizes holographic (handwritten) wills, but only if the document is dated and the testator's signature and material portions are in the testator's own handwriting (MCL 700.2502(2)). The date is a hard requirement, not a nicety — leave it off and the document is not a valid holographic will. If it also has no two witnesses, it is not a valid attested will either. Write the date in your own hand, every time.",
      },
      {
        title: "Treating the harmless-error rule as a plan",
        body:
          "Michigan's harmless-error statute lets a court honor a document that wasn't executed correctly if the proponent proves by clear and convincing evidence that the decedent intended it as a will (MCL 700.2503). It is a genuine safety valve — it is how a Michigan court admitted a will typed on a phone. But it is an expensive courtroom fight argued after you are gone, with no guarantee. Sign a proper witnessed will; don't build your plan on a rescue.",
      },
      {
        title: "Assuming a notary makes the will valid — or self-proving by itself",
        body:
          "Notarization is not required to make a Michigan will valid; two witnesses are what matter (MCL 700.2502(1)). A notary's separate job is to turn a properly witnessed will into a self-proved will, so the witnesses never have to testify later (MCL 700.2504). Notarizing a will that lacks two valid witnesses does not save it. Get the two witnesses first; add the notarized self-proving affidavit second.",
      },
      {
        title: "Witnesses who don't sign within a reasonable time",
        body:
          "Each of your two witnesses must sign within a reasonable time after witnessing either your signing of the will or your acknowledgment of your signature (MCL 700.2502(1)). Mailing the will around to collect signatures long after the fact invites a challenge. The safe move is to get the testator and both witnesses in one room and have everyone sign together.",
      },
      {
        title: "Signing electronically and assuming it counts",
        body:
          "Michigan has not enacted a dedicated electronic-wills statute as of 2026. Electronic documents have been admitted only through the harmless-error rule (MCL 700.2503), after a contested court fight — not because e-signatures are formally valid. A scanned PDF or an e-signed file is not a reliably valid Michigan will. The valid route remains a physical document signed in wet ink before two witnesses.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Michigan",
      body: [
        "Even if your will leaves a surviving spouse nothing, Michigan gives them a right to elect against the will. A spouse who elects takes one-half of the share they would have received had you died intestate, reduced by one-half of the value of property they received from you by other means such as joint accounts or beneficiary designations (MCL 700.2202). Michigan is not a community-property state, so this elective share — not automatic ownership of half the marital estate — is the spouse's core protection.",
        "On top of the elective share, a surviving spouse is entitled to a homestead allowance of $15,000 (MCL 700.2402) and exempt property up to $10,000 (MCL 700.2404), both adjusted for inflation, plus a reasonable family allowance during administration (MCL 700.2403). These come off the top before general devises. If your plan depends on leaving a spouse less than these amounts, build them into the plan — the court applies them regardless of what the will says.",
      ],
    },
    {
      heading: "The spouse or child you forgot: Michigan's omitted-heir rules",
      body: [
        "If you marry after signing your will and never update it, your new spouse is entitled to an intestate share — what they would have received had you died without a will — unless the will was made in contemplation of the marriage, says it survives a later marriage, or you provided for the spouse outside the will intending to substitute for a testamentary gift (MCL 700.2301).",
        "The same idea protects a child born or adopted after the will who is left unprovided for: they generally take what they would have received had you died intestate (MCL 700.2302). Both rules fall away if the omission was clearly intentional or you provided for the person outside the will. The safe move is simple — revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Handwritten wills are valid — but date them and write the key terms yourself",
      body: [
        "A Michigan holographic will needs no witnesses and no notary. What it needs is a date, plus your signature and the material portions — who gets what — in your own handwriting (MCL 700.2502(2)). A printed or store-bought form with the key terms typed in is not a valid holographic will, and without two witnesses it is not a valid attested will either.",
        "The most common way a Michigan handwritten will fails is the missing date. It is a hard statutory requirement here. A handwritten will is a genuine emergency option in Michigan, but a witnessed, typed will is far easier to prove and far harder to attack.",
      ],
    },
    {
      heading: "Interested witnesses don't void the will — and Michigan doesn't purge the gift",
      body: [
        "In many states, a gift to someone who also served as a witness is automatically cut down or voided. Michigan takes the opposite approach: an individual generally competent to be a witness may witness a will, and the signing of a will by an interested witness does not invalidate the will or any provision of it (MCL 700.2505). There is no purging statute that strips the witness-beneficiary's gift.",
        "That is more forgiving than New York or California, but it is not a license to be careless. A beneficiary who serves as a witness still hands a will contestant an argument about undue influence. The cleanest practice is still to use two disinterested witnesses who inherit nothing.",
      ],
    },
    {
      heading: "Michigan gives you a fill-in-the-blank statutory will",
      body: [
        "Michigan is one of a handful of states that publishes a statutory will — a standardized, fill-in-the-blank form written into the code itself (MCL 700.2519). A will executed on that form and otherwise in compliance with it is a valid will, and anyone who prints and distributes the form must reproduce it verbatim, with the notice provisions in 10-point boldface type.",
        "The statutory will lets you name beneficiaries, leave specific cash gifts, give everything else to your spouse or children, and nominate a personal representative and a guardian for minor children — but it is deliberately basic and cannot be customized beyond its blanks. It still must be signed and witnessed by two people like any other attested will. For a simple estate it is a legitimate option; for anything with trusts, blended families, or tax planning, it will not be enough.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Michigan?",
      answer:
        "No. A Michigan will is valid when you sign it and at least two witnesses sign within a reasonable time after witnessing your signing or your acknowledgment of it (MCL 700.2502(1)). Notarization is not required for validity. A notary's separate role is to make the will \"self-proved\" through a self-proving affidavit (MCL 700.2504), so your witnesses never have to testify in probate. Notarizing adds convenience later but never replaces the two witnesses.",
    },
    {
      question: "Are handwritten wills legal in Michigan?",
      answer:
        "Yes. Michigan recognizes holographic (handwritten) wills with no witnesses and no notary, but only if the document is dated and your signature and its material provisions are in your own handwriting (MCL 700.2502(2)). The date is a strict requirement — an undated handwritten will is not a valid holographic will. If you use a printed form with the key terms typed, it is not a valid holographic will and, without two witnesses, not a valid attested will either.",
    },
    {
      question: "How many witnesses does a will need in Michigan?",
      answer:
        "Two. A standard Michigan will must be in writing, signed by you (or by someone else at your direction in your conscious presence), and signed by at least two witnesses, each of whom signs within a reasonable time after witnessing you sign the will or acknowledge your signature (MCL 700.2502(1)). The one exception is a holographic will, which needs no witnesses if it is dated and handwritten (MCL 700.2502(2)).",
    },
    {
      question: "Can my spouse be left out of a Michigan will?",
      answer:
        "Not entirely. A surviving spouse can elect against the will and take one-half of the share they would have received had you died intestate, reduced by one-half of property they received from you by other means (MCL 700.2202). Michigan is not a community-property state, so this elective share is the spouse's main protection, along with a $15,000 homestead allowance (MCL 700.2402) and exempt property up to $10,000 (MCL 700.2404). A spouse you marry after signing the will can also claim an intestate share (MCL 700.2301).",
    },
    {
      question: "Does Michigan have a statutory will form?",
      answer:
        "Yes. Michigan publishes a fill-in-the-blank statutory will directly in the code (MCL 700.2519). A will executed on that form and otherwise in compliance with it is valid, and printers must reproduce it verbatim with the notice in 10-point boldface type. It lets you make cash gifts, leave the residue to your spouse or children, and name a personal representative and guardian — but it is deliberately basic, cannot be customized beyond its blanks, and still must be signed before two witnesses.",
    },
  ],
  sources: [
    { label: "MCL 700.2501 — Who may make a will; mental capacity", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2501" },
    { label: "MCL 700.2502 — Execution of wills; holographic wills", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2502" },
    { label: "MCL 700.2503 — Writings intended as wills (harmless error)", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2503" },
    { label: "MCL 700.2504 — Self-proved will; acknowledgment before notary", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2504" },
    { label: "MCL 700.2505 — Who may witness; interested witness", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2505" },
    { label: "MCL 700.2202 — Surviving spouse's election against will", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2202" },
    { label: "MCL 700.2301 — Premarital will; share of spouse married after will", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2301" },
    { label: "MCL 700.2302 — Omitted after-born or after-adopted children", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2302" },
    { label: "MCL 700.2402 — Homestead allowance", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2402" },
    { label: "MCL 700.2404 — Exempt property", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2404" },
    { label: "MCL 700.2519 — Michigan statutory will form", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-2519" },
    { label: "MCL 700.3201 — Venue for probate proceedings", url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-700-3201" },
    { label: "Michigan Legal Help — Wills & life planning", url: "https://michiganlegalhelp.org/self-help-tools/wills-and-life-planning" },
  ],
};

const NEW_JERSEY: StateDeepDive = {
  seoDescription:
    "New Jersey will requirements (2026): two witnesses, no notary required, handwritten wills valid, and a broad harmless-error rule that can save a defective — even unsigned — document (N.J.S. 3B:3-3). The spousal elective share, county Surrogate's Court probate, and the inheritance tax that still exists — in plain English.",
  intro: [
    "New Jersey is one of the more forgiving states in the country about how a will is signed. It recognizes handwritten wills, it never requires a notary, and it has a broad \"harmless error\" rule — one so generous that New Jersey courts have admitted documents the person never even signed. A will that would be refused outright in New York can survive in New Jersey.",
    "The statute facts above give you the rules. This section covers where New Jersey wills actually go wrong, the harmless-error safety valve that sets New Jersey apart, and the protections built into New Jersey law that you cannot draft around — plus the one tax most people assume New Jersey repealed but didn't.",
  ],
  pitfalls: {
    heading: "Five ways a New Jersey will gets thrown out",
    intro:
      "New Jersey forgives more signing mistakes than almost any state, so the wills that actually fail here usually fail on a wrong assumption — about what's protected, what's taxed, or what a document has to be. These are the recurring ones.",
    items: [
      {
        title: "Skipping the second witness",
        body:
          "A typed New Jersey will must be signed by two witnesses, each of whom signs within a reasonable time after watching you sign or after you acknowledge your signature (N.J.S. 3B:3-2). The witnesses do not have to be in the room at the same time — but there still have to be two of them. Notarization is not a substitute, and while the harmless-error rule can sometimes rescue a defective will, that is an expensive courtroom fight, not a plan. Get two witnesses.",
      },
      {
        title: "Assuming a notary makes a New Jersey will valid",
        body:
          "Notarization is not required for a New Jersey will, and it does nothing for validity. What a notary is for is the optional self-proving affidavit (N.J.S. 3B:3-4 at signing, or 3B:3-5 later), which lets the will be admitted to probate without producing the witnesses. A notarized will signed by only one witness is not validly executed; a notarized affidavit does not fix a missing witness.",
      },
      {
        title: "A \"holographic\" will that is typed or filled in on a form",
        body:
          "New Jersey recognizes handwritten wills with no witnesses at all — but only if the signature and the material portions of the document are in your own handwriting (N.J.S. 3B:3-2(b)). People buy a printed will form, fill in the blanks by hand, and sign it without witnesses. If the dispositive terms are printed rather than handwritten and there are no two witnesses, it is neither a valid holographic will nor a valid attested one.",
      },
      {
        title: "Assuming New Jersey has no death tax anymore",
        body:
          "New Jersey repealed its estate tax for deaths on or after January 1, 2018 — but it kept its inheritance tax, which still applies. The inheritance tax is charged by the beneficiary's relationship to you, not by the size of the estate. Close family (Class A — spouse, children, grandchildren, parents) is exempt, but leaving money to a sibling, an in-law, a friend, or a more distant relative can trigger tax the beneficiary owes. Plan for who inherits, not just how much.",
      },
      {
        title: "Trying to leave a spouse out entirely",
        body:
          "A surviving spouse who is left too little can elect to take one-third of the \"augmented estate\" against the will (N.J.S. 3B:8-1). You cannot simply write a living-together spouse out of the plan. The election is not available if the couple was living separate and apart, or had ceased to cohabit as spouses, at the time of death — but for an intact marriage, the elective share is a floor you have to plan around.",
      },
    ],
  },
  sections: [
    {
      heading: "New Jersey's signature feature: a broad harmless-error rule",
      body: [
        "This is what sets New Jersey apart. Most states demand strict or near-strict compliance with the signing formalities, and a defect is fatal. New Jersey instead has a broad harmless-error (or \"dispensing power\") rule: a document that was not executed in compliance with the statute can still be treated as a valid will if the proponent establishes by clear and convincing evidence that the decedent intended it to be their will (N.J.S. 3B:3-3).",
        "New Jersey courts have taken this remarkably far — admitting documents that were unsigned, so long as the clear-and-convincing standard for testamentary intent was met. That makes New Jersey one of the most forgiving states in the country for a botched or unfinished will. But do not treat it as a shortcut: it is a fact-intensive, expensive fight argued in court after you are gone, and it turns entirely on proof of your intent. Signing properly in front of two witnesses is still the only route that keeps your estate out of that fight.",
      ],
    },
    {
      heading: "You can't fully disinherit a spouse in New Jersey",
      body: [
        "New Jersey is not a community-property state, but it protects a surviving spouse through an elective share. A spouse who is left too little can elect to take one-third of the \"augmented estate\" — a figure that reaches beyond the probate estate to capture certain transfers — regardless of what the will says (N.J.S. 3B:8-1).",
        "There is an important limit: the elective share is not available if, at the time of death, the couple was living separate and apart in different habitations, or had otherwise ceased to cohabit as spouses. For an intact marriage, though, you cannot write around the one-third share by leaving the spouse out. If part of your plan depends on leaving a spouse less than that, build the elective share into the plan rather than ignoring it.",
      ],
    },
    {
      heading: "The spouse or child you forgot — and the ex-spouse you didn't remove",
      body: [
        "Marriage, a new child, and divorce can all rewrite an old New Jersey will by operation of law. If you marry after signing your will and the will made no provision for your new spouse, that spouse is a \"pretermitted\" spouse and can claim the share they would have received had you died without a will, unless the omission was intentional or you provided for them outside the will (N.J.S. 3B:5-15). A child born or adopted after the will who is left unprovided for is similarly protected (N.J.S. 3B:5-16).",
        "Divorce cuts the other way. A divorce or annulment after you sign automatically revokes every gift, appointment, and fiduciary role in the will that ran to your former spouse — the ex is written out by operation of law (N.J.S. 3B:3-14). None of this is a substitute for redrafting: the safe move is to revisit the will after any marriage, divorce, birth, or adoption.",
      ],
    },
    {
      heading: "Interested witnesses don't cost anyone their inheritance in New Jersey",
      body: [
        "This is another place New Jersey is unusually permissive. In many states, using a beneficiary as one of your witnesses \"purges\" — voids or reduces — the gift to that witness. New Jersey does not purge at all: the signing of a will by an interested witness does not invalidate the will and does not forfeit any part of the gift to that witness (N.J.S. 3B:3-8). The beneficiary-witness keeps the full inheritance, and the will stands.",
        "That is genuinely more forgiving than New York, California, or North Carolina, where a witness who inherits can lose the gift unless enough disinterested witnesses also signed. Even so, the cautious practice is the same everywhere: use two witnesses who inherit nothing. A disinterested witness is one less thing for a disappointed heir to attack, even in a state that would let the gift stand.",
      ],
    },
    {
      heading: "Where a New Jersey will is proved — and the tax that survives it",
      body: [
        "New Jersey probates wills through the county Surrogate's Court, and the case is filed in the county where you were domiciled — your primary residence — at death. There is a built-in waiting period: a will cannot be admitted to probate until 10 days have passed after the death (N.J.S. 3B:3-22). Very small estates can sometimes pass through a simplified process instead of full probate, but the dollar cutoffs for that are modest limits set by statute and have been subject to change, so confirm the current figure before relying on it.",
        "New Jersey's death-tax picture is a two-part story people routinely get wrong. The state estate tax was repealed for deaths on or after January 1, 2018 — but the New Jersey inheritance tax still exists, and it is charged according to the beneficiary's class. Class A (spouse, children, grandchildren, parents) and Class E (qualified charities) are exempt; Class C (siblings and certain in-laws) and Class D (everyone else) are taxable. Because the tax follows who inherits rather than the size of the estate, a modest gift to a friend or a niece can be taxed while a large gift to a child is not.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in New Jersey?",
      answer:
        "No. A New Jersey will is valid when you sign it and two witnesses sign it, each within a reasonable time after witnessing your signature or your acknowledgment of it (N.J.S. 3B:3-2). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit (N.J.S. 3B:3-4 or 3B:3-5), which lets the will be admitted to probate without producing the witnesses. Notarizing adds nothing to whether the will is legally valid, and it never replaces the two witnesses.",
    },
    {
      question: "Are handwritten wills legal in New Jersey?",
      answer:
        "Yes. New Jersey recognizes holographic (handwritten) wills with no witnesses and no notary, as long as your signature and the material portions of the document are in your own handwriting (N.J.S. 3B:3-2(b)). If you use a printed or store-bought form and the key terms are typed, it is not a valid holographic will — and without two witnesses it is not a valid attested will either. Oral (nuncupative) wills are not recognized in New Jersey.",
    },
    {
      question: "Can a defective or unsigned will still be valid in New Jersey?",
      answer:
        "It can. New Jersey has a broad harmless-error rule: a document that doesn't meet the normal signing formalities can still be treated as a will if someone proves by clear and convincing evidence that the decedent intended it to be their will (N.J.S. 3B:3-3). New Jersey courts have gone as far as admitting unsigned documents under this rule. It is a powerful safety valve, but it is an expensive court fight decided after death — not a reason to skip signing properly with two witnesses.",
    },
    {
      question: "Can my spouse be left out of my New Jersey will?",
      answer:
        "Not entirely, in most cases. New Jersey is not a community-property state, but a surviving spouse can elect to take one-third of the \"augmented estate\" against the will (N.J.S. 3B:8-1). The one exception is a couple who were living separate and apart, or had ceased to cohabit as spouses, at the time of death — then the election is not available. For an intact marriage, you cannot disinherit a spouse below the one-third elective share.",
    },
    {
      question: "Did New Jersey get rid of its death tax?",
      answer:
        "Only half of it. New Jersey repealed its estate tax for deaths on or after January 1, 2018, but it kept its inheritance tax, which still applies. The inheritance tax depends on who inherits: close family — spouse, children, grandchildren, parents (Class A) — and qualified charities (Class E) are exempt, while siblings and certain in-laws (Class C) and everyone else (Class D) are taxable. Because it follows the beneficiary's relationship rather than the estate's size, a gift to a friend or distant relative can be taxed even when a larger gift to a child is not.",
    },
  ],
  sources: [
    { label: "N.J.S. 3B:3-1 — Who may make a will", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-1/" },
    { label: "N.J.S. 3B:3-2 — Execution of wills; witnesses; holographic wills", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-2/" },
    { label: "N.J.S. 3B:3-3 — Harmless error; writings intended as wills", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-3/" },
    { label: "N.J.S. 3B:3-8 — Interested witness does not invalidate will or forfeit gift", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-8/" },
    { label: "N.J.S. 3B:3-14 — Revocation of provisions to former spouse by divorce", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-14/" },
    { label: "N.J.S. 3B:5-3 — Intestate share of surviving spouse", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-5-3/" },
    { label: "N.J.S. 3B:8-1 — Elective share of surviving spouse", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-8-1/" },
    { label: "N.J.S. 3B:3-17 — Probate before the Surrogate's Court", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-17/" },
    { label: "N.J.S. 3B:3-22 — Ten-day waiting period before probate", url: "https://law.justia.com/codes/new-jersey/title-3b/section-3b-3-22/" },
    { label: "New Jersey Division of Taxation — Inheritance and Estate Tax", url: "https://www.nj.gov/treasury/taxation/inheritance-estate/inheritance.shtml" },
  ],
};

const INDIANA: StateDeepDive = {
  seoDescription:
    "Indiana will requirements (2026): two witnesses who sign in your presence and each other's, no handwritten (holographic) wills, and Indiana's distinctive childless-second-spouse property trap — explained in plain English.",
  intro: [
    "Indiana is strict about how a will is signed — no handwritten wills, and both witnesses must sign in front of you and in front of each other — but it modernized early on the electronic side, recognizing electronic wills since 2018. What trips people up most is not the signing, though. It's a quiet inheritance rule aimed at second marriages that can hand a childless surviving spouse far less than they expect.",
    "The statute facts above give you the rules. This section covers where Indiana wills actually go wrong, and the protections built into Indiana law — including one that surprises almost every remarried couple — that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways an Indiana will gets thrown out",
    intro:
      "Most Indiana wills that fail, fail on how they were signed — not on what they say. And because Indiana requires strict compliance with its execution statute, a defect is usually fatal. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "Indiana does not recognize handwritten (holographic) wills at all — there is no exception, and two witnesses are always required (IC 29-1-5-3). A heartfelt letter in your own hand, however clear and however clearly signed, is not a valid will in Indiana. The only route for almost everyone is a written will signed before two witnesses.",
      },
      {
        title: "Witnesses who don't sign in front of each other",
        body:
          "Indiana asks for more than a signature from two people. You must signify to them that the document is your will, and both witnesses must sign in the presence of the testator and in the presence of each other (IC 29-1-5-3). Collecting the two signatures separately — one witness today, the other next week — can invalidate the will. Get the testator and both witnesses in one room at one time.",
      },
      {
        title: "Using a beneficiary as one of your witnesses",
        body:
          "A gift to someone who also served as a witness can be purged — void as to that witness — where the will can't be proved without them (IC 29-1-5-2). The will itself survives; the witness's inheritance may not, and even then they take only the lesser of their intestate share or the devise. Keep your witnesses neutral parties who inherit nothing, and the problem never arises.",
      },
      {
        title: "Relying on a notary instead of two witnesses",
        body:
          "Notarization does not make an Indiana will valid — two witnesses do (IC 29-1-5-3). A notary matters only for the optional self-proving clause, which speeds probate but adds nothing to the will's underlying validity (IC 29-1-5-3.1). And because Indiana requires strict compliance with the execution statute — it has not adopted a harmless-error rule — a court cannot rescue a will signed with only one witness by finding you \"intended\" it. Get the two witnesses; the notary is optional.",
      },
      {
        title: "Signing an electronic will without an attorney",
        body:
          "Indiana does recognize electronic wills (IC 29-1-21). But an electronic will executed without attorney supervision is voidable at the court's discretion — meaning a judge can refuse to admit it. If you go the electronic route, do it under an attorney's supervision. For most people, a wet-ink will signed before two witnesses is still the safer path.",
      },
    ],
  },
  sections: [
    {
      heading: "Indiana's spouse protection — and the childless-second-spouse trap",
      body: [
        "Indiana is not a community-property state; it protects a surviving spouse through an elective share. A spouse who is left too little can elect to take against the will and claim one-half of the net personal and real estate (IC 29-1-3-1). You cannot write around this by leaving the spouse out — if part of your plan depends on leaving a spouse less than that share, build the elective share into the plan rather than ignoring it.",
        "But Indiana carves out a distinctive and much smaller share for one situation, and it catches remarried couples off guard. Where the decedent left children from a prior relationship and the surviving spouse is a childless second (or subsequent) spouse, that spouse's elective share drops to one-third of the net personal estate plus only 25% of the fair market value of the real property, less any liens (IC 29-1-3-1). The same 25%-of-real-property cap appears in Indiana's intestacy rules for a childless second spouse in that situation (IC 29-1-2-1). If you are remarried with children from an earlier relationship, this is the single most important Indiana rule to plan around.",
      ],
    },
    {
      heading: "The child you forgot, and the ex-spouse you didn't remove",
      body: [
        "A child born or adopted after you sign your will, and left unprovided for, takes the share they would have received had you died without a will — unless the omission was intentional (IC 29-1-3-8). Indiana has no separate pretermitted-spouse statute: a spouse you marry after signing the will is protected instead through the elective share, not a stand-alone omitted-spouse claim.",
        "Divorce cuts the other way, and it happens automatically. A dissolution of your marriage after you sign revokes the gifts your will made to your former spouse (IC 29-1-5-8) — the ex is written out by operation of law. None of this is a substitute for redrafting: the safe move is to revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "No handwritten wills — and only a razor-thin oral exception",
      body: [
        "Indiana requires every ordinary will to be in writing and signed before two witnesses (IC 29-1-5-3). It flatly does not recognize handwritten (holographic) wills, with no carve-out — unlike California, Texas, or North Carolina, a will written entirely in your own hand but unwitnessed has no legal effect in Indiana.",
        "There is one narrow exception, and it is a genuine deathbed rule. A nuncupative (oral) will is valid only if you were in imminent peril of death and actually died from it, declared it before two disinterested witnesses, had it reduced to writing within 30 days, and had it offered for probate within six months (IC 29-1-5-4). Even then it can pass personal property only, capped at $1,000 — raised to $10,000 for a member of the armed forces in wartime. It is an emergency last resort, not a will-drafting shortcut. Note too that Indiana lets someone under 18 make a will only if they are in the armed forces or merchant marine (IC 29-1-5-1); everyone else must be at least 18 and of sound mind.",
      ],
    },
    {
      heading: "The beneficiary-witness trap: the will stands, the gift is purged",
      body: [
        "Using someone who inherits under the will as one of your witnesses is a classic Indiana mistake, but it works differently than people fear. It does not void the will. Instead, the gift to that attesting witness is purged — void only as to that witness, and only where the will cannot be proved without their testimony (IC 29-1-5-2). Even then, the witness is not simply cut out: they still take the lesser of their intestate share or the devise.",
        "One point of relief: serving as your will's executor, trustee, or counsel does not make a witness \"interested\" for this purpose (IC 29-1-5-2). Naming your lawyer as executor and having them witness the will is fine. The clean fix is still simpler than the exceptions — use two witnesses who take nothing under the will, and no gift is ever at risk.",
      ],
    },
    {
      heading: "Strict compliance, the self-proving affidavit, and electronic wills",
      body: [
        "Indiana requires strict compliance with its execution statute. Some states let a judge admit a will that was signed incorrectly if the intent is clear by clear and convincing evidence; Indiana has not adopted that harmless-error rule, so a defective will cannot be saved on proof of intent (IC 29-1-5-3). The formalities — a writing, your signature (or a proxy's at your direction and in your presence), and two witnesses who sign in your presence and each other's — are the whole ballgame.",
        "You make probate far smoother by having the will self-proved. Indiana allows a self-proving clause, sworn before a notary, either at the time of execution or added later (IC 29-1-5-3.1); it lets the will be admitted without tracking down the witnesses to testify. Notarization is never required for the will to be valid — its only job is to make the will self-proving. Indiana has also recognized electronic wills since 2018 (IC 29-1-21), and remote witnessing by real-time audiovisual technology is permitted; but an electronic will executed without attorney supervision is voidable at the court's discretion, so supervision matters if you sign electronically.",
      ],
    },
    {
      heading: "Where an Indiana will is proved — plus small estates and no death tax",
      body: [
        "Indiana probates wills in the circuit court — or the superior or probate court — of the county where the decedent was domiciled, meaning their primary residence, at death (IC 29-1-7-1). This is the court that decides whether your will was validly executed, which is exactly why the two-witness formalities carry so much weight.",
        "Not every estate needs full probate. Indiana lets successors collect a modest estate by small-estate affidavit when the estate falls under the statutory threshold — $100,000, raised from $50,000 effective July 1, 2022 (IC 29-1-8-1). And there is no death tax to plan around: Indiana repealed its inheritance tax for deaths after December 31, 2012, and has had no estate tax for deaths after December 31, 2004.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Indiana?",
      answer:
        "No. An Indiana will is valid when you sign it and two witnesses sign in your presence and in each other's presence, after you signify that the document is your will (IC 29-1-5-3). Notarization is not required for validity. A notary is used only for the optional self-proving clause (IC 29-1-5-3.1), which lets the will be admitted to probate without producing the witnesses — but that clause speeds probate and adds nothing to whether the will is legally valid. The two witnesses are what matter.",
    },
    {
      question: "Can I write my own will by hand in Indiana?",
      answer:
        "You can write it by hand, but it is not valid unless two witnesses also sign it in your presence and in each other's presence (IC 29-1-5-3). Indiana does not recognize holographic wills — a handwritten, unwitnessed will has no legal effect here, unlike in California or Texas. The only exception is a narrow deathbed oral (nuncupative) will, valid solely for limited personal property when you are in imminent peril of death (IC 29-1-5-4). Handwriting the document is fine; skipping the two witnesses is fatal.",
    },
    {
      question: "Can my spouse be left out of an Indiana will?",
      answer:
        "Not entirely. Indiana is not a community-property state, but a surviving spouse can elect to take against the will and claim one-half of the net personal and real estate (IC 29-1-3-1). One major exception surprises remarried couples: if you left children from a prior relationship and your surviving spouse is a childless second (or later) spouse, that spouse's elective share is only one-third of the net personal estate plus 25% of the fair market value of the real property (IC 29-1-3-1). You cannot disinherit a spouse below these shares without a valid waiver.",
    },
    {
      question: "Can I sign my will electronically in Indiana?",
      answer:
        "Yes — Indiana has recognized electronic wills since 2018 (IC 29-1-21), and remote witnessing by real-time audiovisual technology is permitted. But there is an important catch: an electronic will executed without attorney supervision is voidable at the court's discretion, meaning a judge can refuse to admit it. If you sign electronically, do it under an attorney's supervision. For most people, a wet-ink will signed before two witnesses remains the safer route.",
    },
    {
      question: "Where is a will probated in Indiana, and is there a small-estate option?",
      answer:
        "An Indiana will is probated in the circuit court — or the superior or probate court — of the county where the person was domiciled at death (IC 29-1-7-1). Smaller estates can skip full probate: successors may use a small-estate affidavit when the estate is under $100,000, a threshold raised from $50,000 effective July 1, 2022 (IC 29-1-8-1). Indiana also has no inheritance or estate tax to worry about.",
    },
  ],
  sources: [
    { label: "IC 29-1-5-1 — Who may make a will", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-5-1/" },
    { label: "IC 29-1-5-2 — Interested (attesting) witness", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-5-2/" },
    { label: "IC 29-1-5-3 — Execution and attestation of wills", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-5-3/" },
    { label: "IC 29-1-5-4 — Nuncupative (oral) wills", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-5-4/" },
    { label: "IC 29-1-2-1 — Intestate succession", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-2-1/" },
    { label: "IC 29-1-3-1 — Right of election by surviving spouse", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-3-1/" },
    { label: "IC 29-1-3-8 — Omitted (after-born or adopted) child", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-3-8/" },
    { label: "IC 29-1-8-1 — Small-estate affidavit", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-8-1/" },
    { label: "IC 29-1-21 — Electronic wills", url: "https://codes.findlaw.com/in/title-29-probate/in-code-sect-29-1-21-3/" },
    { label: "Indiana DOR — Inheritance tax information", url: "https://www.in.gov/dor/tax-forms/individual/inheritance-tax-information/" },
  ],
};

const VIRGINIA: StateDeepDive = {
  seoDescription:
    "Virginia will requirements (2026): two witnesses present at the same time, no notary required, and handwritten (holographic) wills valid. The Va. Code § 64.2-403 rules, the harmless-error \"writings intended as wills\" safety valve, the sliding-scale elective share, no estate or inheritance tax, and Circuit Court probate — in plain English.",
  intro: [
    "Virginia is more forgiving than most strict states, and more careful than most loose ones. It recognizes handwritten wills, it doesn't require a notary, it disqualifies no one for being a beneficiary-witness, and since 2007 a court can even rescue a document that wasn't executed correctly. But each of those flexibilities has an edge people cut themselves on — a \"holographic\" will that isn't entirely in their hand, or a harmless-error rule that can't fix a missing signature.",
    "The statute facts above give you the rules. This section covers where Virginia wills actually go wrong, the safety valve that can save a botched one, and the protections built into Virginia law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Virginia will gets thrown out",
    intro:
      "Most Virginia wills that fail, fail on how they were signed — not on what they say. These are the recurring ones.",
    items: [
      {
        title: "Only one witness — or witnesses who signed at different times",
        body:
          "A Virginia will (that isn't wholly handwritten) needs two competent witnesses who are present at the same time and who either watch you sign or hear you acknowledge your signature, then sign in your presence (Va. Code § 64.2-403(C)). Collecting the two signatures separately, or on different days, breaks the \"same time\" requirement. Get the testator and both witnesses in one room at one time.",
      },
      {
        title: "A \"holographic\" will that isn't entirely in your handwriting",
        body:
          "Virginia recognizes handwritten wills, but only if the will is wholly in your own handwriting and signed by you (Va. Code § 64.2-403(B)). People fill in a typed or store-bought form in their own hand and assume it counts. If material words are printed rather than handwritten, and there are no two witnesses, it is neither a valid holographic will nor a valid attested one — and a holographic will still has to be proved later by two disinterested people who can identify your handwriting.",
      },
      {
        title: "Assuming a spoken wish counts as a will",
        body:
          "Virginia does not recognize nuncupative (oral) wills. The old carve-out for soldiers and sailors was eliminated in the 2007 recodification, so § 64.2-403 now requires a writing in every case. A deathbed instruction to family, however clear and however many people heard it, is not a valid will in Virginia.",
      },
      {
        title: "Leaning on the harmless-error rule to fix a missing signature",
        body:
          "Virginia's \"writings intended as wills\" statute lets a court treat a non-compliant document as a will if it's proved by clear and convincing evidence that you intended it as your will (Va. Code § 64.2-404). But it cannot excuse your missing signature — except in two narrow cases (spouses who accidentally sign each other's wills, or a testator who signs the self-proving certificate instead of the will). And the clock is short: the proceeding to establish such a writing as a will must be filed within one year of the decedent's death (Va. Code § 64.2-404). Treat harmless error as an expensive courtroom rescue, not a shortcut. Sign the will yourself.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Virginia has not authorized electronic wills — it has not adopted the Uniform Electronic Wills Act, and its Uniform Electronic Estate Planning Documents Act expressly excludes wills. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid Virginia will. The valid route is still a paper document signed in wet ink with two witnesses physically present (Va. Code § 64.2-403).",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Virginia",
      body: [
        "Virginia is not a community-property state, but it still protects a surviving spouse through an elective share. A spouse who is left too little can claim 50% of the value of the \"marital-property portion\" of the augmented estate (Va. Code §§ 64.2-308.3, 64.2-308.4). The augmented estate is a broad pool designed to capture assets that pass outside the will, so this is not something you can defeat simply by leaving the spouse out of the document.",
        "The one moving part is the marital-property portion itself, which is set by a sliding scale that rises with the length of the marriage — a short marriage exposes a small fraction of the estate to the claim, a long one a much larger fraction, with the flat 50% multiplier applied on top. If part of your plan depends on leaving a spouse less than the statutory share, build the elective share into the plan rather than ignoring it; the court applies its own math regardless of what the will says.",
      ],
    },
    {
      heading: "The spouse or child you forgot — and the ex-spouse you didn't remove",
      body: [
        "If you marry after signing your will and never update it, your new spouse is an \"omitted spouse\" and can claim the share they would have received had you died with no will at all — unless the will shows the omission was intentional or you provided for the spouse outside the will (Va. Code § 64.2-422). A child born or adopted after the will is signed is likewise protected and takes an intestate share (Va. Code § 64.2-419).",
        "One gap surprises people: Virginia has no general pretermitted-child protection for a child merely left out. The after-born and after-adopted rule protects only children who arrived after the will — a living child you simply omit has no automatic statutory claim. Divorce cuts the other way and works automatically: a final divorce or annulment revokes any gift to the former spouse, who is treated as having predeceased you (Va. Code § 64.2-412). The safe move is the same in every case — revisit the will after any marriage, divorce, birth, or adoption.",
      ],
    },
    {
      heading: "Handwritten wills are valid — but the whole will has to be in your hand",
      body: [
        "A Virginia holographic will needs no witnesses at the time you sign it. What it needs is to be wholly in your own handwriting and signed by you (Va. Code § 64.2-403(B)). A typed or printed form with handwritten blanks does not qualify; the will itself must be handwritten from start to finish.",
        "There is a catch at the other end. A holographic will has to be proved after death by at least two disinterested witnesses who can identify your handwriting — and \"disinterested\" here matters, even though Virginia otherwise lets beneficiaries witness a will. A handwritten will is a genuine emergency option in Virginia, but a typed will signed in front of two witnesses is far easier to prove and far harder to attack.",
      ],
    },
    {
      heading: "Virginia's friendly rules: no purging statute, and a self-proving affidavit",
      body: [
        "Virginia does something many strict states don't: it lets a beneficiary serve as a witness with no penalty at all. There is no \"purging\" statute — a witness's interest in the will does not disqualify the witness, void the gift, or void the will (Va. Code § 64.2-405). (The exception is a holographic will, where the two witnesses proving your handwriting must be disinterested.) That said, using neutral witnesses is still the cleaner practice and avoids handing a will-contest lawyer an argument.",
        "Virginia also offers a true self-proving affidavit. You and your two witnesses can swear before a notary — either when you sign the will or at any later time — that the will was properly executed (Va. Code §§ 64.2-452, 64.2-453). A self-proved will can be admitted to probate without tracking your witnesses down to testify years later. Execute the affidavit the same day you sign; it is far harder to arrange after the fact.",
      ],
    },
    {
      heading: "Where a Virginia will is proved — and why there's no death tax to plan around",
      body: [
        "Virginia probates wills in the Circuit Court, or before its clerk, of the locality where you were domiciled — your primary residence — at death (Va. Code § 64.2-443). This is the court that decides whether your will was validly executed, which is exactly why the two-witness formalities carry so much weight; a self-proving affidavit is what keeps that probate uncontested and quick. For small estates, Virginia also provides a simplified transfer procedure that lets modest estates skip full administration — a practical shortcut worth asking the clerk about.",
        "On taxes, Virginia is simple: there is no state estate tax (it was repealed for deaths on or after July 1, 2007) and no inheritance tax. Your estate plan does not need to solve for a Virginia death tax — only the federal estate tax, which affects very large estates. That keeps most Virginia planning focused on getting the will executed correctly, not on tax engineering.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Virginia?",
      answer:
        "No. A Virginia will is valid when you sign it and two competent witnesses, present at the same time, sign it after watching you sign or hearing you acknowledge your signature (Va. Code § 64.2-403). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit (Va. Code § 64.2-452), which lets the will be admitted to probate without producing the witnesses later — it speeds probate but adds nothing to whether the will is legally valid.",
    },
    {
      question: "Can I write my own will by hand in Virginia?",
      answer:
        "Yes. Virginia recognizes holographic (handwritten) wills with no witnesses at signing, as long as the will is wholly in your own handwriting and signed by you (Va. Code § 64.2-403(B)). If you use a typed or printed form and only fill in the blanks, it is not a valid holographic will — and without two witnesses it is not a valid attested will either. A handwritten will must also be proved after death by two disinterested people who can identify your handwriting.",
    },
    {
      question: "Can a beneficiary be a witness to my Virginia will?",
      answer:
        "Yes, for an ordinary witnessed will. Virginia has no purging statute, so a witness who also inherits does not lose the gift and does not invalidate the will (Va. Code § 64.2-405) — unlike New York or California, where a beneficiary-witness can lose the gift. Using neutral witnesses who inherit nothing is still the cleaner practice. The one exception is a handwritten will, where the two witnesses who prove your handwriting must be disinterested.",
    },
    {
      question: "Can my spouse be left out of my Virginia will?",
      answer:
        "Not entirely. Virginia is not a community-property state, but a surviving spouse can claim an elective share — 50% of the value of the marital-property portion of your augmented estate (Va. Code § 64.2-308.3). The marital-property portion is set by a sliding scale that rises with the length of the marriage, so a longer marriage exposes more of the estate to the claim. You cannot fully disinherit a spouse in Virginia without a valid waiver.",
    },
    {
      question: "Does Virginia have an estate or inheritance tax?",
      answer:
        "No. Virginia repealed its estate tax for deaths on or after July 1, 2007, and it has no inheritance tax. Only the federal estate tax can apply, and it affects very large estates. For most people, Virginia estate planning is about executing the will correctly, not about state death taxes.",
    },
  ],
  sources: [
    { label: "Va. Code § 64.2-401 — Who may make a will; capacity", url: "https://law.lis.virginia.gov/vacode/64.2-401/" },
    { label: "Va. Code § 64.2-403 — Execution of wills; holographic wills", url: "https://law.lis.virginia.gov/vacode/64.2-403/" },
    { label: "Va. Code § 64.2-404 — Writings intended as wills (harmless error)", url: "https://law.lis.virginia.gov/vacode/64.2-404/" },
    { label: "Va. Code § 64.2-405 — Interested persons as witnesses", url: "https://law.lis.virginia.gov/vacode/64.2-405/" },
    { label: "Va. Code § 64.2-452 — Self-proved wills; affidavits", url: "https://law.lis.virginia.gov/vacode/64.2-452/" },
    { label: "Va. Code § 64.2-200 — Course of descents; intestate share of spouse", url: "https://law.lis.virginia.gov/vacode/64.2-200/" },
    { label: "Va. Code § 64.2-308.3 — Right of surviving spouse to elective share", url: "https://law.lis.virginia.gov/vacode/64.2-308.3/" },
    { label: "Va. Code § 64.2-412 — Revocation of gift to former spouse on divorce", url: "https://law.lis.virginia.gov/vacode/64.2-412/" },
    { label: "Va. Code § 64.2-443 — Jurisdiction and venue for probate (Circuit Court)", url: "https://law.lis.virginia.gov/vacode/64.2-443/" },
    { label: "Virginia Department of Taxation — Estate and Inheritance Taxes", url: "https://www.tax.virginia.gov/estate-and-inheritance-taxes" },
  ],
};

const WASHINGTON: StateDeepDive = {
  seoDescription:
    "Washington will requirements (2026): two competent witnesses, no notary required, and no handwritten (holographic) wills. The strict RCW 11.12.020 rules, why Washington honors your community-property spouse instead of an elective share, the interested-witness purge, remote witnessing since 2022, Superior Court probate, and the state estate tax — in plain English.",
  intro: [
    "Washington is a strict-compliance state with a community-property twist. It refuses to recognize a handwritten will signed in-state without witnesses, and its courts have no general power to forgive a signing that went wrong — but it also protects a married spouse automatically through community property rather than through any elective share you have to claim. And unlike most states, Washington levies its own estate tax, which changes the math for larger estates.",
    "The statute facts above give you the rules. This section covers where Washington wills actually go wrong, the protections built into Washington law that you cannot draft around, and the state-level estate tax almost no one plans for.",
  ],
  pitfalls: {
    heading: "Five ways a Washington will gets thrown out",
    intro:
      "Most Washington wills that fail, fail on how they were signed — not on what they say. And because Washington has no general harmless-error rule, a defect is usually fatal. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "An unwitnessed handwritten (holographic) will made in Washington fails — the state requires two competent witnesses for every will executed here (RCW 11.12.020). A heartfelt letter in your own hand, however clear, is not a valid Washington will. The one narrow exception runs the other way: a will that was valid where it was signed, or where you were domiciled, will still be honored in Washington even if it was handwritten there.",
      },
      {
        title: "Relying on a notary instead of two witnesses",
        body:
          "Notarization does not make a Washington will valid — two competent witnesses do (RCW 11.12.020). A notary matters only for the optional witness affidavit that proves the will after death (RCW 11.20.020); it never substitutes for a witness. A carefully notarized will signed by fewer than two witnesses is not validly executed, and Washington has no harmless-error rule to rescue it.",
      },
      {
        title: "Using a beneficiary as one of your two witnesses",
        body:
          "An interested witness does not void a Washington will. But if there are not two other disinterested witnesses, a gift to a witness triggers a rebuttable presumption of duress or undue influence (RCW 11.12.160). Unless that witness can rebut it, the gift is purged down to what they would have inherited had you died with no will at all. Use two witnesses who inherit nothing.",
      },
      {
        title: "Assuming a spoken wish will stand",
        body:
          "Washington recognizes oral (nuncupative) wills only in a razor-thin set of circumstances: they can pass personal property up to $1,000 (armed-forces members and merchant mariners may dispose of their wages), must be made in the testator's last sickness before two witnesses, be committed to writing, and be offered within six months (RCW 11.12.025). An oral will can never pass real estate. For everyone else, the witnessed-and-signed rules are the only route.",
      },
      {
        title: "Signing a paper will electronically or by video",
        body:
          "Washington does allow electronic wills — but only under its Electronic Wills Act effective January 1, 2022, and only with a qualified custodian and the statute's own formalities (RCW 11.12.400). A scanned PDF of a paper will, a casual e-signature, or a paper will \"witnessed\" over an ad-hoc video call is not automatically a valid electronic will. If you are signing a paper will, use wet ink with two witnesses in your presence or electronic presence.",
      },
    ],
  },
  sections: [
    {
      heading: "Washington protects a spouse through community property, not an elective share",
      body: [
        "Washington is a community-property state, and that is why it has no New York-style elective share. Each spouse already owns one-half of the community property, and you cannot will away your spouse's half — so when you die, your surviving spouse keeps their own half and takes your half of the community property too, ending up with 100% of it (RCW 11.04.015; RCW 11.02.070).",
        "Because that protection is automatic, there is no post-death \"claim one-third against the will.\" A spouse can still claim a basic homestead or family-support award from the estate (RCW 11.54.010), but the core safeguard is the community-property half the decedent never controlled in the first place. If your plan depends on how community versus separate property is divided, sort that out while drafting — the court applies the community-property math regardless of what the will says.",
      ],
    },
    {
      heading: "How Washington splits an estate when there's no will",
      body: [
        "If you die without a will, Washington's community-property rule still governs the community half: your surviving spouse takes all of your one-half of the community property, so they end up owning the whole of it (RCW 11.04.015).",
        "Your separate property is divided differently. A surviving spouse takes one-half of it if you leave descendants (the descendants share the other half); three-quarters if you leave no descendants but a parent or a parent's issue survive; and all of it if none of those relatives survive (RCW 11.04.015). A will is how you change that default division — but you can never redirect your spouse's own community-property half.",
      ],
    },
    {
      heading: "The spouse or child you forgot, and the ex-spouse you didn't remove",
      body: [
        "If you marry after signing your will and the will makes no provision for the new spouse, that omitted spouse takes the share they would have received had you died without a will — unless the omission was intentional (RCW 11.12.095). The same protection runs to a child born or adopted after the will who is left unprovided for: that omitted child takes an intestate-equivalent share unless the omission was intentional (RCW 11.12.091).",
        "Divorce cuts the other way. A dissolution or invalidation of your marriage automatically revokes every provision of your will in favor of the former spouse, as if the ex had predeceased you (RCW 11.12.051) — you don't have to redraft to write them out. The safe move is the same in every case: revisit the will after any marriage, divorce, birth, or adoption.",
      ],
    },
    {
      heading: "Proving a Washington will: Superior Court and the witness affidavit",
      body: [
        "Washington probates wills in the Superior Court, and a probate may be commenced in any county of the state, subject to a motion to change venue to the proper county (RCW 11.96A.050). This is the court that decides whether your will was validly executed, which is exactly why the two-witness formality carries so much weight.",
        "Washington does not use a single embedded \"self-proving affidavit\" the way many states do. Instead, its witnesses can make an affidavit before an authorized officer, and that affidavit is accepted by the court as if the testimony had been taken before it (RCW 11.20.020). Getting that witness affidavit signed keeps the will admissible without hauling the witnesses back years later. If the probate estate's personal property is $100,000 or less, heirs may skip formal probate entirely and collect it with a small-estate affidavit after a 40-day wait (RCW 11.62.010).",
      ],
    },
    {
      heading: "Washington has its own estate tax — and the rate just changed",
      body: [
        "Unlike most states, Washington imposes a state-level estate tax on top of any federal tax (Chapter 83.100 RCW). For deaths on or after July 1, 2025, the applicable exclusion amount is $3,000,000 — well below the federal exemption, so an estate that owes nothing federally can still owe Washington estate tax. There is no separate inheritance tax.",
        "The rate structure recently moved. For deaths between July 1, 2025 and June 30, 2026, the schedule ran up to a temporary top rate of 35%; for deaths on or after July 1, 2026, it reverted under 2026 legislation (ESB 6347) to a graduated schedule topping out at 20%. Because the middle brackets are technical and can lag in the published tables, treat the tax as graduated up to that 20% top rate and confirm the current schedule with the Department of Revenue or an estate attorney before relying on a specific number.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Washington?",
      answer:
        "No. A Washington will is valid when you sign it and two competent witnesses attest it — by subscribing their names or by later signing an affidavit or giving testimony (RCW 11.12.020). Notarization is not required for validity. A notary is used only for the witness affidavit that proves the will after death (RCW 11.20.020), which speeds probate but adds nothing to whether the will is legally valid. The two witnesses are what matter.",
    },
    {
      question: "Can I write my own will by hand in Washington?",
      answer:
        "Not without witnesses. A handwritten (holographic) will signed in Washington with no witnesses is invalid, because the state requires two competent witnesses for every will executed here (RCW 11.12.020). The one exception is a will that was valid where it was signed or where you were domiciled — Washington will honor that even if it was handwritten. Handwriting the document is fine; skipping the two witnesses is fatal.",
    },
    {
      question: "Can my spouse be left out of my Washington will?",
      answer:
        "Not entirely. Washington is a community-property state: your spouse already owns half of what you acquired together during the marriage, and you cannot will away their half (RCW 11.02.070; RCW 11.04.015). There is no New York-style elective share because that community-property half already protects the spouse. A spouse you marry after signing the will can also claim an omitted-spouse share unless the omission was intentional (RCW 11.12.095).",
    },
    {
      question: "Does Washington have an estate tax?",
      answer:
        "Yes. Washington imposes its own estate tax with an applicable exclusion of $3,000,000 for deaths on or after July 1, 2025 — far below the federal exemption, so an estate can owe Washington tax while owing nothing federally (Chapter 83.100 RCW). The top rate is graduated up to 20% for deaths on or after July 1, 2026 (ESB 6347). Washington has no separate inheritance tax. Confirm the current bracket schedule with the Department of Revenue before relying on a specific figure.",
    },
    {
      question: "Can witnesses sign my Washington will remotely?",
      answer:
        "Yes, since 2022. Washington's execution statute lets witnesses act in the testator's \"presence or electronic presence,\" which permits remote audio-video witnessing (RCW 11.12.020, amended effective January 1, 2022). Washington has also adopted an Electronic Wills Act effective January 1, 2022, which requires a qualified custodian and its own formalities (RCW 11.12.400). For an ordinary paper will, wet ink with two witnesses present remains the simplest, safest route.",
    },
  ],
  sources: [
    { label: "RCW 11.12.010 — Who may make a will", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.010" },
    { label: "RCW 11.12.020 — Execution and attestation of wills", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.020" },
    { label: "RCW 11.12.025 — Nuncupative (oral) wills", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.025" },
    { label: "RCW 11.12.051 — Effect of divorce or dissolution", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.051" },
    { label: "RCW 11.12.091 — Omitted child", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.091" },
    { label: "RCW 11.12.095 — Omitted spouse", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.095" },
    { label: "RCW 11.12.160 — Interested witness; rebuttable presumption", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.160" },
    { label: "RCW 11.12.400 — Electronic Wills Act", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.12.400" },
    { label: "RCW 11.20.020 — Proof of will by witness affidavit", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.20.020" },
    { label: "RCW 11.04.015 — Descent and distribution (intestacy)", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.04.015" },
    { label: "RCW 11.02.070 — Community property on death", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.02.070" },
    { label: "RCW 11.54.010 — Basic homestead/family-support award", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.54.010" },
    { label: "RCW 11.62.010 — Small-estate affidavit", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=11.62.010" },
    { label: "RCW 11.96A.050 — Venue for probate proceedings", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=11.96A.050" },
    { label: "Chapter 83.100 RCW — Estate and transfer tax", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=83.100" },
    { label: "ESB 6347 (2026) — Estate-tax rate schedule", url: "https://app.leg.wa.gov/billsummary/?BillNumber=6347&Year=2026" },
  ],
};

const ARIZONA: StateDeepDive = {
  seoDescription:
    "Arizona will requirements (2026): two witnesses, notarization NOT required, and handwritten (holographic) wills fully valid. The A.R.S. § 14-2502 rules, the interested-witness trap on non-self-proved wills, why Arizona has no harmless-error rescue, community-property protection instead of an elective share, the raised small-estate limits, and Superior Court probate — in plain English.",
  intro: [
    "Arizona is flexible in ways that surprise people: it fully recognizes handwritten wills, it never requires a notary to make a will valid, and its Uniform Probate Code framework is meant to admit wills, not defeat them. But it is unforgiving where it counts. Arizona has no harmless-error rule — no judge can rescue a will that missed the signing formalities unless it happens to qualify as a handwritten will — and because Arizona is a community-property state, what you can actually leave a spouse is not what most people assume.",
    "The statute facts above give you the rules. This section covers where Arizona wills actually go wrong, an interested-witness rule that is stricter than the standard Uniform Probate Code, and the protections built into Arizona law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways an Arizona will gets thrown out",
    intro:
      "Most Arizona wills that fail, fail on how they were signed — not on what they say. And unlike a growing number of states, Arizona gives you no general second chance to fix a botched signing. These are the recurring ones.",
    items: [
      {
        title: "Notarizing the will instead of getting two witnesses",
        body:
          "A typed Arizona will must be signed by at least two witnesses, each of whom signed within a reasonable time after witnessing you sign the will or acknowledge your signature (A.R.S. § 14-2502). Notarization is not required and is not a substitute — a carefully notarized will signed by fewer than two qualifying witnesses is simply not executed. And because Arizona has no harmless-error rule, there is no courtroom rescue for it unless the will happens to be entirely in your own handwriting. Get the two witnesses; the notary is optional.",
      },
      {
        title: "Using an interested witness on a will you didn't self-prove",
        body:
          "This is an Arizona-specific trap that is stricter than the standard Uniform Probate Code. Arizona does not purge or void a gift to a witness — but for a will executed on or after October 1, 2019 that is NOT self-proved, an interested person (a devisee, or someone related to a devisee by blood, marriage, or adoption) may not act as a witness, and using one can invalidate the attestation (A.R.S. § 14-2505). A self-proved will (§ 14-2504) is exempt. The clean fix works both ways: use disinterested witnesses, and self-prove the will to neutralize the rule entirely.",
      },
      {
        title: "A \"holographic\" will that is typed or filled in on a form",
        body:
          "Arizona recognizes handwritten wills with no witnesses at all — but only if the signature and the material provisions are in your own handwriting (A.R.S. § 14-2503). People buy a printed will form, fill in the blanks, and sign it without witnesses. Because the material provisions are not in your hand and there are no two witnesses, it is neither a valid holographic will nor a valid attested one.",
      },
      {
        title: "Assuming a spoken wish or deathbed statement counts",
        body:
          "Arizona does not recognize nuncupative (oral) wills at all. Title 14 authorizes only paper wills, handwritten (holographic) wills, and — since 2019 — electronic wills. A spoken instruction to family, however clear and however many people heard it, has no effect as a will in Arizona. Put it in writing and sign it in front of two witnesses.",
      },
      {
        title: "Signing electronically without meeting the e-will rules",
        body:
          "Arizona does recognize electronic wills (A.R.S. § 14-2518, since 2019), but they have their own strict requirements — an electronic record readable as text, and two witnesses who are physically or electronically present (any electronically-present witness must be physically located in the United States). A self-proved electronic will further requires a notary and a qualified custodian (§ 14-2519). A casual e-signed PDF or a will \"witnessed\" over an ordinary video call does not meet these rules. If in doubt, sign a paper original in wet ink with two witnesses physically present.",
      },
    ],
  },
  sections: [
    {
      heading: "Arizona protects a spouse through community property, not an elective share",
      body: [
        "Arizona is a community-property state, and this changes the whole picture. Property a married couple acquires during the marriage is generally community property, and one-half of it already belongs to the surviving spouse by operation of law — the decedent cannot devise that half away. Your will controls your one-half of the community property plus your own separate property; it does not reach your spouse's half.",
        "This is why Arizona has no New York-style elective or forced share: there is no statute letting a spouse \"claim one-third against the will,\" because the spouse is already protected by owning half of the marital estate. There is no elective-share provision anywhere in Title 14. If your plan depends on how community versus separate property is divided, sort that out while drafting — the court applies the community-property math regardless of what the will says.",
      ],
    },
    {
      heading: "The spouse or child you forgot, and the ex-spouse you didn't remove",
      body: [
        "Marriage, a new child, and divorce can all rewrite an Arizona will by operation of law. If you marry after signing your will and never update it, the new spouse is an \"omitted spouse\" and can claim the share they would have received had you died without a will — unless the will was made in contemplation of the marriage, or you provided for the spouse outside the will, or the omission was intentional (A.R.S. § 14-2301). A child born or adopted after the will who is left unprovided for takes an intestate share on the same logic, unless the omission was intentional (§ 14-2302).",
        "Divorce cuts the other way. A final divorce or annulment automatically revokes every gift and every fiduciary appointment in favor of your former spouse, and it severs the right of survivorship in property the two of you held as joint tenants (§ 14-2804) — the ex is written out by operation of law. None of this is a substitute for redrafting: the safe move is to revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "Handwritten wills are valid — but the whole plan has to be in your hand",
      body: [
        "An Arizona holographic will needs no witnesses and no notary. What it needs is that your signature and all of the material provisions — who gets what — are in your own handwriting (A.R.S. § 14-2503). Pre-printed matter can appear on the page, but the dispositive terms cannot be typed or filled into a form. This is the one route that can save a will that failed the ordinary two-witness formalities.",
        "It is a genuine emergency option, not a preference. A handwritten will is far easier to attack than a witnessed, self-proved typed will, and because Arizona has no harmless-error safety valve, the holographic form is the only fallback when a signing goes wrong. Arizona will also let extrinsic evidence show that you intended a document to be your will (§ 14-2502(B)), but that is about proving intent — it is not a power to forgive missing signatures.",
      ],
    },
    {
      heading: "Arizona has no harmless-error rescue",
      body: [
        "A number of states let a judge admit a will that was signed incorrectly if the person offering it proves by clear and convincing evidence that you intended it to be your will. Arizona does not. There is no dispensing-power provision in Title 14, so a will that fails the § 14-2502 formalities has exactly one lifeline: qualifying as a handwritten (holographic) will under § 14-2503. If it is typed and under-witnessed, and not entirely in your hand, no clear-and-convincing showing will save it.",
        "This is exactly why the two-witness rule and the interested-witness trap carry so much weight in Arizona. A missing witness or a disqualified interested witness on a non-self-proved will cannot be argued away after death. Execute cleanly in front of two disinterested witnesses, and — for probate ease and to neutralize the interested-witness rule — add the self-proving affidavit before a notary the same day.",
      ],
    },
    {
      heading: "The self-proving affidavit, small estates, and where an Arizona will is proved",
      body: [
        "Arizona does not require notarization for a will to be valid, but it offers a self-proving affidavit that does real work here. You and both witnesses swear before a notary — either at the same time the will is signed or added later — that the will was properly executed (A.R.S. § 14-2504). A self-proved will can be admitted without tracking your witnesses down to testify, and — uniquely in Arizona — it also exempts the will from the interested-witness disqualification (§ 14-2505). A signature on the self-proving affidavit even counts as a signature on the will itself if one is needed to prove execution.",
        "Arizona probates wills in the Superior Court, in the county where you were domiciled at death (§ 14-3201). Many estates skip formal probate entirely: as of HB2116, effective September 26, 2025, an heir can collect personal property by affidavit when the net estate's personal property is $200,000 or less (usable 30 days after death), and can transfer real property by affidavit when the real property is worth $300,000 or less net of liens (usable 6 months after death) (§ 14-3971) — both limits raised sharply from the old $75,000 and $100,000 figures. And Arizona imposes no state estate tax and no inheritance tax, so what passes under the will is not reduced by a state death tax.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Arizona?",
      answer:
        "No. An Arizona will is valid when you sign it and at least two witnesses sign within a reasonable time after witnessing your signing or your acknowledgment (A.R.S. § 14-2502) — no notary is required. A notary's role is separate: it makes the will \"self-proved\" so it can be admitted to probate without the witnesses testifying, and it also exempts the will from Arizona's interested-witness rule (§ 14-2504; § 14-2505). Notarizing never replaces the two witnesses. A handwritten (holographic) will needs neither witnesses nor a notary (§ 14-2503).",
    },
    {
      question: "Are handwritten wills legal in Arizona?",
      answer:
        "Yes. Arizona recognizes handwritten (holographic) wills with no witnesses and no notary, as long as your signature and all of the material provisions are in your own handwriting (A.R.S. § 14-2503). If you use a printed or store-bought form and the key terms are typed rather than handwritten, it is not a valid holographic will — and without two witnesses it is not a valid witnessed will either. Arizona does not recognize oral (nuncupative) wills at all.",
    },
    {
      question: "Can a beneficiary be a witness to my Arizona will?",
      answer:
        "It is risky unless you self-prove the will. Arizona does not void the gift to a witness the way some states do, but for a will signed on or after October 1, 2019 that is NOT self-proved, an interested person — a devisee, or someone related to a devisee by blood, marriage, or adoption — may not act as a witness, and using one can invalidate the attestation (A.R.S. § 14-2505). A self-proved will (§ 14-2504) is exempt from this rule. The safe practice is to use two disinterested witnesses and self-prove the will.",
    },
    {
      question: "Can my spouse be left out of my Arizona will?",
      answer:
        "Not entirely. Arizona is a community-property state: your spouse already owns half of what you acquired together during the marriage, and your will only controls your half plus your separate property. There is no New York-style elective share to claim against the will, but a spouse you marry after signing the will can claim an \"omitted spouse\" intestate share unless the will was made in contemplation of the marriage or otherwise provided for them (A.R.S. § 14-2301). If all of your descendants are also your spouse's, an intestate estate passes entirely to the spouse (§ 14-2102).",
    },
    {
      question: "Do all Arizona estates have to go through probate?",
      answer:
        "No. Arizona probates wills in the Superior Court of the county where you were domiciled at death (A.R.S. § 14-3201), but many estates avoid formal probate through small-estate affidavits. As of HB2116, effective September 26, 2025, an heir can collect personal property by affidavit when it totals $200,000 or less (30 days after death) and transfer real property by affidavit when it is worth $300,000 or less net of liens (6 months after death) (§ 14-3971). Arizona also has no state estate tax and no inheritance tax.",
    },
  ],
  sources: [
    { label: "A.R.S. § 14-2501 — Who may make a will", url: "https://www.azleg.gov/ars/14/02501.htm" },
    { label: "A.R.S. § 14-2502 — Execution; witnessed wills", url: "https://www.azleg.gov/ars/14/02502.htm" },
    { label: "A.R.S. § 14-2503 — Holographic wills", url: "https://www.azleg.gov/ars/14/02503.htm" },
    { label: "A.R.S. § 14-2504 — Self-proved wills", url: "https://www.azleg.gov/ars/14/02504.htm" },
    { label: "A.R.S. § 14-2505 — Who may witness; interested witness", url: "https://www.azleg.gov/ars/14/02505.htm" },
    { label: "A.R.S. § 14-2102 — Intestate share of surviving spouse", url: "https://www.azleg.gov/ars/14/02102.htm" },
    { label: "A.R.S. § 14-2804 — Revocation of probate and nonprobate transfers by divorce", url: "https://www.azleg.gov/ars/14/02804.htm" },
    { label: "A.R.S. § 14-3971 — Small-estate affidavit collection of property", url: "https://www.azleg.gov/ars/14/03971.htm" },
    { label: "A.R.S. § 14-2518 — Electronic wills", url: "https://www.azleg.gov/ars/14/02518.htm" },
    { label: "A.R.S. § 14-2519 — Self-proved electronic wills", url: "https://www.azleg.gov/ars/14/02519.htm" },
  ],
};

const TENNESSEE: StateDeepDive = {
  seoDescription:
    "Tennessee will requirements (2026): sign before two witnesses who each sign in your presence and each other's, no notary required, and BOTH handwritten and oral wills recognized. The strict T.C.A. § 32-1-104 rules, why Tennessee gives no harmless-error do-over, the sliding-scale spousal elective share, the narrow deathbed oral-will exception, and Chancery Court probate — in plain English.",
  intro: [
    "Tennessee is unusual in one direction and strict in another. It is one of the few states that recognizes both handwritten (holographic) and oral (nuncupative) wills — so a will can be valid with no witnesses at the signing, or even spoken aloud on a deathbed. But when it comes to the ordinary typed-and-witnessed will, Tennessee demands strict compliance: it has never adopted a harmless-error rule, so a signing that misses a formality is simply invalid, no matter how clear your intent was.",
    "The statute facts above give you the rules. This section covers where Tennessee wills actually go wrong, the two backup routes Tennessee keeps that most states don't, and the protections built into Tennessee law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Tennessee will gets thrown out",
    intro:
      "Most Tennessee wills that fail, fail on how they were signed — not on what they say. And because Tennessee requires strict compliance with no harmless-error rescue, a defect is usually fatal. These are the recurring ones.",
    items: [
      {
        title: "Witnesses who don't sign in front of each other and you",
        body:
          "An attested Tennessee will requires two witnesses, and each must sign in the presence of the testator and of each other (T.C.A. § 32-1-104(a)). Collecting witness signatures separately — one this week, one next week, each unaware of the other — breaks the rule. Because Tennessee has no harmless-error safety valve, that defect can't be argued away later. Get the testator and both witnesses in one room at one time.",
      },
      {
        title: "Forgetting to \"signify\" that the document is your will",
        body:
          "Tennessee doesn't require a formal publication speech, but the testator must signify to the witnesses that the instrument is his will (T.C.A. § 32-1-104(a)). A silent signing — where witnesses watch you sign but are never told what they're signing — invites a challenge. Say plainly that it is your will before everyone signs.",
      },
      {
        title: "Using a beneficiary as one of your two witnesses",
        body:
          "An interested witness does not void a Tennessee will, but it costs that witness. Unless the will is also attested by two disinterested witnesses, an interested witness forfeits so much of the gift as exceeds what they would have inherited with no will at all (T.C.A. § 32-1-103). The will survives; the witness's extra inheritance may not. Keep your witnesses neutral parties who take nothing.",
      },
      {
        title: "Assuming a signed self-proving affidavit is the same as signing the will",
        body:
          "It isn't. Tennessee courts require strict compliance, and the Tennessee Supreme Court has held that a testator's signature on the self-proving affidavit does not satisfy the separate requirement to sign the will itself (In re Estate of Chastain, 2012; T.C.A. § 32-1-104). Sign the will, then sign the affidavit — signing only the affidavit can leave you with no valid will at all.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Tennessee has not enacted an electronic wills act, and § 32-1-104 requires witnesses to sign in the physical presence of the testator and each other. The COVID-era remote-notarization allowances were temporary and have expired. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid Tennessee will. Sign a paper original in wet ink with two witnesses physically present.",
      },
    ],
  },
  sections: [
    {
      heading: "Tennessee recognizes both handwritten and oral wills",
      body: [
        "This is Tennessee's distinctive feature. A holographic will needs no witnesses at the signing, but the signature and all the material provisions must be in the testator's own handwriting, and that handwriting must later be proved by two witnesses who can identify it (T.C.A. § 32-1-105). If the dispositive terms are typed or filled in on a printed form, it is neither a valid holographic will nor a valid attested one.",
        "Tennessee also keeps a nuncupative (oral) will — but only in a true emergency. It works only for a testator in imminent peril of death who actually dies from that peril; the words must be declared before two disinterested witnesses, reduced to writing within 30 days, and offered for probate within six months (T.C.A. § 32-1-106). It can pass personal property worth up to $1,000 — up to $10,000 for someone in active military service in wartime — and it cannot change an existing written will. Treat it as a last resort, not a plan.",
      ],
    },
    {
      heading: "You can't fully disinherit a spouse in Tennessee",
      body: [
        "Tennessee is not a community-property state, but it protects a surviving spouse through an elective share that scales with the length of the marriage. A spouse left too little can claim a percentage of the decedent's net estate: 10% for a marriage of less than three years, 20% at three to under six years, 30% at six to under nine years, and 40% at nine years or more (T.C.A. § 31-4-101).",
        "The elective share is reduced by property already passing to the spouse, but homestead, exempt property, and the year's support allowance are not counted against it — the spouse keeps those on top. You cannot write around this by leaving the spouse out of the will. Tennessee does offer an opt-in community-property trust, but that is a deliberate choice, not the default. If part of your plan depends on leaving a spouse less than the statutory share, build the elective share into the plan rather than ignoring it.",
      ],
    },
    {
      heading: "The child you forgot, and the ex-spouse you didn't remove",
      body: [
        "A child born after you sign your will — a pretermitted child — takes the share they would have received had you died without a will, unless the will shows the omission was intentional or you otherwise provided for that child (T.C.A. § 32-3-103). Naming your existing children is not, by itself, enough to cut out a later-born one; the intent to omit has to be clear.",
        "Tennessee has no separate omitted-spouse statute. A spouse you marry after signing the will is protected instead through the elective share, the year's support allowance, and homestead — the same tools that stop a spouse from being disinherited. Divorce cuts the other way: a final divorce or annulment revokes every gift and fiduciary appointment to the former spouse by operation of law (T.C.A. § 32-1-202). None of this is a substitute for redrafting — revisit the will after any marriage, divorce, or new child.",
      ],
    },
    {
      heading: "The self-proving affidavit — a shortcut, not the signature",
      body: [
        "Notarization is never required to make a Tennessee will valid; two witnesses are. What a notary adds is the self-proving affidavit: the testator and witnesses swear before an authorized officer that the will was properly executed, and that sworn affidavit is later accepted as if the witnesses had testified in court (T.C.A. § 32-2-110). A self-proved will can be admitted to probate without tracking the witnesses down years later.",
        "But treat the affidavit as a separate step from signing the will — never a replacement for it. This is the exact trap Tennessee's Supreme Court flagged in Chastain: a testator who signs only the affidavit has not signed the will, and strict compliance means there is no rescuing it. Sign the will first, in front of two witnesses; then, ideally the same day, complete the self-proving affidavit before the notary.",
      ],
    },
    {
      heading: "Where a Tennessee will is proved — and the 2022 small-estate change",
      body: [
        "Tennessee probates wills in the Chancery Court of the county where the decedent was a resident at death — except in the counties that have a dedicated Probate Court, such as Shelby (Memphis) and Davidson (Nashville), where that court handles it (T.C.A. §§ 16-16-201, 32-2-101). This is the court that decides whether your will was validly executed, which is exactly why the two-witness formalities carry so much weight.",
        "Tennessee overhauled its small-estate process in a 2022 rewrite (amended effective April 28, 2023), replacing the old one-page small-estate affidavit. Modest estates — personal property of $50,000 or less, with no real property — are now handled through a petition for limited letters: limited letters of administration if the person died intestate, or limited letters testamentary of a small estate if there is a will, with a muniment-of-title filing available under T.C.A. § 32-2-111 (T.C.A. §§ 30-4-102, 30-4-103). Having a will does not force a full probate — it changes the filing, not the availability of the simplified route. The limited-letters petition is a more formal step than the old affidavit, but it still avoids full administration, and the $50,000 cap and roughly 45-day wait remain. Tennessee also imposes no state inheritance tax (fully phased out for deaths on or after January 1, 2016) and no estate or gift tax.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does a will need to be notarized in Tennessee?",
      answer:
        "No. A Tennessee will is valid when you sign it and two witnesses each sign in your presence and in each other's presence (T.C.A. § 32-1-104). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit, which lets the will be admitted to probate without the witnesses testifying (T.C.A. § 32-2-110). Be careful: signing only the affidavit does not count as signing the will — the two are separate documents.",
    },
    {
      question: "Can I write my own will by hand in Tennessee?",
      answer:
        "Yes. Tennessee recognizes handwritten (holographic) wills with no witnesses at the signing, as long as your signature and all the material provisions are in your own handwriting (T.C.A. § 32-1-105). After death, the handwriting has to be proved by two witnesses who can identify it. If the key terms are typed or filled in on a printed form, it is not a valid holographic will — and without two witnesses it is not a valid attested will either.",
    },
    {
      question: "Does Tennessee recognize oral (deathbed) wills?",
      answer:
        "Yes, but only in a narrow emergency. A nuncupative (oral) will works only for a person in imminent peril of death who then dies from it; the words must be spoken before two disinterested witnesses, written down within 30 days, and offered for probate within six months (T.C.A. § 32-1-106). It can pass personal property worth up to $1,000 — up to $10,000 for someone in active military service in wartime — and it cannot change an existing written will. It is a last resort, not a substitute for a real will.",
    },
    {
      question: "Can my spouse be left out of a Tennessee will?",
      answer:
        "Not entirely. Tennessee is not a community-property state, but a surviving spouse can claim an elective share against the will — a percentage of the net estate that rises with the length of the marriage, from 10% under three years to 40% at nine years or more (T.C.A. § 31-4-101). On top of that, the spouse keeps homestead, exempt property, and a year's support allowance, which are not counted against the elective share. You cannot disinherit a spouse without a valid waiver.",
    },
    {
      question: "Does a will avoid probate in Tennessee?",
      answer:
        "Not by itself, but Tennessee keeps a simplified route for small estates that having a will does not close off. Since a 2022 rewrite (amended effective April 28, 2023), modest estates — personal property of $50,000 or less, with no real property — are handled through a petition for limited letters: limited letters of administration if the person died intestate, or limited letters testamentary of a small estate if there is a will, with a muniment-of-title option under T.C.A. § 32-2-111 (T.C.A. §§ 30-4-102, 30-4-103). Having a will does not force a full probate — it changes the filing, not the availability of the simplified route, which is more formal than the old affidavit but still avoids full administration (the $50,000 cap and roughly 45-day wait remain). Wills are proved in the Chancery Court of the decedent's county — or the county's Probate Court in places like Shelby and Davidson (T.C.A. §§ 16-16-201, 32-2-101).",
    },
  ],
  sources: [
    { label: "T.C.A. § 32-1-102 — Who may make a will", url: "https://law.justia.com/codes/tennessee/title-32/chapter-1/part-1/section-32-1-102/" },
    { label: "T.C.A. § 32-1-103 — Interested (beneficiary) witness", url: "https://law.justia.com/codes/tennessee/title-32/chapter-1/part-1/section-32-1-103/" },
    { label: "T.C.A. § 32-1-104 — Execution and attestation of wills", url: "https://codes.findlaw.com/tn/title-32-wills/tn-code-sect-32-1-104/" },
    { label: "T.C.A. § 32-1-105 — Holographic will", url: "https://law.justia.com/codes/tennessee/title-32/chapter-1/part-1/section-32-1-105/" },
    { label: "T.C.A. § 32-1-106 — Nuncupative (oral) will", url: "https://codes.findlaw.com/tn/title-32-wills/tn-code-sect-32-1-106/" },
    { label: "T.C.A. § 32-1-202 — Revocation by divorce or annulment", url: "https://codes.findlaw.com/tn/title-32-wills/tn-code-sect-32-1-202/" },
    { label: "T.C.A. § 32-2-110 — Self-proving affidavit", url: "https://law.justia.com/codes/tennessee/title-32/chapter-2/section-32-2-110/" },
    { label: "T.C.A. § 31-2-104 — Intestate share of surviving spouse and heirs", url: "https://law.justia.com/codes/tennessee/title-31/chapter-2/section-31-2-104/" },
    { label: "T.C.A. § 31-4-101 — Elective share of surviving spouse", url: "https://law.justia.com/codes/tennessee/title-31/chapter-4/section-31-4-101/" },
    { label: "T.C.A. § 32-2-111 — Muniment of title (small estate)", url: "https://law.justia.com/codes/tennessee/title-32/chapter-2/section-32-2-111/" },
    { label: "Tennessee Department of Revenue — Inheritance Tax (phased out)", url: "https://www.tn.gov/revenue/taxes/inheritance-tax.html" },
  ],
};

const MASSACHUSETTS: StateDeepDive = {
  seoDescription:
    "Massachusetts will requirements (2026): 18+, in writing, signed with two witnesses — no notary required. The MUPC (c.190B) rules, the three ways Massachusetts broke from the Uniform Probate Code — it kept an interested-witness purging rule, refused the harmless-error safety valve, and protects a spouse through the old c.191 § 15 forced share — in plain English.",
  intro: [
    "Massachusetts adopted the Uniform Probate Code in 2012 (the Massachusetts Uniform Probate Code, MGL c.190B), so on paper its will rules look like the modern, forgiving version used in many states. In practice, Massachusetts deliberately declined three of the UPC's most important liberalizing moves — and each one is a trap for anyone who assumes the standard code applies here.",
    "The statute facts above give you the rules. This section covers where Massachusetts wills actually go wrong, the three places Massachusetts broke from the Uniform Probate Code, and the spousal protection built into Massachusetts law that you cannot simply draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Massachusetts will gets thrown out",
    intro:
      "Most Massachusetts wills that fail, fail on how they were signed — or on the assumption that Massachusetts follows the standard Uniform Probate Code when, in three key spots, it does not. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "When Massachusetts adopted the MUPC it left out the holographic-will provision entirely. A handwritten, unwitnessed will has no legal effect here (MGL c.190B § 2-502 governs execution, and there is no holographic exception). A heartfelt letter in your own hand, however clear, is not a valid Massachusetts will. The one narrow path is a holograph that was valid where it was signed or where you were domiciled, which Massachusetts can honor under § 2-506 — not a note written at your Massachusetts kitchen table.",
      },
      {
        title: "Using a beneficiary — or a beneficiary's spouse — as a witness",
        body:
          "This is the first place Massachusetts broke from the modern code. Most UPC states abolished the old \"interested witness\" penalty; Massachusetts kept a purging rule. Under MGL c.190B § 2-505, a gift to a witness (or to that witness's spouse) is void unless either two other witnesses signed who take nothing under the will, or the interested witness can prove the bequest was not the product of that witness's fraud or undue influence. Keep your witnesses neutral parties who inherit nothing, and their spouses out of the will, and the gift is never at risk.",
      },
      {
        title: "Counting on a court to forgive a botched signing",
        body:
          "This is the second break from the standard code, and the most dangerous to rely on. The Uniform Probate Code includes a \"harmless error\" rule (§ 2-503) that lets a court admit a will with a signing defect if there is clear and convincing evidence you intended it as your will. Massachusetts left § 2-503 reserved — it deliberately declined that dispensing power. Massachusetts is a strict-compliance state: if the two-witness formalities in § 2-502 are not met, there is no safety valve to save the document. Get the execution right the first time.",
      },
      {
        title: "Speaking your wishes instead of writing them",
        body:
          "Massachusetts requires a will to be in writing and signed with two witnesses (MGL c.190B § 2-502). An oral (nuncupative) will effectively does not work here — do not count on spoken wishes carrying legal force. A narrow historical carve-out for soldiers and mariners may survive from the pre-MUPC statute, but its status is uncertain and it should never be relied on. For everyone, in every ordinary situation, only a written, witnessed will is valid.",
      },
      {
        title: "Signing electronically or by video",
        body:
          "As of 2026, Massachusetts has not enacted the Uniform Electronic Wills Act, and § 2-502 requires a written will signed with two witnesses. A scanned PDF, an e-signature, or a will \"witnessed\" over a video call is not a valid Massachusetts will. The valid route is still a physical document signed in wet ink with two witnesses.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't simply disinherit a spouse — the old c.191 § 15 forced share",
      body: [
        "This is the third and biggest place Massachusetts broke from the Uniform Probate Code. The UPC replaced older forced shares with an \"augmented estate\" elective share; Massachusetts declined it and kept the pre-code forced share under MGL c.191 § 15. A surviving spouse can \"waive\" the will within six months of the will being allowed by the Probate Court and take a statutory share instead.",
        "What that share is depends on who else survives. If you leave issue (descendants), the spouse can waive and take one-third of your personal property and one-third of your real property. If you leave kindred but no issue, the spouse takes $25,000 plus one-half of the remaining personal and real property. If you leave no issue and no kindred, the spouse takes $25,000 plus one-half of the rest.",
        "The distinctive Massachusetts mechanic is what happens above $25,000. To the extent the spouse's share exceeds $25,000, the excess is not handed over outright. The spouse takes $25,000 absolutely, and beyond that takes only a life estate in the excess real property and a life income interest in the excess personal property — not full ownership. Massachusetts is not a community-property state, so this forced share, not a community-property split, is the spouse's protection. If your plan depends on leaving a spouse less than this, build the § 15 share into the plan rather than ignoring it.",
      ],
    },
    {
      heading: "The interested-witness trap Massachusetts kept",
      body: [
        "Under the standard Uniform Probate Code a witness who also inherits creates no problem at all — the code abolished the penalty. Massachusetts did not follow. MGL c.190B § 2-505 keeps a purging rule: a devise to a witness, or to that witness's spouse, is void unless one of two things is true. Either at least two other subscribing witnesses signed who are not benefited under the will, or the interested witness proves the gift was not the product of that witness's own fraud or undue influence.",
        "The will itself survives an interested witness — only the gift to that witness is at risk, and only if the safe-harbor conditions aren't met. But the simplest practice avoids the fight entirely: use two witnesses who take nothing under the will, and make sure neither witness's spouse is a beneficiary either. Then no bequest ever has to be defended.",
      ],
    },
    {
      heading: "No safety valve: Massachusetts is a strict-compliance state",
      body: [
        "In many Uniform Probate Code states, a will with a signing defect is not automatically dead — a court can use the \"harmless error\" or dispensing power (UPC § 2-503) to admit it if the person offering it proves by clear and convincing evidence that you intended the document to be your will. That rule can rescue a will witnessed by only one person, or signed but never formally attested.",
        "Massachusetts left § 2-503 reserved. It considered the dispensing power and declined it, which makes Massachusetts a strict-compliance state: the execution requirements of § 2-502 must actually be satisfied, and a court cannot cure a shortfall by finding that you \"meant\" the document to be your will. This is exactly why the two-witness formalities carry so much weight here. There is no courtroom rescue after the fact — get the signing right while you can.",
      ],
    },
    {
      heading: "The self-proving affidavit, and where a Massachusetts will is proved",
      body: [
        "Massachusetts does not require notarization for a will to be valid — two witnesses do that (MGL c.190B § 2-502). But it offers a self-proving affidavit (§ 2-504): the testator and the two witnesses can swear before a notary, either at the time of signing or at any later date, that the will was properly executed. A self-proved will can be admitted to probate without producing the witnesses to testify years later. It changes nothing about the will's underlying validity; it just makes proving the will easier.",
        "Massachusetts wills are proved in the Probate and Family Court, in the county where you were domiciled — your primary residence — at death (§ 3-201). For a very small estate there is a simpler route: voluntary administration (§ 3-1201) is available when the estate is entirely personal property worth no more than $25,000 (one motor vehicle is excluded from that cap), starting 30 days after death. Most estates, though, go through ordinary probate, which is exactly why a clean, self-proved execution keeps the case uncontested and moving.",
      ],
    },
    {
      heading: "Massachusetts has its own estate tax",
      body: [
        "Massachusetts is one of a minority of states with a state estate tax, and it is separate from the federal estate tax. For deaths on or after January 1, 2023, the exemption is $2,000,000 (delivered through a $99,600 credit), up from $1,000,000 before. Rates are graduated and top out at 16%. There is no separate Massachusetts inheritance tax.",
        "The practical point is that the Massachusetts threshold is far lower than the federal one, so estates that owe nothing federally can still owe Massachusetts estate tax once the estate exceeds the $2,000,000 threshold. If your estate is anywhere near that line — counting the house, retirement accounts, and life insurance — this is worth planning for with a Massachusetts estate-tax professional rather than assuming the federal exemption covers you.",
      ],
    },
    {
      heading: "Marriage, a new child, and divorce all rewrite a Massachusetts will",
      body: [
        "If you marry after signing your will and never update it, your new spouse is an \"omitted spouse\" and takes at least the share they would have received had you died without a will (MGL c.190B § 2-301). A child born or adopted after the will who is left unprovided for is similarly protected and takes a statutory share (§ 2-302); a claim reaching real property must be filed within one year.",
        "Divorce cuts the other way. A final divorce or annulment automatically revokes any disposition in your will to the former spouse and severs survivorship rights in property you held jointly with them, as if the former spouse had disclaimed or died first (§ 2-804). The safe move is the same in every case: revisit the will after any marriage, divorce, birth, or adoption.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I write my own will by hand in Massachusetts?",
      answer:
        "For a will made in Massachusetts, no. When Massachusetts adopted the Uniform Probate Code it left out the holographic-will provision, so a handwritten, unwitnessed will has no legal effect here — unlike in California. A valid Massachusetts will must be in writing and signed with two witnesses (MGL c.190B § 2-502). A handwritten will that was valid where it was signed or where you were domiciled can be honored under § 2-506, but a note written at home in Massachusetts without witnesses is not a will.",
    },
    {
      question: "Can my spouse be left out of my Massachusetts will?",
      answer:
        "Not entirely. Massachusetts did not adopt the Uniform Probate Code's augmented-estate elective share — it kept the older forced share under MGL c.191 § 15. Within six months of the will being allowed, a surviving spouse can waive the will and take a statutory share: if you leave issue, one-third of your personal and one-third of your real property, taken outright; if kindred but no issue, $25,000 plus half the rest; if no issue and no kindred, $25,000 plus half the rest. In those two no-issue branches only, the spouse takes just the first $25,000 absolutely — above that, only a life estate in the excess real property and a life income interest in the excess personal property, not full ownership. The one-third share in the issue branch is not subject to that life-estate limit.",
    },
    {
      question: "Does a will need to be notarized in Massachusetts?",
      answer:
        "No. A Massachusetts will is valid when you sign it and two witnesses sign it (MGL c.190B § 2-502). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit (§ 2-504), which lets the will be admitted to probate without producing the witnesses to testify later. That affidavit speeds probate but adds nothing to whether the will is legally valid.",
    },
    {
      question: "Can a Massachusetts court save a will that wasn't signed correctly?",
      answer:
        "No — this is a key way Massachusetts differs from the standard Uniform Probate Code. Many UPC states have a \"harmless error\" rule (§ 2-503) that lets a court admit a will with a signing defect if there is clear and convincing evidence you intended it as your will. Massachusetts left § 2-503 reserved and declined that power, so it is a strict-compliance state. If the two-witness formalities of § 2-502 are not met, there is no safety valve to rescue the document.",
    },
    {
      question: "Does Massachusetts have an estate tax?",
      answer:
        "Yes. Massachusetts has its own estate tax, separate from the federal one. For deaths on or after January 1, 2023, the exemption is $2,000,000 (via a $99,600 credit), with graduated rates topping out at 16% and no separate inheritance tax. Because that threshold is far below the federal exemption, an estate that owes no federal tax can still owe Massachusetts estate tax once it exceeds $2,000,000. If your estate is near that line, plan for it with a Massachusetts estate-tax professional.",
    },
  ],
  sources: [
    { label: "MGL c.190B § 2-501 & § 2-502 — Who may make a will; execution", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-2-502" },
    { label: "MGL c.190B § 2-503 — Harmless error (reserved in Massachusetts)", url: "https://www.mass.gov/lists/mgl-190b-article-ii-intestacy-wills-and-donative-transfers" },
    { label: "MGL c.190B § 2-504 — Self-proved will", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-2-504" },
    { label: "MGL c.190B § 2-505 — Interested (beneficiary) witness", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-2-505" },
    { label: "MGL c.190B § 2-102 — Intestate share of surviving spouse", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-2-102" },
    { label: "MGL c.191 § 15 — Waiver of will; surviving spouse's forced share", url: "https://malegislature.gov/Laws/GeneralLaws/PartII/TitleII/Chapter191/Section15" },
    { label: "MGL c.190B § 2-804 — Revocation on divorce or annulment", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-2-804" },
    { label: "MGL c.190B § 3-1201 — Voluntary administration (small estate)", url: "https://www.mass.gov/info-details/mass-general-laws-c190b-ss-3-1201" },
    { label: "Massachusetts Estate Tax Guide", url: "https://www.mass.gov/info-details/massachusetts-estate-tax-guide" },
  ],
};

const MISSOURI: StateDeepDive = {
  seoDescription:
    "Missouri will requirements (2026): sign before two witnesses, no notary needed, and no handwritten wills at all. The § 474.320 rules, the spousal elective share of one-half or one-third, the narrow $500 oral will, small-estate limits, and Probate Division probate — in plain English.",
  intro: [
    "Missouri asks for a familiar core — a written will, signed and witnessed by two people — and then enforces it strictly. It flatly refuses handwritten (holographic) wills, gives judges no power to forgive a signing that went wrong, and keeps only one narrow escape hatch: a deathbed oral will that can pass no more than $500 of personal property. As of August 2025 it also recognizes electronic wills, a change so new that few Missouri wills have been made under it yet.",
    "The statute facts above give you the rules. This section covers where Missouri wills actually go wrong, and the protections built into Missouri law that you cannot draft around.",
  ],
  pitfalls: {
    heading: "Five ways a Missouri will gets thrown out",
    intro:
      "Most Missouri wills that fail, fail on how they were signed — not on what they say. And because Missouri has no harmless-error rule, a defect is usually fatal. These are the recurring ones.",
    items: [
      {
        title: "Assuming a handwritten note counts as a will",
        body:
          "Missouri does not recognize holographic (handwritten, unwitnessed) wills at all. Section 474.320 requires every will to be in writing, signed by you, and attested by two or more competent witnesses who subscribe in your presence — with no exception for a document written entirely in your own hand. A heartfelt letter in a drawer, however clear and however clearly signed, is not a valid Missouri will without those two witnesses.",
      },
      {
        title: "Using a beneficiary as one of your witnesses",
        body:
          "An interested witness does not void a Missouri will — but it can quietly shrink that witness's inheritance. Under § 474.330, a witness who also inherits forfeits any gift that exceeds what they would have received in intestacy, unless the will was also attested by two disinterested witnesses. Being a creditor of the estate or the named executor does not make a witness \"interested.\" The clean fix is to use two witnesses who inherit nothing.",
      },
      {
        title: "Relying on a notary instead of two witnesses",
        body:
          "Notarization does not make a Missouri will valid — two witnesses do (§ 474.320). A notary matters only for the optional self-proving affidavit (§ 474.337), which speeds probate but adds nothing to whether the will is legally valid. A carefully notarized will signed by fewer than two competent witnesses is not validly executed.",
      },
      {
        title: "Counting on a deathbed oral will to carry the estate",
        body:
          "Missouri does recognize nuncupative (oral) wills, but the exception is tiny and easy to misjudge. It works only for a person in imminent peril of death who actually dies from it, who declares the will before two disinterested witnesses, whose words are reduced to writing within 30 days and probated within six months — and even then it can pass personal property only, up to an aggregate value of $500 (§ 474.340). It cannot transfer real estate and cannot move a real estate's worth of assets. Treat it as a last resort, never a plan.",
      },
      {
        title: "Assuming a botched signing can be fixed later",
        body:
          "Some states let a court admit a defective will if it's convinced you intended it — a \"harmless error\" or dispensing rule. Missouri has not adopted one. Strict compliance with § 474.320 is required, so a will signed with only one witness cannot be rescued by proving your intent after you're gone. Get two competent, disinterested witnesses in the room, or the document is not a will.",
      },
    ],
  },
  sections: [
    {
      heading: "You can't fully disinherit a spouse in Missouri",
      body: [
        "Missouri is not a community-property state, but it protects a surviving spouse through an elective share. A spouse who elects to take against the will can claim one-half of the estate if you left no lineal descendants, or one-third if you did (§ 474.160), plus exempt property and the statutory allowance on top of that share.",
        "You cannot write around this by simply leaving your spouse out. If part of your plan depends on giving a spouse less than the elective share, build that share into the plan — through a valid waiver or other planning — rather than ignoring it, because the court will apply the elective-share math regardless of what the will says.",
      ],
    },
    {
      heading: "What happens if you die without a valid Missouri will",
      body: [
        "If your will is thrown out — or you never made one — Missouri's intestacy statute decides who inherits, and a surviving spouse's share depends entirely on the children (§ 474.010). With no descendants, the spouse takes the entire estate. Where all of your descendants are also the surviving spouse's, the spouse takes the first $20,000 plus one-half of the balance, and the descendants split the rest. But if you leave a descendant who is not your spouse's child, the spouse takes one-half with no $20,000 set-aside, and the descendants take the other half.",
        "After the spouse and descendants, the estate passes to parents and siblings, then to more distant relatives. The point of a valid will is to override this default entirely — a blended family in particular can end up with a division no one intended once the $20,000 set-aside drops away.",
      ],
    },
    {
      heading: "The self-proving affidavit, and where a Missouri will is proved",
      body: [
        "Missouri does not require notarization for a will to be valid, but it does offer a self-proving affidavit: at signing or any later date, you and your two witnesses can swear before a notary, using the statutory form, that the will was properly executed (§ 474.337). A self-proved will can usually be admitted without tracking down the witnesses to testify years later. Execute the affidavit the same day you sign; it is far harder to arrange after the fact.",
        "Missouri probates wills in the Probate Division of the Circuit Court, in the county where you were domiciled — your primary residence — at death (§ 473.010). Small estates can skip formal probate: where the estate, less debts and liens, does not exceed $40,000, an heir can use a small-estate affidavit beginning 30 days after death, though creditor notice is required once the listed property exceeds $15,000 (§ 473.097). This is the court that decides whether your will was validly executed, which is exactly why the two-witness formality carries so much weight.",
      ],
    },
    {
      heading: "Marriage, divorce, and a new child rewrite a Missouri will",
      body: [
        "If you marry after signing your will and make no provision for the new spouse, that spouse is treated as omitted and takes an intestate share of your estate — unless the omission was intentional and shown in the will, or you provided for them outside it (§ 474.235). Missouri gives similar protection to an after-born or otherwise omitted child, who may take a share as if you had not accounted for them; the safe move is to revisit the will after any birth or adoption rather than rely on the statute to patch the gap.",
        "Divorce cuts the other way and does it automatically. Once your marriage is dissolved, every provision of the will in favor of your former spouse is revoked, and the will takes effect as if the former spouse had died at the time of the divorce (§ 474.420). You do not need to redo the will for the ex to be written out — but you should, so that the gifts and roles that were theirs pass where you actually want them to go.",
      ],
    },
    {
      heading: "No handwritten wills, a very narrow oral will, and — new in 2025 — electronic wills",
      body: [
        "Missouri's baseline is strict: a will must be typed or printed, signed by you (or by someone else at your direction and in your presence), and attested by two competent witnesses who subscribe in your presence, with no publication requirement (§ 474.320). There is no holographic-will exception. The only non-electronic carve-out is the nuncupative (oral) will, and its $500 personal-property ceiling and deathbed conditions make it useless for ordinary planning (§ 474.340).",
        "As of August 28, 2025, Missouri recognizes electronic wills under the Uniform Electronic Wills and Electronic Estate Planning Documents Act (§§ 474.540–474.564). A valid e-will must be readable as text, signed by the maker (or by another in the maker's physical presence), and witnessed by two people in the maker's physical or electronic presence, and it can be made self-proving through a remote online notary (§ 474.550). Because the law is brand new, the cautious route for any will signed today is still a wet-ink signature with two witnesses physically present — the path courts have decades of experience admitting.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I write my own will by hand in Missouri?",
      answer:
        "You can write it by hand, but it is not valid unless two competent witnesses also subscribe it in your presence (§ 474.320). Missouri does not recognize holographic wills — a handwritten, unwitnessed will has no legal effect here, unlike in California or Texas. Handwriting the document is fine; skipping the two witnesses is fatal.",
    },
    {
      question: "Does a will need to be notarized in Missouri?",
      answer:
        "No. A Missouri will is valid when you sign it and two competent witnesses subscribe it in your presence (§ 474.320). Notarization is not required for validity. A notary is used only for the optional self-proving affidavit (§ 474.337), which lets the will be admitted to probate without producing the witnesses — but that affidavit speeds probate and adds nothing to whether the will is legally valid.",
    },
    {
      question: "Can my spouse be left out of my Missouri will?",
      answer:
        "Not entirely. A surviving spouse can elect to take against the will and claim one-half of the estate if you left no lineal descendants, or one-third if you did (§ 474.160), plus exempt property and a statutory allowance. Missouri is not a community-property state, but this elective share means you cannot fully disinherit a spouse without a valid waiver.",
    },
    {
      question: "Does Missouri have an estate or inheritance tax?",
      answer:
        "No. Missouri has no inheritance tax and no separate estate tax. Its estate tax is a \"pick-up\" tax tied to a federal credit that has been zero for deaths on or after January 1, 2005, so no Missouri estate tax is owed. A very large estate may still owe federal estate tax, but that is a separate federal matter.",
    },
    {
      question: "Can I sign my will electronically in Missouri?",
      answer:
        "Yes, as of August 28, 2025. Missouri adopted the Uniform Electronic Wills Act (§§ 474.540–474.564), so an electronic will is valid if it is readable as text, signed by the maker (or by another in the maker's physical presence), and witnessed by two people in the maker's physical or electronic presence, with optional self-proving through a remote online notary (§ 474.550). Because the law is brand new, a traditional wet-ink will with two witnesses physically present remains the safest route today.",
    },
  ],
  sources: [
    { label: "Mo. Rev. Stat. § 474.310 — Who may make a will", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.310" },
    { label: "Mo. Rev. Stat. § 474.320 — Execution and attestation of wills", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.320" },
    { label: "Mo. Rev. Stat. § 474.330 — Interested witnesses", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.330" },
    { label: "Mo. Rev. Stat. § 474.337 — Self-proving affidavit", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.337" },
    { label: "Mo. Rev. Stat. § 474.340 — Nuncupative (oral) wills", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.340" },
    { label: "Mo. Rev. Stat. § 474.010 — Intestate succession", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.010" },
    { label: "Mo. Rev. Stat. § 474.160 — Elective share of surviving spouse", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.160" },
    { label: "Mo. Rev. Stat. § 474.420 — Effect of dissolution of marriage", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.420" },
    { label: "Mo. Rev. Stat. § 473.097 — Small-estate affidavit", url: "https://revisor.mo.gov/main/OneSection.aspx?section=473.097" },
    { label: "Mo. Rev. Stat. § 474.550 — Electronic wills; execution and self-proving", url: "https://revisor.mo.gov/main/OneSection.aspx?section=474.550" },
    { label: "Missouri Department of Revenue — Estate tax", url: "https://dor.mo.gov/taxation/individual/tax-types/estate.html" },
  ],
};

export const STATE_DEEP_DIVES: Record<string, StateDeepDive> = {
  NY: NEW_YORK,
  CA: CALIFORNIA,
  TX: TEXAS,
  FL: FLORIDA,
  PA: PENNSYLVANIA,
  IL: ILLINOIS,
  OH: OHIO,
  GA: GEORGIA,
  NC: NORTH_CAROLINA,
  MI: MICHIGAN,
  NJ: NEW_JERSEY,
  IN: INDIANA,
  VA: VIRGINIA,
  WA: WASHINGTON,
  AZ: ARIZONA,
  TN: TENNESSEE,
  MA: MASSACHUSETTS,
  MO: MISSOURI,
};

export function getStateDeepDive(abbr: string): StateDeepDive | undefined {
  return STATE_DEEP_DIVES[abbr.toUpperCase()];
}
