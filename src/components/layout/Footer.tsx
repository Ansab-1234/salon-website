import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  Star, 
  ExternalLink,
  ShieldCheck,
  Instagram,
  Facebook
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-onyx-950 text-ivory-100 border-t border-gold-500/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-gold-500/15">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-onyx-900 shadow-gold-glow">
                <span className="font-serif text-lg font-bold text-gold-400">N</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-widest text-ivory-50 uppercase block leading-none">
                  Naturals
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">
                  Vijaya Nagar Colony
                </span>
              </div>
            </div>

            <p className="text-ivory-300/80 text-sm leading-relaxed pt-2">
              Discover your beauty. Define your style. We bring world-class hair, skin, beauty, and bespoke bridal care to Vijaya Nagar Colony, Hyderabad.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-ivory-100">4.8 / 5 Rating</span>
              <span className="text-xs text-ivory-400">(1,480+ Google Reviews)</span>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://maps.app.goo.gl/fo7U1cfaB6Y6Pt1ZA?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-onyx-800 hover:bg-gold-500 hover:text-onyx-950 transition-colors flex items-center justify-center text-ivory-200 border border-gold-500/30"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a 
                href="https://salons.naturals.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-onyx-800 hover:bg-gold-500 hover:text-onyx-950 transition-colors flex items-center justify-center text-ivory-200 border border-gold-500/30"
                aria-label="Official Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/917337582104" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-onyx-800 hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center text-ivory-200 border border-gold-500/30"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wider mb-5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Salon Services
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-300">
              <li>
                <Link href="/services?category=HAIR" className="hover:text-gold-400 transition-colors">
                  Designer Haircuts & Styling
                </Link>
              </li>
              <li>
                <Link href="/services?category=HAIR" className="hover:text-gold-400 transition-colors">
                  Keratin & Silk Smoothening
                </Link>
              </li>
              <li>
                <Link href="/services?category=SKIN" className="hover:text-gold-400 transition-colors">
                  HydraFacial & Deep Oxygen Infusion
                </Link>
              </li>
              <li>
                <Link href="/services?category=SKIN" className="hover:text-gold-400 transition-colors">
                  O3+ & Cheryl’s Radiance Facials
                </Link>
              </li>
              <li>
                <Link href="/services?category=BEAUTY" className="hover:text-gold-400 transition-colors">
                  Rica Italian Waxing & Pedicure
                </Link>
              </li>
              <li>
                <Link href="/services?category=BRIDAL" className="hover:text-gold-400 transition-colors">
                  HD Bridal Makeup & Saree Draping
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gold-400 font-medium hover:underline inline-flex items-center gap-1 mt-1">
                  View Full Price Menu →
                </Link>
              </li>
            </ul>
          </div>

          {/* Salon Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wider mb-5">
              Contact & Location
            </h4>
            <ul className="space-y-3.5 text-sm text-ivory-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  D No 65/3 Rt, 2nd Floor, Main Road, Vijaya Nagar Colony, Hyderabad, Telangana 500057.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+917337582104" className="hover:text-gold-400 transition-colors font-medium">
                  +91 73375 82104
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:naturalsvijaynagarcolony@gmail.com" className="hover:text-gold-400 transition-colors text-xs truncate">
                  naturalsvijaynagarcolony@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>9:00 AM – 9:00 PM (All 7 Days)</span>
              </li>
            </ul>
          </div>

          {/* Direct Actions & Booking */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-gold-400 tracking-wider mb-2">
              Book Your Visit
            </h4>
            <p className="text-xs text-ivory-300/80 leading-relaxed">
              Appointments prevent wait times. Instant WhatsApp confirmations sent directly to your phone.
            </p>
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/book"
                className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-onyx-950 font-semibold text-xs tracking-wider uppercase text-center rounded-lg transition-all shadow-md"
              >
                Instant Online Booking
              </Link>
              <a
                href="https://wa.me/917337582104?text=Hello%20Naturals%20Salon%20Vijaya%20Nagar%20Colony!%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-onyx-900 hover:bg-onyx-800 text-ivory-100 border border-gold-500/40 text-xs font-semibold text-center rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp Concierge</span>
              </a>
              <Link
                href="/admin/login"
                className="text-[11px] text-ivory-400 hover:text-gold-400 flex items-center justify-center gap-1.5 pt-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Staff & Admin Portal Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400">
          <p>© {new Date().getFullYear()} Naturals Salon – Vijaya Nagar Colony, Hyderabad. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://salons.naturals.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold-400 transition-colors inline-flex items-center gap-1"
            >
              Naturals Chain Official <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-gold-400 transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
