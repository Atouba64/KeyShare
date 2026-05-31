import Link from "next/link";
import { ArrowRight, Zap, Shield, Wallet, Cpu, MonitorPlay, GraduationCap } from "lucide-react";
import { getPlatformStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export default async function Home() {
  let stats = { listingCount: 0, userCount: 0, rentalCount: 0 };
  try {
    stats = await getPlatformStats();
  } catch {
    // Database may be unavailable during static generation
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-neutral-950 to-neutral-950 -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            KeyShare is now live in beta
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">
            Premium Access, <br className="hidden lg:block" />
            <span className="text-emerald-400">Fractional Cost.</span>
          </h1>
          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Securely rent premium software, e-learning platforms, and AI tools by the hour or day. Or securely monetize your idle subscriptions and turn them into passive income.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
              Start Earning / Renting <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/marketplace" className="w-full sm:w-auto px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-all border border-neutral-700 flex items-center justify-center gap-2">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="border-y border-neutral-800 bg-neutral-900/50 py-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 lg:gap-24 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.userCount}</div>
            <div className="text-sm text-neutral-400">Registered Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.listingCount}</div>
            <div className="text-sm text-neutral-400">Live Listings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.rentalCount}</div>
            <div className="text-sm text-neutral-400">Completed Bookings</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How KeyShare Works</h2>
            <p className="text-neutral-400 max-w-xl mx-auto px-2">We use Edge Reverse Proxying and Cloud Browser Isolation to ensure absolute zero-trust security. Passwords are never seen, and cookies never touch the renter's device.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group text-center md:text-left">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-24 h-24 text-emerald-500" />
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 mx-auto md:mx-0">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Deposit</h3>
              <p className="text-neutral-400">Providers log in securely. The session token is encrypted and deposited directly into our secure Cloud Vault. Passwords are never stored.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group text-center md:text-left">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-emerald-500" />
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 mx-auto md:mx-0">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Edge Proxy Routing</h3>
              <p className="text-neutral-400">Renters browse through our Edge Proxy. The server injects the session cookie server-side. The renter receives full access without ever possessing the credentials.</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group text-center md:text-left">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wallet className="w-24 h-24 text-emerald-500" />
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 mx-auto md:mx-0">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Earn passive income</h3>
              <p className="text-neutral-400">The session automatically expires after the rental period. Providers get paid instantly for resources they weren't using anyway.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 md:py-24 bg-neutral-900/30 border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 md:mb-12 text-center md:text-left gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Popular Resources</h2>
              <p className="text-neutral-400">Rent what you need, exactly when you need it.</p>
            </div>
            <Link href="/marketplace" className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Generative AI", desc: "Midjourney, ChatGPT Plus, Runway", icon: Cpu, price: "from $1/hr" },
              { title: "E-Learning", desc: "Udemy Business, Pluralsight, Coursera", icon: GraduationCap, price: "from $3/day" },
              { title: "Streaming", desc: "Netflix 4K, Disney+, Hulu", icon: MonitorPlay, price: "from $2/wknd" },
              { title: "Pro Tools", desc: "JetBrains, Adobe CC, Figma", icon: Zap, price: "from $5/day" },
            ].map((cat, i) => (
              <Link href={`/marketplace?category=${cat.title.toLowerCase()}`} key={i} className="group bg-neutral-950 border border-neutral-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)] text-center sm:text-left flex flex-col items-center sm:items-start">
                <cat.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-1">{cat.title}</h3>
                <p className="text-sm text-neutral-400 mb-4">{cat.desc}</p>
                <div className="text-emerald-400 font-medium text-sm mt-auto">{cat.price}</div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 rounded-xl text-white font-medium hover:bg-neutral-700 transition-colors">
              View all marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop paying for full months.</h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 px-2">
            Join thousands of users sharing the cost of premium subscriptions. Be smart about your software stack.
          </p>
          <Link href="/register" className="inline-block w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl transition-all">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
