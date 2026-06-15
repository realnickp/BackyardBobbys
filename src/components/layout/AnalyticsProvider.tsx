"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";
import { trackConversion } from "@/lib/google-ads";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();
  }, []);

  // Count every tap on a phone number as a Google Ads call conversion,
  // wherever the tel: link lives. Delegated so new phone links are covered too.
  useEffect(() => {
    function handlePhoneClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (link) trackConversion("phone_call");
    }
    document.addEventListener("click", handlePhoneClick, true);
    return () => document.removeEventListener("click", handlePhoneClick, true);
  }, []);

  return <>{children}</>;
}
