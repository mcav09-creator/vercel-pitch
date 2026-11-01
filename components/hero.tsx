"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/lib/content/profile";
import { sections } from "@/lib/content/sections";

const TYPE_SPEED = 10;

export function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const full = profile.terminalLine;
    const interval = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden px-6">
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
            <span className="text-purple-text">$</span> whoami --for datadog
            <br />
            <span className="text-muted">
              {typed}
              {typed.length < profile.terminalLine.length && (
                <span className="animate-pulse">▌</span>
              )}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            <HighlightedHeadline text={profile.headline} word="Datadog's" />
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted">
            {profile.subhead}
          </p>

          <nav aria-label="Sections" className="section-nav mt-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="section-nav-number">{section.number}</span>
                    {" · "}
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/gtm"
              className="rounded-full bg-[#8b5cf6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#8b5cf6]/40 transition hover:bg-[#9d74f7]"
            >
              AI-native GTM →
            </Link>
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

function HighlightedHeadline({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-purple-text">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}
