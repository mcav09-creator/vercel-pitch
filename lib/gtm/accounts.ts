export type GtmAccount = {
  slug: string;
  name: string;
  state: string;
  /** One of Matt's nine mapped territory accounts. */
  territory?: boolean;
  /** Already a Datadog customer, so the play is expansion. */
  existingCustomer?: boolean;
  /** Matt's own history with the account, used to suggest a warm path in. */
  relationship?: string;
};

export const gtmAccounts: GtmAccount[] = [
  { slug: "monash", name: "Monash University", state: "VIC", territory: true, relationship: "Matt covered Monash at Salesforce, where it was Salesforce's largest higher-ed account in Australia by annual order value; he worked with procurement, the CIO and the development team on new licences and contracts." },
  { slug: "usyd", name: "The University of Sydney", state: "NSW", territory: true, relationship: "Matt met the Chief Information and Digital Officer while at monō ai and worked alongside the Deloitte team consulting across the executive team." },
  { slug: "unsw", name: "UNSW Sydney", state: "NSW", territory: true, existingCustomer: true, relationship: "Matt managed UNSW directly at Salesforce, including procurement and IT governance, and at monō ai discussed UNSW's digital transformation with a key adviser on its governing council." },
  { slug: "uts", name: "University of Technology Sydney", state: "NSW", territory: true, relationship: "Matt covered UTS at Salesforce and worked with a partner on UTS use cases at monō ai; UTS hosts the HEDx conference where Matt has strong relationships." },
  { slug: "une", name: "University of New England", state: "NSW", territory: true, relationship: "Matt won an early tender at UNE for Salesforce against an entrenched Microsoft footprint and built the Vice-Chancellor relationship." },
  { slug: "tafe-nsw", name: "TAFE NSW", state: "NSW", territory: true, relationship: "Matt worked TAFE NSW directly at Salesforce, partnering with the AWS field team on its move off on-premise infrastructure at Villawood." },
  { slug: "wsu", name: "Western Sydney University", state: "NSW", territory: true, relationship: "Matt covered Western Sydney University in his NSW higher-ed territory at Salesforce." },
  { slug: "jcu", name: "James Cook University", state: "QLD", territory: true, relationship: "Matt facilitated discussions directly with JCU's Vice-Chancellor at HEDx, alongside Salesforce's Head of Education Cloud." },
  { slug: "qut", name: "Queensland University of Technology", state: "QLD", territory: true, relationship: "Matt closed a $200K expansion at QUT for Salesforce while covering the national education territory." },

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
