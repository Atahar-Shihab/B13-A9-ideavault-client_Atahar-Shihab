"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "/";
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn.email({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (result.error) throw new Error(result.error.message || "Login failed");
      toast.success("Logged in successfully");
      router.push(from);
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: from,
      });
    } catch {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-stretch">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-white text-center max-w-sm">
          <div className="text-8xl mb-6 animate-float">💡</div>
          <h2 className="text-3xl font-extrabold mb-4">Welcome back to IdeaVault</h2>
          <p className="text-white/70 text-lg leading-relaxed">Your next big startup idea is one login away. Join thousands of innovators.</p>
          <div className="mt-10 flex flex-col gap-4">
            {["Share innovative startup ideas", "Get community feedback", "Discover trending concepts"].map((t) => (
              <div key={t} className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-base-100">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">IV</span>
              </div>
              <span className="font-extrabold text-lg gradient-text">IdeaVault</span>
            </Link>
            <h1 className="text-3xl font-extrabold mb-1">Sign in</h1>
            <p className="text-base-content/50">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="field-stack">
              <label>Email address</label>
              <input name="email" type="email" required placeholder="you@example.com"
                className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <div className="field-stack">
              <div className="flex items-center justify-between">
                <label>Password</label>
                <button type="button" className="text-xs text-primary hover:underline font-semibold">Forgot password?</button>
              </div>
              <input name="password" type="password" required placeholder="••••••••"
                className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <button type="submit" disabled={loading}
              className="btn w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold mt-2 h-12">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In →"}
            </button>
          </form>

          <div className="divider my-6 text-xs text-base-content/40">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="btn w-full rounded-xl bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 h-12 font-semibold"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <p className="text-center text-sm mt-8 text-base-content/60">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
