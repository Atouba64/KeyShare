import { requireRole } from "@/lib/auth";
import { getAdminUsers } from "@/lib/queries";
import { Shield, MoreVertical } from "lucide-react";

export default async function AdminUsersPage() {
  await requireRole(["ADMIN"]);
  const users = await getAdminUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <span className="text-sm text-neutral-500">{users.length} registered users</span>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Activity</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{user.name || "—"}</div>
                  <div className="text-xs text-neutral-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === "ADMIN" && <Shield className="w-3 h-3 text-amber-500" />}
                    <span className={`text-xs font-bold tracking-wider ${
                      user.role === "ADMIN" ? "text-amber-500" :
                      user.role === "PROVIDER" ? "text-blue-400" :
                      user.role === "BOTH" ? "text-amber-400" :
                      user.role === "RENTER" ? "text-emerald-400" : "text-neutral-500"
                    }`}>
                      {user.role || "PENDING"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-400">{user.createdAt.toLocaleDateString()}</td>
                <td className="px-6 py-4 text-neutral-400 text-xs">
                  {user._count.providedListings} listings · {user._count.rentals} rentals
                </td>
                <td className="px-6 py-4 text-right">
                  <button type="button" className="text-neutral-500 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
