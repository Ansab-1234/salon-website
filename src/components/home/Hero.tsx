'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-ivory-100 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-gold-500/20">
      {/* Subtle Luxury Pattern / Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gold-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gold-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location & Rating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-500/30 shadow-sm">
              <span className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </span>
              <span className="text-xs font-bold text-onyx-900">4.8 / 5 Rating</span>
              <span className="text-gold-500/40">•</span>
              <span className="text-xs text-onyx-600 font-medium">1,480+ Google Reviews</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-onyx-950 leading-[1.12]">
              Discover Your Beauty. <br />
              <span className="text-gold-gradient italic font-normal">Define Your Style.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-onyx-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience internationally recognized salon excellence at{' '}
              <strong className="text-onyx-950 font-semibold">Vijaya Nagar Colony, Hyderabad</strong>. 
              From precision haircuts and medical-grade HydraFacials to luxury bridal suites and keratin therapy, 
              we craft personalized pampering designed just for you.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 bg-onyx-950 hover:bg-onyx-900 text-ivory-100 rounded-full text-xs font-bold uppercase tracking-widest shadow-luxury-lg hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-3 border border-gold-500/60"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href="https://wa.me/917337582104?text=Hello%20Naturals%20Salon%20Vijaya%20Nagar%20Colony!%20I%20want%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-gold-50 text-onyx-900 rounded-full text-xs font-bold uppercase tracking-widest border border-gold-500/40 shadow-sm transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gold-500/20 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gold-100 border border-gold-400/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gold-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-onyx-950">100% Sterilized</h4>
                  <p className="text-[10px] text-onyx-500">Disposable hygiene kits</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gold-100 border border-gold-400/40 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-gold-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-onyx-950">Master Artists</h4>
                  <p className="text-[10px] text-onyx-500">L&apos;Oréal &amp; MAC certified</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gold-100 border border-gold-400/40 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-onyx-950">9 AM – 9 PM</h4>
                  <p className="text-[10px] text-onyx-500">Open all 7 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Salon Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-3 rounded-[2.5rem] border border-gold-500/30 -rotate-1 pointer-events-none" />

              {/* Main Luxury Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white aspect-[4/5] bg-onyx-900">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                  alt="Naturals Salon Vijaya Nagar Colony Luxury Experience"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/80 via-transparent to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-500/30 shadow-lg text-onyx-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gold-700">
                        Official Naturals Franchise
                      </span>
                      <h4 className="font-serif text-sm font-bold text-onyx-950">
                        Vijaya Nagar Colony Branch
                      </h4>
                      <p className="text-[11px] text-onyx-600">
                        2nd Floor, Main Road, Hyderabad
                      </p>
                    </div>

                    <a
                      href="tel:+917337582104"
                      className="w-9 h-9 rounded-full bg-onyx-950 hover:bg-gold-600 text-gold-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
                      aria-label="Direct Call"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Award Badge */}
              <div className="absolute -top-4 -left-4 bg-onyx-950 text-ivory-100 px-4 py-2.5 rounded-2xl border border-gold-500/50 shadow-xl flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <div className="text-left">
                  <div className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold leading-none">
                    Certified Brand
                  </div>
                  <div className="text-xs font-bold text-ivory-50 mt-0.5">
                    Naturals India Chain
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
