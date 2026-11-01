"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sections } from "@/lib/content/sections";

const PAGES = [
  { href: "/", label: "Pitch" },
  { href: "/gtm", label: "AI-native GTM" },
  { href: "/resume", label: "Résumé" },
];

const GTM_SECTIONS = [
  { id: "brief", number: "01", label: "Morning brief" },
  { id: "deep-dive", number: "02", label: "Deep dive" },
  { id: "sync", number: "03", label: "BDR sync" },
];

const PITCH_SECTIONS = sections.map((s) => ({
  ...s,
  // Short labels so the bar fits on one line.
  label: s.id === "accounts" ? "Territory" : s.id === "technical" ? "Tech" : s.label,
}));

function sectionsFor(pathname: string) {
  if (pathname === "/") return PITCH_SECTIONS;
  if (pathname === "/gtm") return GTM_SECTIONS;
  return [];
}

/**
 * Sticky bar shared by every page: switch between the pitch, the AI-native
 * GTM page and the résumé, and jump between the current page's sections,
 * with the section you're reading highlighted.
 */
export function SiteNav() {
  const pathname = usePathname();
  const pageSections = sectionsFor(pathname);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const list = sectionsFor(pathname);
    if (list.length === 0) return;
    const els = list
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <nav aria-label="Pages" className="flex shrink-0 items-center gap-1">
          {PAGES.map((p) => {
            const current = pathname === p.href;
            return (
              <Link
                key={p.href}
                href={p.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                  current
                    ? "bg-purple text-white"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                } ${p.href === "/resume" ? "hidden sm:inline-flex" : ""}`}
              >
                {p.label}
              </Link>
            );
          })}
        </nav>

        {pageSections.length > 0 && (
          <nav
            aria-label="Sections on this page"
            className="ml-auto hidden min-w-0 items-center gap-4 overflow-x-auto lg:flex"
          >
            {pageSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] transition ${
                  active === s.id ? "text-foreground" : "text-purple-text hover:text-foreground"
                }`}
              >
                <span className={active === s.id ? "text-purple-text" : "text-foreground"}>
                  {s.number}
                </span>{" "}
                {s.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
