"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Loader2, Phone } from "lucide-react";
import { LeadScoreBadge } from "@/components/dashboard/LeadScoreBadge";
import type { PipelineStage, Lead } from "@/lib/dashboard-types";
import { STATUS_LABELS } from "@/lib/dashboard-types";

const STAGE_COLORS: Record<string, string> = {
  new: "border-t-blue-500",
  contacted: "border-t-yellow-500",
  qualified: "border-t-purple-500",
  quoted: "border-t-orange-500",
  scheduled: "border-t-indigo-500",
  completed: "border-t-green-500",
  lost: "border-t-red-400",
};

export default function PipelinePage() {
  const router = useRouter();
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/pipeline")
      .then(r => r.json())
      .then(d => { setPipeline(d.pipeline || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tap a card to view details.</p>
      </div>

      {/* Pipeline summary */}
      <div className="mb-4 md:mb-5 bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Summary</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
          {pipeline.map(stage => (
            <div key={stage.status} className="text-center p-2 rounded-lg bg-gray-50 sm:bg-transparent sm:p-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stage.count}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{STATUS_LABELS[stage.status]}</p>
              {stage.total_value > 0 && (
                <p className="text-[10px] sm:text-xs text-green-600 font-semibold">${stage.total_value.toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Kanban columns — horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
        {pipeline.map(stage => (
          <div key={stage.status} className="flex-shrink-0 w-[80vw] sm:w-64 md:w-72 snap-start">
            {/* Column header */}
            <div className={`bg-white rounded-t-xl border border-b-0 border-gray-200 border-t-4 ${STAGE_COLORS[stage.status] || "border-t-gray-400"} px-4 pt-3 pb-2.5`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">{STATUS_LABELS[stage.status]}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{stage.count}</span>
              </div>
              {stage.total_value > 0 && (
                <p className="text-xs text-green-600 mt-0.5 flex items-center gap-0.5">
                  <DollarSign className="h-3 w-3" />
                  {stage.total_value.toLocaleString()} pipeline
                </p>
              )}
            </div>

            {/* Cards */}
            <div className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-xl min-h-32 p-2 space-y-2">
              {stage.leads.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No leads</p>
              ) : stage.leads.map((lead: Lead) => (
                <div
                  key={lead.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  onKeyDown={(e) => { if (e.key === "Enter") router.push(`/dashboard/leads/${lead.id}`); }}
                  className="bg-white rounded-xl border border-gray-200 p-3.5 hover:border-orange-300 hover:shadow-sm transition-all active:bg-gray-50 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{lead.service}</p>
                  {lead.city_or_zip && <p className="text-xs text-gray-400 truncate">{lead.city_or_zip}</p>}
                  <div className="mt-2.5 flex items-center justify-between">
                    <LeadScoreBadge score={lead.score || 0} />
                    {lead.quote_amount && (
                      <span className="text-xs font-semibold text-green-600">${lead.quote_amount.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 -m-1 text-gray-400 hover:text-green-600 rounded-xl hover:bg-green-50 active:bg-green-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
