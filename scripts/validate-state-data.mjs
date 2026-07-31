#!/usr/bin/env node
/**
 * validate-state-data.mjs — fail the build on malformed or leaky state law data.
 *
 * WHY THIS EXISTS (2026-07-31). Four auto-generated data-steward PRs sat open
 * against `all_states.json`. The PR auditor APPROVED them and the revise-loop
 * SIGNED THEM OFF, and two were still broken:
 *
 *   1. SCHEMA BREAK — Arizona's `self_proving_affidavit` was rewritten from
 *      `{available, requirements}` to a bare string. `types.ts` declares the
 *      object, and four pages read `.available`. On a string that is `undefined`
 *      → falsy → Arizona would have rendered "Not available" for self-proving
 *      affidavits, and the requirements block would have been hidden entirely.
 *      A factual regression on a YMYL legal page, from a shape change.
 *
 *   2. ANNOTATION LEAK — researcher notes ABOUT the dataset landed inside
 *      user-facing legal fields: "The stored value omitted the mandatory minimum
 *      age of 18…", "Correction: AS 13.12.502 contains only subsections (a) and
 *      (b)…", "[CONFIRMED — no change.]". `testamentary_capacity` renders
 *      directly on /will-requirements/[slug] and is embedded into blog HTML, so
 *      a reader would have been shown the changelog as if it were legal guidance.
 *
 * Neither is catchable by reading a diff quickly, and both ship silently. This
 * runs on every build.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "data/states/all_states.json");
const states = JSON.parse(readFileSync(file, "utf8"));

/** Fields that MUST be objects, and the keys each must carry (see src/lib/types.ts). */
const OBJECT_SHAPES = {
  minimum_age: ["standard"],
  signature_requirement: ["testator_must_sign"],
  witness_requirements: ["count"],
  notarization: ["required"],
  self_proving_affidavit: ["available", "requirements"],
  electronic_wills: ["recognized", "notes"],
  holographic_wills: ["recognized", "notes"],
  nuncupative_wills: ["recognized", "notes"],
  revocation: ["methods"],
};

/**
 * Text that means someone was writing ABOUT the data rather than stating the law.
 * These are notes to a reviewer; they must never reach a reader.
 */
const ANNOTATION = [
  /\[\s*(CONFIRMED|VERIFIED|UNCHANGED|NO CHANGE)[^\]]*\]/i,
  /\bCorrection:/,
  /\bthe stored (value|attribution|language|entry|text)\b/i,
  /\bthe (previous|existing) (value|entry)\b/i,
  /\bas stored\b/i,
  /\bthis (correction|revision) \b/i,
];

const errors = [];

for (const s of states) {
  const name = s.state || "(unnamed)";

  for (const [field, keys] of Object.entries(OBJECT_SHAPES)) {
    const v = s[field];
    if (v === undefined) continue; // optional fields stay optional
    if (typeof v !== "object" || v === null || Array.isArray(v)) {
      errors.push(`${name}.${field}: expected an object, got ${Array.isArray(v) ? "array" : typeof v}. ` +
                  `src/lib/types.ts declares an object and the pages read its keys — a bare value renders as "not available".`);
      continue;
    }
    for (const k of keys) {
      if (!(k in v)) errors.push(`${name}.${field}: missing required key "${k}"`);
    }
  }

  // Recursively scan every string for reviewer annotations.
  const walk = (node, path) => {
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
    } else if (typeof node === "string") {
      for (const re of ANNOTATION) {
        const m = node.match(re);
        if (m) {
          errors.push(`${path}: reviewer annotation leaked into user-facing text — ${JSON.stringify(m[0])}. ` +
                      `State the law, not the edit history.`);
          break;
        }
      }
    }
  };
  walk(s, name);
}

if (errors.length) {
  console.error(`\n✖ state data validation failed (${errors.length} problem${errors.length === 1 ? "" : "s"}):\n`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error("\nThis data renders on YMYL legal pages. Fix the data, not this check.\n");
  process.exit(1);
}

console.log(`✓ state data OK — ${states.length} states, shapes intact, no reviewer annotations`);
