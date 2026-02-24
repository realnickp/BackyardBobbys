import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Chatbot } from "@/components/shared/Chatbot";
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
          <Header />
          <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
          <Footer />
          <StickyMobileCTA />
          <Chatbot />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
