import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [contentCount, setContentCount] = useState(0);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80');
    setContentCount(0);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setContentCount(cat.contentCount || 0);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSlug = slug.trim() || name.toLowerCase().replace(/\s+/g, '-');

    if (editingId) {
      updateCategory(editingId, {
        name,
        slug: cleanSlug,
        description,
        image,
        contentCount: Number(contentCount)
      });
    } else {
      addCategory({
        name,
        slug: cleanSlug,
        description,
        image,
        contentCount: Number(contentCount)
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Fandom Categories
          </h1>
          <p className="text-xs text-zinc-400">
            Create and edit fandom ecosystems, descriptions, hero artwork, and slug paths.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Slug</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4">Content Count</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={c.image}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover bg-zinc-900"
                  />
                  <span className="font-bold text-white">{c.name}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">{c.slug}</td>
                <td className="py-3.5 px-4 max-w-xs truncate text-zinc-400">{c.description}</td>
                <td className="py-3.5 px-4 font-mono font-semibold text-white">{c.contentCount}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCategory(c.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                      title="Delete category"
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
        title={editingId ? 'Edit Fandom Category' : 'Create Fandom Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!editingId) {
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }
              }}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-rose-500"
            />
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
              Banner Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Content Count
            </label>
            <input
              type="number"
              value={contentCount}
              onChange={(e) => setContentCount(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-rose-500"
            />
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
              {editingId ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
