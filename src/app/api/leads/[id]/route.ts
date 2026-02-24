import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { LeadStatus } from "@/lib/dashboard-types";

type Params = { params: Promise<{ id: string }> };

// ── GET /api/leads/:id ─────────────────────────────────────

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    const [leadResult, notesResult, commsResult] = await Promise.all([
      supabase.from("leads").select("*").eq("id", id).single(),
      supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
      supabase.from("lead_communications").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
    ]);

    if (leadResult.error) {
      if (leadResult.error.code === "PGRST116") {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
      throw leadResult.error;
    }

    return NextResponse.json({
      lead: leadResult.data,
      notes: notesResult.data || [],
      communications: commsResult.data || [],
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}

// ── PUT /api/leads/:id ─────────────────────────────────────

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const body = await request.json();

    // If status is changing, append to status_history
    if (body.status) {
      const { data: existing } = await supabase
        .from("leads")
        .select("status, status_history")
        .eq("id", id)
        .single();

      if (existing && existing.status !== body.status) {
        const history = existing.status_history || [];
        history.push({
          status: body.status as LeadStatus,
          timestamp: new Date().toISOString(),
          notes: body.status_note || null,
        });
        body.status_history = history;

        // Set first_contact_at when moving from new → contacted
        if (existing.status === "new" && body.status === "contacted") {
          body.first_contact_at = new Date().toISOString();
        }
        body.last_contact_at = new Date().toISOString();
      }
    }

    // Strip read-only fields
    delete body.id;
    delete body.created_at;
    delete body.status_note;

    const { data, error } = await supabase
      .from("leads")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ lead: data });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}
