// Brand-aware curriculum loader
// Default: Turbo AI Operator curriculum
// Set NEXT_PUBLIC_ACADEMY_BRAND=duo for Duo curriculum

import type { Lesson, Week } from "./turbo-curriculum";
import { weeks as turboWeeks, lessons as turboLessons } from "./turbo-curriculum";
import { getBrandKey } from "@/config";

// Lazy-load brand-specific curricula
// For now, Duo falls back to Turbo until its curriculum is built
// Replace with duo-curriculum import when ready

let _weeks: Week[] | null = null;
let _lessons: Lesson[] | null = null;

function loadCurriculum() {
  const brand = getBrandKey();

  if (brand === "duo") {
    // TODO: Load duo-curriculum when ready
    // For now, use Turbo curriculum as placeholder
    _weeks = turboWeeks;
    _lessons = turboLessons;
    return { weeks: _weeks, lessons: _lessons };
  }

  // Default: Turbo
  _weeks = turboWeeks;
  _lessons = turboLessons;
  return { weeks: _weeks, lessons: _lessons };
}

export function getWeeks(): Week[] {
  if (!_weeks) loadCurriculum();
  return _weeks!;
}

export function getLessons(): Lesson[] {
  if (!_lessons) loadCurriculum();
  return _lessons!;
}

export function getLessonByDay(day: number): Lesson | undefined {
  return getLessons().find((l) => l.day === day);
}

export function getLessonsByWeek(week: number): Lesson[] {
  return getLessons().filter((l) => l.week === week);
}

export { type Lesson, type Week };
