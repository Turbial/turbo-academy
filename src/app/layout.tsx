import type { Metadata } from "next";
import { getBrand, getBrandKey } from "@/config";
import "./globals.css";

const brand = getBrand();

export const metadata: Metadata = {
  title: `${brand.name} — 28 Days to Become an ${brand.challengeName}`,
  description: brand.description,
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
