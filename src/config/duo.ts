import type { BrandConfig } from "./types";

const duo: BrandConfig = {
  name: "Duo Academy",
  domain: "duo.academy",
  slogan: "Build Your Relationship with AI",
  description:
    "A 28-day guided journey to strengthen your marriage using AI as your relationship assistant. Conversation guides, date planning, and personalized insights — designed for couples.",
  outcomeLabel: "By Day 28, You'll Be Able To",
  outcomes: [
    "Have deeper, more meaningful conversations with your partner",
    "Use AI to understand relationship patterns and dynamics",
    "Create personalized date nights and shared experiences",
    "Navigate difficult conversations with confidence",
    "Build shared goals and a relationship roadmap",
    "Transform AI into your relationship coach and assistant",
  ],
  quizTitle: "28-DAY DUO CHALLENGE",
  challengeName: "Duo Creator",
  challengeEmoji: "💑",
  accentColor: "rose",
  accentHex: "#f43f5e",
  logo: "💑",
  ctaText: "Start Your Journey →",
  beforeAfter: {
    beforeTitle: "Before Duo Academy",
    beforeItems: [
      "Conversations feel surface-level or repetitive",
      "AI tools seem irrelevant to relationships",
      "Date nights default to Netflix and takeout",
      "Hard to break out of old communication patterns",
      "No framework for growing together intentionally",
    ],
    afterTitle: "After Duo Academy",
    afterItems: [
      "Daily conversation prompts that spark real connection",
      "AI-powered insights into your relationship patterns",
      "Creative, personalized date plans at your fingertips",
      "Tools for navigating conflict with empathy",
      "A shared vision and roadmap for your future together",
    ],
  },
  features: [
    { step: "1", title: "Take the Quiz", desc: "Share your relationship goals. We personalize your journey." },
    { step: "2", title: "Daily Prompts", desc: "5-15 min per day. Conversation starters, reflections, and practical exercises for couples." },
    { step: "3", title: "Grow Together", desc: "Every day builds connection. By Day 28, you have new habits and deeper understanding." },
    { step: "4", title: "Earn Your Certificate", desc: "Complete the challenge. Get certified as a Duo Creator." },
  ],
};

export default duo;
