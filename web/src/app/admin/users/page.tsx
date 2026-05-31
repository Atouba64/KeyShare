"use client";

import { Shield, MoreVertical } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="px-4 py-2 bg-neutral-800 text-white text-sm font-medium rounded-lg border border-neutral-700 hover:bg-neutral-700">
          Export CSV
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {[
              { name: "John Doe", email: "john@example.com", role: "PROVIDER", joined: "May 30, 2026", status: "Active" },
              { name: "Sarah Smith", email: "sarah@example.com", role: "RENTER", joined: "May 29, 2026", status: "Active" },
              { name: "Admin Team", email: "admin@keyshare.online", role: "ADMIN", joined: "Jan 1, 2026", status: "Active" },
              { name: "Bad Actor", email: "hacker@anon.com", role: "RENTER", joined: "May 31, 2026", status: "Banned" },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-xs text-neutral-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === "ADMIN" && <Shield className="w-3 h-3 text-amber-500" />}
                    <span className={`text-xs font-bold tracking-wider ${
                      user.role === "ADMIN" ? "text-amber-500" :
                      user.role === "PROVIDER" ? "text-blue-400" : "text-emerald-400"
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-400">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors">
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
