"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pw)) return "Password must include at least one uppercase letter";
    if (!/[a-z]/.test(pw)) return "Password must include at least one lowercase letter";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const password = e.target.password.value;

    const pwError = validatePassword(password);
    if (pwError) return toast.error(pwError);

    setLoading(true);
    try {
      const result = await signUp.email({
        name,
        email,
        password,
        photoURL,
        image: photoURL,
      });
      if (result.error) throw new Error(result.error.message || "Registration failed");
      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-stretch">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 items-center justify-center p-16 relative overflow-hidden order-last">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-white text-center max-w-sm">
          <div className="text-8xl mb-6 animate-float">🚀</div>
          <h2 className="text-3xl font-extrabold mb-4">Start Your Innovation Journey</h2>
          <p className="text-white/70 text-lg leading-relaxed">Join a community of builders, dreamers, and entrepreneurs turning ideas into startups.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[["1,200+", "Ideas"], ["4,800+", "Members"], ["15K+", "Comments"], ["Free", "Always"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="text-2xl font-extrabold">{v}</div>
                <div className="text-white/60 text-xs mt-1">{l}</div>
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
            <h1 className="text-3xl font-extrabold mb-1">Create account</h1>
            <p className="text-base-content/50">Join thousands of innovators today — it's free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="field-stack">
              <label>Full Name <span className="text-error">*</span></label>
              <input name="name" type="text" required placeholder="John Doe"
                className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <div className="field-stack">
              <label>Email address <span className="text-error">*</span></label>
              <input name="email" type="email" required placeholder="you@example.com"
                className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <div className="field-stack">
              <label>Photo URL <span className="text-base-content/40 font-normal">(optional)</span></label>
              <input name="photoURL" type="url" placeholder="https://..."
                className="input input-bordered rounded-xl w-full focus:input-primary" />
            </div>
            <div className="field-stack">
              <label>Password <span className="text-error">*</span></label>
              <input name="password" type="password" required placeholder="Min 6 chars"
                className="input input-bordered rounded-xl w-full focus:input-primary" />
              <span className="hint">At least 6 characters with uppercase and lowercase</span>
            </div>
            <button type="submit" disabled={loading}
              className="btn w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-bold h-12 mt-2">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account →"}
            </button>
          </form>

          <div className="divider my-6 text-xs text-base-content/40">OR CONTINUE WITH</div>

          <button onClick={handleGoogle} disabled={googleLoading}
            className="btn w-full rounded-xl bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 h-12 font-semibold">
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
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
