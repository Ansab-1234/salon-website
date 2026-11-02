'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Trash2, Star, Sparkles, Check, AlertCircle } from 'lucide-react';
import { GalleryItem } from '@/types';
import { storage } from '@/lib/storage';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Hair' | 'Skin & Facials' | 'Bridal Studio' | 'Salon Ambience'>('Hair');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(storage.getGallery());
  }, []);

  const handleOpenAdd = () => {
    setTitle('');
    setCategory('Hair');
    setImageUrl('');
    setDescription('');
    setFeatured(false);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      setError('Title and image URL are required.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      description: description.trim() || undefined,
      featured,
    };

    const updated = storage.saveGalleryItem(newItem);
    setItems(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this photo from the salon gallery?')) {
      const updated = storage.deleteGalleryItem(id);
      setItems(updated);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Visual Assets
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Gallery &amp; Showcase Manager
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Manage high-fashion hair, bridal lookbook, and salon ambience imagery.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-onyx-900 border border-gold-500/25 overflow-hidden shadow-xl flex flex-col justify-between group"
          >
            <div className="relative aspect-square overflow-hidden bg-onyx-950">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 bg-onyx-950/80 backdrop-blur-sm text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-500/30">
                {item.category}
              </div>

              {item.featured && (
                <div className="absolute top-3 right-3 bg-gold-500 text-onyx-950 p-1.5 rounded-full shadow-md" title="Featured on Homepage">
                  <Star className="w-3.5 h-3.5 fill-onyx-950" />
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-ivory-50">
                <h4 className="font-serif text-base font-bold leading-tight">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] text-ivory-300 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-onyx-950 border-t border-gold-500/15 flex items-center justify-between">
              <span className="text-[10px] text-gold-400 font-medium">
                {item.featured ? 'Featured' : 'Standard'}
              </span>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-onyx-900 hover:bg-red-950 text-red-400 transition-colors"
                title="Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-onyx-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-onyx-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                Add New Photo to Gallery
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ivory-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950 text-red-200 text-xs border border-red-500/40">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-ivory-200 block mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bridal Reception Glamour"
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="font-semibold text-ivory-200 block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="Hair">Hair</option>
                  <option value="Skin & Facials">Skin &amp; Facials</option>
                  <option value="Bridal Studio">Bridal Studio</option>
                  <option value="Salon Ambience">Salon Ambience</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-ivory-200 block mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="font-semibold text-ivory-200 block mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Styling done with L'Oréal Majirel"
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="feat"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-gold-500"
                />
                <label htmlFor="feat" className="text-ivory-300">
                  Feature prominently on homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-onyx-800 text-ivory-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
