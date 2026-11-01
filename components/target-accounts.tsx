import Link from "next/link";
import { territoryAccounts, territoryFootnote } from "@/lib/content/target-accounts";
import {
  getTargetAccountVerification,
  VERIFIED_ACCOUNT_NAMES,
} from "@/lib/target-account-status";

export async function TargetAccounts() {
  const verification = await getTargetAccountVerification();
  // Only count accounts still on the whitespace list, so an older stored
  // result (which may include the anchor account) can't skew the summary.
  const checked = new Set<string>(VERIFIED_ACCOUNT_NAMES);
  const whitespaceResults =
    verification?.accounts.filter((a) => checked.has(a.name)) ?? [];
  const nowListed = whitespaceResults.filter((a) => a.foundOnCustomerList);

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
          Tier-1 University and TAFE work at Salesforce and his higher-ed work
          at monō ai. One is already a Datadog customer to expand and
          reference; the rest are whitespace. Several are hybrid institutions
          actively transitioning workloads to the cloud, exactly where this
          role is built to unlock territory.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {territoryAccounts.map((account) => (
            <div key={account.name} className="card flex flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold">{account.name}</h3>
                <span className="section-label whitespace-nowrap">
                  {account.state}
                </span>
              </div>
              {account.existingCustomer && (
                <p className="mt-2 inline-block rounded-full border border-purple px-2.5 py-0.5 font-mono text-[11px] text-purple-text">
                  Datadog customer · anchor account
                </p>
              )}
              <p className="mt-1.5 text-xs font-medium text-accent-dim">
                {account.segment}
              </p>

              <dl className="mt-4 flex-1 space-y-2.5 border-t border-border pt-4 text-sm">
                <Row label="Relationship" value={account.relationship} />
                <Row label="Datadog entry angle" value={account.entry} />
              </dl>
              <Link
                href={`/gtm?account=${account.slug}#deep-dive`}
                className="mt-5 inline-flex w-fit items-center rounded-full border border-purple/70 bg-purple/15 px-3.5 py-1.5 text-xs font-medium text-purple-text transition hover:bg-purple/30"
              >
                Run AI deep dive →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-accent-dim">
          {territoryFootnote}
        </p>

        {verification && whitespaceResults.length > 0 && (
          <p className="mt-2 max-w-3xl font-mono text-xs text-accent-dim">
            The other {whitespaceResults.length}, last checked against
            Datadog&apos;s public customer page:{" "}
            {new Date(verification.checkedAt).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            {" · "}
            {nowListed.length > 0
              ? `now listed: ${nowListed.map((a) => a.name).join(", ")}`
              : "none listed there"}
            {" (automated weekly check; public pages don't show every customer)"}
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
