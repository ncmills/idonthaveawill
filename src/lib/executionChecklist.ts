import type { StateRequirements, WillAnswers, ChecklistItem } from "./types";

export function generateExecutionChecklist(
  stateReqs: StateRequirements,
  answers: WillAnswers
): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  let step = 1;

  // Print
  items.push({
    step: step++,
    title: "Print your will",
    description:
      "Print your will on standard letter-size paper. Print single-sided for clarity. You'll need the original — photocopies don't count.",
    required: true,
  });

  // Read through
  items.push({
    step: step++,
    title: "Read the entire will carefully",
    description:
      "Read every word before signing. Make sure all names are spelled correctly and all provisions match your wishes. If anything is wrong, go back and fix it before printing again.",
    required: true,
  });

  // Gather witnesses
  const witnessCount = stateReqs.witness_requirements.count;
  if (witnessCount > 0) {
    let desc = `You need ${witnessCount} witness${witnessCount > 1 ? "es" : ""}. `;
    desc += stateReqs.witness_requirements.qualifications + ". ";
    if (stateReqs.witness_requirements.interested_witness_rules) {
      desc += "Note: " + stateReqs.witness_requirements.interested_witness_rules;
    }
    items.push({
      step: step++,
      title: `Gather ${witnessCount} witnesses`,
      description: desc,
      required: true,
    });
  } else {
    // Pennsylvania
    items.push({
      step: step++,
      title: "Gather 2 witnesses (recommended)",
      description:
        "Pennsylvania doesn't require witnesses when you sign, but having 2 witnesses is strongly recommended. It makes probate much easier and protects against challenges.",
      required: false,
    });
  }

  // NY publication requirement
  if (answers.state === "NY") {
    items.push({
      step: step++,
      title: "Declare to your witnesses that this is your will",
      description:
        "New York requires a 'publication' step: you must tell each witness that this document is your will. You don't need to let them read it — just tell them what it is. This is a legal requirement in New York (EPTL § 3-2.1).",
      required: true,
    });
  }

  // Sign
  if (answers.state === "LA") {
    items.push({
      step: step++,
      title: "Sign at the end AND initial each page",
      description:
        "Louisiana requires you to sign at the end of the testament AND initial (or sign) the bottom of each additional page. Do this in the presence of your notary and both witnesses.",
      required: true,
    });
  } else {
    items.push({
      step: step++,
      title: "Sign the will",
      description: `Sign at the end of the will ${witnessCount > 0 ? "in the presence of your witnesses" : ""}. Use your full legal name as it appears in the will. Use a pen with blue or black ink.`,
      required: true,
    });
  }

  // Witnesses sign
  if (witnessCount > 0) {
    let desc = `Each witness signs the will ${stateReqs.witness_requirements.presence_rules}. `;
    if (stateReqs.state === "Vermont") {
      desc +=
        "Vermont specifically requires witnesses to sign in the presence of EACH OTHER as well as the testator. ";
    }
    if (stateReqs.state === "Florida") {
      desc +=
        "Florida requires witnesses to sign in the presence of each other and the testator. ";
    }
    items.push({
      step: step++,
      title: "Witnesses sign the will",
      description: desc,
      required: true,
    });
  }

  // Notarization
  if (stateReqs.notarization.required) {
    items.push({
      step: step++,
      title: "Get the will notarized (REQUIRED)",
      description: `In ${stateReqs.state}, notarization is REQUIRED for your will to be valid. ${stateReqs.notarization.notes}`,
      required: true,
    });
  } else if (stateReqs.self_proving_affidavit.available) {
    items.push({
      step: step++,
      title: "Get the self-proving affidavit notarized (strongly recommended)",
      description: `Take the will to a notary public. You and your witnesses sign the self-proving affidavit in front of the notary. This is optional but STRONGLY recommended — it means your witnesses won't need to testify in probate court later, which saves your family time and money.`,
      required: false,
    });
  }

  // Store safely
  items.push({
    step: step++,
    title: "Store the original will safely",
    description:
      "Keep the original in a fireproof safe, a bank safe deposit box, or with your attorney. Do NOT store it only on a computer — the original signed paper document is what the court needs. Do NOT staple, paper-clip, or alter the will after signing.",
    required: true,
  });

  // Notify executor
  items.push({
    step: step++,
    title: `Tell ${answers.executor.name || "your executor"} where the will is`,
    description:
      "Let your executor know they've been named, and tell them where to find the original will. Consider giving a copy (marked 'COPY') to your executor for reference.",
    required: true,
  });

  // Consider telling beneficiaries
  items.push({
    step: step++,
    title: "Consider notifying your beneficiaries",
    description:
      "You're not required to tell anyone what's in your will, but letting key people know you HAVE a will (and where it is) can prevent confusion later.",
    required: false,
  });

  return items;
}
