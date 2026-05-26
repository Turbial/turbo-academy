import type { BrandConfig } from "./types";

const turbo: BrandConfig = {
  name: "Turbo Academy",
  domain: "meetturbo.com",
  slogan: "Become an AI Operator",
  description:
    "Not another \"learn ChatGPT\" course. This is 28 days of building real AI skills — tools, automation, agents, and your own AI-powered business.",
  outcomeLabel: "By Day 28, You'll Be Able To",
  outcomes: [
    "Use ChatGPT, Claude, Gemini & Grok like a pro",
    "Generate reports, content, and analysis on demand",
    "Build automations that work while you sleep",
    "Connect APIs and create workflows without code",
    "Design and deploy your own AI agents",
    "Understand how AI businesses operate — and build one",
  ],
  quizTitle: "28-DAY AI CHALLENGE",
  challengeName: "AI Operator",
  challengeEmoji: "🤖",
  accentColor: "emerald",
  accentHex: "#10b981",
  logo: "⚡",
  ctaText: "Start the Challenge →",
  beforeAfter: {
    beforeTitle: "Before Turbo Academy",
    beforeItems: [
      "Overwhelmed by AI tools — don't know where to start",
      "Using ChatGPT for basic Q&A only",
      "No automation or workflow skills",
      "AI feels like a toy, not a business tool",
      "No idea how AI businesses actually work",
    ],
    afterTitle: "After Turbo Academy",
    afterItems: [
      "Confidently use 5+ AI tools for different tasks",
      "Generate professional content, code, and analysis",
      "Build automated workflows with APIs and no-code tools",
      "Design and deploy multi-agent AI systems",
      "Ready to build or operate an AI-powered business",
    ],
  },
  features: [
    { step: "1", title: "Take the Quiz", desc: "Tell us your goals. We personalize your challenge." },
    { step: "2", title: "Daily Lessons", desc: "5-15 min per day. Read, listen, or both — always with a practical exercise." },
    { step: "3", title: "Build & Ship", desc: "Every day has a deliverable. By Day 28, you have a portfolio of real work." },
    { step: "4", title: "Earn Your Certificate", desc: "Complete the challenge. Get certified as an AI Operator." },
  ],
};

export default turbo;
