import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { PIPELINE_STAGES, STATUS_LABELS } from "@/lib/dashboard-types";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("id, name, phone, service, city_or_zip, status, score, quote_amount, created_at, updated_at")
      .in("status", [...PIPELINE_STAGES, "lost"])
      .order("score", { ascending: false });

    if (error) throw error;

    const pipeline = PIPELINE_STAGES.map((status) => {
      const stageLeads = (leads || []).filter((l) => l.status === status);
      const totalValue = stageLeads.reduce((sum, l) => sum + (l.quote_amount || 0), 0);
      return {
        status,
        label: STATUS_LABELS[status],
        count: stageLeads.length,
        total_value: totalValue,
        leads: stageLeads,
      };
    });

    // Lost column
    const lostLeads = (leads || []).filter((l) => l.status === "lost");
    pipeline.push({
      status: "lost",
      label: "Lost",
      count: lostLeads.length,
      total_value: 0,
      leads: lostLeads,
    });

    return NextResponse.json({ pipeline });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}
