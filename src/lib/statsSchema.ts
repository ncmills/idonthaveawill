import type { WillAnswers } from "./types";
import { isCommunityPropertyState } from "./stateData";
import { getAge } from "./questionFlow";

// Whitelist schema — this is ALL that gets collected. No PII, no free text.
export interface AnonymizedStats {
  state: string;
  marital_status: string;
  has_children: boolean;
  child_count: number;
  has_minor_children: boolean;
  has_special_needs_children: boolean;
  has_guardian: boolean;
  has_specific_bequests: boolean;
  bequest_count: number;
  has_real_estate_bequests: boolean;
  residuary_type: string;
  residuary_beneficiary_count: number;
  include_digital_assets: boolean;
  has_pets: boolean;
  has_disinheritances: boolean;
  include_no_contest: boolean;
  include_simultaneous_death: boolean;
  has_funeral_wishes: boolean;
  is_community_property_state: boolean;
}

/**
 * Extract only anonymized categorical fields from WillAnswers.
 * Drops ALL names, addresses, free text, and PII.
 */
export function extractAnonymizedStats(answers: WillAnswers): AnonymizedStats {
  return {
    state: answers.state,
    marital_status: answers.maritalStatus || "unknown",
    has_children: answers.children.length > 0,
    child_count: answers.children.length,
    has_minor_children: answers.children.some(
      (c) => c.dateOfBirth && getAge(c.dateOfBirth) < 18
    ),
    has_special_needs_children: answers.children.some((c) => c.hasSpecialNeeds),
    has_guardian: !!answers.guardian?.name,
    has_specific_bequests: answers.specificBequests.length > 0,
    bequest_count: answers.specificBequests.length,
    has_real_estate_bequests: answers.specificBequests.some((b) => b.isRealEstate),
    residuary_type: answers.residuaryType || "unknown",
    residuary_beneficiary_count: answers.residuaryBeneficiaries.length,
    include_digital_assets: !!answers.includeDigitalAssets,
    has_pets: answers.pets.length > 0,
    has_disinheritances: answers.disinheritances.length > 0,
    include_no_contest: !!answers.includeNoContest,
    include_simultaneous_death: !!answers.simultaneousDeathBeneficiary?.name,
    has_funeral_wishes: !!answers.funeralWishes,
    is_community_property_state: isCommunityPropertyState(answers.state),
  };
}

/**
 * Validate that a stats payload contains no PII.
 * Returns true if clean, false if suspicious data detected.
 */
export function validateNoPI(stats: AnonymizedStats): boolean {
  // State must be exactly 2 uppercase letters
  if (!/^[A-Z]{2}$/.test(stats.state)) return false;

  // Marital status must be one of the allowed values
  const allowedStatuses = ["single", "married", "divorced", "widowed", "unknown"];
  if (!allowedStatuses.includes(stats.marital_status)) return false;

  // Residuary type must be one of the allowed values
  const allowedResiduary = ["single", "split", "unknown"];
  if (!allowedResiduary.includes(stats.residuary_type)) return false;

  // No string field should be longer than 10 chars (prevents name injection)
  for (const [, value] of Object.entries(stats)) {
    if (typeof value === "string" && value.length > 10) return false;
  }

  return true;
}
