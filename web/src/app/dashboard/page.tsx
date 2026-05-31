"use client";

import { Activity, CreditCard, Key, Settings, User, LogOut, ArrowUpRight, ArrowDownRight, Clock, Cpu, Code } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r border-neutral-800 bg-neutral-900/50 p-4 flex flex-col">
        <div className="flex items-center gap-3 p-4 mb-6 border-b border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
            JD
          </div>
          <div>
            <div className="font-bold text-sm">John Doe</div>
            <div className="text-xs text-neutral-500">Pro Provider</div>
          </div>
        </div>

        <nav className="flex-1 flex overflow-x-auto md:flex-col gap-2 md:gap-1 pb-2 md:pb-0 hide-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "rentals", label: "Active Rentals", icon: Clock },
            { id: "listings", label: "My Listings", icon: Key },
            { id: "earnings", label: "Earnings", icon: CreditCard },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === item.id 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-4 md:mt-auto pt-4 border-t border-neutral-800">
          <button className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, John!</h1>
              <p className="text-sm md:text-base text-neutral-400">Here's what's happening with your accounts today.</p>
            </div>
            <Link href="/list-account" className="w-full sm:w-auto text-center px-4 py-3 sm:py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_-5px_rgba(16,185,129,0.4)]">
              + New Listing
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                Total Earnings
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$342.50</div>
              <div className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +12% from last month
              </div>
            </div>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                Active Rentals (Providing)
                <Key className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-neutral-500 text-xs">Generating $18.50 today</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                Active Rentals (Using)
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1</div>
              <div className="text-red-400 text-xs font-medium flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> 4h 12m remaining
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Providing */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="font-bold">Currently Providing</h3>
                <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">3 Active</span>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-neutral-800">
                  {[
                    { name: "Midjourney Pro", user: "alex_dev", time: "2h 45m left", price: "$5.00" },
                    { name: "Enterprise Learning", user: "sarah_w", time: "1d 4h left", price: "$12.00" },
                    { name: "ChatGPT Plus", user: "mike_r", time: "45m left", price: "$2.50" },
                  ].map((item, i) => (
                    <li key={i} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-neutral-800/50 transition-colors cursor-pointer gap-3 sm:gap-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-white">{item.name}</div>
                          <div className="text-xs text-neutral-500">Rented by @{item.user}</div>
                        </div>
                      </div>
                      <div className="flex sm:block justify-between items-center sm:text-right border-t sm:border-0 border-neutral-800/50 pt-2 sm:pt-0">
                        <div className="text-sm font-bold text-emerald-400">+{item.price}</div>
                        <div className="text-xs text-neutral-500">{item.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Renting */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="font-bold">Currently Renting</h3>
                <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">1 Active</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-white">JetBrains CLion</div>
                    <div className="text-xs text-neutral-400">Provider: @agency_dev99</div>
                  </div>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-400">Time Remaining</span>
                    <span className="font-medium text-white">4h 12m 30s</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-1 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-[65%]"></div>
                  </div>
                  <div className="text-[10px] text-neutral-500 text-right">Expires at 8:00 PM EST</div>
                </div>

                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors border border-neutral-700">
                    Extend Time
                  </button>
                  <button className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg transition-colors border border-emerald-500/30">
                    Launch Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
