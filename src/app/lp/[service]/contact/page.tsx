"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, Phone, Shield, Star, Loader2, ArrowLeft } from "lucide-react";
import { QUIZ_DATA, extractTimeframe, extractBudget } from "@/lib/quiz-data";
import { PRIMARY_SERVICES, SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface StoredQuiz {
  answers: string[];
  currentStep: number;
}

interface StoredUtm {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  fbclid: string;
}

function detectSource(utm: StoredUtm): string {
  const src = utm.utm_source.toLowerCase();
  const med = utm.utm_medium.toLowerCase();
  if (src.includes("facebook") || src.includes("fb") || src === "ig" || utm.fbclid) return "facebook_ads";
  if (src.includes("google") || med === "cpc" || med === "ppc") return "google_ads";
  return utm.utm_source || "landing_page";
}

export default function ContactPage() {
  const params = useParams();
  const router = useRouter();
  const service = params.service as string;

  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  const questions = QUIZ_DATA[service] ?? [];

  const [answers, setAnswers] = useState<string[]>([]);
  const [utm, setUtm] = useState<StoredUtm>({ utm_source: "", utm_medium: "", utm_campaign: "", fbclid: "" });
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityOrZip, setCityOrZip] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedQuiz = sessionStorage.getItem(`bb_quiz_${service}`);
      if (savedQuiz) {
        const parsed = JSON.parse(savedQuiz) as StoredQuiz;
        setAnswers(parsed.answers ?? []);
      }
      const savedUtm = sessionStorage.getItem("bb_utm");
      if (savedUtm) {
        setUtm(JSON.parse(savedUtm) as StoredUtm);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [service]);

  const filledAnswers = answers.filter(Boolean);

  // Build description from quiz answers
  function buildDescription(): string {
    const parts = questions
      .map((q, i) => (answers[i] ? `${q.question.replace("?", "")}: ${answers[i]}` : null))
      .filter(Boolean);
    if (!parts.length) return `Interested in: ${svc?.title ?? service}`;
    return parts.join(" | ");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !cityOrZip.trim()) {
      setError("Please fill in your name, phone number, and zip code.");
      return;
    }

    setLoading(true);
    try {
      const source = detectSource(utm);
      const lastAnswer = answers[answers.length - 1] ?? "";
      const timeframe = extractTimeframe(lastAnswer);
      const budget = extractBudget(answers);

      const styleQuestion = questions.find((q) => q.question.toLowerCase().includes("pattern style"));
      const styleIdx = styleQuestion ? questions.indexOf(styleQuestion) : -1;
      const preferredStyle = styleIdx >= 0 ? answers[styleIdx] || undefined : undefined;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "",
          service: svc?.title ?? service,
          cityOrZip: cityOrZip.trim(),
          description: buildDescription(),
          timeframe,
          budget,
          preferredStyle,
          source,
          utmSource: utm.utm_source,
          utmMedium: utm.utm_medium,
          utmCampaign: utm.utm_campaign,
          landingPage: typeof window !== "undefined" ? window.location.origin + `/lp/${service}` : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Submission failed");
      }

      trackEvent("funnel_lead_submitted", { service, source, timeframe, budget });

      // Clear quiz state
      try {
        sessionStorage.removeItem(`bb_quiz_${service}`);
      } catch {
        // ignore
      }

      router.push(`/lp/${service}/thanks?name=${encodeURIComponent(name.trim().split(" ")[0])}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4 shrink-0">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <span className="text-sm font-bold">Backyard Bobby&apos;s</span>
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phone}
          </a>
        </div>
      </div>

      {/* Progress bar — full */}
      <div className="w-full h-2 bg-muted shrink-0">
        <div className="h-full bg-brand w-full" />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-xl">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand mb-3">
              Almost done!
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              You&apos;re seconds away from Bobby&apos;s free estimate
            </h1>
            <p className="text-muted-foreground">
              Bobby personally reviews every new request and responds within one business day. No pressure, no obligation — just an honest quote.
            </p>
          </div>

          {/* Quiz summary */}
          {filledAnswers.length > 0 && (
            <div className="bg-warm-bg rounded-2xl border border-border/30 p-5 mb-7">
              <p className="text-sm font-semibold text-foreground/70 mb-3">
                Here&apos;s what you told us — Bobby will be prepared:
              </p>
              <ul className="space-y-2">
                {questions.map((q, i) =>
                  answers[i] ? (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>
                        <span className="text-muted-foreground">{q.question.replace("?", "")}:</span>{" "}
                        <span className="font-semibold">{answers[i]}</span>
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          {/* Social proof strip */}
          <div className="flex items-center justify-center gap-4 mb-7 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-brand text-brand" />)}
            </div>
            <span>Trusted by 500+ Maryland homeowners</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="c-name" className="text-sm font-medium">
                  Your Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="First & last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="c-phone" className="text-sm font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  placeholder="(443) 555-0123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="c-zip" className="text-sm font-medium">
                  Zip Code <span className="text-destructive">*</span>
                </label>
                <input
                  id="c-zip"
                  type="text"
                  placeholder="21401"
                  value={cityOrZip}
                  onChange={(e) => setCityOrZip(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="c-email" className="text-sm font-medium">
                  Email{" "}
                  <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-brand to-brand-dark text-white font-bold py-4 text-base rounded-xl hover:shadow-lg hover:shadow-brand/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending to Bobby...
                </>
              ) : (
                "Send Bobby My Project Details →"
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              Your info is private. No spam — ever. Licensed {SITE.license}
            </p>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push(`/lp/${service}/quiz`)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back to questions
            </button>
          </div>
        </div>
      </div>

      {/* Bottom trust */}
      <div className="shrink-0 border-t border-border/30 py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          {SITE.name} · {SITE.license} · Anne Arundel County, MD & Surrounding Areas
        </p>
      </div>
    </div>
  );
}
