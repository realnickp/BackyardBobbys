// ============================================================
// AUTOMATION ENGINE — Backyard Bobby's Lead Management
// ============================================================
// Plug in your Twilio + SendGrid/Resend keys in .env.local
// to activate SMS and email delivery.
// ============================================================

import { SITE } from "@/lib/constants";

export interface AutomationContext {
  leadId: string;
  leadName: string;
  leadPhone?: string;
  leadEmail?: string;
  leadService?: string;
  appointmentDate?: string;
  quoteAmount?: number;
}

// ── SMS Templates ─────────────────────────────────────────

export const SMS_TEMPLATES: Record<string, (ctx: AutomationContext) => string> = {
  welcome_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}! Thanks for reaching out to Backyard Bobby's. We'll call you within one business day about your ${ctx.leadService || "project"}. Questions? Call ${SITE.phone}. Reply STOP to opt out.`,

  no_response_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, we tried reaching you about your ${ctx.leadService || "project"} request. Still interested? Reply YES or call ${SITE.phone}. — Backyard Bobby's`,

  quote_followup_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, just checking in on the estimate we sent you. Any questions? We're happy to walk through it. Call ${SITE.phone}. — Backyard Bobby's`,

  appointment_reminder_sms: (ctx) =>
    `Reminder: Your site visit with Backyard Bobby's is tomorrow${ctx.appointmentDate ? " at " + new Date(ctx.appointmentDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}. Reply CONFIRM or call ${SITE.phone} to reschedule.`,

  review_request_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, hope you're loving your new ${ctx.leadService || "project"}! Could you leave us a quick Google review? It means the world: https://g.page/r/backyardbobbys/review — Bobby`,

  re_engage_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, still thinking about your ${ctx.leadService || "outdoor project"}? We're running a special this month. Call ${SITE.phone} for details. — Backyard Bobby's`,
};

// ── Email Templates ───────────────────────────────────────

export const EMAIL_TEMPLATES: Record<
  string,
  (ctx: AutomationContext) => { subject: string; html: string }
> = {
  welcome_email: (ctx) => ({
    subject: `Thanks for reaching out, ${ctx.leadName.split(" ")[0]}! — Backyard Bobby's`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We Got Your Request!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>Thanks for reaching out to Backyard Bobby's about your <strong>${ctx.leadService || "project"}</strong>. We've received your request and will be in touch within <strong>one business day</strong>.</p>
        <h3>What Happens Next:</h3>
        <ol>
          <li>We'll call you to discuss your project in more detail.</li>
          <li>We'll schedule a free on-site visit.</li>
          <li>You'll receive a clear, written estimate — no surprises.</li>
        </ol>
        <p>In the meantime, if you have any questions, give us a call: <a href="tel:+1${SITE.phone.replace(/\D/g, "")}">${SITE.phone}</a></p>
        <p>— Bobby & the Backyard Bobby's team</p>
        <hr>
        <p style="color: #666; font-size: 12px;">${SITE.license} · Licensed & Insured · Anne Arundel County, MD</p>
      </div>
    `,
  }),

  quote_followup_email: (ctx) => ({
    subject: `Questions about your estimate? — Backyard Bobby's`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Following Up on Your Estimate</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>We sent you an estimate for your <strong>${ctx.leadService || "project"}</strong> a couple days ago and wanted to check in.</p>
        <p>Do you have any questions? We're happy to walk through every line item and make sure it makes sense for your budget and goals.</p>
        <p><a href="tel:+1${SITE.phone.replace(/\D/g, "")}" style="background: #E8742A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Call Us: ${SITE.phone}</a></p>
        <p>— Backyard Bobby's</p>
      </div>
    `,
  }),

  appointment_reminder_email: (ctx) => ({
    subject: `Your site visit is tomorrow — Backyard Bobby's`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>See You Tomorrow!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>Just a reminder that your site visit with Backyard Bobby's is scheduled for <strong>tomorrow${ctx.appointmentDate ? " at " + new Date(ctx.appointmentDate).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", weekday: "long" }) : ""}</strong>.</p>
        <h3>To Prepare:</h3>
        <ul>
          <li>Note any access limitations (gates, dogs, tight spots)</li>
          <li>Think about where you'd like the project situated</li>
          <li>Have any questions ready — we love to talk through ideas</li>
        </ul>
        <p>Need to reschedule? Call us: <a href="tel:+1${SITE.phone.replace(/\D/g, "")}">${SITE.phone}</a></p>
        <p>— Bobby & the crew</p>
      </div>
    `,
  }),

  review_request_email: (ctx) => ({
    subject: `How did we do? — Backyard Bobby's`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We Hope You Love It!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>It was a pleasure working on your <strong>${ctx.leadService || "project"}</strong>. We hope you're thrilled with the result!</p>
        <p>If you have a moment, we'd really appreciate a Google review. It helps other homeowners find us and it genuinely means a lot to our small team.</p>
        <p><a href="https://g.page/r/backyardbobbys/review" style="background: #E8742A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Leave a Google Review ⭐</a></p>
        <p>Thank you for choosing Backyard Bobby's.</p>
        <p>— Bobby</p>
      </div>
    `,
  }),

  re_engage_email: (ctx) => ({
    subject: `Still thinking about your ${ctx.leadService || "project"}? — Backyard Bobby's`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We're Still Here!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>A while back you reached out about <strong>${ctx.leadService || "an outdoor project"}</strong>. We wanted to check in — are you still planning to move forward?</p>
        <p>Projects book up fast in the spring and summer. If you're ready to get on the schedule, we'd love to get you locked in.</p>
        <p><a href="${SITE.url}/quote" style="background: #E8742A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Request a Fresh Estimate</a></p>
        <p>Or call us directly: ${SITE.phone}</p>
        <p>— Backyard Bobby's</p>
      </div>
    `,
  }),
};

// ── SMS Sender (Twilio) ───────────────────────────────────

export async function sendSMS(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[SMS] Twilio not configured. Would have sent to:", to, "→", body.slice(0, 50) + "...");
    return { success: false, error: "Twilio not configured" };
  }

  try {
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, From: fromNumber, Body: body }).toString(),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Twilio error");
    return { success: true, sid: data.sid };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[SMS] Failed:", error);
    return { success: false, error };
  }
}

// ── Email Sender (Resend) ─────────────────────────────────

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || `info@${SITE.domain}`;

  if (!apiKey) {
    console.warn("[EMAIL] Resend not configured. Would have sent to:", to, "Subject:", subject);
    return { success: false, error: "Resend not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: `Backyard Bobby's <${fromEmail}>`, to, subject, html }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || JSON.stringify(data));
    return { success: true, id: data.id };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL] Failed:", error);
    return { success: false, error };
  }
}

// ── Admin Notification Recipients ────────────────────────
const ADMIN_EMAILS = [
  "realnickpatrick@gmail.com",
  "Robert@backyardbobbys.com",
];

// ── Admin Lead Notification ──────────────────────────────
export async function notifyAdminsNewLead(ctx: AutomationContext & {
  cityOrZip?: string;
  description?: string;
  source?: string;
  score?: number;
  priority?: string;
  budget?: string;
  timeframe?: string;
  preferredStyle?: string;
}): Promise<void> {
  const scoreLabel = ctx.priority === "hot" ? "🔥 HOT LEAD" : ctx.priority === "warm" ? "⚡ WARM LEAD" : "📋 New Lead";
  const subject = `${scoreLabel}: ${ctx.leadName} — ${ctx.leadService || "General Inquiry"}`;

  const rows = [
    ["Name", ctx.leadName],
    ["Phone", ctx.leadPhone ? `<a href="tel:${ctx.leadPhone}">${ctx.leadPhone}</a>` : "Not provided"],
    ["Email", ctx.leadEmail || "Not provided"],
    ["Service", ctx.leadService || "Not specified"],
    ["Location", ctx.cityOrZip || "Not specified"],
    ["Timeframe", ctx.timeframe || "Not specified"],
    ["Budget", ctx.budget || "Not specified"],
    ["Source", ctx.source || "Website"],
    ["Score", ctx.score !== undefined ? `${ctx.score} pts (${ctx.priority})` : "N/A"],
    ctx.preferredStyle ? ["Preferred Style", ctx.preferredStyle] : null,
  ].filter(Boolean) as [string, string][];

  const html = `
    <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #1a1a2e; color: white; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">${scoreLabel}</h1>
        <p style="margin: 4px 0 0; opacity: 0.8; font-size: 14px;">${ctx.leadService || "General"} · ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })}</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows.map(([label, value]) => `
            <tr>
              <td style="padding: 8px 12px 8px 0; font-size: 13px; color: #666; white-space: nowrap; vertical-align: top;">${label}</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #222;">${value}</td>
            </tr>
          `).join("")}
        </table>
        ${ctx.description ? `
          <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e5e5;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</p>
            <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.6;">${ctx.description.replace(/\|/g, "<br>")}</p>
          </div>
        ` : ""}
        <div style="margin-top: 20px; text-align: center;">
          <a href="${SITE.url}/dashboard/leads/${ctx.leadId}" style="background: #E8742A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 14px;">View Lead in Dashboard →</a>
        </div>
      </div>
      <div style="padding: 12px 24px; text-align: center; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="margin: 0; font-size: 11px; color: #999;">Backyard Bobby's Lead Command Center · ${SITE.url}/dashboard</p>
      </div>
    </div>
  `;

  await sendEmail(ADMIN_EMAILS, subject, html);
}
