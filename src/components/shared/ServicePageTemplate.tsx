import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Section } from "./Section";
import { CTAButton } from "./CTAButton";
import { TrustBar } from "./TrustBar";
import { ProcessSteps, type ProcessStep } from "./ProcessSteps";
import { FAQAccordion, type FAQItem } from "./FAQAccordion";
import { TestimonialCard } from "./TestimonialCard";
import { GalleryGrid } from "./GalleryGrid";
import { LeadForm } from "./LeadForm";
import { ServiceSchema, HowToSchema, FAQPageSchema } from "./SchemaOrg";
import { Breadcrumbs } from "./Breadcrumbs";
import { FinancingCallout } from "./FinancingCallout";
import { SITE, GALLERY_ITEMS, TESTIMONIALS } from "@/lib/constants";

interface ServicePageProps {
  title: string;
  slug: string;
  heroImage: string;
  heroAlt: string;
  headline: string;
  subheadline: string;
  factNugget?: string;
  intro: string[];
  benefits: { title: string; description: string }[];
  process: ProcessStep[];
  faqs: FAQItem[];
  relatedServices: { title: string; slug: string }[];
  galleryCategory: string;
  serviceOffers?: { name: string; description?: string }[];
  children?: React.ReactNode;
}

export function ServicePageTemplate({
  title,
  slug,
  heroImage,
  heroAlt,
  headline,
  subheadline,
  factNugget,
  intro,
  benefits,
  process,
  faqs,
  relatedServices,
  galleryCategory,
  serviceOffers,
  children,
}: ServicePageProps) {
  const galleryItems = GALLERY_ITEMS.filter((item) => item.category === galleryCategory);
  const testimonial = TESTIMONIALS.find(
    (t) => t.service.toLowerCase().includes(title.toLowerCase().split(" ")[0]) || t.service === title
  );

  return (
    <>
      <ServiceSchema name={title} description={subheadline} image={heroImage} slug={slug} offers={serviceOffers} />
      <HowToSchema
        name={`How ${SITE.name} Handles Your ${title} Project`}
        description={`Step-by-step process for ${title.toLowerCase()} projects in ${SITE.address.region}, Maryland.`}
        steps={process.map((s) => ({ title: s.title, description: s.description }))}
      />
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <Breadcrumbs items={[
        { label: "Services", href: "/services" },
        { label: title },
      ]} />

      <article>

      {/* ===== Hero: Split Layout with Visible Image ===== */}
      <section className="relative overflow-hidden">
        {/* Mobile: image visible behind gradient */}
        <div className="absolute inset-0 lg:hidden">
          <Image src={heroImage} alt={heroAlt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/90" />
        </div>

        {/* Desktop: split */}
        <div className="hidden lg:block absolute inset-0">
          <div className="absolute inset-0 bg-primary" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-12 py-16 md:py-20 lg:py-24">
            {/* Text */}
            <div className="lg:col-span-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-semibold mb-5">
                {SITE.name} &middot; {SITE.address.region}, MD
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 text-balance">
                {headline}
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                {subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton href="/contact" size="lg">
                  Get a Free {title} Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <CTAButton variant="phone" size="lg">
                  Call {SITE.phone}
                </CTAButton>
              </div>
            </div>

            {/* Image (desktop) */}
            <div className="hidden lg:block lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ===== Intro + Form ===== */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            {intro.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
            {factNugget && (
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                {factNugget}
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-warm-bg rounded-2xl p-6 border border-border/50 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Get Your Free Estimate</h3>
              <LeadForm preselectedService={title} compact />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <FinancingCallout />
        </div>
      </Section>

      {/* ===== Full-Bleed Image Break ===== */}
      {galleryItems.length > 0 && (
        <section className="relative h-[250px] md:h-[350px] overflow-hidden">
          <Image
            src={galleryItems[0].src}
            alt={galleryItems[0].alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </section>
      )}

      {/* ===== Benefits (with image backing) ===== */}
      <Section variant="warm">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">
            Why Choose Us for {title}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl p-6 shadow-sm border border-border/30 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {children}

      {/* ===== Process ===== */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">Our {title} Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here&apos;s exactly how your {title.toLowerCase()} project works from start to finish.
          </p>
        </div>
        <ProcessSteps steps={process} />
      </Section>

      {/* ===== Gallery ===== */}
      {galleryItems.length > 0 && (
        <Section variant="warm">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl mb-4">{title} Projects</h2>
          </div>
          <GalleryGrid items={galleryItems} />
          <div className="text-center mt-8">
            <CTAButton href="/gallery" variant="outline">
              View Full Gallery <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Section>
      )}

      {/* ===== Testimonial (Featured) ===== */}
      {testimonial && (
        <Section>
          <TestimonialCard {...testimonial} featured />
        </Section>
      )}

      {/* ===== FAQ ===== */}
      <Section variant={testimonial ? "warm" : "default"}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-10">{title} FAQs</h2>
          <FAQAccordion items={faqs} />
        </div>
      </Section>

      {/* ===== Related Services ===== */}
      <Section>
        <h2 className="text-2xl font-display mb-6">Related Services</h2>
        <div className="flex flex-wrap gap-3">
          {relatedServices.map((rs) => (
            <Link
              key={rs.slug}
              href={`/services/${rs.slug}`}
              className="px-5 py-3 rounded-xl bg-warm-bg border border-border/30 text-sm font-medium hover:border-brand hover:text-brand transition-all hover:shadow-sm"
            >
              {rs.title}
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== Final CTA ===== */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={heroAlt} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl mb-4">
            Ready to Get Started on Your {title} Project?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Get a free, no-obligation estimate from a licensed contractor. We respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Get Your Free Estimate <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg">
              Call {SITE.phone}
            </CTAButton>
          </div>
          <p className="mt-5">
            <a href="/financing" className="text-sm text-white/50 hover:text-brand transition-colors underline underline-offset-2">
              Financing available — rates as low as 0% APR
            </a>
          </p>
        </div>
      </section>
      </article>
    </>
  );
}
