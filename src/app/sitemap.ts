import type { MetadataRoute } from "next";
import { PRIMARY_SERVICES, CITY_DATA, SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

// No lastModified on static pages: stamping new Date() on every build tells
// Google everything changed on every deploy, which makes it distrust the
// sitemap. Only blog posts carry a real, stable date.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/areas`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/quote`, changeFrequency: "monthly" as const, priority: 0.95 },
    { url: `${baseUrl}/gallery`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/testimonials`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/financing`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = PRIMARY_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 30 city pages — the SEO goldmine
  const cityPages = CITY_DATA.map((city) => ({
    url: `${baseUrl}/areas/${city.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages];
}
