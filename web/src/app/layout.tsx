import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Key } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KeyShare | Unlock Premium Access for Pennies",
  description: "Securely rent premium subscriptions and software licenses by the hour or day. Or, monetize your unused accounts safely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-50 flex flex-col`}>
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
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-semibold rounded-lg transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="border-t border-neutral-800 bg-neutral-950 py-12 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400 mb-4">
                <Key className="w-6 h-6" />
                <span>KeyShare</span>
              </Link>
              <p className="text-sm text-neutral-400">
                The secure bridge for sharing and monetizing premium subscriptions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-200 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="/marketplace" className="hover:text-emerald-400">Browse Marketplace</Link></li>
                <li><Link href="/list-account" className="hover:text-emerald-400">Become a Provider</Link></li>
                <li><Link href="/dashboard" className="hover:text-emerald-400">My Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-200 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="/use-cases" className="hover:text-emerald-400">Use Cases</Link></li>
                <li><Link href="/how-it-works" className="hover:text-emerald-400">How it Works</Link></li>
                <li><Link href="/extension" className="hover:text-emerald-400">Browser Extension</Link></li>
                <li><Link href="/api-docs" className="hover:text-emerald-400">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-200 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
                <li><Link href="/security" className="hover:text-emerald-400">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-neutral-800 text-sm text-neutral-500 text-center">
            © {new Date().getFullYear()} KeyShare Online. All rights reserved. Built for the gig economy.
          </div>
        </footer>
      </body>
    </html>
  );
}