import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProjectBuilder } from "@/components/shared/ProjectBuilder";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTAButton } from "@/components/shared/CTAButton";
import { SITE, GALLERY_ITEMS, TESTIMONIALS } from "@/lib/constants";
import type { ServiceContent } from "@/lib/service-content";

const LEAD_SOURCE = "google_ads";

/**
 * Art-directed Google-Ads landing page for the five built-out `/lp/[service]`
 * pages. Deliberately NOT the shared ServicePageTemplate: ad pages are noindex,
 * so the long SEO copy is trimmed to what a paid visitor needs, project imagery
 * moves to the top of the page, and the layout is mobile-first editorial —
 * "field sheet" typography (serif display + mono spec labels) instead of a
 * stack of cards. Every lead entry point stays tagged `google_ads`.
 */

function SectionLabel({ no, title, light }: { no: string; title: string; light?: boolean }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        {no}
      </span>
      <span
        className={`font-mono text-xs uppercase tracking-[0.25em] ${
          light ? "text-white/70" : "text-foreground/70"
        }`}
      >
        {title}
      </span>
      <span aria-hidden className={`h-px flex-1 ${light ? "bg-white/15" : "bg-border"}`} />
    </div>
  );
}

export function LpServiceLanding({
  content,
  children,
}: {
  content: ServiceContent;
  children?: React.ReactNode;
}) {
  const {
    title,
    slug,
    heroImage,
    heroAlt,
    headline,
    intro,
    benefits,
    process,
    faqs,
    galleryCategory,
  } = content;

  const quizHref = `/lp/${slug}/quiz?src=${LEAD_SOURCE}`;

  const galleryItems = GALLERY_ITEMS.filter((item) => item.category === galleryCategory);
  const stripItems = galleryItems.slice(0, 8);
  const breakImage = galleryItems[1] ?? galleryItems[0];
  const mastheadSide = galleryItems[2] ?? galleryItems[1];
  const processImage = galleryItems[3] ?? galleryItems[0];

  const firstWord = title.toLowerCase().split(" ")[0];
  const testimonial =
    TESTIMONIALS.find((t) => t.service.toLowerCase().includes(firstWord)) ??
    TESTIMONIALS.find((t) => t.text.toLowerCase().includes(firstWord));

  const longTitle = title.length > 18;

  return (
    <article>
      {/* ── Masthead ──────────────────────────────────────────────────────── */}
      <header className="bg-warm-bg">
        <div aria-hidden className="h-1 bg-brand" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 animate-hero-fade-in">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
                Free estimate · {SITE.address.region}, MD
              </p>
              <h1
                className={`leading-[0.95] text-balance mb-5 ${
                  longTitle
                    ? "text-[clamp(2.25rem,9vw,4.25rem)]"
                    : "text-[clamp(2.75rem,12vw,5.5rem)]"
                }`}
              >
                {title}
                <span className="text-brand">.</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-7">
                {headline}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <CTAButton href={quizHref} size="lg">
                  Start My Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <a
                  href={SITE.phoneTel}
                  className="font-mono text-sm font-semibold underline underline-offset-4 decoration-brand/60 hover:decoration-brand transition-colors"
                >
                  or call {SITE.phone}
                </a>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {SITE.license} · Licensed &amp; insured · Answered within 1 business day
              </p>
            </div>

            {/* Offset photo pair — desktop only; mobile gets the filmstrip below */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <figure className="relative aspect-[4/5] w-[82%] overflow-hidden">
                  <Image
                    src={heroImage}
                    alt={heroAlt}
                    fill
                    className="object-cover"
                    priority
                    sizes="34vw"
                  />
                </figure>
                {mastheadSide && (
                  <figure className="absolute -bottom-8 right-0 w-[52%] aspect-[4/3] overflow-hidden border-8 border-warm-bg">
                    <Image
                      src={mastheadSide.src}
                      alt={mastheadSide.alt}
                      fill
                      className="object-cover"
                      sizes="22vw"
                    />
                  </figure>
                )}
                <span className="absolute -bottom-8 left-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Fig. 01 — {galleryCategory}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Filmstrip: the work, moved to the top of the page ───────────── */}
        <div className="pb-10 lg:pb-14 lg:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-baseline justify-between mb-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em]">
              Recent work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Swipe →
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {stripItems.map((item, i) => (
              <figure
                key={`${item.src}-${i}`}
                className={`relative shrink-0 snap-start ${
                  i % 3 === 1 ? "w-[58%] sm:w-[240px]" : "w-[82%] sm:w-[380px]"
                }`}
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, 380px"
                  />
                </div>
                <figcaption className="mt-2 flex gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="shrink-0 text-brand">
                    Fig. {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{item.alt}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div aria-hidden className="border-b border-border" />
      </header>

      {/* ── Lede + estimate ticket + spec index ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <p className="text-foreground/80 leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8]">
              {intro[0]}
            </p>
          </div>

          {/* Estimate ticket — the one conversion object on the page */}
          <aside id="estimate" className="lg:col-span-5 lg:row-span-2">
            <div className="lg:sticky lg:top-20 border border-primary/20 bg-warm-bg shadow-[8px_8px_0_0_var(--brand)]">
              <div className="flex items-center justify-between bg-primary px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground">
                  Estimate request
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  Free
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <ProjectBuilder
                  serviceTitle={title}
                  serviceSlug={slug}
                  leadSource={LEAD_SOURCE}
                  adLanding
                />
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  <a
                    href="#financing"
                    className="underline underline-offset-4 decoration-brand/60 hover:decoration-brand transition-colors"
                  >
                    Financing available — as low as 0% APR
                  </a>
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <SectionLabel no="01" title="What you're getting" />
            <ul className="divide-y divide-border border-y border-border">
              {benefits.map((benefit, i) => (
                <li key={benefit.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                  <span className="pt-0.5 font-mono text-xs text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Full-bleed photo break ───────────────────────────────────────── */}
      {breakImage && (
        <figure className="relative h-[300px] sm:h-[380px] lg:h-[480px]">
          <Image
            src={breakImage.src}
            alt={breakImage.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <figcaption className="absolute bottom-0 left-4 sm:left-6 lg:left-8 max-w-[90%] bg-primary px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
            {breakImage.alt}
          </figcaption>
        </figure>
      )}

      {/* ── Process — dark zone ──────────────────────────────────────────── */}
      <section className="dark-textured bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
          <SectionLabel no="02" title="How it goes" light />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ol className="lg:col-span-7 space-y-10">
              {process.map((step) => (
                <li key={step.step} className="grid grid-cols-[3.5rem_1fr] gap-x-5">
                  <span className="font-display text-4xl leading-none text-brand">
                    {step.step}
                  </span>
                  <div className="border-l border-white/15 pl-5 -ml-5 lg:ml-0 lg:border-0 lg:pl-0">
                    <h3 className="text-lg mb-1.5">{step.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="hidden lg:block lg:col-span-5">
              <figure className="relative h-full min-h-[420px] overflow-hidden border border-white/15">
                <Image
                  src={processImage.src}
                  alt={processImage.alt}
                  fill
                  className="object-cover"
                  sizes="38vw"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                  {processImage.alt}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Service-specific extras (e.g. stamped-concrete pattern picker) */}
      {children}

      {/* ── Pull-quote testimonial ───────────────────────────────────────── */}
      {testimonial && (
        <section className="bg-warm-bg border-y border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <blockquote>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-balance">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span aria-hidden className="text-brand tracking-normal">★★★★★</span>
                <span>
                  {testimonial.name} · {testimonial.location}
                </span>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ── Financing (Wisetack prequalify) ──────────────────────────────── */}
      <section id="financing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 scroll-mt-16">
        <SectionLabel no="03" title="Pay over time" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl mb-4 text-balance">
              Financing from 0% APR<span className="text-brand">.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-7 max-w-md">
              Split your {title.toLowerCase()} project into fixed monthly payments from $500 to
              $25,000. Checking your rate takes about a minute and is a soft credit check — it
              won&apos;t affect your credit score.
            </p>
            <ul className="space-y-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              <li>— Rates as low as 0% APR</li>
              <li>— No hard credit pull to check your rate</li>
              <li>— Powered by Wisetack · Secure &amp; encrypted</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-primary/20 bg-white">
              <div className="flex items-center justify-between bg-primary px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground">
                  Check your rate
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  ~60 sec
                </span>
              </div>
              <iframe
                src="https://wisetack.us/#/m39n9j4/prequalify"
                title={`Wisetack Financing Prequalification — ${SITE.name}`}
                className="w-full border-0 h-[640px]"
                loading="lazy"
                allow="payment"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-warm-bg border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl">
            <SectionLabel no="04" title="Straight answers" />
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand mb-4">
            Next step
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl max-w-2xl text-balance mb-4">
            Tell Bobby what you&apos;re building.
          </h2>
          <p className="text-white/70 max-w-xl leading-relaxed mb-8">
            Free written estimate, no pressure, no obligation. We respond within one business
            day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <CTAButton href={quizHref} size="lg">
              Start My Free Estimate <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg" />
            <CTAButton variant="text" size="lg" />
          </div>
          <p className="mt-6">
            <a
              href="#financing"
              className="font-mono text-xs uppercase tracking-[0.15em] text-white/50 hover:text-brand transition-colors underline underline-offset-4"
            >
              Financing available — rates as low as 0% APR
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
