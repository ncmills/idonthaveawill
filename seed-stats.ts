/**
 * Generate a will for every state and POST anonymized stats to the live API.
 * Run with: npx tsx seed-stats.ts
 */

import { generateWill } from "./src/lib/willGenerator";
import { getAllStates } from "./src/lib/stateData";
import { extractAnonymizedStats } from "./src/lib/statsSchema";
import type { WillAnswers } from "./src/lib/types";
import { EMPTY_ANSWERS } from "./src/lib/types";

const API_URL = process.env.SEED_API_URL || "http://localhost:3000/api/stats";
if (API_URL.includes("idonthaveawill.com")) {
  console.error("Refusing to seed production. Set SEED_API_URL to localhost.");
  process.exit(1);
}

function makeTestAnswers(abbr: string): WillAnswers {
  return {
    ...EMPTY_ANSWERS,
    state: abbr,
    fullName: { first: "Test", middle: "M", last: "User" },
    city: "Testville",
    county: "Testington",
    dateOfBirth: "1985-01-15",
    maritalStatus: "married",
    spouseName: "Test Spouse",
    hasChildren: true,
    children: [
      { name: "Child One", dateOfBirth: "2016-06-01", relationship: "biological", hasSpecialNeeds: false },
    ],
    guardian: { name: "Guardian Name", relationship: "sibling", cityState: "Otherville, ST" },
    alternateGuardian: { name: "Alt Guardian", relationship: "friend", cityState: "Elsewhere, ST" },
    inheritanceAge: 21,
    executor: { name: "Test Spouse", relationship: "spouse", cityState: "Testville, ST" },
    alternateExecutor: { name: "Guardian Name", relationship: "sibling", cityState: "Otherville, ST" },
    waiveBond: true,
    executorCanSellProperty: true,
    hasSpecificBequests: true,
    specificBequests: [
      {
        item: "personal items",
        recipient: { name: "Child One", relationship: "child" },
        isRealEstate: false,
        alternateDisposition: "residuary",
      },
    ],
    residuaryType: "single",
    residuaryBeneficiaries: [{ name: "Test Spouse", relationship: "spouse", percentage: 100 }],
    residuaryAlternate: { name: "Child One", relationship: "child" },
    includeDigitalAssets: true,
    digitalExecutor: { name: "Test Spouse", relationship: "spouse" },
    digitalInstructions: "Delete social media accounts.",
    hasPasswordManager: false,
    debtHandling: "general",
    hasFuneralWishes: false,
    hasPets: false,
    pets: [],
    hasDisinheritances: false,
    disinheritances: [],
    includeNoContest: false,
  };
}

async function main() {
  const states = getAllStates();
  let success = 0;
  let failed = 0;

  for (const state of states) {
    const abbr = state.abbreviation;
    try {
      const answers = makeTestAnswers(abbr);
      const result = generateWill(answers);
      if (!result || !result.articles || result.articles.length === 0) {
        throw new Error("Will generation produced no articles");
      }

      const stats = extractAnonymizedStats(answers);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`API ${res.status}: ${body}`);
      }

      success++;
      process.stdout.write(`✓ ${abbr}  `);
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`\n✗ ${abbr}: ${msg}`);
    }
  }

  console.log(`\n\nDone: ${success} succeeded, ${failed} failed out of ${states.length} states`);
}

main();
