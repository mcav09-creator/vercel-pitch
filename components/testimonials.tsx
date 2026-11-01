import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section aria-label="What people say" className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
          What people say
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col p-6">
              <span aria-hidden className="font-serif text-4xl leading-none text-purple-text">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-foreground underline decoration-purple-text/60 underline-offset-4 transition hover:text-purple-text"
                  >
                    {t.name}
                    <span className="sr-only"> on LinkedIn</span>
                    <span aria-hidden className="ml-1 text-xs text-purple-text">↗</span>
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-foreground">{t.name}</span>
                )}
                <p className="mt-0.5 text-xs text-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
