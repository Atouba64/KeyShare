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
      <input type="hidden" name="connectionType" value="Browser Session (Extension)" />

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="platformName" className="block text-sm font-medium text-neutral-300 mb-2">What are you sharing?</label>
        <input
          id="platformName"
          name="platformName"
          required
          type="text"
          placeholder="e.g., Midjourney Pro, SEMrush, Netflix Premium"
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
          <select id="category" name="category" required defaultValue="Other" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-neutral-300">
            <option>Generative AI</option>
            <option>Dev Tools</option>
            <option>E-Learning</option>
            <option>Business Data</option>
            <option>Streaming</option>
            <option>Design</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-300 mb-2">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <input
              id="price"
              name="price"
              required
              type="number"
              min="0.01"
              step="0.01"
              placeholder="5.00"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="priceUnit" className="block text-sm font-medium text-neutral-300 mb-2">Rental period</label>
        <select id="priceUnit" name="priceUnit" required defaultValue="Day" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-neutral-300">
          <option>Hour</option>
          <option>Day</option>
          <option>Weekend (48h)</option>
          <option>Week</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-neutral-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Publishing..." : "Publish to marketplace"}
        </button>
      </div>
    </form>
  );
}
