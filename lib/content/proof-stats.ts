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
    value: "$1.3M+",
    label: "Christian Education Ministries, total contract value",
    detail:
      "Landed at $200k ACV, a new customer in a new market, and grew it to $400k ACV across the Salesforce ecosystem (Student Information System on Education Cloud + Slack), spanning 17 schools and 14 distance-education locations.",
  },
];
