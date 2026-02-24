import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { TrustBar } from "@/components/shared/TrustBar";
import { CTAButton } from "@/components/shared/CTAButton";
import { PRIMARY_SERVICES, ADDITIONAL_SERVICES, SITE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: `Our Services | Outdoor Construction & Renovation`,
  description: `${SITE.name} offers premium outdoor construction services in ${SITE.address.region}, MD: decks, hardscaping, stamped concrete, fencing, driveways, roofing, ADUs, excavation, and gravel pads. Get a free estimate.`,
  alternates: { canonical: `${SITE.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/s2-1.webp"
            alt="Backyard Bobby's outdoor construction services"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl mb-4 text-white">Our Services</h1>
            <p className="text-lg text-white/70 max-w-xl">
              From the ground up, we handle every aspect of your outdoor project. Licensed, insured,
              and committed to quality.
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </Section>

      <Section variant="warm">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Additional Services</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          We also handle these common project needs. Select any of them when requesting a quote.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {ADDITIONAL_SERVICES.map((service) => (
            <span
              key={service}
              className="px-5 py-2.5 bg-white rounded-lg border border-border shadow-sm text-sm font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/op2.webp"
            alt="Outdoor project by Backyard Bobby's"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/65" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Tell us about your project and we&apos;ll recommend the best approach. Free consultation, zero pressure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Get a Free Estimate <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg">
              Call {SITE.phone}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

