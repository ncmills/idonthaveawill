import { getAllStates } from "./stateData";
import type { StateRequirements } from "./types";

export function stateToSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, "-");
}

export function slugToState(slug: string): StateRequirements | undefined {
  const states = getAllStates();
  return states.find((s) => stateToSlug(s.state) === slug);
}

export function getAllStateSlugs(): string[] {
  return getAllStates().map((s) => stateToSlug(s.state));
}

export function getStateUrl(stateName: string): string {
  return `/will-requirements/${stateToSlug(stateName)}`;
}
