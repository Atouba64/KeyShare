import { Metadata } from "next";
import { BookOpen, Briefcase, Code, Cpu, Film, Palette, Brain, LineChart, Globe, DollarSign, Database, Music } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use Cases | KeyShare",
  description: "Discover the 25 core use cases for sharing and renting premium access on KeyShare.",
};

export default function UseCasesPage() {
  const categories = [
    { name: "Education", icon: BookOpen },
    { name: "Development", icon: Code },
    { name: "Design & AI", icon: Palette },
    { name: "Business", icon: Briefcase },
    { name: "Entertainment", icon: Film },
  ];

  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">25 Ways to Use KeyShare</h1>
        <p className="text-lg text-neutral-400">
          From passing your finals to launching a startup, see how people are bridging the gap between expensive subscriptions and temporary needs.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat, i) => (
          <button key={i} className="px-6 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2">
            <cat.icon className="w-4 h-4" /> {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {useCases.map((uc, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-700 transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-white">{uc.title}</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 block">The Scenario</span>
                <p className="text-neutral-300 text-sm leading-relaxed">{uc.scenario}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1 block">The Match</span>
                <p className="text-neutral-300 text-sm leading-relaxed">{uc.match}</p>
              </div>
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> The KeyShare Bridge
                </span>
                <p className="text-neutral-400 text-sm">{uc.bridge}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-emerald-900/20 border border-emerald-500/20 rounded-2xl p-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Have your own use case?</h2>
        <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
          Whether you want to rent access for a few hours or monetize a subscription you rarely use, KeyShare makes it secure and easy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/marketplace" className="px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-lg hover:bg-emerald-400">
            Browse the Marketplace
          </Link>
          <Link href="/list-account" className="px-6 py-3 bg-neutral-800 text-white font-bold rounded-lg border border-neutral-700 hover:bg-neutral-700">
            List an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

const useCases = [
  {
    title: "The EdTech Sprint (E-Learning)",
    scenario: "A self-taught developer needs to watch a specific 10-hour course on Udemy Business or Pluralsight to prepare for a job interview next week. They don't want a pricey monthly subscription.",
    match: "A university student has free, unlimited access to Udemy Business through their tuition but is currently focusing on standard coursework this month.",
    bridge: "The student lists 7-day access to their Udemy slot for $5. The developer buys it, watches the course, and the student makes quick cash from a free resource."
  },
  {
    title: "The Final Exam Cram (Academic Help)",
    scenario: "A high school student is stuck on complex physics problems the night before a final exam and needs Chegg or Quizlet Plus step-by-step solutions for just 48 hours.",
    match: "A college graduate has an active, paid annual Chegg subscription that they rarely touch anymore.",
    bridge: "The graduate rents out account access for a 48-hour window at a micro-fee ($2), solving the student's immediate crisis without locking them into a monthly contract."
  },
  {
    title: "The Indie Dev Sprint (Professional IDEs)",
    scenario: "A freelance programmer gets a short-term contract requiring them to optimize a database using JetBrains DataGrip or CLion. The license is expensive for a one-off project.",
    match: "A computer science student has an unused JetBrains Student Pack or GitHub Student Developer Pack.",
    bridge: "The student provisions a temporary sub-key or temporary login through KeyShare, earning passive income from their student status."
  },
  {
    title: "The AI Content Marathon (Generative AI)",
    scenario: "A marketer needs to generate 50 hyper-realistic concept art images using Midjourney or intense video rendering via Runway AI for a single client pitch.",
    match: "A digital artist has a high-tier monthly subscription with thousands of unused GPU fast-hours resetting at the end of the month.",
    bridge: "The artist sells 'compute slots' or hours via KeyShare, allowing the marketer to run their prompts through a secure API wrapper or shared session without exposing the artist's main account."
  },
  {
    title: "The Binge-Watch Weekend (Streaming)",
    scenario: "A family wants to watch a specific new movie release on Disney+ or a live sports event on Paramount+, but they already pay for Netflix and Spotify and don't want another recurring bill.",
    match: "A user who bought a 1-year streaming bundle but is going on vacation for two weeks.",
    bridge: "The vacationing user rents out their profile slot for the weekend, offsetting the cost of their annual bill."
  },
  {
    title: "The Portfolio Build (Creative Suites)",
    scenario: "A budding graphic designer needs Adobe Creative Cloud (Photoshop/Illustrator) for one week to assemble their university portfolio.",
    match: "A tech-center student or employee with an enterprise license that allows activation on up to two devices, but they only use one.",
    bridge: "The employee securely rents out their secondary 'device activation slot' for a limited window."
  },
  {
    title: "The Cloud Sandbox (Infrastructure)",
    scenario: "A tech hobbyist wants to experiment with hosting an application on AWS or Microsoft Azure but is terrified of accidentally running up a massive bill on their personal credit card.",
    match: "A student with AWS Educate or Azure Dev Tools credits ($100-$200 free credits) that are about to expire.",
    bridge: "The student transfers or rents access to a sandboxed environment within KeyShare's guardrails, turning expiring credits into hard cash."
  },
  {
    title: "The Market Research Deep Dive (Business Data)",
    scenario: "A startup founder needs to download a list of venture capital funding rounds from Crunchbase Pro or academic papers from Statista for a pitch deck. They only need 3 hours of downloading.",
    match: "A business school student or boutique consultant with active institutional/corporate access.",
    bridge: "KeyShare facilitates a secure, time-bound session where the founder can run their specific queries without paying the $400+/month subscription."
  },
  {
    title: "The App Prototype Phase (UI/UX Design)",
    scenario: "A product manager needs to collaborate on a high-fidelity prototype using Sketch or Axure for a presentation on Friday.",
    match: "A designer who has an active license team seat that is currently vacant.",
    bridge: "The team seat is temporarily assigned to the product manager's email for a 5-day rental period."
  },
  {
    title: "The Mental Health Check-In (Wellness Perks)",
    scenario: "A user going through a stressful week wants to use premium mindfulness apps like BetterHelp or Headspace, but cannot afford the premium tier.",
    match: "A student or corporate employee who receives these apps entirely free as a mental health perk but prefers other wellness methods.",
    bridge: "The employee shares their access tokens or sub-account profile for a designated period, allowing someone else to get affordable wellness care."
  },
  {
    title: "The SEO Audit (Digital Marketing)",
    scenario: "A freelance marketer lands a new local business client and needs to run a comprehensive keyword and backlink audit, but cannot justify the $199/month cost of Ahrefs or SEMrush for a one-time setup.",
    match: "A large marketing agency with a top-tier SEMrush Agency plan that sits completely idle during evenings and weekends.",
    bridge: "The agency rents out a dedicated session slot over the weekend. The freelancer pulls all their required reports for a fraction of the cost, and the agency offsets their software overhead."
  },
  {
    title: "The Day Trader's Edge (Financial Data)",
    scenario: "A retail investor wants to track real-time options flow and dark pool data ahead of a major earnings week but doesn't have a $200/month Benzinga Pro or TradingView Premium account.",
    match: "A professional day trader who operates strictly from 8 AM to 4 PM and never touches their terminal in the evenings or on weekends.",
    bridge: "The retail investor rents out the 'after-hours' access to run backtesting, charts, and research while the pro's account is dormant."
  },
  {
    title: "The Massive Send (File Transfer & Storage)",
    scenario: "A videographer needs to send a 250GB raw 4K video file to a client immediately, but their free WeTransfer or Dropbox limits are maxed out, and upgrading costs a hefty monthly fee.",
    match: "A creative agency with an unlimited Dropbox Advanced or WeTransfer Premium enterprise account.",
    bridge: "The agency rents out a temporary API key or upload portal link. The videographer transfers the massive file for $3 without signing up for a new tier."
  },
  {
    title: "The Beat Maker's Fix (Music Production)",
    scenario: "A music producer is finalizing a track and needs a specific, high-quality vocal chop from Splice Sounds, but doesn't want to lock into another monthly subscription for one sample.",
    match: "A long-time beatmaker who has accumulated 4,000 unused, rolling Splice credits on their account.",
    bridge: "KeyShare wraps the Splice search in an API. The producer finds the sound, KeyShare uses the seller's credits to download it, and transfers the WAV file."
  },
  {
    title: "The VIP Article Bypass (Premium Journalism)",
    scenario: "A college researcher needs to read 5 specific archived articles from the Wall Street Journal, Bloomberg, and the Financial Times for a report due today, but hits the paywalls.",
    match: "A corporate executive whose firm pays for comprehensive digital subscriptions across all major financial publishers.",
    bridge: "KeyShare acts as an article-fetching proxy. The researcher pays $0.50 per article, and the proxy uses the executive's session to retrieve the exact text."
  }
];
