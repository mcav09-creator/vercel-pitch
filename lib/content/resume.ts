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
    "Enterprise AE selling cloud and AI platforms into Australian education, preceded by fifteen years as an education leader.",
  email: "mcav09@gmail.com",
  phone: "0401441949",
};

export const resumeSummary =
  "Enterprise AE selling cloud and AI platforms into Australian education, preceded by fifteen years as an education leader. Five years' field closing experience across mid-market and enterprise, with 100% median quota attainment against a team median below 50% and 140% new logo attainment. Builds pipeline independently: created an entire ANZ K-12 market for Salesforce from a standing start, convening the buying community, shaping the tenders that followed, and generating $3M+ in pipeline where no territory previously existed. Works the hybrid-to-cloud transition directly. Extensive experience working with a range of SI partners and consultants. Hands-on technical fluency across cloud architecture, APIs and AI workflows.";

export const resumeCurrentRole: ResumeSection = {
  heading: "Current role",
  entries: [
    {
      role: "GTM Lead, Education & Social Enterprises",
      org: "monō ai",
      dates: "April 2026 - present",
      bullets: [
        "Pipeline from zero: Built and executed a national territory plan across ANZ higher education and public-benefit accounts with no existing installed base, closing early enterprise deals on a path to $1M USD ARR within twelve months.",
        "Executive access: Reached the president of Western Governors University (300,000+ students) directly, progressing to CIO and CTO on a student retention deployment now in negotiation.",
        "Partner-led coverage: Working with a partner to solve use cases at UTS shared across the sector and with an external architecture consultant shaping UNSW's future state.",
        "Technical value proof: Engineered CLI-based, clickable prototypes in place of static architecture slides, demonstrating live application behaviour, API orchestration and workflow visibility to technical decision-makers.",
      ],
    },
  ],
};

export const resumePreviousExperience: ResumeSection = {
  heading: "Previous experience",
  entries: [
    {
      role: "Account Executive, Enterprise Education",
      org: "Salesforce",
      dates: "Feb 2024 - April 2026",
      bullets: [
        "Higher education portfolio: UNSW, UTS and University of New England alongside TAFE NSW, the largest ANZ Catholic diocese and state-wide K-12 systems across the east coast.",
        "New logo performance: 94% attainment in a newly expanded territory, 200%+ against multi-year targets, 140% new logo attainment.",
        "Winning against an incumbent: Won an early tender at University of New England for their AI lab against an entrenched Microsoft footprint; built and sustained the Vice-Chancellor relationship, the only AE on the ANZ team to do so.",
        "Hybrid-to-cloud pursuit: Partnered with the AWS field team on TAFE NSW's exit from on-premise infrastructure at Villawood, aligning platform value to the migration business case under NSW Government cloud-first direction.",
        "National coverage under pressure: Covered the entire Australian education territory when the team turned over, identifying and closing a $200K expansion at QUT inside a compressed window by trading capability the customer needed against seats and licences we wanted.",
        "Market building: Established a Salesforce partnership with the HEDx higher education platform, described internally as the strongest education partnership the team had held; selected to represent the ANZ education team at Salesforce's Education Summit in Chicago.",
      ],
    },
    {
      role: "Account Executive, Mid-Market Education",
      org: "Salesforce",
      dates: "June 2021 - February 2024",
      bullets: [
        "Built a market with no installed base: K-12 buying in ANZ was organised around student information systems, which Salesforce did not offer. Convened independent and Catholic school groups with the Association of Independent Schools NSW into a recurring forum, brought in a partner who built the missing layer, and the resulting tenders were written around that architecture, generating $3M+ pipeline, $700K ACV and $2M TCV, with deals still closing four and five years on.",
        "Deal range: Transactional through transformational deals, including land use cases from $50k to above $250K ACV and $750K-$1mil TCV.",
        "Reference customer: Closed Christian Education Ministries, which expanded across Education Cloud, Slack, Data Cloud, Agentforce and Marketing Cloud over 17 schools to become Salesforce's leading K-12 education reference customer, and a direct influence on subsequent Catholic and Anglican school system tenders.",
        "Sustained attainment: 100% median quota attainment across five years against a team median below 50%, exceeding multi-year targets three times with consecutive years above 200%, in a territory where no AE had previously cleared 50%.",
      ],
    },
  ],
};

export const resumeLeadership: ResumeSection = {
  heading: "Earlier leadership & institutional experience",
  entries: [
    {
      role: "Lead Australia Account Executive (Academic Advisor)",
      org: "Crimson Education",
      dates: "Aug 2020 - Mar 2021",
      bullets: [],
    },
    {
      role: "Director of Student Development & Wellbeing",
      org: "Knox Grammar School, Wahroonga Preparatory Campus",
      dates: "Jan 2020 - Jan 2021",
      bullets: [],
    },
    {
      role: "Head of Positive Education",
      org: "Knox Grammar School",
      dates: "Jan 2016 - Dec 2019",
      bullets: [],
    },
    {
      role: "Head of Year, Geography & English Teacher",
      org: "Knox Grammar School",
      dates: "Jan 2006 - Dec 2016",
      bullets: [],
    },
  ],
};

export const resumeCompetencies = [
  {
    title: "Higher education",
    detail: "National coverage experience across universities, TAFE and K-12 systems.",
  },
  {
    title: "Self-generated pipeline",
    detail:
      "Repeatable methodology for opening markets with no installed base: relationship mapping, convening buying communities, pre-tender requirement shaping, partner-led coverage.",
  },
  {
    title: "Hybrid-to-cloud transition",
    detail:
      "On-premise legacy estates and migration drivers in the sector; joint pursuit with hyperscaler field teams; security, sovereignty and IRAP accreditation as evaluation criteria.",
  },
  {
    title: "Enterprise deal craft",
    detail:
      "Multi-threaded engagement across Vice-Chancellors, CIOs, Chief Digital Officers and procurement; negotiating pricing and commercial terms on value and ROI; forecast accuracy across long, multi-stage cycles.",
  },
  {
    title: "University procurement",
    detail:
      "RFP and RFT response and pre-tender influence, probity, panel arrangements, ICT and Master ICT Agreements, security and privacy assessment.",
  },
  {
    title: "Technical fluency",
    detail:
      "Cloud architecture, API orchestration, CLI prototyping, AI workflow governance; translating technical architecture into business value for technical and executive audiences.",
  },
];

export const resumeEducation = [
  {
    school: "Deakin University",
    credential: "MEd, Leadership and Administration",
    detail: "2016",
  },
  {
    school: "Boston University",
    credential: "MA, Secondary English",
    detail: "2003",
  },
  {
    school: "Northeastern University",
    credential: "BA, Psychology & English Literature, cum laude",
    detail: "2002 — Baseball scholarship; Athletes in Service to America (AmeriCorps).",
  },
];
