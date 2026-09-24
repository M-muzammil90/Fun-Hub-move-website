import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function EventCard({ event }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0c101d] border border-white/[0.08] hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <Link to={`/events/${event.slug}`} className="block w-full h-full">
            <img
              src={event.image}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-black/30" />
          </Link>

          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
              {event.category}
            </span>
            {event.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
            <span className="inline-flex items-center gap-1.5 font-bold text-rose-400">
              <MapPin className="w-3.5 h-3.5" />
              {event.city}
            </span>
            <span className="font-mono text-[11px] text-zinc-300">
              {event.startDate}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <Link to={`/events/${event.slug}`}>
            <h4 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors font-display">
              {event.title}
            </h4>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-2 truncate">
              <span className="text-zinc-500 font-medium">Venue:</span>
              <span className="text-zinc-300 truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-400 text-[11px] font-mono">{event.startDate} to {event.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          to={`/events/${event.slug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-[#121829] hover:bg-rose-600 text-xs font-bold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all group/btn"
        >
          <span>Get Event Passes</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
