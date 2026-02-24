"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Loader2 } from "lucide-react";
import { leadSchema, type LeadFormData, TIMEFRAME_OPTIONS, BUDGET_OPTIONS } from "@/lib/lead-schema";
import { ALL_SERVICES_FOR_FORM, SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface LeadFormProps {
  preselectedService?: string;
  compact?: boolean;
  preferredStyle?: string;
}

export function LeadForm({ preselectedService, compact, preferredStyle }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      service: preselectedService || "",
      preferredStyle: preferredStyle || "",
    },
  });

  async function onSubmit(data: LeadFormData) {
    try {
      setSubmitError("");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      trackEvent("lead_submitted", { service: data.service, timeframe: data.timeframe });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please call us or try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4">
        <CheckCircle className="h-16 w-16 text-brand mb-4" />
        <h3 className="text-2xl font-display mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We&apos;ve received your request and will get back to you within one business day with a
          free estimate. Keep an eye on your inbox.
        </p>
        <a
          href={SITE.phoneTel}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Need it faster? Call {SITE.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Your full name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" placeholder="(443) 555-0123" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="service">Service Needed *</Label>
          <select
            id="service"
            {...register("service")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <option value="">Select a service...</option>
            {ALL_SERVICES_FOR_FORM.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-xs text-destructive">{errors.service.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cityOrZip">City or Zip *</Label>
          <Input id="cityOrZip" placeholder="e.g. Annapolis or 21401" {...register("cityOrZip")} />
          {errors.cityOrZip && (
            <p className="text-xs text-destructive">{errors.cityOrZip.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="timeframe">Desired Timeframe *</Label>
          <select
            id="timeframe"
            {...register("timeframe")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <option value="">When do you need this?</option>
            {TIMEFRAME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.timeframe && (
            <p className="text-xs text-destructive">{errors.timeframe.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          placeholder="Tell us about your project: what you need, any special considerations, approximate size..."
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="budget">Budget Range (optional)</Label>
        <select
          id="budget"
          {...register("budget")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <option value="">Select budget range...</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {preferredStyle && (
        <input type="hidden" {...register("preferredStyle")} />
      )}

      {preferredStyle && (
        <div className="flex items-center gap-2 p-3 bg-brand/5 border border-brand/20 rounded-xl text-sm">
          <CheckCircle className="h-4 w-4 text-brand flex-shrink-0" />
          <span>
            Selected style: <strong>{preferredStyle}</strong>
          </span>
        </div>
      )}

      {submitError && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-br from-brand to-brand-dark hover:shadow-lg hover:shadow-brand/25 text-white font-semibold py-3 text-base h-auto transition-all cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get Your Free Estimate"
        )}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        No spam, no pressure. We typically respond within one business day.
      </p>
    </form>
  );
}
