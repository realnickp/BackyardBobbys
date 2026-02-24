"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, Filter, ArrowUpDown, Phone, Mail, ChevronRight,
  Loader2, Trash2, CheckSquare, X, AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { LeadScoreBadge } from "@/components/dashboard/LeadScoreBadge";
import type { Lead, LeadStatus } from "@/lib/dashboard-types";
import { STATUS_LABELS } from "@/lib/dashboard-types";

const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "quoted", "scheduled", "completed", "lost", "re_engaged"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<LeadStatus | "">("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sortBy, sortDir, limit: "100" });
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sortBy, sortDir]);

  useEffect(() => {
    const t = setTimeout(fetchLeads, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchLeads, search]);

  useEffect(() => {
    setSelectedIds(new Set());
    setDeleteConfirm(false);
    setBulkError("");
  }, [search, statusFilter, sortBy, sortDir]);

  function toggleSort(col: string) {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  }

  const allSelected = leads.length > 0 && selectedIds.size === leads.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < leads.length;

  function toggleSelectAll() {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(leads.map(l => l.id)));
    setDeleteConfirm(false);
    setBulkError("");
  }

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setDeleteConfirm(false);
    setBulkError("");
  }

  function clearSelection() {
    setSelectedIds(new Set());
    setDeleteConfirm(false);
    setBulkError("");
    setBulkStatus("");
  }

  async function handleBulkStatus() {
    if (!bulkStatus || selectedIds.size === 0) return;
    setBulkLoading(true);
    setBulkError("");
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds], updates: { status: bulkStatus } }),
      });
      if (!res.ok) throw new Error("Update failed");
      clearSelection();
      await fetchLeads();
    } catch {
      setBulkError("Status update failed. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    setBulkError("");
    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      if (!res.ok) throw new Error("Delete failed");
      clearSelection();
      await fetchLeads();
    } catch {
      setBulkError("Delete failed. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-500">{total} total leads</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2.5 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[44px]"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-8 py-2.5 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white min-h-[44px]"
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">
                {selectedIds.size} selected
              </span>
            </div>
            <button onClick={clearSelection} className="p-2 text-orange-400 hover:text-orange-600 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!deleteConfirm ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 flex-1">
                <select
                  value={bulkStatus}
                  onChange={e => setBulkStatus(e.target.value as LeadStatus | "")}
                  className="flex-1 sm:flex-initial text-sm border border-orange-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[44px]"
                  disabled={bulkLoading}
                >
                  <option value="">Change status…</option>
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
                <button
                  onClick={handleBulkStatus}
                  disabled={!bulkStatus || bulkLoading}
                  className="text-sm bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  {bulkLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Apply
                </button>
              </div>
              <button
                onClick={() => setDeleteConfirm(true)}
                disabled={bulkLoading}
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg border border-red-200 transition-colors disabled:opacity-40 min-h-[44px]"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  <span className="font-semibold">Permanently delete {selectedIds.size} lead{selectedIds.size !== 1 ? "s" : ""}?</span>
                  <span className="block text-red-500 mt-0.5">This cannot be undone.</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  disabled={bulkLoading}
                  className="flex-1 text-sm px-4 py-2.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-100 transition-colors min-h-[44px] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={bulkLoading}
                  className="flex-1 text-sm px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60 min-h-[44px]"
                >
                  {bulkLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete
                </button>
              </div>
            </div>
          )}

          {bulkError && <p className="text-sm text-red-600">{bulkError}</p>}
        </div>
      )}

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
            No leads found. {search && "Try a different search."}
          </div>
        ) : leads.map(lead => (
          <div
            key={lead.id}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
              selectedIds.has(lead.id) ? "border-orange-300 bg-orange-50/50" : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-3 p-4">
              <input
                type="checkbox"
                checked={selectedIds.has(lead.id)}
                onChange={() => toggleSelect(lead.id)}
                className="mt-1 h-5 w-5 rounded border-gray-300 accent-orange-500 cursor-pointer flex-shrink-0"
              />
              <Link href={`/dashboard/leads/${lead.id}`} className="flex-1 min-w-0 active:opacity-80">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lead.service}</p>
                    {lead.city_or_zip && <p className="text-xs text-gray-400">{lead.city_or_zip}</p>}
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <LeadScoreBadge score={lead.score || 0} />
                    <span className="text-xs text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <span className="text-xs text-orange-600 font-medium flex items-center gap-0.5">
                    Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick contact row */}
            <div className="flex border-t border-gray-100">
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-green-600 hover:bg-green-50 transition-colors min-h-[48px] border-r border-gray-100"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
              )}
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors min-h-[48px]"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="pl-4 pr-2 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleSelectAll}
                    className="h-5 w-5 rounded border-gray-300 accent-orange-500 cursor-pointer"
                    aria-label="Select all leads"
                  />
                </th>
                {[
                  { label: "Name", col: "name" },
                  { label: "Service", col: "service" },
                  { label: "Location", col: "city_or_zip" },
                  { label: "Score", col: "score" },
                  { label: "Status", col: "status" },
                  { label: "Source", col: "source" },
                  { label: "Date", col: "created_at" },
                ].map(({ label, col }) => (
                  <th key={col} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
                    <button onClick={() => toggleSort(col)} className="flex items-center gap-1 hover:text-gray-900">
                      {label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wide">Contact</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                    No leads found. {search && "Try a different search."}
                  </td>
                </tr>
              ) : leads.map(lead => {
                const isSelected = selectedIds.has(lead.id);
                return (
                  <tr key={lead.id} className={`transition-colors ${isSelected ? "bg-orange-50 hover:bg-orange-50" : "hover:bg-gray-50"}`}>
                    <td className="pl-4 pr-2 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(lead.id)}
                        className="h-5 w-5 rounded border-gray-300 accent-orange-500 cursor-pointer"
                        aria-label={`Select ${lead.name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/leads/${lead.id}`} className="font-semibold text-gray-900 hover:text-orange-600">
                        {lead.name}
                      </Link>
                      {lead.budget && <p className="text-xs text-gray-400">{lead.budget}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{lead.service}</td>
                    <td className="px-4 py-3 text-gray-500">{lead.city_or_zip}</td>
                    <td className="px-4 py-3"><LeadScoreBadge score={lead.score || 0} /></td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-4 py-3 text-gray-500 capitalize text-xs">{lead.source?.replace(/_/g, " ") || "website"}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="text-gray-400 hover:text-green-600 transition-colors" title="Call">
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Email">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Link href={`/dashboard/leads/${lead.id}`} className="text-gray-300 hover:text-orange-500">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
