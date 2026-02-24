import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAuth } from "@/lib/auth";
import type { LeadStatus } from "@/lib/dashboard-types";

type Params = { params: Promise<{ id: string }> };

// Fields the dashboard is permitted to update on a lead
const UPDATABLE_FIELDS = new Set([
  "status",
  "name",
  "email",
  "phone",
  "service",
  "city_or_zip",
  "description",
  "timeframe",
  "budget",
  "preferred_style",
  "source",
  "assigned_to",
  "appointment_scheduled",
  "appointment_date",
  "quote_amount",
  "quote_sent_at",
  "job_completed",
  "job_completion_date",
  "review_requested",
  "score",
]);

// ── GET /api/leads/:id ─────────────────────────────────────

export async function GET(request: NextRequest, { params }: Params) {
  const authError = requireAuth(request);
  if (authError) return authError;

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
    console.error("GET /api/leads/:id error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── PUT /api/leads/:id ─────────────────────────────────────

export async function PUT(request: NextRequest, { params }: Params) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const body = await request.json();

    // Build a safe update object using an explicit allowlist
    const safeUpdate: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in body) {
        safeUpdate[field] = body[field];
      }
    }

    // If status is changing, append to status_history (server-controlled fields)
    if (safeUpdate.status) {
      const { data: existing } = await supabase
        .from("leads")
        .select("status, status_history")
        .eq("id", id)
        .single();

      if (existing && existing.status !== safeUpdate.status) {
        const history = existing.status_history || [];
        history.push({
          status: safeUpdate.status as LeadStatus,
          timestamp: new Date().toISOString(),
          notes: typeof body.status_note === "string" ? body.status_note : null,
        });
        safeUpdate.status_history = history;

        // Set first_contact_at when moving from new → contacted
        if (existing.status === "new" && safeUpdate.status === "contacted") {
          safeUpdate.first_contact_at = new Date().toISOString();
        }
        safeUpdate.last_contact_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ ...safeUpdate, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ lead: data });
  } catch (err) {
    console.error("PUT /api/leads/:id error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
