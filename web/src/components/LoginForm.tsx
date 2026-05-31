"use client";

import { Key } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/app/actions/auth";
import { safeNextPath } from "@/lib/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-emerald-400 mb-6">
            <Key className="w-8 h-8" />
            <span>KeyShare</span>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-neutral-400">Sign in to rent or list resources.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="next" value={next} />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
              <input id="email" name="email" required type="email" placeholder="you@example.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
              <input id="password" name="password" required type="password" placeholder="••••••••" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-neutral-950 font-bold rounded-xl transition-all flex items-center justify-center">
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-neutral-400">
            New here?{" "}
            <Link href={`/register?next=${encodeURIComponent(next)}`} className="text-emerald-400 hover:text-emerald-300 font-medium">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
