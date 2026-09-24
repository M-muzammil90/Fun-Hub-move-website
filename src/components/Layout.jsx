import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ExternalChatbotWidget from './ExternalChatbotWidget';

export default function Layout() {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b12] text-zinc-100 flex flex-col selection:bg-blue-600 selection:text-white">
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
