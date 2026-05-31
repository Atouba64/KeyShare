import { Metadata } from "next";
import { Download, Shield, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browser Extension | KeyShare",
  description: "Download the KeyShare browser extension to start sharing or renting subscriptions securely.",
};

export default function ExtensionPage() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            For Providers & Renters
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The magic happens in the <span className="text-blue-400">Extension.</span></h1>
          <p className="text-lg text-neutral-400 mb-8">
            The KeyShare browser extension is the secure bridge that makes password-less sharing possible. It encrypts your session and ensures accounts remain completely safe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download for Chrome
            </button>
            <button className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-neutral-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download for Firefox
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-neutral-300">End-to-end encrypted session transport</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-neutral-300">Automatic self-destructing cookies when time expires</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-neutral-300">Open-source & independently audited</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 blur-3xl -z-10 rounded-full"></div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-2 shadow-2xl relative">
            <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
              <div className="h-10 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 flex-1 bg-neutral-950 border border-neutral-800 rounded-md h-6 text-[10px] text-neutral-500 flex items-center px-2">
                  chrome-extension://keyshare-auth
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-lg mb-2">KeyShare Vault</h3>
                <p className="text-center text-sm text-neutral-400 mb-6">Your session is active and secure.</p>
                
                <div className="space-y-3">
                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-300">Netflix 4K UHD</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Renting</span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-300">Enterprise Access</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Providing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
