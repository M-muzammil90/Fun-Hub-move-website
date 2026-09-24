import React, { useState } from 'react';
import { Film, Plus, Edit, Trash2, Sparkles, Search, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminContent() {
  const { contentList, categories, addContent, updateContent, deleteContent, toggleFeatureContent } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Anime');
  const [contentType, setContentType] = useState('video');
  const [thumbnail, setThumbnail] = useState('');
  const [genres, setGenres] = useState('Action, Sci-Fi');
  const [tags, setTags] = useState('cyberpunk, anime');
  const [popularity, setPopularity] = useState(80);
  const [featured, setFeatured] = useState(false);

  const filteredContent = contentList.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesCat = selectedCategory === 'all' || c.categorySlug === selectedCategory || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setCategory(categories[0]?.name || 'Anime');
    setContentType('video');
    setThumbnail('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80');
    setGenres('Action, Fantasy');
    setTags('lore, premiere');
    setPopularity(85);
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description);
    setCategory(item.category);
    setContentType(item.contentType);
    setThumbnail(item.thumbnail);
    setGenres(item.genres?.join(', ') || '');
    setTags(item.tags?.join(', ') || '');
    setPopularity(item.popularity || 75);
    setFeatured(!!item.featured);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const matchedCat = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());

    const payload = {
      title,
      slug: cleanSlug,
      description,
      category,
      categorySlug: matchedCat?.slug || category.toLowerCase(),
      contentType,
      thumbnail,
      genres: genres.split(',').map((g) => g.trim()).filter(Boolean),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      popularity: Number(popularity),
      featured,
      releaseDate: new Date().toISOString().split('T')[0],
      duration: '45m',
      views: 1200,
      author: 'Studio Production',
      imdbRating: '8.1'
    };

    if (editingId) {
      updateContent(editingId, payload);
    } else {
      addContent(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Catalog Content
          </h1>
          <p className="text-xs text-zinc-400">
            Publish, edit metadata, update popularity metrics, or toggle featured showcases.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Item</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-zinc-950/80 border border-zinc-850 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-rose-500"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Popularity</th>
              <th className="py-3.5 px-4">Featured</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredContent.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-8 rounded-lg object-cover bg-zinc-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-white block truncate max-w-xs">{item.title}</span>
                    <span className="text-[11px] text-zinc-500 truncate block">{item.slug}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-400">{item.category}</td>
                <td className="py-3.5 px-4 uppercase font-mono text-[11px] text-zinc-400">{item.contentType}</td>
                <td className="py-3.5 px-4 font-mono font-semibold text-white">{item.popularity}%</td>
                <td className="py-3.5 px-4">
                  <button
                    type="button"
                    onClick={() => toggleFeatureContent(item.id)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors ${
                      item.featured
                        ? 'bg-rose-600 text-white'
                        : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    {item.featured ? 'Featured' : 'Standard'}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                      title="Edit content"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteContent(item.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                      title="Delete content"
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
        title={editingId ? 'Edit Content Item' : 'Add Content Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Title *
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
                Content Type *
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              >
                <option value="video">Video</option>
                <option value="trailer">Trailer</option>
                <option value="article">Article</option>
                <option value="audio">Audio</option>
                <option value="image">Image Gallery</option>
              </select>
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
              Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Genres (comma-separated)
              </label>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Popularity Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-rose-600 rounded"
            />
            <label htmlFor="featured" className="text-xs text-zinc-200 cursor-pointer">
              Pin as Featured Showcase item on Homepage
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
              {editingId ? 'Save Changes' : 'Publish Entry'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
