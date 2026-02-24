import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendSMS, sendEmail, SMS_TEMPLATES, EMAIL_TEMPLATES } from "@/lib/automations";
import { verifySessionToken } from "@/lib/auth";
import type { AutomationContext } from "@/lib/automations";

// ── POST /api/automations/run ─────────────────────────────
// Called by Vercel Cron (daily) — processes all pending automations.
// Also callable manually from the dashboard.

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  // Allow valid Vercel Cron Bearer token
  const cronAuthorized = cronSecret
    ? authHeader === `Bearer ${cronSecret}`
    : false;

  // Allow dashboard session cookie (for manual runs)
  const cookie = request.cookies.get("dashboard_session");
  const sessionAuthorized = dashboardPassword
    ? verifySessionToken(cookie?.value, dashboardPassword)
    : false;

  if (!cronAuthorized && !sessionAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const logs: Array<{ automation: string; lead: string; action: string; status: string }> = [];
  const now = new Date();

  async function logAction(
    automationName: string,
    leadId: string,
    actionType: string,
    status: "success" | "failed" | "skipped",
    details?: Record<string, unknown>
  ) {
    logs.push({ automation: automationName, lead: leadId, action: actionType, status });
    await supabase.from("automation_logs").insert({
      automation_name: automationName,
      lead_id: leadId,
      action_type: actionType,
      status,
      details: details || {},
    });
  }

  // ── 1. INSTANT WELCOME (for leads created in last 5 min with no comm logged) ──
  // Usually fired inline on lead creation, but this catches any that were missed.
  const { data: newLeads } = await supabase
    .from("leads")
    .select("*")
    .eq("status", "new")
    .is("first_contact_at", null)
    .gte("created_at", new Date(now.getTime() - 5 * 60 * 1000).toISOString());

  for (const lead of newLeads || []) {
    const { count } = await supabase
      .from("lead_communications")
      .select("id", { count: "exact", head: true })
      .eq("lead_id", lead.id)
      .eq("automated", true);

    if (!count || count === 0) {
      const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service };
      if (lead.phone) {
        const result = await sendSMS(lead.phone, SMS_TEMPLATES.welcome_sms(ctx));
        await logAction("Instant Welcome", lead.id, "sms", result.success ? "success" : "failed");
      }
    }
  }

  // ── 2. NO RESPONSE FOLLOW-UP (24 hours, status = new, no contact) ──────────
  const cutoff24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const { data: uncontactedLeads } = await supabase
    .from("leads")
    .select("*")
    .eq("status", "new")
    .is("first_contact_at", null)
    .lte("created_at", cutoff24h);

  for (const lead of uncontactedLeads || []) {
    const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service };
    if (lead.phone) {
      const result = await sendSMS(lead.phone, SMS_TEMPLATES.no_response_sms(ctx));
      await logAction("No Response Follow-up", lead.id, "sms", result.success ? "success" : "failed");
    }
    // Notify admin
    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      await sendSMS(adminPhone, `⚠️ No contact yet: ${lead.name} · ${lead.service} · ${lead.phone} (24h old)`);
    }
    // Deduct score
    await supabase.from("leads").update({ score: Math.max(0, (lead.score || 0) - 5) }).eq("id", lead.id);
  }

  // ── 3. QUOTE FOLLOW-UP (48 hours after quote_sent_at, no acceptance) ────────
  const cutoff48h = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
  const { data: pendingQuotes } = await supabase
    .from("leads")
    .select("*")
    .eq("status", "quoted")
    .is("quote_accepted", null)
    .lte("quote_sent_at", cutoff48h);

  for (const lead of pendingQuotes || []) {
    const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service, quoteAmount: lead.quote_amount };
    if (lead.phone) {
      const result = await sendSMS(lead.phone, SMS_TEMPLATES.quote_followup_sms(ctx));
      await logAction("Quote Follow-up", lead.id, "sms", result.success ? "success" : "failed");
    }
    if (lead.email) {
      const tmpl = EMAIL_TEMPLATES.quote_followup_email(ctx);
      const result = await sendEmail(lead.email, tmpl.subject, tmpl.html);
      await logAction("Quote Follow-up", lead.id, "email", result.success ? "success" : "failed");
    }
  }

  // ── 4. APPOINTMENT REMINDER (24 hours before appointment) ────────────────────
  const reminderStart = new Date(now.getTime() + 23 * 60 * 60 * 1000).toISOString();
  const reminderEnd = new Date(now.getTime() + 25 * 60 * 60 * 1000).toISOString();
  const { data: upcomingAppts } = await supabase
    .from("leads")
    .select("*")
    .eq("appointment_scheduled", true)
    .gte("appointment_date", reminderStart)
    .lte("appointment_date", reminderEnd);

  for (const lead of upcomingAppts || []) {
    const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service, appointmentDate: lead.appointment_date };
    if (lead.phone) {
      const result = await sendSMS(lead.phone, SMS_TEMPLATES.appointment_reminder_sms(ctx));
      await logAction("Appointment Reminder", lead.id, "sms", result.success ? "success" : "failed");
    }
    if (lead.email) {
      const tmpl = EMAIL_TEMPLATES.appointment_reminder_email(ctx);
      const result = await sendEmail(lead.email, tmpl.subject, tmpl.html);
      await logAction("Appointment Reminder", lead.id, "email", result.success ? "success" : "failed");
    }
  }

  // ── 5. POST-JOB REVIEW REQUEST (3 days after completion) ─────────────────────
  const cutoff72h = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
  const { data: completedJobs } = await supabase
    .from("leads")
    .select("*")
    .eq("job_completed", true)
    .eq("review_requested", false)
    .lte("job_completion_date", cutoff72h);

  for (const lead of completedJobs || []) {
    const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service };
    if (lead.phone) {
      const result = await sendSMS(lead.phone, SMS_TEMPLATES.review_request_sms(ctx));
      await logAction("Review Request", lead.id, "sms", result.success ? "success" : "failed");
    }
    if (lead.email) {
      const tmpl = EMAIL_TEMPLATES.review_request_email(ctx);
      const result = await sendEmail(lead.email, tmpl.subject, tmpl.html);
      await logAction("Review Request", lead.id, "email", result.success ? "success" : "failed");
    }
    await supabase.from("leads").update({ review_requested: true }).eq("id", lead.id);
  }

  // ── 6. RE-ENGAGE COLD LEADS (30 days no activity) ────────────────────────────
  const cutoff30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: coldLeads } = await supabase
    .from("leads")
    .select("*")
    .in("status", ["new", "contacted", "qualified"])
    .lte("updated_at", cutoff30d);

  for (const lead of coldLeads || []) {
    const ctx: AutomationContext = { leadId: lead.id, leadName: lead.name, leadPhone: lead.phone, leadEmail: lead.email, leadService: lead.service };
    if (lead.email) {
      const tmpl = EMAIL_TEMPLATES.re_engage_email(ctx);
      const result = await sendEmail(lead.email, tmpl.subject, tmpl.html);
      await logAction("Re-engage Cold Lead", lead.id, "email", result.success ? "success" : "failed");
    }
    await supabase.from("leads").update({ status: "re_engaged", updated_at: now.toISOString() }).eq("id", lead.id);
  }

  return NextResponse.json({
    success: true,
    processed: {
      new_welcome: newLeads?.length || 0,
      no_response_followup: uncontactedLeads?.length || 0,
      quote_followup: pendingQuotes?.length || 0,
      appointment_reminders: upcomingAppts?.length || 0,
      review_requests: completedJobs?.length || 0,
      cold_reengaged: coldLeads?.length || 0,
    },
    logs,
  });
}
