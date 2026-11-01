export type GtmAccount = {
  slug: string;
  name: string;
  state: string;
  /** One of Matt's nine mapped territory accounts. */
  territory?: boolean;
  /** Already a Datadog customer, so the play is expansion. */
  existingCustomer?: boolean;
};

export const gtmAccounts: GtmAccount[] = [
  { slug: "monash", name: "Monash University", state: "VIC", territory: true },
  { slug: "usyd", name: "The University of Sydney", state: "NSW", territory: true },
  { slug: "unsw", name: "UNSW Sydney", state: "NSW", territory: true, existingCustomer: true },
  { slug: "uts", name: "University of Technology Sydney", state: "NSW", territory: true },
  { slug: "une", name: "University of New England", state: "NSW", territory: true },
  { slug: "tafe-nsw", name: "TAFE NSW", state: "NSW", territory: true },
  { slug: "wsu", name: "Western Sydney University", state: "NSW", territory: true },
  { slug: "jcu", name: "James Cook University", state: "QLD", territory: true },
  { slug: "qut", name: "Queensland University of Technology", state: "QLD", territory: true },

  { slug: "anu", name: "Australian National University", state: "ACT" },
  { slug: "canberra", name: "University of Canberra", state: "ACT" },
  { slug: "macquarie", name: "Macquarie University", state: "NSW" },
  { slug: "newcastle", name: "University of Newcastle", state: "NSW" },
  { slug: "wollongong", name: "University of Wollongong", state: "NSW" },
  { slug: "csu", name: "Charles Sturt University", state: "NSW" },
  { slug: "scu", name: "Southern Cross University", state: "NSW" },
  { slug: "acu", name: "Australian Catholic University", state: "NSW" },
  { slug: "melbourne", name: "The University of Melbourne", state: "VIC" },
  { slug: "rmit", name: "RMIT University", state: "VIC" },
  { slug: "deakin", name: "Deakin University", state: "VIC" },
  { slug: "latrobe", name: "La Trobe University", state: "VIC" },
  { slug: "swinburne", name: "Swinburne University of Technology", state: "VIC" },
  { slug: "vu", name: "Victoria University", state: "VIC" },
  { slug: "federation", name: "Federation University Australia", state: "VIC" },
  { slug: "uq", name: "The University of Queensland", state: "QLD" },
  { slug: "griffith", name: "Griffith University", state: "QLD" },
  { slug: "cqu", name: "CQUniversity", state: "QLD" },
  { slug: "unisq", name: "University of Southern Queensland", state: "QLD" },
  { slug: "usc", name: "University of the Sunshine Coast", state: "QLD" },
  { slug: "bond", name: "Bond University", state: "QLD" },
  { slug: "adelaide", name: "Adelaide University", state: "SA" },
  { slug: "flinders", name: "Flinders University", state: "SA" },
  { slug: "uwa", name: "The University of Western Australia", state: "WA" },
  { slug: "curtin", name: "Curtin University", state: "WA" },
  { slug: "ecu", name: "Edith Cowan University", state: "WA" },
  { slug: "murdoch", name: "Murdoch University", state: "WA" },
  { slug: "utas", name: "University of Tasmania", state: "TAS" },
  { slug: "cdu", name: "Charles Darwin University", state: "NT" },
];

export const territoryAccounts = gtmAccounts.filter((a) => a.territory);

export function findAccount(slug: string): GtmAccount | undefined {
  return gtmAccounts.find((a) => a.slug === slug);
}
