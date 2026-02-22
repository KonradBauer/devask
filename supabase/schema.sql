-- ============================================================
-- IT Interview Questions – Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. TECHNOLOGIES
create table if not exists public.technologies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  icon          text not null default '',
  question_count int  not null default 0,
  created_at    timestamptz not null default now()
);

-- 2. QUESTIONS
create table if not exists public.questions (
  id               uuid primary key default gen_random_uuid(),
  technology_id    uuid not null references public.technologies(id) on delete cascade,
  technology_slug  text not null,
  technology_name  text not null,
  title            text not null,
  slug             text not null unique,
  answer           text not null,
  difficulty       text not null check (difficulty in ('junior', 'mid', 'senior')),
  interview_count  int  not null default 0,
  status           text not null default 'pending' check (status in ('approved', 'pending')),
  company          text,
  country          text,
  level            text,
  created_at       timestamptz not null default now()
);

-- 3. INTERVIEW REPORTS
create table if not exists public.interview_reports (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  company     text not null default '',
  level       text not null default '',
  country     text not null default '',
  created_at  timestamptz not null default now()
);

-- 4. INDEXES
create index if not exists idx_questions_technology_slug on public.questions(technology_slug);
create index if not exists idx_questions_status          on public.questions(status);
create index if not exists idx_questions_difficulty      on public.questions(difficulty);
create index if not exists idx_questions_interview_count on public.questions(interview_count desc);
create index if not exists idx_questions_created_at      on public.questions(created_at desc);
create index if not exists idx_reports_question_id       on public.interview_reports(question_id);

-- 5. TRIGGER: auto-increment interview_count when a report is inserted
create or replace function public.increment_interview_count()
returns trigger language plpgsql as $$
begin
  update public.questions
  set    interview_count = interview_count + 1
  where  id = NEW.question_id;
  return NEW;
end;
$$;

drop trigger if exists trg_increment_interview_count on public.interview_reports;
create trigger trg_increment_interview_count
  after insert on public.interview_reports
  for each row execute function public.increment_interview_count();

-- 6. RLS (Row Level Security) – public read, anyone can insert reports/questions
alter table public.technologies     enable row level security;
alter table public.questions        enable row level security;
alter table public.interview_reports enable row level security;

-- Technologies: public read
drop policy if exists "technologies_select" on public.technologies;
create policy "technologies_select"
  on public.technologies for select using (true);

-- Questions: public read approved, anyone can insert pending
drop policy if exists "questions_select" on public.questions;
create policy "questions_select"
  on public.questions for select using (status = 'approved');

drop policy if exists "questions_insert" on public.questions;
create policy "questions_insert"
  on public.questions for insert with check (status = 'pending');

-- Interview reports: anyone can insert
drop policy if exists "reports_insert" on public.interview_reports;
create policy "reports_insert"
  on public.interview_reports for insert with check (true);

-- Needed for seed script upsert (anon can also update questions)
drop policy if exists "questions_upsert" on public.questions;
create policy "questions_upsert"
  on public.questions for update using (true);
