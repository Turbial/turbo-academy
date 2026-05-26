// Brand configuration for Academy Engine
// Multi-tenant: one codebase → multiple brands via NEXT_PUBLIC_ACADEMY_BRAND env var

export interface BrandConfig {
  name: string;            // "Turbo Academy" / "Duo Academy"
  domain: string;          // "meetturbo.com" / "duo.academy"
  slogan: string;          // Hero headline
  description: string;     // Hero subtext
  outcomeLabel: string;    // "By Day 28, You'll Be Able To"
  outcomes: string[];
  quizTitle: string;       // "28-DAY AI CHALLENGE" / "28-DAY DUO CHALLENGE"
  challengeName: string;   // "AI Operator" / "Duo Creator"
  challengeEmoji: string;  // "🤖" / "💑"
  accentColor: string;     // Tailwind accent class: "emerald" / "rose" / etc.
  accentHex: string;       // Hex: "#00ff88" / "#ff4d6a"
  logo: string;            // Emoji or text logo
  ctaText: string;         // "Start the Challenge →"
  beforeAfter: {
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };
  features: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export type AcademyBrand = "turbo" | "duo";

export const BRAND = (process.env.NEXT_PUBLIC_ACADEMY_BRAND || "turbo") as AcademyBrand;
