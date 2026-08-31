import { ChatPanel } from "./chat-panel";

export function TechnicalFluency({ aiConfigured }: { aiConfigured: boolean }) {
  return (
    <section id="technical" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="section-label mb-3">03 · Technical Fluency</p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ask me something. Really.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This is a real, streamed chat, not a scripted demo, grounded on a
          small retrieval layer over this résumé and this plan. I&apos;m not
          pitching myself as an observability engineer: I&apos;m showing you
          I understand why observability matters, because I hand-built the
          same discipline into this site&apos;s own infrastructure. Rate
          limiting to protect it from abuse, a &ldquo;last verified&rdquo;
          check that actually runs on a schedule instead of a date I forgot
          to update, and a retrieval layer that answers honestly when it
          doesn&apos;t have grounding, the same way I would in a deal review.
        </p>

        <div className="mt-8">
          <ChatPanel aiConfigured={aiConfigured} />
        </div>
      </div>
    </section>
  );
}
