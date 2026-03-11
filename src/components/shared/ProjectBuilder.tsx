"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ClipboardList, ChevronDown, Clock, Shield } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { PRIMARY_SERVICES } from "@/lib/constants";

interface ProjectBuilderProps {
  serviceTitle: string;
  serviceSlug: string;
}

export function ProjectBuilder({ serviceTitle, serviceSlug }: ProjectBuilderProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Project Builder Card */}
      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-brand" />
            </div>
            <h3 className="font-bold text-lg">Project Builder</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Tell us about your {serviceTitle.toLowerCase()} project in a few guided steps. We&apos;ll prepare a personalized estimate tailored to your needs.
          </p>
          <Link
            href={`/lp/${serviceSlug}/quiz`}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Start Project Builder
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> 2 min
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" /> No obligation
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Form Option */}
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:border-border transition-all text-left"
      >
        <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Prefer a form?</p>
          <p className="text-xs text-muted-foreground">Fill out the estimate request directly</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${formOpen ? "rotate-180" : ""}`} />
      </button>

      {formOpen && (
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-5 animate-in slide-in-from-top-2 duration-200">
          <LeadForm preselectedService={serviceTitle} compact />
        </div>
      )}
    </div>
  );
}

export function HomeProjectBuilder() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Project Builder Card */}
      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-brand" />
            </div>
            <h3 className="font-bold text-lg">Project Builder</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Choose your project type and we&apos;ll guide you through a few quick questions to prepare your personalized estimate.
          </p>

          {/* Service Picker Grid */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {PRIMARY_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/lp/${service.slug}/quiz`}
                className="group relative rounded-xl overflow-hidden aspect-square border-2 border-transparent hover:border-brand transition-all"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-[10px] sm:text-xs font-semibold text-white leading-tight">{service.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> 2 min
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" /> No obligation
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Form Option */}
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-border/50 shadow-sm hover:border-border transition-all text-left"
      >
        <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Prefer a form?</p>
          <p className="text-xs text-muted-foreground">Fill out the estimate request directly</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${formOpen ? "rotate-180" : ""}`} />
      </button>

      {formOpen && (
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-5 animate-in slide-in-from-top-2 duration-200">
          <LeadForm compact />
        </div>
      )}
    </div>
  );
}
