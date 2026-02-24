"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Phone, MessageSquare, CheckCircle, Clock, Star } from "lucide-react";
import { PRIMARY_SERVICES, SITE } from "@/lib/constants";

const NEXT_STEPS = [
  {
    emoji: "📋",
    title: "Bobby reviews your details",
    desc: "He'll look over exactly what you told us and come prepared with real answers.",
  },
  {
    emoji: "📞",
    title: "Bobby or his team calls you",
    desc: "Most customers hear back within one business day — often much sooner.",
  },
  {
    emoji: "🏡",
    title: "Free on-site estimate",
    desc: "Bobby visits your property, walks the project with you, and gives you a written quote. No pressure.",
  },
];

function ThanksContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const service = params.service as string;
  const firstName = searchParams.get("name") || "there";

  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

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

      {/* Progress bar — full + complete */}
      <div className="w-full h-2 bg-brand shrink-0" />

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand/10">
              <CheckCircle className="h-14 w-14 text-brand" />
              <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-lg">
                ✓
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            You&apos;re all set, {firstName}!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Bobby personally received your{" "}
            <span className="font-semibold text-foreground">{svc?.title ?? service}</span> request.
          </p>
          <p className="text-muted-foreground mb-8">
            He built his reputation one project at a time — and yours is next on his list.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-brand text-brand" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">5.0 · 500+ Maryland homeowners served</span>
          </div>

          {/* What happens next */}
          <div className="bg-warm-bg rounded-2xl border border-border/30 p-6 mb-8 text-left">
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
              What happens next
            </p>
            <div className="space-y-5">
              {NEXT_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-border/40 text-xl shadow-xs">
                    {step.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response time badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand text-sm font-semibold px-4 py-2 mb-8">
            <Clock className="h-4 w-4" />
            We respond within one business day
          </div>

          {/* Call / text CTAs */}
          <p className="text-sm text-muted-foreground mb-3">Want to reach Bobby right now?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href={SITE.phoneTel}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Bobby
            </a>
            <a
              href={SITE.phoneSms}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Text Bobby
            </a>
          </div>

          {/* Redirect countdown */}
          <p className="text-sm text-muted-foreground">
            Returning to our website in{" "}
            <span className="font-bold text-foreground tabular-nums">{countdown}</span>
            {countdown !== 1 ? " seconds" : " second"} ·{" "}
            <button
              onClick={() => router.push("/")}
              className="text-brand hover:underline font-medium"
            >
              Go now →
            </button>
          </p>
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

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
