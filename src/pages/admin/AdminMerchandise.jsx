import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit, Trash2, Search, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminMerchandise() {
  const { merchandise, categories, addMerchandise, updateMerchandise, deleteMerchandise } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Anime');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('$129.99');
  const [image, setImage] = useState('');
  const [manufacturer, setManufacturer] = useState('Good Smile Arts');
  const [tag, setTag] = useState('Figurine');
  const [upcoming, setUpcoming] = useState(false);
  const [externalUrl, setExternalUrl] = useState('https://store.goodsmile.info');

  const filteredMerchandise = merchandise.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setCategory(categories[0]?.name || 'Anime');
    setDescription('');
    setPrice('$149.99');
    setImage('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80');
    setManufacturer('Official Studio Line');
    setTag('Limited Edition');
    setUpcoming(false);
    setExternalUrl('https://partner.fanhub.io');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setSlug(item.slug);
    setCategory(item.category);
    setDescription(item.description);
    setPrice(item.price);
    setImage(item.image);
    setManufacturer(item.manufacturer || '');
    setTag(item.tag || 'Collectible');
    setUpcoming(!!item.upcoming);
    setExternalUrl(item.externalUrl || '#');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const matchedCat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());

    const payload = {
      name,
      slug: cleanSlug,
      category,
      categorySlug: matchedCat?.slug || category.toLowerCase(),
      description,
      price,
      image,
      manufacturer,
      tag,
      upcoming,
      releaseDate: new Date().toISOString().split('T')[0],
      externalUrl
    };

    if (editingId) {
      updateMerchandise(editingId, payload);
    } else {
      addMerchandise(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Merchandise Showcase
          </h1>
          <p className="text-xs text-zinc-400">
            Showcase collectibles, official partner figurines, apparel drops, and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add Merchandise Item</span>
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search merchandise..."
          className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Tag</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredMerchandise.map((m) => (
              <tr key={m.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={m.image}
                    alt={m.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-contain bg-zinc-900 shrink-0 p-1"
                  />
                  <div>
                    <span className="font-bold text-white block">{m.name}</span>
                    <span className="text-[11px] text-zinc-500">{m.manufacturer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-400">{m.category}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{m.price}</td>
                <td className="py-3.5 px-4 text-zinc-300">{m.tag}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      m.upcoming
                        ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                    }`}
                  >
                    {m.upcoming ? 'Upcoming' : 'Available'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(m)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                      title="Edit merchandise"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMerchandise(m.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                      title="Delete merchandise"
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
        title={editingId ? 'Edit Merchandise' : 'Add Merchandise'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Item Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                Display Price *
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Tag / Classification
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
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
              id="upcoming"
              checked={upcoming}
              onChange={(e) => setUpcoming(e.target.checked)}
              className="accent-rose-600 rounded"
            />
            <label htmlFor="upcoming" className="text-xs text-zinc-200 cursor-pointer">
              Mark as Upcoming Pre-order Drop
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
              {editingId ? 'Save Changes' : 'Create Merchandise'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
