"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, Loader2 } from "lucide-react";
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-sm text-gray-500 mt-0.5">Drag cards to update statuses via the lead detail page.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipeline.map(stage => (
          <div key={stage.status} className="flex-shrink-0 w-64">
            {/* Column header */}
            <div className={`bg-white rounded-t-xl border border-b-0 border-gray-200 border-t-4 ${STAGE_COLORS[stage.status] || "border-t-gray-400"} px-4 pt-4 pb-3`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">{STATUS_LABELS[stage.status]}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{stage.count}</span>
              </div>
              {stage.total_value > 0 && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-0.5">
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
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="block bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{lead.service}</p>
                  <p className="text-xs text-gray-400 truncate">{lead.city_or_zip}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <LeadScoreBadge score={lead.score || 0} />
                    {lead.quote_amount && (
                      <span className="text-xs font-semibold text-green-600">${lead.quote_amount.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline value summary */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Pipeline Summary</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {pipeline.map(stage => (
            <div key={stage.status} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{STATUS_LABELS[stage.status]}</p>
              {stage.total_value > 0 && (
                <p className="text-xs text-green-600 font-semibold">${stage.total_value.toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
