'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Sparkles, ArrowRight, Check, Calendar } from 'lucide-react';
import { Service, ServiceCategory } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';

interface ServicesShowcaseProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesShowcase({ onSelectService }: ServicesShowcaseProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('HAIR');

  useEffect(() => {
    setServices(storage.getServices());
  }, []);

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'HAIR', label: 'Hair & Styling', count: services.filter(s => s.category === 'HAIR').length },
    { key: 'SKIN', label: 'Skin & Facials', count: services.filter(s => s.category === 'SKIN').length },
    { key: 'BEAUTY', label: 'Beauty & Grooming', count: services.filter(s => s.category === 'BEAUTY').length },
    { key: 'BRIDAL', label: 'Bridal Studio', count: services.filter(s => s.category === 'BRIDAL').length },
  ];

  const currentServices = services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 bg-ivory-100/70 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-700 block mb-2">
              Bespoke Treatments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-onyx-950">
              Our Signature Services
            </h2>
            <p className="text-sm text-onyx-600 mt-2 max-w-xl">
              From head to toe luxury, experience personalized salon care with world-renowned products and certified technique.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-onyx-950 hover:text-gold-700 transition-colors py-2 border-b-2 border-gold-500 self-start md:self-end"
          >
            <span>Explore Complete Menu & Prices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-gold-500/20 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.key
                  ? 'bg-onyx-950 text-gold-400 shadow-md border border-gold-500/50'
                  : 'bg-white text-onyx-700 border border-gold-500/20 hover:border-gold-400 hover:bg-gold-50/50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                selectedCategory === cat.key ? 'bg-gold-500/20 text-gold-400' : 'bg-gray-100 text-onyx-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white border border-gold-500/25 overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-onyx-900">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/60 via-transparent to-transparent" />

                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-gold-500 text-onyx-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {service.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-onyx-950/90 backdrop-blur-sm text-gold-400 font-serif text-sm font-bold px-3 py-1 rounded-full border border-gold-500/30">
                  {formatPrice(service.price)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-onyx-500 mb-1.5">
                    <span className="uppercase tracking-wider font-semibold text-gold-700">
                      {service.subCategory || service.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      {service.duration} mins
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-onyx-950 leading-snug group-hover:text-gold-800 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-onyx-600 mt-2 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-5 border-t border-gold-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-onyx-400 uppercase tracking-wider block">Starts at</span>
                    <span className="font-serif text-lg font-bold text-onyx-950">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="px-4 py-2.5 rounded-full bg-onyx-950 hover:bg-gold-600 text-ivory-100 hover:text-onyx-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border border-gold-500/30 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-400 group-hover:text-onyx-950" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-gold-50 border border-gold-500/50 text-onyx-950 text-xs font-bold uppercase tracking-widest shadow-sm transition-all"
          >
            <span>View All {services.length} Services & Packages</span>
            <ArrowRight className="w-4 h-4 text-gold-700" />
          </Link>
        </div>
      </div>
    </section>
  );
}
