import { partnerPlays } from "@/lib/content/partner-motion";

export function PartnerMotion() {
  return (
    <section id="partners" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-3">04 · Partner & Ecosystem Motion</p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          I&apos;ve run this exact motion before — mid-tier partners, a
          hyperscaler, and GSIs, all in one ecosystem.
        </h2>

        <div className="mt-10 overflow-x-auto">
          <PartnerDiagram />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {partnerPlays.map((play) => (
            <div key={play.title} className="card p-6">
              <h3 className="text-base font-semibold">{play.title}</h3>
              <p className="mt-1.5 text-xs font-medium text-accent-dim">
                {play.summary}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {play.howItWorked}
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="section-label mb-1.5">Maps to Vercel</p>
                <p className="text-sm leading-relaxed text-foreground">
                  {play.vercelMapping}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerDiagram() {
  return (
    <svg
      viewBox="0 0 900 220"
      className="w-full min-w-[640px]"
      role="img"
      aria-label="Diagram: enterprise account connects to a mid-tier partner network, a hyperscaler, and GSIs, all converging on Vercel, with a land-and-expand loop back to the account."
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717a" />
        </marker>
      </defs>

      {/* nodes */}
      <NodeBox x={30} y={90} w={140} h={50} label="Enterprise account" />
      <NodeBox x={260} y={20} w={150} h={44} label="Mid-tier partners" sub="innovation engine" />
      <NodeBox x={260} y={90} w={150} h={44} label="Hyperscaler (AWS)" />
      <NodeBox x={260} y={160} w={150} h={44} label="GSIs" />
      <NodeBox x={560} y={90} w={140} h={50} label="Vercel" strong />

      {/* connecting lines */}
      <path d="M 170 105 L 260 42" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 170 115 L 260 112" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 170 125 L 260 182" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      <path d="M 410 42 L 560 105" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 410 112 L 560 115" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 410 182 L 560 125" stroke="#3a3a3a" strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      {/* partner-to-partner matchmaking arrow */}
      <path
        d="M 335 64 C 335 105, 335 105, 335 138"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        markerEnd="url(#arrow)"
        fill="none"
      />

      {/* land and expand loop */}
      <path
        d="M 630 140 C 630 200, 100 200, 100 140"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        markerEnd="url(#arrow)"
        fill="none"
      />
      <text x="365" y="205" fontSize="11" fill="#71717a" fontFamily="var(--font-mono)">
        land → expand
      </text>
      <text x="345" y="105" fontSize="10" fill="#71717a" fontFamily="var(--font-mono)">
        gap-fill
      </text>
    </svg>
  );
}

function NodeBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  strong,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  strong?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={strong ? "#fafafa" : "#0a0a0a"}
        stroke={strong ? "#fafafa" : "#262626"}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight={600}
        fill={strong ? "#000000" : "#fafafa"}
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontSize="9.5"
          fill={strong ? "#000000" : "#71717a"}
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}
