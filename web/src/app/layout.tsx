import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Key } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KeyShare | Unlock Premium Access for Pennies",
  description: "Securely rent premium subscriptions and software licenses by the hour or day. Or, monetize your unused accounts safely.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-50 flex flex-col`}>
        <Navbar user={session?.user ?? null} />
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="border-t border-neutral-800 bg-neutral-950 py-12 mt-12 text-center sm:text-left">
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
            <div className="flex flex-col items-center sm:items-start">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400 mb-4">
                <Key className="w-6 h-6" />
                <span>KeyShare</span>
              </Link>
              <p className="text-sm text-neutral-400 max-w-[250px]">
                The secure bridge for sharing and monetizing premium subscriptions.
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="font-semibold text-neutral-200 mb-4">Platform</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link href="/marketplace" className="hover:text-emerald-400">Browse Marketplace</Link></li>
                <li><Link href="/list-account" className="hover:text-emerald-400">Become a Provider</Link></li>
                <li><Link href="/dashboard" className="hover:text-emerald-400">My Dashboard</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="font-semibold text-neutral-200 mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link href="/use-cases" className="hover:text-emerald-400">Use Cases</Link></li>
                <li><Link href="/how-it-works" className="hover:text-emerald-400">How it Works</Link></li>
                <li><Link href="/extension" className="hover:text-emerald-400">Browser Extension</Link></li>
                <li><Link href="/api-docs" className="hover:text-emerald-400">API Documentation</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="font-semibold text-neutral-200 mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
                <li><Link href="/security" className="hover:text-emerald-400">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-neutral-800 text-sm text-neutral-500 text-center">
            © {new Date().getFullYear()} KeyShare Online. All rights reserved. Built for the gig economy.
          </div>
        </footer>
      </body>
    </html>
  );
}