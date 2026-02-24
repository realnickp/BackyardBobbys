import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const { type, direction, subject, content, duration_seconds, outcome } = body;

    if (!type) {
      return NextResponse.json({ error: "Communication type required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("lead_communications")
      .insert({
        lead_id: id,
        type,
        direction: direction || "outbound",
        subject: typeof subject === "string" ? subject.slice(0, 500) : null,
        content: typeof content === "string" ? content.slice(0, 10000) : null,
        duration_seconds: typeof duration_seconds === "number" ? duration_seconds : null,
        outcome: typeof outcome === "string" ? outcome.slice(0, 500) : null,
        automated: false,
      })
      .select()
      .single();

    if (error) throw error;

    // Update last_contact_at on the lead
    await supabase
      .from("leads")
      .update({ last_contact_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", id);

    return NextResponse.json({ communication: data });
  } catch (err) {
    console.error("POST /api/leads/:id/communications error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
