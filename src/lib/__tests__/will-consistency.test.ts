import test from "node:test";
import assert from "node:assert/strict";
import { generateWill } from "../willGenerator";
import { EMPTY_ANSWERS } from "../types";
import type { WillAnswers } from "../types";

const base = (over: Partial<WillAnswers> = {}): WillAnswers => ({
  ...EMPTY_ANSWERS,
  state: "TX",
  fullName: { first: "Alex", middle: "", last: "Whitfield" },
  city: "Dallas",
  county: "Dallas",
  dateOfBirth: "1980-01-01",
  maritalStatus: "married",
  spouseName: "Chris Whitfield",
  hasChildren: true,
  children: [{ name: "Kid", dateOfBirth: "2018-01-01", relationship: "biological", hasSpecialNeeds: false }],
  guardian: { name: "Pat Lee", relationship: "sister", cityState: "Dallas, TX" },
  inheritanceAge: 25,
  executor: { name: "Chris Whitfield", relationship: "spouse", cityState: "Dallas, TX" },
  alternateExecutor: { name: "", relationship: "", cityState: "" },
  hasSpecificBequests: false,
  residuaryType: "single",
  residuaryBeneficiaries: [{ name: "Chris Whitfield", relationship: "spouse", percentage: 100 }],
  ...over,
});
const text = (a: WillAnswers) => generateWill(a).articles.map((x) => x.heading + "\n" + x.content).join("\n");

// F1
test("F1: guardian and trust articles are dropped after the user switches to no children", () => {
  const t = text(base({ hasChildren: false, children: [] }));
  assert.match(t, /I have no children/);
  assert.doesNotMatch(t, /GUARDIAN OF MINOR CHILDREN/);
  assert.doesNotMatch(t, /MINOR BENEFICIARY PROVISIONS/);
  assert.doesNotMatch(t, /Pat Lee/);
});
test("F1: guardian is kept when a minor child exists", () => {
  assert.match(text(base()), /GUARDIAN OF MINOR CHILDREN/);
});
test("F1: stale spouse disinheritance and simultaneous-death clause drop when no longer married", () => {
  const a = base({
    maritalStatus: "single", spouseName: undefined, hasChildren: false, children: [],
    guardian: undefined, inheritanceAge: undefined,
    disinheritances: [{ name: "Chris Whitfield", relationship: "spouse" }],
    simultaneousDeathBeneficiary: { name: "Sam", relationship: "brother" },
    residuaryType: "split",
    residuaryBeneficiaries: [{ name: "A", relationship: "friend", percentage: 50 }, { name: "B", relationship: "friend", percentage: 50 }],
  });
  const t = text(a);
  assert.match(t, /I am not married/);
  assert.doesNotMatch(t, /INTENTIONAL OMISSION/);
  assert.doesNotMatch(t, /SIMULTANEOUS DEATH/);
});

// F2
test("F2: split residuary with the dropdown's untouched default still prints a predecease clause", () => {
  const t = text(base({ residuaryType: "split", residuaryAlternateRule: undefined,
    residuaryBeneficiaries: [{ name: "A", relationship: "friend", percentage: 50 }, { name: "B", relationship: "friend", percentage: 50 }] }));
  assert.match(t, /divided equally among the surviving beneficiaries/);
});
test("F2: specific_person alternate for a split residuary is honoured", () => {
  const t = text(base({ residuaryType: "split", residuaryAlternateRule: "specific_person",
    residuaryAlternate: { name: "Dana Roe", relationship: "cousin" },
    residuaryBeneficiaries: [{ name: "A", relationship: "friend", percentage: 50 }, { name: "B", relationship: "friend", percentage: 50 }] }));
  assert.match(t, /their share shall pass to Dana Roe, my cousin/);
});
test("F2: Louisiana prints the split-residuary alternate too", () => {
  const t = text(base({ state: "LA", residuaryType: "split", residuaryAlternateRule: "specific_person",
    residuaryAlternate: { name: "Dana Roe", relationship: "cousin" },
    residuaryBeneficiaries: [{ name: "A", relationship: "friend", percentage: 50 }, { name: "B", relationship: "friend", percentage: 50 }] }));
  assert.match(t, /pass to Dana Roe/);
});

// F3
test("F3: Florida prints no no-contest clause and the checklist says why; Texas still prints it", () => {
  const fl = generateWill(base({ state: "FL", includeNoContest: true }));
  assert.ok(!fl.articles.some((a) => /NO-CONTEST/.test(a.heading)));
  assert.ok(fl.executionChecklist.some((i) => /732\.517/.test(i.requirement)));
  const tx = generateWill(base({ includeNoContest: true }));
  assert.ok(tx.articles.some((a) => /NO-CONTEST/.test(a.heading)));
});

// F5 / F6
test("F5: blank answers do not produce a will", () => {
  assert.throws(() => generateWill({ ...EMPTY_ANSWERS, state: "TX" }), /Incomplete answers/);
});
test("F5: a minor testator is refused", () => {
  assert.throws(() => generateWill(base({ dateOfBirth: "2015-01-01" })), /age under/);
});
test("F5: partial answers missing executor throw a clear error, not a TypeError", () => {
  const a = base() as Partial<WillAnswers>;
  delete a.executor;
  assert.throws(() => generateWill(a as WillAnswers), /Incomplete answers: .*executor/);
});
test("F6: implausible date of birth and giant names are refused", () => {
  assert.throws(() => generateWill(base({ dateOfBirth: "1850-01-01" })), /implausible/);
  assert.throws(() => generateWill(base({ fullName: { first: "x".repeat(9000), middle: "", last: "Y" } })), /name too long/);
});
