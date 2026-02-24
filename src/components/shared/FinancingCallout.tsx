"use client";

import Link from "next/link";
import { DollarSign, ArrowRight } from "lucide-react";
import { FinancingModal } from "./FinancingModal";

export function FinancingCallout() {
  return (
    <div className="rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/5 via-brand/[0.03] to-transparent p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
        <DollarSign className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm mb-0.5">
          Financing Available — Rates as Low as 0% APR
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Prequalify in 60 seconds with no impact to your credit score. Fixed
          monthly payments from $500–$25,000.
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
        <FinancingModal>
          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-br from-brand to-brand-dark text-white text-xs font-semibold rounded-xl hover:shadow-lg transition-all cursor-pointer whitespace-nowrap">
            Check Your Rate
          </span>
        </FinancingModal>
        <Link
          href="/financing"
          className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-border/40 text-xs font-semibold rounded-xl hover:border-brand/40 hover:text-brand transition-all whitespace-nowrap"
        >
          Learn More <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
