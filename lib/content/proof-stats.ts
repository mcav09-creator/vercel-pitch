export type ProofStat = {
  value: string;
  label: string;
  detail: string;
};

export const proofStats: ProofStat[] = [
  {
    value: "100%",
    label: "Median quota attainment, 5-yr avg",
    detail: "vs. <50% team average at Salesforce",
  },
  {
    value: "$0→$2M",
    label: "TCV market built from scratch",
    detail: "Launched the ANZ K-12 Public District market from nothing",
  },
  {
    value: "200%+",
    label: "Multi-year target attainment",
    detail: "Consecutive years above 200%, 3x over multi-year targets",
  },
  {
    value: "140%",
    label: "New logo attainment",
    detail: "In a newly expanded Tier-1 university / TAFE territory",
  },
  {
    value: "$1M ACV",
    label: "Largest single deal — Christian Education Ministries",
    detail:
      "20% YoY contract growth over 3 years. First non-government K-12 contract to surpass $500k — a record-setting account with Salesforce head-office recognition.",
  },
];
