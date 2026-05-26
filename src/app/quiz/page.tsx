"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TOTAL_STEPS = 7;

const questions = [
  {
    title: "How would you describe yourself?",
    subtitle: "We'll personalize your challenge based on your answers",
    options: [
      { label: "I work for a company", icon: "🏢" },
      { label: "I work for myself", icon: "🚀" },
      { label: "I'm exploring / between roles", icon: "🧭" },
    ],
  },
  {
    title: "What's your experience with AI?",
    subtitle: "Be honest — we meet you where you are",
    options: [
      { label: "Complete beginner — never used AI", icon: "🌱" },
      { label: "I've tried ChatGPT a few times", icon: "🔰" },
      { label: "Comfortable user — use AI weekly", icon: "⚡" },
      { label: "Power user — I use multiple AI tools daily", icon: "🔥" },
    ],
  },
  {
    title: "What do you want to achieve?",
    subtitle: "Pick your primary goal",
    options: [
      { label: "Career growth — stand out at work", icon: "📈" },
      { label: "Build automations — make AI work for me", icon: "🤖" },
      { label: "Start an AI business", icon: "🏗️" },
      { label: "Understand AI deeply", icon: "🧠" },
      { label: "Self-improvement / curiosity", icon: "✨" },
    ],
  },
  {
    title: "How much time can you commit daily?",
    subtitle: "We'll pace your challenge accordingly",
    options: [
      { label: "10 minutes / day", icon: "☕" },
      { label: "15 minutes / day", icon: "⏱️" },
      { label: "20+ minutes / day", icon: "🚀" },
    ],
  },
  {
    title: "What's your biggest barrier right now?",
    subtitle: "We'll help you push through it",
    options: [
      { label: "Too many AI tools — don't know where to start", icon: "🌊" },
      { label: "Tried AI but didn't get good results", icon: "😤" },
      { label: "No time to learn", icon: "⏰" },
      { label: "Not sure AI is actually useful for me", icon: "🤔" },
      { label: "I'm ready — just need a structured path", icon: "🎯" },
    ],
  },
  {
    title: "How do you learn best?",
    subtitle: "We'll optimize your experience",
    options: [
      { label: "Reading — give me text", icon: "📖" },
      { label: "Listening — audio is my thing", icon: "🎧" },
      { label: "Doing — let me practice immediately", icon: "🛠️" },
      { label: "Mix it up — variety keeps me engaged", icon: "🎨" },
    ],
  },
  {
    title: "What would make this worth it for you?",
    subtitle: "Setting goals and rewards keeps you motivated",
    options: [
      { label: "Getting a promotion or new job", icon: "💼" },
      { label: "Building something that makes money", icon: "💰" },
      { label: "Saving hours every week through automation", icon: "⏳" },
      { label: "Finally understanding how AI works", icon: "💡" },
      { label: "Bragging rights — I want to be the AI person", icon: "🏆" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(TOTAL_STEPS).fill(""));
  const [showSummary, setShowSummary] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const router = useRouter();

  const q = questions[step];

  const handleSelect = (label: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = label;
    setAnswers(newAnswers);

    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      setShowMagic(true);
      // Simulate the "creating your challenge" experience
      setTimeout(() => {
        setShowMagic(false);
        setShowSummary(true);
      }, 2500);
    }
  };

  // Magic loading page
  if (showMagic) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-2xl animate-pulse">⚙️</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Creating Your Personal Challenge...</h2>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full animate-pulse" style={{ width: "75%" }} />
            </div>
          </div>
          <p className="text-zinc-500 text-sm">
            Tailoring your 28-day curriculum based on your goals and experience level.
          </p>
        </div>
      </div>
    );
  }

  // Summary page (after quiz)
  if (showSummary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <span className="inline-block text-5xl mb-4">🎯</span>
            <h2 className="text-2xl font-bold mb-3">Your Personal Summary</h2>
            <p className="text-zinc-400 mb-6">
              Based on your answers, you&apos;re ready to{" "}
              <strong className="text-emerald-400">
                {answers[2]?.toLowerCase() || "level up"}
              </strong>
              . Your current barrier is{" "}
              <strong className="text-amber-400">
                {answers[4]?.toLowerCase() || "getting started"}
              </strong>
              , but your potential is high.
            </p>
            <div className="flex gap-4 justify-center mb-8">
              <div className="text-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="text-sm text-zinc-500 mb-1">AI Experience</div>
                <div className="text-lg font-bold text-amber-400">
                  {answers[1]?.includes("beginner")
                    ? "Beginner"
                    : answers[1]?.includes("few times")
                    ? "Exploring"
                    : answers[1]?.includes("Comfortable")
                    ? "Intermediate"
                    : "Advanced"}
                </div>
              </div>
              <div className="text-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="text-sm text-zinc-500 mb-1">Potential</div>
                <div className="text-lg font-bold text-emerald-400">85%</div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 rounded-xl border border-zinc-800 p-6 mb-8 text-left">
            <h3 className="font-semibold text-emerald-400 mb-2">Your Personal 28-Day Challenge</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We expect you to complete the AI Operator certification by{" "}
              <strong className="text-zinc-200">
                {new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </strong>
            </p>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Daily time commitment: <strong className="text-zinc-200">{answers[3] || "15 min"}</strong></li>
              <li>• Learning style: <strong className="text-zinc-200">{answers[5] || "Varied"}</strong></li>
              <li>• Motivation: <strong className="text-zinc-200">{answers[6] || "Building something real"}</strong></li>
            </ul>
          </div>

          <Link
            href="/day/1"
            className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors text-lg"
          >
            Start Day 1 →
          </Link>
        </div>
      </div>
    );
  }

  // Quiz question
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back
        </Link>
        <div className="text-sm text-zinc-500">
          {step + 1} / {TOTAL_STEPS}
        </div>
        <div className="w-16" /> {/* spacer */}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-900 h-1">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{q.title}</h2>
          <p className="text-zinc-500 mb-8">{q.subtitle}</p>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className="w-full text-left p-4 rounded-xl border border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all flex items-center gap-3 group"
              >
                <span className="text-xl">{opt.icon}</span>
                <span className="text-zinc-200 group-hover:text-white">{opt.label}</span>
                <span className="ml-auto text-zinc-600 group-hover:text-emerald-400">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
