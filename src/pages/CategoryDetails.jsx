import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, ArrowLeft, Users, ShoppingBag, Calendar, Film, Filter, Sparkles, Flame } from 'lucide-react';
import { useData } from '../context/DataContext';
import ContentCard from '../components/ContentCard';
import CharacterCard from '../components/CharacterCard';
import MerchandiseCard from '../components/MerchandiseCard';
import EventCard from '../components/EventCard';
import FavoriteButton from '../components/FavoriteButton';
import EmptyState from '../components/EmptyState';

export default function CategoryDetails() {
  const { slug } = useParams();
  const { categories, contentList, characters, merchandise, events } = useData();

  const category = categories.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState('content');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const relatedContent = useMemo(() => {
    let list = contentList.filter(
      (c) => c.categorySlug === slug || c.category.toLowerCase() === category?.name.toLowerCase()
    );

    if (contentTypeFilter !== 'all') {
      list = list.filter((c) => c.contentType === contentTypeFilter);
    }

    list.sort((a, b) => {
      if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
      if (sortBy === 'newest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [contentList, slug, category, contentTypeFilter, sortBy]);

  const relatedCharacters = useMemo(() => {
    return characters.filter(
      (ch) => ch.categorySlug === slug || ch.category.toLowerCase() === category?.name.toLowerCase()
    );
  }, [characters, slug, category]);

  const relatedMerchandise = useMemo(() => {
    return merchandise.filter(
      (m) => m.categorySlug === slug || m.category.toLowerCase() === category?.name.toLowerCase()
    );
  }, [merchandise, slug, category]);

  const relatedEvents = useMemo(() => {
    return events.filter(
      (e) => e.categorySlug === slug || e.category.toLowerCase() === category?.name.toLowerCase()
    );
  }, [events, slug, category]);

  if (!category) {
    return (
      <EmptyState
        title="Category Not Found"
        description="The category you requested does not exist or has been relocated."
        actionText="Browse Categories"
        actionLink="/categories"
      />
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      <div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-red-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        <div className="relative rounded-3xl overflow-hidden border border-red-500/20 bg-gradient-to-r from-[#170509] via-[#090b12] to-[#120508] p-6 sm:p-12 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src={category.image}
              alt={category.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-20 filter blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#170509] via-[#170509]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Fandom Realm</span>
              </span>
              <FavoriteButton categoryName={category.name} showLabel={true} />
              <span className="text-xs font-mono text-zinc-400 font-bold">
                {category.contentCount ? `${category.contentCount}+ Catalog Entries` : 'Featured Hub'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-medium">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#0c101d] rounded-2xl border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'content'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Content ({relatedContent.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('characters')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'characters'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Characters ({relatedCharacters.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('merchandise')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'merchandise'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Merchandise ({relatedMerchandise.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events ({relatedEvents.length})</span>
          </button>
        </div>

        {activeTab === 'content' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={contentTypeFilter}
              onChange={(e) => setContentTypeFilter(e.target.value)}
              className="px-3.5 py-2 bg-[#0c101d] border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-red-500"
            >
              <option value="all">All Media</option>
              <option value="video">Videos</option>
              <option value="trailer">Trailers</option>
              <option value="article">Articles</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 bg-[#0c101d] border border-white/[0.08] rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-red-500"
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="newest">Sort: Newest</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>
        )}
      </div>

      <div>
        {activeTab === 'content' && (
          relatedContent.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {relatedContent.map((item) => (
                <ContentCard key={item.id} content={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No ${category.name} content matches filters`}
              description="Try adjusting your media format filter or sort criteria."
              actionText="Reset Filter"
              actionLink="#"
              onClick={() => setContentTypeFilter('all')}
            />
          )
        )}

        {activeTab === 'characters' && (
          relatedCharacters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {relatedCharacters.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Characters Registered"
              description={`There are currently no characters indexed under ${category.name}.`}
              actionText="View All Characters"
              actionLink="/characters"
            />
          )
        )}

        {activeTab === 'merchandise' && (
          relatedMerchandise.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {relatedMerchandise.map((item) => (
                <MerchandiseCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Showcase Merchandise"
              description={`There is currently no merchandise listed for ${category.name}.`}
              actionText="View All Merchandise"
              actionLink="/merchandise"
            />
          )
        )}

        {activeTab === 'events' && (
          relatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Upcoming Events"
              description={`There are no scheduled conventions or watch parties for ${category.name}.`}
              actionText="View All Events"
              actionLink="/events"
            />
          )
        )}
      </div>
    </div>
  );
}
