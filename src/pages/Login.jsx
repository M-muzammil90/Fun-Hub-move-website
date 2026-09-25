import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LogIn,
  Mail,
  Lock,
  Shield,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import animeBg from '../assets/auth_anime_bg.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative min-h-screen w-full -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8 py-6 flex flex-col justify-between overflow-hidden bg-[#050209]">
      {/* Background Image Layer with Dark Magenta & Purple Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={animeBg}
          alt="Anime Community Atmosphere"
          className="w-full h-full object-cover object-left opacity-35 filter saturate-150 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07010c]/90 via-[#0d0217]/85 to-[#040108]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050209] via-transparent to-[#07010c]/80" />

        {/* Ambient Neon Glows */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/25 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between py-2 border-b border-white/[0.06] mb-6 sm:mb-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff1361] via-[#d60067] to-[#7928ca] p-0.5 shadow-[0_0_20px_rgba(255,19,97,0.5)]">
            <div className="w-full h-full bg-[#0d0314] rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-pink-500 fill-pink-500" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-white font-display">
              FAN HUB
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#ff1361] text-white text-[10px] font-black uppercase tracking-wider shadow-sm shadow-pink-600/50">
              PLUS
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-zinc-300">
          <span className="hidden xs:inline">Don't have an account?</span>
          <Link
            to="/register"
            className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 font-black transition-colors"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-20 max-w-md w-full mx-auto my-auto pb-10">
        <div className="relative rounded-[32px] p-6 sm:p-9 bg-[#070b16]/90 backdrop-blur-2xl border-2 border-pink-500/70 shadow-[0_0_50px_rgba(236,72,153,0.35),0_0_100px_rgba(139,92,246,0.15)] transition-all">
          
          {/* Header / Avatar Box */}
          <div className="text-center space-y-3 mb-7">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/60 shadow-[0_0_25px_rgba(236,72,153,0.4)]">
              <Flame className="w-7 h-7 text-pink-500 fill-pink-500" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400">Back</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                Sign in to access your fandom collection and perks!
              </p>
            </div>

            <div className="w-12 h-1 mx-auto rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>Email Address</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.hunter@fanhub.io"
                  className="w-full pl-10 pr-4 py-3 bg-[#0a1020]/90 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-inner"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-pink-400 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#0a1020]/90 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-pink-400 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#ff1361] via-[#d60067] to-[#7928ca] hover:from-[#ff2371] hover:to-[#8938da] text-white font-black text-sm shadow-[0_0_30px_rgba(255,19,97,0.45)] hover:shadow-[0_0_45px_rgba(255,19,97,0.7)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Instant Demo Sign-In */}
          <div className="pt-4 border-t border-white/[0.08] mt-6 space-y-2.5">
            <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest font-black">
              Instant Demo Sign-In
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex.hunter@fanhub.io')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-pink-950/30 hover:bg-pink-900/40 text-pink-300 border border-pink-500/30 text-xs font-bold transition-all"
              >
                <User className="w-3.5 h-3.5 text-pink-400" />
                <span>User Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('marcus.vance@fanhub.io')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom Register Text */}
          <div className="text-center text-xs text-zinc-400 pt-4">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 font-bold ml-1.5 transition-colors"
            >
              <span>Create account</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
