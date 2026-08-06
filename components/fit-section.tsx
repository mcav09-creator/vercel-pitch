import { fitPillars } from "@/lib/content/fit-pillars";

export function FitSection() {
  return (
    <section id="fit" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-3">02 · The Fit</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Mapped directly to the JD&apos;s &ldquo;About You&rdquo; bullets — including
          the honest gap.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {fitPillars.map((pillar) => (
            <div key={pillar.title} className="card p-6">
              <h3 className="text-base font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.proof}
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="section-label mb-1.5">In ANZ SaaS</p>
                <p className="text-sm leading-relaxed text-foreground">
                  {pillar.application}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
