import type { WillAnswers, StepDefinition } from "./types";

export const ALL_STEPS: StepDefinition[] = [
  { id: "state", label: "Your State", component: "StateSelection" },
  { id: "personal", label: "About You", component: "PersonalInfo" },
  { id: "family", label: "Marital Status", component: "FamilyStatus" },
  { id: "children", label: "Children", component: "Children" },
  {
    id: "guardians",
    label: "Guardians",
    component: "Guardians",
    // Show the step whenever there's ANY reason to name a guardian:
    // a confirmed minor child, OR any child whose date-of-birth was left
    // blank (previously the step was silently skipped for blank DOBs, which
    // cut off users who typed a child in but didn't finish the DOB field).
    condition: (a) =>
      a.children.some((c) => {
        if (!c.dateOfBirth) return true;
        return getAge(c.dateOfBirth) < 18;
      }),
  },
  { id: "executor", label: "Executor", component: "Executor" },
  { id: "bequests", label: "Specific Gifts", component: "SpecificBequests" },
  { id: "residuary", label: "Everything Else", component: "ResiduaryEstate" },
  { id: "digital", label: "Digital Life", component: "DigitalAssets" },
  { id: "debts", label: "Debts & Expenses", component: "DebtsAndExpenses" },
  { id: "funeral", label: "Final Wishes", component: "FinalWishes" },
  { id: "pets", label: "Pets", component: "PetCare" },
  {
    id: "disinherit",
    label: "Exclusions",
    component: "Disinheritance",
    condition: (a) =>
      a.maritalStatus === "married" ||
      (a.hasChildren === true && a.children.length > 0),
  },
  {
    id: "simultaneous",
    label: "Simultaneous Death",
    component: "SimultaneousDeath",
    condition: (a) =>
      a.maritalStatus === "married" || a.residuaryType === "single",
  },
  { id: "nocontest", label: "No-Contest Clause", component: "NoContest" },
  { id: "review", label: "Review", component: "ReviewAnswers" },
];

export function getActiveSteps(answers: WillAnswers): StepDefinition[] {
  return ALL_STEPS.filter(
    (step) => !step.condition || step.condition(answers)
  );
}

export function getAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
