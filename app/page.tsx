import { Hero } from "@/components/hero";
import { ProofBand } from "@/components/proof-band";
import { FitSection } from "@/components/fit-section";
import { TechnicalFluency } from "@/components/technical-fluency";
import { PartnerMotion } from "@/components/partner-motion";
import { TargetAccounts } from "@/components/target-accounts";
import { ClosePlan } from "@/components/close-plan";

// The Target Accounts section reads a cron-updated "last verified" status
// from Blob storage; revalidate hourly (ISR) rather than on every request
// or fully statically, so it stays fresh without adding request-time
// latency on every page load.
export const revalidate = 3600;

export default function Home() {
  const aiConfigured = Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.OPENAI_API_KEY,
  );

  return (
    <main className="flex-1">
      <Hero />
      <ProofBand />
      <FitSection />
      <TechnicalFluency aiConfigured={aiConfigured} />
      <PartnerMotion />
      <TargetAccounts />
      <ClosePlan />
    </main>
  );
}
