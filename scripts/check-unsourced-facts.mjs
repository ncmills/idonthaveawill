#!/usr/bin/env node
/**
 * check-unsourced-facts.mjs — fail the build on a fact with neither a source nor a disclosure.
 *
 * CLASS: a data row states a legal/factual claim (a citation) with no primary-source link and
 * nothing telling the reader. Rule: every item must have an https URL, OR its row is marked
 * pending (the page then says so in plain words). Pending rows only WARN, with a count.
 *
 * Class-generic: change CONFIG for another dataset. DATA_FILE env overrides the file (for tests).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, isAbsolute } from "node:path";

const CONFIG = {
  dataFile: process.env.DATA_FILE || "data/states/all_states.json",
  rowLabel: (r) => r.abbreviation || r.state,
  items: (r) => r.statute_citations ?? [], // the claims that need a source
  sources: (r) => r.statute_sources ?? [], // [{ citation, url }]
  itemKey: (item) => item,
  sourceKey: (s) => s.citation,
  pendingFlag: "sourcePending",
  urlPattern: /^https:\/\/[^\s/]+\.[^\s]+$/,
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = isAbsolute(CONFIG.dataFile) ? CONFIG.dataFile : join(root, CONFIG.dataFile);
const rows = JSON.parse(readFileSync(file, "utf8"));
const errors = [];
const pending = [];
for (const r of rows) {
  const label = CONFIG.rowLabel(r);
  const linked = new Map(CONFIG.sources(r).map((s) => [CONFIG.sourceKey(s), s.url]));
  for (const [k, u] of linked) {
    if (!CONFIG.urlPattern.test(String(u))) errors.push(`${label}: source for "${k}" is not an https URL: ${u}`);
  }
  const missing = CONFIG.items(r).filter((i) => !linked.has(CONFIG.itemKey(i)));
  if (missing.length && r[CONFIG.pendingFlag] !== true) {
    errors.push(`${label}: ${missing.length} citation(s) with no source URL and row not marked ${CONFIG.pendingFlag}: ${missing[0]}${missing.length > 1 ? " ..." : ""}`);
  }
  if (r[CONFIG.pendingFlag] === true) pending.push(label);
}
if (pending.length) console.warn(`check-unsourced-facts: WARN ${pending.length} row(s) disclosed as ${CONFIG.pendingFlag}: ${pending.join(",")}`);
if (errors.length) {
  console.error(`check-unsourced-facts: FAIL (${errors.length})\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`check-unsourced-facts: OK (${rows.length} rows, ${pending.length} disclosed pending)`);
