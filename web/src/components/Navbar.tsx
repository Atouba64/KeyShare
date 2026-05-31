"use client";

import Link from "next/link";
import { Key, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400">
          <Key className="w-6 h-6" />
          <span>KeyShare</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link>
          <Link href="/use-cases" className="hover:text-emerald-400 transition-colors">Use Cases</Link>
          <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How it Works</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-semibold rounded-lg transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-300 hover:text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-6 space-y-4 absolute w-full shadow-2xl">
          <Link href="/marketplace" className="block text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Marketplace</Link>
          <Link href="/use-cases" className="block text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Use Cases</Link>
          <Link href="/how-it-works" className="block text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>How it Works</Link>
          <hr className="border-neutral-800 my-4" />
          <Link href="/login" className="block text-neutral-300 hover:text-emerald-400 font-medium" onClick={() => setIsOpen(false)}>Sign In</Link>
          <Link href="/register" className="block w-full py-3 text-center bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg mt-2" onClick={() => setIsOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
