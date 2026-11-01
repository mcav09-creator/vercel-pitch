import {
  partnerDatadog,
  partnerIntro,
  partnerSteps,
} from "@/lib/content/partner-motion";

export function PartnerMotion() {
  return (
    <section id="partners" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-3">04 · Partners</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Partners are how one AE becomes a sales team.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {partnerIntro}
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {partnerSteps.map((step, i) => (
            <li key={step.title} className="card p-6">
              <span className="font-mono text-sm font-semibold text-purple-text">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-purple/60 bg-purple/10 p-6">
          <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
            For Datadog
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            {partnerDatadog}
          </p>
        </div>
      </div>
    </section>
  );
}
