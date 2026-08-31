export type TerritoryAccount = {
  name: string;
  state: string;
  segment: string;
  relationship: string;
  entry: string;
};

export const territoryAccounts: TerritoryAccount[] = [
  {
    name: "Monash University",
    state: "VIC",
    segment: "Group of Eight, multi-campus research-intensive",
    relationship:
      "Existing relationship built through the same East Coast higher-ed network Matt worked at Salesforce, spanning Monash's Clayton, Caulfield, and Peninsula campuses.",
    entry:
      "Observability across a genuinely distributed research-computing and student-systems estate: the kind of multi-campus complexity that makes a single pane of glass a real unlock, not a nice-to-have.",
  },
  {
    name: "The University of Sydney",
    state: "NSW",
    segment: "Group of Eight",
    relationship:
      "Relationship built during Matt's Tier-1 university territory work at Salesforce, covering the institution's cloud modernization and digital transformation stakeholders.",
    entry:
      "A CIO/CDO-level modernization story: aligning observability investment with an institution-wide cloud migration the same way Matt aligned Education Cloud adoption to it.",
  },
  {
    name: "UNSW Sydney",
    state: "NSW",
    segment: "Group of Eight",
    relationship:
      "Existing relationship from the same NSW Tier-1 territory, including exposure to UNSW's procurement and IT governance process for enterprise platform decisions.",
    entry:
      "Security and compliance-forward entry: UNSW's research data governance requirements make Datadog's security and compliance monitoring a natural technical-buyer conversation.",
  },
  {
    name: "University of Technology Sydney (UTS)",
    state: "NSW",
    segment: "Innovative Research Universities, tech-forward",
    relationship:
      "Relationship built through NSW higher-ed territory coverage; UTS's own reputation as a technology-forward institution made it a natural fit for modern platform conversations.",
    entry:
      "UTS actively invests in its own engineering and DX culture, which makes a developer-experience-led observability pitch land faster here than at a more traditional institution.",
  },
  {
    name: "University of New England (UNE)",
    state: "NSW",
    segment: "Regional, largest distance-education cohort in Australia",
    relationship:
      "Relationship built covering NSW's regional and distance-education institutions, where digital delivery isn't a side channel, it's the core operating model.",
    entry:
      "Reliability of the distance-education platform itself is existential for UNE's operating model: an outage isn't an inconvenience, it's thousands of remote students locked out, which makes uptime observability a direct business-continuity conversation.",
  },
  {
    name: "TAFE NSW",
    state: "NSW",
    segment: "Largest VET provider in Australia, state-wide multi-campus network",
    relationship:
      "Direct relationship from Matt's state-wide K-12/TAFE territory work at Salesforce, covering TAFE NSW's cloud and digital-delivery footprint across dozens of campuses.",
    entry:
      "A state-wide, multi-campus network is exactly the fragmented-footprint problem Matt has already solved once (Christian Education Ministries' 17 schools and 14 sites), just at public-VET scale: land on one platform team's footprint, expand campus by campus.",
  },
  {
    name: "Western Sydney University",
    state: "NSW",
    segment: "Growth university, multi-campus across Sydney's western growth corridor",
    relationship:
      "Relationship built through NSW territory coverage of Western Sydney's rapidly growing student population and multi-campus expansion.",
    entry:
      "A growth institution expanding physical and digital footprint simultaneously needs observability that scales with it, a timing-driven entry point tied to its own expansion roadmap.",
  },
  {
    name: "James Cook University (JCU)",
    state: "QLD",
    segment: "Regional, multi-campus (Townsville, Cairns, Singapore)",
    relationship:
      "Relationship built through Matt's Queensland regional territory coverage, including JCU's distinctive northern-Australia and international-campus footprint.",
    entry:
      "A genuinely distributed, cross-border campus footprint (regional Queensland plus an international Singapore campus) makes centralized visibility a concrete technical need, not an abstract pitch.",
  },
  {
    name: "Queensland University of Technology (QUT)",
    state: "QLD",
    segment: "Australian Technology Network, applied/industry-focused",
    relationship:
      "Relationship built through Queensland territory coverage; QUT's applied, industry-partnership-driven culture made it a natural fit for enterprise platform conversations.",
    entry:
      "QUT's industry-partnership model and applied-research computing footprint make a platform-engineering-led pitch (reliability, developer velocity) resonate more than a pure IT-operations angle.",
  },
];

export const territoryFootnote =
  "This territory map is built from Matt's own existing relationships across ANZ higher-ed, carried over from his Tier-1 University and TAFE coverage at Salesforce, not cold research. It's also backed by real partner and hyperscaler relationships across Australian higher-ed built the same way: mid-tier ed-tech integrators, AWS/Azure/GCP account teams, and the GSIs already running modernization work inside these institutions. None of these nine currently appear on Datadog's public customer list (checked live), which reads as genuine ANZ higher-ed whitespace rather than a diligence gap.";
