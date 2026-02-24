"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Calendar, DollarSign, MessageSquare,
  ArrowLeft, CheckCircle, Clock, Star, Send, FileText, Loader2
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { LeadScoreBadge } from "@/components/dashboard/LeadScoreBadge";
import type { Lead, LeadNote, LeadCommunication, LeadStatus } from "@/lib/dashboard-types";
import { STATUS_LABELS, PIPELINE_STAGES } from "@/lib/dashboard-types";

const ALL_STATUSES: LeadStatus[] = [...PIPELINE_STAGES, "lost", "re_engaged"];

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [comms, setComms] = useState<LeadCommunication[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newNote, setNewNote] = useState("");
  const [newCommType, setNewCommType] = useState<"call" | "email" | "sms">("call");
  const [newCommContent, setNewCommContent] = useState("");
  const [newCommOutcome, setNewCommOutcome] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  async function fetchLead() {
    try {
      const res = await fetch(`/api/leads/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setLead(data.lead);
      setNotes(data.notes || []);
      setComms(data.communications || []);
      if (data.lead?.quote_amount) setQuoteAmount(String(data.lead.quote_amount));
      if (data.lead?.appointment_date) setAppointmentDate(data.lead.appointment_date.slice(0, 16));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchLead(); }, [id]);

  async function updateStatus(status: LeadStatus) {
    if (!lead) return;
    setSaving(true);
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLead({ ...lead, status });
    setSaving(false);
  }

  async function updateField(fields: Partial<Lead>) {
    if (!lead) return;
    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (data.lead) setLead(data.lead);
    setSaving(false);
  }

  async function addNote() {
    if (!newNote.trim()) return;
    const res = await fetch(`/api/leads/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });
    const data = await res.json();
    if (data.note) setNotes([data.note, ...notes]);
    setNewNote("");
  }

  async function logCommunication() {
    if (!newCommContent.trim()) return;
    const res = await fetch(`/api/leads/${id}/communications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: newCommType, content: newCommContent, outcome: newCommOutcome }),
    });
    const data = await res.json();
    if (data.communication) setComms([data.communication, ...comms]);
    setNewCommContent("");
    setNewCommOutcome("");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-gray-500">Lead not found.</p>
        <Link href="/dashboard/leads" className="text-orange-600 text-sm hover:underline mt-2 inline-block min-h-[44px] flex items-center">← Back to leads</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Back link */}
      <Link href="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 py-1 min-h-[44px]">
        <ArrowLeft className="h-4 w-4" /> Back to leads
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{lead.name}</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <StatusBadge status={lead.status} />
            <LeadScoreBadge score={lead.score || 0} />
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Saving...</span>}
          </div>
        </div>

        {/* Contact action buttons — full width on mobile */}
        <div className="grid grid-cols-3 gap-2">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center justify-center gap-2 px-3 py-3 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-600 transition-colors min-h-[48px]">
              <Phone className="h-4 w-4" /> Call
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors min-h-[48px]">
              <Mail className="h-4 w-4" /> Email
            </a>
          )}
          {lead.phone && (
            <a href={`sms:${lead.phone}`} className="flex items-center justify-center gap-2 px-3 py-3 bg-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors min-h-[48px]">
              <MessageSquare className="h-4 w-4" /> Text
            </a>
          )}
        </div>
      </div>

      {/* Contact info card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Contact & Project Info</h2>
        <div className="space-y-2.5">
          {lead.phone && <div className="flex items-center gap-3 text-sm text-gray-700"><Phone className="h-4 w-4 text-gray-400 flex-shrink-0" /> {lead.phone}</div>}
          {lead.email && <div className="flex items-center gap-3 text-sm text-gray-700"><Mail className="h-4 w-4 text-gray-400 flex-shrink-0" /> <span className="truncate">{lead.email}</span></div>}
          {lead.city_or_zip && <div className="flex items-center gap-3 text-sm text-gray-700"><MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" /> {lead.city_or_zip}</div>}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-400">Service:</span> <span className="font-medium text-gray-700">{lead.service}</span></div>
          {lead.timeframe && <div><span className="text-gray-400">Timeframe:</span> <span className="font-medium text-gray-700">{lead.timeframe}</span></div>}
          {lead.budget && <div><span className="text-gray-400">Budget:</span> <span className="font-medium text-gray-700">{lead.budget}</span></div>}
          {lead.source && <div><span className="text-gray-400">Source:</span> <span className="font-medium text-gray-700 capitalize">{lead.source.replace(/_/g, " ")}</span></div>}
          {lead.preferred_style && <div className="col-span-2"><span className="text-gray-400">Style:</span> <span className="font-medium text-gray-700">{lead.preferred_style}</span></div>}
          {lead.utm_campaign && <div className="col-span-2"><span className="text-gray-400">Campaign:</span> <span className="font-medium text-gray-700">{lead.utm_campaign}</span></div>}
          <div><span className="text-gray-400">Created:</span> <span className="font-medium text-gray-700">{new Date(lead.created_at).toLocaleDateString()}</span></div>
        </div>
      </div>

      {/* Project description */}
      {lead.description && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Project Description</h2>
          <ul className="space-y-2">
            {lead.description
              .split(/(?<=[.!?])\s+|[\n\r]+|(?:;\s*)|(?:,\s*(?=[A-Z]))|(?:\s*[-–—•]\s*)/)
              .map(s => s.trim())
              .filter(s => s.length > 0)
              .map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Status update */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Update Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`py-3 px-2 text-xs sm:text-sm font-medium rounded-xl border transition-colors min-h-[48px] active:scale-[0.97] ${
                lead.status === s
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 active:bg-orange-50"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions row — Quote + Appointment side by side on larger, stacked on mobile */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Quote */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Quote</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={quoteAmount}
                onChange={e => setQuoteAmount(e.target.value)}
                placeholder="Amount"
                className="w-full pl-8 pr-3 py-3 text-base sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[48px]"
              />
            </div>
            <button
              onClick={() => updateField({ quote_amount: parseFloat(quoteAmount) || undefined, quote_sent_at: new Date().toISOString(), status: "quoted" })}
              className="px-4 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 flex items-center gap-1.5 min-h-[48px]"
            >
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
          {lead.quote_amount && (
            <p className="text-xs text-gray-500 mt-2">Last quote: ${lead.quote_amount.toLocaleString()}</p>
          )}
        </div>

        {/* Appointment */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Appointment</h2>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={e => setAppointmentDate(e.target.value)}
            className="w-full py-3 px-3 text-base sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2 min-h-[48px]"
          />
          <button
            onClick={() => updateField({ appointment_scheduled: true, appointment_date: appointmentDate, status: "scheduled" })}
            className="w-full py-3 bg-indigo-500 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 flex items-center justify-center gap-1.5 min-h-[48px]"
          >
            <Calendar className="h-4 w-4" /> Schedule
          </button>
        </div>
      </div>

      {/* Job status */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Job Status</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => updateField({ job_completed: true, job_completion_date: new Date().toISOString(), status: "completed" })}
            disabled={lead.job_completed}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors min-h-[48px] ${
              lead.job_completed ? "bg-green-100 text-green-700 cursor-default" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            {lead.job_completed ? "Job Completed ✓" : "Mark Job Complete"}
          </button>
          {lead.job_completed && !lead.review_requested && (
            <button
              onClick={() => updateField({ review_requested: true })}
              className="flex-1 py-3 bg-yellow-500 text-white text-sm font-semibold rounded-xl hover:bg-yellow-600 flex items-center justify-center gap-1.5 min-h-[48px]"
            >
              <Star className="h-4 w-4" /> Request Review
            </button>
          )}
        </div>
      </div>

      {/* Log communication */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Log Contact</h2>
        <div className="flex gap-2 mb-3">
          {(["call", "email", "sms"] as const).map(t => (
            <button
              key={t}
              onClick={() => setNewCommType(t)}
              className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-xl capitalize transition-colors min-h-[44px] ${
                newCommType === t ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={newCommContent}
            onChange={e => setNewCommContent(e.target.value)}
            placeholder={newCommType === "call" ? "Outcome (e.g. left voicemail, answered...)" : "Subject or notes..."}
            className="w-full py-3 px-3 text-base sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[48px]"
          />
          <button
            onClick={logCommunication}
            disabled={!newCommContent.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-50 min-h-[48px]"
          >
            Log Communication
          </button>
        </div>
      </div>

      {/* Internal Notes */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Internal Notes</h2>
        <div className="space-y-2 mb-4">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add a private note..."
            rows={3}
            className="w-full py-3 px-3 text-base sm:text-sm border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[80px]"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center gap-1.5 min-h-[48px]"
          >
            <FileText className="h-4 w-4" /> Add Note
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {notes.map(note => (
            <div key={note.id} className="text-sm p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-800">{note.content}</p>
              <p className="text-xs text-gray-400 mt-1.5">{note.author} · {new Date(note.created_at).toLocaleString()}</p>
            </div>
          ))}
          {notes.length === 0 && <p className="text-xs text-gray-400 py-2">No notes yet.</p>}
        </div>
      </div>

      {/* Chat Transcript */}
      {lead.chat_transcript && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Chat Transcript</h2>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-3 sm:p-4 max-h-64 overflow-y-auto border border-gray-100">
            {lead.chat_transcript}
          </div>
        </div>
      )}

      {/* Communication History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Communication History</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {comms.map(comm => (
            <div key={comm.id} className="flex gap-3 text-sm py-1">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${
                comm.type === "call" ? "bg-green-100 text-green-700" :
                comm.type === "email" ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {comm.type === "call" ? <Phone className="h-4 w-4" /> : comm.type === "email" ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 capitalize font-medium">{comm.type}{comm.outcome ? ` · ${comm.outcome}` : ""}</p>
                {comm.content && <p className="text-xs text-gray-500 mt-0.5 break-words">{comm.content}</p>}
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 flex-wrap">
                  <Clock className="h-3 w-3" />
                  {new Date(comm.created_at).toLocaleString()}
                  {comm.automated && <span className="bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded text-[10px] font-medium ml-1">Auto</span>}
                </p>
              </div>
            </div>
          ))}
          {comms.length === 0 && <p className="text-xs text-gray-400 py-2">No communications logged yet.</p>}
        </div>
      </div>

      {/* Status Timeline */}
      {lead.status_history && lead.status_history.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Status Timeline</h2>
          <div className="space-y-2">
            {[...lead.status_history].reverse().map((entry, i) => (
              <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-gray-50 last:border-0">
                <StatusBadge status={entry.status} />
                <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
