import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Phone, CheckCircle } from "lucide-react";
import { CITY_DATA, SITE } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { TrustBar } from "@/components/shared/TrustBar";

export const metadata: Metadata = {
  title: `Service Areas in Anne Arundel County, MD | ${SITE.name}`,
  description: `Backyard Bobby's serves 19 communities across Anne Arundel County, Maryland — from Annapolis to Glen Burnie, Millersville to Shady Side. Licensed outdoor contractor ${SITE.license}. Free estimates. Call ${SITE.phone}.`,
  alternates: { canonical: `${SITE.url}/areas` },
  openGraph: {
    title: `Service Areas | ${SITE.name}`,
    description: `Professional outdoor construction in 19 Anne Arundel County communities. Free estimates. Call ${SITE.phone}.`,
    images: ["/og-image.png"],
  },
};

const REGION_GROUPS = [
  {
    region: "Annapolis & Waterfront Communities",
    desc: "Maryland's capital and the waterfront communities along the Severn River, South River, and Chesapeake Bay.",
    slugs: ["annapolis", "edgewater", "riva", "shady-side", "parole"],
  },
  {
    region: "Broadneck Peninsula",
    desc: "The peninsula between the Magothy and Severn Rivers — some of the county's most desirable neighborhoods.",
    slugs: ["arnold", "severna-park", "herald-harbor"],
  },
  {
    region: "Central Anne Arundel",
    desc: "Bobby's home base. The heart of the county, where we've completed more projects than anywhere else.",
    slugs: ["millersville", "crofton", "gambrills", "crownsville"],
  },
  {
    region: "West County & Fort Meade Corridor",
    desc: "Anne Arundel's fastest-growing area, driven by Fort Meade, NSA, and new residential development.",
    slugs: ["odenton", "severn", "hanover"],
  },
  {
    region: "Northern Anne Arundel",
    desc: "Established communities near BWI and the Baltimore metro — older homes that deserve modern outdoor spaces.",
    slugs: ["glen-burnie", "pasadena", "linthicum-heights", "riviera-beach"],
  },
];

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-semibold mb-6">
              <MapPin className="h-3.5 w-3.5" />
              19 Communities Across Anne Arundel County
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Outdoor Construction in{" "}
              <span className="text-brand">Anne Arundel County</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
              Based in Millersville, Backyard Bobby&apos;s serves homeowners
              across Anne Arundel County with licensed, professional outdoor
              construction — from waterfront Annapolis to growing Odenton and
              everywhere in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton href="/contact" size="lg">
                Get a Free Estimate
                <ArrowRight className="h-5 w-5" />
              </CTAButton>
              <CTAButton variant="phone" size="lg" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why Local Matters */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">
              Based Here. Building Here.
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We&apos;re not a national chain dispatching unknown subcontractors.
              Bobby lives in Millersville and works across Anne Arundel County
              every day. We know the soil conditions, HOA rules, Critical Area
              regulations, and permit requirements in every community we serve —
              because we&apos;ve built in all of them.
            </p>
            <ul className="space-y-3">
              {[
                "Licensed Maryland Home Improvement Contractor — " + SITE.license,
                "Fully insured with general liability coverage",
                "Familiar with local permit, HOA, and Critical Area requirements",
                "We return calls quickly — usually same day",
                "Clean job sites, minimal disruption to your neighbors",
                "Equipment and crew based in Millersville — fast mobilization anywhere in the county",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-warm-bg rounded-2xl p-8 border border-border/30">
            <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Tell us your city and what you need. We&apos;ll set up a free,
              no-pressure estimate at your property.
            </p>
            <div className="space-y-3">
              <CTAButton href="/contact" className="w-full">
                Request a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <a
                href={SITE.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Phone className="h-4 w-4 text-brand" />
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* City Grid by Region */}
      <Section variant="warm">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Find Your Community</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click your city to see local project details, permit info, FAQs,
            and get a free estimate specific to your area.
          </p>
        </div>

        {REGION_GROUPS.map((group) => {
          const citiesInGroup = group.slugs
            .map((slug) => CITY_DATA.find((c) => c.slug === slug))
            .filter(Boolean) as typeof CITY_DATA;
          if (citiesInGroup.length === 0) return null;
          return (
            <div key={group.region} className="mb-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{group.region}</h3>
                <p className="text-sm text-muted-foreground">{group.desc}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {citiesInGroup.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    className="group flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm border border-border/30 hover:border-brand/50 hover:shadow-md transition-all"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium group-hover:text-brand transition-colors">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* Services Available Everywhere */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">
            Services Available County-Wide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every service we offer is available in all 19 communities. Same
            licensed crew, same quality materials, same guarantee.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Gravel Pads & Shed Foundations", desc: "Solid bases for sheds, garages, and outdoor structures.", href: "/services/gravel-pads-and-concrete-foundations" },
            { title: "Excavation & Site Prep", desc: "Professional grading, clearing, and site work.", href: "/services/excavation-and-demolition" },
            { title: "Driveway Installation", desc: "Durable driveways built to handle Maryland weather.", href: "/services/driveway-installation" },
            { title: "Decks", desc: "Custom wood and composite decks for outdoor living.", href: "/services/decks" },
            { title: "Hardscaping & Patios", desc: "Patios, walkways, and retaining walls.", href: "/services/hardscaping" },
            { title: "Fencing", desc: "Privacy, wood, vinyl, and aluminum fencing.", href: "/services/fencing" },
          ].map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group p-6 rounded-2xl border border-border/40 bg-white hover:border-brand/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-lg mb-2 group-hover:text-brand transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {service.desc}
              </p>
              <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            We serve homeowners throughout Anne Arundel County and select areas
            nearby. Give us a call — if you&apos;re within 30 miles of
            Millersville, there&apos;s a good chance we can help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Request a Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
