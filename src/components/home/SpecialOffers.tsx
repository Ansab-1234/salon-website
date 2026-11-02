'use client';

import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Calendar, ArrowRight } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data';

interface SpecialOffersProps {
  onOpenBooking: () => void;
}

export default function SpecialOffers({ onOpenBooking }: SpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const offers = INITIAL_SETTINGS.offers;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-20 bg-onyx-950 text-ivory-100 border-b border-gold-500/20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            Limited Time Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50">
            Exclusive Packages &amp; Offers
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4 mb-4" />
          <p className="text-sm text-ivory-300 leading-relaxed">
            Elevate your self-care ritual with our curated salon privileges at Naturals Vijaya Nagar Colony. Mention coupon codes when booking.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="p-6 rounded-3xl bg-onyx-900 border border-gold-500/30 hover:border-gold-400 transition-all duration-300 flex flex-col justify-between group shadow-luxury"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-400/30">
                    {offer.category || 'Special'}
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-lg font-bold text-gold-400">
                      {offer.discount}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-ivory-50 mb-2 leading-snug group-hover:text-gold-300 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-ivory-300 leading-relaxed mb-4">
                  {offer.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gold-500/20">
                <div className="flex items-center justify-between text-[11px] text-ivory-400">
                  <span>{offer.validTill}</span>
                </div>

                {/* Promo Code Pill */}
                <div className="flex items-center justify-between bg-onyx-950 p-2.5 rounded-xl border border-gold-500/30">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gold-400" />
                    <span className="font-mono text-xs font-bold text-gold-400 tracking-wider">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="text-[11px] font-semibold text-ivory-300 hover:text-white flex items-center gap-1 transition-colors"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Claim Offer & Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
