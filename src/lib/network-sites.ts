/**
 * Cross-site footer links — LEGAL / SELF-HELP CLUSTER (funnel).
 *
 * Network footers are siloed by topic so links stay topically relevant and don't
 * read as a cross-niche link scheme. Equity funnels UPSTREAM toward the highest-
 * priority site only. Cluster priority: aissdi > idonthaveawill > doppelwriter > imfrustrated.
 * This site (idonthaveawill, priority 2) links ONLY to sites above it → just aissdi.
 * Nick reconfirmed the one-way funnel on 2026-08-18: it is deliberate, and it stays.
 * Never add a Planning-cluster or Peptide-cluster site here, and never a personal site.
 */
export interface NetworkSite {
  domain: string; // bare domain, no protocol
  label: string;
  /** What the site IS. Rendered INSIDE the <a> — this is anchor text, not a tooltip.
   *  It used to live only in a title= attribute, where it carried no anchor value. */
  tagline: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  { domain: "aissdi.com", label: "AISSDI", tagline: "free SSDI approval-odds and judge lookup" },
];

/** Returns sites excluding the current domain (prevents self-linking). */
export function getNetworkSites(currentDomain: string): NetworkSite[] {
  return NETWORK_SITES.filter((s) => s.domain !== currentDomain);
}
