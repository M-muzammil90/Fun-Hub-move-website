import React, { useState } from 'react';
import { User, Mail, Shield, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Profile() {
  const { currentUser, updateProfile, switchRole } = useAuth();
  const { categories } = useData();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [role, setRole] = useState(currentUser?.role || 'user');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name cannot be empty';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateProfile({ name, email, bio, avatar, role });
    switchRole(role);
    setStatusMessage('Profile information saved successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Identity Settings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
          Manage your account identity, fandom bio, avatar, and role preferences.
        </p>
      </div>

      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d] p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-white/[0.08]">
          <img
            src={avatar || currentUser?.avatar}
            alt={currentUser?.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/50 shadow-xl"
          />
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">{name || currentUser?.name}</h3>
            <p className="text-xs text-zinc-400 font-mono">{email || currentUser?.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {role}
              </span>
              <span className="text-[11px] text-zinc-500">
                Joined: {currentUser?.joinedDate || '2026-03-01'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Display Name / Alias
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Fandom Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other fans your favorite characters, anime, and games..."
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Account Role (Development Switch)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-colors ${
                  role === 'user'
                    ? 'bg-blue-600/30 text-blue-400 border-blue-500/50'
                    : 'bg-black/40 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Regular User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-colors ${
                  role === 'admin'
                    ? 'bg-purple-600/30 text-purple-400 border-purple-500/50'
                    : 'bg-black/40 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Administrator
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
