import { proofStats } from "@/lib/content/proof-stats";

export function ProofBand() {
  return (
    <section id="proof" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-3">01 · Proof</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Numbers pulled straight from the CV. No rounding up.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {proofStats.map((stat) => (
            <div key={stat.label} className="bg-surface p-6">
              <div className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-muted">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
