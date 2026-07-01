"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export interface LpMenuSection {
  href: string;
  label: string;
  /** On-page section number (e.g. "01") — shown as the ledger index. */
  no?: string;
}

/**
 * Hamburger anchor menu for the ad landing pages. Only in-page section links —
 * no site nav, so the visitor stays inside the ad funnel.
 */
export function LpAnchorMenu({ sections }: { sections: LpMenuSection[] }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close page menu" : "Open page menu"}
        className="-mr-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md hover:bg-white/10 transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-primary shadow-xl">
          <nav aria-label="Page sections" className="mx-auto max-w-6xl px-4 py-1">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                onClick={(e) => scrollTo(e, section.href)}
                className="flex items-baseline gap-4 border-b border-white/10 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/90 hover:text-brand transition-colors"
              >
                <span aria-hidden className="w-6 shrink-0 text-brand">
                  {section.no ?? "—"}
                </span>
                {section.label}
              </a>
            ))}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand hover:text-brand/80 transition-colors"
            >
              <span aria-hidden className="w-6 shrink-0">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              Other Services
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
