import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Search, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminEvents() {
  const { events, categories, addEvent, updateEvent, deleteEvent } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Anime');
  const [city, setCity] = useState('Tokyo');
  const [venue, setVenue] = useState('Tokyo Big Sight');
  const [address, setAddress] = useState('3 Chome-11-1 Ariake, Koto City, Tokyo');
  const [startDate, setStartDate] = useState('2026-08-14');
  const [endDate, setEndDate] = useState('2026-08-16');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [ticketUrl, setTicketUrl] = useState('https://tickets.fanhub.io');

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      e.city.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory(categories[0]?.name || 'Anime');
    setCity('Los Angeles');
    setVenue('Convention Center');
    setAddress('1201 S Figueroa St, Los Angeles, CA 90015');
    setStartDate('2026-07-02');
    setEndDate('2026-07-05');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80');
    setFeatured(false);
    setTicketUrl('https://tickets.fanhub.io');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setSlug(evt.slug);
    setCategory(evt.category);
    setCity(evt.city);
    setVenue(evt.venue);
    setAddress(evt.address);
    setStartDate(evt.startDate);
    setEndDate(evt.endDate);
    setDescription(evt.description);
    setImage(evt.image);
    setFeatured(!!evt.featured);
    setTicketUrl(evt.ticketUrl || 'https://tickets.fanhub.io');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const matchedCat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());

    const payload = {
      title,
      slug: cleanSlug,
      category,
      categorySlug: matchedCat?.slug || category.toLowerCase(),
      city,
      venue,
      address,
      startDate,
      endDate,
      description,
      image,
      featured,
      ticketUrl
    };

    if (editingId) {
      updateEvent(editingId, payload);
    } else {
      addEvent(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Fandom Conventions & Events
          </h1>
          <p className="text-xs text-zinc-400">
            Publish event dates, venue addresses, featured flags, and ticket reservation links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by event or city..."
          className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Event</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">City / Venue</th>
              <th className="py-3.5 px-4">Dates</th>
              <th className="py-3.5 px-4">Featured</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-8 rounded-lg object-cover bg-zinc-900 shrink-0"
                  />
                  <div>
                    <span className="font-bold text-white block">{evt.title}</span>
                    <span className="text-[11px] text-zinc-500">{evt.slug}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-400">{evt.category}</td>
                <td className="py-3.5 px-4 text-zinc-300">
                  <span className="font-semibold text-white block">{evt.city}</span>
                  <span className="text-[11px] text-zinc-500">{evt.venue}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                  {evt.startDate} to {evt.endDate}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      evt.featured
                        ? 'bg-rose-600 text-white'
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                    }`}
                  >
                    {evt.featured ? 'Featured' : 'Regular'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(evt)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                      title="Edit event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEvent(evt.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Event' : 'Add Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Full Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                End Date *
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Description *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featuredEvent"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-rose-600 rounded"
            />
            <label htmlFor="featuredEvent" className="text-xs text-zinc-200 cursor-pointer">
              Mark as Featured Tier-1 Convention
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-xl"
            >
              {editingId ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
