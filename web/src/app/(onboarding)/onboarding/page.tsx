"use client";

import { Wallet, Key, Layers } from "lucide-react";
import { useState } from "react";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    if (!selectedRole) return;
    setLoading(true);
    // Here we would call a server action or API route to update the user's role in Prisma.
    // e.g. await updateUserRole(selectedRole);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-neutral-950">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How do you want to use KeyShare?</h1>
          <p className="text-xl text-neutral-400">You can always change this later or do both.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Renter Role */}
          <button 
            onClick={() => setSelectedRole("RENTER")}
            className={`text-left p-8 rounded-2xl border transition-all ${selectedRole === "RENTER" ? "bg-emerald-900/20 border-emerald-500 shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)]" : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"}`}
          >
            <Key className={`w-12 h-12 mb-6 ${selectedRole === "RENTER" ? "text-emerald-400" : "text-neutral-500"}`} />
            <h3 className="text-2xl font-bold mb-2">I want to Rent</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Find premium tools, software, and subscriptions for a fraction of the cost. Pay only for the time you need.
            </p>
          </button>

          {/* Provider Role */}
          <button 
            onClick={() => setSelectedRole("PROVIDER")}
            className={`text-left p-8 rounded-2xl border transition-all ${selectedRole === "PROVIDER" ? "bg-blue-900/20 border-blue-500 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]" : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"}`}
          >
            <Wallet className={`w-12 h-12 mb-6 ${selectedRole === "PROVIDER" ? "text-blue-400" : "text-neutral-500"}`} />
            <h3 className="text-2xl font-bold mb-2">I want to Provide</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Monetize your unused subscriptions securely. List your accounts, set your hours, and earn passive income.
            </p>
          </button>

          {/* Both Role */}
          <button 
            onClick={() => setSelectedRole("BOTH")}
            className={`text-left p-8 rounded-2xl border transition-all ${selectedRole === "BOTH" ? "bg-amber-900/20 border-amber-500 shadow-[0_0_30px_-10px_rgba(245,158,11,0.5)]" : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"}`}
          >
            <Layers className={`w-12 h-12 mb-6 ${selectedRole === "BOTH" ? "text-amber-400" : "text-neutral-500"}`} />
            <h3 className="text-2xl font-bold mb-2">I want to do Both</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Get full access to both renting and providing. The ultimate KeyShare experience.
            </p>
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            disabled={!selectedRole || loading}
            onClick={handleComplete}
            className="px-12 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold rounded-xl transition-all"
          >
            {loading ? "Setting up dashboard..." : "Complete Setup"}
          </button>
        </div>
      </div>
    </div>
  );
}