"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { isAdmin, getLessonsFromDB, deleteLesson, syncCurriculumToDB } from "@/lib/admin";
import { lessons } from "@/data/turbo-curriculum";
import { getBrand } from "@/config";

export default function AdminPage() {
  const brand = getBrand();
  const [auth, setAuth] = useState<{ loading: boolean; allowed: boolean }>({
    loading: true,
    allowed: false,
  });
  const [dbLessons, setDbLessons] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    isAdmin().then((allowed) => setAuth({ loading: false, allowed }));
    loadLessons();
  }, []);

  async function loadLessons() {
    const data = await getLessonsFromDB();
    setDbLessons(data);
  }

  async function handleSync() {
    setSyncing(true);
    setMessage(null);
    const result = await syncCurriculumToDB(lessons);
    setMessage(`Synced ${result.synced}/${lessons.length} lessons. ${result.errors.length} errors.`);
    await loadLessons();
    setSyncing(false);
  }

  async function handleDelete(day: number) {
    if (!confirm(`Delete lesson Day ${day}?`)) return;
    try {
      await deleteLesson(day);
      setMessage(`Deleted Day ${day}`);
      await loadLessons();
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
  }

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth.allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="max-w-md text-center p-8">
          <h1 className="text-2xl font-bold text-white mb-4">Admin Access Required</h1>
          <p className="text-zinc-400 mb-6">Sign in with an admin account to access the CMS.</p>
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
            className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Content Management</h1>
          <p className="text-xs text-zinc-500">{brand.name} — CMS</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={syncing}
            className={[
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              syncing
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-emerald-500 text-black hover:bg-emerald-400",
            ].join(" ")}
          >
            {syncing ? "Syncing..." : "Sync Curriculum → DB"}
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-800 text-sm text-zinc-300">
          {message}
          <button onClick={() => setMessage(null)} className="ml-3 text-zinc-500 hover:text-zinc-300">✕</button>
        </div>
      )}

      {/* Stats */}
      <div className="px-6 py-4 border-b border-zinc-800 flex gap-6 text-sm">
        <div>
          <span className="text-zinc-500">In DB: </span>
          <span className="text-white font-medium">{dbLessons.length}</span>
        </div>
        <div>
          <span className="text-zinc-500">In Curriculum: </span>
          <span className="text-white font-medium">{lessons.length}</span>
        </div>
        <div>
          <span className="text-zinc-500">Weeks: </span>
          <span className="text-white font-medium">{new Set(lessons.map((l) => l.week)).size}</span>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left">
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Day</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Week</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Title</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Category</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">In DB?</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Topics</th>
                <th className="pb-3 text-zinc-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => {
                const inDb = dbLessons.some((dbl) => dbl.day === lesson.day);
                return (
                  <tr
                    key={lesson.day}
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="py-3 pr-4 text-zinc-300 font-mono">D{lesson.day}</td>
                    <td className="py-3 pr-4 text-zinc-400">{lesson.week}</td>
                    <td className="py-3 pr-4 text-white max-w-xs truncate">{lesson.title}</td>
                    <td className="py-3 pr-4">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${brand.accentHex}10`,
                          color: brand.accentHex,
                        }}
                      >
                        {lesson.category}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {inDb ? (
                        <span className="text-emerald-400 text-xs">✓</span>
                      ) : (
                        <span className="text-zinc-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {lesson.topics.slice(0, 2).map((t) => (
                          <span key={t} className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                            {t.length > 20 ? t.slice(0, 20) + "…" : t}
                          </span>
                        ))}
                        {lesson.topics.length > 2 && (
                          <span className="text-xs text-zinc-600">+{lesson.topics.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <a
                          href={`/day/${lesson.day}`}
                          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          View
                        </a>
                        {inDb && (
                          <button
                            onClick={() => handleDelete(lesson.day)}
                            className="text-xs text-red-500 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Week Summary */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">Weeks Overview</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from(new Set(lessons.map((l) => l.week)))
              .sort()
              .map((weekNum) => {
                const weekLessons = lessons.filter((l) => l.week === weekNum);
                const inDbCount = weekLessons.filter((l) =>
                  dbLessons.some((dbl) => dbl.day === l.day)
                ).length;
                return (
                  <div
                    key={weekNum}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">Week {weekNum}</h3>
                      <span className="text-xs text-zinc-500">
                        {inDbCount}/{weekLessons.length} synced
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-3">{weekLessons[0]?.title}</p>
                    <div className="flex flex-wrap gap-1">
                      {weekLessons.map((l) => (
                        <span
                          key={l.day}
                          className={[
                            "text-xs px-2 py-0.5 rounded",
                            dbLessons.some((dbl) => dbl.day === l.day)
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-zinc-800 text-zinc-600",
                          ].join(" ")}
                        >
                          D{l.day}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Enrollment summary */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-2">Enrollment & Progress</h2>
          <p className="text-xs text-zinc-500 mb-4">Track user progress across the academy.</p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
            <p className="text-zinc-500 text-sm">
              Enrollment tracking data will appear here once students begin taking lessons.
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              Progress is automatically recorded in <code className="text-emerald-400">academy_progress</code> table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
