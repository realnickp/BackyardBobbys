import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/PublicShell";
import { AnalyticsProvider } from "@/components/layout/AnalyticsProvider";
import { LocalBusinessSchema } from "@/components/shared/SchemaOrg";
import { SITE } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Outdoor Construction in ${SITE.address.region}, MD`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} provides gravel pads, decks, driveways, fencing, hardscaping, and excavation in ${SITE.address.region}, Maryland. Licensed contractor ${SITE.license}. Free estimates — call ${SITE.phone}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} | Outdoor Construction in ${SITE.address.region}, MD`,
    description: `Licensed outdoor construction in ${SITE.address.region}, MD — stamped concrete, decks, hardscaping, driveways, fencing & more. Free estimates. Call ${SITE.phone}.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Licensed Outdoor Construction in Anne Arundel County, MD`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Outdoor Construction in ${SITE.address.region}, MD`,
    description: `Licensed outdoor construction in ${SITE.address.region}, MD — stamped concrete, decks, hardscaping, driveways, fencing & more. Free estimates.`,
    images: ["/og-image.png"],
  },
  verification: {
    google: "aAZH_ObTUNtjBsHGb4Dpe9iQm8qBYNBR1XtI5CsbhbU",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "outdoor construction Anne Arundel County",
    "gravel pad installation Maryland",
    "shed foundation Maryland",
    "deck contractor Annapolis MD",
    "driveway installation Maryland",
    "fencing contractor Anne Arundel County",
    "excavation contractor Maryland",
    "hardscaping Anne Arundel County",
    "site preparation Maryland",
    SITE.license,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        <AnalyticsProvider>
          <LocalBusinessSchema />
          <PublicShell>{children}</PublicShell>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
