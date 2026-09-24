import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Star,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Calendar,
  Eye,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useData } from '../context/DataContext';
import CategoryCard from '../components/CategoryCard';
import ContentCard from '../components/ContentCard';
import CharacterCard from '../components/CharacterCard';
import Modal from '../components/Modal';

export default function Home() {
  const { categories, contentList, characters } = useData();

  const [trendingCategoryFilter, setTrendingCategoryFilter] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      badge: "ANIME",
      titlePrefix: "Explore the",
      titleHighlight: "Anime Universe",
      subtitle:
        "Dive into epic stories, legendary characters and endless adventures. Your favorite anime, all in one place.",
      ctaText: "Explore Anime",
      ctaLink: "/category/anime",
      trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=85",
      logoText: "One Piece",
      genreText: "Adventure • Action • Fantasy"
    },
    {
      badge: "GAMING",
      titlePrefix: "Enter the",
      titleHighlight: "Gaming Universe",
      subtitle:
        "Discover legendary games, characters, tournaments, gameplay and everything your gaming fandom loves.",
      ctaText: "Explore Gaming",
      ctaLink: "/category/gaming",
      trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=85",
      logoText: "The Witcher",
      genreText: "RPG • Fantasy • Open World"
    },
    {
      badge: "MOVIES",
      titlePrefix: "Experience the",
      titleHighlight: "Cinematic Universe",
      subtitle:
        "Explore iconic movies, legendary characters, trailers, stories and the fandoms behind them.",
      ctaText: "Explore Movies",
      ctaLink: "/category/movies",
      trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1600&auto=format&fit=crop&q=85",
      logoText: "Iron Man",
      genreText: "Action • Sci-Fi • Hero"
    },
    {
      badge: "MANGA",
      titlePrefix: "Discover the",
      titleHighlight: "Manga Universe",
      subtitle:
        "Explore legendary manga stories, characters, upcoming releases and the worlds created by your favorite artists.",
      ctaText: "Explore Manga",
      ctaLink: "/category/manga",
      trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1600&auto=format&fit=crop&q=85",
      logoText: "Solo Leveling",
      genreText: "Action • Dark Fantasy • Webtoon"
    },
    {
      badge: "COSPLAY",
      titlePrefix: "Celebrate the",
      titleHighlight: "Fan Universe",
      subtitle:
        "Discover amazing cosplay, fan creations, events and the creativity of the global fandom community.",
      ctaText: "Explore Cosplay",
      ctaLink: "/category/cosplay",
      trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      bgImage:
        "https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&auto=format&fit=crop&q=85",
      logoText: "Cosplay Hub",
      genreText: "Community • Crafts • Showcase"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];

  const trendingCategories = ['All', 'Anime', 'Gaming', 'Movies', 'TV Shows', 'K-Pop', 'Comics'];

  const filteredTrendingContent = contentList.filter((item) => {
    if (trendingCategoryFilter === 'All') return true;
    return item.category?.toLowerCase() === trendingCategoryFilter.toLowerCase();
  });

  const latestVideos = [
    {
      title: 'One Piece - Episode 1120',
      category: 'Anime',
      views: '8.7M views',
      duration: '24:15',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Demon Slayer - Trailer',
      category: 'Anime',
      views: '5.2M views',
      duration: '01:42',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Gameplay: Genshin Impact',
      category: 'Gaming',
      views: '3.2M views',
      duration: '18:07',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Attack on Titan - AMV',
      category: 'Anime',
      views: '2.1M views',
      duration: '04:20',
      thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const upcomingReleases = [
    {
      date: 'JUN 27, 2025',
      title: 'Demon Slayer: Infinity Castle (Movie)',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80'
    },
    {
      date: 'JUL 05, 2025',
      title: 'Solo Leveling Season 2',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
    },
    {
      date: 'AUG 15, 2025',
      title: 'The Fantastic Four',
      category: 'Movie',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
    },
    {
      date: 'OCT 03, 2025',
      title: 'Jujutsu Kaisen Season 3',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-20 w-full">
      <section
        className="relative rounded-3xl overflow-hidden min-h-[440px] xs:min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] border border-white/10 bg-[#060a14] shadow-2xl flex items-center transition-all duration-700 group/hero"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={activeSlide.bgImage}
            alt={activeSlide.titleHighlight}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center sm:object-right transition-all duration-1000 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a14] via-[#060a14]/90 sm:via-[#060a14]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-transparent to-black/40" />
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-90"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/15 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-90"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="relative z-10 p-5 sm:p-10 lg:p-16 max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2e63]/20 text-[#ff3366] border border-[#ff2e63]/40 text-[11px] sm:text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-lg">
            <Flame className="w-3.5 h-3.5 fill-current text-[#ff2e63]" />
            <span>{activeSlide.badge}</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.08]">
            {activeSlide.titlePrefix}{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ff2e63] via-[#ff2e63] to-[#60a5fa] drop-shadow-[0_0_35px_rgba(255,46,99,0.4)]">
              {activeSlide.titleHighlight}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-lg">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-row items-center gap-3 pt-2">
            <Link
              to={activeSlide.ctaLink}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff2e63] to-[#d6004c] hover:from-[#ff1751] hover:to-[#b80041] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#ff2e63]/40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{activeSlide.ctaText}</span>
            </Link>

            <button
              type="button"
              onClick={() =>
                setActiveVideoModal({
                  title: `${activeSlide.titleHighlight} - Official Trailer`,
                  url: activeSlide.trailerUrl
                })
              }
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Watch Trailer</span>
            </button>
          </div>

          {/* Anime Title & Genres metadata badge on lower left */}
          <div className="flex items-center gap-3 pt-3">
            <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-lg">
              <Flame className="w-4 h-4 text-[#ff2e63]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-tight">{activeSlide.logoText}</h4>
              <p className="text-[11px] text-zinc-400 font-medium">{activeSlide.genreText}</p>
            </div>
          </div>
        </div>

        {/* Center Bottom Slide Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 bg-[#ff2e63] shadow-md shadow-[#ff2e63]/60'
                  : 'w-2.5 bg-white/20 hover:bg-white/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="relative space-y-6">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#5b3bf7]/20 border border-[#5b3bf7]/30 text-indigo-400 mt-0.5 shadow-lg shadow-indigo-500/10 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 fill-indigo-400/20" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-display">
                Explore Fandom Categories
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                Choose your passion. Explore your universe.
              </p>
            </div>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1 -mx-1 px-1">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="snap-start shrink-0 w-[calc(20%-10px)] min-w-[160px]"
            >
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-red-600/20 text-red-400">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight font-display">
                Trending / <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Popular Content</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              The most loved content by our community. Explore what's trending right now!
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {trendingCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTrendingCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  trendingCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                    : 'bg-[#0e1424] text-zinc-400 hover:text-white border border-white/10 hover:bg-[#151f38]'
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              to="/explore"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white shrink-0 ml-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredTrendingContent.slice(0, 6).map((item, idx) => (
            <ContentCard key={item.id} content={item} rank={idx + 1} />
          ))}
        </div>
      </section>

      <section className="relative space-y-6">
        <div className="absolute -top-10 left-6 text-[80px] sm:text-[130px] font-black uppercase tracking-widest text-white/[0.02] select-none pointer-events-none font-display">
          CHARACTERS
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-purple-600/20 text-purple-400">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Characters</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Iconic characters. Legendary stories. Get to know your favorite fandom heroes!
            </p>
          </div>

          <Link
            to="/characters"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {characters.slice(0, 6).map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-blue-600/20 text-blue-400">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Videos & Trailers</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              The latest trailers, clips and exclusive content from your favorite fandoms.
            </p>
          </div>

          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestVideos.map((vid, i) => (
            <div
              key={i}
              onClick={() =>
                setActiveVideoModal({
                  title: vid.title,
                  url: 'https://www.w3schools.com/html/mov_bbb.mp4'
                })
              }
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#090d18] hover:border-red-500/50 transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                  {vid.duration}
                </span>
              </div>

              <div className="p-3.5 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 font-display">
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

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Releases</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Be the first to know fandom the next big thing in your favorite fandoms. Movies, anime, games, and more!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">All</button>
            <button type="button" className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0e1424] text-zinc-400 hover:text-white">Anime</button>
            <button type="button" className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0e1424] text-zinc-400 hover:text-white">Movies</button>
            <button type="button" className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0e1424] text-zinc-400 hover:text-white">TV Shows</button>
            <button type="button" className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#0e1424] text-zinc-400 hover:text-white">Games</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingReleases.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-[#090d18] hover:border-red-500/50 transition-all flex flex-col justify-between"
            >
              <div className="p-3 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold tracking-wider">
                  {item.date}
                </span>
              </div>

              <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-black px-3">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-3 text-center">
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {item.title}
                </h4>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase">
                    {item.category}
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-full border border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-xs font-bold transition-all"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
              Events
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Meet. Watch. Experience. Be part of the fandom!
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 bg-[#090d18] relative group flex flex-col sm:flex-row">
            <div className="sm:w-1/2 relative min-h-[220px] bg-black">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
                alt="Anime Expo Karachi 2025"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-lg">
                Popular
              </span>
            </div>

            <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono">
                  Featured Event
                </span>
                <h3 className="text-xl font-black text-white font-display">
                  Anime Expo Karachi 2025
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Aug 16 - 18, 2025 • Karachi Expo Center</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-600/20 text-blue-400 border border-blue-500/30">Convention</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-600/20 text-purple-400 border border-purple-500/30">Anime</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-pink-600/20 text-pink-400 border border-pink-500/30">Cosplay</span>
                </div>
              </div>

              <Link
                to="/events/anime-expo-karachi-2025"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold text-center shadow-lg transition-all"
              >
                Get Tickets →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-[#090d18] space-y-1">
              <h4 className="text-xs font-bold text-white font-display">Gaming Tournament</h4>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" /> Jul 12, 2025 • Karachi
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-cyan-600/20 text-cyan-400">Gaming</span>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-[#090d18] space-y-1">
              <h4 className="text-xs font-bold text-white font-display">K-Pop Dance Meetup</h4>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" /> Jul 28, 2025 • Lahore
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-pink-600/20 text-pink-400">K-Pop</span>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-[#090d18] space-y-1">
              <h4 className="text-xs font-bold text-white font-display">Cosplay Workshop</h4>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" /> Aug 08, 2025 • Islamabad
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-purple-600/20 text-purple-400">Cosplay</span>
            </div>
          </div>
        </div>
      </section>

      {activeVideoModal && (
        <Modal
          isOpen={true}
          onClose={() => setActiveVideoModal(null)}
          title={activeVideoModal.title}
          size="lg"
        >
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
            <video
              src={activeVideoModal.url}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
