#!/usr/bin/env node
/**
 * Regenerate `data/states/all_states_slim.json` from the master
 * `data/states/all_states.json`. Run via `npm run build:state-slim` any time
 * the master JSON's witness_requirements, notarization, minimum_age, or
 * holographic_wills fields change.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const srcPath = path.join(root, "data/states/all_states.json");
const dstPath = path.join(root, "data/states/all_states_slim.json");

const raw = JSON.parse(fs.readFileSync(srcPath, "utf8"));
const slim = raw.map((s) => ({
  abbreviation: s.abbreviation,
  state: s.state,
  slug: s.state.toLowerCase().replace(/ /g, "-"),
  witnessCount: s.witness_requirements?.count ?? 2,
  notaryRequired: s.notarization?.required ?? false,
  minimumAge: s.minimum_age?.standard ?? 18,
  holographicRecognized: s.holographic_wills?.recognized ?? false,
}));

if (slim.length !== 51) {
  console.error(`Expected 51 states + DC, got ${slim.length}`);
  process.exit(1);
}

fs.writeFileSync(dstPath, JSON.stringify(slim, null, 2) + "\n");
console.log(`Wrote ${dstPath} (${slim.length} states, ${fs.statSync(dstPath).size} bytes)`);
