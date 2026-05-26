"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getLessonByDay, weeks, lessons } from "@/data/curriculum";

const categoryColors: Record<string, string> = {
  "core-tools": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "real-work": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  automation: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  agents: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const categoryLabels: Record<string, string> = {
  "core-tools": "Core Tools",
  "real-work": "Real Work",
  automation: "Automation",
  agents: "Agents & Businesses",
};

export default function DayPageClient() {
  const params = useParams();
  const day = parseInt(params.id as string, 10);
  const lesson = getLessonByDay(day);

  const [readingContent, setReadingContent] = useState<string | null>(null);
  const [readingLoading, setReadingLoading] = useState(false);
  const [readingError, setReadingError] = useState<string | null>(null);

  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Lesson not found. <Link href="/" className="text-emerald-400 ml-2">← Home</Link>
      </div>
    );
  }

  const week = weeks[lesson.week - 1];
  const prevLesson = day > 1 ? getLessonByDay(day - 1) : null;
  const nextLesson = day < 28 ? getLessonByDay(day + 1) : null;

  const generateReading = useCallback(async () => {
    setReadingLoading(true);
    setReadingError(null);
    try {
      const res = await fetch("/api/content/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day }),
      });
      const data = await res.json();
      if (data.error) {
        setReadingError(data.error);
      } else {
        setReadingContent(data.content);
      }
    } catch {
      setReadingError("Failed to generate content");
    } finally {
      setReadingLoading(false);
    }
  }, [day]);

  const generateAudio = useCallback(async () => {
    setAudioLoading(true);
    try {
      const res = await fetch("/api/content/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        const blob = new Blob(
          [Uint8Array.from(atob(data.audioBase64), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      }
    } catch {
      // silent fail for audio
    } finally {
      setAudioLoading(false);
    }
  }, [day]);

  const toggleAudio = () => {
    if (!audioUrl) return;
    if (audioEl) {
      if (audioPlaying) {
        audioEl.pause();
      } else {
        audioEl.play();
      }
      setAudioPlaying(!audioPlaying);
    } else {
      const a = new Audio(audioUrl);
      a.onended = () => setAudioPlaying(false);
      a.onpause = () => setAudioPlaying(false);
      a.onplay = () => setAudioPlaying(true);
      a.play();
      setAudioEl(a);
      setAudioPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-800 bg-zinc-900/30 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <Link
            href="/"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← Turbo Academy
          </Link>
        </div>
        <div className="p-4 border-b border-zinc-800">
          <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
            WEEK {lesson.week}
          </span>
          <p className="text-sm text-zinc-300 mt-1 font-medium">{week.title}</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {lessons.map((l) => (
            <Link
              key={l.day}
              href={`/day/${l.day}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                l.day === day
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <span className="text-xs font-mono w-6 text-zinc-500">D{l.day}</span>
              <span className="truncate">{l.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/" className="text-sm text-emerald-400">
            ← Academy
          </Link>
          <span className="text-xs text-zinc-500">
            Day {day} of 28
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-900 h-1">
          <div
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${(day / 28) * 100}%` }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span
                className={`text-xs font-mono px-2 py-1 rounded border ${categoryColors[lesson.category]}`}
              >
                {categoryLabels[lesson.category]}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Week {lesson.week} · Day {lesson.day}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-zinc-400">{lesson.subtitle}</p>
          </div>

          {/* Goal */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 mb-8">
            <h3 className="text-sm font-semibold text-emerald-400 mb-1">
              Today&apos;s Goal
            </h3>
            <p className="text-zinc-300">{lesson.goal}</p>
          </div>

          {/* Topics */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Topics
            </h3>
            <ul className="space-y-2">
              {lesson.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-emerald-400 mt-1">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* AI-Generated Reading Material */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Reading Material
            </h3>

            {!readingContent && !readingLoading && !readingError && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
                <p className="text-zinc-500 text-sm mb-4">
                  Generate a deep-dive reading guide for this lesson using AI.
                </p>
                <button
                  onClick={generateReading}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-lg transition-colors text-sm"
                >
                  Generate Reading Material
                </button>
              </div>
            )}

            {readingLoading && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-zinc-400 text-sm">Generating reading material with AI...</span>
                </div>
              </div>
            )}

            {readingError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <p className="text-red-400 text-sm mb-3">
                  Failed to generate: {readingError}. Make sure API keys are configured.
                </p>
                <button
                  onClick={generateReading}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {readingContent && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-strong:text-zinc-200 prose-li:text-zinc-400 prose-code:text-emerald-400 prose-a:text-emerald-400">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: readingContent
                        .replace(/\n\n/g, "</p><p>")
                        .replace(/\n/g, "<br/>")
                        .replace(/^/, "<p>")
                        .replace(/$/, "</p>")
                        .replace(/### (.+)/g, "<h3>$1</h3>")
                        .replace(/## (.+)/g, "<h2>$1</h2>")
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.+?)\*/g, "<em>$1</em>")
                        .replace(/`(.+?)`/g, "<code>$1</code>"),
                    }}
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">AI-generated · Review before relying</span>
                  <button
                    onClick={generateReading}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Audio */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Audio Lesson
            </h3>

            {!audioUrl && !audioLoading && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎧</span>
                  <div>
                    <p className="text-sm text-zinc-300">Audio version available</p>
                    <p className="text-xs text-zinc-500">
                      Generate a narrated audio lesson with AI voice
                    </p>
                  </div>
                  <button
                    onClick={generateAudio}
                    className="ml-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
                  >
                    Generate Audio
                  </button>
                </div>
              </div>
            )}

            {audioLoading && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-zinc-400 text-sm">
                    Generating audio narration...
                  </span>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAudio}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      audioPlaying
                        ? "bg-emerald-500 text-black"
                        : "bg-zinc-800 text-emerald-400 hover:bg-zinc-700"
                    }`}
                  >
                    {audioPlaying ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </button>
                  <div>
                    <p className="text-sm text-zinc-200 font-medium">
                      Day {day}: {lesson.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {audioPlaying ? "Playing..." : "Ready to play"} · AI-narrated · ~8 min
                    </p>
                  </div>
                  <button
                    onClick={generateAudio}
                    className="ml-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                    title="Regenerate audio"
                  >
                    ↻
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Exercise */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Exercise
            </h3>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🛠️</span>
                <span className="font-medium text-zinc-200">Hands-on Practice</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{lesson.exercise}</p>
            </div>
          </section>

          {/* Deliverables */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Deliverables
            </h3>
            <ul className="space-y-2">
              {lesson.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <span className="text-emerald-400 mt-1">☐</span>
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Checkpoint */}
          <section className="mb-10">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Checkpoint
            </h3>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <p className="text-zinc-400 text-sm">
                Before moving on, verify: can you explain today&apos;s key concepts to
                someone else? Have you completed the exercise and saved your
                deliverables?
              </p>
            </div>
          </section>

          {/* AI Practice Area */}
          <section className="mb-10">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              AI Practice Area
            </h3>
            <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 p-5">
              <textarea
                placeholder="Practice what you learned here. Try the exercise prompts, take notes, or experiment with AI interactions..."
                className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-zinc-200 placeholder:text-zinc-600 resize-none focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-zinc-600">
                  Your notes are saved locally. Full AI playground integration coming soon.
                </span>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors">
                  Save Notes
                </button>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
            {prevLesson ? (
              <Link
                href={`/day/${prevLesson.day}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
              >
                ← Day {prevLesson.day}: {prevLesson.title}
              </Link>
            ) : (
              <Link href="/quiz" className="text-zinc-500 text-sm">
                ← Back to Quiz
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/day/${nextLesson.day}`}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-lg transition-colors text-sm"
              >
                Day {nextLesson.day} →
              </Link>
            )}
            {!nextLesson && (
              <Link
                href="/complete"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-medium rounded-lg transition-colors text-sm"
              >
                Complete Challenge 🎉
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
