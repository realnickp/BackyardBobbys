"use client";

import { useState } from "react";
import { StampedStylePicker } from "./StampedStylePicker";
import { LeadForm } from "./LeadForm";
import { Section } from "./Section";
import type { StampedConcreteStyle } from "@/lib/constants";

export function StampedConcreteStyles() {
  const [selected, setSelected] = useState<StampedConcreteStyle | null>(null);

  return (
    <Section>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl mb-4">Choose Your Pattern</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We offer 14 stamp patterns — from natural stone and slate to brick, wood plank, and
          custom medallions. Tap a style you like to include it with your estimate request.
        </p>
      </div>

      <StampedStylePicker
        onSelect={setSelected}
        selectedSlug={selected?.slug}
      />

      {selected && (
        <div className="mt-10 max-w-xl mx-auto" id="style-quote">
          <div className="bg-warm-bg rounded-2xl p-6 border border-border/50 shadow-sm">
            <h3 className="font-bold text-lg mb-1">
              Get a Quote for {selected.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selected.description}. Tell us about your project and we&apos;ll
              send you a free estimate.
            </p>
            <LeadForm
              preselectedService="Stamped Concrete"
              preferredStyle={selected.name}
              compact
            />
          </div>
        </div>
      )}
    </Section>
  );
}
