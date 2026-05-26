import Link from "next/link";
import { weeks, lessons } from "@/data/curriculum";

export default function Home() {
  const outcomes = [
    "Use ChatGPT, Claude, Gemini & Grok like a pro",
    "Generate reports, content, and analysis on demand",
    "Build automations that work while you sleep",
    "Connect APIs and create workflows without code",
    "Design and deploy your own AI agents",
    "Understand how AI businesses operate — and build one",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 py-24 md:py-36 max-w-5xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative">
          <span className="inline-block px-3 py-1 text-xs font-mono tracking-wider text-emerald-400 border border-emerald-500/20 rounded-full mb-6">
            28-DAY CHALLENGE
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Become an{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              AI Operator
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Not another &ldquo;learn ChatGPT&rdquo; course. This is 28 days of
            building real AI skills — tools, automation, agents, and your own
            AI-powered business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-lg"
            >
              Start the Challenge →
            </Link>
            <Link
              href="#curriculum"
              className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded-xl transition-colors text-lg"
            >
              See the Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          By Day 28, You&apos;ll Be Able To
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((o) => (
            <div
              key={o}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/30 transition-colors"
            >
              <span className="text-emerald-400 text-lg mr-2">✓</span>
              <span className="text-zinc-300">{o}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Take the Quiz", desc: "Tell us your goals. We personalize your challenge." },
            { step: "2", title: "Daily Lessons", desc: "5-15 min per day. Read, listen, or both — always with a practical exercise." },
            { step: "3", title: "Build & Ship", desc: "Every day has a deliverable. By Day 28, you have a portfolio of real work." },
            { step: "4", title: "Earn Your Certificate", desc: "Complete the challenge. Get certified as an AI Operator." },
          ].map((s) => (
            <div key={s.step} className="text-center p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400 font-bold">
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-zinc-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          The 28-Day Curriculum
        </h2>
        <p className="text-zinc-500 text-center mb-12 max-w-xl mx-auto">
          Four weeks of progressive learning — from AI fundamentals to building your own AI-powered business.
        </p>
        <div className="space-y-4">
          {weeks.map((week) => {
            const weekLessons = lessons.filter((l) => l.week === week.number);
            return (
              <div key={week.number} className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="shrink-0">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      WEEK {week.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{week.title}</h3>
                    <p className="text-zinc-500 text-sm">{week.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {weekLessons.map((l) => (
                      <Link
                        key={l.day}
                        href={`/day/${l.day}`}
                        className="text-xs px-2 py-1 rounded border border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                      >
                        Day {l.day}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Before/After */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-red-400 font-semibold mb-3">Before Turbo Academy</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>✗ Overwhelmed by AI tools — don&apos;t know where to start</li>
                <li>✗ Using ChatGPT for basic Q&A only</li>
                <li>✗ No automation or workflow skills</li>
                <li>✗ AI feels like a toy, not a business tool</li>
                <li>✗ No idea how AI businesses actually work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3">After Turbo Academy</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>✓ Confidently use 5+ AI tools for different tasks</li>
                <li>✓ Generate professional content, code, and analysis</li>
                <li>✓ Build automated workflows with APIs and no-code tools</li>
                <li>✓ Design and deploy multi-agent AI systems</li>
                <li>✓ Ready to build or operate an AI-powered business</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to become an AI Operator?
        </h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Join the 28-day challenge. No prior experience needed. Just 15 minutes a day.
        </p>
        <Link
          href="/quiz"
          className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-lg"
        >
          Start the Challenge →
        </Link>
        <p className="text-zinc-600 text-sm mt-4">
          Free to start. Cancel anytime.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
        Turbo Academy — 28 Days to Build Your AI Workforce
      </footer>
    </div>
  );
}
