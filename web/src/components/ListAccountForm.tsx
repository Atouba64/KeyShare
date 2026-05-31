"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { createListing } from "@/app/actions/listings";

export default function ListAccountForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createListing(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="platformName" className="block text-sm font-medium text-neutral-300 mb-2">Platform / Service Name</label>
        <input id="platformName" name="platformName" required type="text" placeholder="e.g., Midjourney Pro, Pluralsight Enterprise" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">Description (optional)</label>
        <textarea id="description" name="description" rows={3} placeholder="What's included? Any usage limits?" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
          <select id="category" name="category" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-neutral-300">
            <option>E-Learning</option>
            <option>Generative AI</option>
            <option>Dev Tools</option>
            <option>Streaming</option>
            <option>Business Data</option>
            <option>Design</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="connectionType" className="block text-sm font-medium text-neutral-300 mb-2">Connection Method</label>
          <select id="connectionType" name="connectionType" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-neutral-300">
            <option>Browser Session (Extension)</option>
            <option>API Wrapper</option>
            <option>License Key / Seat</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Pricing</label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <input name="price" required type="number" min="0.01" step="0.01" placeholder="0.00" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <span className="text-neutral-500 text-center sm:text-left">per</span>
          <select name="priceUnit" required className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-neutral-300">
            <option>Hour</option>
            <option>Day</option>
            <option>Weekend (48h)</option>
            <option>Week</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Publishing..." : "Publish Listing"}
        </button>
        <p className="text-xs text-center text-neutral-500 mt-4">
          By listing, you agree to our Terms of Service regarding account sharing compliance.
        </p>
      </div>
    </form>
  );
}
