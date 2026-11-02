'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppConcierge from '@/components/common/WhatsAppConcierge';
import BookingModal from '@/components/booking/BookingModal';
import { Service, ServiceCategory } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  Search, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Scissors, 
  Heart, 
  ChevronRight,
  Filter
} from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Women' | 'Men' | 'Unisex'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setServices(storage.getServices());
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  const categories = [
    { key: 'ALL', label: 'All Services' },
    { key: 'HAIR', label: 'HAIR' },
    { key: 'SKIN', label: 'SKIN' },
    { key: 'BEAUTY', label: 'BEAUTY' },
    { key: 'BRIDAL', label: 'BRIDAL' },
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesGender = genderFilter === 'All' || s.gender === genderFilter || s.gender === 'Unisex';
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subCategory && s.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesGender && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-onyx-950">
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Header */}
      <section className="bg-onyx-950 text-ivory-100 py-16 px-4 sm:px-6 lg:px-8 border-b border-gold-500/30 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400 block mb-3">
            Naturals Salon • Vijaya Nagar Colony
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ivory-50 tracking-tight">
            Menu of Salon &amp; Bridal Services
          </h1>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-ivory-300 max-w-2xl mx-auto leading-relaxed">
            Every service is rendered using 100% genuine international formulations, disposable hygiene kits, and master certified techniques.
          </p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gold-500/20 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === c.key
                    ? 'bg-onyx-950 text-gold-400 border border-gold-500/50 shadow-sm'
                    : 'bg-ivory-100 text-onyx-700 hover:bg-gold-50 border border-transparent'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search & Gender filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-onyx-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search haircuts, hydrafacial, keratin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-full border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white"
              />
            </div>

            <select
              value={genderFilter}
              onChange={(e: any) => setGenderFilter(e.target.value)}
              className="py-2 px-3 text-xs font-semibold rounded-full border border-gold-500/30 bg-white focus:outline-none text-onyx-800"
            >
              <option value="All">All Genders</option>
              <option value="Women">Women Only</option>
              <option value="Men">Men Only</option>
            </select>
          </div>
        </div>
      </section>

      {/* Service Cards Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-6 flex items-center justify-between text-xs text-onyx-600">
          <span>Showing <strong>{filteredServices.length}</strong> available salon treatments</span>
          <span className="text-gold-700 font-medium">Prices subject to hair length &amp; skin consultation</span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gold-500/20 p-8">
            <Sparkles className="w-10 h-10 text-gold-500 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-onyx-950">No Services Found</h3>
            <p className="text-xs text-onyx-600 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any service matching your search criteria. Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
                setGenderFilter('All');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-onyx-950 text-gold-400 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-gold-500/25 overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-onyx-900">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/70 via-transparent to-transparent" />

                    {/* Badge */}
                    {service.badge && (
                      <div className="absolute top-3 left-3 bg-gold-500 text-onyx-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {service.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 bg-onyx-950/80 backdrop-blur-sm text-gold-400 font-serif text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
                      {service.category} {service.subCategory ? `• ${service.subCategory}` : ''}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-onyx-950 font-serif text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                      {formatPrice(service.price)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-onyx-500 mb-2">
                      <span className="font-semibold text-gold-700 uppercase tracking-wider">
                        {service.gender}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        {service.duration} mins
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-onyx-950 group-hover:text-gold-800 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-onyx-600 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-gold-500/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-onyx-400 tracking-wider block">
                      Starting Price
                    </span>
                    <span className="font-serif text-lg font-bold text-onyx-950">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(service.id)}
                    className="px-5 py-2.5 rounded-full bg-onyx-950 hover:bg-gold-500 text-gold-400 hover:text-onyx-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-gold-500/30 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppConcierge />
      <BookingModal
        isOpen={isBookingOpen}
        initialServiceId={selectedServiceId}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
