"use client";

import { Activity, Users, DollarSign, AlertCircle } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Platform Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-4">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Total Users</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12,482</div>
          <div className="text-xs text-amber-400 font-medium">+124 this week</div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-4">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Active Rentals</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3,892</div>
          <div className="text-xs text-amber-400 font-medium">+42 today</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 text-neutral-400 mb-4">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium">GMV (30d)</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$48,205</div>
          <div className="text-xs text-amber-400 font-medium">Platform Fee: $4,820</div>
        </div>

        <div className="bg-neutral-900 border border-amber-500/30 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="w-16 h-16 text-amber-500" />
          </div>
          <div className="flex items-center gap-3 text-amber-500 mb-4 relative z-10">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Flagged Sessions</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1 relative z-10">14</div>
          <div className="text-xs text-neutral-400 font-medium relative z-10">Requires manual review</div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-bold mb-4 mt-12">Live Platform Activity</h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Event</th>
              <th className="px-6 py-4 font-medium">User / IP</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {[
              { time: "Just now", event: "New Rental: Midjourney Pro", user: "alex_dev (US)", status: "Active" },
              { time: "2 mins ago", event: "Payout Processed: $42.50", user: "sarah_w (UK)", status: "Completed" },
              { time: "15 mins ago", event: "Session Flagged: Geo-mismatch", user: "mike_r (RU -> US)", status: "Suspended" },
              { time: "1 hr ago", event: "New Listing: Enterprise Learning", user: "agency_dev99", status: "Active" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 text-neutral-400">{row.time}</td>
                <td className="px-6 py-4 font-medium">{row.event}</td>
                <td className="px-6 py-4 text-neutral-300">{row.user}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    row.status === "Active" || row.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
