import { Suspense } from "react";
import { requireUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/queries";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const data = await getDashboardData(user.id);

  const serialized = {
    user: data.user!,
    providingRentals: data.providingRentals.map((r) => ({
      ...r,
      endTime: r.endTime.toISOString(),
    })),
    usingRentals: data.usingRentals.map((r) => ({
      ...r,
      endTime: r.endTime.toISOString(),
      startTime: r.startTime.toISOString(),
    })),
    listings: data.listings,
    stats: data.stats,
  };

  return (
    <Suspense fallback={<div className="p-10 text-center text-neutral-400">Loading dashboard...</div>}>
      <DashboardClient {...serialized} />
    </Suspense>
  );
}
