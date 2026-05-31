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
          From scaling your startup to launching a solo consulting business, see how people are bridging the gap between expensive subscriptions and temporary needs.
        </p>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar sm:flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 pb-4 sm:pb-0">
        {categories.map((cat, i) => (
          <button key={i} className="px-5 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0">
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
    title: "The Indie Dev Sprint (Professional IDEs)",
    scenario: "A freelance programmer gets a short-term contract requiring them to optimize a database using JetBrains DataGrip or CLion. The license is expensive for a one-off project.",
    match: "An enterprise developer whose corporate license includes personal device use but is out of office for the weekend.",
    bridge: "The corporate developer provisions a temporary sub-key or login session through KeyShare, earning passive income from their idle weekend access."
  },
  {
    title: "The AI Content Marathon (Generative AI)",
    scenario: "A boutique marketing agency needs to generate 50 hyper-realistic concept art images using Midjourney or intense video rendering via Runway AI for a single client pitch.",
    match: "A large digital studio with a high-tier monthly subscription that has thousands of unused GPU fast-hours resetting at the end of the month.",
    bridge: "The digital studio sells 'compute slots' or hours via KeyShare, allowing the boutique agency to run their prompts through a secure API wrapper."
  },
  {
    title: "The EdTech Skilling (E-Learning)",
    scenario: "A self-taught developer needs to watch a specific 10-hour advanced systems architecture course on Pluralsight to prepare for a job interview next week.",
    match: "A corporate employee who has an all-access enterprise pass as part of their company benefits, but only logs in once a quarter for compliance training.",
    bridge: "The employee lists a 7-day access window to their learning slot for a fraction of the retail price. The developer gets skilled up, and the employee earns passive income."
  },
  {
    title: "The Final Polish (Creative Suites)",
    scenario: "A budding graphic designer needs Adobe Creative Cloud for exactly one week to finalize high-res vectors for a massive client handover.",
    match: "An established creative agency with dozens of enterprise floating licenses, many of which sit dormant between large campaigns.",
    bridge: "The agency securely rents out an unused 'device activation slot' for a limited window, optimizing their massive software overhead."
  },
  {
    title: "The Cloud Sandbox (Infrastructure)",
    scenario: "A startup founder wants to experiment with hosting an application on AWS or Microsoft Azure but is terrified of accidentally running up a massive bill on their personal credit card.",
    match: "A well-funded Series A startup with $100,000 in expiring AWS Activate credits that they cannot possibly burn through before the deadline.",
    bridge: "The Series A startup transfers access to a sandboxed IAM role within KeyShare's guardrails, turning expiring credits into hard cash."
  },
  {
    title: "The Market Research Deep Dive (Business Data)",
    scenario: "An independent consultant needs to download a list of venture capital funding rounds from Crunchbase Pro or Statista for a client's pitch deck. They only need 3 hours of downloading.",
    match: "A boutique consulting firm with an active institutional/corporate access subscription that runs 24/7.",
    bridge: "KeyShare facilitates a secure, time-bound session where the independent consultant can run their specific queries without paying the $400+/month subscription."
  },
  {
    title: "The App Prototype Phase (UI/UX Design)",
    scenario: "A freelance product manager needs to collaborate on a high-fidelity prototype using Axure or Figma Enterprise for a presentation on Friday.",
    match: "A design agency that has an active license team seat currently vacant due to an employee's extended leave.",
    bridge: "The team seat is temporarily assigned to the freelancer's email for a 5-day rental period."
  },
  {
    title: "The SEO Audit (Digital Marketing)",
    scenario: "A freelance marketer lands a new local business client and needs to run a comprehensive keyword and backlink audit, but cannot justify the $199/month cost of Ahrefs or SEMrush for a one-time setup.",
    match: "A large marketing agency with a top-tier SEMrush Agency plan that sits completely idle during evenings and weekends.",
    bridge: "The agency rents out a dedicated session slot over the weekend. The freelancer pulls all their required reports, and the agency offsets their software overhead."
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
    bridge: "The agency rents out a temporary API key or upload portal link. The videographer transfers the massive file for a micro-fee without signing up for a new tier."
  },
  {
    title: "The Beat Maker's Fix (Music Production)",
    scenario: "A music producer is finalizing a track and needs a specific, high-quality vocal chop from Splice Sounds, but doesn't want to lock into another monthly subscription for one sample.",
    match: "A long-time beatmaker who has accumulated 4,000 unused, rolling Splice credits on their account.",
    bridge: "KeyShare wraps the Splice search in an API. The producer finds the sound, KeyShare uses the seller's credits to download it, and transfers the WAV file."
  },
  {
    title: "The VIP Article Bypass (Premium Journalism)",
    scenario: "A freelance journalist needs to read 5 specific archived articles from the Wall Street Journal, Bloomberg, and the Financial Times for a report due today, but hits the paywalls.",
    match: "A corporate executive whose firm pays for comprehensive digital subscriptions across all major financial publishers.",
    bridge: "KeyShare acts as an article-fetching proxy. The journalist pays $0.50 per article, and the proxy uses the executive's session to retrieve the exact text."
  },
  {
    title: "The Lead Gen Scraping (B2B Sales)",
    scenario: "A recently laid-off B2B salesperson is starting a solo consulting business. They need to pull a list of 500 qualified leads from ZoomInfo or Apollo.io but cannot afford massive upfront annual contracts.",
    match: "A sales team at a funded startup that has thousands of unused lead-export credits expiring at the end of the year.",
    bridge: "The startup connects their account to KeyShare via API. The independent consultant buys a micro-batch of 500 exports, and the startup monetizes their sunk-cost credits."
  },
  {
    title: "The Game Dev Optimization (Asset Stores)",
    scenario: "An indie game developer needs a specific $150 3D environment pack from the Unreal Engine Marketplace or Unity Asset Store just to prototype a single level.",
    match: "A massive AAA game studio that holds enterprise licenses to thousands of asset packs.",
    bridge: "The studio provides secure, isolated read-only access to the asset repository for a 24-hour sprint."
  },
  {
    title: "The Binge-Watch Weekend (Entertainment Streaming)",
    scenario: "A family wants to watch a specific new movie release on Disney+ or a live sports event on Paramount+, but they already pay for Netflix and Spotify and don't want another recurring bill.",
    match: "A user who bought a 1-year streaming bundle but is going on vacation for two weeks.",
    bridge: "The vacationing user rents out their profile slot for the weekend, offsetting the cost of their annual bill."
  },
  {
    title: "The Ultimate Gamer Weekend (Cloud Gaming)",
    scenario: "A Mac user wants to play a newly released, graphics-heavy PC game with their friends just for the weekend, but doesn't own a gaming rig.",
    match: "A PC enthusiast with an active top-tier GeForce NOW or Shadow PC cloud gaming subscription who is away camping for the weekend.",
    bridge: "The enthusiast rents out their cloud gaming instance, letting the Mac user stream the high-end game seamlessly for 48 hours."
  },
  {
    title: "The In-Flight Lifeline (Travel Connectivity)",
    scenario: "A business traveler is on a 6-hour cross-country flight and urgently needs to upload a presentation, but the in-flight Wi-Fi is charging $35 for the session.",
    match: "A frequent flyer who possesses an unlimited global airline Wi-Fi subscription (like Gogo Inflight) but is currently lounging on their couch at home.",
    bridge: "The frequent flyer temporarily rents their MAC-address authentication or login token to the traveler for just that 6-hour window for $10."
  },
  {
    title: "The Genealogy Rabbit Hole (Personal History)",
    scenario: "A hobbyist wants to map out their family tree over a long Thanksgiving weekend and needs access to international birth and death records on Ancestry.com.",
    match: "A passionate genealogist who bought the pricey annual 'World Explorer' subscription but only logs in once every few months.",
    bridge: "The genealogist lends their account out for the 3-day weekend sprint, effectively crowdsourcing the cost of their expensive yearly hobby."
  },
  {
    title: "The Amazon Product Hunt (E-Commerce Research)",
    scenario: "A new Amazon FBA seller needs to run deep product research to find a profitable niche using Helium 10 or Jungle Scout. They only need the heavy analytics tools for the initial product hunt phase.",
    match: "An established e-commerce seller who pays for the highest-tier 'Diamond' plan to manage massive inventory, but rarely touches the discovery modules anymore.",
    bridge: "The established seller rents out session access strictly to the product discovery modules for a 48-hour sprint."
  },
  {
    title: "The Fantasy Football Draft (Sports Analytics)",
    scenario: "A fantasy football player wants to dominate their draft this weekend and needs deep predictive analytics from PFF (Pro Football Focus) Elite or Action Network.",
    match: "A hardcore sports bettor with an annual subscription who is taking a break before the season fully ramps up.",
    bridge: "The bettor securely rents out 48-hour access just in time for the buyer's fantasy draft weekend."
  },
  {
    title: "The Social Media Blitz (Agency Dashboards)",
    scenario: "A local non-profit is running a crucial 1-week fundraising campaign and needs to bulk-schedule hundreds of posts across 10 platforms using Hootsuite or Sprout Social.",
    match: "A social media management agency with an Enterprise plan that allows for hundreds of connected social accounts and possesses unused workspace limits.",
    bridge: "The agency spins up a temporary, isolated workspace for the non-profit for one week, recovering a piece of their massive software expense."
  },
  {
    title: "The MasterClass Inspiration (Expert Learning)",
    scenario: "An aspiring screenwriter wants to spend their Sunday watching Aaron Sorkin's MasterClass for inspiration, but cannot stomach the $180 annual fee for a single course.",
    match: "A user who was gifted an annual MasterClass subscription, watched one series, and never logged in again.",
    bridge: "KeyShare facilitates a secure weekend rental of the account, unlocking premium inspirational content on-demand."
  },
  {
    title: "The Real Estate Hunt (Property Data)",
    scenario: "A real estate investor is visiting a new city for 3 days and wants to run comps and pull absentee-owner lists using PropStream or CoStar (which can cost thousands annually).",
    match: "A commercial real estate broker with a massive corporate seat license.",
    bridge: "The broker effectively sublets a localized, time-bound data-query session to the investor for the weekend trip."
  },
  {
    title: "The Language Immersion (Travel Prep)",
    scenario: "A backpacker is heading to Japan in two weeks and wants to cram using Duolingo Super (for offline, ad-free mode) and Rosetta Stone for the long flight.",
    match: "A polyglot who bought a lifetime Rosetta Stone subscription but is currently taking a break from studying.",
    bridge: "The polyglot securely rents out a profile slot for a two-week intensive cram session."
  },
  {
    title: "The Mental Health Check-In (Wellness Perks)",
    scenario: "A user going through a stressful week wants to use premium mindfulness apps like BetterHelp or Headspace, but cannot afford the premium tier.",
    match: "A corporate employee who receives these apps entirely free as a mental health perk but prefers other wellness methods.",
    bridge: "The employee shares their access tokens or sub-account profile for a designated period, allowing someone else to get affordable wellness care."
  }
];
