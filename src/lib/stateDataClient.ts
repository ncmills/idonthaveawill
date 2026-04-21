/**
 * Slim, client-safe state data.
 *
 * Previously, every client component that needed state info (StateSelection,
 * FamilyStatus, Disinheritance, PersonalInfo, ReviewAnswers) imported from
 * `./stateData`, which statically imports the 168 kB `all_states.json`. That
 * shipped the entire blob into the `/create` route (58 kB first-load) when the
 * wizard only needs a handful of flat fields.
 *
 * This module reads the 10 kB pre-built slim at `data/states/all_states_slim.json`.
 * Regenerate it with `npm run build:state-slim` after editing the master JSON.
 *
 * The full `StateRequirements` record (witness qualifications, statute citations,
 * presence rules, revocation methods, FAQ copy) still lives in `./stateData` and
 * should only be imported from server-rendered routes
 * (`will-requirements/[slug]/page.tsx`, `estate-planning/[slug]/page.tsx`,
 * `sitemap.ts`, `blog-posts.ts`, `stateSlugs.ts`) and from `willGenerator.ts`
 * (which runs on the `/review` page — bigger bundle there is acceptable since
 * it's the step that actually needs the full rules).
 */

import slim from "../../data/states/all_states_slim.json";

export interface StateSlim {
  abbreviation: string;
  state: string;
  slug: string;
  witnessCount: number;
  notaryRequired: boolean;
  minimumAge: number;
  holographicRecognized: boolean;
}

export const STATES_SLIM: readonly StateSlim[] = slim as StateSlim[];

const COMMUNITY_PROPERTY = new Set([
  "AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI",
]);

export function getStateSlim(abbr: string): StateSlim | undefined {
  const upper = abbr.toUpperCase();
  return STATES_SLIM.find((s) => s.abbreviation === upper);
}

export function getStateNameByAbbr(abbr: string): string {
  return getStateSlim(abbr)?.state ?? abbr;
}

export function getStateListClient(): { value: string; label: string }[] {
  return STATES_SLIM.map((s) => ({ value: s.abbreviation, label: s.state }))
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function isCommunityPropertyStateClient(abbr: string): boolean {
  return COMMUNITY_PROPERTY.has(abbr.toUpperCase());
}
