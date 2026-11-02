'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Clock, 
  Check, 
  AlertCircle,
  Sparkles,
  Tag,
  Search
} from 'lucide-react';
import { Service, ServiceCategory } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('HAIR');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState<number>(500);
  const [duration, setDuration] = useState<number>(45);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gender, setGender] = useState<'Unisex' | 'Women' | 'Men'>('Unisex');
  const [badge, setBadge] = useState('');
  const [popular, setPopular] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setServices(storage.getServices());
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setCategory('HAIR');
    setSubCategory('');
    setPrice(850);
    setDuration(45);
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80');
    setGender('Unisex');
    setBadge('');
    setPopular(false);
    setError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setName(s.name);
    setCategory(s.category);
    setSubCategory(s.subCategory || '');
    setPrice(s.price);
    setDuration(s.duration);
    setDescription(s.description);
    setImageUrl(s.imageUrl);
    setGender(s.gender);
    setBadge(s.badge || '');
    setPopular(Boolean(s.popular));
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0 || duration <= 0) {
      setError('Please provide valid service name, price, and duration.');
      return;
    }

    const newService: Service = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      category,
      subCategory: subCategory.trim() || undefined,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      duration: Number(duration),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      gender,
      badge: badge.trim() || undefined,
      popular,
    };

    const updated = storage.saveService(newService);
    setServices(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this service from the salon menu?')) {
      const updated = storage.deleteService(id);
      setServices(updated);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all salon services and pricing to default official catalog?')) {
      const reset = storage.resetServices();
      setServices(reset);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Salon Services &amp; Pricing
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Update prices, edit descriptions, change timings, and manage treatments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-onyx-900 hover:bg-onyx-800 text-ivory-300 hover:text-white border border-gold-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'HAIR', 'SKIN', 'BEAUTY', 'BRIDAL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-gold-500 text-onyx-950 font-bold shadow-sm'
                  : 'bg-onyx-950 text-ivory-300 hover:text-white border border-gold-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-ivory-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search service name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-onyx-900 border border-gold-500/25 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-gold-400/60 transition-all"
          >
            <div>
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-onyx-950">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-onyx-950/90 text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-500/40">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span className="bg-gold-500 text-onyx-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-onyx-950/90 text-gold-400 font-serif text-base font-bold px-3 py-1 rounded-full border border-gold-500/40">
                  {formatPrice(service.price)}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-ivory-400 mb-1">
                  <span>{service.subCategory || service.category} • {service.gender}</span>
                  <span className="flex items-center gap-1 text-gold-400 font-medium">
                    <Clock className="w-3 h-3" /> {service.duration} mins
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-ivory-50 group-hover:text-gold-300 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-ivory-400 mt-2 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-gold-500/15 mt-3 pt-3">
              <div className="font-serif text-base font-bold text-gold-400">
                {formatPrice(service.price)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="px-3 py-1.5 rounded-lg bg-onyx-800 hover:bg-gold-500 hover:text-onyx-950 text-gold-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Price</span>
                </button>

                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 rounded-lg bg-onyx-800 hover:bg-red-950 text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-onyx-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-onyx-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                  {editingService ? 'Edit Service & Price' : 'Create New Salon Treatment'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">
                  {editingService ? editingService.name : 'New Service'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ivory-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950 text-red-200 text-xs border border-red-500/40 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Keratin Protein Treatment"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="HAIR">HAIR</option>
                    <option value="SKIN">SKIN</option>
                    <option value="BEAUTY">BEAUTY</option>
                    <option value="BRIDAL">BRIDAL</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Sub-Category (Optional)
                  </label>
                  <input
                    type="text"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    placeholder="e.g. Keratin, Facials, Waxing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-gold-400 font-bold focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    step={5}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Gender Suitability
                  </label>
                  <select
                    value={gender}
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Bestseller, Signature, Trending"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-ivory-200 block mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about products used, technique, and benefits..."
                    className="w-full p-3 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-onyx-800 text-ivory-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
