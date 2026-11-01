import type { AccountDive } from "./account";
import type { MorningBrief } from "./brief";
import type { Source } from "./search";

function link(ids: number[], sources: Source[]): string {
  const found = ids
    .map((id) => sources.find((s) => s.id === id))
    .filter((s): s is Source => Boolean(s));
  if (found.length === 0) return "";
  return " " + found.map((s) => `([${s.domain}](${s.url}))`).join(" ");
}

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days - 1);
  return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
}

/** Turns the brief plus chosen account plans into BDR sync meeting notes (Markdown). */
export function buildSyncNotes(opts: {
  brief: MorningBrief | null;
  dives: AccountDive[];
  bdrName: string;
  start?: Date;
}): string {
  const { brief, dives } = opts;
  const bdr = opts.bdrName.trim() || "[BDR]";
  const start = opts.start ?? new Date();
  const today = start.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const lines: string[] = [];
  lines.push(`# BDR sync · ${today}`);
  lines.push("");
  lines.push(`**Attendees:** Matt Cavallaro (AE), ${bdr} (BDR)`);
  lines.push(`**Goal:** agree focus accounts, who runs which touches, and what we need from each other this week.`);
  lines.push("");

  lines.push(`## 1. Market signals this week`);
  if (brief) {
    lines.push(`_${brief.topLine}_`);
    lines.push("");
    const top = brief.sections.flatMap((s) => s.items).slice(0, 4);
    for (const item of top) {
      lines.push(`- **${item.headline}**: ${item.soWhat}${link(item.sourceIds, brief.sources)}`);
    }
    lines.push("");
    lines.push(`**Opener to use this week:** "${brief.conversationStarter}"`);
  } else {
    lines.push("- (Morning brief not loaded)");
  }
  lines.push("");

  lines.push(`## 2. Focus accounts`);
  if (dives.length === 0) lines.push("- (No accounts added yet)");
  dives.forEach((d, i) => {
    lines.push(`### 2.${i + 1} ${d.account}${d.existingCustomer ? " (existing customer: expansion)" : " (new logo)"}`);
    lines.push(`- **Why now:**`);
    for (const w of d.whyNow.slice(0, 3)) lines.push(`  - ${w.text}${link(w.sourceIds, d.sources)}`);
    lines.push(`- **Our angle:** ${d.angle.hypothesis}`);
    lines.push(`- **Land with:** ${d.angle.entryPoint}`);
    lines.push(`- **Proof point:** ${d.angle.proofPoint}`);
    if (d.angle.warmPath) lines.push(`- **Warm path in:** ${d.angle.warmPath}`);
    lines.push(`- **Who to reach:**`);
    for (const s of d.stakeholders) {
      const who = s.name
        ? ` (${s.name}${s.confirmInRole ? ", confirm still in role" : ""})`
        : " (name to confirm)";
      lines.push(`  - ${s.role}${who}: ${s.why}`);
    }
    lines.push("");
  });

  lines.push(`## 3. Sequence plan`);
  if (dives.length > 0) {
    lines.push(`| Account | Day | Date | Channel | Owner | Persona |`);
    lines.push(`|---|---|---|---|---|---|`);
    for (const d of dives) {
      for (const step of d.sequence) {
        lines.push(
          `| ${d.account} | ${step.day} | ${addDays(start, step.day)} | ${step.channel} | ${step.owner === "BDR" ? bdr : "Matt"} | ${step.persona} |`,
        );
      }
    }
    lines.push("");
    lines.push(`Full message drafts are in the account plans; ${bdr} to personalise the first line before sending.`);
  } else {
    lines.push("- (Add an account to build the sequence plan)");
  }
  lines.push("");

  lines.push(`## 4. Actions`);
  for (const d of dives) {
    const unnamed = d.stakeholders
      .filter((s) => !s.name || s.confirmInRole)
      .map((s) => (s.name ? `${s.role} (${s.name})` : s.role));
    if (unnamed.length > 0) {
      lines.push(`- [ ] ${bdr}: confirm current names and contact details for ${unnamed.join(", ")} at ${d.account}`);
    }
    lines.push(`- [ ] ${bdr}: load the ${d.account} sequence and send touch 1`);
    lines.push(`- [ ] Matt: check for a warm path into ${d.account} (AWS, HEDx, MortarCaps, past Salesforce contacts)`);
  }
  lines.push(`- [ ] Both: review replies and meetings booked at next sync`);
  lines.push("");

  lines.push(`## 5. What we'll measure`);
  lines.push(`- Replies and positive replies per sequence`);
  lines.push(`- First meetings booked, and with which persona`);
  lines.push(`- Which signal or opener got the best response, so we reuse it`);
  lines.push("");
  lines.push(`_Prepared with Matt's AI-native GTM workflow: sources linked inline._`);

  return lines.join("\n");
}
