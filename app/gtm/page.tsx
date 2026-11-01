import type { Metadata } from "next";
import Link from "next/link";
import { getLatestBrief } from "@/lib/gtm/brief";
import { GtmWorkspace } from "@/components/gtm/workspace";
import { BackToTop } from "@/components/back-to-top";

export const metadata: Metadata = {
  title: "AI-native GTM · Matt Cavallaro",
  description:
    "How Matt runs his mornings, accounts and BDR syncs with AI: a live morning brief on Australian higher ed, account deep dives with sequences, and BDR sync notes.",
};

// The brief changes once a day; re-check storage every 10 minutes.
export const revalidate = 600;

const steps = [
  { id: "brief", number: "01", label: "Morning brief" },
  { id: "deep-dive", number: "02", label: "Account deep dive" },
  { id: "sync", number: "03", label: "BDR sync" },
];

export default async function GtmPage() {
  const brief = await getLatestBrief();

  return (
    <main className="flex-1">
      <header className="relative overflow-hidden px-6 pb-14 pt-10">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            href="/"
            className="font-mono text-xs text-accent-dim transition hover:text-foreground"
          >
            ← back to the pitch
          </Link>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
            <span className="text-foreground">$</span> run gtm --morning
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-purple-text">AI-native</span> GTM, running live.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Not a mock-up. This is the workflow I&apos;d run in the territory: a brief that&apos;s waiting
            for me each morning, account research that turns a signal into a sequence, and BDR sync
            notes that write themselves.
          </p>

          <nav aria-label="Steps" className="section-nav mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {steps.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="section-nav-number">{s.number}</span>
                    {" · "}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <GtmWorkspace initialBrief={brief} />

      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="section-label mb-3">How it&apos;s built</p>
          <ul className="grid grid-cols-1 gap-3 text-sm leading-relaxed text-muted sm:grid-cols-2">
            <li className="card p-5">
              <span className="text-foreground">Scheduled agent.</span> A cron job runs before 6am
              Sydney time, searches the web through Vercel AI Gateway&apos;s Perplexity search, and
              Claude writes the brief.
            </li>
            <li className="card p-5">
              <span className="text-foreground">Sources, not guesses.</span> Search and writing are
              separate steps. The writer can only cite numbered search results, so every link is
              real, and a person is named only if a source names them.
            </li>
            <li className="card p-5">
              <span className="text-foreground">Built for a team.</span> Each sequence touch is
              assigned to the BDR or the AE, and the sync notes turn that into dated actions.
            </li>
            <li className="card p-5">
              <span className="text-foreground">Cost-aware.</span> Account research is cached for
              the day and rate-limited, and the AI budget is capped. Observability for my own tools,
              not just the customer&apos;s.
            </li>
          </ul>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
