// ============================================================
// DASHBOARD TYPES — Backyard Bobby's Lead Management System
// ============================================================

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "scheduled"
  | "completed"
  | "lost"
  | "re_engaged"
  | "chatbot_qualified";

export type CommunicationType = "call" | "email" | "sms" | "in_person" | "note";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  city_or_zip: string;
  description: string;
  timeframe: string;
  budget?: string;
  status: LeadStatus;
  score: number;
  score_factors?: Record<string, number>;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  assigned_to?: string;
  appointment_scheduled: boolean;
  appointment_date?: string;
  appointment_notes?: string;
  quote_amount?: number;
  quote_sent_at?: string;
  quote_accepted?: boolean;
  job_completed: boolean;
  job_completion_date?: string;
  review_requested: boolean;
  review_received: boolean;
  preferred_style?: string;
  chat_transcript?: string;
  chatbot_qualified: boolean;
  status_history?: StatusHistoryEntry[];
  notes?: string;
  note_count?: number;
  communication_count?: number;
  first_contact_at?: string;
  last_contact_at?: string;
  created_at: string;
  updated_at: string;
}

export interface StatusHistoryEntry {
  status: LeadStatus;
  timestamp: string;
  notes?: string;
  changed_by?: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface LeadCommunication {
  id: string;
  lead_id: string;
  type: CommunicationType;
  direction?: "inbound" | "outbound";
  subject?: string;
  content?: string;
  duration_seconds?: number;
  outcome?: string;
  automated: boolean;
  created_at: string;
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  trigger_type: string;
  trigger_conditions?: Record<string, unknown>;
  delay_hours: number;
  actions: AutomationAction[];
  active: boolean;
  last_run_at?: string;
  total_runs: number;
  created_at: string;
}

export interface AutomationAction {
  type: "sms" | "email" | "task" | "score_adjust" | "status_update" | "notify_manager";
  template?: string;
  content?: string;
  points?: number;
  new_status?: LeadStatus;
}

export interface AutomationLog {
  id: string;
  automation_id?: string;
  lead_id?: string;
  automation_name: string;
  action_type: string;
  status: "success" | "failed" | "skipped";
  details?: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  leads_today: number;
  leads_this_week: number;
  leads_this_month: number;
  hot_leads: number;        // score >= 80
  warm_leads: number;       // score 60-79
  avg_score: number;
  conversion_rate: number;  // quoted / total
  appointments_this_week: number;
  revenue_pipeline: number; // sum of quote_amount in pipeline
  total_leads: number;
}

export interface PipelineStage {
  status: LeadStatus;
  label: string;
  count: number;
  total_value: number;
  leads: Lead[];
}

export interface SourceBreakdown {
  source: string;
  count: number;
  percentage: number;
  avg_score: number;
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  quoted: "Quoted",
  scheduled: "Scheduled",
  completed: "Completed",
  lost: "Lost",
  re_engaged: "Re-engaged",
  chatbot_qualified: "Chatbot Qualified",
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  quoted: "bg-orange-100 text-orange-800",
  scheduled: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  re_engaged: "bg-teal-100 text-teal-800",
  chatbot_qualified: "bg-pink-100 text-pink-800",
};

export const PIPELINE_STAGES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "scheduled",
  "completed",
];
