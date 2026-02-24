-- Backyard Bobby's Leads Database Schema
-- Run this in your Supabase SQL editor to create the leads table

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  city_or_zip TEXT NOT NULL,
  description TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  budget TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'completed', 'closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick status filtering and date sorting
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads (service);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for the public form)
CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users can read leads (for admin)
CREATE POLICY "Authenticated users can read leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update leads
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
-- ============================================================
-- BACKYARD BOBBY'S: LEAD MANAGEMENT SYSTEM MIGRATION
-- Run this in your Supabase SQL editor AFTER schema.sql
-- ============================================================

-- ============================================================
-- 1. EXPAND LEADS TABLE (add all new columns)
-- ============================================================

ALTER TABLE leads
  -- Source tracking
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS landing_page TEXT,

  -- Lead scoring
  ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS score_factors JSONB DEFAULT '{}',

  -- Pipeline status (expand existing status)
  ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]',

  -- Assignment
  ADD COLUMN IF NOT EXISTS assigned_to UUID,

  -- Timestamps
  ADD COLUMN IF NOT EXISTS first_contact_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMPTZ,

  -- Appointment
  ADD COLUMN IF NOT EXISTS appointment_scheduled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS appointment_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS appointment_notes TEXT,

  -- Quote
  ADD COLUMN IF NOT EXISTS quote_amount DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS quote_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS quote_accepted BOOLEAN,

  -- Post-job
  ADD COLUMN IF NOT EXISTS job_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS job_completion_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS review_requested BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS review_received BOOLEAN DEFAULT false,

  -- Chatbot
  ADD COLUMN IF NOT EXISTS chat_transcript TEXT,
  ADD COLUMN IF NOT EXISTS chatbot_qualified BOOLEAN DEFAULT false,

  -- Style preference (stamped concrete)
  ADD COLUMN IF NOT EXISTS preferred_style TEXT;

-- Update status check constraint to include new statuses
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'scheduled', 'completed', 'lost', 're_engaged', 'chatbot_qualified'));

-- New indexes
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads (score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads (assigned_to);

-- ============================================================
-- 2. USERS TABLE (sales team)
-- ============================================================

CREATE TABLE IF NOT EXISTS team_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'sales_rep' CHECK (role IN ('admin', 'sales_rep', 'manager')),
  phone TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_users_email ON team_users (email);

ALTER TABLE team_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can read team_users" ON team_users;
CREATE POLICY "Authenticated users can read team_users" ON team_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- 3. LEAD NOTES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author TEXT NOT NULL DEFAULT 'Admin',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes (lead_id);

ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can manage lead_notes" ON lead_notes;
CREATE POLICY "Authenticated users can manage lead_notes" ON lead_notes
  USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can insert lead_notes" ON lead_notes;
CREATE POLICY "Authenticated users can insert lead_notes" ON lead_notes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- 4. LEAD COMMUNICATIONS TABLE (call log, email log, SMS log)
-- ============================================================

CREATE TABLE IF NOT EXISTS lead_communications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('call', 'email', 'sms', 'in_person', 'note')),
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  subject TEXT,
  content TEXT,
  duration_seconds INTEGER, -- for calls
  outcome TEXT,             -- 'answered', 'voicemail', 'no_answer'
  automated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_comms_lead_id ON lead_communications (lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_comms_type ON lead_communications (type);

ALTER TABLE lead_communications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can manage lead_communications" ON lead_communications;
CREATE POLICY "Authenticated users can manage lead_communications" ON lead_communications
  USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Authenticated users can insert lead_communications" ON lead_communications;
CREATE POLICY "Authenticated users can insert lead_communications" ON lead_communications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- 5. AUTOMATIONS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL,
  trigger_conditions JSONB DEFAULT '{}',
  delay_hours INTEGER DEFAULT 0,
  actions JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  total_runs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can manage automations" ON automations;
CREATE POLICY "Authenticated users can manage automations" ON automations
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 6. AUTOMATION LOGS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_id UUID REFERENCES automations(id),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  automation_name TEXT,
  action_type TEXT,
  status TEXT CHECK (status IN ('success', 'failed', 'skipped')),
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_automation_logs_lead_id ON automation_logs (lead_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_created_at ON automation_logs (created_at DESC);

ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can read automation_logs" ON automation_logs;
CREATE POLICY "Authenticated users can read automation_logs" ON automation_logs
  FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Service role can insert automation_logs" ON automation_logs;
CREATE POLICY "Service role can insert automation_logs" ON automation_logs
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- 7. SEED DEFAULT AUTOMATIONS
-- ============================================================

INSERT INTO automations (name, description, trigger_type, delay_hours, actions, active)
VALUES
  (
    'Instant Welcome',
    'Send SMS + email when a new lead is created',
    'lead_created',
    0,
    '[
      {"type": "sms", "template": "welcome_sms"},
      {"type": "email", "template": "welcome_email"},
      {"type": "task", "content": "Call new lead ASAP"}
    ]',
    true
  ),
  (
    'No Response Follow-up',
    'Follow up if lead has been ''new'' for 24 hours with no contact',
    'no_response',
    24,
    '[
      {"type": "sms", "template": "no_response_sms"},
      {"type": "score_adjust", "points": -5},
      {"type": "notify_manager"}
    ]',
    true
  ),
  (
    'Quote Follow-up',
    'Follow up if quote was sent 48 hours ago with no response',
    'quote_followup',
    48,
    '[
      {"type": "email", "template": "quote_followup_email"},
      {"type": "sms", "template": "quote_followup_sms"}
    ]',
    true
  ),
  (
    'Appointment Reminder',
    'Send reminder 24 hours before scheduled appointment',
    'appointment_reminder',
    -24,
    '[
      {"type": "sms", "template": "appointment_reminder_sms"},
      {"type": "email", "template": "appointment_reminder_email"}
    ]',
    true
  ),
  (
    'Post-Job Review Request',
    'Request a Google review 3 days after job is marked completed',
    'job_completed',
    72,
    '[
      {"type": "sms", "template": "review_request_sms"},
      {"type": "email", "template": "review_request_email"}
    ]',
    true
  ),
  (
    'Re-engage Cold Leads',
    'Re-engage leads with no activity for 30 days',
    'cold_lead',
    720,
    '[
      {"type": "email", "template": "re_engage_email"},
      {"type": "status_update", "new_status": "re_engaged"}
    ]',
    true
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- 8. USEFUL VIEW: LEAD SUMMARY (for dashboard)
-- ============================================================

CREATE OR REPLACE VIEW lead_summary AS
SELECT
  l.id,
  l.name,
  l.email,
  l.phone,
  l.service,
  l.city_or_zip,
  l.timeframe,
  l.budget,
  l.status,
  l.score,
  l.source,
  l.utm_campaign,
  l.assigned_to,
  l.appointment_scheduled,
  l.appointment_date,

  
  l.quote_amount,
  l.quote_sent_at,
  l.job_completed,
  l.review_requested,
  l.created_at,
  l.updated_at,
  l.first_contact_at,
  l.last_contact_at,
  (SELECT COUNT(*) FROM lead_notes n WHERE n.lead_id = l.id) AS note_count,
  (SELECT COUNT(*) FROM lead_communications c WHERE c.lead_id = l.id) AS communication_count
FROM leads l;
