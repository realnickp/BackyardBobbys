"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Loader2, Shield } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface LpLeadFormProps {
  service: string;
}

export function LpLeadForm({ service }: LpLeadFormProps) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityOrZip, setCityOrZip] = useState("");
  const [email, setEmail] = useState("");

  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const fbclid = searchParams.get("fbclid");

  function detectSource() {
    const src = utmSource.toLowerCase();
    const med = utmMedium.toLowerCase();
    if (src.includes("facebook") || src.includes("fb") || src === "ig" || fbclid) {
      return "facebook_ads";
    }
    if (src.includes("google") || med === "cpc" || med === "ppc") {
      return "google_ads";
    }
    return utmSource || "landing_page";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !cityOrZip.trim()) {
      setError("Please fill in your name, phone, and city/zip.");
      return;
    }

    setLoading(true);
    try {
      const source = detectSource();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "",
          service,
          cityOrZip: cityOrZip.trim(),
          description: `Ad landing page submission — interested in ${service}. Details to be gathered via follow-up.`,
          timeframe: "To be discussed",
          source,
          utmSource,
          utmMedium,
          utmCampaign,
          landingPage: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      trackEvent("lead_submitted", { service, source });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4">
        <CheckCircle className="h-16 w-16 text-brand mb-4" />
        <h3 className="text-2xl font-bold mb-2">You&apos;re All Set!</h3>
        <p className="text-muted-foreground mb-6 max-w-xs">
          Bobby&apos;s team received your request. We&apos;ll call or text you within one business day.
        </p>
        <a
          href={SITE.phoneTel}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call now: {SITE.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="lp-name">Your Name *</Label>
        <Input
          id="lp-name"
          placeholder="First & last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lp-phone">Phone Number *</Label>
        <Input
          id="lp-phone"
          type="tel"
          placeholder="(443) 555-0123"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lp-city">City or Zip Code *</Label>
        <Input
          id="lp-city"
          placeholder="e.g. Annapolis or 21401"
          value={cityOrZip}
          onChange={(e) => setCityOrZip(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lp-email">
          Email{" "}
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        <Input
          id="lp-email"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-br from-brand to-brand-dark hover:shadow-lg hover:shadow-brand/25 text-white font-bold py-4 text-base h-auto transition-all cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          "Get My Free Estimate →"
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Shield className="h-3.5 w-3.5 flex-shrink-0" />
        100% free · No obligation · Licensed {SITE.license}
      </div>
    </form>
  );
}
