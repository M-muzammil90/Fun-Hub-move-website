import React, { useState } from 'react';
import { Users, Search, Trash2, Shield, User, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminUsers() {
  const { usersList, updateUserRole, deleteUser } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Platform Users
          </h1>
          <p className="text-xs text-zinc-400">
            View registered fandom accounts, grant administrator privileges, or remove profiles.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Joined Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-xl object-cover bg-zinc-900"
                  />
                  <div>
                    <span className="font-bold text-white block">{u.name}</span>
                    <span className="text-[11px] text-zinc-500 line-clamp-1">{u.bio}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">{u.email}</td>
                <td className="py-3.5 px-4">
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none ${
                      u.role === 'admin'
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-500">{u.joinedDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => deleteUser(u.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
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
