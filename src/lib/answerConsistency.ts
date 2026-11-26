import type { WillAnswers } from "./types";
import { getAge } from "./questionFlow";

/**
 * The questionnaire skips steps whose condition is false, but answers given on
 * those steps earlier stay in sessionStorage. A user who named a guardian and
 * then went back and chose "No children" would otherwise get a signed will that
 * says "I have no children" and also appoints a guardian for "my minor
 * children". This returns a copy of the answers with every answer whose
 * governing step is no longer active dropped. The conditions below mirror
 * `ALL_STEPS` in questionFlow.ts.
 */
const SPOUSE_RELATION = /^\s*(my\s+)?(spouse|husband|wife)\s*$/i;

export function hasMinorOrUnknownAgeChild(a: Pick<WillAnswers, "children">): boolean {
  return (a.children ?? []).some((c) => !c.dateOfBirth || getAge(c.dateOfBirth) < 18);
}

export function dropInactiveAnswers(input: WillAnswers): WillAnswers {
  const a: WillAnswers = { ...input, children: input.children ?? [] };

  // Guardians step: only when there is a minor (or unknown-age) child.
  if (!hasMinorOrUnknownAgeChild(a)) {
    delete a.guardian;
    delete a.alternateGuardian;
    delete a.inheritanceAge;
  }

  if (a.maritalStatus !== "married") {
    delete a.spouseName;
  }
  if (a.maritalStatus !== "divorced") {
    delete a.exSpouseName;
  }

  // Disinheritance step: married, or has children.
  const disinheritActive =
    a.maritalStatus === "married" || (a.hasChildren === true && a.children.length > 0);
  const dis = a.disinheritances ?? [];
  a.disinheritances = disinheritActive
    ? a.maritalStatus === "married"
      ? dis
      : dis.filter((d) => !SPOUSE_RELATION.test(d.relationship ?? ""))
    : [];

  // Simultaneous-death step: married, or a single residuary beneficiary.
  if (!(a.maritalStatus === "married" || a.residuaryType === "single")) {
    delete a.simultaneousDeathBeneficiary;
  }

  return a;
}

const MAX_NAME_PART = 100;

/** Problems that make a generated will wrong or empty. Empty array = OK. */
export function findIncompleteAnswers(a: Partial<WillAnswers> | null | undefined, minAge: number): string[] {
  const p: string[] = [];
  if (!a) return ["no answers"];
  if (!a.fullName?.first?.trim()) p.push("first name");
  if (!a.fullName?.last?.trim()) p.push("last name");
  for (const part of [a.fullName?.first, a.fullName?.middle, a.fullName?.last]) {
    if (part && part.length > MAX_NAME_PART) {
      p.push("name too long");
      break;
    }
  }
  if (!a.city?.trim()) p.push("city");
  if (!a.county?.trim()) p.push("county");
  if (!a.maritalStatus) p.push("marital status");
  if (!a.executor?.name?.trim()) p.push("executor");
  if (!a.alternateExecutor) p.push("alternate executor");

  if (!a.dateOfBirth) {
    p.push("date of birth");
  } else {
    const dob = new Date(a.dateOfBirth);
    if (Number.isNaN(dob.getTime())) p.push("date of birth");
    else {
      const age = getAge(a.dateOfBirth);
      if (age < minAge) p.push(`age under ${minAge}`);
      else if (age > 120) p.push("date of birth implausible");
    }
  }
  return p;
}
