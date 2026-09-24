import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, ShoppingCart, Check, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import MerchandiseCard from '../components/MerchandiseCard';
import Modal from '../components/Modal';

export default function Merchandise() {
  const { merchandise } = useData();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartModalItem, setCartModalItem] = useState(null);

  const categories = ['All', 'Figures', 'Apparel', 'Accessories', 'Home Decor', 'Posters', 'Collectibles'];

  const filteredMerch = merchandise.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const title = item.title || item.name || '';
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      (item.fandom && item.fandom.toLowerCase().includes(searchTerm.toLowerCase().trim()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-20">
      <div className="relative rounded-3xl overflow-hidden border border-[#1b263e] bg-gradient-to-r from-[#0d1425] via-[#090d16] to-[#121b30] p-6 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Official Fandom Store
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Official <span className="text-purple-400">Merchandise</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Bring your favorite fandoms to life. High-quality merch, for true fans.
          </p>

          <div className="pt-2">
            <a
              href="#store-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Now</span>
            </a>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-50 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&auto=format&fit=crop&q=80"
            alt="Merch Collection"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1425] via-transparent to-transparent" />
        </div>
      </div>

      <div id="store-grid" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#0f1629] text-zinc-400 hover:text-white border border-[#1c2741]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gear, statues, hoodies..."
              className="w-full pl-10 pr-4 py-2 bg-[#0c1222] border border-[#1b263e] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredMerch.map((item) => (
            <MerchandiseCard
              key={item.id}
              item={item}
              onAddToCart={(addedItem) => setCartModalItem(addedItem)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!cartModalItem}
        onClose={() => setCartModalItem(null)}
        title="Item Added to Cart"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#090d16] border border-[#1b263e]">
            <img
              src={cartModalItem?.image}
              alt={cartModalItem?.title || cartModalItem?.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-bold text-white text-sm">
                {cartModalItem?.title || cartModalItem?.name}
              </h4>
              <p className="text-blue-400 font-mono font-bold">
                {typeof cartModalItem?.price === 'number'
                  ? `$${cartModalItem?.price.toFixed(2)}`
                  : cartModalItem?.price}
              </p>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <Check className="w-3 h-3" />
                Reserved for checkout
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#1b263e]">
            <button
              type="button"
              onClick={() => setCartModalItem(null)}
              className="px-4 py-2 rounded-xl border border-[#22304d] text-zinc-300 hover:text-white"
            >
              Continue Browsing
            </button>
            <a
              href={cartModalItem?.buyUrl || 'https://store.crunchyroll.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
