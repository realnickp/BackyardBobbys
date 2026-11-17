// Google Ads conversion tracking.
//
// The conversion ID below is public (it ships to the browser) — it is not a secret.
// Each conversion ACTION you create in Google Ads gets its own label. To wire one up:
//
//   Google Ads → Goals → Conversions → "+ New conversion action" → Website
//     • Form fill-out          → category "Submit lead form"
//     • Project Builder finish  → category "Submit lead form" (or "Qualified lead")
//     • Phone call             → category "Contact" (clicks to call)
//
// After creating each action, open it → "Tag setup" → "Use Google tag manager" / "Install
// the tag yourself". Google shows a snippet like:
//     gtag('event', 'conversion', {'send_to': 'AW-18234485563/AbC-D_efGh1jk'});
// Copy ONLY the part after the slash ("AbC-D_efGh1jk") into the matching entry below.
//
// Until a label is filled in, that conversion is skipped silently — nothing broken is sent.

export const GOOGLE_ADS_ID = "AW-18234485563";

export const ADS_CONVERSION_LABELS = {
  // Standalone lead forms (LeadForm + LpLeadForm "get my free estimate")
  form_submit: "4v9ICI-w3b8cELvW8PZD",
  // Project Builder quiz funnel completed (reaches the /thanks page)
  project_builder: "LNtpCIfU5L8cELvW8PZD",
  // Any tap on a phone number (tel: link) anywhere on the site
  phone_call: "rkZICOrt3b8cELvW8PZD",
} as const;

export type AdsConversion = keyof typeof ADS_CONVERSION_LABELS;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Reports a Google Ads conversion. No-ops on the server, when gtag has not
 * loaded, or when the conversion's label is not configured yet.
 */
export function trackConversion(
  conversion: AdsConversion,
  params?: { value?: number; currency?: string },
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  trackGa4Lead(conversion);

  const label = ADS_CONVERSION_LABELS[conversion];
  if (!label) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...params,
  });
}

// GA4 event names for the same moments, so Analytics shows leads too.
// generate_lead is GA4's recommended lead event; mark it as a key event in
// GA4 Admin → Events. Phone taps get their own event so they stay separate.
const GA4_EVENTS: Record<AdsConversion, { name: string; lead_type: string }> = {
  form_submit: { name: "generate_lead", lead_type: "form" },
  project_builder: { name: "generate_lead", lead_type: "project_builder" },
  phone_call: { name: "phone_call_click", lead_type: "phone" },
};

/** Sends the matching GA4 event. Never throws: tracking must not affect a lead. */
function trackGa4Lead(conversion: AdsConversion) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  try {
    const { name, lead_type } = GA4_EVENTS[conversion];
    window.gtag?.("event", name, { send_to: measurementId, lead_type });
  } catch {
    // ignore: analytics only
  }
}
