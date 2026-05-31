import { Metadata } from "next";
import { ShieldCheck, Network, Cookie, FileLock2, Link as LinkIcon, LockKeyhole } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | KeyShare Security",
  description: "Learn how KeyShare uses session proxying and secure API wrappers to safely share premium accounts.",
};

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
          The Technical Reality Check
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How we actually build the <span className="text-emerald-400">Bridge.</span></h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          To make KeyShare a reality, we can't just have people text their passwords to strangers—that leads to stolen accounts, changed passwords, and banned users. Here is how we keep it secure.
        </p>
      </div>

      <div className="space-y-12">
        {/* Step 1 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cookie className="w-48 h-48 text-emerald-500" />
          </div>
          <div className="flex gap-6 relative z-10">
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20 mb-4 shrink-0">
                1
              </div>
              <div className="w-px h-full bg-neutral-800"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Browser Extension & Session Sharing
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                The seller logs in on their own machine normally. The KeyShare browser extension copies the <strong>encrypted session cookies</strong> (never the password). When the buyer wants to use it, KeyShare temporarily injects those cookies into the buyer’s browser within an isolated container. 
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-start gap-4">
                <LockKeyhole className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <p className="text-sm text-neutral-400">
                  <strong className="text-neutral-200">The Result:</strong> The buyer gets logged in securely without ever seeing the seller's password. Once the time limit expires, the extension invalidates the cookie locally, instantly revoking access.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Network className="w-48 h-48 text-emerald-500" />
          </div>
          <div className="flex gap-6 relative z-10">
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20 mb-4 shrink-0">
                2
              </div>
              <div className="w-px h-full bg-neutral-800"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                API Wrappers for AI & Tools
                <LinkIcon className="w-5 h-5 text-emerald-500" />
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                For AI tools (like ChatGPT API, Midjourney, or Cloud Providers), KeyShare acts as a middleman. We hold the developer API key on our secure backend and build a simple interface for the buyer.
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-start gap-4">
                <FileLock2 className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <p className="text-sm text-neutral-400">
                  <strong className="text-neutral-200">The Result:</strong> The buyer pays KeyShare per prompt or per hour of compute. KeyShare forwards the request, returns the result, and pays the seller for their unused monthly API quotas without exposing the raw API key.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-48 h-48 text-emerald-500" />
          </div>
          <div className="flex gap-6 relative z-10">
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold border border-emerald-500/20 mb-4 shrink-0">
                3
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Terms of Service (ToS) Navigation & Proxying
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                Many platforms forbid account sharing. KeyShare utilizes a robust framework and clever IP proxying to ensure accounts aren't flagged for simultaneous logins from two different sides of the world.
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-start gap-4">
                <Network className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <p className="text-sm text-neutral-400">
                  <strong className="text-neutral-200">The Result:</strong> We route traffic through localized residential proxies. If the seller is in New York, the buyer's injected session traffic also routes through New York, keeping the account safe from geofencing triggers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-6">Ready to see it in action?</h3>
        <div className="flex justify-center gap-4">
          <Link href="/marketplace" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
            Explore the Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
