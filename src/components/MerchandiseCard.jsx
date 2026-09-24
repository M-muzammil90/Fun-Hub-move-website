import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

export default function MerchandiseCard({ item, onAddToCart }) {
  const displayTitle = item.title || item.name;
  const displayPrice = typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price;

  return (
    <div className="group rounded-3xl overflow-hidden border border-[#1b263e] bg-[#0c1222] hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
        <Link to={`/merchandise/${item.slug}`} className="block w-full h-full">
          <img
            src={item.image}
            alt={displayTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {item.discount && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
            {item.discount}
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
            {item.category}
          </span>
          <Link to={`/merchandise/${item.slug}`} className="block">
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {displayTitle}
            </h4>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#1b263e]">
          <span className="text-base font-black text-white font-mono">{displayPrice}</span>

          <button
            type="button"
            onClick={() => onAddToCart && onAddToCart(item)}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 transition-all hover:scale-105"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
