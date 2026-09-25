import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  Star,
  Eye,
  Bookmark,
  Share2,
  Download,
  Flag,
  Check,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  Flame
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContentDetails() {
  const { slug } = useParams();
  const { contentList, bookmarks, toggleBookmark, ratings, setRating } = useData();

  const content = contentList.find((c) => c.slug === slug) || contentList[0];
  const isBookmarked = bookmarks.some((b) => b.contentSlug === content.slug);
  const currentRating = ratings[content.slug] || 5;

  const [isPlaying, setIsPlaying] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const relatedEpisodes = [
    {
      title: 'Episode 1119',
      duration: '23:50',
      views: '7.8M views',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Episode 1118',
      duration: '24:10',
      views: '8.1M views',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Episode 1117',
      duration: '23:45',
      views: '7.5M views',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Egghead Arc Official Trailer',
      duration: '02:15',
      views: '11.2M views',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-4 sm:pb-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
        <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
        <span>&gt;</span>
        <Link to="/media" className="hover:text-red-400 transition-colors">Media</Link>
        <span>&gt;</span>
        <span className="text-white truncate font-bold">{content.title} - {content.episodeNumber || 'Featured Stream'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border border-white/[0.08] shadow-2xl group">
            {isPlaying ? (
              <video
                src={content.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform"
                    aria-label="Play media"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-white font-display">About This Episode</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {content.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0c101d] border border-white/[0.08] text-center text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Duration</span>
                <span className="font-mono font-bold text-white">{content.duration || '24:15'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Released</span>
                <span className="font-mono font-bold text-white">{content.releaseDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Type</span>
                <span className="font-mono font-bold text-white">Episode</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
                #{content.slug.replace(/-/g, '')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
                #{content.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
                #Episode1120
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
                {content.category}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {content.genres?.join(' • ')}
              </span>
            </div>

            <h1 className="text-2xl font-black text-white font-display">
              {content.title} - {content.episodeNumber || 'Episode 1120'}
            </h1>

            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{content.rating}</span>
                <span className="text-zinc-500 font-normal">({content.votes || '248K'} votes)</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <Eye className="w-3.5 h-3.5 text-zinc-500" />
                <span>{content.views || '12.4M'} views</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Now</span>
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(content.slug)}
              className={`w-full py-3.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isBookmarked
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/40'
                  : 'border-white/[0.08] hover:bg-white/5 text-zinc-300 hover:text-white bg-[#0c101d]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>

            <div className="flex items-center justify-around pt-2 border-t border-white/[0.08] text-xs text-zinc-400">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <a
                href={content.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                download
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>

              <button
                type="button"
                onClick={() => alert('Content report ticket submitted.')}
                className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
              >
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-2.5 shadow-xl">
            <span className="text-xs font-bold text-white block font-display">Your Community Rating</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(content.slug, star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= currentRating
                        ? 'text-amber-400 fill-current'
                        : 'text-zinc-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono font-bold text-zinc-400 ml-2">
                Score: {currentRating}/5
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4 pt-6 border-t border-white/[0.08]">
        <h3 className="text-xl font-black text-white font-display">Related Media & Episodes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedEpisodes.map((ep, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0c101d] hover:border-red-500/50 transition-all shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-white">
                  {ep.duration}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate font-display">
                  {ep.title}
                </h4>
                <p className="text-[11px] text-zinc-400 font-medium">{ep.views}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
