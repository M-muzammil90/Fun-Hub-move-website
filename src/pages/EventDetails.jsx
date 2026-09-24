import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Share2,
  CalendarPlus,
  Check,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';

export default function EventDetails() {
  const { slug } = useParams();
  const { events } = useData();

  const event = events.find((e) => e.slug === slug) || events[0];

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketConfirmed, setTicketConfirmed] = useState(false);

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  const handleConfirmTicket = (e) => {
    e.preventDefault();
    setTicketConfirmed(true);
    setTimeout(() => {
      setTicketConfirmed(false);
      setTicketModalOpen(false);
    }, 2000);
  };

  const defaultHighlights = [
    'Cosplay Competition with international judges',
    'Gaming Zone featuring tournament setups',
    'Guest Appearances & Voice Actor Q&As',
    'Panel Discussions and World Premieres',
    'Merchandise Stalls & Artist Alley'
  ];

  const highlights = event.highlights || defaultHighlights;

  const gallery = event.gallery || [
    event.image,
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>&gt;</span>
        <Link to="/events" className="hover:text-white">Events</Link>
        <span>&gt;</span>
        <span className="text-white truncate">{event.title}</span>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-[#1b263e] bg-[#0c1222] shadow-2xl">
        <div className="relative h-64 sm:h-96 w-full">
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/60 to-transparent" />
        </div>

        <div className="p-6 sm:p-10 -mt-24 relative z-10 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
              Featured Event
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span className="font-mono">{event.startDate} — {event.endDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{event.venue}, {event.city}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {event.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-[#141d33] border border-[#22304e] text-blue-400 text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setTicketModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Ticket className="w-4 h-4" />
              <span>Get Tickets</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCalendar}
              className="px-6 py-3 rounded-2xl border border-[#22304e] hover:bg-[#16223e] text-zinc-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>{calendarAdded ? 'Added to Calendar!' : 'Add to Calendar'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl border border-[#1a253e] bg-[#0c1222] space-y-4">
            <h2 className="text-xl font-black text-white font-display">About This Event</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-[#1a253e] bg-[#0c1222] space-y-4">
            <h2 className="text-xl font-black text-white font-display">Event Highlights</h2>
            <div className="space-y-2.5">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl border border-[#1a253e] bg-[#0c1222] space-y-4">
            <h2 className="text-xl font-black text-white font-display">Event Atmosphere</h2>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-[#1a253e]">
                  <img src={img} alt="Convention scene" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        title="Reserve Event Passes"
      >
        <form onSubmit={handleConfirmTicket} className="space-y-4 text-xs">
          <p className="text-zinc-300">
            Booking passes for <strong>{event.title}</strong> in {event.city}.
          </p>

          <div>
            <label className="block text-zinc-400 mb-1 font-semibold">Pass Tier</label>
            <select className="w-full px-3 py-2 bg-[#090d16] border border-[#1b263e] rounded-xl text-white">
              <option>Weekend VIP Pass (All 3 Days + Fast Track) - Rs. 4,500</option>
              <option>Single Day Saturday Pass - Rs. 2,000</option>
              <option>Single Day Sunday Pass - Rs. 1,500</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 font-semibold">Number of Passes</label>
            <input
              type="number"
              min="1"
              max="10"
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
              className="w-full px-3 py-2 bg-[#090d16] border border-[#1b263e] rounded-xl text-white"
            />
          </div>

          {ticketConfirmed ? (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-bold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Passes Reserved Successfully!</span>
            </div>
          ) : (
            <div className="flex justify-end gap-2 pt-2 border-t border-[#1b263e]">
              <button
                type="button"
                onClick={() => setTicketModalOpen(false)}
                className="px-3 py-1.5 text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                Confirm Reservation
              </button>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
