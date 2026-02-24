import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Users, Clock, ThumbsUp, ShieldCheck, MessageSquare, Star, Award, MapPin } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { AreaGrid } from "@/components/shared/AreaGrid";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTAButton } from "@/components/shared/CTAButton";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { FinancingCallout } from "@/components/shared/FinancingCallout";
import { ScrollReveal, StaggerChildren, StaggerItem, StickyStack, StackOver, ParallaxImage, CountUp } from "@/components/shared/animations";
import type { Metadata } from "next";
import { PRIMARY_SERVICES, TESTIMONIALS, GALLERY_ITEMS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE.url}` },
};

const SERVICE_CHIPS = PRIMARY_SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

const PROCESS = [
  { step: 1, title: "Request Your Estimate", description: "Fill out our quick form or give us a call. Tell us about your project and we'll set up a time to visit." },
  { step: 2, title: "On-Site Consultation", description: "We come to your property, take measurements, discuss your vision, and provide a clear written estimate." },
  { step: 3, title: "Approve & Schedule", description: "Review your estimate with zero pressure. Once approved, we lock in your project date and get materials lined up." },
  { step: 4, title: "Expert Build & Walkthrough", description: "Our crew builds it right. When it's done, we walk through every detail together before you sign off." },
];

const WHY_US = [
  { icon: ShieldCheck, title: "Licensed & Insured", desc: `${SITE.license} — fully licensed with the Maryland Home Improvement Commission.` },
  { icon: Hammer, title: "Built-to-Last Craftsmanship", desc: "Quality materials and proven methods that hold up to Maryland's weather. No shortcuts." },
  { icon: MessageSquare, title: "Clear Communication", desc: "You'll always know what's happening, what's next, and what it costs. No surprises." },
  { icon: Users, title: "Family-Owned & Local", desc: "We live and work in Anne Arundel County. Our reputation is our livelihood." },
  { icon: Clock, title: "On Time & On Budget", desc: "We give you a timeline and a price and we stick to both. Period." },
  { icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "We don't consider the job done until you're thrilled with the result." },
];

const HOME_FAQS = [
  { question: "How quickly can you start my project?", answer: "It depends on the season and scope, but most projects can start within 1–3 weeks of estimate approval. Smaller projects like gravel pads and fencing can sometimes start sooner. We'll give you a realistic timeline during your consultation." },
  { question: "Do you offer free estimates?", answer: "Yes, always. We'll come to your property, assess the project, and provide a clear written estimate at no charge and no obligation." },
  { question: "What areas do you serve?", answer: "We serve Anne Arundel County and surrounding areas including Annapolis, Severna Park, Pasadena, Crofton, Edgewater, Arnold, Glen Burnie, Odenton, and more." },
  { question: "Are you licensed and insured?", answer: `Absolutely. We're a licensed Maryland Home Improvement Contractor (${SITE.license}) and carry full liability insurance. We're happy to provide documentation upon request.` },
  { question: "Can you handle multiple projects at once?", answer: "Yes. Many homeowners bundle services like a new deck with hardscaping or a driveway with fencing. Bundling often saves time and money since we're already on site." },
  { question: "What if I'm not sure what I need?", answer: "No problem at all. Give us a call or submit a request describing what you're looking to accomplish. We'll assess your property and recommend the best approach." },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO: Split Layout with Image Collage ===== */}
      <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
        {/* Mobile: image background visible */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/wood-deck-construction-01.webp"
            alt="Custom deck built by Backyard Bobby's in Anne Arundel County"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
        </div>

        {/* Desktop: split layout */}
        <div className="hidden lg:block absolute inset-0">
          <div className="absolute inset-0 bg-primary" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 min-h-[90vh] lg:min-h-screen items-center gap-8 lg:gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-6 pt-12 pb-8 lg:py-24 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-semibold mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                Licensed {SITE.license} &middot; {SITE.address.region}, MD
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 text-balance">
                Outdoor Construction in
                <span className="text-brand block mt-1">Anne Arundel County, MD</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                Gravel pads, decks, driveways, fencing, and full backyard transformations — built by
                a licensed local crew that treats your property like our own.
              </p>

              {/* Social proof stats */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-brand text-brand" />)}
                  </div>
                  <p className="text-xs text-white/50 mt-1">5-Star Rated</p>
                </div>
                <div>
                  <p className="text-3xl font-display text-brand">18</p>
                  <p className="text-xs text-white/50 mt-0.5">Communities Served</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <CTAButton href="/quote" size="lg">
                  Get a Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <CTAButton variant="phone" size="lg">
                  Call {SITE.phone}
                </CTAButton>
              </div>

              <div className="flex flex-wrap gap-2">
                {SERVICE_CHIPS.slice(0, 5).map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="px-4 py-2.5 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 hover:border-white/20 text-white/60 hover:text-white/80"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Image Collage (desktop only) */}
            <div className="hidden lg:block lg:col-span-6 relative py-16">
              <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[600px]">
                {/* Main large image */}
                <div className="col-span-8 row-span-4 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/wood-deck-construction-01.webp"
                    alt="Custom deck built in Anne Arundel County"
                    fill
                    className="object-cover"
                    priority
                    sizes="40vw"
                  />
                </div>
                {/* Top right small image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/stamped-concrete-img.webp"
                    alt="Stamped concrete patio"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                {/* Bottom right small image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/Patio-Red-Block-with-Compas-rotated.webp"
                    alt="Hardscaping patio detail"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                {/* Bottom left image */}
                <div className="col-span-8 row-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/retaining-wall-curved-garden-02.jpg"
                    alt="Hardscaping retaining wall project in Anne Arundel County"
                    fill
                    className="object-cover"
                    sizes="30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ===== Stats Counter Bar ===== */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/paver-walkway-interlocking-bricks-01.jpeg"
            alt="Paver walkway project by Backyard Bobby's"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center text-white">
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand mb-1">Fast</p>
              <p className="text-sm text-white/60">Response Guarantee</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand mb-1"><CountUp target={18} /></p>
              <p className="text-sm text-white/60">Communities Served</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand mb-1">5.0</p>
              <p className="text-sm text-white/60">Average Star Rating</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand mb-1">MHIC</p>
              <p className="text-sm text-white/60">Licensed & Insured</p>
            </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ===== Services Grid ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">What We Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From ground-up construction to finishing touches, we handle every phase of your outdoor
            project with care and precision.
          </p>
        </div>
        </ScrollReveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
        <ScrollReveal delay={0.3}>
        <div className="text-center mt-10">
          <CTAButton href="/services" variant="outline">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
        </ScrollReveal>
      </Section>

      {/* ===== Full-Bleed Image Break ===== */}
      <StickyStack>
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ParallaxImage
          src="/images/Stamped-Patio-with-planter-2-rotated.webp"
          alt="Completed paver patio with pergola by Backyard Bobby's"
          className="absolute inset-0"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <ScrollReveal direction="left">
            <blockquote className="max-w-lg text-white">
              <p className="font-display text-2xl md:text-3xl leading-snug mb-3">
                &ldquo;The craftsmanship is top notch and Bobby walked us through every decision.&rdquo;
              </p>
              <cite className="text-brand text-sm font-semibold not-italic">
                — James & Linda P., Crofton MD
              </cite>
            </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </StickyStack>

      {/* ===== Why Choose Us (Asymmetric Layout) ===== */}
      <StackOver>
      <Section>
        <div className="grid gap-12 lg:grid-cols-5 items-center">
          {/* Left: Large project image */}
          <div className="lg:col-span-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image
                src="/images/retaining-wall-curved-garden-02.jpg"
                alt="Hardscaping craftsmanship by Backyard Bobby's in Anne Arundel County"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-brand to-brand-dark text-white rounded-xl px-5 py-3 shadow-lg">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-white" />)}
              </div>
              <p className="text-xs mt-1 font-medium">5-Star Rated</p>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="lg:col-span-3">
            <ScrollReveal>
            <h2 className="text-3xl md:text-5xl mb-4">
              Why Homeowners Choose Backyard Bobby&apos;s
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We earn every project through honest work, fair pricing, and results you can see.
            </p>
            </ScrollReveal>
            <StaggerChildren className="grid gap-6 sm:grid-cols-2">
              {WHY_US.map((item) => (
                <StaggerItem key={item.title}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-0.5 text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Section>

      {/* ===== Featured Gallery Strip ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Recent Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what we&apos;ve built for homeowners across Anne Arundel County.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
        <GalleryGrid items={GALLERY_ITEMS.slice(0, 8)} />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
        <div className="text-center mt-8">
          <CTAButton href="/gallery" variant="outline">
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
        </ScrollReveal>
      </Section>

      {/* ===== Financing CTA ===== */}
      <Section>
        <ScrollReveal>
        <FinancingCallout />
        </ScrollReveal>
      </Section>

      {/* ===== Process ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From first call to final walkthrough, here&apos;s what to expect.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
        <ProcessSteps steps={PROCESS} />
        </ScrollReveal>
      </Section>

      {/* ===== Testimonials (Featured + Grid) ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from real homeowners in the Anne Arundel County area.
          </p>
        </div>
        </ScrollReveal>
        {/* Featured large quote */}
        <ScrollReveal delay={0.1}>
        <div className="mb-8">
          <TestimonialCard {...TESTIMONIALS[0]} featured />
        </div>
        </ScrollReveal>
        {/* Supporting testimonials */}
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(1).map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard {...t} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* ===== Service Areas ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Areas We Serve</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proud to serve homeowners throughout {SITE.address.region} and surrounding communities.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
        <AreaGrid />
        </ScrollReveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="warm">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <FAQAccordion items={HOME_FAQS} />
          </ScrollReveal>
        </div>
      </Section>
      </StackOver>

      {/* ===== Final CTA with Visible Image ===== */}
      <StickyStack>
      <section className="relative overflow-hidden py-20 md:py-28">
        <ParallaxImage
          src="/images/stamped-concrete-img.webp"
          alt="Stamped concrete patio by Backyard Bobby's"
          className="absolute inset-0"
          speed={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <ScrollReveal>
          <h2 className="text-3xl md:text-5xl mb-4">
            Ready to Transform Your Outdoor Space?
          </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Get a free, no-pressure estimate from a licensed contractor who actually shows up on
            time and does what they say.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/quote" size="lg">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg">
              Call {SITE.phone}
            </CTAButton>
          </div>
          <p className="text-white/40 text-sm mt-6">
            <a href="/financing" className="underline hover:text-brand transition-colors">
              Financing available — rates as low as 0% APR
            </a>
          </p>
          </ScrollReveal>
        </div>
      </section>
      </StickyStack>
    </>
  );
}
