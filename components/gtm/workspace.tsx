"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type Ref } from "react";
import type { AccountDive } from "@/lib/gtm/account";
import type { MorningBrief } from "@/lib/gtm/brief";
import type { Source } from "@/lib/gtm/search";
import { gtmAccounts, findAccount } from "@/lib/gtm/accounts";
import { buildSyncNotes } from "@/lib/gtm/notes";

const NOTES_KEY = "gtm-sync-accounts";
const BDR_KEY = "gtm-sync-bdr";

const STORE_EVENT = "gtm-store";
const memoryStore = new Map<string, string>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memoryStore.get(key) ?? null;
  }
}

function writeStore(key: string, value: unknown) {
  const raw = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // Storage unavailable (private mode etc.): keep it in memory for this visit.
    memoryStore.set(key, raw);
  }
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORE_EVENT, onChange);
  };
}

/** Per-viewer convenience storage that renders the same on server and client. */
function useStored<T>(key: string, fallback: T): T {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );
  return useMemo(() => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // fallback is a literal at each call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);
}

export function GtmWorkspace({
  initialBrief,
  initialAccount,
}: {
  initialBrief: MorningBrief | null;
  initialAccount?: string;
}) {
  const [brief, setBrief] = useState<MorningBrief | null>(initialBrief);
  const [briefState, setBriefState] = useState<"ready" | "loading" | "error">(
    initialBrief ? "ready" : "loading",
  );

  const [slug, setSlug] = useState(initialAccount ?? "monash");
  const [dive, setDive] = useState<AccountDive | null>(null);
  const [diveState, setDiveState] = useState<"idle" | "loading" | "error">(
    initialAccount ? "loading" : "idle",
  );
  const [diveError, setDiveError] = useState("");

  const syncDives = useStored<AccountDive[]>(NOTES_KEY, []);
  const bdrName = useStored<string>(BDR_KEY, "");

  const diveRef = useRef<HTMLElement>(null);

  // Arriving from a territory card (/gtm?account=monash): open that plan straight away.
  useEffect(() => {
    if (!initialAccount) return;
    let cancelled = false;
    diveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    fetch(`/api/gtm/account?slug=${encodeURIComponent(initialAccount)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.text()) || "Something went wrong.");
        return (await res.json()) as AccountDive;
      })
      .then((d) => {
        if (cancelled) return;
        setDive(d);
        setDiveState("idle");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setDiveError(e instanceof Error ? e.message : "Something went wrong.");
        setDiveState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [initialAccount]);

  useEffect(() => {
    if (initialBrief) return;
    let cancelled = false;
    fetch("/api/gtm/brief")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((b: MorningBrief) => {
        if (!cancelled) {
          setBrief(b);
          setBriefState("ready");
        }
      })
      .catch(() => !cancelled && setBriefState("error"));
    return () => {
      cancelled = true;
    };
  }, [initialBrief]);

  const runDive = async (target = slug) => {
    setSlug(target);
    setDiveState("loading");
    setDiveError("");
    setDive(null);
    diveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      const res = await fetch("/api/gtm/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: target }),
      });
      if (!res.ok) throw new Error((await res.text()) || "Something went wrong.");
      setDive((await res.json()) as AccountDive);
      setDiveState("idle");
    } catch (e) {
      setDiveError(e instanceof Error ? e.message : "Something went wrong.");
      setDiveState("error");
    }
  };

  const addToSync = (d: AccountDive) => {
    writeStore(NOTES_KEY, [...syncDives.filter((x) => x.slug !== d.slug), d]);
    document.getElementById("sync")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const removeFromSync = (s: string) => {
    writeStore(NOTES_KEY, syncDives.filter((x) => x.slug !== s));
  };

  return (
    <>
      <BriefSection
        brief={brief}
        state={briefState}
        onAccount={(s) => runDive(s)}
      />
      <DiveSection
        ref={diveRef}
        slug={slug}
        setSlug={setSlug}
        dive={dive}
        state={diveState}
        error={diveError}
        onRun={() => runDive()}
        onAdd={addToSync}
        added={dive ? syncDives.some((d) => d.slug === dive.slug) : false}
      />
      <SyncSection
        brief={brief}
        dives={syncDives}
        bdrName={bdrName}
        setBdrName={(v) => writeStore(BDR_KEY, v)}
        onRemove={removeFromSync}
      />
    </>
  );
}

/* ---------- shared bits ---------- */

function SectionHeader({ n, label, title, intro }: { n: string; label: string; title: string; intro: string }) {
  return (
    <>
      <p className="section-label mb-3">
        <span className="text-foreground">{n}</span> · {label}
      </p>
      <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{intro}</p>
    </>
  );
}

function Cites({ ids, sources }: { ids: number[]; sources: Source[] }) {
  const found = ids
    .map((id) => sources.find((s) => s.id === id))
    .filter((s): s is Source => Boolean(s));
  if (found.length === 0) return null;
  return (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-middle">
      {found.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          title={s.title}
          className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-purple-text transition hover:border-purple-text"
        >
          {s.domain}
        </a>
      ))}
    </span>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-text/30 border-t-purple-text"
    />
  );
}

function useRotatingMessage(active: boolean, messages: string[], everyMs = 6000) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setI((x) => Math.min(x + 1, messages.length - 1)), everyMs);
    return () => {
      clearInterval(t);
      setI(0);
    };
  }, [active, messages.length, everyMs]);
  return messages[i];
}

/* ---------- 01 Morning brief ---------- */

function BriefSection({
  brief,
  state,
  onAccount,
}: {
  brief: MorningBrief | null;
  state: "ready" | "loading" | "error";
  onAccount: (slug: string) => void;
}) {
  const loadingMsg = useRotatingMessage(state === "loading", [
    "Searching this week's Australian higher-ed news…",
    "Reading policy and funding updates…",
    "Checking ed-tech and IT stories…",
    "Writing your brief…",
  ]);

  const updated = brief
    ? new Date(brief.generatedAt).toLocaleString("en-AU", {
        timeZone: "Australia/Sydney",
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <section id="brief" className="border-t border-border px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          n="01"
          label="Morning brief"
          title="What I wake up to."
          intro="Every morning before 6am, an agent searches the week's Australian higher-ed news, policy, ed-tech and trends, and writes a brief. Every item links to its source, and stories about my territory accounts are tagged so I can jump straight into a deep dive."
        />

        {state === "loading" && (
          <div className="card mt-8 flex items-center gap-3 p-6 text-sm text-muted">
            <Spinner /> {loadingMsg}
          </div>
        )}
        {state === "error" && !brief && (
          <div className="card mt-8 p-6 text-sm text-muted">
            The brief couldn&apos;t be built right now. It refreshes automatically each morning.
          </div>
        )}

        {brief && (
          <>
            <div className="mt-8 rounded-xl border border-purple/60 bg-purple/10 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
                Today · updated {updated}
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{brief.topLine}</p>
              <p className="mt-3 text-sm text-muted">
                <span className="text-foreground">Opener for today: </span>&ldquo;{brief.conversationStarter}&rdquo;
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {brief.sections
                .filter((s) => s.items.length > 0)
                .map((section) => (
                  <div key={section.key} className="card p-5 sm:p-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-5">
                      {section.items.map((item) => (
                        <li key={item.headline}>
                          <p className="text-sm font-semibold leading-snug">{item.headline}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {item.summary}
                            <Cites ids={item.sourceIds} sources={brief.sources} />
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
                            <span className="text-purple-text">So what: </span>
                            {item.soWhat}
                          </p>
                          {item.accounts.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {item.accounts.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => onAccount(s)}
                                  className="rounded-full border border-purple/70 bg-purple/15 px-2.5 py-0.5 text-[11px] text-purple-text transition hover:bg-purple/30"
                                >
                                  {findAccount(s)?.name ?? s} · deep dive →
                                </button>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- 02 Account deep dive ---------- */

type DiveProps = {
  slug: string;
  setSlug: (s: string) => void;
  dive: AccountDive | null;
  state: "idle" | "loading" | "error";
  error: string;
  onRun: () => void;
  onAdd: (d: AccountDive) => void;
  added: boolean;
  ref: Ref<HTMLElement>;
};

function DiveSection({ slug, setSlug, dive, state, error, onRun, onAdd, added, ref }: DiveProps) {
  const territory = gtmAccounts.filter((a) => a.territory);
  const others = gtmAccounts.filter((a) => !a.territory);
  const loadingMsg = useRotatingMessage(state === "loading", [
    "Searching recent news on the account…",
    "Reading strategy and technology documents…",
    "Finding the people who matter…",
    "Mapping the Datadog angle…",
    "Drafting your sequence…",
  ]);

  return (
    <section ref={ref} id="deep-dive" className="scroll-mt-20 border-t border-border px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          n="02"
          label="Account deep dive"
          title="From a signal to a sequence in a minute."
          intro="Pick an account and an agent researches it live: why now, stated priorities, who to reach, the Datadog angle, likely objections, and a ready-to-send sequence split between BDR and AE. Names appear only when a source confirms them."
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            aria-label="Choose an account"
            className="min-w-0 flex-1 rounded-full border-2 border-purple-text/70 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple/40"
          >
            <optgroup label="My territory">
              {territory.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name} ({a.state}){a.existingCustomer ? " · Datadog customer" : ""}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other Australian universities">
              {others.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name} ({a.state})
                </option>
              ))}
            </optgroup>
          </select>
          <button
            type="button"
            onClick={onRun}
            disabled={state === "loading"}
            className="shrink-0 rounded-full bg-[#8b5cf6] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#8b5cf6]/40 transition hover:bg-[#9d74f7] disabled:opacity-70"
          >
            {state === "loading" ? "Researching…" : "Run deep dive"}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          Fresh research takes about a minute. Each account is cached for the day, so repeat views are instant.
        </p>

        {state === "loading" && (
          <div className="card mt-6 flex items-center gap-3 p-6 text-sm text-muted">
            <Spinner /> {loadingMsg}
          </div>
        )}
        {state === "error" && <div className="card mt-6 p-6 text-sm text-muted">{error}</div>}

        {dive && <DiveResult dive={dive} onAdd={onAdd} added={added} />}
      </div>
    </section>
  );
}

function DiveResult({ dive, onAdd, added }: { dive: AccountDive; onAdd: (d: AccountDive) => void; added: boolean }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">{dive.account}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-purple-text">
              {dive.existingCustomer ? "Existing Datadog customer · expansion" : "New logo"} · researched {dive.date}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAdd(dive)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              added
                ? "border border-purple-text/60 text-purple-text"
                : "bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/30 hover:bg-[#9d74f7]"
            }`}
          >
            {added ? "✓ In BDR sync (update)" : "+ Add to BDR sync"}
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {dive.snapshot.text}
          <Cites ids={dive.snapshot.sourceIds} sources={dive.sources} />
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CitedList title="Why now" items={dive.whyNow} sources={dive.sources} />
        <CitedList title="Stated priorities" items={dive.priorities} sources={dive.sources} />
      </div>

      <div className="card p-5 sm:p-6">
        <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">Who to reach</h4>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {dive.stakeholders.map((s) => (
            <li key={s.role + (s.name ?? "")} className="rounded-lg border border-border bg-surface-2 p-4">
              <p className="text-sm font-semibold">{s.role}</p>
              <p className="mt-0.5 text-xs text-muted">
                {s.name ?? "Name to confirm"}
                {s.name && s.confirmInRole && (
                  <span className="ml-1.5 rounded-full border border-[#f59e0b]/60 px-1.5 py-0.5 text-[10px] text-[#f59e0b]">
                    {s.asOf ? `source ${s.asOf.slice(0, 4)}, ` : ""}confirm still in role
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.why}
                <Cites ids={s.sourceIds} sources={dive.sources} />
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-purple/60 bg-purple/10 p-5 sm:p-6">
        <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">The Datadog angle</h4>
        <dl className="mt-3 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="text-foreground">Hypothesis</dt>
            <dd className="text-muted">{dive.angle.hypothesis}</dd>
          </div>
          <div>
            <dt className="text-foreground">Land with</dt>
            <dd className="text-muted">{dive.angle.entryPoint}</dd>
          </div>
          <div>
            <dt className="text-foreground">Proof point</dt>
            <dd className="text-muted">{dive.angle.proofPoint}</dd>
          </div>
          {dive.angle.warmPath && (
            <div>
              <dt className="text-foreground">Warm path in</dt>
              <dd className="text-muted">{dive.angle.warmPath}</dd>
            </div>
          )}
        </dl>
      </div>

      {dive.objections.length > 0 && (
        <div className="card p-5 sm:p-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">Likely objections</h4>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {dive.objections.map((o) => (
              <li key={o.objection}>
                <p className="text-foreground">&ldquo;{o.objection}&rdquo;</p>
                <p className="text-muted">{o.response}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card p-5 sm:p-6">
        <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">Sequence</h4>
        <ol className="mt-4 space-y-3">
          {dive.sequence.map((step, i) => (
            <SequenceCard key={i} step={step} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function CitedList({ title, items, sources }: { title: string; items: { text: string; sourceIds: number[] }[]; sources: Source[] }) {
  return (
    <div className="card p-5 sm:p-6">
      <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">{title}</h4>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Nothing solid found in recent sources.</p>
      ) : (
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
          {items.map((it) => (
            <li key={it.text} className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-text" />
              <span>
                {it.text}
                <Cites ids={it.sourceIds} sources={sources} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SequenceCard({ step }: { step: AccountDive["sequence"][number] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = step.channel === "Email" ? `Subject: ${step.subject}\n\n${step.message}` : step.message;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the text is still selectable.
    }
  };
  return (
    <li className="rounded-lg border border-border bg-surface-2 p-4">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em]">
        <span className="text-foreground">Day {step.day}</span>
        <span className="text-muted">·</span>
        <span className="text-purple-text">{step.channel}</span>
        <span className="rounded-full border border-border px-2 py-0.5 text-muted">{step.owner}</span>
        <span className="normal-case tracking-normal text-muted">→ {step.persona}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto rounded-full border border-border px-2.5 py-0.5 normal-case tracking-normal text-muted transition hover:border-purple-text hover:text-purple-text"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-2 text-sm font-semibold">{step.subject}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted">{step.message}</p>
    </li>
  );
}

/* ---------- 03 BDR sync ---------- */

function SyncSection({
  brief,
  dives,
  bdrName,
  setBdrName,
  onRemove,
}: {
  brief: MorningBrief | null;
  dives: AccountDive[];
  bdrName: string;
  setBdrName: (v: string) => void;
  onRemove: (slug: string) => void;
}) {
  const notes = useMemo(() => buildSyncNotes({ brief, dives, bdrName }), [brief, dives, bdrName]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const download = () => {
    const blob = new Blob([notes], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bdr-sync-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="sync" className="scroll-mt-20 border-t border-border px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          n="03"
          label="BDR sync"
          title="Walk into the BDR sync with notes already written."
          intro="Add accounts from the deep dive and the agenda builds itself: this week's signals, focus accounts, who owns each touch with dates, and the actions for both of us. Copy it into the meeting doc or download it."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="card space-y-5 p-5 sm:p-6">
            <label className="block">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">BDR name</span>
              <input
                value={bdrName}
                onChange={(e) => setBdrName(e.target.value)}
                placeholder="e.g. Sam"
                className="mt-2 w-full rounded-full border-2 border-purple-text/70 bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-purple/40"
              />
            </label>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-purple-text">Focus accounts</p>
              {dives.length === 0 ? (
                <p className="mt-2 text-sm text-muted">
                  None yet. Run a deep dive and press &ldquo;Add to BDR sync&rdquo;.
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {dives.map((d) => (
                    <li
                      key={d.slug}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 truncate">{d.account}</span>
                      <button
                        type="button"
                        onClick={() => onRemove(d.slug)}
                        aria-label={`Remove ${d.account}`}
                        className="shrink-0 text-xs text-muted transition hover:text-foreground"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copy}
                className="rounded-full bg-[#8b5cf6] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#8b5cf6]/30 transition hover:bg-[#9d74f7]"
              >
                {copied ? "Copied" : "Copy notes"}
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-purple-text"
              >
                Download .md
              </button>
            </div>
          </div>

          <pre className="card max-h-[560px] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-xs leading-relaxed text-muted sm:p-6">
            {notes}
          </pre>
        </div>
      </div>
    </section>
  );
}
