import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Compass, Users, Calendar, PlaySquare } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ExternalChatbotWidget from './ExternalChatbotWidget';

export default function Layout() {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  const mobileNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Characters', path: '/characters', icon: Users },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Media', path: '/media', icon: PlaySquare }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-zinc-100 dark:bg-[#080b12] dark:text-zinc-100 flex flex-col selection:bg-[#ff2e63] selection:text-white transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <div className="flex-1 flex w-full">
        <Sidebar onChatbotOpen={() => setIsChatbotModalOpen(true)} />
        <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1680px] pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      <Footer />

      {/* Mobile App-Style Bottom Navigation Bar (Hidden on Desktop/Tablet >= md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080306]/95 backdrop-blur-xl border-t border-red-500/30 px-2 py-1.5 flex items-center justify-around shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
                  isActive
                    ? 'text-red-400 scale-105 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <ExternalChatbotWidget
        isOpen={isChatbotModalOpen}
        onClose={() => setIsChatbotModalOpen(false)}
        onOpen={() => setIsChatbotModalOpen(true)}
      />
    </div>
  );
}
