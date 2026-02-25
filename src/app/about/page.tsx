import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Eye, Hammer, Users, Award } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { CTAButton } from "@/components/shared/CTAButton";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { SITE, TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Outdoor Construction",
  description: `${SITE.name} is a family-owned, licensed outdoor construction company serving ${SITE.address.region}, Maryland. Learn about our story, values, and commitment to quality craftsmanship.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    images: ["/og-image.png"],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

const VALUES = [
  {
    icon: Hammer,
    title: "Craftsmanship First",
    description:
      "Every cut, every pour, every board is done with intention. We build things the right way because our name is on every project.",
    accent: "from-brand/20 to-brand/5",
  },
  {
    icon: Eye,
    title: "Honest Communication",
    description:
      "You'll never wonder what's happening with your project. We give you a clear scope, a clear price, and clear updates throughout.",
    accent: "from-blue-500/15 to-blue-500/5",
  },
  {
    icon: Heart,
    title: "Treat It Like Our Own",
    description:
      "We work on your property like it's our own backyard. That means clean job sites, careful work, and respect for your home.",
    accent: "from-rose-500/15 to-rose-500/5",
  },
  {
    icon: Users,
    title: "Local Relationships",
    description:
      "We live here. We work here. Our kids go to school here. Every job is a chance to strengthen our place in this community.",
    accent: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    icon: Shield,
    title: "Licensed & Accountable",
    description: `We carry ${SITE.license} because we believe in accountability. Licensed, insured, and standing behind every project we complete.`,
    accent: "from-violet-500/15 to-violet-500/5",
  },
  {
    icon: Award,
    title: "Results You Can See",
    description:
      "Our gallery isn't stock photos. It's real work done for real homeowners in Anne Arundel County. The proof is in the build.",
    accent: "from-amber-500/15 to-amber-500/5",
  },
];

const HERO_IMAGES = [
  { src: "/images/IMG_0178-scaled-e1763134218201.jpeg", alt: "Large composite deck with outdoor living area" },
  { src: "/images/stamped-concrete-img.webp", alt: "Stamped concrete patio project" },
  { src: "/images/Patio-Red-Block-with-Compas-rotated.webp", alt: "Red block patio with compass design" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero: 3-image collage background ── */}
      <section className="relative overflow-hidden bg-primary min-h-[520px] md:min-h-[600px] flex items-center">
        {/* Three-column image collage behind the hero */}
        <div className="absolute inset-0 grid grid-cols-3">
          {HERO_IMAGES.map((img) => (
            <div key={img.src} className="relative overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="34vw"
                priority
              />
            </div>
          ))}
        </div>
        {/* Gradient that lets images show through at ~50% */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/40 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28">
          <p className="inline-block text-brand font-semibold text-sm tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Built on Handshakes, Not&nbsp;Hard&nbsp;Sells
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Family-owned. Locally rooted. Built on craftsmanship, clear
            communication, and doing right by every homeowner we work with.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* ── Our Story ── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We Build Outdoor Spaces That Families Actually Use
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Backyard Bobby&apos;s started with a simple idea: homeowners in
                Anne Arundel County deserve a contractor who shows up when they
                say they will, does exactly what they promised, and builds
                something that lasts.
              </p>
              <p>
                Too many people have been burned by contractors who ghost after
                getting a deposit, cut corners to save a few bucks, or leave a
                mess behind. We built this company to be the opposite of that
                experience.
              </p>
              <p>
                Every project we take on — whether it&apos;s a stamped concrete
                patio in Severna Park or a full deck build in Pasadena — gets the
                same attention to detail, the same quality materials, and the
                same clear communication from start to finish.
              </p>
              <p>
                We&apos;re not a franchise. We&apos;re not a national chain.
                We&apos;re a family-owned crew that lives and works in this
                community and takes pride in building things the right way.
              </p>
            </div>
            <div className="mt-8">
              <CTAButton href="/contact">
                Work With Us <ArrowRight className="h-5 w-5" />
              </CTAButton>
            </div>
          </div>

          {/* Stacked / overlapping image pair */}
          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG_0091-scaled-e1763134079775.jpeg"
                alt="Custom deck craftsmanship by Backyard Bobby's"
                width={600}
                height={450}
                className="w-full object-cover"
              />
            </div>
            {/* Offset second image for visual depth */}
            <div className="absolute -bottom-8 -left-4 md:-left-10 w-[55%] rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/IMG_0085-scaled-e1763134059488.jpeg"
                alt="Deck installation project in Anne Arundel County"
                width={400}
                height={300}
                className="w-full object-cover"
              />
            </div>
            {/* MHIC badge overlapping the image stack */}
            <div className="absolute -top-4 -right-2 md:-right-6 bg-primary text-white rounded-xl px-5 py-3 shadow-lg ring-4 ring-white z-10">
              <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                Licensed
              </p>
              <p className="text-lg font-bold leading-tight">MHIC</p>
              <p className="text-xs text-white/70">#05-163777</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Full-bleed project image strip ── */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/IMG_0210-scaled-e1763134109842.jpeg"
          alt="Finished deck overlooking backyard in Severna Park"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
      </section>

      {/* ── Values ── */}
      <Section variant="warm">
        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* Left editorial intro */}
          <div className="lg:col-span-2">
            <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Stand&nbsp;For
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These aren&apos;t just words on a page. They&apos;re how we run
              every job, handle every phone call, and earn every five-star
              review.
            </p>
            <div className="hidden lg:block mt-8 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/s2-1.webp"
                alt="Backyard Bobby's outdoor living project"
                width={500}
                height={380}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Value cards */}
          <div className="lg:col-span-3 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className={`relative rounded-2xl bg-white p-6 shadow-sm border border-border/30 overflow-hidden group hover:shadow-md transition-shadow ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 mb-4">
                    <value.icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section>
        <div className="text-center mb-12">
          <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-3">
            Real Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hear From Our Customers
          </h2>
        </div>

        {/* Featured testimonial + 2 regular */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <TestimonialCard {...TESTIMONIALS[0]} featured />
          <div className="grid gap-6">
            <TestimonialCard {...TESTIMONIALS[1]} />
            <TestimonialCard {...TESTIMONIALS[2]} />
          </div>
        </div>
      </Section>

      {/* ── CTA with visible background ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/IMG_0179-scaled-e1763134096739.jpeg"
          alt="Deck project showing craftsmanship and materials"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary/60 to-primary/80" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With a Contractor You Can&nbsp;Trust?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Get a free estimate and see why homeowners across Anne Arundel
            County choose Backyard Bobby&apos;s for their outdoor&nbsp;projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" />
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
