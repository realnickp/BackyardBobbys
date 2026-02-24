import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [
      todayResult,
      weekResult,
      monthResult,
      allLeadsResult,
      hotLeadsResult,
      warmLeadsResult,
      pipelineValueResult,
      appointmentsResult,
      sourceResult,
    ] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
      supabase.from("leads").select("id, score, status", { count: "exact" }),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("score", 80),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("score", 60).lt("score", 80),
      supabase.from("leads").select("quote_amount").not("quote_amount", "is", null).in("status", ["quoted", "scheduled"]),
      supabase.from("leads").select("id", { count: "exact", head: true }).eq("appointment_scheduled", true).gte("appointment_date", weekStart),
      supabase.from("leads").select("source"),
    ]);

    const allLeads = allLeadsResult.data || [];
    const totalLeads = allLeadsResult.count || 0;
    const avgScore = totalLeads > 0
      ? Math.round(allLeads.reduce((sum, l) => sum + (l.score || 0), 0) / totalLeads)
      : 0;

    const quotedCount = allLeads.filter((l) => ["quoted", "scheduled", "completed"].includes(l.status)).length;
    const conversionRate = totalLeads > 0 ? Math.round((quotedCount / totalLeads) * 100) : 0;

    const pipelineValue = (pipelineValueResult.data || []).reduce(
      (sum: number, l: { quote_amount: number | null }) => sum + (l.quote_amount || 0), 0
    );

    // Source breakdown
    const sourceMap: Record<string, number> = {};
    for (const lead of sourceResult.data || []) {
      const src = lead.source || "website";
      sourceMap[src] = (sourceMap[src] || 0) + 1;
    }
    const sourceBreakdown = Object.entries(sourceMap)
      .map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count / Math.max(totalLeads, 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      stats: {
        leads_today: todayResult.count || 0,
        leads_this_week: weekResult.count || 0,
        leads_this_month: monthResult.count || 0,
        total_leads: totalLeads,
        hot_leads: hotLeadsResult.count || 0,
        warm_leads: warmLeadsResult.count || 0,
        avg_score: avgScore,
        conversion_rate: conversionRate,
        appointments_this_week: appointmentsResult.count || 0,
        revenue_pipeline: pipelineValue,
      },
      source_breakdown: sourceBreakdown,
    });
  } catch (err) {
    console.error("GET /api/dashboard/stats error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
