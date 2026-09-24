import React, { useState } from 'react';
import { UserCheck, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

export default function AdminCharacters() {
  const { characters, categories, addCharacter, updateCharacter, deleteCharacter } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Anime');
  const [shortBio, setShortBio] = useState('');
  const [biography, setBiography] = useState('');
  const [roleOrAffiliation, setRoleOrAffiliation] = useState('');
  const [voiceActor, setVoiceActor] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setCategory(categories[0]?.name || 'Anime');
    setShortBio('');
    setBiography('');
    setRoleOrAffiliation('');
    setVoiceActor('');
    setImage('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80');
    setTags('protagonist, warrior');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setSlug(item.slug);
    setCategory(item.category);
    setShortBio(item.shortBio);
    setBiography(item.biography);
    setRoleOrAffiliation(item.roleOrAffiliation || '');
    setVoiceActor(item.voiceActor || '');
    setImage(item.image);
    setTags(item.tags?.join(', ') || '');
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
      shortBio,
      biography,
      roleOrAffiliation,
      voiceActor,
      image,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    if (editingId) {
      updateCharacter(editingId, payload);
    } else {
      addCharacter(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">
            Manage Lore Characters
          </h1>
          <p className="text-xs text-zinc-400">
            Maintain character profiles, voice actor credits, affiliations, and lore records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md shadow-rose-950"
        >
          <Plus className="w-4 h-4" />
          <span>Add Character</span>
        </button>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search characters by name..."
          className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-850 text-zinc-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Character</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Affiliation</th>
              <th className="py-3.5 px-4">Voice Actor</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredCharacters.map((char) => (
              <tr key={char.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="py-3.5 px-4 flex items-center gap-3">
                  <img
                    src={char.image}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover bg-zinc-900 shrink-0"
                  />
                  <div>
                    <span className="font-bold text-white block">{char.name}</span>
                    <span className="text-[11px] text-zinc-500 line-clamp-1">{char.shortBio}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-rose-400">{char.category}</td>
                <td className="py-3.5 px-4 text-zinc-300">{char.roleOrAffiliation}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">{char.voiceActor}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(char)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                      title="Edit character"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCharacter(char.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900"
                      title="Delete character"
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
        title={editingId ? 'Edit Character' : 'Add Character'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Character Name *
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
                Voice Actor
              </label>
              <input
                type="text"
                value={voiceActor}
                onChange={(e) => setVoiceActor(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Short Bio / Tagline *
            </label>
            <input
              type="text"
              required
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Full Biography *
            </label>
            <textarea
              rows={3}
              required
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
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
              {editingId ? 'Save Changes' : 'Create Character'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
