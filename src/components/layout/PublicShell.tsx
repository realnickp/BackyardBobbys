"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

const Chatbot = dynamic(
  () => import("@/components/shared/Chatbot").then((m) => ({ default: m.Chatbot })),
  { ssr: false }
);

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Chrome-less routes: the dashboard app, and the Google-Ads landing pages
  // (`/lp/*`), which are distraction-free — no site nav or footer. The `/lp`
  // layout supplies its own minimal header + single Chatbot.
  const isBare = pathname.startsWith("/dashboard") || pathname.startsWith("/lp");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <Chatbot />
    </>
  );
}
