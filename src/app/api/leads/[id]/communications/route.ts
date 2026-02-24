import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
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
        subject: subject || null,
        content: content || null,
        duration_seconds: duration_seconds || null,
        outcome: outcome || null,
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
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}
