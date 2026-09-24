import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export default function CharacterCard({ character }) {
  const [liked, setLiked] = useState(false);

  const getFandomBadgeColor = (fandom) => {
    switch (fandom?.toLowerCase()) {
      case 'one piece':
        return 'bg-red-600/30 text-red-400 border border-red-500/40';
      case 'naruto':
        return 'bg-amber-600/30 text-amber-400 border border-amber-500/40';
      case 'attack on titan':
        return 'bg-purple-600/30 text-purple-400 border border-purple-500/40';
      case 'the witcher':
        return 'bg-blue-600/30 text-blue-400 border border-blue-500/40';
      case 'solo leveling':
        return 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40';
      default:
        return 'bg-zinc-600/30 text-zinc-300 border border-zinc-500/40';
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/60 bg-[#090d18] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(220,38,38,0.2)] flex flex-col justify-between">
      <div>
        <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-black">
          <img
            src={character.avatar || character.image}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-black/20" />

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className={`absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              liked
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105'
                : 'bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/15'
            }`}
            aria-label="Favorite Character"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4 space-y-2.5">
          <h3 className="text-base font-bold text-white leading-snug group-hover:text-red-400 transition-colors font-display truncate">
            {character.name}
          </h3>

          <div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${getFandomBadgeColor(
                character.fandom
              )}`}
            >
              {character.fandom || character.category}
            </span>
          </div>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-medium">
            {character.bio || character.description || character.shortBio}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/characters/${character.slug}`}
          className="w-full py-2 px-3 rounded-full border border-purple-500/40 hover:border-red-500 bg-transparent hover:bg-red-600/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-1.5 transition-all group/btn"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
