import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Phone,
  MessageSquare,
  Shield,
  FileText,
} from "lucide-react";
import { CITY_DATA, SITE, PRIMARY_SERVICES, TESTIMONIALS } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { LeadForm } from "@/components/shared/LeadForm";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { TrustBar } from "@/components/shared/TrustBar";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/shared/animations";

export async function generateStaticParams() {
  return CITY_DATA.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = CITY_DATA.find((c) => c.slug === citySlug);
  if (!city) return {};

  const title = `${city.headline} | ${SITE.name}`;
  const description = `${city.subheadline} Licensed ${SITE.license}. Free estimates — call ${SITE.phone}.`;

  return {
    title,
    description,
    openGraph: { title, description, images: ["/og-image.png"] },
    alternates: { canonical: `${SITE.url}/areas/${city.slug}` },
  };
}

const PROCESS = [
  {
    step: 1,
    title: "Request Your Free Estimate",
    description:
      "Fill out our quick form or call us directly. Tell us about your project and we'll schedule a time to visit your property.",
  },
  {
    step: 2,
    title: "On-Site Consultation",
    description:
      "We come to your property, assess the site conditions, measure, and give you a clear written estimate — no surprise charges, no pressure.",
  },
  {
    step: 3,
    title: "Approve & Schedule",
    description:
      "Once approved, we lock in your project date and handle permitting. Most projects start within 2–4 weeks.",
  },
  {
    step: 4,
    title: "Build & Final Walkthrough",
    description:
      "Our licensed crew completes your project. We walk through every detail with you before calling it done.",
  },
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = CITY_DATA.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const nearbyEntries = CITY_DATA.filter((c) => city.nearby.includes(c.slug));

  const topServiceObjects = city.topServices
    .map((name) => PRIMARY_SERVICES.find((s) => s.title === name))
    .filter(Boolean) as (typeof PRIMARY_SERVICES)[number][];

  const cityTestimonials = TESTIMONIALS.filter((t) =>
    t.location.toLowerCase().includes(city.county.split(" ")[0].toLowerCase())
  ).slice(0, 3);
  const displayTestimonials =
    cityTestimonials.length >= 2
      ? cityTestimonials
      : TESTIMONIALS.slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description: city.subheadline,
    telephone: SITE.phone,
    email: SITE.email,
    url: `${SITE.url}/areas/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.county,
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: SITE.license,
      recognizedBy: {
        "@type": "Organization",
        name: "Maryland Home Improvement Commission",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={[
        { label: "Service Areas", href: "/areas" },
        { label: city.name },
      ]} />

      <article>
      {/* ===== HERO ===== */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-semibold mb-6">
                <MapPin className="h-3.5 w-3.5" />
                {city.name}, {city.county}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6">
                {city.headline}
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">
                {city.subheadline}
              </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand text-brand"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/60">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand" />
                  <span className="text-sm text-white/60">
                    Fast call-backs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand" />
                  <span className="text-sm text-white/60">
                    Licensed {SITE.license}
                  </span>
                </div>
              </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton href="/contact" size="lg">
                  Get a Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <CTAButton variant="phone" size="lg" />
              </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-foreground">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">
                  Free Estimate in {city.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  No commitment. We respond within one business day.
                </p>
              </div>
              <LeadForm compact />
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ===== LOCAL DESCRIPTION — unique per city ===== */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <ScrollReveal>
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">
              Why {city.name} Homeowners Choose Bobby
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {city.localDescription}
            </p>
            <div className="bg-warm-bg rounded-2xl p-6 border border-border/30">
              <h3 className="font-bold text-sm uppercase tracking-wide text-brand mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                The Local Advantage
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {city.localAngle}
              </p>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
          <div>
            <StaggerChildren className="grid grid-cols-2 gap-4 mb-6" stagger={0.08}>
              {[
                { stat: "MHIC", label: "Licensed & Insured" },
                { stat: "5.0", label: "Star Google Rating" },
                { stat: "2–4 wks", label: "Average Start Time" },
                { stat: "Fast", label: "Response Time" },
              ].map((item) => (
                <StaggerItem key={item.label}>
                <div
                  className="bg-warm-bg rounded-2xl p-6 text-center border border-border/30"
                >
                  <p className="text-4xl font-display text-brand mb-1">
                    {item.stat}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {city.name} Permit Info
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {city.permitNote}
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== TOP SERVICES for this city ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">
            Most Popular Services in {city.name}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based on the projects we complete most in {city.name} and{" "}
            {city.county}.
          </p>
        </div>
        </ScrollReveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topServiceObjects.map((service) => (
            <StaggerItem key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-border/40 hover:border-brand/40 hover:shadow-lg transition-all block h-full"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 font-bold text-white text-lg">
                  {service.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {service.shortDesc}
                </p>
                <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <ScrollReveal delay={0.2}>
        <div className="text-center mt-8">
          <CTAButton href="/services" variant="outline">
            View All Services <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
        </ScrollReveal>
      </Section>

      {/* ===== ALL SERVICES LIST ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">
            Full Service List for {city.name}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every outdoor construction service we offer is available in{" "}
            {city.name} and throughout {city.county}.
          </p>
        </div>
        </ScrollReveal>
        <StaggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
          {PRIMARY_SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-warm-bg border border-border/30 hover:border-brand/40 hover:shadow-sm transition-all group"
            >
              <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
              <span className="font-medium group-hover:text-brand transition-colors">
                {service.title}
              </span>
            </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* ===== PROCESS ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">How We Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, transparent process from first call to final walkthrough.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
        <ProcessSteps steps={PROCESS} />
        </ScrollReveal>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">
            What {city.county} Homeowners Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real feedback from real homeowners in the communities we serve.
          </p>
        </div>
        </ScrollReveal>
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((t) => (
            <StaggerItem key={t.name}>
            <div
              className="bg-warm-bg rounded-2xl p-6 border border-border/30"
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand text-brand"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/80 italic mb-4 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* ===== FAQS — unique per city ===== */}
      <Section variant="warm">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              {city.name} FAQs
            </h2>
            <p className="text-muted-foreground text-lg">
              Real questions from homeowners in and around {city.name}.
            </p>
          </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <FAQAccordion items={city.faqs} />
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== NEARBY CITIES ===== */}
      {nearbyEntries.length > 0 && (
        <Section>
          <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl mb-3">
              We Also Serve Areas Near {city.name}
            </h2>
            <p className="text-muted-foreground">
              Outdoor construction available throughout {city.county} and
              surrounding communities.
            </p>
          </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyEntries.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/areas/${nearby.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-bg border border-border/40 text-sm font-medium hover:border-brand/50 hover:text-brand hover:shadow-sm transition-all"
              >
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {nearby.name}, MD
              </Link>
            ))}
          </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
          <div className="text-center mt-6">
            <Link
              href="/areas"
              className="text-sm text-brand font-semibold hover:underline inline-flex items-center gap-1"
            >
              View all service areas
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          </ScrollReveal>
        </Section>
      )}

      {/* ===== FINAL CTA ===== */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start Your {city.name} Project?
          </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Get a free, no-pressure estimate from a licensed contractor who
            shows up on time and does what he says.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <a
              href={SITE.phoneTel}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              Call {SITE.phone}
            </a>
            <a
              href={SITE.phoneSms}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 text-white/80 font-semibold hover:bg-white/5 transition-colors text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              Text Us
            </a>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Estimates are always free.{" "}
            <a href="/financing" className="underline hover:text-brand transition-colors">
              Financing available
            </a>
          </p>
          </ScrollReveal>
        </div>
      </section>
      </article>
    </>
  );
}
