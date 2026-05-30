// Admin API helpers — Supabase CRUD for course content management

import { supabase, getServiceClient } from "@/lib/supabase";
import type { Lesson } from "@/data/turbo-curriculum";

// ── Lessons CRUD ──

export interface LessonRow {
  day: number;
  week: number;
  title: string;
  subtitle: string;
  goal: string;
  topics: string[];
  exercise: string;
  deliverables: string[];
  reading_prompt: string | null;
  audio_prompt: string | null;
  category: string;
  created_at: string;
}

export async function getLessonsFromDB(): Promise<LessonRow[]> {
  const { data } = await supabase
    .from("academy_lessons")
    .select("*")
    .order("day");
  return data || [];
}

export async function getLessonByDayFromDB(day: number): Promise<LessonRow | null> {
  const { data } = await supabase
    .from("academy_lessons")
    .select("*")
    .eq("day", day)
    .single();
  return data;
}

export async function upsertLesson(lesson: Partial<LessonRow> & { day: number }) {
  const client = getServiceClient();
  const { data, error } = await client
    .from("academy_lessons")
    .upsert(lesson, { onConflict: "day" })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as LessonRow;
}

export async function deleteLesson(day: number) {
  const client = getServiceClient();
  const { error } = await client
    .from("academy_lessons")
    .delete()
    .eq("day", day);
  if (error) throw new Error(error.message);
}

// ── Sync curriculum data → DB ──

export async function syncCurriculumToDB(lessons: Lesson[]): Promise<{ synced: number; errors: string[] }> {
  const client = getServiceClient();
  let synced = 0;
  const errors: string[] = [];

  for (const lesson of lessons) {
    const { error } = await client.from("academy_lessons").upsert(
      {
        day: lesson.day,
        week: lesson.week,
        title: lesson.title,
        subtitle: lesson.subtitle,
        goal: lesson.goal,
        topics: lesson.topics,
        exercise: lesson.exercise,
        deliverables: lesson.deliverables,
        reading_prompt: lesson.readingPrompt,
        audio_prompt: lesson.audioPrompt,
        category: lesson.category,
      },
      { onConflict: "day" }
    );
    if (error) {
      errors.push(`Day ${lesson.day}: ${error.message}`);
    } else {
      synced++;
    }
  }

  return { synced, errors };
}

// ── User / Enrollment ──

export interface Enrollment {
  id: string;
  email: string;
  name: string;
  started_at: string;
  completed_at: string | null;
  current_day: number;
  progress_pct: number;
  brand: string;
}

export async function getEnrollments(): Promise<Enrollment[]> {
  // This reads from academy_progress aggregated by user
  const client = getServiceClient();
  const { data: progressData } = await client
    .from("academy_progress")
    .select("user_id, day, completed, completed_at");

  if (!progressData) return [];

  // Group by user
  const userMap = new Map<string, { days: number; completed: number; lastDay: number }>();
  for (const p of progressData) {
    const existing = userMap.get(p.user_id) || { days: 0, completed: 0, lastDay: 0 };
    existing.days++;
    if (p.completed) existing.completed++;
    existing.lastDay = Math.max(existing.lastDay, p.day);
    userMap.set(p.user_id, existing);
  }

  // Get user emails from auth (requires admin endpoint ideally)
  const enrollments: Enrollment[] = [];
  for (const [userId, stats] of userMap) {
    enrollments.push({
      id: userId,
      email: userId, // fallback — will be updated when auth is wired
      name: "",
      started_at: "",
      completed_at: null,
      current_day: stats.lastDay,
      progress_pct: Math.round((stats.completed / 28) * 100),
      brand: "turbo" as string,
    });
  }

  return enrollments;
}

// ── Admin auth check ──

export async function isAdmin(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return false;
  // Simple check: user metadata contains admin flag or email matches
  const email = session.user.email?.toLowerCase() || "";
  return email.includes("admin") || email === "marcus@turbial.com" || email === "builder@turbial.com";
}
