import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Heart } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContentCard({ content, rank }) {
  const { bookmarks, toggleBookmark } = useData();
  const isBookmarked = bookmarks.some((b) => b.contentSlug === content.slug);

  const getRankBadgeColor = (idx) => {
    switch (idx) {
      case 1:
        return 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-500/30';
      case 2:
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30';
      case 3:
        return 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/30';
      case 4:
        return 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/30';
      case 5:
        return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-amber-500/30';
      case 6:
        return 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-500/30';
      default:
        return 'bg-red-600 text-white';
    }
  };

  const getCategoryBadgeStyle = (category) => {
    switch (category?.toLowerCase()) {
      case 'anime':
        return 'bg-blue-600/30 text-blue-400 border border-blue-500/40';
      case 'gaming':
        return 'bg-cyan-600/30 text-cyan-400 border border-cyan-500/40';
      case 'movies':
      case 'movie':
        return 'bg-purple-600/30 text-purple-400 border border-purple-500/40';
      case 'k-pop':
        return 'bg-pink-600/30 text-pink-400 border border-pink-500/40';
      default:
        return 'bg-red-600/30 text-red-400 border border-red-500/40';
    }
  };

  const currentRank = rank || content.trendingRank;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/70 bg-[#090d18] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(220,38,38,0.2)] flex flex-col justify-between">
      <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-black">
        <img
          src={content.thumbnail}
          alt={content.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/30 to-black/30" />

        {currentRank && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${getRankBadgeColor(
                currentRank
              )}`}
            >
              #{currentRank} Trending
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(content.slug);
          }}
          className={`absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 scale-105'
              : 'bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/15'
          }`}
          aria-label="Add to Favorites"
        >
          <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 space-y-2 z-10">
          <Link to={`/content/${content.slug}`} className="block group-hover:text-red-400 transition-colors">
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1 font-display drop-shadow-sm">
              {content.title}
            </h3>
          </Link>

          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${getCategoryBadgeStyle(content.category)}`}>
              {content.category}
            </span>
          </div>

          <p className="text-[11px] text-zinc-300 font-medium truncate">
            {content.genres ? content.genres.join(' • ') : content.contentType}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{content.rating || '9.0'}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              <span>{content.views || '1.2M'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
