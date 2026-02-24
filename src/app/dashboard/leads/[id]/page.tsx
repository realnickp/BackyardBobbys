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
      <div className="p-6">
        <p className="text-gray-500">Lead not found.</p>
        <Link href="/dashboard/leads" className="text-orange-600 text-sm hover:underline">← Back to leads</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Back + Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard/leads" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to leads
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <StatusBadge status={lead.status} />
            <LeadScoreBadge score={lead.score || 0} />
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Saving...</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap justify-end">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
              <Phone className="h-4 w-4" /> Call
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
              <Mail className="h-4 w-4" /> Email
            </a>
          )}
          {lead.phone && (
            <a href={`sms:${lead.phone}`} className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
              <MessageSquare className="h-4 w-4" /> Text
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left col: contact info + status + details */}
        <div className="space-y-4">
          {/* Contact info */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
            <h2 className="font-semibold text-gray-900">Contact Info</h2>
            {lead.phone && <div className="flex items-center gap-2 text-sm text-gray-700"><Phone className="h-4 w-4 text-gray-400" /> {lead.phone}</div>}
            {lead.email && <div className="flex items-center gap-2 text-sm text-gray-700"><Mail className="h-4 w-4 text-gray-400" /> {lead.email}</div>}
            {lead.city_or_zip && <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin className="h-4 w-4 text-gray-400" /> {lead.city_or_zip}</div>}
            <div className="pt-2 border-t border-gray-100 space-y-1 text-xs text-gray-500">
              <div><strong>Service:</strong> {lead.service}</div>
              <div><strong>Timeframe:</strong> {lead.timeframe}</div>
              {lead.budget && <div><strong>Budget:</strong> {lead.budget}</div>}
              {lead.source && <div><strong>Source:</strong> {lead.source.replace(/_/g, " ")}</div>}
              {lead.utm_campaign && <div><strong>Campaign:</strong> {lead.utm_campaign}</div>}
              <div><strong>Created:</strong> {new Date(lead.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Status update */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Update Status</h2>
            <div className="grid grid-cols-2 gap-2">
              {ALL_STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-colors ${
                    lead.status === s
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Quote</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={quoteAmount}
                  onChange={e => setQuoteAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button
                onClick={() => updateField({ quote_amount: parseFloat(quoteAmount) || undefined, quote_sent_at: new Date().toISOString(), status: "quoted" })}
                className="px-3 py-2 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 flex items-center gap-1"
              >
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </div>
            {lead.quote_amount && (
              <p className="text-xs text-gray-500 mt-2">Last quote: ${lead.quote_amount.toLocaleString()}</p>
            )}
          </div>

          {/* Appointment */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Appointment</h2>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={e => setAppointmentDate(e.target.value)}
              className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
            />
            <button
              onClick={() => updateField({ appointment_scheduled: true, appointment_date: appointmentDate, status: "scheduled" })}
              className="w-full py-2 bg-indigo-500 text-white text-xs font-semibold rounded-lg hover:bg-indigo-600 flex items-center justify-center gap-1"
            >
              <Calendar className="h-3.5 w-3.5" /> Schedule
            </button>
          </div>

          {/* Job completion */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Job Status</h2>
            <div className="space-y-2">
              <button
                onClick={() => updateField({ job_completed: true, job_completion_date: new Date().toISOString(), status: "completed" })}
                disabled={lead.job_completed}
                className={`w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  lead.job_completed ? "bg-green-100 text-green-700 cursor-default" : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                {lead.job_completed ? "Job Completed ✓" : "Mark Job Complete"}
              </button>
              {lead.job_completed && !lead.review_requested && (
                <button
                  onClick={() => updateField({ review_requested: true })}
                  className="w-full py-2 bg-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1"
                >
                  <Star className="h-3.5 w-3.5" /> Request Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Middle + Right: project desc + activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Project description */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-2">Project Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{lead.description}</p>
          </div>

          {/* Log communication */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Log Contact</h2>
            <div className="flex gap-2 mb-2">
              {(["call", "email", "sms"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setNewCommType(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                    newCommType === t ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCommContent}
                onChange={e => setNewCommContent(e.target.value)}
                placeholder={newCommType === "call" ? "Outcome (e.g. left voicemail, answered...)" : "Subject or notes..."}
                className="flex-1 py-2 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={logCommunication}
                disabled={!newCommContent.trim()}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Log
              </button>
            </div>
          </div>

          {/* Add note */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Internal Notes</h2>
            <div className="flex gap-2 mb-4">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Add a private note..."
                rows={2}
                className="flex-1 py-2 px-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={addNote}
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 disabled:opacity-50 self-end"
              >
                <FileText className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {notes.map(note => (
                <div key={note.id} className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-800">{note.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{note.author} · {new Date(note.created_at).toLocaleString()}</p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-xs text-gray-400">No notes yet.</p>}
            </div>
          </div>

          {/* Communication history */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Communication History</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comms.map(comm => (
                <div key={comm.id} className="flex gap-3 text-sm">
                  <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    comm.type === "call" ? "bg-green-100 text-green-700" :
                    comm.type === "email" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {comm.type === "call" ? "C" : comm.type === "email" ? "E" : "S"}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 capitalize">{comm.type}{comm.outcome ? ` · ${comm.outcome}` : ""}</p>
                    {comm.content && <p className="text-xs text-gray-500 mt-0.5">{comm.content}</p>}
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(comm.created_at).toLocaleString()}
                      {comm.automated && <span className="bg-purple-100 text-purple-600 px-1 py-0.5 rounded text-[10px] font-medium">Auto</span>}
                    </p>
                  </div>
                </div>
              ))}
              {comms.length === 0 && <p className="text-xs text-gray-400">No communications logged yet.</p>}
            </div>
          </div>

          {/* Status timeline */}
          {lead.status_history && lead.status_history.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Status Timeline</h2>
              <div className="space-y-2">
                {[...lead.status_history].reverse().map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <StatusBadge status={entry.status} />
                    <span className="text-xs text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
