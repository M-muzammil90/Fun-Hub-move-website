import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  UserPlus,
  LogIn,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
  Shield,
  AlertCircle,
  Users,
  Star,
  Zap,
  Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import animeBg from '../assets/auth_anime_bg.jpg';

export default function AuthModal({ isOpen, onClose, initialMode = 'register' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMode(initialMode);
    setErrors({});
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset errors when switching modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (mode === 'register' && !name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (mode === 'register' && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      const res = login(email, password);
      if (res.success) {
        onClose();
        navigate('/dashboard');
      }
    } else {
      const res = register({ name, email });
      if (res.success) {
        onClose();
        navigate('/dashboard');
      }
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('fanhub2026');
    const res = login(demoEmail, 'fanhub2026');
    if (res.success) {
      onClose();
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: Users,
      title: 'Connect',
      desc: 'Meet fellow anime & gaming fans'
    },
    {
      icon: Star,
      title: 'Explore',
      desc: 'Latest releases, news & archives'
    },
    {
      icon: Zap,
      title: 'Create',
      desc: 'Share fan arts, stories & lore'
    },
    {
      icon: Crown,
      title: 'Be Part',
      desc: 'Join tournaments & VIP events'
    }
  ];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container: Compact, Sleek, Red & White */}
      <div
        className="relative z-10 w-full max-w-4xl rounded-[28px] bg-[#080305] border-2 border-red-600/70 shadow-[0_0_70px_rgba(220,38,38,0.4),0_0_120px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200 p-4 sm:p-5 lg:p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Red Glows */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header Bar Inside Modal */}
        <div className="relative z-20 flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 p-0.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <div className="w-full h-full bg-[#0d0305] rounded-[10px] flex items-center justify-center">
                <Flame className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-white font-display">
                FAN HUB
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm shadow-red-600/50">
                PLUS
              </span>
            </div>
          </div>

          {/* Right Controls: Mode Toggle & Close Button */}
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex items-center gap-1.5 text-xs text-zinc-300">
              <span>{mode === 'register' ? 'Already have an account?' : "Don't have an account?"}</span>
              <button
                type="button"
                onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
                className="inline-flex items-center gap-1 text-red-400 hover:text-white font-bold transition-colors"
              >
                <span>{mode === 'register' ? 'Login' : 'Register'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-500" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.08] hover:bg-red-600/40 text-zinc-300 hover:text-white border border-white/10 transition-all hover:scale-105"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: 2-Column Side-by-Side Layout */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* Left Column: Anime Artwork & Community Points (Red & White Theme) */}
          <div className="lg:col-span-5 relative hidden sm:flex flex-col justify-between rounded-2xl overflow-hidden p-4 sm:p-5 border border-red-500/30 bg-[#0d0407]">
            {/* Background Anime Character Image with Red/Crimson Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={animeBg}
                alt="Anime Community"
                className="w-full h-full object-cover object-top filter saturate-125 contrast-110 hue-rotate-[-30deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#120308]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080205]/95 via-[#080205]/60 to-transparent" />
            </div>

            {/* Top Heading: White & Red */}
            <div className="relative z-10 space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-500 tracking-tight leading-tight italic drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                Join Our <br />
                Amazing <br />
                Community
              </h2>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </div>

            {/* 4 Feature Items */}
            <div className="relative z-10 space-y-2.5 pt-4">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-red-500/70 bg-red-950/60 text-red-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.35)] group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-black text-white group-hover:text-red-300 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-zinc-300 leading-tight truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Red & White Neon Glowing Form Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl p-4 sm:p-5 bg-[#0d0407]/95 backdrop-blur-2xl border-2 border-red-500/70 shadow-[0_0_35px_rgba(239,68,68,0.3)]">
              
              {/* Header / Avatar Box */}
              <div className="text-center space-y-1.5 mb-3.5">
                <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
                    {mode === 'register' ? (
                      <>
                        Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Account</span>
                      </>
                    ) : (
                      <>
                        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Back</span>
                      </>
                    )}
                  </h1>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    {mode === 'register'
                      ? 'Join Fan Hub Plus and be part of something amazing!'
                      : 'Sign in to access your fandom collection and perks!'}
                  </p>
                </div>

                <div className="w-10 h-0.5 mx-auto rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                
                {/* Full Name (Only on Register) */}
                {mode === 'register' && (
                  <div className="space-y-0.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                      <User className="w-3 h-3 text-red-400" />
                      <span>Full Name</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-9 pr-3 py-2 bg-[#120509]/90 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-2.5 h-2.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email Address */}
                <div className="space-y-0.5">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                    <Mail className="w-3 h-3 text-red-400" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-9 pr-3 py-2 bg-[#120509]/90 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-0.5">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                    <Lock className="w-3 h-3 text-red-400" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'register' ? 'Create a password' : '••••••••'}
                      className="w-full pl-9 pr-9 py-2 bg-[#120509]/90 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password (Only on Register) */}
                {mode === 'register' && (
                  <div className="space-y-0.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                      <Lock className="w-3 h-3 text-red-400" />
                      <span>Confirm Password</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full pl-9 pr-9 py-2 bg-[#120509]/90 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-zinc-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-2.5 h-2.5" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit Button: Red & White */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                  >
                    {mode === 'register' ? (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </>
                    )}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Instant Demo Sign-In (on login mode) */}
              {mode === 'login' && (
                <div className="pt-2.5 border-t border-white/10 mt-3 space-y-1.5">
                  <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest font-black">
                    Instant Demo Access
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('alex.hunter@fanhub.io')}
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-white border border-red-500/40 text-[11px] font-bold transition-all"
                    >
                      <User className="w-3 h-3 text-red-400" />
                      <span>User Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('marcus.vance@fanhub.io')}
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-white border border-red-500/40 text-[11px] font-bold transition-all"
                    >
                      <Shield className="w-3 h-3 text-red-400" />
                      <span>Admin Demo</span>
                    </button>
                  </div>
                </div>
              )}

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-2.5">
                <div className="w-full border-t border-white/10" />
                <span className="absolute px-2.5 bg-[#0d0407] text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              {/* Bottom Switcher */}
              <div className="text-center text-[11px] text-zinc-300">
                <span>{mode === 'register' ? 'Already have an account?' : "Don't have an account?"}</span>
                <button
                  type="button"
                  onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-white font-bold ml-1.5 transition-colors"
                >
                  <span>{mode === 'register' ? 'Login' : 'Register'}</span>
                  <ArrowRight className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
