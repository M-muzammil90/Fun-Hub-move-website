import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Download,
  Image as ImageIcon,
  Headphones,
  Radio,
  Search,
  Share2,
  Bookmark,
  Star,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  Film,
  Volume2,
  Flame,
  ArrowRight
} from 'lucide-react';
import Modal from '../components/Modal';

export default function Media() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Media', icon: Sparkles },
    { id: 'videos', label: 'Videos & AMVs', icon: Film },
    { id: 'wallpapers', label: '4K Wallpapers', icon: ImageIcon },
    { id: 'music', label: 'Soundtracks & OSTs', icon: Headphones },
    { id: 'podcasts', label: 'Fandom Podcasts', icon: Radio }
  ];

  const videoCollection = [
    {
      id: 'v-1',
      title: 'One Piece - Episode 1120: Gear 5 Climax',
      category: 'Anime',
      duration: '24:15',
      views: '8.7M views',
      releaseDate: 'May 12, 2025',
      rating: 9.8,
      votes: '248K',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'The Straw Hats face a legendary clash as they uncover the truth behind Egghead Island. Action, adventure, and epic moments await!'
    },
    {
      id: 'v-2',
      title: 'Demon Slayer - Infinity Castle Cinematic Trailer',
      category: 'Anime',
      duration: '01:42',
      views: '5.2M views',
      releaseDate: 'May 10, 2025',
      rating: 9.9,
      votes: '190K',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Official theatrical trailer for the final showdown between Tanjiro, the Hashira, and the upper moon demons in the Infinity Castle.'
    },
    {
      id: 'v-3',
      title: 'Gameplay: Genshin Impact Fontaine Showcase',
      category: 'Gaming',
      duration: '18:07',
      views: '3.2M views',
      releaseDate: 'May 04, 2025',
      rating: 8.9,
      votes: '92K',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'High level exploration and elemental reactions against Fontaine world bosses in ultra 4K 60FPS.'
    },
    {
      id: 'v-4',
      title: 'Attack on Titan - Rumbling AMV Symphony',
      category: 'Anime',
      duration: '04:20',
      views: '2.1M views',
      releaseDate: 'Apr 28, 2025',
      rating: 9.7,
      votes: '84K',
      thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Award winning fan edit featuring orchestral remixes and cinematic widescreen combat sequences.'
    }
  ];

  const wallpapers = [
    {
      id: 'w-1',
      title: 'Luffy Gear 5 Sun God Nika',
      category: 'Anime',
      resolution: '3840 × 2160 (4K)',
      downloads: '142K',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-2',
      title: 'Cyberpunk Neon Ronin Night',
      category: 'Gaming',
      resolution: '3840 × 2160 (4K)',
      downloads: '98K',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-3',
      title: 'Geralt of Rivia Kaer Morhen',
      category: 'Gaming',
      resolution: '2560 × 1440 (2K)',
      downloads: '76K',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-4',
      title: 'K-Pop Neon Concert Stage Glow',
      category: 'K-Pop',
      resolution: '3840 × 2160 (4K)',
      downloads: '115K',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80'
    }
  ];

  const audioTracks = [
    {
      id: 'a-1',
      title: 'Overtaken - Drums of Liberation Remix',
      artist: 'Kohei Tanaka / Fandom Strings',
      duration: '3:45',
      category: 'Soundtrack',
      plays: '1.4M plays'
    },
    {
      id: 'a-2',
      title: 'The Rumbling - Symphonic Orchestra',
      artist: 'SiM & Fandom Philharmonic',
      duration: '4:10',
      category: 'Soundtrack',
      plays: '2.8M plays'
    },
    {
      id: 'a-3',
      title: 'Teyvat Lofi Beats to Grind Primos To',
      artist: 'HoYo-MiX Official Tribute',
      duration: '42:15',
      category: 'Podcast',
      plays: '850K plays'
    }
  ];

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-red-950/60 bg-gradient-to-r from-[#18060a] via-[#090b12] to-[#120508] p-6 sm:p-12 shadow-[0_0_60px_rgba(220,38,38,0.18)]">
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-red-900/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>Official Vault</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Multimedia <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
            Stream high-bitrate trailers, download 4K UHD desktop & mobile wallpapers, and listen to orchestral fandom soundtracks.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 border border-red-400/40 scale-105'
                      : 'bg-[#0e1018] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-red-500/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-40 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80"
            alt="Anime Media"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18060a] via-transparent to-transparent" />
        </div>
      </div>

      {/* =========================================================
          VIDEOS & EPISODES SECTION
      ========================================================= */}
      {(activeTab === 'all' || activeTab === 'videos') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display flex items-center gap-2">
                <Film className="w-5 h-5 text-red-500" />
                <span>Latest Videos & Episodes</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Stream anime trailers, gameplay showcases, and community AMVs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoCollection.map((vid) => (
              <article
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.08] hover:border-red-500/70 bg-gradient-to-b from-[#13080c] via-[#090b10] to-[#06070a] transition-all duration-400 hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(220,38,38,0.25)] flex flex-col justify-between select-none"
              >
                {/* Poster / Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-black ring-1 ring-white/10 group-hover:ring-red-500/40 transition-all">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/30 to-transparent" />
                  
                  {/* Category Pill Top-Left */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-[9.5px] font-black uppercase tracking-wider shadow-md shadow-red-950/60 border border-red-400/40">
                    {vid.category}
                  </span>

                  {/* Duration Badge Top-Right */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono font-black text-white border border-white/20">
                    {vid.duration}
                  </span>

                  {/* Centered Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-red-500/40 scale-125 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
                      <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:border-red-400/60 shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white group-hover:text-red-400 transition-colors duration-200 line-clamp-2 font-display leading-snug">
                      {vid.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      <span className="text-[10px] font-bold text-zinc-300">{vid.views}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-red-400 group-hover:text-red-300 transition-colors">
                      <span>Watch</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Bottom Red Accent Sweep */}
                  <div className="h-[1.5px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          WALLPAPERS SECTION (4K UHD)
      ========================================================= */}
      {(activeTab === 'all' || activeTab === 'wallpapers') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-red-500" />
                <span>Popular Wallpapers (4K Ultra HD)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Desktop and mobile high-resolution fan downloads</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wallpapers.map((wp) => (
              <article
                key={wp.id}
                className="group rounded-2xl overflow-hidden border border-white/[0.08] hover:border-red-500/70 bg-gradient-to-b from-[#13080b] via-[#090b10] to-[#06070a] transition-all duration-400 hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_36px_rgba(220,38,38,0.22)] flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black ring-1 ring-white/10 group-hover:ring-red-500/30 transition-all">
                  <img
                    src={wp.image}
                    alt={wp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Resolution Tag Top-Left */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white text-zinc-950 text-[9px] font-mono font-black shadow-md">
                    4K UHD
                  </span>

                  {/* Category Pill Top-Right */}
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black uppercase shadow-md">
                    {wp.category}
                  </span>

                  {/* Download Floating Action on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={wp.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-xl shadow-red-600/50 scale-95 group-hover:scale-100 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download 4K</span>
                    </a>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-black text-white group-hover:text-red-400 transition-colors truncate font-display">
                    {wp.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/[0.08]">
                    <span>{wp.resolution}</span>
                    <span className="text-red-400 font-bold">{wp.downloads} Downloads</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          AUDIO & SOUNDTRACKS SECTION
      ========================================================= */}
      {(activeTab === 'all' || activeTab === 'music' || activeTab === 'podcasts') && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display flex items-center gap-2">
              <Headphones className="w-5 h-5 text-red-500" />
              <span>Fandom Audio & Soundtracks</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Epic orchestral themes, remixed tracks, and community podcasts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {audioTracks.map((track) => (
              <article
                key={track.id}
                className="group p-4 sm:p-5 rounded-2xl border border-white/[0.08] hover:border-red-500/70 bg-gradient-to-b from-[#13080c] via-[#090b10] to-[#06070a] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(220,38,38,0.22)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-md">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase bg-red-950/80 text-red-400 border border-red-600/30">
                      {track.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-red-400 transition-colors truncate font-display">
                      {track.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 truncate font-medium">{track.artist}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-bold text-zinc-400">{track.duration}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedVideo({
                        title: track.title,
                        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                        description: `Playing ${track.title} by ${track.artist}`
                      })
                    }
                    className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 hover:scale-110 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Player Modal */}
      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title || 'Player'}
      >
        <div className="space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-red-950/60 shadow-2xl">
            <video
              src={selectedVideo?.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="font-bold text-white text-sm">{selectedVideo?.title}</span>
              {selectedVideo?.rating && (
                <div className="flex items-center gap-1 text-amber-400 font-bold px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedVideo?.rating}</span>
                </div>
              )}
            </div>

            <p className="text-zinc-300 leading-relaxed font-normal">{selectedVideo?.description}</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="px-5 py-2 text-xs font-black bg-red-600 text-white rounded-xl hover:bg-red-500 shadow-md shadow-red-600/30 transition-all"
            >
              Close Player
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
