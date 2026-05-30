-- Migration: Turbo Academy content storage
-- Stores AI-generated reading material and TTS audio per lesson
-- ORDER MATTERS: academy_lessons must exist before academy_content references it

-- Reference table for lessons (mirrors curriculum data)
create table if not exists academy_lessons (
  day integer primary key,
  week integer not null,
  title text not null,
  subtitle text not null,
  goal text not null,
  topics text[] not null default '{}',
  exercise text not null,
  deliverables text[] not null default '{}',
  reading_prompt text,
  audio_prompt text,
  category text not null,
  created_at timestamptz default now()
);

-- Table for AI-generated content (reading material + TTS audio)
create table if not exists academy_content (
  id bigint generated always as identity primary key,
  day integer not null unique references academy_lessons(day) on delete cascade,
  reading_content text,
  reading_generated_at timestamptz,
  audio_url text,
  audio_generated_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User progress tracking
create table if not exists academy_progress (
  id bigint generated always as identity primary key,
  user_id text not null,
  day integer not null references academy_lessons(day),
  completed boolean default false,
  notes text,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, day)
);

-- Achievements
create table if not exists academy_achievements (
  id bigint generated always as identity primary key,
  user_id text not null,
  achievement_type text not null, -- 'week_complete', 'challenge_complete', 'streak_7', etc.
  earned_at timestamptz default now(),
  unique(user_id, achievement_type)
);

-- RLS policies
alter table academy_lessons enable row level security;
alter table academy_content enable row level security;
alter table academy_progress enable row level security;
alter table academy_achievements enable row level security;

-- Allow public read of lessons and content
create policy "public read lessons" on academy_lessons for select using (true);
create policy "public read content" on academy_content for select using (true);

-- Users can read/write their own progress
create policy "own progress sel" on academy_progress for select using (auth.uid()::text = user_id);
create policy "own progress ins" on academy_progress for insert with check (auth.uid()::text = user_id);
create policy "own progress upd" on academy_progress for update using (auth.uid()::text = user_id);

-- Users can read/write their own achievements
create policy "own achievements sel" on academy_achievements for select using (auth.uid()::text = user_id);
create policy "own achievements ins" on academy_achievements for insert with check (auth.uid()::text = user_id);
