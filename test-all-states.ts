/**
 * Comprehensive test script for the will generation engine across all 51 jurisdictions.
 * Run with: npx tsx test-all-states.ts
 */

import { generateWill } from "./src/lib/willGenerator";
import { getAllStates, getStateByAbbreviation, isCommunityPropertyState } from "./src/lib/stateData";
import type { WillAnswers, StateRequirements } from "./src/lib/types";
import { EMPTY_ANSWERS } from "./src/lib/types";

// ---------------------------------------------------------------------------
// Test infrastructure
// ---------------------------------------------------------------------------

interface TestFailure {
  state: string;
  profile: string;
  message: string;
}

let totalTests = 0;
let totalPasses = 0;
const failures: TestFailure[] = [];

function assert(
  condition: boolean,
  state: string,
  profile: string,
  message: string
) {
  totalTests++;
  if (condition) {
    totalPasses++;
  } else {
    failures.push({ state, profile, message });
  }
}

// ---------------------------------------------------------------------------
// Test profiles
// ---------------------------------------------------------------------------

const CP_STATES = ["AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI"];

function makeProfileA(abbr: string): WillAnswers {
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "John", middle: "Michael", last: "Smith" },
    city: "Testville",
    county: "Testington",
    dateOfBirth: "1980-06-15",
    maritalStatus: "married",
    spouseName: "Jane Smith",
    hasChildren: true,
    children: [
      { name: "Alice Smith", dateOfBirth: "2015-03-10", relationship: "biological", hasSpecialNeeds: false },
      { name: "Bob Smith", dateOfBirth: "2018-07-22", relationship: "biological", hasSpecialNeeds: false },
    ],
    guardian: { name: "Mary Johnson", relationship: "sister", cityState: "Otherville, ST" },
    alternateGuardian: { name: "Tom Johnson", relationship: "brother-in-law", cityState: "Otherville, ST" },
    inheritanceAge: 25,
    executor: { name: "Jane Smith", relationship: "spouse", cityState: "Testville, ST" },
    alternateExecutor: { name: "Mary Johnson", relationship: "sister", cityState: "Otherville, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: true,
    specificBequests: [
      {
        item: "my antique grandfather clock",
        recipient: { name: "Alice Smith", relationship: "daughter" },
        isRealEstate: false,
        alternateDisposition: "residuary",
      },
      {
        item: "my lakefront cabin",
        recipient: { name: "Bob Smith", relationship: "son" },
        isRealEstate: true,
        propertyAddress: "123 Lake Rd, Testville",
        alternateDisposition: "their_children",
      },
    ],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Jane Smith", relationship: "spouse", percentage: 100 }],
    residuaryAlternate: { name: "Alice Smith", relationship: "daughter" },
    includeDigitalAssets: true,
    digitalExecutor: { name: "Jane Smith", relationship: "spouse" },
    digitalInstructions: "Archive all photos; delete social media accounts.",
    hasPasswordManager: true,
    passwordManagerLocation: "1Password family vault",
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: true,
    pets: [
      {
        description: "my golden retriever, Buddy",
        caretaker: { name: "Mary Johnson", relationship: "sister" },
        careFund: true,
        careFundAmount: 5000,
      },
    ],
    hasDisinheritances: false,
    disinheritances: [],
    includeNoContest: true,
  };
}

function makeProfileB(abbr: string): WillAnswers {
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "Sarah", middle: "", last: "Davis" },
    city: "Simpletown",
    county: "Simpleton",
    dateOfBirth: "1975-01-20",
    maritalStatus: "single",
    hasChildren: false,
    children: [],
    executor: { name: "Mark Davis", relationship: "brother", cityState: "Simpletown, ST" },
    alternateExecutor: { name: "Lisa Davis", relationship: "sister", cityState: "Faraway, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: false,
    specificBequests: [],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Mark Davis", relationship: "brother", percentage: 100 }],
    residuaryAlternate: { name: "Lisa Davis", relationship: "sister" },
    includeDigitalAssets: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: false,
    disinheritances: [],
    includeNoContest: false,
  };
}

function makeProfileC(abbr: string): WillAnswers {
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "Robert", middle: "James", last: "Williams" },
    city: "Divorceburg",
    county: "Splitshire",
    dateOfBirth: "1960-11-05",
    maritalStatus: "divorced",
    exSpouseName: "Karen Williams",
    hasChildren: true,
    children: [
      { name: "David Williams", dateOfBirth: "1990-04-01", relationship: "biological", hasSpecialNeeds: false },
      { name: "Emily Williams", dateOfBirth: "1993-08-15", relationship: "biological", hasSpecialNeeds: false },
    ],
    executor: { name: "David Williams", relationship: "son", cityState: "Divorceburg, ST" },
    alternateExecutor: { name: "Emily Williams", relationship: "daughter", cityState: "Elsewhere, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: false,
    specificBequests: [],
    residuaryType: "split",
    residuaryBeneficiaries: [
      { name: "David Williams", relationship: "son", percentage: 50 },
      { name: "Emily Williams", relationship: "daughter", percentage: 50 },
    ],
    residuaryAlternateRule: "their_children",
    includeDigitalAssets: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: true,
    disinheritances: [{ name: "Karen Williams", relationship: "ex-spouse" }],
    includeNoContest: false,
  };
}

function makeProfileD(abbr: string): WillAnswers {
  // Community property awareness — only meaningful for CP states
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "Maria", middle: "Elena", last: "Garcia" },
    city: "Communidad",
    county: "Propshire",
    dateOfBirth: "1970-02-14",
    maritalStatus: "married",
    spouseName: "Carlos Garcia",
    hasChildren: true,
    children: [
      { name: "Sofia Garcia", dateOfBirth: "2000-05-20", relationship: "biological", hasSpecialNeeds: false },
    ],
    executor: { name: "Carlos Garcia", relationship: "spouse", cityState: "Communidad, ST" },
    alternateExecutor: { name: "Sofia Garcia", relationship: "daughter", cityState: "Communidad, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: false,
    specificBequests: [],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Carlos Garcia", relationship: "spouse", percentage: 100 }],
    residuaryAlternate: { name: "Sofia Garcia", relationship: "daughter" },
    includeDigitalAssets: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: false,
    disinheritances: [],
    includeNoContest: false,
  };
}

function makeProfileE(abbr: string): WillAnswers {
  // Married with special needs child
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "Patricia", middle: "Ann", last: "Thompson" },
    city: "Careville",
    county: "Carington",
    dateOfBirth: "1972-09-30",
    maritalStatus: "married",
    spouseName: "Michael Thompson",
    hasChildren: true,
    children: [
      { name: "Ryan Thompson", dateOfBirth: "2005-12-01", relationship: "biological", hasSpecialNeeds: true },
      { name: "Emma Thompson", dateOfBirth: "2008-03-15", relationship: "biological", hasSpecialNeeds: false },
    ],
    guardian: { name: "Susan Lee", relationship: "sister", cityState: "Careville, ST" },
    alternateGuardian: { name: "David Lee", relationship: "brother-in-law", cityState: "Careville, ST" },
    inheritanceAge: 21,
    executor: { name: "Michael Thompson", relationship: "spouse", cityState: "Careville, ST" },
    alternateExecutor: { name: "Susan Lee", relationship: "sister", cityState: "Careville, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: false,
    specificBequests: [],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Michael Thompson", relationship: "spouse", percentage: 100 }],
    residuaryAlternate: { name: "Ryan Thompson", relationship: "son" },
    includeDigitalAssets: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: false,
    disinheritances: [],
    includeNoContest: false,
  };
}

// ---------------------------------------------------------------------------
// Additional profile for FL homestead and elective share testing
// ---------------------------------------------------------------------------

function makeProfileFLHomestead(abbr: string): WillAnswers {
  // Married FL user with real estate bequests (triggers homestead warning)
  return {
    ...makeProfileA(abbr),
    state: abbr,
  };
}

function makeProfileElectiveShare(abbr: string): WillAnswers {
  // Married, disinheriting spouse (triggers elective share warning)
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "George", middle: "Henry", last: "Baker" },
    city: "Electville",
    county: "Electshire",
    dateOfBirth: "1965-04-10",
    maritalStatus: "married",
    spouseName: "Helen Baker",
    hasChildren: false,
    children: [],
    executor: { name: "Thomas Baker", relationship: "brother", cityState: "Electville, ST" },
    alternateExecutor: { name: "Nancy Baker", relationship: "sister", cityState: "Electville, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: false,
    specificBequests: [],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Thomas Baker", relationship: "brother", percentage: 100 }],
    includeDigitalAssets: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: true,
    disinheritances: [{ name: "Helen Baker", relationship: "spouse" }],
    includeNoContest: false,
  };
}

// ---------------------------------------------------------------------------
// Run tests
// ---------------------------------------------------------------------------

const allStates = getAllStates();
console.log(`Found ${allStates.length} states/jurisdictions.\n`);

for (const stateReqs of allStates) {
  const abbr = stateReqs.abbreviation;
  const stateName = stateReqs.state;
  const isCP = isCommunityPropertyState(abbr);
  const witnessCount = stateReqs.witness_requirements.count;
  const hasSPA = stateReqs.self_proving_affidavit.available;
  const minAge = stateReqs.minimum_age.standard;

  // =========================================================================
  // Profile A: Married with 2 minor children, bequests, digital, pets, no-contest
  // =========================================================================
  {
    const profile = "A";
    const answers = makeProfileA(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    // Title
    assert(will.title.length > 0, abbr, profile, "Will title is empty");
    if (abbr === "LA") {
      assert(will.title.includes("NOTARIAL TESTAMENT"), abbr, profile, "LA title missing NOTARIAL TESTAMENT");
    } else {
      assert(will.title.includes("LAST WILL AND TESTAMENT"), abbr, profile, "Title missing LAST WILL AND TESTAMENT");
    }

    // Preamble contains state name
    assert(will.preamble.includes(stateName), abbr, profile, `Preamble missing state name "${stateName}"`);

    // Community property acknowledgment
    if (isCP) {
      assert(
        will.preamble.includes("community property"),
        abbr, profile, "CP state preamble missing community property acknowledgment"
      );
    }

    // Witness signature lines
    const witnessLineMatches = will.witnessBlock.match(/Witness \d+ Signature/g) || [];
    assert(
      witnessLineMatches.length === witnessCount,
      abbr, profile,
      `Expected ${witnessCount} witness signature lines, got ${witnessLineMatches.length}`
    );

    // Self-proving affidavit
    if (abbr === "LA") {
      assert(
        will.notarialAttestation !== undefined && will.notarialAttestation!.includes("NOTARIAL ATTESTATION"),
        abbr, profile, "LA missing notarial attestation"
      );
    } else if (hasSPA) {
      assert(
        will.selfProvingAffidavit !== undefined && will.selfProvingAffidavit!.includes("SELF-PROVING AFFIDAVIT"),
        abbr, profile, "Self-proving affidavit missing when state supports it"
      );
    }

    // Testimonium age (Louisiana uses civil law format without age in testimonium)
    if (abbr !== "LA") {
      const expectedAgeWord = minAge === 18 ? "eighteen (18)" : minAge === 16 ? "sixteen (16)" : minAge === 14 ? "fourteen (14)" : `${minAge}`;
      assert(
        will.testimonium.includes(expectedAgeWord),
        abbr, profile, `Testimonium missing age word "${expectedAgeWord}"`
      );
    }

    // Presence of each other for FL, VT, NM
    if (["FL", "VT", "NM"].includes(abbr)) {
      assert(
        will.witnessBlock.includes("in the presence of each other"),
        abbr, profile, "Witness block missing 'in the presence of each other'"
      );
    }

    // No-contest clause with FL/IN caveats
    const noContestArticle = will.articles.find((a) => a.heading.includes("NO-CONTEST"));
    assert(noContestArticle !== undefined, abbr, profile, "No-contest article missing");
    if (noContestArticle) {
      if (abbr === "FL") {
        assert(
          noContestArticle.content.includes("Florida law"),
          abbr, profile, "FL no-contest missing Florida caveat"
        );
      }
      if (abbr === "IN") {
        assert(
          noContestArticle.content.includes("Indiana courts"),
          abbr, profile, "IN no-contest missing Indiana caveat"
        );
      }
    }

    // Guardian article
    const guardianArticle = will.articles.find((a) =>
      a.heading.includes("GUARDIAN") || a.heading.includes("TUTORSHIP")
    );
    assert(guardianArticle !== undefined, abbr, profile, "Guardian article missing for minor children");

    // Digital assets article
    const digitalArticle = will.articles.find((a) => a.heading.includes("DIGITAL ASSETS"));
    assert(digitalArticle !== undefined, abbr, profile, "Digital assets article missing");

    // Pet care article
    const petArticle = will.articles.find((a) => a.heading.includes("PET CARE"));
    assert(petArticle !== undefined, abbr, profile, "Pet care article missing");

    // Execution checklist is non-empty
    assert(will.executionChecklist.length > 0, abbr, profile, "Execution checklist is empty");

    // Execution checklist witness step mentions correct count
    const witnessStep = will.executionChecklist.find((item) =>
      item.title.toLowerCase().includes("witness")
    );
    if (witnessCount > 0) {
      assert(
        witnessStep !== undefined && witnessStep!.title.includes(String(witnessCount)),
        abbr, profile, `Checklist witness step missing or doesn't mention ${witnessCount} witnesses`
      );
    }
  }

  // =========================================================================
  // Profile B: Single, no children, simple residuary
  // =========================================================================
  {
    const profile = "B";
    const answers = makeProfileB(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    assert(will.title.length > 0, abbr, profile, "Will title is empty");
    assert(will.preamble.includes(stateName), abbr, profile, `Preamble missing state name "${stateName}"`);

    // Should NOT have community property language (single person)
    if (isCP) {
      assert(
        !will.preamble.includes("community property"),
        abbr, profile, "CP acknowledgment should not appear for single person"
      );
    }

    // Should NOT have guardian, digital assets, pets, disinheritance, or no-contest
    assert(
      !will.articles.some((a) => a.heading.includes("GUARDIAN") || a.heading.includes("TUTORSHIP")),
      abbr, profile, "Guardian article should not appear (no children)"
    );
    assert(
      !will.articles.some((a) => a.heading.includes("DIGITAL ASSETS")),
      abbr, profile, "Digital assets article should not appear"
    );
    assert(
      !will.articles.some((a) => a.heading.includes("PET CARE")),
      abbr, profile, "Pet care article should not appear"
    );
    assert(
      !will.articles.some((a) => a.heading.includes("INTENTIONAL OMISSION") || a.heading.includes("DISINHERITANCE")),
      abbr, profile, "Disinheritance article should not appear"
    );
    assert(
      !will.articles.some((a) => a.heading.includes("NO-CONTEST")),
      abbr, profile, "No-contest article should not appear"
    );

    assert(will.executionChecklist.length > 0, abbr, profile, "Execution checklist is empty");
  }

  // =========================================================================
  // Profile C: Divorced with adult children, disinheritance
  // =========================================================================
  {
    const profile = "C";
    const answers = makeProfileC(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    assert(will.title.length > 0, abbr, profile, "Will title is empty");
    assert(will.preamble.includes(stateName), abbr, profile, `Preamble missing state name "${stateName}"`);

    // Disinheritance article
    const disinheritArticle = will.articles.find((a) => a.heading.includes("INTENTIONAL OMISSION"));
    assert(disinheritArticle !== undefined, abbr, profile, "Disinheritance/omission article missing");

    // Should NOT have guardian (adult children)
    assert(
      !will.articles.some((a) => a.heading.includes("GUARDIAN") || a.heading.includes("TUTORSHIP")),
      abbr, profile, "Guardian article should not appear (adult children)"
    );

    assert(will.executionChecklist.length > 0, abbr, profile, "Execution checklist is empty");
  }

  // =========================================================================
  // Profile D: Married, community property awareness (CP states only)
  // =========================================================================
  if (isCP) {
    const profile = "D";
    const answers = makeProfileD(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    assert(will.title.length > 0, abbr, profile, "Will title is empty");
    assert(will.preamble.includes(stateName), abbr, profile, `Preamble missing state name "${stateName}"`);
    assert(
      will.preamble.includes("community property"),
      abbr, profile, "CP state preamble missing community property acknowledgment (married)"
    );

    assert(will.executionChecklist.length > 0, abbr, profile, "Execution checklist is empty");
  }

  // =========================================================================
  // Profile E: Married with special needs child
  // =========================================================================
  {
    const profile = "E";
    const answers = makeProfileE(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    assert(will.title.length > 0, abbr, profile, "Will title is empty");
    assert(will.preamble.includes(stateName), abbr, profile, `Preamble missing state name "${stateName}"`);

    // Guardian article (minor children)
    const guardianArticle = will.articles.find((a) =>
      a.heading.includes("GUARDIAN") || a.heading.includes("TUTORSHIP")
    );
    assert(guardianArticle !== undefined, abbr, profile, "Guardian article missing for minor children");

    // Execution checklist: special needs warning
    const snWarning = will.executionChecklist.find((item) =>
      item.title.toLowerCase().includes("special needs")
    );
    assert(snWarning !== undefined, abbr, profile, "Checklist missing special needs warning");

    assert(will.executionChecklist.length > 0, abbr, profile, "Execution checklist is empty");
  }

  // =========================================================================
  // Elective share test: married, disinheriting spouse (all states except GA)
  // =========================================================================
  {
    const profile = "ElectiveShare";
    const answers = makeProfileElectiveShare(abbr);
    let will: ReturnType<typeof generateWill>;
    try {
      will = generateWill(answers);
    } catch (e: any) {
      failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
      totalTests++;
      continue;
    }

    const electiveShareWarning = will.executionChecklist.find((item) =>
      item.title.toLowerCase().includes("elective share")
    );
    if (abbr === "GA") {
      assert(
        electiveShareWarning === undefined,
        abbr, profile, "GA should NOT have elective share warning"
      );
    } else {
      assert(
        electiveShareWarning !== undefined,
        abbr, profile, "Checklist missing elective share warning for spouse disinheritance"
      );
    }
  }
}

// =========================================================================
// FL-specific: homestead warning
// =========================================================================
{
  const abbr = "FL";
  const profile = "FL-Homestead";
  const answers = makeProfileFLHomestead(abbr);
  let will: ReturnType<typeof generateWill>;
  try {
    will = generateWill(answers);
  } catch (e: any) {
    failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
    totalTests++;
  }

  if (typeof will! !== "undefined") {
    const homesteadWarning = will!.executionChecklist.find((item) =>
      item.title.toLowerCase().includes("homestead")
    );
    assert(
      homesteadWarning !== undefined,
      abbr, profile, "FL checklist missing homestead warning for married user with real estate"
    );
  }
}

// =========================================================================
// NY-specific: publication requirement
// =========================================================================
{
  const abbr = "NY";
  const profile = "NY-Publication";
  const answers = makeProfileA(abbr);
  let will: ReturnType<typeof generateWill>;
  try {
    will = generateWill(answers);
  } catch (e: any) {
    failures.push({ state: abbr, profile, message: `generateWill threw: ${e.message}` });
    totalTests++;
  }

  if (typeof will! !== "undefined") {
    const pubStep = will!.executionChecklist.find((item) =>
      item.title.toLowerCase().includes("declare") && item.title.toLowerCase().includes("witness")
    );
    assert(
      pubStep !== undefined,
      abbr, profile, "NY checklist missing publication requirement"
    );
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log("=".repeat(70));
console.log("TEST SUMMARY");
console.log("=".repeat(70));
console.log(`Total tests:    ${totalTests}`);
console.log(`Passes:         ${totalPasses}`);
console.log(`Failures:       ${failures.length}`);
console.log("=".repeat(70));

if (failures.length > 0) {
  console.log("\nFAILURES:\n");
  for (const f of failures) {
    console.log(`  [${f.state}] Profile ${f.profile}: ${f.message}`);
  }
  console.log("");
  process.exit(1);
} else {
  console.log("\nAll tests passed!\n");
  process.exit(0);
}
