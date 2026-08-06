export type ResumeEntry = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
};

export type ResumeSection = {
  heading: string;
  entries: ResumeEntry[];
};

export const resumeHeader = {
  name: "Matt Cavallaro",
  tagline:
    "A driven sales executive passionate about educating clients and co-constructing the best solutions for their desired outcomes.",
  email: "mcav09@gmail.com",
  phone: "0401441949",
};

export const resumeSummary =
  "Enterprise sales leader with a 5-year track record at Salesforce averaging 100% median quota attainment (vs. <50% team average), exceeding multi-year targets 3x with consecutive 200%+ performance years, and building the ANZ K-12 market from $0 to $2M TCV. Combines 15 years of hands-on experience as a school and university executive with technical execution, building custom multi-agent workflow prototypes to validate complex enterprise deals and establish a path to $2M ARR.";

export const resumeCurrentRole: ResumeSection = {
  heading: "Current role",
  entries: [
    {
      role: "GTM Lead - Education & Social Enterprises",
      org: "monō ai",
      dates: "April 2026 - present",
      bullets: [
        "Territory Strategy & Execution: Engineered and executed a high-growth territory plan targeting complex ANZ Higher Education, TAFE, and public-benefit enterprise accounts.",
        "Technical Value Proof: Engineered Create AI prototypes to replace static architecture slides, demonstrating real-time application behavior, API orchestration, and workflow visibility directly to technical decision-makers.",
        "Pipeline Acceleration: Closed early enterprise accounts while building a channelled pipeline projected to scale to $2M ARR within 12 months.",
        "Product-Market Alignment: Partnering directly with engineering and product teams to translate public sector compliance, governance, and operational requirements into actionable product roadmap features.",
        "Consultative Selling: Helping enterprise tech/product/business leaders evaluate modern AI infrastructure and modern web architectures to deliver business-critical internal and external experiences.",
      ],
    },
  ],
};

export const resumePreviousExperience: ResumeSection = {
  heading: "Previous experience",
  entries: [
    {
      role: "Account Executive - Enterprise Education",
      org: "Salesforce",
      dates: "Feb 2024 – April 2026",
      bullets: [
        "Strategic Territory Expansion: Managed complex, multi-year cloud procurement cycles across Tier-1 Universities, large TAFE systems, and State-wide K-12 districts across the Australian East Coast.",
        "Quota Performance: Achieved 94% quota attainment in a newly expanded territory, exceeding 200%+ on multi-year targets and achieving 140% New Logo Attainment.",
        "C-Level Executive Alignment: Led multi-threaded sales campaigns targeting CIOs, Chief Digital Officers, and Procurement Heads to align cloud infrastructure modernization with institutional outcomes.",
      ],
    },
    {
      role: "Account Executive - Education",
      org: "Salesforce",
      dates: "June 2021 - 2024",
      bullets: [
        "Consistently Top-Tier Performer: Maintained a 100% median quota achievement over 5 years (compared to <50% team average), exceeding multi-year targets 3x with consecutive years above 200%.",
        "New Market Creation: Built and launched the ANZ K-12 Public District market from scratch, generating $700k ACV, $3M pipeline, and $2M TCV.",
        "Partner Ecosystem Expansion: Established and co-sold alongside strategic System Integrators (SIs) and cloud partners to scale deployment and drive platform consumption.",
        "Referenceability: Secured the first 3 Education Cloud enterprise customer implementations live across ANZ.",
      ],
    },
    {
      role: "Account Executive (Academic Advisor)",
      org: "Crimson Education",
      dates: "Aug 2020 - March 2021",
      bullets: [],
    },
  ],
};

export const resumeLeadership: ResumeSection = {
  heading: "Previous leadership & institutional experience",
  entries: [
    {
      role: "Head of Positive Education, Head of Year",
      org: "Knox Grammar School",
      dates: "Jan 2006 - Dec 2019",
      bullets: [],
    },
  ],
};

export const resumeCompetencies = [
  {
    title: "GTM & Commercial Execution",
    detail:
      "Full Sales Cycle Management, MEDDPICC, Value-Based Selling, Executive Alignment, Multi-Threaded Deal Execution, Co-Selling & Channel Strategy.",
  },
  {
    title: "GenAI & Technical Acumen",
    detail:
      "AI/ML Workflows, Autonomous AI Agents, RAG Architectures, Hands-On CLI/Terminal Prototyping, Developer Experience (DX), API Integrations, PoC Execution.",
  },
  {
    title: "Enterprise & Public Sector",
    detail:
      "Higher Education, Public Sector, Enterprise Digital Transformation, SI & Ecosystem Partnerships (GSI, consultants, Hyperscalers).",
  },
];

export const resumeEducation = [
  {
    school: "Deakin University",
    credential: "MEd Leadership and Admin",
    detail: "",
  },
  {
    school: "Boston University",
    credential: "MA Secondary English",
    detail: "Graduate Assistant Coaching Scholarship",
  },
  {
    school: "Northeastern University",
    credential: "BA Psych & English Lit",
    detail:
      "Cum Laude & Baseball Scholarship, Athletes in Service to America Member (Americorps)",
  },
];
