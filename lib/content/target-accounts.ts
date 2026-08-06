export type TargetAccount = {
  name: string;
  vertical: string;
  why: string;
  trigger: string;
  entry: string;
  expand: string;
  capability: string;
  validate: string;
};

export const primaryTargetAccounts: TargetAccount[] = [
  {
    name: "Airwallex",
    vertical: "Financial services / digital-native",
    why: "Melbourne-born fintech unicorn, API/developer-first product DNA, globally scaling — likely the most \"Vercel-native\" account on this list. Airwallex and Vercel send similar signals to the market, which makes this as much a brand-fit play as a technical one.",
    trigger: "New market/product launch requiring rapid surface iteration, or a public engineering blog post about DX investment.",
    entry: "Become a thought partner first — share a POV, customer reference stories, and examples of how Vercel helps similar API/developer-first companies win — before proposing a small, jointly-built use case. The monō ai network (former GTM peers who ran multiple go-to-market teams before joining) gives a genuine way in.",
    expand: "Start with one high-visibility surface (docs, dashboard, or a new product line) and expand as engineering trust builds into deeper platform commitment — AI SDK, observability, Fluid Compute.",
    capability: "AI SDK + AI Gateway for AI-native surfaces they're already building, plus observability for a team that already cares about DX.",
    validate: "Whether they're already on Vercel or a competitor, and who owns platform decisions vs. individual product teams.",
  },
  {
    name: "REA Group / realestate.com.au",
    vertical: "Media / marketplace",
    why: "An entrenched React shop with a heavy AWS footprint and a mature, self-built micro-frontend platform called Argonaut. They don't need convincing on React or SSR — they need to be shown how offloading front-end infrastructure overhead accelerates squad velocity while protecting SEO-driven search revenue.",
    trigger: "A public performance complaint, a new personalization/search feature announcement, or infrastructure cost commentary in earnings calls.",
    entry: "Lead with lower TCO on micro-frontend orchestration — Next.js Multi-Zones and edge routing replace the ongoing platform-engineering cost of a bespoke system like Argonaut — positioned to Platform Engineering and Core Web Architecture leaders.",
    expand: "Prove it with a Core Web Vitals audit and a PoC scoped to one isolated property (e.g. Flatmates) before touching the core realestate.com.au engine; route procurement through AWS Marketplace against their existing AWS commit.",
    capability: "Global Edge Network + ISR + Speed Insights for Core Web Vitals at scale, plus Secure Compute, OIDC, and the Terraform provider for frictionless AWS integration.",
    validate: "Current infra cost-per-listing-view, and whether Argonaut's roadmap has real appetite for offloading routing/SSR to a managed platform.",
  },
  {
    name: "Judo Bank",
    vertical: "Financial services — regulated challenger",
    why: "An APRA-licensed challenger bank that just completed a serverless, event-driven core banking transformation — Thought Machine's Vault Core on AWS Lambda/Transit Gateway. They don't care about consumer SEO or traffic volume; they care about banker productivity tools, broker portals, and APRA CPS 234 compliance.",
    trigger: "A new product launch, a rate/feature war with a major bank, or a public statement on engineering velocity as a differentiator.",
    entry: "Meet their architecture, not fight it — Secure Compute routes front-end traffic into their private AWS VPC via Transit Gateway, positioned to the Head of Engineering & Architecture as a serverless front-end layer that mirrors their own stack.",
    expand: "Focus on the non-core web footprint first (rate calculators, broker portals, loan intake) to win engineering trust, then use a pre-built APRA CPS 234 compliance mapping document to fast-track the CISO/risk conversation.",
    capability: "Secure Compute + OIDC + SOC 2 Type II/ISO 27001 for compliance-first deployment, plus per-PR Preview Deployments for their 14+ decoupled domain squads.",
    validate: "Current cloud/hosting vendor for front-end properties, and whether the real constraint is engineering velocity or regulatory sign-off time.",
  },
];

export type WatchlistAccount = {
  name: string;
  vertical: string;
  why: string;
  nextStep: string;
};

export const watchlistAccounts: WatchlistAccount[] = [
  {
    name: "Woolworths Group",
    vertical: "Retail",
    why: "Australia's largest retailer, heavy owned investment in e-commerce/digital and loyalty (Everyday Rewards), under constant pressure to match Amazon-grade experience speed at national scale.",
    nextStep: "Map current stack ownership between digital and core commerce teams before proposing an entry property — likely a lower-risk campaign microsite or loyalty experience rather than core commerce.",
  },
  {
    name: "Cotton On Group",
    vertical: "Retail / digital-native",
    why: "Geelong-HQ'd global fast-fashion retailer running dozens of storefronts across regions; multi-region performance and speed-to-market are core to the brand's growth model.",
    nextStep: "Benchmark which regions are fastest/slowest today and whether that's an infra or content/CDN problem before pitching global edge performance.",
  },
];

export const targetAccountsFootnote =
  "Built from public signals only — company scale, digital ambition, and vertical fit to Vercel's stated ANZ traction. None of these five currently appear on Vercel's public customer list (checked live, August 2026), which reads as whitespace rather than a diligence gap. Before presenting this in the interview, each should be sanity-checked with a tool like BuiltWith or a job-posting search for \"Next.js\"/\"React\" in their engineering listings, and ideally a quick check with the Vercel recruiter or SE on existing account ownership.";
