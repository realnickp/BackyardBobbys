import Link from "next/link";
import { Phone, MessageSquare, ClipboardList } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Mobile-only sticky conversion bar for the Google-Ads landing pages: Call,
 * Text, and Estimate (starts the Project Builder). Fills the gap left by the
 * site's default StickyMobileCTA, which is stripped for `/lp/*`.
 */
export function LpStickyCTA({
  serviceSlug,
  leadSource = "google_ads",
}: {
  serviceSlug: string;
  leadSource?: string;
}) {
  const quizHref = `/lp/${serviceSlug}/quiz${leadSource ? `?src=${leadSource}` : ""}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-md grid grid-cols-3 gap-2">
        <a
          href={SITE.phoneTel}
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[48px] rounded-xl bg-primary text-white text-xs font-semibold"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={SITE.phoneSms}
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[48px] rounded-xl border-2 border-primary text-primary text-xs font-semibold"
        >
          <MessageSquare className="h-4 w-4" />
          Text
        </a>
        <Link
          href={quizHref}
          className="flex flex-col items-center justify-center gap-0.5 py-2 min-h-[48px] rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white text-xs font-bold"
        >
          <ClipboardList className="h-4 w-4" />
          Estimate
        </Link>
      </div>
    </div>
  );
}
