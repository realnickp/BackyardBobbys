import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Slim, distraction-free header for the Google-Ads landing pages. Replaces the
 * full site nav (stripped for `/lp/*` in PublicShell) with just the brand,
 * license, and one-tap Call / Text so the visitor can only move forward.
 */
export function LpTopBar() {
  return (
    <div className="sticky top-0 z-40 bg-primary text-primary-foreground py-2.5 px-4 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
        <p className="text-sm font-medium truncate">
          <span className="font-bold">Backyard Bobby&apos;s</span>
          <span className="hidden sm:inline"> — Licensed Maryland Contractor · {SITE.license}</span>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/services"
            className="text-sm font-semibold underline underline-offset-4 decoration-primary-foreground/40 hover:decoration-primary-foreground transition-colors"
          >
            Full Site
          </Link>
          <span className="hidden sm:inline opacity-40">|</span>
          <a
            href={SITE.phoneSms}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <MessageSquare className="h-4 w-4" />
            Text
          </a>
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
