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
  Ticket,
  MapPin,
  Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';
import CategoryCard from '../components/CategoryCard';
import ContentCard from '../components/ContentCard';
import CharacterCard from '../components/CharacterCard';
import UpcomingReleaseCard from '../components/UpcomingReleaseCard';
import AutoSlider from '../components/AutoSlider';
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

  const [upcomingCategoryFilter, setUpcomingCategoryFilter] = useState('All');
  const upcomingCategories = ['All', 'Anime', 'Movies', 'TV Shows', 'Games'];

  const upcomingReleases = [
    {
      id: 'rel-1',
      title: 'Demon Slayer: Infinity Castle',
      date: 'JUN 27, 2025',
      type: 'MOVIE',
      category: 'Anime',
      themeColor: 'rose',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-2',
      title: 'Solo Leveling Season 2',
      date: 'JUL 05, 2025',
      type: 'SEASON 2',
      category: 'Anime',
      themeColor: 'cyan',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-3',
      title: 'The Fantastic Four',
      date: 'AUG 15, 2025',
      type: 'MOVIE',
      category: 'Movies',
      themeColor: 'amber',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-4',
      title: 'Jujutsu Kaisen Season 3',
      date: 'OCT 03, 2025',
      type: 'SEASON 3',
      category: 'Anime',
      themeColor: 'purple',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-5',
      title: 'Grand Theft Auto VI',
      date: 'NOV 19, 2025',
      type: 'GAME',
      category: 'Games',
      themeColor: 'pink',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-6',
      title: 'Stranger Things Season 5',
      date: 'DEC 12, 2025',
      type: 'SEASON 5',
      category: 'TV Shows',
      themeColor: 'rose',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-7',
      title: 'Chainsaw Man: Reze Arc',
      date: 'JAN 16, 2026',
      type: 'MOVIE',
      category: 'Anime',
      themeColor: 'orange',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=85'
    },
    {
      id: 'rel-8',
      title: 'Avengers: Secret Wars',
      date: 'MAY 01, 2026',
      type: 'MOVIE',
      category: 'Movies',
      themeColor: 'emerald',
      image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=85'
    }
  ];

  const filteredUpcomingReleases = upcomingReleases.filter((item) => {
    if (upcomingCategoryFilter === 'All') return true;
    return item.category?.toLowerCase() === upcomingCategoryFilter.toLowerCase();
  });

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

      <section className="relative space-y-4">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 shadow-md shadow-red-500/10 shrink-0">
              <Sparkles className="w-4 h-4 text-red-500 fill-red-500/20" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight font-display">
              Explore <span className="text-red-500">Fandom Categories</span>
            </h2>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-red-400 transition-colors shrink-0"
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

      <section className="space-y-4">
        {/* Responsive Header Row: Title on top/left, Filter pills with full-width smooth scroll on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Flame + Label */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 shrink-0">
                <Flame className="w-4 h-4 fill-current text-red-500" />
              </div>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-300 font-display flex items-baseline gap-1.5">
                <span>Trending /</span>
                <span className="text-red-500">Popular Content</span>
              </h2>
            </div>
            
            <Link
              to="/explore"
              className="sm:hidden inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-red-400 shrink-0 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right: Category filter pills - smooth full width horizontal scroll on mobile, flex-wrap on desktop */}
          <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {trendingCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTrendingCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                  trendingCategoryFilter === cat
                    ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-lg shadow-red-600/30 border border-red-400/40'
                    : 'bg-[#0e1424] text-zinc-400 hover:text-white border border-white/10 hover:bg-[#151f38]'
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              to="/explore"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white shrink-0 ml-1 whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Slider */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          {filteredTrendingContent.slice(0, 8).map((item, idx) => (
            <div key={item.id} className="snap-start shrink-0 w-[160px] sm:w-[185px] lg:w-[calc(20%-13px)]">
              <ContentCard content={item} rank={idx + 1} />
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURED CHARACTERS (AUTO SLIDER, NO ARROWS, GLOWING CARDS)
      ========================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 shadow-md shadow-red-500/10 shrink-0">
              <Star className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight font-display">
              Featured <span className="text-red-500">Characters</span>
            </h2>
          </div>
          <Link to="/characters" className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors shrink-0">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Auto Slider - Wider classical cards */}
        <AutoSlider itemClassName="w-[270px] sm:w-[300px] md:w-[320px] shrink-0" autoPlayInterval={3400}>
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
            />
          ))}
        </AutoSlider>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 shadow-md shadow-red-500/10 shrink-0">
              <Play className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight font-display">
              Latest <span className="text-red-500">Videos & Trailers</span>
            </h2>
          </div>

          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latestVideos.map((vid, i) => (
            <div
              key={i}
              onClick={() =>
                setActiveVideoModal({
                  title: vid.title,
                  url: 'https://www.w3schools.com/html/mov_bbb.mp4'
                })
              }
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.07] bg-gradient-to-b from-[#0e1220] to-[#090d18] hover:border-red-500/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(239,68,68,0.15)] hover:-translate-y-1.5"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category badge - top left */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-red-600/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white shadow-md shadow-red-900/40 border border-red-400/30">
                  {vid.category}
                </span>

                {/* Duration badge - top right */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                  {vid.duration}
                </span>

                {/* Centered animated play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-red-500/30 scale-125 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                    <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:border-red-400/50 shadow-xl group-hover:shadow-red-500/40 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info bar */}
              <div className="p-4 space-y-2.5">
                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors duration-200 line-clamp-1 font-display leading-snug">
                  {vid.title}
                </h4>

                <div className="flex items-center justify-between">
                  {/* Views pill */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10">
                    <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-semibold text-zinc-400">{vid.views}</span>
                  </div>

                  {/* Watch button */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    Watch
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="h-[1px] bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          UPCOMING RELEASES (AUTO SLIDER, NO ARROWS, GLOWING CARDS)
      ========================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-500 shadow-md shadow-red-500/10 shrink-0">
                <Calendar className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight font-display flex items-baseline gap-1.5">
                <span>Upcoming</span>
                <span className="text-red-500">Releases</span>
              </h2>
            </div>

            <Link
              to="/explore"
              className="sm:hidden inline-flex items-center gap-1 text-xs font-bold text-zinc-300 hover:text-red-400 shrink-0 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {upcomingCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setUpcomingCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                  upcomingCategoryFilter === cat
                    ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md shadow-red-600/30 border border-red-400/40'
                    : 'bg-[#0a0f1d] text-zinc-400 hover:text-white border border-white/10 hover:bg-[#121a30]'
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              to="/explore"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-zinc-300 hover:text-red-400 shrink-0 ml-1 transition-colors whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Auto Slider - No arrows */}
        <AutoSlider itemClassName="w-[260px] xs:w-[280px] sm:w-[300px] shrink-0" autoPlayInterval={3200}>
          {filteredUpcomingReleases.map((item) => (
            <UpcomingReleaseCard key={item.id} item={item} />
          ))}
        </AutoSlider>
      </section>

      {/* =========================================================
          EVENTS SECTION (BLACK & CRIMSON RED NEON THEME)
      ========================================================= */}
      {/* =========================================================
          FANDOM EVENTS (RED & WHITE HIGH-CONTRAST THEME)
      ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] shrink-0 border border-red-400/40">
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-[10px] font-black uppercase tracking-wider text-red-400">
                <Flame className="w-3 h-3 text-red-500" />
                <span>Live Fandom Summits</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display flex items-baseline gap-2">
                <span>Fandom</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]">
                  Events
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                Meet legendary creators, participate in cosplay championships & experience live fandom summits!
              </p>
            </div>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all shrink-0 border border-red-400/40 hover:scale-105"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Red & White Event Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Featured Big Event Banner */}
          <div className="lg:col-span-7 xl:col-span-8 rounded-[28px] overflow-hidden border border-red-500/40 bg-gradient-to-b from-[#13080c] via-[#090b10] to-[#050608] hover:border-red-400 transition-all duration-500 shadow-[0_0_35px_rgba(220,38,38,0.25)] hover:shadow-[0_0_55px_rgba(239,68,68,0.45)] flex flex-col md:flex-row group relative">
            <div className="md:w-1/2 relative min-h-[260px] sm:min-h-[300px] bg-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=85"
                alt="Anime Expo Karachi 2025"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/50" />

              {/* Badges Top */}
              <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-600/60 border border-red-400/40">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Featured Event
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-zinc-950 shadow-md font-sans">
                  ★ Popular
                </span>
              </div>

              {/* Price Tag Bottom */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black bg-black/85 backdrop-blur-md text-white border border-red-500/40 shadow-lg">
                  <span className="text-red-400">Tickets:</span> Rs. 1,500 - Rs. 4,500
                </span>
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-gradient-to-b from-[#14080c] to-[#07080d]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4 fill-current animate-pulse text-red-500" />
                  <span>Mega Fandom Convention</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-tight group-hover:text-red-400 transition-colors">
                  Anime Expo Karachi 2025
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  The biggest anime, gaming and pop culture event is back! Meet voice actors, join cosplay championships & shop exclusive merchandise.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="font-bold text-white">Aug 16 - 18, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-zinc-200">Karachi Expo Center, Main University Rd</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white text-zinc-950">Convention</span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-red-950/80 text-red-300 border border-red-600/40">Cosplay Contest</span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-red-950/80 text-red-300 border border-red-600/40">Gaming Zone</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/events/anime-expo-karachi-2025"
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-black text-center shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] flex items-center justify-center gap-2 transition-all group/btn border border-red-400/40"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Get Event Passes</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stacked Side Event Cards */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between gap-4">
            {/* Side Card 1 */}
            <Link
              to="/events/gaming-tournament-finals"
              className="p-4 rounded-2xl border border-white/[0.08] hover:border-red-500/70 bg-[#090b10] hover:bg-[#12080c] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative ring-1 ring-white/10 group-hover:ring-red-500/40 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80"
                  alt="Gaming Tournament 2025"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-white text-red-600 shadow-md">
                  JUL 12
                </span>
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-red-600 text-white">
                    Gaming
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">Rs. 1,000</span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors truncate font-display">
                  Gaming Tournament 2025
                </h4>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="truncate">Cyber Arena Dome • Karachi</span>
                </p>
              </div>
            </Link>

            {/* Side Card 2 */}
            <Link
              to="/events/k-pop-dance-meetup"
              className="p-4 rounded-2xl border border-white/[0.08] hover:border-red-500/70 bg-[#090b10] hover:bg-[#12080c] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative ring-1 ring-white/10 group-hover:ring-red-500/40 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80"
                  alt="K-Pop Dance Meetup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-white text-red-600 shadow-md">
                  JUL 28
                </span>
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-red-600 text-white">
                    K-Pop
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">Free Entry</span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors truncate font-display">
                  K-Pop Dance & Fandom Meetup
                </h4>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="truncate">Central Fandom Plaza • Karachi</span>
                </p>
              </div>
            </Link>

            {/* Side Card 3 */}
            <Link
              to="/events/cosplay-workshop-prop-crafting"
              className="p-4 rounded-2xl border border-white/[0.08] hover:border-red-500/70 bg-[#090b10] hover:bg-[#12080c] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative ring-1 ring-white/10 group-hover:ring-red-500/40 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80"
                  alt="Cosplay Workshop & Crafting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-white text-red-600 shadow-md">
                  AUG 08
                </span>
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-red-600 text-white">
                    Cosplay
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white bg-white/[0.08] px-2 py-0.5 rounded">Rs. 2,000</span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors truncate font-display">
                  Cosplay Prop Workshop
                </h4>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="truncate">Art Guild Studios • Lahore</span>
                </p>
              </div>
            </Link>
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
