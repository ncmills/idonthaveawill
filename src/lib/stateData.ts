import type { StateRequirements } from "./types";
import allStatesData from "../../data/states/all_states.json";

const stateData = allStatesData as StateRequirements[];

export function getAllStates(): StateRequirements[] {
  return stateData;
}

export function getStateByAbbreviation(
  abbr: string
): StateRequirements | undefined {
  return stateData.find(
    (s) => s.abbreviation.toUpperCase() === abbr.toUpperCase()
  );
}

export function getStateList(): { value: string; label: string }[] {
  return stateData
    .map((s) => ({
      value: s.abbreviation,
      label: s.state,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function isCommunityPropertyState(abbr: string): boolean {
  return ["AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI"].includes(
    abbr.toUpperCase()
  );
}

export function requiresNotarization(abbr: string): boolean {
  const state = getStateByAbbreviation(abbr);
  return state?.notarization.required ?? false;
}

export function getWitnessCount(abbr: string): number {
  const state = getStateByAbbreviation(abbr);
  return state?.witness_requirements.count ?? 2;
}

export function hasSelfProvingAffidavit(abbr: string): boolean {
  const state = getStateByAbbreviation(abbr);
  return state?.self_proving_affidavit.available ?? false;
}
