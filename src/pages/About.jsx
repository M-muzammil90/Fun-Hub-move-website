import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Shield,
  Heart,
  Globe,
  Film,
  Gamepad2,
  Tv,
  Music,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const coveredFandoms = [
    { title: 'Anime', desc: 'From iconic seasonal shonen to indie arthouse features.' },
    { title: 'Gaming', desc: 'Triple-A blockbusters, competitive esports, and indie gems.' },
    { title: 'Movies', desc: 'Cinematic universes, sci-fi epics, and festival favorites.' },
    { title: 'TV Shows', desc: 'Binge-worthy prestige dramas and speculative fiction.' },
    { title: 'K-Pop', desc: 'Idol releases, world concert tours, and official lightsticks.' },
    { title: 'Comics', desc: 'Multiverse comic runs, graphic novels, and variant covers.' },
    { title: 'Manga', desc: 'Serialized weekly chapters and landmark tankobon volumes.' },
    { title: 'Cosplay', desc: 'Armor fabrication, propmaking, wig styling, and conventions.' }
  ];

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-r from-[#0e1629] via-[#090d16] to-[#121c35] p-8 sm:p-16 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fandom Reimagined</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            The Definitive Sanctuary for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Global Fandom Culture</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto font-medium">
            Fan Hub Plus unites fans, creators, and collectors under one cohesive, high-performance ecosystem built for genuine enthusiasm without friction.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-7 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Community-First Ethos</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
            Every feature is designed around fans: bookmarking personal watchlists with private notes, rating episodes, and sharing fan-made craft with verified attribution.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Curated Integrity</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
            Our moderation system guarantees that all community fan submissions and feedback undergo verification before appearing on the public index.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-[#0c101d] border border-white/[0.08] space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-md">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Universal Accessibility</h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
            Built with fine-grained typographic scaling, responsive dark/light color schemes, and seamless keyboard navigation.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight text-center font-display">
          Eight Covered Universes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coveredFandoms.map((fandom, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0c101d] border border-white/[0.08] space-y-1.5 shadow-lg"
            >
              <h4 className="text-sm font-bold text-blue-400 font-display">{fandom.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{fandom.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d1527] to-[#0a0e1a] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white font-display">Have a suggestion or question?</h3>
          <p className="text-xs text-zinc-400 font-medium">Our team actively reviews member feedback to expand fandom coverage.</p>
        </div>
        <Link
          to="/feedback"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 transition-all shrink-0"
        >
          Submit Feedback
        </Link>
      </div>
    </div>
  );
}
