import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Layers,
  Film,
  UserCheck,
  ShoppingBag,
  Calendar,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const {
    usersList,
    categories,
    contentList,
    characters,
    merchandise,
    events,
    fanSubmissions,
    feedbackList,
    updateFanSubmissionStatus
  } = useData();

  const pendingSubmissions = fanSubmissions.filter((s) => s.status === 'pending');
  const pendingFeedback = feedbackList.filter((f) => f.status === 'pending');

  const stats = [
    { title: 'Total Registered Users', count: usersList.length, icon: Users, link: '/admin/users', change: '+12% this month' },
    { title: 'Indexed Categories', count: categories.length, icon: Layers, link: '/admin/categories', change: '8 Core Verticals' },
    { title: 'Catalog Media Items', count: contentList.length, icon: Film, link: '/admin/content', change: 'Across All Formats' },
    { title: 'Lore Characters', count: characters.length, icon: UserCheck, link: '/admin/characters', change: 'Universal Codex' },
    { title: 'Showcase Merch Items', count: merchandise.length, icon: ShoppingBag, link: '/admin/merchandise', change: 'Partner Figurine / Props' },
    { title: 'Scheduled Events', count: events.length, icon: Calendar, link: '/admin/events', change: 'Global Conventions' },
    { title: 'Pending Submissions', count: pendingSubmissions.length, icon: Sparkles, link: '/admin/fan-submissions', change: 'Needs Review', alert: pendingSubmissions.length > 0 },
    { title: 'Unread Feedback', count: pendingFeedback.length, icon: MessageSquare, link: '/admin/feedback', change: 'Member Tickets', alert: pendingFeedback.length > 0 }
  ];

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/50" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Cluster: Fanhub-US-Central
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Admin Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            Platform health, community moderation, catalog orchestration, and system logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/content"
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-blue-500/25"
          >
            Manage Catalog
          </Link>
          <Link
            to="/admin/fan-submissions"
            className="px-5 py-2.5 text-xs font-bold text-zinc-300 bg-[#0c101d] hover:bg-[#151c2e] border border-white/[0.08] rounded-xl transition-colors"
          >
            Review Queue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            to={stat.link}
            className="p-5 rounded-3xl bg-[#0c101d] border border-white/[0.08] hover:border-blue-500/40 transition-all space-y-2 group shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 truncate">{stat.title}</span>
              <div
                className={`p-2.5 rounded-xl ${
                  stat.alert
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-[#121829] text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                } transition-colors`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {stat.count}
              </span>
              <span className={`text-[11px] font-bold ${stat.alert ? 'text-amber-400' : 'text-zinc-500'}`}>
                {stat.change}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h2 className="text-lg font-bold text-white tracking-tight font-display">
              Submissions Awaiting Moderation ({pendingSubmissions.length})
            </h2>
          </div>
          <Link
            to="/admin/fan-submissions"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>Full Moderation Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingSubmissions.length > 0 ? (
          <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#0c101d] shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121829]/60 border-b border-white/[0.08] text-zinc-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-5">Creation</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Creator</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-5 text-right">Quick Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-zinc-300">
                {pendingSubmissions.slice(0, 5).map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 flex items-center gap-3">
                      <img
                        src={sub.image}
                        alt={sub.title}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover bg-zinc-950"
                      />
                      <div>
                        <p className="font-bold text-white line-clamp-1">{sub.title}</p>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{sub.description}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-blue-400">{sub.category}</td>
                    <td className="py-3.5 px-4 font-medium">{sub.creator}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">{sub.submissionDate}</td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateFanSubmissionStatus(sub.id, 'approved')}
                          className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateFanSubmissionStatus(sub.id, 'rejected')}
                          className="px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-bold transition-colors"
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
        ) : (
          <div className="p-8 rounded-3xl bg-[#0c101d] border border-white/[0.08] text-center">
            <p className="text-xs text-zinc-400 font-medium">All community fan submissions are reviewed and up to date!</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h2 className="text-lg font-bold text-white tracking-tight font-display">
              Recent Feedback Tickets ({pendingFeedback.length} Unresolved)
            </h2>
          </div>
          <Link
            to="/admin/feedback"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>All Feedback</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbackList.slice(0, 4).map((fb) => (
            <div
              key={fb.id}
              className="p-5 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-2 text-xs shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white truncate text-sm font-display">{fb.subject}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase ${
                    fb.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {fb.status}
                </span>
              </div>
              <p className="text-zinc-400 line-clamp-2 leading-relaxed">{fb.message}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px] text-zinc-400 font-mono">
                <span>From: {fb.userName}</span>
                <span>Type: {fb.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
