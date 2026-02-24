import { STATUS_LABELS, STATUS_COLORS, type LeadStatus } from "@/lib/dashboard-types";

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[status] || "bg-gray-100 text-gray-800"}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
