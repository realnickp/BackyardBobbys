-- Migration 003: device push subscriptions for dashboard PWA notifications
-- Run once in Supabase → SQL Editor.

create table if not exists push_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  endpoint     text not null unique,
  p256dh       text not null,
  auth         text not null,
  user_agent   text,
  created_at   timestamptz not null default now(),
  last_used_at timestamptz
);

-- Accessed only via the Supabase service-role key (server side), which
-- bypasses RLS. Enable RLS with no policies so the anon/public key cannot
-- read or write subscription endpoints.
alter table push_subscriptions enable row level security;
