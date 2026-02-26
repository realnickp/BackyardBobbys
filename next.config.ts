import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking — allow framing only from same origin
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Enforce HTTPS for 2 years (only sent over HTTPS)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  // Legacy XSS filter (belt-and-suspenders)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Old site URLs (underscores) → new URLs (hyphens)
      { source: "/services/gravel_pads", destination: "/services/gravel-pads-and-concrete-foundations", permanent: true },
      { source: "/services/stamped_concrete", destination: "/services/stamped-concrete", permanent: true },
      { source: "/services/driveway_installation", destination: "/services/driveway-installation", permanent: true },
      { source: "/services/excavation_demolition", destination: "/services/excavation-and-demolition", permanent: true },
      { source: "/services/excavation_and_demolition", destination: "/services/excavation-and-demolition", permanent: true },
      { source: "/services/accessory_dwelling_units", destination: "/services/accessory-dwelling-units", permanent: true },
      { source: "/services/gravel-pads", destination: "/services/gravel-pads-and-concrete-foundations", permanent: true },

      // Common old short-form service URLs
      { source: "/gravel-pads", destination: "/services/gravel-pads-and-concrete-foundations", permanent: true },
      { source: "/gravel_pads", destination: "/services/gravel-pads-and-concrete-foundations", permanent: true },
      { source: "/stamped-concrete", destination: "/services/stamped-concrete", permanent: true },
      { source: "/stamped_concrete", destination: "/services/stamped-concrete", permanent: true },
      { source: "/decks", destination: "/services/decks", permanent: true },
      { source: "/fencing", destination: "/services/fencing", permanent: true },
      { source: "/roofing", destination: "/services/roofing", permanent: true },
      { source: "/hardscaping", destination: "/services/hardscaping", permanent: true },
      { source: "/driveway-installation", destination: "/services/driveway-installation", permanent: true },
      { source: "/driveway_installation", destination: "/services/driveway-installation", permanent: true },
      { source: "/excavation", destination: "/services/excavation-and-demolition", permanent: true },
      { source: "/demolition", destination: "/services/excavation-and-demolition", permanent: true },
      { source: "/adu", destination: "/services/accessory-dwelling-units", permanent: true },
      { source: "/adus", destination: "/services/accessory-dwelling-units", permanent: true },

      // Old contact/quote paths
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/free-estimate", destination: "/quote", permanent: true },
      { source: "/estimate", destination: "/quote", permanent: true },
      { source: "/get-a-quote", destination: "/quote", permanent: true },
      { source: "/request-a-quote", destination: "/quote", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
