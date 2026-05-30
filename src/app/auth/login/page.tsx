"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getBrand } from "@/config";

export default function LoginPage() {
  const brand = getBrand();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
      if (s) router.push("/");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) router.push("/");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMagicLinkSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // On success the auth listener will redirect
      }
    } catch (e: any) {
      setError(e.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (e: any) {
      setError(e.message || "Google sign-in failed");
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      setMagicLinkSent(true);
    } catch (e: any) {
      setError(e.message || "Failed to send magic link");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h1 className="text-2xl font-bold text-white mb-3">Check Your Email</h1>
          <p className="text-zinc-400 mb-6">
            We&apos;ve sent a magic link to <strong className="text-zinc-200">{email}</strong>.
            Click the link to sign in.
          </p>
          <button
            onClick={() => setMagicLinkSent(false)}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">{brand.logo}</div>
          <h1 className="text-xl font-bold text-white">{brand.name}</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to continue your journey</p>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl px-6 py-3 font-medium transition-colors mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-xs text-zinc-600">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-zinc-500 mb-1.5 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-zinc-500 mb-1.5 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-medium transition-all text-sm"
            style={{
              backgroundColor: brand.accentHex,
              color: "#000",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
            }}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {/* Magic Link */}
        <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
          <button
            onClick={handleMagicLink}
            disabled={!email || submitting}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-40"
          >
            Send magic link to {email || "your email"}
          </button>
        </div>
      </div>
    </div>
  );
}
