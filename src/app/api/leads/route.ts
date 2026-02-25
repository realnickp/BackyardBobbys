import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendSMS, sendEmail, SMS_TEMPLATES, EMAIL_TEMPLATES } from "@/lib/automations";
import { requireAuth } from "@/lib/auth";

// ── GET /api/leads — list with filters (dashboard only) ───

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortDir = searchParams.get("sortDir") || "desc";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("leads")
      .select("*, note_count:lead_notes(count), communication_count:lead_communications(count)", { count: "exact" })
      .order(sortBy, { ascending: sortDir === "asc" })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq("status", status);
    if (source) query = query.eq("source", source);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,service.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({ leads: data, total: count });
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── PATCH /api/leads — bulk status update ─────────────────

export async function PATCH(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { ids, updates } = body as { ids: string[]; updates: Record<string, unknown> };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    const allowed = ["status", "assigned_to", "source"];
    const safeUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const key of allowed) {
      if (key in updates) safeUpdates[key] = updates[key];
    }

    if (Object.keys(safeUpdates).length === 1) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").update(safeUpdates).in("id", ids);
    if (error) throw error;

    return NextResponse.json({ success: true, updated: ids.length });
  } catch (err) {
    console.error("PATCH /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── DELETE /api/leads — bulk delete ───────────────────────

export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const { ids } = await request.json() as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (error) throw error;

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error("DELETE /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── POST /api/leads — create lead from website form (public) ───────

// Field length limits
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_SERVICE = 100;
const MAX_CITY = 200;
const MAX_DESCRIPTION = 5000;
const MAX_TIMEFRAME = 100;
const MAX_BUDGET = 100;
const MAX_STYLE = 100;
const MAX_UTM = 500;
const MAX_TRANSCRIPT = 50000;

function truncate(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Sanitize and limit all string inputs
    const name = truncate(body.name, MAX_NAME).trim();
    const email = truncate(body.email, MAX_EMAIL).trim();
    const phone = truncate(body.phone, MAX_PHONE).trim();
    const service = truncate(body.service, MAX_SERVICE).trim();
    const cityOrZip = truncate(body.cityOrZip || body.city, MAX_CITY).trim();
    const description = truncate(body.description || body.message, MAX_DESCRIPTION).trim();
    const timeframe = truncate(body.timeframe, MAX_TIMEFRAME).trim();
    const budget = truncate(body.budget, MAX_BUDGET).trim() || null;
    const preferredStyle = truncate(body.preferredStyle, MAX_STYLE).trim() || null;
    const chatTranscript = truncate(body.chatTranscript, MAX_TRANSCRIPT) || null;
    const chatbotQualified = Boolean(body.chatbotQualified);
    const bodySource = truncate(body.source, 50).trim();

    // UTM / source tracking — accept from body but limit length
    const utmSource = truncate(body.utmSource, MAX_UTM).trim() || null;
    const utmMedium = truncate(body.utmMedium, MAX_UTM).trim() || null;
    const utmCampaign = truncate(body.utmCampaign, MAX_UTM).trim() || null;
    const landingPage = truncate(body.landingPage, MAX_UTM).trim() || null;

    const isChatbot = bodySource === "chatbot" || chatbotQualified;

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isChatbot && (!cityOrZip || !description || !timeframe)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Detect source
    const source = bodySource || utmSource || (landingPage?.includes("google") ? "google_ads" : "website");

    // Score the lead
    const { score, factors, priority } = calculateLeadScore({
      phone: phone || undefined,
      email: email || undefined,
      city_or_zip: cityOrZip || undefined,
      service: service || undefined,
      description: description || undefined,
      timeframe: timeframe || undefined,
      budget: budget ?? undefined,
      source: source || undefined,
      utm_campaign: utmCampaign ?? undefined,
      chatbot_qualified: isChatbot,
    });

    const leadData = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: cityOrZip || "Not specified",
      description: description || `Interested in: ${service}`,
      timeframe: timeframe || "To be discussed",
      budget: budget || null,
      status: isChatbot ? "chatbot_qualified" : "new",
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      landing_page: landingPage,
      score,
      score_factors: factors,
      chat_transcript: chatTranscript,
      chatbot_qualified: isChatbot || false,
      preferred_style: preferredStyle,
      status_history: [{ status: "new", timestamp: new Date().toISOString() }],
    };

    // Insert lead — try full schema first, fall back to base columns
    let leadId: string | null = null;
    const baseLead = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: cityOrZip || "Not specified",
      description: description || `Interested in: ${service}`,
      timeframe: timeframe || "To be discussed",
      budget: budget || null,
      status: "new",
    };

    try {
      const adminSupabase = getSupabaseAdmin();
      const { data, error } = await adminSupabase.from("leads").insert(leadData).select("id").single();
      if (error) throw error;
      leadId = data.id;
    } catch (adminErr) {
      console.warn("Full-schema insert failed, trying base columns with service role:", (adminErr as Error).message || adminErr);
      try {
        const adminSupabase = getSupabaseAdmin();
        const { data, error } = await adminSupabase.from("leads").insert(baseLead).select("id").single();
        if (error) throw error;
        leadId = data.id;
      } catch (baseErr) {
        console.warn("Service role base insert failed, trying anon key:", (baseErr as Error).message || baseErr);
        const supabase = getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from("leads").insert(baseLead).select("id").single();
          if (error) {
            console.error("All insert attempts failed:", error);
          } else if (data) {
            leadId = data.id;
          }
        } else {
          console.error("No Supabase client available (missing env vars)");
        }
      }
    }

    // Fire welcome automation (async — don't block the response)
    if (leadId && phone) {
      const ctx = { leadId, leadName: name, leadPhone: phone, leadEmail: email, leadService: service };
      sendSMS(phone, SMS_TEMPLATES.welcome_sms(ctx)).catch(console.error);
      if (email) {
        const tmpl = EMAIL_TEMPLATES.welcome_email(ctx);
        sendEmail(email, tmpl.subject, tmpl.html).catch(console.error);
      }
      // Notify Bobby immediately via SMS
      const adminPhone = process.env.ADMIN_PHONE;
      if (adminPhone) {
        const scoreLabel = priority === "hot" ? "🔥 HOT" : priority === "warm" ? "⚡ WARM" : "📋";
        sendSMS(
          adminPhone,
          `${scoreLabel} NEW LEAD (${score}pts): ${name} · ${service} · ${phone} · ${cityOrZip}`
        ).catch(console.error);
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      score,
      priority,
      estimatedResponse: "Within one business day",
    });
  } catch (err) {
    console.error("Lead creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
