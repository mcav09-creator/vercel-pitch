import { territoryAccounts, territoryFootnote } from "@/lib/content/target-accounts";
import { getTargetAccountVerification } from "@/lib/target-account-status";

export async function TargetAccounts() {
  const verification = await getTargetAccountVerification();

  return (
    <section id="accounts" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">05 · Territory & Relationship Map</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Nine ANZ higher-ed relationships, built the way this role actually
          asks you to build a territory.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Not cold research: these are existing relationships from Matt&apos;s
          Tier-1 University and TAFE territory work at Salesforce, the same
          mix of existing relationships and aspirational contacts this
          role&apos;s own relationship-map requirement calls for. Several are
          hybrid institutions actively transitioning workloads to the cloud,
          exactly where this role is built to unlock territory.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {territoryAccounts.map((account) => (
            <div key={account.name} className="card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold">{account.name}</h3>
                <span className="section-label whitespace-nowrap">
                  {account.state}
                </span>
              </div>
              <p className="mt-1.5 text-xs font-medium text-accent-dim">
                {account.segment}
              </p>

              <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
                <Row label="Relationship" value={account.relationship} />
                <Row label="Datadog entry angle" value={account.entry} />
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-accent-dim">
          {territoryFootnote}
        </p>

        {verification && (
          <p className="mt-2 max-w-3xl font-mono text-xs text-accent-dim">
            Last verified against Datadog&apos;s public customer list:{" "}
            {new Date(verification.checkedAt).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {" · "}
            {verification.accounts.some((a) => a.foundOnCustomerList)
              ? "one or more now appear on it"
              : "still none appear on it"}
            {" (automated weekly check)"}
          </p>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="section-label mb-0.5">{label}</dt>
      <dd className="leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
