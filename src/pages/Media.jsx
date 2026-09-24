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
  Clock
} from 'lucide-react';
import Modal from '../components/Modal';

export default function Media() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'videos', label: 'Videos' },
    { id: 'wallpapers', label: 'Wallpapers' },
    { id: 'music', label: 'Music' },
    { id: 'podcasts', label: 'Podcasts' }
  ];

  const videoCollection = [
    {
      id: 'v-1',
      title: 'One Piece - Episode 1120',
      category: 'Anime',
      duration: '24:15',
      views: '8.7M views',
      releaseDate: 'May 12, 2025',
      rating: 9.2,
      votes: '248K',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'The Straw Hats face a new challenge as they uncover the truth behind the lost island. Action, adventure, and epic moments await in this exciting episode!'
    },
    {
      id: 'v-2',
      title: 'Demon Slayer - Infinity Castle Trailer',
      category: 'Anime',
      duration: '01:42',
      views: '5.2M views',
      releaseDate: 'May 10, 2025',
      rating: 9.4,
      votes: '190K',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Official theatrical trailer for the final showdown between Tanjiro, the Hashira, and the upper moons.'
    },
    {
      id: 'v-3',
      title: 'Gameplay: Genshin Impact Teyvat Showcase',
      category: 'Gaming',
      duration: '18:07',
      views: '3.2M views',
      releaseDate: 'May 04, 2025',
      rating: 8.9,
      votes: '92K',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'High level exploration and elemental reactions against Fontaine world bosses in 4K 60FPS.'
    },
    {
      id: 'v-4',
      title: 'Attack on Titan - Rumbling AMV',
      category: 'Anime',
      duration: '04:20',
      views: '2.1M views',
      releaseDate: 'Apr 28, 2025',
      rating: 9.1,
      votes: '84K',
      thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Award winning fan edit featuring orchestral remixes and cinematic widescreen combat sequences.'
    }
  ];

  const wallpapers = [
    {
      id: 'w-1',
      title: 'Luffy Gear 5 Sun God Nika 4K',
      category: 'Anime',
      resolution: '3840x2160',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-2',
      title: 'Cyberpunk Neon Ronin Streets',
      category: 'Gaming',
      resolution: '3840x2160',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-3',
      title: 'Geralt of Rivia Midnight Kaer Morhen',
      category: 'Gaming',
      resolution: '2560x1440',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'w-4',
      title: 'K-Pop Neon Concert Stage Glow',
      category: 'K-Pop',
      resolution: '3840x2160',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80'
    }
  ];

  const audioTracks = [
    {
      id: 'a-1',
      title: 'Overtaken - Drums of Liberation Remix',
      artist: 'Kohei Tanaka / Fandom Remix',
      duration: '3:45',
      category: 'Soundtrack'
    },
    {
      id: 'a-2',
      title: 'The Rumbling - Symphonic Orchestra',
      artist: 'SiM & Fandom Strings',
      duration: '4:10',
      category: 'Soundtrack'
    },
    {
      id: 'a-3',
      title: 'Teyvat Lofi Beats to Grind Primos To',
      artist: 'HoYo-MiX Tribute',
      duration: '42:15',
      category: 'Podcast'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative rounded-3xl overflow-hidden border border-[#1a253e] bg-gradient-to-r from-[#0d1425] via-[#090d16] to-[#121b30] p-6 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Multimedia Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Multimedia <span className="text-cyan-400">Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Videos, images, wallpapers, music and more — all in one place for passionate fans.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#0f1629] text-zinc-400 hover:text-white border border-[#1c2741]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-40 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80"
            alt="Anime Media"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1425] via-transparent to-transparent" />
        </div>
      </div>

      {(activeTab === 'all' || activeTab === 'videos') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight font-display">
                Latest Videos & Episodes
              </h2>
              <p className="text-xs text-zinc-400">Stream anime trailers, gameplay clips, and AMVs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoCollection.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#1a253e] bg-[#0c1222] hover:border-blue-500/50 transition-all shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono font-bold text-white border border-white/10">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                    <span>{vid.category}</span>
                    <span>{vid.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeTab === 'all' || activeTab === 'wallpapers') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight font-display">
                Popular Wallpapers (4K Ultra HD)
              </h2>
              <p className="text-xs text-zinc-400">Desktop and mobile resolution fan downloads</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wallpapers.map((wp) => (
              <div
                key={wp.id}
                className="group rounded-2xl overflow-hidden border border-[#1a253e] bg-[#0c1222] hover:border-cyan-500/40 transition-all shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={wp.image}
                    alt={wp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 justify-between">
                    <span className="text-[10px] font-mono text-zinc-300">{wp.resolution}</span>
                    <a
                      href={wp.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="text-xs font-bold text-white truncate">{wp.title}</h4>
                  <span className="text-[10px] font-mono text-zinc-500">{wp.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeTab === 'all' || activeTab === 'music' || activeTab === 'podcasts') && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight font-display">
              Fandom Audio & Podcasts
            </h2>
            <p className="text-xs text-zinc-400">Epic orchestral themes and community roundtable debates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audioTracks.map((track) => (
              <div
                key={track.id}
                className="p-4 rounded-2xl border border-[#1a253e] bg-[#0c1222] flex items-center justify-between hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400 flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{track.title}</h4>
                    <p className="text-[11px] text-zinc-400">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <span>{track.duration}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedVideo({
                        title: track.title,
                        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                        description: `Playing ${track.title} by ${track.artist}`
                      })
                    }
                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title || 'Player'}
      >
        <div className="space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
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
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedVideo?.rating}</span>
                </div>
              )}
            </div>

            <p className="text-zinc-300 leading-relaxed">{selectedVideo?.description}</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#1a253e]">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="px-4 py-1.5 text-xs font-bold bg-[#141e35] text-zinc-200 rounded-xl hover:bg-[#1c2948]"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
