import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content/profile";
import {
  resumeHeader,
  resumeSummary,
  resumeCurrentRole,
  resumePreviousExperience,
  resumeLeadership,
  resumeCompetencies,
  resumeEducation,
  type ResumeSection,
} from "@/lib/content/resume";

export const metadata: Metadata = {
  title: "Matt Cavallaro, Résumé",
  description: resumeHeader.tagline,
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 flex items-center justify-between font-mono text-xs text-accent-dim">
          <Link href="/" className="transition hover:text-foreground">
            ← back to the pitch
          </Link>
          <a
            href={profile.resumePdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-foreground"
          >
            Download PDF ↓
          </a>
        </div>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {resumeHeader.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {resumeHeader.tagline}
          </p>
          <p className="mt-4 font-mono text-xs text-accent-dim">
            {resumeHeader.email} · {resumeHeader.phone}
          </p>
        </header>

        <ResumeBlock title="Executive summary">
          <p className="text-sm leading-relaxed text-muted">{resumeSummary}</p>
        </ResumeBlock>

        <ResumeExperienceSection section={resumeCurrentRole} />
        <ResumeExperienceSection section={resumePreviousExperience} />
        <ResumeExperienceSection section={resumeLeadership} />

        <ResumeBlock title="Core competencies & technical fluency">
          <div className="space-y-4">
            {resumeCompetencies.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </ResumeBlock>

        <ResumeBlock title="Education">
          <div className="space-y-4">
            {resumeEducation.map((e) => (
              <div key={e.school}>
                <p className="text-sm font-medium text-foreground">
                  {e.school}
                </p>
                <p className="text-sm text-muted">{e.credential}</p>
                {e.detail && (
                  <p className="text-xs text-accent-dim">{e.detail}</p>
                )}
              </div>
            ))}
          </div>
        </ResumeBlock>

        <footer className="mt-20 border-t border-border pt-8 pb-8">
          <p className="font-mono text-xs text-accent-dim">
            {profile.name} · {profile.targetRole} candidate
          </p>
        </footer>
      </div>
    </main>
  );
}

function ResumeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <p className="section-label mb-5">{title}</p>
      {children}
    </section>
  );
}

function ResumeExperienceSection({ section }: { section: ResumeSection }) {
  return (
    <ResumeBlock title={section.heading}>
      <div className="space-y-8">
        {section.entries.map((entry) => (
          <div key={`${entry.role}-${entry.org}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-medium text-foreground">
                {entry.role}
              </p>
              <p className="font-mono text-xs text-accent-dim">
                {entry.dates}
              </p>
            </div>
            <p className="text-sm text-muted">{entry.org}</p>
            {entry.bullets.length > 0 && (
              <ul className="mt-3 space-y-2">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-dim" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </ResumeBlock>
  );
}
