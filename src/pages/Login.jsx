import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Shield, User, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email format';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = login(email, password);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('fanhub2026');
    const res = login(demoEmail, 'fanhub2026');
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d] p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-lg">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Welcome Back
          </h1>
          <p className="text-xs text-zinc-400 font-medium">
            Sign in to access your watchlist, custom notes, ratings, and fan submissions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.hunter@fanhub.io"
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30"
          >
            Sign In to Fan Hub
          </button>
        </form>

        <div className="pt-2 border-t border-white/[0.08] space-y-3">
          <p className="text-[11px] text-zinc-500 text-center uppercase tracking-wider font-bold">
            Instant Demo Sign-In
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('alex.hunter@fanhub.io')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#121829] hover:bg-[#182138] text-zinc-200 border border-white/[0.08] text-xs font-bold transition-colors"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>User Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('marcus.vance@fanhub.io')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-bold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
