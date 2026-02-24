"use client";

import { Phone, FileText } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
      <div className="flex">
        <a
          href={SITE.phoneTel}
          onClick={() => trackEvent("sticky_cta_call")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold text-sm transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/contact"
          onClick={() => trackEvent("sticky_cta_quote")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-brand to-brand-dark text-white font-semibold text-sm transition-colors"
        >
          <FileText className="h-4 w-4" />
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
