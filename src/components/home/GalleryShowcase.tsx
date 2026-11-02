'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, Eye } from 'lucide-react';
import { GalleryItem } from '@/types';
import { storage } from '@/lib/storage';

export default function GalleryShowcase() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setItems(storage.getGallery());
  }, []);

  const categories = ['All', 'Hair', 'Skin & Facials', 'Bridal Studio', 'Salon Ambience'];

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-white border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-700 block mb-2">
            Visual Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-onyx-950">
            Naturals Salon Gallery
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-sm text-onyx-600 leading-relaxed">
            A glimpse into our luxurious transformations, pristine salon interiors, and glamorous bridal styling at Vijaya Nagar Colony.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === cat
                  ? 'bg-onyx-950 text-gold-400 shadow-md border border-gold-500/50'
                  : 'bg-ivory-50 text-onyx-700 border border-gold-500/20 hover:border-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-square bg-onyx-900 border border-gold-500/20 shadow-md hover:shadow-luxury-lg transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-onyx-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold text-ivory-50 leading-snug">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] text-ivory-300 mt-1 line-clamp-1 opacity-80">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-onyx-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveItem(null)}
          />
          <div className="relative z-10 max-w-3xl w-full bg-onyx-950 rounded-3xl overflow-hidden border border-gold-500/40 shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-onyx-900/80 hover:bg-onyx-800 text-white flex items-center justify-center transition-colors border border-gold-500/30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black relative">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-onyx-900 text-ivory-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gold-500/20">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory-50 mt-0.5">
                  {activeItem.title}
                </h3>
                {activeItem.description && (
                  <p className="text-xs text-ivory-300 mt-1">
                    {activeItem.description}
                  </p>
                )}
              </div>

              <a
                href="https://wa.me/917337582104?text=Hello%20Naturals%20Salon!%20I%20saw%20this%20in%20your%20gallery%20and%20want%20to%20enquire."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider shrink-0 text-center transition-all"
              >
                Book This Look
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
