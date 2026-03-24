import type { StateRequirements, WillAnswers, ChecklistItem } from "./types";

export function generateExecutionChecklist(
  stateReqs: StateRequirements,
  answers: WillAnswers
): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  let step = 1;
  const stateName = stateReqs.state;
  const witnessCount = stateReqs.witness_requirements.count;

  // 1. Print
  items.push({
    step: step++,
    title: "Print your will on paper",
    requirement:
      "Print the final version of your will on standard 8.5\" x 11\" letter-size paper using a regular printer. Print single-sided.",
    howTo:
      "Use the \"Print / Save as PDF\" button on this page, then print the PDF. Use white paper and black ink. Print single-sided (one side of each page only) for clarity. Do NOT handwrite any changes on the printed document — if you need to change something, go back and edit your answers, then print a fresh copy. You will need the original signed document; photocopies or digital copies are not accepted by courts as the original will.",
    why:
      `${stateName} requires that a will be \"in writing\" to be valid. While \"in writing\" includes typed and printed documents, the original signed paper copy is what the probate court will need. If only a photocopy can be found, courts may presume the original was intentionally destroyed (revoked), which could invalidate the will entirely.`,
    citations: stateReqs.statute_citations
      .filter((c) => c.toLowerCase().includes("execution") || c.toLowerCase().includes("form"))
      .map((c) => ({ text: c })),
    required: true,
  });

  // 3. Read through
  items.push({
    step: step++,
    title: "Read the entire document carefully",
    requirement:
      "Before signing, read every word of the printed will. Verify that all names are spelled correctly, all amounts and percentages are accurate, and every provision matches your wishes.",
    howTo:
      "Sit down in a quiet place and read the will from start to finish. Check each person's full legal name letter by letter. Verify that specific gifts go to the right people. Confirm the percentages for your residuary estate add up to 100%. Make sure your executor, guardian, and alternate choices are correct. If anything is wrong — even a small typo in a name — go back to the questionnaire, fix it, and print a new copy. Do not sign a will with errors.",
    why:
      "A will with errors can cause serious problems. A misspelled name could lead to a court dispute about who you meant. Incorrect percentages can result in litigation among beneficiaries. Courts interpret wills strictly — they look at what the document actually says, not what you meant to say. Taking 10 minutes to proofread now can prevent months of legal disputes later.",
    citations: [],
    required: true,
  });

  // 4. Gather witnesses
  if (witnessCount > 0) {
    items.push({
      step: step++,
      title: `Find ${witnessCount} qualified witnesses`,
      requirement:
        `${stateName} requires ${witnessCount} witness${witnessCount > 1 ? "es" : ""} to be present when you sign your will (or when you acknowledge your signature to them). ${stateReqs.witness_requirements.qualifications}.`,
      howTo:
        `Choose ${witnessCount} people who are adults (18 or older in most states), mentally competent, and — ideally — not named as beneficiaries in the will. Good choices include neighbors, coworkers, or friends who are not inheriting anything from you. All ${witnessCount} witnesses should be available at the same time and place for the signing. ${stateReqs.witness_requirements.interested_witness_rules} Your witnesses do NOT need to read your will — they only need to watch you sign it (or hear you say \"this is my will and that is my signature\") and then sign it themselves.`,
      why:
        `Witnesses serve as proof that you actually signed the will, that you were the person who signed it, that you appeared to be of sound mind, and that nobody was forcing you to sign. Without the required number of qualified witnesses, your will may be completely invalid in ${stateName}. Witnesses may be called to testify in probate court if anyone challenges the will — which is why choosing people who aren't beneficiaries reduces the risk of a conflict of interest.`,
      citations: stateReqs.statute_citations
        .filter((c) => c.toLowerCase().includes("execution") || c.toLowerCase().includes("witness"))
        .map((c) => ({ text: c })),
      required: true,
    });
  } else {
    // Pennsylvania
    items.push({
      step: step++,
      title: "Find 2 witnesses (strongly recommended)",
      requirement:
        "Pennsylvania does not require witnesses at the time of signing. However, having 2 witnesses is strongly recommended because it makes probate significantly easier.",
      howTo:
        "Even though Pennsylvania law doesn't require witnesses when you sign, you should still have 2 adults watch you sign and then sign the will themselves. Without witnesses at signing, the court will require 2 people to identify your handwriting/signature during probate — which is much harder to arrange after you've passed away.",
      why:
        "Pennsylvania is unique — it's the only state that doesn't require witnesses at the time you sign the will. But at probate, someone must still prove the will is genuine. If you had witnesses sign at the time of execution, they can attest to that. Without them, the court requires testimony identifying your signature, which can delay probate and open the door to challenges.",
      citations: [
        { text: "20 Pa.C.S. § 2502 (Form and execution of wills)" },
        { text: "20 Pa.C.S. § 3132.1 (Self-proved wills)" },
      ],
      required: false,
    });
  }

  // NY publication requirement
  if (answers.state === "NY") {
    items.push({
      step: step++,
      title: "Declare to each witness that this is your will",
      requirement:
        "New York requires a 'publication' step: you must verbally tell each witness that the document you're about to sign (or have signed) is your last will and testament.",
      howTo:
        "Before or immediately after signing, say something like: \"I want you to know that this document is my last will and testament, and I'm asking you to witness my signature.\" You do NOT need to show them the contents or let them read it — they just need to know what type of document they're witnessing. Both witnesses should hear this declaration. Each witness must then sign within 30 days.",
      why:
        "New York is one of the few states with a formal 'publication' requirement. Without it, your will may be invalid — even if everything else is done correctly. The publication ensures your witnesses knowingly attested to a will (not just some random document). This requirement is codified in New York's Estates, Powers and Trusts Law.",
      citations: [
        { text: "N.Y. EPTL § 3-2.1 (Execution and attestation of wills)" },
      ],
      required: true,
    });
  }

  // Sign the will
  if (answers.state === "LA") {
    items.push({
      step: step++,
      title: "Sign at the end AND initial every other page",
      requirement:
        "Louisiana requires the testator to sign at the end of the testament AND to sign or initial the bottom of each additional page, all in the presence of the notary and both witnesses.",
      howTo:
        "With your notary and both witnesses present in the same room: (1) Sign your full legal name at the signature line at the end of the testament. (2) Go back to every other page and write your initials at the bottom. (3) The notary should then read or confirm the document aloud (or you read it yourself). (4) Declare to the notary and witnesses that this is your last will and testament. Use blue or black ink for all signatures and initials.",
      why:
        "Louisiana's notarial testament has stricter execution requirements than most states because Louisiana uses a civil law system (based on French and Spanish legal traditions) rather than the common law system used in the other 49 states. The page-by-page initialing prevents someone from swapping or inserting pages after the will is signed. The requirement that everything happen in the presence of the notary and witnesses ensures the integrity of the process.",
      citations: [
        { text: "La. C.C. art. 1577 (Notarial testament)" },
        { text: "La. C.C. art. 1578 (Requirement of signature on each page)" },
      ],
      required: true,
    });
  } else {
    items.push({
      step: step++,
      title: "Sign the will at the end",
      requirement:
        `Sign the will at the signature line at the end of the document${witnessCount > 0 ? ", in the physical presence of all your witnesses" : ""}. Use your full legal name exactly as it appears in the will.`,
      howTo:
        `Use a pen with blue or black ink (blue is often preferred because it makes the original easy to distinguish from photocopies). Sign at the designated signature line at the END of the will — do not sign in the margins or on a separate page. ${witnessCount > 0 ? `All ${witnessCount} witnesses must be physically present in the room when you sign. They need to actually see you write your signature.` : ""} Do not use any electronic signature for the paper will. After signing, do NOT add, cross out, or write anything else on the will — any marks made after signing could be interpreted as an alteration or attempted revocation.`,
      why:
        `Your signature is what transforms the document from a draft into your will. ${stateName} law requires that you sign (or that someone sign for you at your direction and in your presence). ${witnessCount > 0 ? "Having witnesses present when you sign is required because they serve as living proof that you signed voluntarily and appeared to be of sound mind." : ""} Most states require the signature to be at the end of the will — in New York and Ohio, anything written below the signature is legally void.`,
      citations: stateReqs.statute_citations
        .filter((c) => c.toLowerCase().includes("execution") || c.toLowerCase().includes("form"))
        .map((c) => ({ text: c })),
      required: true,
    });
  }

  // Witnesses sign
  if (witnessCount > 0) {
    const vtNote = stateReqs.state === "Vermont"
      ? " Vermont specifically requires witnesses to sign in the presence of EACH OTHER — not just the testator."
      : "";
    const flNote = stateReqs.state === "Florida"
      ? " Florida requires witnesses to sign in the presence of EACH OTHER as well as the testator."
      : "";

    items.push({
      step: step++,
      title: "Have your witnesses sign the will",
      requirement:
        `Each of your ${witnessCount} witnesses must sign the will. ${stateReqs.witness_requirements.presence_rules}.${vtNote}${flNote}`,
      howTo:
        `After you sign (or acknowledge your signature), each witness signs on the witness signature lines at the end of the will. They should also print their name and address next to their signature. All of this should happen during the same meeting — don't have witnesses sign days later. ${vtNote || flNote ? "Pay special attention to the presence requirements for your state noted above." : ""} Witnesses should use the same type of pen (blue or black ink).`,
      why:
        `Witness signatures are what make your will legally valid in ${stateName}. They prove that the signing ceremony actually happened and that the testator (you) appeared willing and competent. If a witness can't be found later, or if the signatures are missing, the will may be denied probate — meaning the court would distribute your estate as if you never wrote a will at all. This is why it's important to choose witnesses who are likely to be reachable in the future.`,
      citations: stateReqs.statute_citations
        .filter((c) => c.toLowerCase().includes("execution") || c.toLowerCase().includes("witness") || c.toLowerCase().includes("attest"))
        .map((c) => ({ text: c })),
      required: true,
    });
  }

  // Notarization
  if (stateReqs.notarization.required) {
    items.push({
      step: step++,
      title: "Get the will notarized (REQUIRED in your state)",
      requirement:
        `In ${stateName}, notarization is REQUIRED for your will to be valid. ${stateReqs.notarization.notes}`,
      howTo:
        `Find a notary public — they're available at banks, UPS stores, law offices, and some libraries. Bring a valid government-issued photo ID (driver's license or passport). The notary will verify your identity, watch you and your witnesses sign (if you haven't already), and apply their official seal and signature. The notary fee is typically $5–$25 depending on your state. Do NOT sign the notarial section before you're in front of the notary — they need to witness the signatures.`,
      why:
        `${stateName} requires notarization as part of will execution. Unlike most states where notarization is optional, your will is NOT valid in ${stateName} without a notary's attestation. The notary serves as an impartial state-commissioned officer who verifies the identities of everyone signing and confirms no one appears to be under duress.`,
      citations: stateReqs.statute_citations
        .filter((c) => c.toLowerCase().includes("notari") || c.toLowerCase().includes("execution"))
        .map((c) => ({ text: c })),
      required: true,
    });
  } else if (stateReqs.self_proving_affidavit.available) {
    items.push({
      step: step++,
      title: "Get the self-proving affidavit notarized (strongly recommended)",
      requirement:
        "Your will includes a self-proving affidavit at the end. This section should be signed by you and your witnesses in front of a notary public. This step is optional but strongly recommended.",
      howTo:
        "Bring the signed will (with all witness signatures) to a notary public — available at banks, UPS stores, law offices, and some libraries. Bring a valid government-issued photo ID. You and your witnesses all sign the self-proving affidavit section in front of the notary, who then applies their seal. The notary fee is typically $5–$25. Important: all signers (you and your witnesses) must be present at the same time in front of the notary.",
      why:
        `A self-proving affidavit is a notarized statement attached to your will where you and your witnesses swear under oath that the will was properly executed. Without it, when your will goes through probate, the court must track down your witnesses and have them testify that they saw you sign. If a witness has moved away, become incapacitated, or died, this can delay probate for months or even make it impossible to prove the will. The self-proving affidavit eliminates this problem — the court accepts the will without requiring live witness testimony. ${stateReqs.self_proving_affidavit.requirements}`,
      citations: stateReqs.statute_citations
        .filter((c) => c.toLowerCase().includes("self-prov") || c.toLowerCase().includes("self prov"))
        .map((c) => ({ text: c })),
      required: false,
    });
  }

  // Store safely
  items.push({
    step: step++,
    title: "Store the original will in a safe place",
    requirement:
      "Keep the original signed will in a secure location where your executor can find it after your death.",
    howTo:
      "Good options: a fireproof home safe, a bank safe deposit box (but check if your state makes these hard to access after death — some do), or with your attorney. Tell your executor exactly where the original is stored. Consider giving your executor a photocopy clearly marked \"COPY — NOT THE ORIGINAL\" for their reference. Do NOT store the will only on a computer or in the cloud. Do NOT staple, paperclip, hole-punch, or physically alter the will in any way after it's signed — courts may interpret missing staples or torn pages as evidence of tampering or revocation.",
    why:
      "If the original signed will cannot be found after your death, most courts will presume you intentionally destroyed it — which means you revoked it. Your estate would then be distributed under your state's default intestacy laws, as if you never had a will. This is true even if everyone knows what the will said and even if photocopies exist. The original signed paper document is irreplaceable. Safe deposit boxes can be tricky in some states because they may be sealed upon the owner's death until a court order is obtained, so make sure your executor knows how to access it.",
    citations: stateReqs.statute_citations
      .filter((c) => c.toLowerCase().includes("revoc"))
      .map((c) => ({ text: c })),
    required: true,
  });

  // Notify executor
  items.push({
    step: step++,
    title: `Tell ${answers.executor.name || "your executor"} they've been named`,
    requirement:
      "Inform your executor that you've named them in your will and tell them where to find the original document.",
    howTo:
      `Have a conversation with ${answers.executor.name || "your chosen executor"} and let them know: (1) that you've named them as executor of your will, (2) where the original signed will is stored, (3) the name and contact information of your attorney (if you have one), and (4) a general overview of your wishes (you don't need to share every detail). If you've named an alternate executor (${answers.alternateExecutor.name || "your backup"}), consider telling them as well. Give your executor a photocopy of the will marked \"COPY\" so they have a reference.`,
    why:
      "Being named as executor is a significant responsibility, and the person you've chosen deserves to know about it in advance. They may need to act quickly after your death — filing the will with probate court, notifying beneficiaries, and securing your property. If they don't know the will exists or where to find it, critical deadlines could be missed. Also, if your executor is unwilling to serve, it's better to know now so you can name someone else.",
    citations: [],
    required: true,
  });

  // Consider telling beneficiaries
  items.push({
    step: step++,
    title: "Consider telling key people you have a will",
    requirement:
      "You are not legally required to tell anyone what's in your will, but letting close family know that a will exists can prevent confusion and conflict.",
    howTo:
      "You don't need to share the details of who gets what. Simply telling your spouse, children, or close family members that you have a will, that it's stored in a specific location, and who your executor is can be enough. This prevents a scenario where no one knows the will exists and your estate goes through intestacy (the state's default rules) unnecessarily.",
    why:
      "Families often don't talk about death and estate planning, which leads to surprises, hurt feelings, and legal disputes. The most common will contests happen when a family member is surprised by what's in the will — or surprised that a will exists at all. A brief, honest conversation now can save your family significant grief, money, and time later.",
    citations: [],
    required: false,
  });

  // Have an attorney review your draft (recommended, not required)
  items.push({
    step: step++,
    title: "Have an attorney review your will",
    requirement:
      "This is not required by law — you can sign and execute your will without an attorney. However, we strongly recommend having a licensed attorney in your state review your document before or after signing.",
    howTo:
      "Find an estate planning attorney in your area. Many offer a flat fee for a simple will review — often $150–$500. You can search your state's bar association website for referrals, or use a service like your local legal aid society if cost is a concern. Bring a printed copy of your will (signed or unsigned) and be prepared to discuss your family situation and assets. An attorney can review it in a single meeting and flag any issues.",
    why:
      "No state requires you to hire an attorney to make a valid will — this tool exists precisely because a simple will can be prepared without one. That said, an attorney can catch issues this tool can't: whether your estate would benefit from a trust, whether your beneficiary designations on retirement accounts or life insurance conflict with your will, whether your state has formalities or recent law changes we may not have fully addressed, or whether your specific family situation creates complications (like blended families or property in multiple states). Think of it as a second set of eyes. The cost of a review is small compared to the cost of a will that doesn't hold up.",
    citations: stateReqs.statute_citations
      .filter((c) => c.toLowerCase().includes("execution") || c.toLowerCase().includes("who may"))
      .map((c) => ({ text: c })),
    required: false,
  });

  return items;
}
