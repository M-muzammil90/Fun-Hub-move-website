import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, ArrowRight, Search, Ticket } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Events() {
  const { events } = useData();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', 'Conventions', 'Meetups', 'Live Stream', 'Competitions'];

  const filteredEvents = events.filter((evt) => {
    const matchesFilter =
      activeFilter === 'All' ||
      evt.category?.toLowerCase() === activeFilter.toLowerCase() ||
      (activeFilter === 'Conventions' && evt.category === 'Convention');
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      evt.city.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  const featuredEvent = events.find((e) => e.featured) || events[0];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative rounded-3xl overflow-hidden border border-[#1a253e] bg-gradient-to-r from-[#0d1425] via-[#090d16] to-[#121b30] p-6 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Fandom Conventions & Summits
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Fandom <span className="text-rose-400">Events</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Meet. Watch. Experience. Be part of the worldwide fandom community!
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-[#0f1629] text-zinc-400 hover:text-white border border-[#1c2741]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-40 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80"
            alt="Event Atmosphere"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1425] via-transparent to-transparent" />
        </div>
      </div>

      {featuredEvent && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-black uppercase">
                Featured Event
              </span>
              <span>Headliner Gathering</span>
            </h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#1e2b47] bg-[#0c1222] shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 aspect-video lg:aspect-auto relative min-h-[300px]">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider">
                    Popular
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {featuredEvent.startDate} — {featuredEvent.endDate}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  {featuredEvent.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{featuredEvent.venue}, {featuredEvent.city}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredEvent.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#141d33] border border-[#22304e] text-blue-400 text-[10px] font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Get Tickets</span>
                </Link>
                <Link
                  to={`/events/${featuredEvent.slug}`}
                  className="px-6 py-3 rounded-2xl border border-[#22304e] hover:bg-[#16223e] text-zinc-300 text-xs font-bold transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-white font-display">
            All Upcoming Fandom Conventions & Meetups
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, venue or event..."
              className="w-full pl-10 pr-4 py-2 bg-[#0c1222] border border-[#1b263e] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group rounded-3xl overflow-hidden border border-[#1a253e] bg-[#0c1222] hover:border-rose-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-mono border border-white/10">
                    {evt.startDate}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                      {evt.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{evt.venue}, {evt.city}</span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/events/${evt.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#141d33] hover:bg-rose-600 text-xs font-bold text-zinc-200 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Event Passes & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
