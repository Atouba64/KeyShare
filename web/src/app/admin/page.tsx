import { requireRole } from "@/lib/auth";
import { getAdminOverview } from "@/lib/queries";

export default async function AdminOverviewPage() {
  await requireRole(["ADMIN"]);

  const data = await getAdminOverview();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Platform Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="text-neutral-400 text-sm font-medium mb-4">Total Users</div>
          <div className="text-3xl font-bold text-white mb-1">{data.userCount}</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="text-neutral-400 text-sm font-medium mb-4">Active Rentals</div>
          <div className="text-3xl font-bold text-white mb-1">{data.activeRentals}</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <div className="text-neutral-400 text-sm font-medium mb-4">GMV (30d)</div>
          <div className="text-3xl font-bold text-white mb-1">${data.gmv.toFixed(2)}</div>
          <div className="text-xs text-amber-400 font-medium">Platform Fee: ${data.platformFee.toFixed(2)}</div>
        </div>

        <div className="bg-neutral-900 border border-amber-500/30 p-6 rounded-xl">
          <div className="text-amber-500 text-sm font-medium mb-4">Disputed Rentals</div>
          <div className="text-3xl font-bold text-white mb-1">{data.flaggedCount}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 mt-12">Recent Platform Activity</h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Listing</th>
              <th className="px-6 py-4 font-medium">Renter</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {data.recentRentals.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                  No rentals yet. Activity will appear here as users book listings.
                </td>
              </tr>
            ) : (
              data.recentRentals.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 text-neutral-400">{row.createdAt.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">{row.listing.title}</td>
                  <td className="px-6 py-4 text-neutral-300">{row.renter.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${row.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400" : "bg-neutral-800 text-neutral-400"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
