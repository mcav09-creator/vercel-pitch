import { targetAccounts, targetAccountsFootnote } from "@/lib/content/target-accounts";

export function TargetAccounts() {
  return (
    <section id="accounts" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-3">05 · Point of View: Target Accounts</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Five ANZ accounts, one per vertical the JD calls out. A hypothesis-driven
          first pass, built the way I&apos;d actually build a territory plan.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {targetAccounts.map((account) => (
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

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-accent-dim">
          {targetAccountsFootnote}
        </p>
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
