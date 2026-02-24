"use client";

import { TrendingUp, Users, Flame, Calendar, DollarSign, Star } from "lucide-react";
import type { DashboardStats } from "@/lib/dashboard-types";

interface Props { stats: DashboardStats; }

export function StatsGrid({ stats }: Props) {
  const cards = [
    { label: "Leads Today", value: stats.leads_today, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Leads This Month", value: stats.leads_this_month, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Hot Leads", value: stats.hot_leads, icon: Flame, color: "text-red-600", bg: "bg-red-50", suffix: "🔥" },
    { label: "Appts This Week", value: stats.appointments_this_week, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Avg Lead Score", value: stats.avg_score, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50", suffix: "/100" },
    {
      label: "Pipeline Value",
      value: `$${stats.revenue_pipeline.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      isString: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${card.bg} mb-3`}>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {card.isString ? card.value : card.value}
            {!card.isString && card.suffix && <span className="text-sm text-gray-400 font-normal">{card.suffix}</span>}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
