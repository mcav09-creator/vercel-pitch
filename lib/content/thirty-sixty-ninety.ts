export type PlanPhase = {
  period: string;
  title: string;
  items: string[];
};

export const thirtySixtyNinety: PlanPhase[] = [
  {
    period: "Days 1-30",
    title: "Map the territory",
    items: [
      "Formalize the relationship map from this site into active account plans: Monash, Sydney Uni, UNSW, UTS, UNE, TAFE NSW, Western Sydney Uni, JCU, and QUT.",
      "Map Datadog's partner surface in ANZ higher-ed: AWS/Azure/GCP Marketplace relationships, GSIs, and ed-tech integrators already inside these institutions.",
      "Build the first accounts plans using the same relationship/segment/entry structure as this site's Territory Map section.",
      "Shadow SE-led technical conversations to calibrate where I can run point vs. where I still need one.",
    ],
  },
  {
    period: "Days 31-60",
    title: "Build pipeline",
    items: [
      "Convert the top relationships into active outreach: multi-threaded, targeting both a technical buyer (Platform Engineering, SRE) and an economic buyer (CIO, CDO) per institution.",
      "Stand up the first co-sell motions with identified hyperscaler and GSI partners on 2-3 accounts.",
      "Get the first qualified opportunities into MEDDIC-disciplined pipeline with real close dates.",
    ],
  },
  {
    period: "Days 61-90",
    title: "Prove the model",
    items: [
      "First deals in late-stage evaluation with named economic buyers and validated technical champions.",
      "Refine the account-planning template based on what actually worked in the first 60 days.",
      "Ramp toward full quota carrying, validated pipeline coverage in place for the next two quarters.",
    ],
  },
];
