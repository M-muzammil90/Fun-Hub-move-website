import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ExternalChatbotWidget from './ExternalChatbotWidget';

export default function Layout() {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-zinc-100 dark:bg-[#080b12] dark:text-zinc-100 flex flex-col selection:bg-[#ff2e63] selection:text-white transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex w-full">
        <Sidebar onChatbotOpen={() => setIsChatbotModalOpen(true)} />
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 max-w-[1680px]">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ExternalChatbotWidget
        isOpen={isChatbotModalOpen}
        onClose={() => setIsChatbotModalOpen(false)}
        onOpen={() => setIsChatbotModalOpen(true)}
      />
    </div>
  );
}
