import type { Metadata } from "next";
import { Star, ArrowRight, Quote } from "lucide-react";
import { SITE, TESTIMONIALS } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { TrustBar } from "@/components/shared/TrustBar";

export const metadata: Metadata = {
  title: `Customer Reviews & Testimonials | ${SITE.name}`,
  description: `Read real customer reviews for Backyard Bobby's outdoor construction in Anne Arundel County, MD. 5-star rated. Licensed ${SITE.license}. Free estimates — call ${SITE.phone}.`,
  alternates: { canonical: `${SITE.url}/testimonials` },
  openGraph: {
    title: `Customer Reviews | ${SITE.name}`,
    description: "Real reviews from homeowners across Anne Arundel County, Maryland.",
  },
};

// Extended testimonials for the dedicated page
const ALL_TESTIMONIALS = [
  ...TESTIMONIALS,
  {
    name: "Kevin & Amanda S.",
    location: "Glen Burnie, MD",
    text: "They built us a beautiful gravel pad for our new shed and also helped level the area around it. Everything was done in one day and the crew was excellent — friendly, professional, and fast.",
    service: "Gravel Pads",
    rating: 5,
  },
  {
    name: "Rachel T.",
    location: "Millersville, MD",
    text: "I was nervous about the excavation needed for my pool base, but Bobby's team made it look easy. They communicated every step of the way and finished on schedule. Highly recommend.",
    service: "Excavation",
    rating: 5,
  },
  {
    name: "Frank M.",
    location: "Gambrills, MD",
    text: "Got three quotes for my driveway. Backyard Bobby's wasn't the cheapest but they were thorough, explained every detail, and delivered exactly what they promised. Worth every penny.",
    service: "Driveway Installation",
    rating: 5,
  },
  {
    name: "Susan L.",
    location: "Crownsville, MD",
    text: "The stamped concrete patio they installed is absolutely gorgeous. My neighbors keep asking who did it. Great crew, great experience from start to finish.",
    service: "Stamped Concrete",
    rating: 5,
  },
  {
    name: "Bill & Pam H.",
    location: "Odenton, MD",
    text: "We needed a retaining wall and patio built on a pretty challenging slope. Bobby came out personally to assess it and came up with a great plan. The result exceeded our expectations.",
    service: "Hardscaping",
    rating: 5,
  },
  {
    name: "Tanya R.",
    location: "Severn, MD",
    text: "Quick, clean, professional. They put up our fence in one day and were completely tidy when they left. The crew was respectful of our yard and our neighbors. Five stars, no question.",
    service: "Fencing",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    telephone: SITE.phone,
    url: SITE.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(ALL_TESTIMONIALS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: ALL_TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-semibold mb-6">
            <Star className="h-3.5 w-3.5 fill-brand" />
            5-Star Rated · Anne Arundel County, MD
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            What Our Customers Say
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Real reviews from real homeowners across {SITE.address.region} and
            greater Maryland. No filters, no cherry-picking.
          </p>
          {/* Aggregate stars */}
          <div className="inline-flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-8 w-8 fill-brand text-brand" />
              ))}
            </div>
            <p className="text-white/60 text-sm">
              {ALL_TESTIMONIALS.length} verified reviews · 5.0 average
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Featured review */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl bg-warm-bg border border-border/40 p-8 md:p-12">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-brand/10" />
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-brand text-brand" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-display leading-relaxed mb-6 text-foreground/90">
              &ldquo;{ALL_TESTIMONIALS[0].text}&rdquo;
            </blockquote>
            <div>
              <p className="font-bold">{ALL_TESTIMONIALS[0].name}</p>
              <p className="text-sm text-muted-foreground">
                {ALL_TESTIMONIALS[0].location} · {ALL_TESTIMONIALS[0].service}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* All reviews grid */}
      <Section variant="warm">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">All Reviews</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From gravel pads to decks, fencing to full outdoor transformations.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-border/30 shadow-sm flex flex-col"
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground/80 italic leading-relaxed mb-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-border/20">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.location} · {t.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Google CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4">
            See Us on Google
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We&apos;re proud of our reputation across Anne Arundel County. Find
            our Google Business Profile for the most up-to-date reviews.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/quote" size="lg">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}
