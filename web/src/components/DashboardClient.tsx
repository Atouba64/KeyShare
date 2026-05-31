"use client";

import {
  Activity,
  CreditCard,
  Key,
  Settings,
  LogOut,
  Clock,
  Cpu,
  Code,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { logoutUser } from "@/app/actions/auth";
import {
  formatConnectionType,
  formatPriceUnit,
  formatRole,
  formatTimeRemaining,
  getInitials,
  providerHandle,
} from "@/lib/format";

type DashboardProps = {
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
  };
  providingRentals: Array<{
    id: string;
    totalCost: number;
    endTime: string;
    listing: { title: string; platformName: string };
    renter: { name: string | null; email: string };
  }>;
  usingRentals: Array<{
    id: string;
    endTime: string;
    startTime: string;
    listing: {
      title: string;
      platformName: string;
      provider: { name: string | null; email: string };
    };
  }>;
  listings: Array<{
    id: string;
    title: string;
    platformName: string;
    category: string;
    price: number;
    priceUnit: string;
    connectionType: string;
    status: string;
    rentals: Array<{ id: string; totalCost: number; status: string }>;
  }>;
  stats: {
    totalEarnings: number;
    activeProvidingCount: number;
    activeUsingCount: number;
    todayEarnings: number;
  };
};

export default function DashboardClient({
  user,
  providingRentals,
  usingRentals,
  listings,
  stats,
}: DashboardProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const firstName = user.name?.split(" ")[0] || "there";

  async function handleLogout() {
    await logoutUser();
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "rentals", label: "Active Rentals", icon: Clock },
    { id: "listings", label: "My Listings", icon: Key },
    { id: "earnings", label: "Earnings", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
      <div className="w-full md:w-64 border-r border-neutral-800 bg-neutral-900/50 p-4 flex flex-col">
        <div className="flex items-center gap-3 p-4 mb-6 border-b border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
            {getInitials(user.name, user.email)}
          </div>
          <div>
            <div className="font-bold text-sm">{user.name || user.email}</div>
            <div className="text-xs text-neutral-500">{formatRole(user.role)}</div>
          </div>
        </div>

        <nav className="flex-1 flex overflow-x-auto md:flex-col gap-2 md:gap-1 pb-2 md:pb-0 hide-scrollbar">
          {tabs.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard?tab=${item.id}`}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === item.id
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-4 md:mt-auto pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, {firstName}!</h1>
              <p className="text-sm md:text-base text-neutral-400">Your live KeyShare activity.</p>
            </div>
            {user.role !== "ADMIN" && (
              <Link
                href="/list-account"
                className="w-full sm:w-auto text-center px-4 py-3 sm:py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-sm font-bold rounded-lg transition-colors"
              >
                + List a resource
              </Link>
            )}
          </div>

          {(activeTab === "overview" || activeTab === "rentals") && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                  <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                    Total Earnings
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">${stats.totalEarnings.toFixed(2)}</div>
                  <div className="text-neutral-500 text-xs">Released payouts to date</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                  <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                    Active Rentals (Providing)
                    <Key className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stats.activeProvidingCount}</div>
                  <div className="text-neutral-500 text-xs">
                    {stats.todayEarnings > 0 ? `$${stats.todayEarnings.toFixed(2)} in active rentals` : "No active rentals right now"}
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                  <div className="text-neutral-400 text-sm font-medium mb-4 flex justify-between items-center">
                    Active Rentals (Using)
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stats.activeUsingCount}</div>
                  <div className="text-neutral-500 text-xs">
                    {usingRentals[0]
                      ? formatTimeRemaining(new Date(usingRentals[0].endTime))
                      : "No active rentals"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                    <h3 className="font-bold">Currently Providing</h3>
                    <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                      {providingRentals.length} Active
                    </span>
                  </div>
                  {providingRentals.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 text-sm">
                      No one is renting your listings yet.{" "}
                      <Link href="/list-account" className="text-emerald-400 hover:underline">
                        Publish a listing
                      </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-neutral-800">
                      {providingRentals.map((item) => (
                        <li key={item.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                              <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-white">{item.listing.title}</div>
                              <div className="text-xs text-neutral-500">
                                Rented by @{providerHandle(item.renter.email, item.renter.name)}
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:block justify-between items-center sm:text-right border-t sm:border-0 border-neutral-800/50 pt-2 sm:pt-0">
                            <div className="text-sm font-bold text-emerald-400">+${item.totalCost.toFixed(2)}</div>
                            <div className="text-xs text-neutral-500">{formatTimeRemaining(new Date(item.endTime))}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                    <h3 className="font-bold">Currently Renting</h3>
                    <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                      {usingRentals.length} Active
                    </span>
                  </div>
                  {usingRentals.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500 text-sm">
                      You have no active rentals.{" "}
                      <Link href="/marketplace" className="text-emerald-400 hover:underline">
                        Browse the marketplace
                      </Link>
                    </div>
                  ) : (
                    usingRentals.map((rental) => {
                      const totalMs = new Date(rental.endTime).getTime() - new Date(rental.startTime).getTime();
                      const elapsedMs = Date.now() - new Date(rental.startTime).getTime();
                      const progress = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

                      return (
                        <div key={rental.id} className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                              <Code className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-bold text-white">{rental.listing.title}</div>
                              <div className="text-xs text-neutral-400">
                                Provider: @{providerHandle(rental.listing.provider.email, rental.listing.provider.name)}
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-6">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-neutral-400">Time Remaining</span>
                              <span className="font-medium text-white">{formatTimeRemaining(new Date(rental.endTime))}</span>
                            </div>
                            <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-1 overflow-hidden">
                              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${100 - progress}%` }} />
                            </div>
                            <div className="text-[10px] text-neutral-500 text-right">
                              Expires {new Date(rental.endTime).toLocaleString()}
                            </div>
                          </div>

                          <div className="mt-auto">
                            <button
                              type="button"
                              className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg transition-colors border border-emerald-500/30"
                            >
                              Session access coming soon
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "listings" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="font-bold">My Listings</h3>
                <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">{listings.length} total</span>
              </div>
              {listings.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-neutral-400 mb-4">You haven&apos;t published any listings yet.</p>
                  <Link href="/list-account" className="inline-block px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-lg">
                    Create your first listing
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-800">
                  {listings.map((listing) => (
                    <li key={listing.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-white">{listing.title}</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {listing.category} · {formatConnectionType(listing.connectionType)} · {listing.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400">
                          ${listing.price.toFixed(2)} {formatPriceUnit(listing.priceUnit)}
                        </div>
                        <div className="text-xs text-neutral-500">{listing.rentals.length} rental(s)</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "earnings" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">${stats.totalEarnings.toFixed(2)}</div>
              <p className="text-neutral-400 mb-4">Total released earnings</p>
              <p className="text-sm text-neutral-500">
                Stripe Connect payouts will be enabled in the next release. Active rentals are tracked in escrow now.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div>
                <div className="text-sm text-neutral-500">Name</div>
                <div className="font-medium">{user.name || "—"}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Role</div>
                <div className="font-medium">{formatRole(user.role)}</div>
              </div>
              {!user.role && (
                <Link href="/onboarding" className="inline-block text-emerald-400 hover:underline text-sm">
                  Complete onboarding
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
