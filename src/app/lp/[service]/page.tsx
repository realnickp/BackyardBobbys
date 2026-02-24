import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  CheckCircle,
  Phone,
  Star,
  Clock,
  Shield,
  MessageSquare,
  ArrowRight,
  Users,
} from "lucide-react";
import { PRIMARY_SERVICES, SITE, TESTIMONIALS } from "@/lib/constants";
import { UtmSaver } from "@/components/lp/UtmSaver";

// ── Service-specific LP content ─────────────────────────────────────────────

const LP_CONTENT: Record<
  string,
  {
    headline: string;
    subheadline: string;
    bullets: string[];
    testimonialIndex: number;
  }
> = {
  decks: {
    headline: "Get a Custom Deck Built for Maryland Living",
    subheadline:
      "Bobby designs and builds decks that last decades in the Maryland climate — composite or wood, every style and size. Licensed, permitted, and done right from the first post to the final board.",
    bullets: [
      "Composite & wood options — Bobby helps you pick what's right for your home",
      "Permits pulled and handled for Anne Arundel County",
      "Code-compliant build with full structural warranty",
    ],
    testimonialIndex: 2,
  },
  fencing: {
    headline: "Professional Fence Installation in Anne Arundel County",
    subheadline:
      "Privacy, security, and curb appeal — installed by a licensed MD contractor with clean workmanship and prices that won't surprise you.",
    bullets: [
      "Wood, vinyl, aluminum, and chain-link options",
      "Property line verification and permit handling",
      "Straight lines, tight posts, guaranteed installation",
    ],
    testimonialIndex: 4,
  },
  hardscaping: {
    headline: "Beautiful Patios, Walkways & Retaining Walls",
    subheadline:
      "Transform your outdoor space with professional hardscaping that adds lasting value, daily usability, and real beauty to your Maryland home.",
    bullets: [
      "Patios, walkways, steps, and retaining walls",
      "Natural stone, pavers, and concrete block options",
      "Drainage engineered into every project — no pooling, ever",
    ],
    testimonialIndex: 0,
  },
  "stamped-concrete": {
    headline: "Stamped Concrete Patios & Driveways in Maryland",
    subheadline:
      "Get the look of natural stone or brick at a fraction of the cost — professionally installed, sealed, and built to handle Maryland weather year after year.",
    bullets: [
      "Dozens of patterns and color combinations",
      "Sealer applied for weather and stain resistance",
      "Old concrete removed or repaired first",
    ],
    testimonialIndex: 0,
  },
  "driveway-installation": {
    headline: "New Driveway — Asphalt, Concrete & Pavers",
    subheadline:
      "Replace your crumbling driveway with a durable, properly graded surface built to handle Maryland's freeze-thaw cycles for years to come.",
    bullets: [
      "Asphalt, concrete, and paver options — honest comparison upfront",
      "Proper base prep and drainage included on every job",
      "We handle all county permit requirements",
    ],
    testimonialIndex: 3,
  },
  "gravel-pads-and-concrete-foundations": {
    headline: "Gravel Pads & Concrete Foundations — Fast & Solid",
    subheadline:
      "Need a solid base for your shed, garage, or outdoor structure? Bobby preps, grades, and builds it right the first time — no shortcuts.",
    bullets: [
      "Gravel, crushed stone, and concrete slab options",
      "Proper drainage and compaction on every pad",
      "Ready for sheds, garages, pools, and more",
    ],
    testimonialIndex: 1,
  },
  "accessory-dwelling-units": {
    headline: "Add an ADU — More Space, More Property Value",
    subheadline:
      "Bobby builds accessory dwelling units from the ground up: foundation, framing, utilities, and finish. One contractor, zero headaches, outstanding results.",
    bullets: [
      "Detached studios, in-law suites, and guest houses",
      "Full permitting and inspection coordination handled in-house",
      "From excavation to final walkthrough — all under one roof",
    ],
    testimonialIndex: 5,
  },
  "excavation-and-demolition": {
    headline: "Professional Excavation & Demolition in Maryland",
    subheadline:
      "Site prep done right the first time — grading, clearing, demo, and haul-away by a licensed Maryland contractor with the equipment and experience to get it done.",
    bullets: [
      "Land clearing, grading, and excavation",
      "Structure demolition with full debris removal",
      "Site ready for your next build when Bobby's crew leaves",
    ],
    testimonialIndex: 5,
  },
  roofing: {
    headline: "Roofing Repair & Replacement — MD Licensed",
    subheadline:
      "Protect your home with a reliable roof installed by Backyard Bobby's licensed, insured crew. Fast estimates, honest pricing, no pressure.",
    bullets: [
      "Shingle repair, replacement, and full re-roofs",
      "Leak diagnosis and emergency response available",
      "Gutters and fascia handled too",
    ],
    testimonialIndex: 0,
  },
};

// ── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PRIMARY_SERVICES.map((s) => ({ service: s.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  if (!svc) return {};
  return {
    title: `Free ${svc.title} Estimate | ${SITE.name}`,
    description: `Get a free ${svc.title.toLowerCase()} estimate from Backyard Bobby's — licensed Maryland contractor. No obligation. We respond within one business day.`,
    robots: { index: false, follow: false },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function LpServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  const content = LP_CONTENT[service];

  if (!svc || !content) notFound();

  const testimonial = TESTIMONIALS[content.testimonialIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* UTM saver (invisible client component) */}
      <Suspense fallback={null}>
        <UtmSaver />
      </Suspense>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
          <p className="text-sm font-medium hidden sm:block">
            <span className="font-bold">Backyard Bobby&apos;s</span> — Licensed Maryland Contractor · {SITE.license}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={SITE.phoneTel}
              className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main hero ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-start">

          {/* Left: Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* Headline */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand text-xs font-semibold px-3 py-1 mb-4">
                <Clock className="h-3.5 w-3.5" />
                Free estimate · Fast response
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight mb-4">
                {content.headline}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.subheadline}
              </p>
            </div>

            {/* Hero image */}
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={svc.image}
                alt={`${svc.title} by Backyard Bobby's in Anne Arundel County, MD`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Bullets */}
            <div className="space-y-3">
              {content.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/85">{bullet}</p>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                <p className="text-foreground/85">
                  Free, no-pressure estimate — Bobby visits your property and gives you a written quote
                </p>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-brand" />
                <span>Licensed {SITE.license}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-brand text-brand" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-brand" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-brand" />
                <span>5-Star Rated</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-warm-bg rounded-2xl border border-border/30 p-6">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed mb-4 text-foreground/80">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-2 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl border border-border/40 shadow-xl p-6 md:p-8">

              {/* Card header */}
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 mb-4 text-3xl">
                  🎯
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Your Free Estimate is Just 2 Minutes Away
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Answer 4 quick questions so Bobby knows exactly what to prepare — then he&apos;ll reach out within one business day.
                </p>
              </div>

              {/* CTA button */}
              <Link
                href={`/lp/${service}/quiz`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-brand-dark py-4 text-base font-bold text-white shadow-md hover:shadow-lg hover:shadow-brand/25 transition-all"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center border-t border-border/30 pt-5">
                <div>
                  <p className="text-lg font-bold">500+</p>
                  <p className="text-xs text-muted-foreground">Projects done</p>
                </div>
                <div>
                  <div className="flex justify-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-brand text-brand" />)}
                  </div>
                  <p className="text-xs text-muted-foreground">5-star rated</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Fast</p>
                  <p className="text-xs text-muted-foreground">Response time</p>
                </div>
              </div>

              {/* Or reach out */}
              <div className="mt-5 border-t border-border/30 pt-5">
                <p className="text-sm text-center text-muted-foreground mb-3">
                  Prefer to talk right now?
                </p>
                <div className="flex gap-2">
                  <a
                    href={SITE.phoneTel}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={SITE.phoneSms}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Text
                  </a>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 shrink-0" />
                100% free · No obligation · No spam
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom trust bar ─────────────────────────────────────────────── */}
      <div className="border-t border-border/30 bg-muted/30 py-6 px-4 mt-8">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{SITE.name}</span>
          <span>·</span>
          <span>{SITE.license}</span>
          <span>·</span>
          <span>Anne Arundel County, MD & Surrounding Areas</span>
          <span>·</span>
          <a href={SITE.phoneTel} className="text-primary font-semibold hover:underline">
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
