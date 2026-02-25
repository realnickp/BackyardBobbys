import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { CTAButton } from "@/components/shared/CTAButton";
import { GALLERY_ITEMS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Project Gallery | See Our Work",
  description: `Browse completed projects by ${SITE.name}: decks, patios, fencing, driveways, stamped concrete, and more across ${SITE.address.region}, MD. See the quality before you hire.`,
  alternates: { canonical: `${SITE.url}/gallery` },
  openGraph: {
    images: ["/og-image.png"],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

const HERO_MOSAIC = [
  { src: "/images/stamped-concrete-img.webp", alt: "Stamped concrete patio", span: "col-span-2 row-span-2" },
  { src: "/images/IMG_0178-scaled-e1763134218201.jpeg", alt: "Large composite deck", span: "col-span-1 row-span-1" },
  { src: "/images/Patio-Red-Block-with-Compas-rotated.webp", alt: "Red block patio with compass design", span: "col-span-1 row-span-1" },
  { src: "/images/IMG_1481-scaled.webp", alt: "Fencing installation in Pasadena", span: "col-span-1 row-span-1 hidden md:block" },
  { src: "/images/op2.webp", alt: "Outdoor patio project", span: "col-span-1 row-span-1 hidden md:block" },
];

export default function GalleryPage() {
  return (
    <>
      {/* ── Hero: image mosaic collage ── */}
      <section className="relative overflow-hidden bg-primary min-h-[480px] md:min-h-[560px] flex items-center">
        {/* Mosaic grid of real project photos */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-1">
          {HERO_MOSAIC.map((img) => (
            <div key={img.src} className={`relative overflow-hidden ${img.span}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
            </div>
          ))}
        </div>

        {/* Readable gradient — images stay bright underneath */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/40 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20 md:py-24">
          <p className="inline-block text-brand font-semibold text-sm tracking-widest uppercase mb-4">
            Project Gallery
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Our Work Speaks for&nbsp;Itself
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Browse real projects completed for homeowners across{" "}
            {SITE.address.region}. Every photo is our work — no stock images,
            no&nbsp;filters.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* ── Gallery grid with filters ── */}
      <Section>
        <div className="text-center mb-10">
          <p className="text-brand font-semibold text-sm tracking-widest uppercase mb-3">
            {GALLERY_ITEMS.length}+ Completed Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Browse by Service
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Filter by project type to find exactly what you&apos;re looking
            for. Click any image for a closer look.
          </p>
        </div>
        <GalleryGrid items={[...GALLERY_ITEMS]} showFilters />
      </Section>

      {/* ── CTA with visible background ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/IMG_0085-scaled-e1763134059488.jpeg"
          alt="Completed deck installation project"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/55 to-primary/75" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Like What You See?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Every project in this gallery started with a free estimate. Yours
            can be next — let&apos;s talk about bringing your backyard
            vision&nbsp;to&nbsp;life.
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
