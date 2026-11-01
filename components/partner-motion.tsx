import {
  hedxFeature,
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

        <HedxFeature />

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

function HedxFeature() {
  const { title, points, podcast } = hedxFeature;
  return (
    <div className="card mt-6 grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2">
      <div>
        <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
          Featured partner
        </p>
        <h3 className="text-lg font-semibold">{title}</h3>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-text" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center rounded-lg border border-border bg-surface-2 p-3 sm:p-5">
        <p className="mb-1.5 font-mono text-xs uppercase tracking-[0.08em] text-accent-dim">
          HEDx podcast
        </p>
        <p className="text-base font-semibold">{podcast.title}</p>
        <p className="mt-1 text-sm text-muted">{podcast.guest}</p>

        {podcast.spotifyEpisodeId ? (
          <iframe
            title={podcast.title}
            src={`https://open.spotify.com/embed/episode/${podcast.spotifyEpisodeId}?theme=0`}
            className="mt-4 w-full rounded-xl"
            height={152}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={podcast.episodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-purple px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
            >
              Listen to the episode ↗
            </a>
            <a
              href={podcast.spotifyShowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:border-border-hover"
            >
              Spotify
            </a>
            <a
              href={podcast.appleShowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:border-border-hover"
            >
              Apple Podcasts
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
