import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendSMS, sendEmail, SMS_TEMPLATES, EMAIL_TEMPLATES } from "@/lib/automations";

// ── GET /api/leads — list with filters (dashboard only) ───

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortDir = searchParams.get("sortDir") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50");
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
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}

// ── PATCH /api/leads — bulk status update ─────────────────

export async function PATCH(request: NextRequest) {
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
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}

// ── DELETE /api/leads — bulk delete ───────────────────────

export async function DELETE(request: NextRequest) {
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
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}

// ── POST /api/leads — create lead from website form ───────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name, email, phone, service,
      cityOrZip, city, // city is sent by chatbot
      description, message, // message is sent by chatbot
      timeframe, budget, preferredStyle,
      // UTM / source tracking
      utmSource, utmMedium, utmCampaign, landingPage,
      // chatbot
      chatTranscript, chatbotQualified, source: bodySource,
    } = body;

    const resolvedCity = cityOrZip || city || "";
    const resolvedDescription = description || message || "";
    const isChatbot = bodySource === "chatbot" || chatbotQualified;

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Non-chatbot form submissions require full detail
    if (!isChatbot && (!resolvedCity || !resolvedDescription || !timeframe)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Detect source
    const source = bodySource || utmSource || (landingPage?.includes("google") ? "google_ads" : "website");

    // Score the lead
    const { score, factors, priority } = calculateLeadScore({
      phone,
      email,
      city_or_zip: resolvedCity,
      service,
      description: resolvedDescription,
      timeframe,
      budget,
      source,
      utm_campaign: utmCampaign,
      chatbot_qualified: isChatbot,
    });

    const leadData = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: resolvedCity || "Not specified",
      description: resolvedDescription || `Interested in: ${service}`,
      timeframe: timeframe || "To be discussed",
      budget: budget || null,
      status: isChatbot ? "chatbot_qualified" : "new",
      source,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      landing_page: landingPage || null,
      score,
      score_factors: factors,
      chat_transcript: chatTranscript || null,
      chatbot_qualified: isChatbot || false,
      preferred_style: preferredStyle || null,
      status_history: [{ status: "new", timestamp: new Date().toISOString() }],
    };

    // Try service role first (requires migration_002 to have been run)
    let leadId: string | null = null;
    try {
      const adminSupabase = getSupabaseAdmin();
      const { data, error } = await adminSupabase.from("leads").insert(leadData).select("id").single();
      if (error) throw error;
      leadId = data.id;
    } catch (adminErr) {
      console.warn("Admin insert failed (migration may not have run), falling back to base schema:", adminErr);
      // Fall back to original schema columns only (works before migration_002 runs)
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.from("leads").insert({
          name,
          email: email || "(chatbot lead — no email provided)",
          phone,
          service,
          city_or_zip: resolvedCity || "Not specified",
          description: resolvedDescription || `Chatbot lead — interested in: ${service}`,
          timeframe: timeframe || "To be discussed",
          budget: budget || null,
          status: "new",
        }).select("id").single();
        if (error) {
          console.error("Fallback insert also failed:", error);
        } else if (data) {
          leadId = data.id;
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
          `${scoreLabel} NEW LEAD (${score}pts): ${name} · ${service} · ${phone} · ${resolvedCity}`
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
