export type TerritoryAccount = {
  name: string;
  state: string;
  segment: string;
  relationship: string;
  entry: string;
  /** Already a Datadog customer: an anchor / expansion account, not whitespace. */
  existingCustomer?: boolean;
};

export const territoryAccounts: TerritoryAccount[] = [
  {
    name: "Monash University",
    state: "VIC",
    segment: "Group of Eight, multi-campus research-intensive",
    relationship:
      "Covered Monash at Salesforce, its largest higher-ed account in Australia by annual order value, working with procurement, the CIO and the development team on new licences and contracts.",
    entry:
      "Observability across a genuinely distributed research-computing and student-systems estate: the kind of multi-campus complexity that makes a single pane of glass a real unlock, not a nice-to-have.",
  },
  {
    name: "The University of Sydney",
    state: "NSW",
    segment: "Group of Eight",
    relationship:
      "Met with the Chief Information and Digital Officer while at monō ai, and worked alongside the Deloitte team consulting extensively across the university's executive team.",
    entry:
      "A CIO/CDO-level modernisation story: aligning observability investment with an institution-wide cloud migration the same way Matt aligned Education Cloud adoption to it.",
  },
  {
    name: "UNSW Sydney",
    state: "NSW",
    segment: "Group of Eight",
    relationship:
      "Account Matt managed directly at Salesforce, including UNSW's procurement and IT governance process, then at monō ai held discussions on UNSW's digital transformation with a key adviser and member of the university's governing council, alongside the architecture consultant shaping its future state.",
    entry:
      "Already a Datadog customer and a public one: UNSW's platform team has presented at Datadog Summit and Datadog Live Sydney on making reliability a shared priority for engineering and leadership. The play is expansion and reference: grow the footprint across a hybrid cloud and on-prem estate, and let UNSW's story open the rest of the sector.",
    existingCustomer: true,
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
      "Direct relationship from Matt's state-wide public-sector and TAFE territory work at Salesforce, covering TAFE NSW's cloud and digital-delivery footprint across dozens of campuses.",
    entry:
      "A state-wide, multi-campus network is exactly the fragmented-footprint problem Matt has already solved once for a flagship account spanning dozens of sites, just at public-VET scale: land on one platform team's footprint, expand campus by campus.",
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
      "Facilitated discussions directly with JCU's Vice-Chancellor at HEDx, alongside Salesforce's Head of Education Cloud.",
    entry:
      "A genuinely distributed, cross-border campus footprint (regional Queensland plus an international Singapore campus) makes centralised visibility a concrete technical need, not an abstract pitch.",
  },
  {
    name: "Queensland University of Technology (QUT)",
    state: "QLD",
    segment: "Australian Technology Network, applied/industry-focused",
    relationship:
      "Worked directly at Salesforce, including closing a $200K expansion inside a compressed window while covering the national education territory; QUT's applied, industry-partnership-driven culture makes it a natural fit for enterprise platform conversations.",
    entry:
      "QUT's industry-partnership model and applied-research computing footprint make a platform-engineering-led pitch (reliability, developer velocity) resonate more than a pure IT-operations angle.",
  },
];

export const territoryFootnote =
  "This territory map is built from Matt's own relationships across ANZ higher-ed, carried over from his Tier-1 University and TAFE coverage at Salesforce and his higher-ed work at monō ai, not cold research. It's also backed by real partner and hyperscaler relationships built the same way: AWS solutions architects, the HEDx higher-ed community, and the ed-tech integrators and GSIs already running modernisation work inside these institutions. UNSW is the anchor: an existing, public Datadog customer and the natural reference for the rest of the sector.";
