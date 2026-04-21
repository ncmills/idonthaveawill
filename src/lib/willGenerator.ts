import type { WillAnswers, GeneratedWill, WillArticle } from "./types";
import { getStateByAbbreviation, isCommunityPropertyState } from "./stateData";
import { generateLouisianaWill } from "./louisiana";
import { generateExecutionChecklist } from "./executionChecklist";

export function generateWill(answers: WillAnswers): GeneratedWill {
  const stateReqs = getStateByAbbreviation(answers.state);
  if (!stateReqs) throw new Error(`Unknown state: ${answers.state}`);

  // Louisiana gets its own generator
  if (answers.state === "LA") {
    return generateLouisianaWill(answers, stateReqs);
  }

  const fullName = [answers.fullName.first, answers.fullName.middle, answers.fullName.last]
    .filter(Boolean)
    .join(" ");

  const title = `LAST WILL AND TESTAMENT OF ${fullName.toUpperCase()}`;

  const isCPState = isCommunityPropertyState(answers.state);
  let preamble = `I, ${fullName}, of the City of ${answers.city}, County of ${answers.county}, State of ${stateReqs.state}, being of sound mind and disposing memory, and not acting under duress, menace, fraud, or undue influence of any person whomsoever, do hereby declare this to be my Last Will and Testament, and I hereby revoke all prior wills and codicils heretofore made by me.`;
  if (isCPState && answers.maritalStatus === "married") {
    preamble += ` I acknowledge that ${stateReqs.state} is a community property state. This Will disposes only of my separate property and my one-half interest in community property, as I am authorized to do under the laws of ${stateReqs.state}.`;
  }

  const articles: WillArticle[] = [];
  let articleNum = 1;

  // Article I — Family Declaration
  {
    let content = "";
    if (answers.maritalStatus === "married" && answers.spouseName) {
      content += `I declare that I am married to ${answers.spouseName}. `;
    } else if (answers.maritalStatus === "single") {
      content += "I declare that I am not married. ";
    } else if (answers.maritalStatus === "divorced") {
      content += "I declare that I am divorced. ";
      if (answers.exSpouseName) {
        content += `My former spouse is ${answers.exSpouseName}. Any provisions in any prior will in favor of my former spouse are hereby revoked and of no effect. `;
      }
    } else if (answers.maritalStatus === "widowed") {
      content += "I declare that I am widowed. ";
    }

    if (answers.children.length > 0) {
      const childNames = answers.children.map(
        (c) => `${c.name} (${c.relationship})`
      );
      content += `I have the following children: ${childNames.join("; ")}. `;
      const stepchildren = answers.children.filter((c) => c.relationship === "stepchild");
      if (stepchildren.length > 0) {
        content += `References to "my children" in this Will include my stepchild${stepchildren.length > 1 ? "ren" : ""} named above. `;
      }
    } else {
      content += "I declare that I have no children. ";
    }

    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — FAMILY DECLARATION`, content });
  }

  // Article II — Debts & Expenses
  {
    let content = "I direct my Executor to pay my legally enforceable debts, the expenses of my last illness, funeral expenses, and the costs of administering my estate from my general estate. ";
    if (answers.debtHandling === "specific" && answers.debtInstructions) {
      content += `Additionally, I direct the following: ${answers.debtInstructions} `;
    }
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — DEBTS AND EXPENSES`, content });
  }

  // Article III — Specific Bequests
  if (answers.specificBequests.length > 0) {
    let content = "";
    answers.specificBequests.forEach((b, i) => {
      content += `${i + 1}. I give ${b.item}${b.isRealEstate && b.propertyAddress ? ` (located at ${b.propertyAddress})` : ""} to ${b.recipient.name}, my ${b.recipient.relationship}. `;
      if (b.alternateDisposition === "their_children") {
        content += `If ${b.recipient.name} predeceases me, this gift shall pass to the then-living descendants of ${b.recipient.name}, per stirpes. `;
      } else if (b.alternateDisposition === "specific_person" && b.alternatePerson) {
        content += `If ${b.recipient.name} predeceases me, this gift shall pass to ${b.alternatePerson.name}. `;
      } else {
        content += `If ${b.recipient.name} predeceases me, this gift shall become part of my residuary estate. `;
      }
    });
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — SPECIFIC BEQUESTS`, content });
  }

  // Article IV — Residuary Estate
  {
    let content = "I give, devise, and bequeath all the rest, residue, and remainder of my estate, both real and personal, of whatever kind and wherever situated, which I may own or have the right to dispose of at the time of my death (my \"residuary estate\"), ";
    if (answers.residuaryType === "single" && answers.residuaryBeneficiaries[0]) {
      const b = answers.residuaryBeneficiaries[0];
      content += `to ${b.name}, my ${b.relationship}. `;
      if (answers.residuaryAlternate?.name) {
        content += `If ${b.name} predeceases me, I give my residuary estate to ${answers.residuaryAlternate.name}, my ${answers.residuaryAlternate.relationship}. `;
      }
    } else if (answers.residuaryType === "split") {
      content += "in the following shares: ";
      answers.residuaryBeneficiaries.forEach((b) => {
        content += `${b.percentage}% to ${b.name}, my ${b.relationship}; `;
      });
      if (answers.residuaryAlternateRule === "split_among_others") {
        content += "If any named beneficiary predeceases me, their share shall be divided equally among the surviving beneficiaries named above. ";
      } else if (answers.residuaryAlternateRule === "their_children") {
        content += "If any named beneficiary predeceases me, their share shall pass to their then-living descendants, per stirpes. ";
      }
    }
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — RESIDUARY ESTATE`, content });
  }

  // Article — Minor Children's Inheritance
  if (answers.inheritanceAge && answers.inheritanceAge > 18) {
    const content = `Any property distributable to a beneficiary who has not yet attained the age of ${answers.inheritanceAge} years shall be held in trust by my Executor or a trustee appointed by the court for the benefit of such beneficiary. The trustee may use the income and principal of the trust for the beneficiary's health, education, maintenance, and support. When the beneficiary attains the age of ${answers.inheritanceAge} years, the remaining trust property shall be distributed to the beneficiary outright and free of trust.`;
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — MINOR BENEFICIARY PROVISIONS`, content });
  }

  // Article — Digital Assets
  if (answers.includeDigitalAssets && answers.digitalExecutor?.name) {
    let content = `I appoint ${answers.digitalExecutor.name}, my ${answers.digitalExecutor.relationship}, as my digital executor with authority to access, manage, distribute, and dispose of my digital assets, including but not limited to email accounts, social media accounts, digital photographs, digital financial accounts, cryptocurrency, domain names, and other online accounts. `;
    if (answers.digitalInstructions) {
      content += `I direct the following specific instructions regarding my digital assets: ${answers.digitalInstructions} `;
    }
    if (answers.passwordManagerLocation) {
      content += `Information regarding access credentials may be found at the following location: ${answers.passwordManagerLocation}. `;
    }
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — DIGITAL ASSETS`, content });
  }

  // Article — Pet Care
  if (answers.pets.length > 0) {
    let content = "";
    answers.pets.forEach((p) => {
      content += `I request that ${p.caretaker.name}, my ${p.caretaker.relationship}, assume the care and custody of ${p.description}. `;
      if (p.careFund && p.careFundAmount) {
        content += `I direct my Executor to set aside the sum of $${p.careFundAmount.toLocaleString()} from my estate for the care and maintenance of said pet. `;
      }
    });
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — PET CARE`, content });
  }

  // Article — Guardian of Minor Children
  if (answers.guardian?.name) {
    let content = `In the event that I am the sole surviving parent of my minor children, or if both parents are deceased, I nominate and appoint ${answers.guardian.name}, my ${answers.guardian.relationship}, of ${answers.guardian.cityState || "address on file"}, as guardian of the person and property of my minor children. `;
    if (answers.alternateGuardian?.name) {
      content += `If ${answers.guardian.name} is unable or unwilling to serve, I nominate ${answers.alternateGuardian.name}, my ${answers.alternateGuardian.relationship}, as alternate guardian. `;
    }
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — GUARDIAN OF MINOR CHILDREN`, content });
  }

  // Article — Executor
  {
    let content = `I nominate and appoint ${answers.executor.name}, my ${answers.executor.relationship}, of ${answers.executor.cityState || "address on file"}, as Executor of this my Last Will and Testament. `;
    if (answers.alternateExecutor.name) {
      content += `If ${answers.executor.name} is unable or unwilling to serve, I nominate ${answers.alternateExecutor.name}, my ${answers.alternateExecutor.relationship}, as alternate Executor. `;
    }
    if (answers.waiveBond) {
      content += "I direct that my Executor shall serve without bond. ";
    }
    if (answers.executorCanSellProperty) {
      content += "I grant my Executor full power and authority to sell, lease, mortgage, or otherwise dispose of any real or personal property of my estate, at public or private sale, without court order, as my Executor deems necessary or advisable for the proper administration of my estate. ";
    }
    content += "I grant my Executor all powers allowable to executors under the laws of the State of " + stateReqs.state + ". ";
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — EXECUTOR`, content });
  }

  // Article — Simultaneous Death
  if (answers.simultaneousDeathBeneficiary?.name) {
    const primaryBeneficiary = answers.maritalStatus === "married" ? answers.spouseName : answers.residuaryBeneficiaries[0]?.name;
    const content = `If ${primaryBeneficiary || "my primary beneficiary"} and I shall die simultaneously, or under circumstances that make it impossible to determine which of us survived the other, it shall be conclusively presumed for purposes of this Will that I survived ${primaryBeneficiary || "said beneficiary"}. In such event, my estate shall pass to ${answers.simultaneousDeathBeneficiary.name}, my ${answers.simultaneousDeathBeneficiary.relationship}.`;
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — SIMULTANEOUS DEATH`, content });
  }

  // Article — Disinheritance
  if (answers.disinheritances.length > 0) {
    let content = "I have intentionally and with full knowledge omitted to provide for the following individual(s): ";
    answers.disinheritances.forEach((d, i) => {
      content += `${d.name}, my ${d.relationship}${i < answers.disinheritances.length - 1 ? "; " : ". "}`;
    });
    content += "This omission is intentional and not the result of accident or mistake. ";
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — INTENTIONAL OMISSION`, content });
  }

  // Article — No-Contest
  if (answers.includeNoContest) {
    let content = `If any beneficiary under this Will, or any person claiming under or through any beneficiary, shall contest or attack this Will or any of its provisions, any share or interest in my estate given to that contesting beneficiary under this Will is hereby revoked and shall be disposed of in the same manner provided herein as if that contesting beneficiary had predeceased me without issue.`;
    if (answers.state === "FL") {
      content += ` NOTE: Florida law (Fla. Stat. § 732.517) limits the enforceability of no-contest clauses. Under Florida's statute, a no-contest clause is unenforceable if the contestant has probable cause for the contest. This clause is included to express the Testator's intent but may not be fully enforceable under Florida law.`;
    } else if (answers.state === "IN") {
      content += ` NOTE: Indiana courts have historically disfavored no-contest clauses and may construe them narrowly. This clause is included to express the Testator's intent but its enforceability may be limited under Indiana law.`;
    }
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — NO-CONTEST CLAUSE`, content });
  }

  // Article — Final Wishes
  if (answers.funeralWishes) {
    let content = "I express the following wishes regarding my funeral and disposition of my remains: ";
    if (answers.funeralWishes.preferBurial) content += "I wish to be buried. ";
    if (answers.funeralWishes.preferCremation) content += "I wish to be cremated. ";
    if (answers.funeralWishes.specificLocation) content += `I wish to be interred at ${answers.funeralWishes.specificLocation}. `;
    if (answers.funeralWishes.religiousService) content += `I wish to have a religious service: ${answers.funeralWishes.religiousService}. `;
    if (answers.funeralWishes.otherInstructions) content += answers.funeralWishes.otherInstructions + " ";
    content += "These wishes are not legally binding but express my sincere desires. ";
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — FINAL WISHES`, content });
  }

  // Article — General Provisions
  {
    const content = `If any provision of this Will is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. This Will shall be governed by and construed in accordance with the laws of the State of ${stateReqs.state}. All references to "descendants" or "issue" in this Will shall mean lineal descendants of all degrees, and the distribution to such descendants shall be per stirpes.`;
    articles.push({ heading: `ARTICLE ${toRoman(articleNum++)} — GENERAL PROVISIONS`, content });
  }

  // Testimonium
  const minAge = stateReqs.minimum_age.standard;
  const minAgeWord = minAge === 18 ? "eighteen (18)" : minAge === 16 ? "sixteen (16)" : minAge === 14 ? "fourteen (14)" : `${minAge}`;
  const testimonium = `IN WITNESS WHEREOF, I, ${fullName}, the Testator, sign my name to this instrument this _______ day of _________________, 20_____, and being first duly sworn, do hereby declare to the undersigned authority that I sign and execute this instrument as my Last Will and Testament and that I sign it willingly, that I execute it as my free and voluntary act for the purposes therein expressed, and that I am ${minAgeWord} years of age or older, of sound mind, and under no constraint or undue influence.`;

  // Signature block
  const signatureBlock = `

________________________________________
${fullName}, Testator`;

  // Witness block
  const witnessCount = stateReqs.witness_requirements.count;
  let witnessBlock = "";
  if (witnessCount > 0) {
    const presenceRules = stateReqs.witness_requirements.presence_rules.toLowerCase();
    const requiresMutualPresence = presenceRules.includes("presence of each other") || presenceRules.includes("of each other");
    witnessBlock = `\nATTESTATION CLAUSE\n\nThe foregoing instrument was signed, published, and declared by the above-named Testator, ${fullName}, as their Last Will and Testament, in our presence, and we, at the Testator's request and in the Testator's presence${requiresMutualPresence ? " and in the presence of each other" : ""}, have subscribed our names as witnesses thereto. We declare under penalty of perjury that the foregoing is true and correct.\n`;

    for (let i = 1; i <= witnessCount; i++) {
      witnessBlock += `
________________________________________    ________________________________________
Witness ${i} Signature                          Printed Name

________________________________________    ________________________________________
Address                                      Date
`;
    }
  }

  // Self-proving affidavit — only render when witnesses exist. Pennsylvania's
  // state data has `witnessCount: 0` + `self_proving_affidavit.available: true`,
  // which previously produced a legally-nonsensical block with two named witness
  // signature lines. Skip the affidavit entirely when there are no witnesses;
  // otherwise loop the witness signature lines to match the actual count.
  let selfProvingAffidavit: string | undefined;
  if (stateReqs.self_proving_affidavit.available && witnessCount > 0) {
    const witnessSignatureLines = Array.from({ length: witnessCount }, (_, i) =>
      `________________________________________    ________________________________________\nWitness ${i + 1} Signature                          Printed Name`
    ).join("\n\n");

    selfProvingAffidavit = `
SELF-PROVING AFFIDAVIT

STATE OF ${stateReqs.state.toUpperCase()}
COUNTY OF ____________________

Before me, the undersigned authority, on this _______ day of _________________, 20_____, personally appeared ${fullName}, the Testator, and the witnesses whose names are signed to the foregoing instrument, and all being duly sworn, the Testator declared to me and to the witnesses that the foregoing instrument is the Testator's Last Will and Testament, and that the Testator had willingly signed and executed it as a free and voluntary act for the purposes therein expressed. Each of the witnesses stated that they signed the Will as witness in the presence and at the request of the Testator, and in the presence of each other.

________________________________________
${fullName}, Testator

${witnessSignatureLines}

Subscribed, sworn to, and acknowledged before me by ${fullName}, the Testator, and subscribed and sworn to before me by the witnesses, on this date.

________________________________________
Notary Public
My commission expires: ___________________
[NOTARY SEAL]
`;
  }

  return {
    title,
    preamble,
    articles,
    testimonium,
    signatureBlock,
    witnessBlock,
    selfProvingAffidavit,
    executionChecklist: generateExecutionChecklist(stateReqs, answers),
  };
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let result = "";
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}
