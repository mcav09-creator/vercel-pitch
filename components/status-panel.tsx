type Monitor = {
  name: string;
  value: string;
  status: "ok" | "warn";
  href: string;
};

const monitors: Monitor[] = [
  {
    name: "Higher-ed relationships",
    value: "9 ANZ institutions mapped",
    status: "ok",
    href: "#accounts",
  },
  {
    name: "Partner network",
    value: "AWS · HEDx · MortarCaps",
    status: "ok",
    href: "#partners",
  },
  {
    name: "Sector experience",
    value: "20 years in education",
    status: "ok",
    href: "#fit",
  },
  {
    name: "AI-native GTM",
    value: "Morning brief live · run a deep dive",
    status: "ok",
    href: "/gtm",
  },
  {
    name: "Observability selling",
    value: "Ramping fast · ask me about it",
    status: "warn",
    href: "#technical",
  },
  {
    name: "Availability",
    value: "Ready to start quickly · 30-60-90 ready",
    status: "ok",
    href: "#plan",
  },
];

const STATUS_STYLES = {
  ok: { dot: "bg-[#22c55e]", label: "OK", text: "text-[#22c55e]" },
  warn: { dot: "bg-[#f59e0b]", label: "WARN", text: "text-[#f59e0b]" },
} as const;

export function StatusPanel() {
  const okCount = monitors.filter((m) => m.status === "ok").length;

  return (
    <section aria-label="Candidate status" className="px-6 pb-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3 font-mono text-xs">
          <span className="text-foreground">
            <span className="text-purple-text">$</span> status --candidate matt
          </span>
          <span className="flex items-center gap-2 text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            {okCount}/{monitors.length} monitors OK
          </span>
        </div>

        <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {monitors.map((monitor) => {
            const style = STATUS_STYLES[monitor.status];
            return (
              <li key={monitor.name} className="bg-surface">
                <a
                  href={monitor.href}
                  className="flex h-full items-start gap-3 px-5 py-4 transition hover:bg-surface-2"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-[0.08em] text-accent-dim">
                      {monitor.name}
                    </span>
                    <span className="mt-1 block text-sm text-foreground">
                      {monitor.value}
                    </span>
                  </span>
                  <span className={`font-mono text-[11px] ${style.text}`}>
                    {style.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
