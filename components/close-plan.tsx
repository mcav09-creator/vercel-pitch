import { thirtySixtyNinety } from "@/lib/content/thirty-sixty-ninety";
import { profile } from "@/lib/content/profile";

export function ClosePlan() {
  return (
    <section id="plan" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-3">06 · 30-60-90</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          What I&apos;d actually do with the first quarter.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {thirtySixtyNinety.map((phase) => (
            <div key={phase.period} className="card p-6">
              <p className="section-label">{phase.period}</p>
              <h3 className="mt-1 text-base font-semibold">{phase.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-dim" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-16 text-center">
          <p className="max-w-xl text-balance text-xl font-medium">
            Let&apos;s talk about the ANZ Majors book.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-hover hover:bg-surface"
            >
              LinkedIn
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-hover hover:bg-surface"
            >
              Résumé
            </a>
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-5xl border-t border-border pt-8 text-center">
        <p className="font-mono text-xs text-accent-dim">
          Built with Claude Code. Shipped on Vercel.{" "}
          <a
            href={profile.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-muted"
          >
            View the source
          </a>
        </p>
      </footer>
    </section>
  );
}
