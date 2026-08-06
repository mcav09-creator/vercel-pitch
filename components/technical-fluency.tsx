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
          This is a real, streamed chat built with the{" "}
          <span className="text-foreground">Vercel AI SDK</span>, routed through{" "}
          <span className="text-foreground">AI Gateway</span>, grounded on a small
          retrieval layer over this résumé, this plan, and Vercel&apos;s product
          surface — not a scripted demo. It answers as me, in first person, and
          says &ldquo;I&apos;d want to validate that&rdquo; when it doesn&apos;t
          have grounding, the same way I would.
        </p>

        <div className="mt-8">
          <ChatPanel aiConfigured={aiConfigured} />
        </div>
      </div>
    </section>
  );
}
