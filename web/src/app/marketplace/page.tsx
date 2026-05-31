"use client";

import { Search, Filter, Cpu, BookOpen, MonitorPlay, Code, Briefcase, Star, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", icon: Search },
    { name: "Generative AI", icon: Cpu },
    { name: "E-Learning", icon: BookOpen },
    { name: "Streaming", icon: MonitorPlay },
    { name: "Dev Tools", icon: Code },
    { name: "Business Data", icon: Briefcase },
  ];

  const listings = [
    {
      id: 1,
      title: "Midjourney Pro Tier - 5 Hrs compute",
      category: "Generative AI",
      provider: "CreativeStudio_99",
      rating: 4.9,
      price: "$2.50",
      unit: "per hr",
      availability: "Available Now",
      type: "API Proxy",
    },
    {
      id: 2,
      title: "Enterprise Learning Access - Wkd Pass",
      category: "E-Learning",
      provider: "CorporateDev24",
      rating: 5.0,
      price: "$4.00",
      unit: "per 48hrs",
      availability: "Available Now",
      type: "Browser Session",
    },
    {
      id: 3,
      title: "SEMrush Agency Plan - Night Owl",
      category: "Business Data",
      provider: "MarketingBros",
      rating: 4.8,
      price: "$15.00",
      unit: "per 8hrs",
      availability: "Starts 8PM EST",
      type: "Browser Session",
    },
    {
      id: 4,
      title: "JetBrains All Products Pack",
      category: "Dev Tools",
      provider: "SeniorDev_HQ",
      rating: 4.7,
      price: "$5.00",
      unit: "per 7 days",
      availability: "Available Now",
      type: "License Key",
    },
    {
      id: 5,
      title: "Adobe Creative Cloud - Device Slot 2",
      category: "Design",
      provider: "DesignAgencyLA",
      rating: 4.9,
      price: "$12.00",
      unit: "per week",
      availability: "Available Now",
      type: "Account Login",
    },
    {
      id: 6,
      title: "Netflix Premium 4K UHD",
      category: "Streaming",
      provider: "MovieBuff99",
      rating: 4.6,
      price: "$3.00",
      unit: "per 3 days",
      availability: "Available Now",
      type: "Browser Session",
    },
  ];

  const filteredListings = activeCategory === "All" 
    ? listings 
    : listings.filter(l => l.category === activeCategory);

  return (
    <div className="pt-8 pb-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-neutral-400">Find and rent premium access for a fraction of the cost.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search subscriptions, tools, courses..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 lg:sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-emerald-500" />
              <h3 className="font-semibold">Categories</h3>
            </div>
            <ul className="flex overflow-x-auto hide-scrollbar lg:flex-col gap-2 space-y-0 lg:space-y-2 pb-2 lg:pb-0">
              {categories.map((cat, i) => (
                <li key={i} className="flex-shrink-0">
                  <button 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center gap-2 lg:gap-3 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap lg:whitespace-normal ${activeCategory === cat.name ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
                  >
                    <cat.icon className="w-4 h-4 shrink-0" /> {cat.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 lg:mt-8">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <input type="range" className="w-full accent-emerald-500" />
              <div className="flex justify-between text-xs text-neutral-500 mt-2">
                <span>$0</span>
                <span>$50+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-colors group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium rounded-md border border-neutral-700">
                  {listing.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {listing.rating}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">{listing.title}</h3>
              <p className="text-sm text-neutral-500 mb-4 flex-1">By {listing.provider}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {listing.availability}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <div className="w-4 h-4 rounded-sm bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px]">🔌</div>
                  {listing.type}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                <div>
                  <span className="text-xl font-bold text-white">{listing.price}</span>
                  <span className="text-xs text-neutral-500 ml-1">{listing.unit}</span>
                </div>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">
                  Rent Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
