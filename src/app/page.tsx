import Link from "next/link";
import { getBrand } from "@/config";
import { getWeeks, getLessons } from "@/data/curriculum-loader";

export default function Home() {
  const brand = getBrand();
  const weeks = getWeeks();
  const lessons = getLessons();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 py-24 md:py-36 max-w-5xl mx-auto text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${brand.accentHex}08 0%, transparent 70%)`,
          }}
        />
        <div className="relative">
          <span
            className="inline-block px-3 py-1 text-xs font-mono tracking-wider rounded-full mb-6"
            style={{
              color: brand.accentHex,
              borderColor: `${brand.accentHex}30`,
              border: "1px solid",
            }}
          >
            {brand.quizTitle}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {brand.slogan.split("AI Operator").length > 1 ? (
              <>
                {brand.slogan.split("AI Operator")[0]}
                <span
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${brand.accentHex}, #22d3ee)`,
                  }}
                >
                  AI Operator
                </span>
                {brand.slogan.split("AI Operator")[1]}
              </>
            ) : (
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${brand.accentHex}, #22d3ee)`,
                }}
              >
                {brand.challengeName}
              </span>
            )}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            {brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="px-8 py-4 text-black font-semibold rounded-xl transition-colors text-lg hover:opacity-90"
              style={{ backgroundColor: brand.accentHex }}
            >
              {brand.ctaText}
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
          {brand.outcomeLabel}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brand.outcomes.map((o) => (
            <div
              key={o}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
            >
              <span style={{ color: brand.accentHex }} className="text-lg mr-2">✓</span>
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
          {brand.features.map((f) => (
            <div key={f.step} className="text-center p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center mx-auto mb-4 font-bold"
                style={{
                  backgroundColor: `${brand.accentHex}10`,
                  borderColor: `${brand.accentHex}30`,
                  color: brand.accentHex,
                }}
              >
                {f.step}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm">{f.desc}</p>
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
                    <span
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{
                        color: brand.accentHex,
                        backgroundColor: `${brand.accentHex}10`,
                      }}
                    >
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
                        className="text-xs px-2 py-1 rounded border border-zinc-700 hover:border-zinc-500 transition-colors"
                        style={{ color: brand.accentHex }}
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
              <h3 className="text-red-400 font-semibold mb-3">{brand.beforeAfter.beforeTitle}</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                {brand.beforeAfter.beforeItems.map((item) => (
                  <li key={item}>✗ {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ color: brand.accentHex }} className="font-semibold mb-3">
                {brand.beforeAfter.afterTitle}
              </h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                {brand.beforeAfter.afterItems.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to become an {brand.challengeName}?
        </h2>
        <p className="text-zinc-400 mb-8 text-lg">
          Join the 28-day challenge. No prior experience needed. Just 15 minutes a day.
        </p>
        <Link
          href="/quiz"
          className="inline-block px-10 py-4 text-black font-semibold rounded-xl transition-colors text-lg hover:opacity-90"
          style={{ backgroundColor: brand.accentHex }}
        >
          {brand.ctaText}
        </Link>
        <p className="text-zinc-600 text-sm mt-4">Free to start. Cancel anytime.</p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
        {brand.name} — {brand.slogan}
      </footer>
    </div>
  );
}
