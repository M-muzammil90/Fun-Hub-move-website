import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Heart, Shield, Film, Gamepad2, Tv, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400 text-xs pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Fan Hub <span className="text-rose-600 font-black">PLUS</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier destination for fandom culture across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga, and Cosplay.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Link
                to="/submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600/90 text-white hover:bg-rose-500 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Submit Creation
              </Link>
              <Link
                to="/feedback"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Feedback
              </Link>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Explore Fandoms
            </h5>
            <ul className="space-y-2">
              <li>
                <Link to="/category/anime" className="hover:text-white transition-colors">Anime Spotlights</Link>
              </li>
              <li>
                <Link to="/category/gaming" className="hover:text-white transition-colors">Gaming & Esports</Link>
              </li>
              <li>
                <Link to="/category/movies" className="hover:text-white transition-colors">Cinematic Premieres</Link>
              </li>
              <li>
                <Link to="/category/k-pop" className="hover:text-white transition-colors">K-Pop Fan Clubs</Link>
              </li>
              <li>
                <Link to="/category/cosplay" className="hover:text-white transition-colors">Cosplay & Crafting</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Community & Events
            </h5>
            <ul className="space-y-2">
              <li>
                <Link to="/characters" className="hover:text-white transition-colors">Character Codex</Link>
              </li>
              <li>
                <Link to="/merchandise" className="hover:text-white transition-colors">Official Merchandise Showcase</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">Global Conventions & Meetups</Link>
              </li>
              <li>
                <Link to="/fan-creations" className="hover:text-white transition-colors">Approved Fan Creations</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-white transition-colors">Saved Watchlist</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Platform & Support
            </h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Fan Hub Plus</Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-white transition-colors">Submit Bug / Query</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Member Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3 text-rose-500" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500">
            © 2026 Fan Hub Plus. All fandom logos and media properties are property of their respective creators.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span>Community Driven</span>
            <span>·</span>
            <span>Zero Slop UI</span>
            <span>·</span>
            <span>Production Grade Frontend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
