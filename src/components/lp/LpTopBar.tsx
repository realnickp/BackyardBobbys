import Image from "next/image";
import { LpAnchorMenu, type LpMenuSection } from "./LpAnchorMenu";

/**
 * Distraction-free header for the Google-Ads landing pages: logo on the left,
 * hamburger anchor menu on the right (which also holds the one deliberate
 * site exit, "Other Services"). No phone/nav up here — Call/Text live in the
 * masthead, the estimate ticket, and the sticky bottom bar. The logo is
 * deliberately NOT a link.
 */
export function LpTopBar({ sections }: { sections?: LpMenuSection[] }) {
  return (
    <div className="sticky top-0 z-40 bg-primary text-primary-foreground py-1.5 px-4 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">
        <Image
          src="/images/logo.png"
          alt="Backyard Bobby's"
          width={300}
          height={112}
          className="h-20 sm:h-24 w-auto brightness-110"
          priority
        />
        {sections && sections.length > 0 && <LpAnchorMenu sections={sections} />}
      </div>
    </div>
  );
}
