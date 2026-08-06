import {
  primaryTargetAccounts,
  watchlistAccounts,
  targetAccountsFootnote,
} from "@/lib/content/target-accounts";
import { getTargetAccountVerification } from "@/lib/target-account-status";

export async function TargetAccounts() {
  const verification = await getTargetAccountVerification();

  return (
    <section id="accounts" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">05 · Point of View: Target Accounts</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Three accounts I&apos;ve gone deep on, built the way I&apos;d actually
          build a territory plan.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Depth over breadth: these three (financial services, media, and a
          regulated challenger bank) got the full research pass. Two more
          retail accounts are on my radar below, not yet worked to the same
          level.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {primaryTargetAccounts.map((account) => (
            <div key={account.name} className="card p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold">{account.name}</h3>
                <span className="section-label whitespace-nowrap">
                  {account.vertical}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {account.why}
              </p>

              <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
                <Row label="Likely trigger" value={account.trigger} />
                <Row label="Entry point" value={account.entry} />
                <Row label="Land & expand" value={account.expand} />
                <Row label="Vercel capability" value={account.capability} />
              </dl>

              <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-accent-dim">
                <span className="font-medium text-muted">
                  What I&apos;d validate first:
                </span>{" "}
                {account.validate}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="section-label mb-1.5">On my radar</p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Retail accounts I&apos;d prioritize next, same vertical-fit logic,
            not yet worked to the same depth as the three above.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {watchlistAccounts.map((account) => (
              <div
                key={account.name}
                className="rounded-xl border border-dashed border-border p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold">{account.name}</h3>
                  <span className="section-label whitespace-nowrap">
                    {account.vertical}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {account.why}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-accent-dim">
                  <span className="font-medium text-muted">Next step:</span>{" "}
                  {account.nextStep}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-accent-dim">
          {targetAccountsFootnote}
        </p>

        {verification && (
          <p className="mt-2 max-w-3xl font-mono text-xs text-accent-dim">
            Last verified against Vercel&apos;s public customer list:{" "}
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
