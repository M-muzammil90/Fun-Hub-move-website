import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Shield,
  Bookmark,
  LogOut,
  Flame,
  UserPlus,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';
import ThemeToggle from "../components/ThemeToggle";
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Industry-level Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const { currentUser, isAuthenticated, isAdmin, logout, switchRole } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const openLoginModal = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const categories = [
    { name: 'Anime', path: '/category/anime' },
    { name: 'Gaming', path: '/category/gaming' },
    { name: 'Movies', path: '/category/movies' },
    { name: 'TV Shows', path: '/category/tv-shows' },
    { name: 'K-Pop', path: '/category/k-pop' },
    { name: 'Comics', path: '/category/comics' },
    { name: 'Manga', path: '/category/manga' },
    { name: 'Cosplay', path: '/category/cosplay' }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060913]/90 border-b border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#ff2e63] to-[#d6004c] p-0.5 shadow-lg shadow-[#ff2e63]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#090d18] rounded-[14px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#ff2e63] fill-[#ff2e63]/20 animate-pulse" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white font-display flex items-baseline gap-1.5 drop-shadow-sm">
                <span>FAN HUB</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-[#ff2e63]/20 text-[#ff3366] border border-[#ff2e63]/40 backdrop-blur-md shadow-sm">
                  PLUS
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <SearchBar
              className="w-full"
              inputClassName="w-full pl-10 pr-9 py-2 text-xs md:text-sm bg-black/35 hover:bg-black/45 border border-white/25 focus:border-white focus:bg-black/60 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all shadow-inner"
              placeholder="Search anime, movies, characters, events..."
            />
          </div>
        
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setHasUnreadNotification(false)}
              className="relative p-2 rounded-xl text-white/80 hover:text-white bg-black/20 hover:bg-black/35 border border-white/15 transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {hasUnreadNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#800a18]" />
              )}
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-black/30 border border-white/25 hover:bg-black/45 transition-colors backdrop-blur-md"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-white/60 transition-all bg-black/20 border border-white/20"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/60"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#30050a] border border-red-500/40 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                    <div className="px-4 py-2 border-b border-red-500/20">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-white/60 truncate">{currentUser.email}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-black/40 text-amber-300 border border-red-500/30">
                          Role: {currentUser.role}
                        </span>
                        <button
                          type="button"
                          onClick={() => switchRole(currentUser.role === 'admin' ? 'user' : 'admin')}
                          className="text-[10px] text-white/70 hover:text-white underline"
                        >
                          Switch
                        </button>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/85 hover:text-white hover:bg-red-900/40"
                      >
                        <Flame className="w-4 h-4 text-amber-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/85 hover:text-white hover:bg-red-900/40"
                      >
                        <User className="w-4 h-4 text-white/70" />
                        Profile Settings
                      </Link>
                      <Link
                        to="/bookmarks"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white/85 hover:text-white hover:bg-red-900/40"
                      >
                        <Bookmark className="w-4 h-4 text-white/70" />
                        My Bookmarks
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-300 hover:text-white hover:bg-red-900/40"
                        >
                          <Shield className="w-4 h-4 text-amber-400" />
                          Admin Console
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-red-500/20">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-300 hover:text-white hover:bg-red-900/40 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="px-4 py-1.5 text-xs font-bold text-white hover:text-pink-300 hover:border-pink-500/50 rounded-full border border-white/25 transition-all bg-black/40 backdrop-blur-md hover:bg-pink-950/30 shadow-sm"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="px-4 py-1.5 text-xs font-black text-white bg-gradient-to-r from-[#ff1361] via-[#d60067] to-[#7928ca] hover:from-[#ff2371] hover:to-[#8938da] rounded-full transition-all shadow-md shadow-pink-600/40 hover:shadow-pink-600/70 hover:scale-105 active:scale-95 border border-pink-400/40"
                >
                  Register
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="xl:hidden p-2 rounded-xl text-white hover:bg-black/25"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <SearchBar
              className="w-full"
              inputClassName="w-full pl-10 pr-9 py-2 text-xs bg-black/40 border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none"
              placeholder="Search anime, games, characters..."
            />

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="flex items-center gap-2 pt-1 pb-2">
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="flex-1 py-2 text-xs font-bold text-center text-white bg-black/40 border border-white/20 rounded-xl hover:border-pink-500/50"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="flex-1 py-2 text-xs font-black text-center text-white bg-gradient-to-r from-[#ff1361] to-[#7928ca] rounded-xl shadow-md shadow-pink-600/40"
                >
                  Register
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Home</Link>
              <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Explore</Link>
              <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Categories</Link>
              <Link to="/characters" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Characters</Link>
              <Link to="/fan-creations" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Articles</Link>
              <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Events</Link>
              <Link to="/media" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Media</Link>
              <Link to="/merchandise" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-xs font-bold text-white hover:bg-black/30 rounded-xl bg-black/20 border border-white/10">Merchandise</Link>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Industry-Level Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </header>
  );
}

