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
      "Map the named account book against public signals: tech stack, engineering job postings, digital investment announcements.",
      "Map Vercel's partner surface in ANZ — SI/Solution Partner network, AWS relationship — and identify which named accounts already touch it.",
      "Build the first 5 account plans using the same why/trigger/entry/expand structure as this site's Target Accounts section.",
      "Shadow SE-led technical conversations to calibrate where I can run point vs. where I still need one.",
    ],
  },
  {
    period: "Days 31-60",
    title: "Build pipeline",
    items: [
      "Convert the top account plans into active outreach — multi-threaded, targeting both a technical buyer and an economic buyer per account.",
      "Stand up the first co-sell motions with identified SI/hyperscaler partners on 2-3 accounts.",
      "Get the first qualified opportunities into MEDDPICC-disciplined pipeline with real close dates.",
    ],
  },
  {
    period: "Days 61-90",
    title: "Prove the model",
    items: [
      "First deals in late-stage evaluation with named economic buyers and validated technical champions.",
      "Refine the account-planning template based on what actually worked in the first 60 days.",
      "Ramp toward full quota carrying — validated pipeline coverage in place for the next two quarters.",
    ],
  },
];
