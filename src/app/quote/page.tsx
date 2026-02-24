import type { Metadata } from "next";
import { Phone, Clock, Shield, Star, CheckCircle, MessageSquare } from "lucide-react";
import { SITE, TESTIMONIALS } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";

export const metadata: Metadata = {
  title: `Get a Free Estimate | ${SITE.name}`,
  description: `Request a free outdoor construction estimate in Anne Arundel County, MD. No commitment. Backyard Bobby's responds within one business day. Call ${SITE.phone}.`,
  alternates: { canonical: `${SITE.url}/quote` },
  openGraph: {
    title: `Get a Free Estimate | ${SITE.name}`,
    description: `Free, no-pressure estimates for outdoor construction in Maryland. Licensed ${SITE.license}.`,
  },
};

const TRUST_POINTS = [
  { icon: Clock, title: "Fast Response", desc: "We call or text you back within one business day — usually much sooner." },
  { icon: Shield, title: "Licensed & Insured", desc: `Maryland Home Improvement Contractor ${SITE.license} with full liability coverage.` },
  { icon: CheckCircle, title: "Free, No Pressure", desc: "Your estimate costs nothing and comes with zero obligation to proceed." },
  { icon: Star, title: "5-Star Rated", desc: "Trusted by homeowners across Anne Arundel County and greater Maryland." },
];

export default function QuotePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get a Free Estimate",
    description: `Request a free outdoor construction estimate from ${SITE.name}.`,
    url: `${SITE.url}/quote`,
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE.name,
      telephone: SITE.phone,
      priceRange: "$$",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Anne Arundel County, Maryland",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="bg-primary text-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3">
            Get Your <span className="text-brand">Free Estimate</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Tell us about your project. We respond within one business day and your
            estimate is always 100% free.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">

          {/* Form — takes more space */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-border/40 shadow-lg p-6 md:p-8">
              <div className="mb-6 pb-6 border-b border-border/30">
                <h2 className="text-xl font-bold mb-1">Project Request Form</h2>
                <p className="text-sm text-muted-foreground">
                  Fill in as much detail as you can. The more we know, the more
                  accurate your estimate.
                </p>
              </div>
              <LeadForm />
            </div>

            {/* Or call/text */}
            <div className="mt-6 rounded-2xl bg-warm-bg border border-border/30 p-6">
              <p className="text-sm font-semibold mb-3 text-center">
                Prefer to talk first?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={SITE.phoneTel}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call {SITE.phone}
                </a>
                <a
                  href={SITE.phoneSms}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Text Us
                </a>
              </div>
            </div>
          </div>

          {/* Trust sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why trust us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Why Homeowners Choose Us</h3>
              <div className="space-y-4">
                {TRUST_POINTS.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-brand/10 flex items-center justify-center">
                      <point.icon className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{point.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured review */}
            <div className="bg-warm-bg rounded-2xl border border-border/30 p-6">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed mb-4 text-foreground/80">
                &ldquo;{TESTIMONIALS[0].text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold">{TESTIMONIALS[0].name}</p>
                <p className="text-xs text-muted-foreground">{TESTIMONIALS[0].location}</p>
              </div>
            </div>

            {/* What happens next */}
            <div>
              <h3 className="text-lg font-bold mb-4">What Happens Next</h3>
              <ol className="space-y-3">
                {[
                  "We receive your request and review your project details.",
                  "We'll call or text you within one business day to confirm and ask any follow-up questions.",
                  "We schedule an on-site visit at a time that works for you.",
                  "You receive a clear, written estimate with no surprises.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
