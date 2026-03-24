// State data as it exists in all_states.json
export interface StateRequirements {
  state: string;
  abbreviation: string;
  minimum_age: { standard: number; exceptions: string };
  testamentary_capacity: string;
  writing_requirement: string;
  signature_requirement: {
    testator_must_sign: boolean;
    proxy_signing_allowed: boolean;
    proxy_signing_rules: string;
  };
  witness_requirements: {
    count: number;
    qualifications: string;
    presence_rules: string;
    interested_witness_rules: string;
  };
  notarization: { required: boolean; notes: string };
  self_proving_affidavit: { available: boolean; requirements: string };
  electronic_wills: { recognized: boolean; notes: string };
  holographic_wills: { recognized: boolean; notes: string };
  nuncupative_wills: { recognized: boolean; notes: string };
  revocation: { methods: string[]; notes: string };
  special_provisions: string;
  statute_citations: string[];
  last_researched: string;
}

// User answers collected by the questionnaire
export interface Child {
  name: string;
  dateOfBirth: string;
  relationship: "biological" | "adopted" | "stepchild";
  hasSpecialNeeds: boolean;
}

export interface Person {
  name: string;
  relationship: string;
}

export interface PersonWithLocation extends Person {
  cityState: string;
}

export interface SpecificBequest {
  item: string;
  recipient: Person;
  isRealEstate: boolean;
  propertyAddress?: string;
  alternateDisposition: "their_children" | "residuary" | "specific_person";
  alternatePerson?: Person;
}

export interface ResiduaryBeneficiary extends Person {
  percentage: number;
}

export interface Pet {
  description: string;
  caretaker: Person;
  careFund: boolean;
  careFundAmount?: number;
}

export interface WillAnswers {
  // Step 1
  state: string;

  // Step 2
  fullName: { first: string; middle: string; last: string };
  city: string;
  county: string;
  dateOfBirth: string;

  // Step 3
  maritalStatus: "single" | "married" | "divorced" | "widowed" | "";
  spouseName?: string;
  exSpouseName?: string;

  // Step 4
  hasChildren: boolean | null;
  children: Child[];

  // Step 5 (conditional)
  guardian?: PersonWithLocation;
  alternateGuardian?: PersonWithLocation;
  inheritanceAge?: number;

  // Step 6
  executor: PersonWithLocation;
  alternateExecutor: PersonWithLocation;
  waiveBond: boolean;
  executorCanSellProperty: boolean;

  // Step 7
  hasSpecificBequests: boolean | null;
  specificBequests: SpecificBequest[];

  // Step 8
  residuaryType: "single" | "split" | "";
  residuaryBeneficiaries: ResiduaryBeneficiary[];
  residuaryAlternate?: Person;
  residuaryAlternateRule?: "split_among_others" | "their_children" | "specific_person";

  // Step 9
  includeDigitalAssets: boolean | null;
  digitalExecutor?: Person;
  digitalInstructions?: string;
  hasPasswordManager: boolean | null;
  passwordManagerLocation?: string;

  // Step 10
  debtHandling: "general" | "specific" | "";
  debtInstructions?: string;

  // Step 11
  hasFuneralWishes: boolean | null;
  funeralWishes?: {
    preferBurial: boolean;
    preferCremation: boolean;
    specificLocation?: string;
    religiousService?: string;
    otherInstructions?: string;
  };

  // Step 12
  hasPets: boolean | null;
  pets: Pet[];

  // Step 13 (conditional)
  hasDisinheritances: boolean | null;
  disinheritances: Person[];

  // Step 14 (conditional)
  simultaneousDeathBeneficiary?: Person;

  // Step 15
  includeNoContest: boolean | null;
}

export const EMPTY_ANSWERS: WillAnswers = {
  state: "",
  fullName: { first: "", middle: "", last: "" },
  city: "",
  county: "",
  dateOfBirth: "",
  maritalStatus: "",
  hasChildren: null,
  children: [],
  executor: { name: "", relationship: "", cityState: "" },
  alternateExecutor: { name: "", relationship: "", cityState: "" },
  waiveBond: true,
  executorCanSellProperty: true,
  hasSpecificBequests: null,
  specificBequests: [],
  residuaryType: "",
  residuaryBeneficiaries: [],
  includeDigitalAssets: null,
  hasPasswordManager: null,
  debtHandling: "",
  hasFuneralWishes: null,
  hasPets: null,
  pets: [],
  hasDisinheritances: null,
  disinheritances: [],
  includeNoContest: null,
};

// Generated will output
export interface WillArticle {
  heading: string;
  content: string;
}

export interface GeneratedWill {
  title: string;
  preamble: string;
  articles: WillArticle[];
  testimonium: string;
  signatureBlock: string;
  witnessBlock: string;
  selfProvingAffidavit?: string;
  notarialAttestation?: string;
  executionChecklist: ChecklistItem[];
}

export interface ChecklistItem {
  step: number;
  title: string;
  description: string;
  required: boolean;
}

// Community property states
export const COMMUNITY_PROPERTY_STATES = [
  "AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI",
];

// Step definition for questionnaire flow
export interface StepDefinition {
  id: string;
  label: string;
  component: string;
  condition?: (answers: WillAnswers) => boolean;
}
