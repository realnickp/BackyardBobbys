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

    // Base queries that work with the original schema
    const [todayResult, weekResult, monthResult, allLeadsResult] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
      supabase.from("leads").select("id, status", { count: "exact" }),
    ]);

    const allLeads = allLeadsResult.data || [];
    const totalLeads = allLeadsResult.count || 0;

    // Try advanced queries (require migration_002) — gracefully degrade
    let hotCount = 0;
    let warmCount = 0;
    let avgScore = 0;
    let appointmentsThisWeek = 0;
    let pipelineValue = 0;
    const sourceMap: Record<string, number> = {};

    try {
      const [hotRes, warmRes, scoreRes, apptRes, pipeRes, srcRes] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("score", 80),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("score", 60).lt("score", 80),
        supabase.from("leads").select("score"),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("appointment_scheduled", true).gte("appointment_date", weekStart),
        supabase.from("leads").select("quote_amount").not("quote_amount", "is", null).in("status", ["quoted", "scheduled"]),
        supabase.from("leads").select("source"),
      ]);

      if (!hotRes.error) hotCount = hotRes.count || 0;
      if (!warmRes.error) warmCount = warmRes.count || 0;
      if (!apptRes.error) appointmentsThisWeek = apptRes.count || 0;

      if (!scoreRes.error && scoreRes.data) {
        const scores = scoreRes.data as { score: number | null }[];
        const total = scores.reduce((sum, l) => sum + (l.score || 0), 0);
        avgScore = scores.length > 0 ? Math.round(total / scores.length) : 0;
      }

      if (!pipeRes.error && pipeRes.data) {
        pipelineValue = (pipeRes.data as { quote_amount: number | null }[]).reduce(
          (sum, l) => sum + (l.quote_amount || 0), 0
        );
      }

      if (!srcRes.error && srcRes.data) {
        for (const lead of srcRes.data as { source: string | null }[]) {
          const src = lead.source || "website";
          sourceMap[src] = (sourceMap[src] || 0) + 1;
        }
      }
    } catch {
      // Migration columns don't exist yet — use defaults above
    }

    // If source query failed, count all as "website"
    if (Object.keys(sourceMap).length === 0 && totalLeads > 0) {
      sourceMap["website"] = totalLeads;
    }

    const quotedCount = allLeads.filter((l) => ["quoted", "scheduled", "completed"].includes(l.status)).length;
    const conversionRate = totalLeads > 0 ? Math.round((quotedCount / totalLeads) * 100) : 0;

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
        hot_leads: hotCount,
        warm_leads: warmCount,
        avg_score: avgScore,
        conversion_rate: conversionRate,
        appointments_this_week: appointmentsThisWeek,
        revenue_pipeline: pipelineValue,
      },
      source_breakdown: sourceBreakdown,
    });
  } catch (err) {
    console.error("GET /api/dashboard/stats error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
