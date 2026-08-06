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

const LINE = "#3a3a3a";
const LINE_DIM = "#71717a";

function PartnerDiagram() {
  return (
    <svg
      viewBox="0 0 1340 300"
      className="w-full min-w-[1000px]"
      role="img"
      aria-label="Diagram: starting from Vercel, a community engagement engine is built with marketing, mid-tier partners, and hyperscalers. That engine feeds a land motion that splits into two paths — Vercel direct with a mid-tier or small partner for speed to value, or Vercel large transformation with a hyperscaler and GSI in a joint staged engagement. Both paths converge on the enterprise account, which leads to the suggested next move: expand footprint."
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE_DIM} />
        </marker>
      </defs>

      {/* stage labels */}
      <StageLabel x={195} label="Build" />
      <StageLabel x={755} label="Land" />
      <StageLabel x={1140} label="Expand" />

      {/* stage 1: Vercel */}
      <NodeBox x={20} y={125} w={100} h={50} lines={["Vercel"]} strong />

      {/* stage 2: engagement engine inputs */}
      <NodeBox x={170} y={34} w={150} h={36} lines={["Marketing"]} small />
      <NodeBox x={170} y={132} w={150} h={36} lines={["Mid-tier partners"]} small />
      <NodeBox x={170} y={230} w={150} h={36} lines={["Hyperscalers"]} small />

      {/* stage 3: community engagement engine */}
      <NodeBox
        x={370}
        y={105}
        w={200}
        h={90}
        lines={["Community", "engagement engine"]}
        sub="built from marketing + partners + hyperscalers"
      />

      {/* stage 4: land motion split */}
      <NodeBox
        x={630}
        y={42}
        w={250}
        h={76}
        lines={["Vercel direct", "+ mid-tier / small partner"]}
        sub="leverage relationship · speed to value"
      />
      <NodeBox
        x={630}
        y={182}
        w={250}
        h={76}
        lines={["Vercel: large transformation", "+ hyperscaler & GSI"]}
        sub="joint, staged engagement"
      />

      {/* stage 5: enterprise account */}
      <NodeBox x={940} y={115} w={150} h={70} lines={["Enterprise", "account"]} strong />

      {/* stage 6: expand footprint (suggested next) */}
      <NodeBox
        x={1140}
        y={120}
        w={160}
        h={60}
        lines={["Expand footprint"]}
        dashed
        sub="next suggested move"
      />

      {/* Vercel -> engine inputs */}
      <path d="M 120 150 L 170 52" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 120 150 L 170 150" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 120 150 L 170 248" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      {/* engine inputs -> engine */}
      <path d="M 320 52 L 370 128" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 320 150 L 370 150" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 320 248 L 370 172" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      {/* engine -> land split */}
      <path d="M 570 150 L 630 80" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 570 150 L 630 220" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      {/* land split -> enterprise account */}
      <path d="M 880 80 L 940 150" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />
      <path d="M 880 220 L 940 150" stroke={LINE} strokeWidth="1.5" markerEnd="url(#arrow)" fill="none" />

      {/* enterprise account -> expand footprint (suggested) */}
      <path
        d="M 1090 150 L 1140 150"
        stroke={LINE_DIM}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        markerEnd="url(#arrow)"
        fill="none"
      />
    </svg>
  );
}

function StageLabel({ x, label }: { x: number; label: string }) {
  return (
    <text
      x={x}
      y={14}
      textAnchor="middle"
      fontSize="10.5"
      letterSpacing="0.08em"
      fill={LINE_DIM}
      fontFamily="var(--font-mono)"
      style={{ textTransform: "uppercase" }}
    >
      {label}
    </text>
  );
}

function NodeBox({
  x,
  y,
  w,
  h,
  lines,
  sub,
  strong,
  dashed,
  small,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  sub?: string;
  strong?: boolean;
  dashed?: boolean;
  small?: boolean;
}) {
  const centerY = y + h / 2;
  const lineHeight = small ? 13 : 15;
  const blockHeight = (lines.length - 1) * lineHeight;
  const firstLineY = centerY - blockHeight / 2 - (sub ? 6 : 0) + (small ? 4 : 4);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={strong ? "#fafafa" : "#0a0a0a"}
        stroke={strong ? "#fafafa" : dashed ? LINE_DIM : "#262626"}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={firstLineY + i * lineHeight}
          textAnchor="middle"
          fontSize={small ? 11.5 : 12.5}
          fontWeight={600}
          fill={strong ? "#000000" : dashed ? "#a1a1a1" : "#fafafa"}
          fontFamily="var(--font-sans)"
        >
          {line}
        </text>
      ))}
      {sub && (
        <text
          x={x + w / 2}
          y={centerY + blockHeight / 2 + (small ? 12 : 14)}
          textAnchor="middle"
          fontSize="9"
          fill={strong ? "#4b4b4b" : LINE_DIM}
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}
