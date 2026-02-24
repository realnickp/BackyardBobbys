"use client";

import { useState, useEffect } from "react";
import { Zap, Play, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { Automation } from "@/lib/dashboard-types";

const TRIGGER_LABELS: Record<string, string> = {
  lead_created: "When a new lead is created",
  no_response: "24 hours with no contact",
  quote_followup: "48 hours after quote sent",
  appointment_reminder: "24 hours before appointment",
  job_completed: "3 days after job completed",
  cold_lead: "30 days of no activity",
};

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    // Load automations from API (seeded in migration)
    fetch("/api/leads?limit=1") // Just to confirm API is up
      .then(() => {
        // Use the seeded defaults from migration
        setAutomations([
          { id: "1", name: "Instant Welcome", description: "Send SMS + email the moment a lead submits the form", trigger_type: "lead_created", delay_hours: 0, actions: [{ type: "sms", template: "welcome_sms" }, { type: "email", template: "welcome_email" }], active: true, total_runs: 0, created_at: new Date().toISOString() },
          { id: "2", name: "No Response Follow-up", description: "Follow up if lead hasn't been contacted after 24 hours", trigger_type: "no_response", delay_hours: 24, actions: [{ type: "sms", template: "no_response_sms" }, { type: "score_adjust", points: -5 }], active: true, total_runs: 0, created_at: new Date().toISOString() },
          { id: "3", name: "Quote Follow-up", description: "Check in 48 hours after a quote is sent with no response", trigger_type: "quote_followup", delay_hours: 48, actions: [{ type: "email", template: "quote_followup_email" }, { type: "sms", template: "quote_followup_sms" }], active: true, total_runs: 0, created_at: new Date().toISOString() },
          { id: "4", name: "Appointment Reminder", description: "Remind the customer 24 hours before their scheduled visit", trigger_type: "appointment_reminder", delay_hours: 24, actions: [{ type: "sms", template: "appointment_reminder_sms" }, { type: "email", template: "appointment_reminder_email" }], active: true, total_runs: 0, created_at: new Date().toISOString() },
          { id: "5", name: "Post-Job Review Request", description: "Ask for a Google review 3 days after job is marked complete", trigger_type: "job_completed", delay_hours: 72, actions: [{ type: "sms", template: "review_request_sms" }, { type: "email", template: "review_request_email" }], active: true, total_runs: 0, created_at: new Date().toISOString() },
          { id: "6", name: "Re-engage Cold Leads", description: "Reach out to leads with no activity for 30 days", trigger_type: "cold_lead", delay_hours: 720, actions: [{ type: "email", template: "re_engage_email" }, { type: "status_update", new_status: "re_engaged" }], active: true, total_runs: 0, created_at: new Date().toISOString() },
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function runAutomations() {
    setRunning(true);
    setRunResult(null);
    try {
      const res = await fetch("/api/automations/run", { method: "POST" });
      const data = await res.json();
      if (data.processed) setRunResult(data.processed);
    } catch {
      // ignore
    } finally {
      setRunning(false);
    }
  }

  function toggleAutomation(id: string) {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4 md:space-y-6">
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Automations</h1>
          <p className="text-sm text-gray-500 mt-0.5">6 workflows running automatically.</p>
        </div>
        <button
          onClick={runAutomations}
          disabled={running}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60 min-h-[48px]"
        >
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {running ? "Running..." : "Run Now"}
        </button>
      </div>

      {/* Run result */}
      {runResult && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Run Complete</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(runResult).map(([key, val]) => (
              <div key={key} className="text-center">
                <p className="text-xl font-bold text-green-700">{val as number}</p>
                <p className="text-xs text-green-600 leading-tight">{key.replace(/_/g, " ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup requirements */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h3 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">⚡ Setup Required</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-amber-700">
          <div>
            <p className="font-semibold mb-1">Twilio (SMS)</p>
            <div className="space-y-1">
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">TWILIO_ACCOUNT_SID</code>
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">TWILIO_AUTH_TOKEN</code>
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">TWILIO_PHONE_NUMBER</code>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Resend (Email)</p>
            <div className="space-y-1">
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">RESEND_API_KEY</code>
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">EMAIL_FROM</code>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Notifications</p>
            <div className="space-y-1">
              <code className="text-xs bg-amber-100 px-1.5 py-0.5 rounded block break-all">ADMIN_PHONE</code>
              <p className="text-xs mt-1">Bobby&apos;s number for alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automation cards */}
      <div className="space-y-3 md:space-y-4">
        {automations.map(automation => (
          <div key={automation.id} className={`bg-white rounded-xl border shadow-sm p-4 md:p-5 ${automation.active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${automation.active ? "bg-orange-100" : "bg-gray-100"}`}>
                <Zap className={`h-5 w-5 ${automation.active ? "text-orange-600" : "text-gray-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{automation.name}</h3>
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[36px] sm:min-h-0 ${
                      automation.active
                        ? "bg-green-100 text-green-700 hover:bg-green-200 active:bg-green-300"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 active:bg-gray-300"
                    }`}
                  >
                    {automation.active ? (
                      <><CheckCircle className="h-3.5 w-3.5" /> Active</>
                    ) : (
                      <><XCircle className="h-3.5 w-3.5" /> Off</>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{automation.description}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium leading-tight">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">{TRIGGER_LABELS[automation.trigger_type] || automation.trigger_type}</span>
                  </span>
                  {automation.actions.map((action, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg capitalize">
                      {action.type === "sms" ? "📱" : action.type === "email" ? "✉️" : action.type === "score_adjust" ? "📊" : "⚙️"}
                      {action.type.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cron job info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">🕐 Automatic Scheduling</h3>
        <p className="text-sm text-gray-600 mb-3">
          Runs via Vercel Cron. Add to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">vercel.json</code>:
        </p>
        <pre className="bg-gray-900 text-green-400 text-xs p-3 md:p-4 rounded-lg overflow-x-auto -mx-1 sm:mx-0">{`{
  "crons": [{
    "path": "/api/automations/run",
    "schedule": "0 8 * * *"
  }]
}`}</pre>
        <p className="text-xs text-gray-500 mt-2">Runs daily at 8am. Set <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">CRON_SECRET</code> in Vercel for security.</p>
      </div>
    </div>
  );
}
