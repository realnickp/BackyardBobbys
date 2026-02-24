import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { BlogPostSchema } from "@/components/shared/SchemaOrg";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-data";
import { SITE } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  function parseTableRow(row: string): string[] {
    return row.split("|").slice(1, -1).map((cell) => cell.trim());
  }

  function isTableSeparator(line: string): boolean {
    return /^\|[\s:-]+\|/.test(line) && line.includes("---");
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (
      trimmed.startsWith("|") &&
      trimmed.endsWith("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1].trim())
    ) {
      flushList();
      const headers = parseTableRow(trimmed);
      i++;
      const rows: string[][] = [];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("|")) {
        i++;
        rows.push(parseTableRow(lines[i].trim()));
      }
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-6 rounded-xl border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-warm-bg">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-bold text-foreground border-b border-border/40" dangerouslySetInnerHTML={{ __html: h.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "bg-warm-bg/50" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-muted-foreground border-b border-border/20" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-2xl font-bold mt-8 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xl font-bold mt-6 mb-3">
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      const content = trimmed
        .replace(/^[-*] /, "")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      listItems.push(content);
    } else if (/^\d+\. /.test(trimmed)) {
      flushList();
      inList = true;
      const content = trimmed.replace(/^\d+\. /, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      listItems.push(content);
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      const html = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: html }} />
      );
    }
  }
  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.date}
        image={post.image}
      />

      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]} />

      <article>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-primary-foreground/60 hover:text-brand transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            <span>&middot;</span>
            <span>{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden mb-10 aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          <div className="prose-custom">
            {renderMarkdown(post.content)}
          </div>

          {/* Author Bio */}
          <div className="mt-10 flex items-start gap-4 p-6 rounded-2xl bg-warm-bg border border-border/30">
            <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <div>
              <p className="font-bold text-sm">Bobby</p>
              <p className="text-xs text-muted-foreground mb-2">Owner & Lead Contractor at Backyard Bobby&apos;s</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bobby is a licensed outdoor construction contractor (MHIC #05-163777) based in Millersville, Maryland.
                He and his crew have completed hundreds of projects across 19 Anne Arundel County communities — from
                gravel pads and patios to full deck builds and accessory dwelling units. When he&apos;s not on a job site,
                he writes about what Maryland homeowners should know before starting their next outdoor project.
              </p>
            </div>
          </div>

          {/* End-of-post CTA */}
          <div className="mt-12 rounded-2xl bg-warm-bg border border-border/50 p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Ready to Get Started on Your {post.relatedService} Project?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We provide free estimates for all {post.relatedService.toLowerCase()} projects in Anne
              Arundel County and surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <CTAButton href="/contact" size="lg">
                Get a Free Estimate
                <ArrowRight className="h-5 w-5" />
              </CTAButton>
              <CTAButton href={`/services/${post.relatedServiceSlug}`} variant="outline">
                Learn About {post.relatedService}
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>
      </article>
    </>
  );
}
