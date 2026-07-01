import Link from "next/link";
import { ArrowRight, LayoutGrid, Home } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Prominent "explore the rest of the site" band for the Google-Ads landing
 * pages. Since these pages strip the site nav to stay focused, this gives the
 * visitor a clear, deliberate way to reach the full website and all services.
 */
export function LpSiteLinks({ serviceTitle }: { serviceTitle: string }) {
  return (
    <section className="bg-warm-bg border-t border-border/30 py-12 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-display mb-2">
          {SITE.name} does more than {serviceTitle.toLowerCase()}
        </h2>
        <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
          Decks, hardscaping, concrete, driveways, foundations, and more — explore everything we
          build and see the rest of our work across Anne Arundel County.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[52px] rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white font-bold text-base shadow-md hover:shadow-lg hover:shadow-brand/25 transition-all"
          >
            <LayoutGrid className="h-5 w-5" />
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[52px] rounded-xl border-2 border-primary text-primary font-bold text-base hover:bg-primary/5 transition-colors"
          >
            <Home className="h-5 w-5" />
            Visit Our Full Website
          </Link>
        </div>
      </div>
    </section>
  );
}
