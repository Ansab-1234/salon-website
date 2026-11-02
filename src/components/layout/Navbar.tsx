'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-onyx-950 text-ivory-100 text-xs py-2 px-4 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-4 mx-auto sm:mx-0 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 text-gold-400 font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Naturals Salon • Vijaya Nagar Colony, Hyderabad
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-ivory-300">
              <Clock className="w-3 h-3 text-gold-400" />
              9:00 AM – 9:00 PM (All Days)
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-ivory-300">
              <span className="text-yellow-400 font-bold">★ 4.8</span> Google Rating (1,480+ Reviews)
            </span>
          </div>

          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a 
              href="tel:+917337582104" 
              className="inline-flex items-center gap-1.5 hover:text-gold-400 transition-colors font-medium text-xs tracking-wider"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              +91 73375 82104
            </a>
            <span className="text-gold-500/40">|</span>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-1 hover:text-gold-400 text-ivory-300 transition-colors text-xs"
            >
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-ivory-50/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold-500/20' 
            : 'bg-ivory-50/80 backdrop-blur-sm py-4 border-b border-gold-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-500 flex items-center justify-center bg-onyx-950 shadow-sm group-hover:border-gold-400 transition-colors">
                <span className="font-serif text-lg font-bold text-gold-400 tracking-wider">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-widest text-onyx-950 uppercase leading-none">
                  Naturals
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold-700 font-semibold uppercase mt-1">
                  Vijaya Nagar Colony
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-onyx-800">
              <Link 
                href="/#services" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Services
              </Link>
              <Link 
                href="/services" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Price Menu
              </Link>
              <Link 
                href="/#why-us" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Why Naturals
              </Link>
              <Link 
                href="/#offers" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Offers
              </Link>
              <Link 
                href="/#gallery" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Gallery
              </Link>
              <Link 
                href="/#reviews" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Reviews
              </Link>
              <Link 
                href="/#location" 
                className="hover:text-gold-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Location & Hours
              </Link>
            </nav>

            {/* Header Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://wa.me/917337582104?text=Hello%20Naturals%20Salon%20Vijaya%20Nagar%20Colony!%20I%20would%20like%20to%20enquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold tracking-wider text-onyx-900 border border-gold-500/40 rounded-full hover:bg-gold-50 transition-all flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-gold-600" />
              </a>

              {onOpenBooking ? (
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 bg-onyx-950 hover:bg-onyx-900 text-ivory-100 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-gold-glow transition-all flex items-center gap-2 border border-gold-500/50"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Book Appointment</span>
                </button>
              ) : (
                <Link
                  href="/book"
                  className="px-5 py-2.5 bg-onyx-950 hover:bg-onyx-900 text-ivory-100 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-gold-glow transition-all flex items-center gap-2 border border-gold-500/50"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Book Appointment</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-onyx-900 hover:text-gold-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory-50 border-b border-gold-500/20 px-6 py-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4 text-base font-medium text-onyx-900">
              <Link 
                href="/#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Services Showcase</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Full Price Menu</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/#why-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Why Choose Naturals</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/#offers" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Offers & Packages</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Salon Gallery</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/#reviews" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Customer Reviews (4.8★)</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/#location" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10"
              >
                <span>Location & Business Hours</span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>
              <Link 
                href="/admin/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-gold-500/10 text-gold-800"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Admin Portal
                </span>
                <ChevronRight className="w-4 h-4 text-gold-600" />
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                {onOpenBooking ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full py-3 bg-onyx-950 text-ivory-100 rounded-xl text-center font-medium tracking-wide uppercase text-sm border border-gold-500 flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    Book Appointment Online
                  </button>
                ) : (
                  <Link
                    href="/book"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 bg-onyx-950 text-ivory-100 rounded-xl text-center font-medium tracking-wide uppercase text-sm border border-gold-500 flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    Book Appointment Online
                  </Link>
                )}

                <a
                  href="https://wa.me/917337582104?text=Hello%20Naturals%20Salon%20Vijaya%20Nagar%20Colony!%20I%20want%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] text-white rounded-xl text-center font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  Chat on WhatsApp (+91 73375 82104)
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
