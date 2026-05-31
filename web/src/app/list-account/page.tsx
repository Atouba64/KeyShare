import { Metadata } from "next";
import { ShieldCheck, Banknote, Clock, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "List an Account | KeyShare",
  description: "Monetize your unused premium subscriptions safely with KeyShare.",
};

export default function ListAccountPage() {
  return (
    <div className="pt-12 pb-24 container mx-auto px-4 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Info */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            Provider Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Turn idle subscriptions into <span className="text-emerald-400">passive income.</span></h1>
          <p className="text-lg text-neutral-400 mb-8">
            Got an expensive enterprise subscription your agency barely uses? A professional license sitting idle during the weekend? Rent it out securely on KeyShare without ever giving away your password.
          </p>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zero Password Sharing</h3>
                <p className="text-sm text-neutral-400">Our extension creates a secure, encrypted tunnel using session cookies. Renters never see your login credentials.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Total Control</h3>
                <p className="text-sm text-neutral-400">You set the hours. Want to rent out your SEMrush account only on weekends? You got it. Sessions automatically self-destruct when time is up.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 text-emerald-500 mx-auto md:mx-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Instant Payouts</h3>
                <p className="text-sm text-neutral-400">Funds are held in escrow during the rental period and released immediately to your Stripe Connect account when finished.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
          <h2 className="text-2xl font-bold mb-6">Create a Listing</h2>
          
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Platform / Service Name</label>
              <input type="text" placeholder="e.g., Udemy Business, Midjourney Pro" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
                <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none text-neutral-400">
                  <option>E-Learning</option>
                  <option>Generative AI</option>
                  <option>Dev Tools</option>
                  <option>Streaming</option>
                  <option>Business Data</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Connection Method</label>
                <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none text-neutral-400">
                  <option>Browser Session (Extension)</option>
                  <option>API Wrapper</option>
                  <option>License Key / Seat</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Pricing</label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                  <input type="number" placeholder="0.00" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <span className="text-neutral-500">per</span>
                <select className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none text-neutral-400">
                  <option>Hour</option>
                  <option>Day</option>
                  <option>Weekend (48h)</option>
                  <option>Week</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Availability Schedule</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 bg-neutral-950 cursor-pointer hover:border-emerald-500/50 transition-colors">
                  <input type="radio" name="availability" className="accent-emerald-500" defaultChecked />
                  <span className="text-sm text-neutral-300">Always Available</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 bg-neutral-950 cursor-pointer hover:border-emerald-500/50 transition-colors">
                  <input type="radio" name="availability" className="accent-emerald-500" />
                  <span className="text-sm text-neutral-300">Specific Hours</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button type="button" className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" /> Generate Secure Link
              </button>
              <p className="text-xs text-center text-neutral-500 mt-4">
                By listing, you agree to our Terms of Service regarding account sharing compliance.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
