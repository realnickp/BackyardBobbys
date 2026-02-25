import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { LeadForm } from "@/components/shared/LeadForm";
import { CTAButton } from "@/components/shared/CTAButton";
import { SITE, GALLERY_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Estimate",
  description: `Contact ${SITE.name} for a free estimate on decks, hardscaping, fencing, driveways, and more in ${SITE.address.region}, MD. Call ${SITE.phone} or fill out our quick form.`,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    images: ["/og-image.png"],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

const PROOF_IMAGES = GALLERY_ITEMS.slice(0, 5);

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO: SPLIT LAYOUT ─── */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 min-h-[420px] md:min-h-[480px]">
            {/* Left: dark content panel */}
            <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 md:py-20">
              <span className="inline-flex items-center gap-2 text-brand text-sm font-semibold tracking-wide uppercase mb-4">
                <Phone className="h-4 w-4" />
                Let&apos;s Talk About Your Project
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mb-5">
                Get Your Free Estimate
              </h1>
              <p className="text-primary-foreground/75 text-lg max-w-lg mb-8 leading-relaxed">
                Tell us about your project and we&apos;ll get back to you within
                one business day with a clear, no-pressure estimate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton href="#estimate-form" size="lg">
                  Request Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <CTAButton variant="phone" size="lg">
                  Call {SITE.phone}
                </CTAButton>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-10" />
              <Image
                src="/images/op2.webp"
                alt="Beautiful outdoor patio project by Backyard Bobby's in Anne Arundel County"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* Mobile: background image fallback */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/op2.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
      </section>

      <TrustBar />

      {/* ─── SOCIAL PROOF IMAGE STRIP ─── */}
      <section className="bg-warm-bg border-b border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex -space-x-3">
              {PROOF_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="relative h-14 w-14 rounded-full overflow-hidden border-[3px] border-white shadow-md"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base text-foreground/80 font-medium text-center sm:text-left max-w-xs">
              5-star rated service for homeowners across Anne Arundel County
            </p>
          </div>
        </div>
      </section>

      {/* ─── FORM + CONTACT INFO ─── */}
      <Section id="estimate-form">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-3">
            Request Your Free On-Site Consultation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill out the form and we&apos;ll reach out to schedule a time that
            works for you. No obligation, no pressure.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.06] border border-border/40 p-6 md:p-10">
              <LeadForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] border border-border/40">
              <h3 className="font-bold text-lg mb-5">Contact Information</h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={SITE.phoneTel}
                    className="flex items-center gap-4 text-foreground hover:text-brand transition-colors group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5 group-hover:from-brand/25 transition-colors">
                      <Phone className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                      <p className="font-semibold">443-875-8550</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-4 text-foreground hover:text-brand transition-colors group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5 group-hover:from-brand/25 transition-colors">
                      <Mail className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                      <p className="font-semibold">{SITE.email}</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5">
                    <MapPin className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Service Area</p>
                    <p className="font-semibold">{SITE.address.region}, {SITE.address.state}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand/5">
                    <Clock className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Response Time</p>
                    <p className="font-semibold">Within 1 business day</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Calendly booking */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] border border-border/40">
              <h3 className="font-bold text-lg mb-2">Prefer to Book Directly?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Schedule a time that works for you and we&apos;ll come out for
                an on-site estimate.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-br from-brand to-brand-dark text-white px-5 py-3.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-brand/25 transition-all duration-300"
              >
                <Calendar className="h-4 w-4" />
                Book an Estimate
              </a>
            </div>

            {/* License badge */}
            <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-2xl p-6 md:p-8">
              <div className="absolute top-0 right-0 h-24 w-24 bg-brand/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 h-16 w-16 bg-brand/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <h3 className="font-bold text-lg mb-2">Licensed &amp; Insured</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {SITE.license} — Fully licensed with the Maryland Home
                  Improvement Commission. Your project and property are
                  protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PORTFOLIO STRIP ─── */}
      <Section variant="dark-gradient">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-3">
            See Our Work in Action
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Browse real projects we&apos;ve completed for homeowners across Anne
            Arundel County.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.slice(0, 8).map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.category}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <CTAButton variant="outline-light" href="/gallery">
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
      </Section>

      {/* ─── MAP SECTION ─── */}
      <Section variant="warm">
        <h2 className="text-2xl md:text-3xl text-center mb-8">
          Our Service Area
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/[0.08] max-w-4xl mx-auto border border-border/40">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198656.12345!2d-76.62!3d38.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7f6c3e4d1c8f7%3A0x1234567890abcdef!2sAnne%20Arundel%20County%2C%20MD!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="300"
            className="md:!h-[400px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Backyard Bobby's service area - Anne Arundel County, Maryland"
          />
        </div>
        <p className="text-center text-muted-foreground mt-6 text-sm">
          Proudly serving Annapolis, Severna Park, Crofton, Pasadena, Arnold,
          Edgewater, and all of {SITE.address.region}.
        </p>
      </Section>
    </>
  );
}
