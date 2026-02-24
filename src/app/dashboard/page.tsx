import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RefreshCw, ChevronRight } from "lucide-react";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { LeadScoreBadge } from "@/components/dashboard/LeadScoreBadge";
import { SourceChart } from "@/components/dashboard/SourceChart";
import type { DashboardStats, Lead } from "@/lib/dashboard-types";

export const metadata: Metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

async function getDashboardData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const [statsRes, leadsRes] = await Promise.all([
      fetch(`${baseUrl}/api/dashboard/stats`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/leads?sortBy=created_at&sortDir=desc&limit=8`, { cache: "no-store" }),
    ]);
    const statsData = statsRes.ok ? await statsRes.json() : { stats: null, source_breakdown: [] };
    const leadsData = leadsRes.ok ? await leadsRes.json() : { leads: [] };
    return { stats: statsData.stats, sourceBreakdown: statsData.source_breakdown, recentLeads: leadsData.leads || [] };
  } catch {
    return { stats: null, sourceBreakdown: [], recentLeads: [] };
  }
}

export default async function DashboardPage() {
  const { stats, sourceBreakdown, recentLeads } = await getDashboardData();

  const fallbackStats: DashboardStats = {
    leads_today: 0, leads_this_week: 0, leads_this_month: 0,
    hot_leads: 0, warm_leads: 0, avg_score: 0, conversion_rate: 0,
    appointments_this_week: 0, revenue_pipeline: 0, total_leads: 0,
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Overview</h1>
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors min-h-[44px]"
          >
            All Leads <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-gray-500 truncate">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <form action="/api/automations/run" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm min-h-[40px]"
            >
              <RefreshCw className="h-3.5 w-3.5 text-gray-500" />
              <span className="hidden sm:inline">Run</span> Automations
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats || fallbackStats} />

      {/* Recent Leads + Source Chart */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Recent Leads</h2>
            <Link href="/dashboard/leads" className="text-xs text-orange-600 hover:underline font-medium">
              View all →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-sm">No leads yet.</p>
              <p className="text-xs mt-1">They&apos;ll appear here when the form is submitted.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentLeads.map((lead: Lead) => (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors active:bg-gray-100 min-h-[60px]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 truncate">{lead.service}{lead.city_or_zip ? ` · ${lead.city_or_zip}` : ""}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <LeadScoreBadge score={lead.score || 0} />
                  </div>
                  <StatusBadge status={lead.status} />
                  <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Source Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Lead Sources</h2>
          <SourceChart data={sourceBreakdown} />
          {stats && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-gray-900">{stats.conversion_rate}%</p>
                <p className="text-xs text-gray-500">Conversion Rate</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{stats.total_leads}</p>
                <p className="text-xs text-gray-500">Total Leads</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: "Pipeline", href: "/dashboard/pipeline", desc: "Kanban board" },
          { label: "Add Note", href: "/dashboard/leads", desc: "On any lead" },
          { label: "Automations", href: "/dashboard/automations", desc: "Workflows" },
          { label: "View Site", href: "/", desc: "Public website" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:border-orange-300 hover:shadow-sm transition-all text-center active:bg-gray-50 min-h-[64px] sm:min-h-[72px] flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-gray-900">{action.label}</p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
