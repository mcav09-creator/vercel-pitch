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

export const targetAccounts: TargetAccount[] = [
  {
    name: "Woolworths Group",
    vertical: "Retail",
    why: "Australia's largest retailer, heavy owned investment in e-commerce/digital and loyalty (Everyday Rewards), under constant pressure to match Amazon-grade experience speed at national scale.",
    trigger: "Any public statement on digital/loyalty platform investment or a leadership change in Chief Digital/Technology Officer.",
    entry: "Infrastructure consolidation + experience-velocity story to a Chief Digital/Technology Officer.",
    expand: "Land via a lower-risk property (a campaign microsite or loyalty experience) before expanding into core commerce.",
    capability: "Edge Network + ISR/PPR for national-scale traffic without the ops overhead.",
    validate: "Current stack ownership between digital and core commerce teams — who actually owns the property I'd land on.",
  },
  {
    name: "Cotton On Group",
    vertical: "Retail / digital-native",
    why: "Geelong-HQ'd global fast-fashion retailer running dozens of storefronts across regions; multi-region performance and speed-to-market are core to the brand's growth model.",
    trigger: "A new regional storefront launch or a public complaint/benchmark about site speed in a growth market.",
    entry: "Global edge performance + faster release cycles across markets, framed to whoever owns multi-region engineering.",
    expand: "Prove the model on one region's storefront, then templatize the migration across the remaining markets.",
    capability: "Global Edge Network + Fluid Compute for consistent performance across dozens of regional storefronts.",
    validate: "Which regions are already fastest/slowest today, and whether that's infra or a content/CDN problem.",
  },
  {
    name: "Airwallex",
    vertical: "Financial services / digital-native",
    why: "Melbourne-born fintech unicorn, API/developer-first product DNA, globally scaling — likely the most \"Vercel-native\" account on this list.",
    trigger: "New market/product launch requiring rapid surface iteration, or a public engineering blog post about DX investment.",
    entry: "Engineering-led, product-led growth motion — not a migration pitch, a platform-commitment-deepening pitch (AI SDK, observability, Fluid Compute).",
    expand: "Start with one high-visibility surface (docs, dashboard, or a new product line) and expand as engineering trust builds.",
    capability: "AI SDK + AI Gateway for any AI-native surfaces they're already building, plus observability for a team that already cares about DX.",
    validate: "Whether they're already on Vercel or a competitor, and who owns platform decisions vs. individual product teams.",
  },
  {
    name: "REA Group / realestate.com.au",
    vertical: "Media / marketplace",
    why: "Major ASX-listed digital marketplace, huge traffic volumes, search/listing performance directly tied to revenue.",
    trigger: "A public performance complaint, a new personalization/search feature announcement, or infrastructure cost commentary in earnings calls.",
    entry: "Performance + AI-driven personalization narrative to a VP Engineering/CTO, framed around conversion and infrastructure cost at scale.",
    expand: "Land on listing search/personalization, expand into the broader marketplace surface as conversion gains prove out.",
    capability: "ISR/PPR for listing pages at scale + AI SDK for personalization without a bespoke ML infra build.",
    validate: "Current infra cost-per-listing-view and whether personalization is already in-house or vendor-built.",
  },
  {
    name: "Judo Bank / Up",
    vertical: "Financial services — challenger / digital-native",
    why: "Digital-first challenger banks where product iteration speed and a clean, trustworthy digital experience are the whole value proposition.",
    trigger: "A new product launch, a rate/feature war with a major bank, or a public statement on engineering velocity as a differentiator.",
    entry: "Developer velocity as a competitive moat against the majors (CBA/NAB/Westpac/ANZ), positioned to a CTO/Head of Engineering.",
    expand: "Regulated-industry procurement rigor becomes the unlock for a CFO/Head of Risk conversation once engineering is bought in.",
    capability: "Fluid Compute + Firewall for a security-conscious, high-velocity fintech engineering org.",
    validate: "Current cloud/hosting vendor and whether the constraint is genuinely velocity or actually regulatory sign-off time.",
  },
];

export const targetAccountsFootnote =
  "Built from public signals only — company scale, digital ambition, and vertical fit to Vercel's stated ANZ traction. None of these five currently appear on Vercel's public customer list (checked live, August 2026), which reads as whitespace rather than a diligence gap. Before presenting this in the interview, each should be sanity-checked with a tool like BuiltWith or a job-posting search for \"Next.js\"/\"React\" in their engineering listings, and ideally a quick check with the Vercel recruiter or SE on existing account ownership.";
