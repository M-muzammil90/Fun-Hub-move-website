import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Flame,
  Gamepad2,
  Film,
  Tv,
  Music,
  Book,
  BookOpen,
  Sparkles,
  Cat,
  Layers
} from 'lucide-react';

export default function CategoryCard({ category }) {
  const getCategoryTheme = (slug) => {
    switch (slug) {
      case 'anime':
        return {
          border: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]',
          icon: <Cat className="w-4 h-4 text-amber-400 shrink-0" />
        };
      case 'gaming':
        return {
          border: 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]',
          icon: <Gamepad2 className="w-4 h-4 text-blue-400 shrink-0" />
        };
      case 'movies':
        return {
          border: 'border-red-500/40 hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]',
          icon: <Film className="w-4 h-4 text-pink-400 shrink-0" />
        };
      case 'tv-shows':
        return {
          border: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]',
          icon: <Tv className="w-4 h-4 text-purple-400 shrink-0" />
        };
      case 'k-pop':
        return {
          border: 'border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]',
          icon: <Music className="w-4 h-4 text-pink-400 shrink-0" />
        };
      case 'comics':
        return {
          border: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]',
          icon: <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
        };
      case 'manga':
        return {
          border: 'border-zinc-400/40 hover:border-zinc-200 hover:shadow-[0_0_25px_rgba(212,212,216,0.35)]',
          icon: <Book className="w-4 h-4 text-zinc-300 shrink-0" />
        };
      case 'cosplay':
        return {
          border: 'border-fuchsia-500/40 hover:border-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]',
          icon: <Sparkles className="w-4 h-4 text-fuchsia-400 shrink-0" />
        };
      default:
        return {
          border: 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]',
          icon: <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
        };
    }
  };

  const theme = getCategoryTheme(category.slug);

  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative flex flex-col justify-end aspect-[3/4] min-h-[175px] xs:min-h-[190px] rounded-2xl overflow-hidden bg-[#090e1c] border ${theme.border} transition-all duration-300 hover:-translate-y-1.5 active:scale-95 shadow-xl`}
    >
      {/* Background Cover Image */}
      <img
        src={category.image}
        alt={category.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/30 to-black/20" />

      {/* Bottom Translucent Floating Pill Bar */}
      <div className="relative z-10 m-2 sm:m-2.5 p-1.5 sm:p-2.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-lg group-hover:border-white/30 transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
          {theme.icon}
          <span className="text-[11px] xs:text-xs sm:text-sm font-black text-white font-display tracking-tight truncate">
            {category.name}
          </span>
        </div>

        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/10 group-hover:bg-blue-600 flex items-center justify-center text-white/80 group-hover:text-white transition-all shrink-0">
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
      </div>
    </Link>
  );
}

