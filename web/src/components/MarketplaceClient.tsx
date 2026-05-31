"use client";

import { Search, Filter, Cpu, BookOpen, MonitorPlay, Code, Briefcase, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { createRental } from "@/app/actions/listings";
import { formatConnectionType, formatPriceUnit, providerHandle } from "@/lib/format";

type ListingItem = {
  id: string;
  title: string;
  platformName: string;
  category: string;
  connectionType: string;
  price: number;
  priceUnit: string;
  description: string | null;
  provider: {
    id: string;
    name: string | null;
    email: string;
  };
  rentals: { id: string }[];
};

export default function MarketplaceClient({
  listings,
  isLoggedIn,
  userRole,
  userId,
}: {
  listings: ListingItem[];
  isLoggedIn: boolean;
  userRole: string | null;
  userId: string | null;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { name: "All", icon: Search },
    { name: "Generative AI", icon: Cpu },
    { name: "E-Learning", icon: BookOpen },
    { name: "Streaming", icon: MonitorPlay },
    { name: "Dev Tools", icon: Code },
    { name: "Business Data", icon: Briefcase },
  ];

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesCategory = activeCategory === "All" || listing.category === activeCategory;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        listing.title.toLowerCase().includes(query) ||
        listing.platformName.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [listings, activeCategory, search]);

  async function handleRent(listingId: string) {
    if (!isLoggedIn) {
      window.location.href = `/register?next=${encodeURIComponent("/marketplace")}`;
      return;
    }

    setLoadingId(listingId);
    setError(null);

    const result = await createRental(listingId);
    if (result?.error) {
      setError(result.error);
      setLoadingId(null);
    }
  }

  return (
    <div className="pt-8 pb-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between mb-8 text-center md:text-left">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-neutral-400">
            {listings.length} live listing{listings.length === 1 ? "" : "s"} from real providers.
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriptions, tools, courses..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 lg:sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-emerald-500" />
              <h3 className="font-semibold">Categories</h3>
            </div>
            <ul className="flex overflow-x-auto hide-scrollbar lg:flex-col gap-2 space-y-0 lg:space-y-2 pb-2 lg:pb-0">
              {categories.map((cat) => (
                <li key={cat.name} className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center gap-2 lg:gap-3 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap lg:whitespace-normal ${activeCategory === cat.name ? "bg-emerald-500/10 text-emerald-400 font-medium" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                  >
                    <cat.icon className="w-4 h-4 shrink-0" /> {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">
          {filteredListings.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center">
              <h3 className="text-xl font-bold mb-2">No listings yet</h3>
              <p className="text-neutral-400 mb-6">
                {listings.length === 0
                  ? "Be the first provider to list a resource on KeyShare."
                  : "No listings match your filters. Try another category or search term."}
              </p>
              <Link href="/list-account" className="inline-block px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-lg hover:bg-emerald-400">
                List a Resource
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredListings.map((listing) => {
                const isRented = listing.rentals.length > 0;
                const isOwn = userId === listing.provider.id;

                return (
                  <div key={listing.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-colors group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium rounded-md border border-neutral-700">
                        {listing.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${isRented ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                        {isRented ? "Rented" : "Available"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{listing.title}</h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      By {providerHandle(listing.provider.email, listing.provider.name)}
                    </p>
                    {listing.description && (
                      <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{listing.description}</p>
                    )}

                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        {isRented ? "Currently in use" : "Available now"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <div className="w-4 h-4 rounded-sm bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px]">🔌</div>
                        {formatConnectionType(listing.connectionType)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                      <div>
                        <span className="text-xl font-bold text-white">${listing.price.toFixed(2)}</span>
                        <span className="text-xs text-neutral-500 ml-1">{formatPriceUnit(listing.priceUnit)}</span>
                      </div>
                      {isOwn ? (
                        <span className="text-xs text-neutral-500 px-3 py-2">Your listing</span>
                      ) : (
                        <button
                          type="button"
                          disabled={isRented || loadingId === listing.id}
                          onClick={() => handleRent(listing.id)}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 text-sm font-bold rounded-lg transition-colors"
                        >
                          {loadingId === listing.id ? "Renting..." : isRented ? "Unavailable" : "Rent Access"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
