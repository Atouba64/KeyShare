"use client";

import Link from "next/link";
import { Key, Menu, X } from "lucide-react";
import { useState } from "react";
import { logoutUser } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/auth";

export default function Navbar({ user }: { user: SessionUser | null }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await logoutUser();
  }

  const authLinks = user ? (
    <>
      <Link href="/dashboard" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
        Dashboard
      </Link>
      {user.role === "ADMIN" && (
        <Link href="/admin" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
          Admin
        </Link>
      )}
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
      >
        Sign Out
      </button>
    </>
  ) : (
    <>
      <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
        Sign In
      </Link>
      <Link href="/register" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-semibold rounded-lg transition-colors">
        Get Started
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400">
          <Key className="w-6 h-6" />
          <span>KeyShare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link>
          <Link href="/use-cases" className="hover:text-emerald-400 transition-colors">Use Cases</Link>
          <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How it Works</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">{authLinks}</div>

        <button
          type="button"
          className="md:hidden text-neutral-300 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-neutral-950/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-start pt-12 space-y-8 px-6 h-[calc(100vh-64px)] overflow-y-auto">
          <Link href="/marketplace" className="text-2xl text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Marketplace</Link>
          <Link href="/use-cases" className="text-2xl text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Use Cases</Link>
          <Link href="/how-it-works" className="text-2xl text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>How it Works</Link>

          <div className="w-16 h-px bg-neutral-800 my-4" />

          {user ? (
            <>
              <Link href="/dashboard" className="text-2xl text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-2xl text-amber-400 hover:text-amber-300 font-medium" onClick={() => setIsOpen(false)}>Admin</Link>
              )}
              <button type="button" onClick={handleLogout} className="text-2xl text-neutral-300 hover:text-red-400 font-medium">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-2xl text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link href="/register" className="w-full max-w-xs py-4 text-center bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xl rounded-xl mt-4 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
