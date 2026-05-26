import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Turbo Academy — 28 Days to Become an AI Operator",
  description: "Master AI tools, automate work, build workflows, and create AI-powered businesses. A 28-day challenge to transform from AI user to AI operator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
