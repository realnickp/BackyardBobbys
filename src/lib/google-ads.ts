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

  const label = ADS_CONVERSION_LABELS[conversion];
  if (!label) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...params,
  });
}
