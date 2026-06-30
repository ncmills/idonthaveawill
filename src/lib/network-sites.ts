/**
 * Cross-site footer links — LEGAL / SELF-HELP CLUSTER (funnel).
 *
 * Network footers are siloed by topic so links stay topically relevant and don't
 * read as a cross-niche link scheme. Equity funnels UPSTREAM toward the highest-
 * priority site only. Cluster priority: aissdi > idonthaveawill > doppelwriter > imfrustrated.
 * This site (idonthaveawill, priority 2) links ONLY to sites above it → just aissdi.
 */
export interface NetworkSite {
  domain: string; // bare domain, no protocol
  label: string;
  tagline: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  { domain: "aissdi.com", label: "AISSDI", tagline: "Free SSDI approval-odds & judge lookup tools" },
];

/** Returns sites excluding the current domain (prevents self-linking). */
export function getNetworkSites(currentDomain: string): NetworkSite[] {
  return NETWORK_SITES.filter((s) => s.domain !== currentDomain);
}
