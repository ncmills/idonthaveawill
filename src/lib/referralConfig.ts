// State bar association lawyer referral service URLs
// These are the official "find a lawyer" directories run by each state's bar association.
// Replace with affiliate partner URLs when partnerships are established.

const stateBarReferralUrls: Record<string, { url: string; name: string }> = {
  AL: { url: "https://www.alabar.org/for-the-public/find-a-lawyer/", name: "Alabama State Bar" },
  AK: { url: "https://www.alaskabar.org/for-the-public/lawyer-referral-service/", name: "Alaska Bar Association" },
  AZ: { url: "https://www.azbar.org/for-the-public/lawyer-referral-service/", name: "State Bar of Arizona" },
  AR: { url: "https://www.arkbar.com/for-the-public/find-a-lawyer", name: "Arkansas Bar Association" },
  CA: { url: "https://www.calbar.ca.gov/Public/Need-Legal-Help/Lawyer-Referral-Service", name: "State Bar of California" },
  CO: { url: "https://www.cobar.org/For-the-Public/Find-a-Lawyer", name: "Colorado Bar Association" },
  CT: { url: "https://www.ctbar.org/public/find-a-lawyer", name: "Connecticut Bar Association" },
  DE: { url: "https://www.dsba.org/find-a-lawyer/", name: "Delaware State Bar Association" },
  DC: { url: "https://www.dcbar.org/for-the-public/lawyer-referral-service", name: "DC Bar" },
  FL: { url: "https://www.floridabar.org/public/lrs/", name: "Florida Bar" },
  GA: { url: "https://www.gabar.org/forthepublic/lawyerreferralservice.cfm", name: "State Bar of Georgia" },
  HI: { url: "https://hsba.org/HSBA/For_the_Public/Lawyer_Referral_Service/HSBA/For_the_Public/LRS.aspx", name: "Hawaii State Bar Association" },
  ID: { url: "https://isb.idaho.gov/ilf/", name: "Idaho State Bar" },
  IL: { url: "https://www.isba.org/public/findlawyer", name: "Illinois State Bar Association" },
  IN: { url: "https://www.inbar.org/for-the-public/find-a-lawyer/", name: "Indiana State Bar Association" },
  IA: { url: "https://www.iowabar.org/page/FindALawyer", name: "Iowa State Bar Association" },
  KS: { url: "https://www.ksbar.org/page/lrs", name: "Kansas Bar Association" },
  KY: { url: "https://www.kybar.org/page/FindLawyer", name: "Kentucky Bar Association" },
  LA: { url: "https://www.lsba.org/public/findlawyer.aspx", name: "Louisiana State Bar Association" },
  ME: { url: "https://www.mainebar.org/page/FindALawyerContent", name: "Maine State Bar Association" },
  MD: { url: "https://www.msba.org/for-the-public/lawyer-referral-service/", name: "Maryland State Bar Association" },
  MA: { url: "https://www.massbar.org/public/lawyer-referral-service", name: "Massachusetts Bar Association" },
  MI: { url: "https://www.michbar.org/programs/lawyerreferral", name: "State Bar of Michigan" },
  MN: { url: "https://www.mnbar.org/public/find-a-lawyer", name: "Minnesota State Bar Association" },
  MS: { url: "https://www.msbar.org/for-the-public/lawyer-referral-service/", name: "Mississippi Bar" },
  MO: { url: "https://www.mobar.org/public/lawyersearch.aspx", name: "Missouri Bar" },
  MT: { url: "https://www.montanabar.org/page/FindALawyer", name: "State Bar of Montana" },
  NE: { url: "https://www.nebar.com/page/findlawyer", name: "Nebraska State Bar Association" },
  NV: { url: "https://www.nvbar.org/find-a-lawyer/", name: "State Bar of Nevada" },
  NH: { url: "https://www.nhbar.org/lawyer-referral-service", name: "New Hampshire Bar Association" },
  NJ: { url: "https://www.njsba.com/for-the-public/find-a-lawyer/", name: "New Jersey State Bar Association" },
  NM: { url: "https://www.sbnm.org/For-Public/Find-A-Lawyer", name: "State Bar of New Mexico" },
  NY: { url: "https://www.nysba.org/lawyerreferral/", name: "New York State Bar Association" },
  NC: { url: "https://www.ncbar.org/public-resources/find-a-nc-lawyer/", name: "North Carolina State Bar" },
  ND: { url: "https://www.sband.org/page/LawyerReferral", name: "State Bar of North Dakota" },
  OH: { url: "https://www.ohiobar.org/public-resources/find-a-lawyer/", name: "Ohio State Bar Association" },
  OK: { url: "https://www.okbar.org/freelegalinfo/findingalawyer/", name: "Oklahoma Bar Association" },
  OR: { url: "https://www.osbar.org/public/ris/", name: "Oregon State Bar" },
  PA: { url: "https://www.pabar.org/public/lfn/", name: "Pennsylvania Bar Association" },
  RI: { url: "https://www.ribar.com/for-the-public/lawyer-referral-service/", name: "Rhode Island Bar Association" },
  SC: { url: "https://www.scbar.org/public/get-legal-help/find-lawyer-handle-your-case/", name: "South Carolina Bar" },
  SD: { url: "https://www.statebarofsouthdakota.com/page/lawyerreferral", name: "State Bar of South Dakota" },
  TN: { url: "https://www.tba.org/index.cfm/public-resources/lawyer-referral-service/", name: "Tennessee Bar Association" },
  TX: { url: "https://www.texasbar.com/AM/Template.cfm?Section=Lawyer_Referral_Service", name: "State Bar of Texas" },
  UT: { url: "https://www.utahbar.org/public-services/find-a-lawyer/", name: "Utah State Bar" },
  VT: { url: "https://www.vtbar.org/for-the-public/find-a-lawyer/", name: "Vermont Bar Association" },
  VA: { url: "https://www.vsb.org/site/public/lawyer-referral", name: "Virginia State Bar" },
  WA: { url: "https://www.wsba.org/for-the-public/find-connect-with-a-lawyer", name: "Washington State Bar Association" },
  WV: { url: "https://wvbar.org/for-the-public/find-a-lawyer/", name: "West Virginia State Bar" },
  WI: { url: "https://www.wisbar.org/forPublic/Pages/Find-a-Lawyer.aspx", name: "State Bar of Wisconsin" },
  WY: { url: "https://www.wyomingbar.org/for-the-public/find-a-lawyer/", name: "Wyoming State Bar" },
};

export function getReferralUrl(stateAbbr: string): { url: string; name: string } {
  const upper = stateAbbr.toUpperCase();
  return stateBarReferralUrls[upper] ?? {
    url: "https://www.americanbar.org/groups/legal_services/flh-home/",
    name: "American Bar Association",
  };
}

export function getReferralForState(stateAbbr: string, stateName: string) {
  const { url, name } = getReferralUrl(stateAbbr);
  return {
    url,
    barName: name,
    stateName,
    costEstimate: "$150–$500",
    description: `Find an estate planning attorney through the ${name}'s lawyer referral service.`,
  };
}
