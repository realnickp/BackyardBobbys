import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Tips, Guides & Outdoor Living Ideas",
  description: `Expert advice on decks, patios, fencing, driveways, and more from ${SITE.name}. Practical guides for homeowners in ${SITE.address.region}, Maryland.`,
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    images: ["/og-image.png"],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return (
    <>
      {/* ─── HERO WITH VISIBLE IMAGE ─── */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-center overflow-hidden">
        <Image
          src="/images/IMG_0178-scaled-e1763134218201.jpeg"
          alt="Outdoor living space built by Backyard Bobby's"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-brand text-sm font-semibold tracking-wide uppercase mb-4">
              Guides &amp; Expert Tips
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] text-white mb-5">
              The Backyard Bobby&apos;s Blog
            </h1>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed">
              Practical guides, honest comparisons, and expert tips for
              homeowners planning outdoor projects in Maryland.
            </p>
          </div>
        </div>
      </section>

      {/* ─── BLOG CARD GRID ─── */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/[0.05] border border-border/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground flex-1 mb-4 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/stamped-concrete-img.webp"
          alt="Stamped concrete patio by Backyard Bobby's"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Reading is great — but nothing beats a free on-site estimate from a
            licensed contractor who can look at your property and give you real
            numbers.
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
