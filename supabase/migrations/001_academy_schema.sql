-- Migration: Turbo Academy content storage
-- Stores AI-generated reading material and TTS audio per lesson

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

-- Indexes
create index if not exists idx_academy_progress_user on academy_progress(user_id);
create index if not exists idx_academy_content_day on academy_content(day);
