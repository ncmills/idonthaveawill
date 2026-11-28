#!/usr/bin/env node
/**
 * check-stale-datasets.mjs — fail the build on a dataset row with no or too-old verification date.
 *
 * CLASS: reference data that was true when researched and silently ages. Every row needs a
 * valid date; older than CONFIG.maxAgeDays fails, older than CONFIG.warnAgeDays warns (listed).
 *
 * Class-generic: change CONFIG for another dataset. DATA_FILE / NOW env override (for tests).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, isAbsolute } from "node:path";

const CONFIG = {
  dataFile: process.env.DATA_FILE || "data/states/all_states.json",
  rowLabel: (r) => r.abbreviation || r.state,
  dateField: "last_researched",
  maxAgeDays: 180,
  warnAgeDays: 120,
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rows = JSON.parse(readFileSync(isAbsolute(CONFIG.dataFile) ? CONFIG.dataFile : join(root, CONFIG.dataFile), "utf8"));
const now = process.env.NOW ? new Date(process.env.NOW) : new Date();
const errors = [];
const stale = [];
for (const r of rows) {
  const label = CONFIG.rowLabel(r);
  const raw = r[CONFIG.dateField];
  const t = typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? Date.parse(raw) : NaN;
  if (Number.isNaN(t)) { errors.push(`${label}: missing/invalid ${CONFIG.dateField}: ${raw}`); continue; }
  const age = Math.floor((now.getTime() - t) / 86400000);
  if (age > CONFIG.maxAgeDays) errors.push(`${label}: ${CONFIG.dateField} ${raw} is ${age} days old (max ${CONFIG.maxAgeDays})`);
  else if (age > CONFIG.warnAgeDays) stale.push(`${label}(${raw})`);
}
if (stale.length) console.warn(`check-stale-datasets: WARN ${stale.length} row(s) older than ${CONFIG.warnAgeDays} days: ${stale.join(",")}`);
if (errors.length) {
  console.error(`check-stale-datasets: FAIL (${errors.length})\n  ` + errors.join("\n  "));
  process.exit(1);
}
console.log(`check-stale-datasets: OK (${rows.length} rows, ${stale.length} past warn threshold)`);
