import type { WillAnswers, GeneratedWill, WillArticle, StateRequirements } from "./types";
import { generateExecutionChecklist } from "./executionChecklist";
import { getAge } from "./questionFlow";

export function generateLouisianaWill(
  answers: WillAnswers,
  stateReqs: StateRequirements
): GeneratedWill {
  const fullName = [answers.fullName.first, answers.fullName.middle, answers.fullName.last]
    .filter(Boolean)
    .join(" ");

  const title = `NOTARIAL TESTAMENT OF ${fullName.toUpperCase()}`;

  let preamble = `BE IT KNOWN that on this _______ day of _________________, 20_____, before me, the undersigned Notary Public, duly commissioned and qualified in and for the State of Louisiana, and in the presence of the undersigned competent witnesses, personally came and appeared ${fullName}, of the City of ${answers.city}, Parish of ${answers.county}, State of Louisiana, who declared that ${answers.fullName.first} is of sound mind, is of the age of majority, is not acting under duress, menace, fraud, or undue influence, and that ${answers.fullName.first} desires to make this Notarial Testament, revoking all prior testaments and codicils.`;
  if (answers.maritalStatus === "married") {
    preamble += ` The Testator acknowledges that Louisiana is a community property state. This testament disposes only of the Testator's separate property and the Testator's one-half interest in community property, as authorized under the laws of Louisiana.`;
  }

  const articles: WillArticle[] = [];
  let articleNum = 1;

  // Family Declaration
  {
    let content = "";
    if (answers.maritalStatus === "married" && answers.spouseName) {
      content += `The Testator declares that ${answers.fullName.first} is married to ${answers.spouseName}. `;
    } else if (answers.maritalStatus === "single") {
      content += "The Testator declares that they are not married. ";
    } else if (answers.maritalStatus === "divorced") {
      content += "The Testator declares that they are divorced. ";
    } else if (answers.maritalStatus === "widowed") {
      content += "The Testator declares that they are widowed. ";
    }
    if (answers.children.length > 0) {
      content += `The Testator has the following children: ${answers.children.map((c) => `${c.name} (${c.relationship})`).join("; ")}. `;
    } else {
      content += "The Testator declares that they have no children. ";
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — FAMILY DECLARATION`, content });
  }

  // Forced heirship
  const forcedHeirs = answers.children.filter(
    (c) => c.dateOfBirth && (getAge(c.dateOfBirth) < 24 || c.hasSpecialNeeds)
  );
  if (forcedHeirs.length > 0) {
    const portion = forcedHeirs.length === 1 ? "one-quarter (1/4)" : "one-half (1/2)";
    let content = `Pursuant to Louisiana Civil Code Article 1493, the Testator acknowledges the following forced heir(s): ${forcedHeirs.map((c) => c.name).join("; ")}. `;
    content += `The Testator hereby bequeaths the forced portion of ${portion} of the estate to the forced heir(s), to be divided equally among them. `;
    content += "The Testator disposes of the disposable portion of the estate as set forth in the following articles. ";
    articles.push({ heading: `ARTICLE ${articleNum++} — FORCED HEIRSHIP`, content });
  }

  // Debts
  {
    let content = "The Testator directs that all just debts, funeral expenses, and expenses of last illness be paid from the estate. ";
    if (answers.debtHandling === "specific" && answers.debtInstructions) {
      content += answers.debtInstructions + " ";
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — DEBTS AND EXPENSES`, content });
  }

  // Specific bequests
  if (answers.specificBequests.length > 0) {
    let content = "";
    answers.specificBequests.forEach((b, i) => {
      content += `${i + 1}. The Testator bequeaths ${b.item} to ${b.recipient.name}, ${b.recipient.relationship} of the Testator. `;
      if (b.alternateDisposition === "their_children") {
        content += `Should ${b.recipient.name} predecease the Testator, this legacy shall pass to the descendants of ${b.recipient.name}. `;
      } else if (b.alternateDisposition === "residuary") {
        content += `Should ${b.recipient.name} predecease the Testator, this legacy shall fall into the residuary estate. `;
      }
    });
    articles.push({ heading: `ARTICLE ${articleNum++} — PARTICULAR LEGACIES`, content });
  }

  // Residuary
  {
    let content = "The Testator bequeaths the residue of the disposable portion of the estate, including all property not otherwise disposed of herein, ";
    if (answers.residuaryType === "single" && answers.residuaryBeneficiaries[0]) {
      content += `to ${answers.residuaryBeneficiaries[0].name}, ${answers.residuaryBeneficiaries[0].relationship} of the Testator. `;
      if (answers.residuaryAlternate?.name) {
        content += `Should the above legatee predecease the Testator, the residuary estate shall pass to ${answers.residuaryAlternate.name}. `;
      }
    } else if (answers.residuaryType === "split") {
      content += "in the following proportions: ";
      answers.residuaryBeneficiaries.forEach((b) => {
        content += `${b.percentage}% to ${b.name}; `;
      });
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — UNIVERSAL LEGACY (RESIDUARY)`, content });
  }

  // Guardian
  if (answers.guardian?.name) {
    let content = `The Testator nominates ${answers.guardian.name} as tutor of any minor children. `;
    if (answers.alternateGuardian?.name) {
      content += `Should ${answers.guardian.name} be unable or unwilling to serve, the Testator nominates ${answers.alternateGuardian.name} as alternate tutor. `;
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — TUTORSHIP OF MINOR CHILDREN`, content });
  }

  // Executor
  {
    let content = `The Testator appoints ${answers.executor.name} as Executor of this testament with full seizin. `;
    if (answers.alternateExecutor.name) {
      content += `Should ${answers.executor.name} be unable or unwilling to serve, the Testator appoints ${answers.alternateExecutor.name} as successor Executor. `;
    }
    if (answers.waiveBond) {
      content += "The Executor shall serve without bond. ";
    }
    if (answers.executorCanSellProperty) {
      content += "The Executor is granted the power to sell, lease, mortgage, or otherwise dispose of estate property without court authorization. ";
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — EXECUTOR`, content });
  }

  // Disinheritance (limited in LA)
  if (answers.disinheritances.length > 0) {
    const nonForcedDisinherited = answers.disinheritances.filter(
      (d) => !forcedHeirs.some((fh) => fh.name === d.name)
    );
    if (nonForcedDisinherited.length > 0) {
      const content = `The Testator intentionally omits the following: ${nonForcedDisinherited.map((d) => `${d.name} (${d.relationship})`).join("; ")}. This omission is deliberate and not the result of error.`;
      articles.push({ heading: `ARTICLE ${articleNum++} — INTENTIONAL OMISSION`, content });
    }
  }

  // Minor Children's Inheritance
  if (answers.inheritanceAge && answers.inheritanceAge > 18) {
    const content = `Any property distributable to a beneficiary who has not yet attained the age of ${answers.inheritanceAge} years shall be held in trust by the Executor or a trustee appointed by the court for the benefit of such beneficiary. The trustee may use the income and principal of the trust for the beneficiary's health, education, maintenance, and support. When the beneficiary attains the age of ${answers.inheritanceAge} years, the remaining trust property shall be distributed to the beneficiary outright and free of trust.`;
    articles.push({ heading: `ARTICLE ${articleNum++} — MINOR BENEFICIARY PROVISIONS`, content });
  }

  // Digital Assets
  if (answers.includeDigitalAssets && answers.digitalExecutor?.name) {
    let content = `The Testator appoints ${answers.digitalExecutor.name}, ${answers.digitalExecutor.relationship} of the Testator, as digital executor with authority to access, manage, distribute, and dispose of the Testator's digital assets, including but not limited to email accounts, social media accounts, digital photographs, digital financial accounts, cryptocurrency, domain names, and other online accounts. `;
    if (answers.digitalInstructions) {
      content += `The Testator directs the following specific instructions regarding digital assets: ${answers.digitalInstructions} `;
    }
    if (answers.passwordManagerLocation) {
      content += `Information regarding access credentials may be found at the following location: ${answers.passwordManagerLocation}. `;
    }
    articles.push({ heading: `ARTICLE ${articleNum++} — DIGITAL ASSETS`, content });
  }

  // Pet Care
  if (answers.pets.length > 0) {
    let content = "";
    answers.pets.forEach((p) => {
      content += `The Testator requests that ${p.caretaker.name}, ${p.caretaker.relationship} of the Testator, assume the care and custody of ${p.description}. `;
      if (p.careFund && p.careFundAmount) {
        content += `The Testator directs the Executor to set aside the sum of $${p.careFundAmount.toLocaleString()} from the estate for the care and maintenance of said pet. `;
      }
    });
    articles.push({ heading: `ARTICLE ${articleNum++} — PET CARE`, content });
  }

  // Simultaneous Death
  if (answers.simultaneousDeathBeneficiary?.name) {
    const primaryBeneficiary = answers.maritalStatus === "married" ? answers.spouseName : answers.residuaryBeneficiaries[0]?.name;
    const content = `If ${primaryBeneficiary || "the primary beneficiary"} and the Testator shall die simultaneously, or under circumstances that make it impossible to determine which survived the other, it shall be conclusively presumed for purposes of this testament that the Testator survived ${primaryBeneficiary || "said beneficiary"}. In such event, the estate shall pass to ${answers.simultaneousDeathBeneficiary.name}, ${answers.simultaneousDeathBeneficiary.relationship} of the Testator.`;
    articles.push({ heading: `ARTICLE ${articleNum++} — SIMULTANEOUS DEATH`, content });
  }

  // No-Contest
  if (answers.includeNoContest) {
    const content = `If any legatee under this testament, or any person claiming under or through any legatee, shall contest or attack this testament or any of its provisions, any legacy given to that contesting legatee under this testament is hereby revoked and shall be disposed of as if that contesting legatee had predeceased the Testator without issue.`;
    articles.push({ heading: `ARTICLE ${articleNum++} — NO-CONTEST CLAUSE`, content });
  }

  // Final Wishes
  if (answers.funeralWishes) {
    let content = "The Testator expresses the following wishes regarding funeral and disposition of remains: ";
    if (answers.funeralWishes.preferBurial) content += "The Testator wishes to be buried. ";
    if (answers.funeralWishes.preferCremation) content += "The Testator wishes to be cremated. ";
    if (answers.funeralWishes.specificLocation) content += `The Testator wishes to be interred at ${answers.funeralWishes.specificLocation}. `;
    if (answers.funeralWishes.religiousService) content += `The Testator wishes to have a religious service: ${answers.funeralWishes.religiousService}. `;
    if (answers.funeralWishes.otherInstructions) content += answers.funeralWishes.otherInstructions + " ";
    content += "These wishes are not legally binding but express the Testator's sincere desires. ";
    articles.push({ heading: `ARTICLE ${articleNum++} — FINAL WISHES`, content });
  }

  // General provisions
  articles.push({
    heading: `ARTICLE ${articleNum++} — GENERAL PROVISIONS`,
    content: "This testament shall be governed by and construed in accordance with the laws of the State of Louisiana. If any provision is held invalid, the remaining provisions shall remain in effect. All references to \"descendants\" or \"issue\" in this testament shall mean lineal descendants of all degrees, and the distribution to such descendants shall be per stirpes.",
  });

  const testimonium = `Thus done and signed by the Testator, ${fullName}, at the end of this testament and at the bottom of each other separate page, in the presence of the undersigned Notary Public and witnesses, after the Testator declared and signified to the Notary Public and witnesses that this instrument is the Testator's testament, and after this testament was read aloud by the Testator (or by the Notary at the Testator's request), all in the City of ${answers.city}, Parish of ${answers.county}, State of Louisiana.`;

  const signatureBlock = `

________________________________________
${fullName}, Testator

(Testator must also initial each additional page: ______)`;

  const witnessBlock = `
WITNESSES

The foregoing testament was declared by the Testator, in our presence, to be the Testator's testament. The Testator signed at the end and on each other separate page in our presence and in the presence of the Notary. We have signed our names below in the presence of the Testator and the Notary.

________________________________________    ________________________________________
Witness 1 Signature                          Printed Name

________________________________________    ________________________________________
Address                                      Date

________________________________________    ________________________________________
Witness 2 Signature                          Printed Name

________________________________________    ________________________________________
Address                                      Date`;

  const notarialAttestation = `
NOTARIAL ATTESTATION

Sworn to and subscribed before me, Notary Public, by ${fullName}, Testator, and the above-named witnesses, in the City of ${answers.city}, Parish of ${answers.county}, State of Louisiana, on this _______ day of _________________, 20_____.

________________________________________
Notary Public
Printed Name: __________________________
Bar Roll No.: __________________________
Commission: ____________________________
[NOTARIAL SEAL]`;

  return {
    title,
    preamble,
    articles,
    testimonium,
    signatureBlock,
    witnessBlock,
    notarialAttestation,
    executionChecklist: generateExecutionChecklist(stateReqs, answers),
  };
}
