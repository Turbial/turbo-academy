import { notFound } from "next/navigation";
import Link from "next/link";
import { getLessonByDay, getLessonsByWeek, weeks, lessons } from "@/data/curriculum";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: String(l.day) }));
}

export default function DayPage({ params }: { params: { id: string } }) {
  const day = parseInt(params.id, 10);
  const lesson = getLessonByDay(day);
  if (!lesson) notFound();

  const week = weeks[lesson.week - 1];
  const weekLessons = getLessonsByWeek(lesson.week);
  const prevLesson = day > 1 ? getLessonByDay(day - 1) : null;
  const nextLesson = day < 28 ? getLessonByDay(day + 1) : null;

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

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-800 bg-zinc-900/30 shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
            ← Turbo Academy
          </Link>
        </div>
        <div className="p-4 border-b border-zinc-800">
          <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
            WEEK {lesson.week}
          </span>
          <p className="text-sm text-zinc-300 mt-1 font-medium">{week.title}</p>
        </div>
        <nav className="flex-1 p-2">
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
              {l.day < day && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/" className="text-sm text-emerald-400">← Academy</Link>
          <span className="text-xs text-zinc-500">Day {day} of 28</span>
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
              <span className={`text-xs font-mono px-2 py-1 rounded border ${categoryColors[lesson.category]}`}>
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
            <h3 className="text-sm font-semibold text-emerald-400 mb-1">Today&apos;s Goal</h3>
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

          {/* Reading Material */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Reading Material
            </h3>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📖</span>
                <span className="text-sm text-zinc-400">Deep-dive guide</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Reading material for Day {day} will be generated based on this curriculum. 
                The full deep-dive content is served dynamically through the AI content pipeline.
              </p>
              <div className="mt-4 flex gap-3">
                <span className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  📖 Read (5-8 min)
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  🎧 Listen (8-12 min)
                </span>
              </div>
            </div>
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
                Before moving on, verify: can you explain today&apos;s key concepts to someone else? 
                Have you completed the exercise and saved your deliverables?
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
