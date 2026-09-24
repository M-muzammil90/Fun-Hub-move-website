import React, { useState } from 'react';
import { Sparkles, Check, X, Edit3, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminFanSubmissions() {
  const { fanSubmissions, updateFanSubmissionStatus } = useData();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSub, setEditingSub] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  const filteredSubmissions = fanSubmissions.filter((s) => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      s.creator.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase().trim());
    return matchesStatus && matchesSearch;
  });

  const handleOpenNoteModal = (sub) => {
    setEditingSub(sub);
    setAdminNote(sub.adminNote || '');
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (editingSub) {
      updateFanSubmissionStatus(editingSub.id, editingSub.status, adminNote);
      setEditingSub(null);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight font-display">
          Manage Fan Submissions
        </h1>
        <p className="text-xs text-zinc-400">
          Review community artwork, cosplay photos, and essays before public approval.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-zinc-950/80 border border-zinc-850 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, creator, or category..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
        >
          <option value="all">All Moderation Statuses</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Submission</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Creator</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Admin Note</th>
              <th className="py-3.5 px-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredSubmissions.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={s.image}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-9 rounded-lg object-cover bg-zinc-900 shrink-0"
                  />
                  <div>
                    <span className="font-bold text-white block">{s.title}</span>
                    <span className="text-[11px] text-zinc-500 line-clamp-1">{s.description}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-400">{s.category}</td>
                <td className="py-3.5 px-4 font-medium">{s.creator}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      s.status === 'approved'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : s.status === 'rejected'
                        ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 max-w-xs text-zinc-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">{s.adminNote || 'No notes'}</span>
                    <button
                      type="button"
                      onClick={() => handleOpenNoteModal(s)}
                      className="text-zinc-500 hover:text-white shrink-0"
                      title="Edit note"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateFanSubmissionStatus(s.id, 'approved')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        s.status === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 text-zinc-300 hover:bg-emerald-950 hover:text-emerald-300 border border-zinc-800'
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFanSubmissionStatus(s.id, 'rejected')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        s.status === 'rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-900 text-zinc-300 hover:bg-red-950 hover:text-red-300 border border-zinc-800'
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!editingSub}
        onClose={() => setEditingSub(null)}
        title="Moderation Review Note"
      >
        <form onSubmit={handleSaveNote} className="space-y-4">
          <p className="text-xs text-zinc-400">
            Set administrative feedback or review reason for <strong>{editingSub?.title}</strong>:
          </p>
          <textarea
            rows={3}
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingSub(null)}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-xl"
            >
              Save Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
