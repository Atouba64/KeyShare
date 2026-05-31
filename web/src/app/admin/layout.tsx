"use client";

import { LayoutDashboard, Users, ShieldAlert, CreditCard, LogOut, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex h-screen bg-neutral-950 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <Link href="/" className="text-xl font-bold text-amber-400">
            KeyShare <span className="text-white">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin" },
            { id: "users", label: "User Management", icon: Users, href: "/admin/users" },
            { id: "moderation", label: "Content Moderation", icon: ShieldAlert, href: "/admin/moderation" },
            { id: "financials", label: "Financials", icon: CreditCard, href: "/admin/financials" },
          ].map((item) => (
            <Link 
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active === item.id ? "bg-amber-500/10 text-amber-400" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Link>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 flex items-center justify-between px-6">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input type="text" placeholder="Search users, listings, or IDs..." className="w-full bg-neutral-950 border border-neutral-800 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-bold">Admin Console</div>
              <div className="text-xs text-neutral-500">Super User</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
