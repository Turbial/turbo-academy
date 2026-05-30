"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getBrand } from "@/config";
import Link from "next/link";

interface EnrollmentStatus {
  started: boolean;
  currentDay: number;
  completedDays: number;
  achievements: string[];
  enrolledAt: string | null;
}

export default function EnrollmentPage() {
  const brand = getBrand();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<EnrollmentStatus>({
    started: false,
    currentDay: 0,
    completedDays: 0,
    achievements: [],
    enrolledAt: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        loadEnrollment(s.user.id);
      } else {
        setLoading(false);
      }
    });
  }, []);

  async function loadEnrollment(userId: string) {
    try {
      const { data: progress } = await supabase
        .from("academy_progress")
        .select("day, completed, completed_at")
        .eq("user_id", userId);

      const { data: achievements } = await supabase
        .from("academy_achievements")
        .select("achievement_type, earned_at")
        .eq("user_id", userId);

      const completedDays = (progress || []).filter((p) => p.completed).length;
      const currentDay = (progress || []).reduce(
        (max, p) => Math.max(max, p.completed ? p.day + 1 : p.day),
        1
      );

      setEnrollment({
        started: (progress || []).length > 0,
        currentDay: Math.min(currentDay, 28),
        completedDays,
        achievements: (achievements || []).map((a) => a.achievement_type),
        enrolledAt: progress?.[0]?.completed_at || null,
      });
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }

  const progressPct = Math.round((enrollment.completedDays / 28) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm" style={{ color: brand.accentHex }}>
          ← {brand.name}
        </Link>
        <div className="flex items-center gap-3">
          {session?.user && (
            <>
              <span className="text-xs text-zinc-500">{session.user.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {session?.user ? "Your Progress" : "Enroll in the Challenge"}
        </h1>
        <p className="text-zinc-400 mb-8">
          {session?.user
            ? `${enrollment.completedDays}/28 days completed`
            : "Sign up to track your journey through the 28-day challenge."}
        </p>

        {!session?.user ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <div className="text-4xl mb-4">{brand.challengeEmoji}</div>
            <h2 className="text-xl font-bold text-white mb-3">
              Become a {brand.challengeName}
            </h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">
              Track your daily progress, earn achievements, and get certified when you
              complete all 28 days.
            </p>
            <Link
              href="/auth/login"
              className="inline-block px-8 py-3 rounded-xl font-semibold text-black hover:opacity-90 transition-opacity"
              style={{ backgroundColor: brand.accentHex }}
            >
              Start Free — Sign Up
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">28-Day Challenge Progress</h2>
                <span
                  className="text-sm font-medium"
                  style={{ color: brand.accentHex }}
                >
                  {progressPct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, backgroundColor: brand.accentHex }}
                />
              </div>

              <div className="flex justify-between text-xs text-zinc-500">
                <span>{enrollment.completedDays} days completed</span>
                <span>28 days total</span>
              </div>

              <div className="mt-4 flex gap-2">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                  const isDone = day <= enrollment.completedDays;
                  const isCurrent = day === enrollment.currentDay;
                  return (
                    <Link
                      key={day}
                      href={`/day/${day}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400"
                          : isCurrent
                          ? ""
                          : "bg-zinc-800 text-zinc-600"
                      }`}
                      style={
                        isCurrent && !isDone
                          ? {
                              backgroundColor: `${brand.accentHex}20`,
                              color: brand.accentHex,
                              border: `1px solid ${brand.accentHex}40`,
                            }
                          : {}
                      }
                    >
                      {day}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Continue / Start */}
            <div className="text-center">
              <Link
                href={`/day/${enrollment.currentDay}`}
                className="inline-block px-8 py-3 rounded-xl font-semibold text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: brand.accentHex }}
              >
                {enrollment.started
                  ? `Continue to Day ${enrollment.currentDay} →`
                  : "Start Day 1 →"}
              </Link>
            </div>

            {/* Achievements */}
            {enrollment.achievements.length > 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h2 className="font-semibold text-white mb-3">Achievements</h2>
                <div className="flex flex-wrap gap-2">
                  {enrollment.achievements.map((a) => (
                    <span
                      key={a}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${brand.accentHex}10`,
                        color: brand.accentHex,
                      }}
                    >
                      🏅 {a.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
