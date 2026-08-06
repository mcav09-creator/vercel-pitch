"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content/profile";

const TYPE_SPEED = 22;

export function Hero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const full = profile.terminalLine;
    const interval = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      }
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="bg-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-10 w-full max-w-2xl rounded-lg border border-border bg-surface/80 text-left font-mono text-sm backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-muted">pitch.sh</span>
          </div>
          <div className="min-h-[96px] px-4 py-4 text-[13px] leading-relaxed text-foreground sm:text-sm">
            <span className="text-accent-dim">$</span> whoami --for vercel
            <br />
            <span className="text-muted">
              {typed}
              {!done && <span className="animate-pulse">▌</span>}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {profile.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted">
            {profile.subhead}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#proof"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              See the proof ↓
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-hover hover:bg-surface"
            >
              Résumé
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-border-hover hover:bg-surface"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
