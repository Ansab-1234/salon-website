import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data';

export default function LocationHours() {
  const settings = INITIAL_SETTINGS;

  return (
    <section id="location" className="py-20 bg-white border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-700 block mb-2">
            Visit Our Salon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-onyx-950">
            Location &amp; Opening Hours
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-sm text-onyx-600 leading-relaxed">
            Conveniently situated on Main Road, Vijaya Nagar Colony, with ample parking and easy accessibility from Masab Tank and Mehdipatnam.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details Card */}
          <div className="lg:col-span-5 bg-onyx-950 text-ivory-100 rounded-3xl p-8 border border-gold-500/40 shadow-luxury flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                  Branch Information
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory-50">
                  Naturals Salon
                </h3>
                <p className="text-xs text-gold-400">Vijaya Nagar Colony, Hyderabad</p>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-onyx-800 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory-50 text-xs uppercase tracking-wider mb-0.5">Address</h4>
                    <p className="text-ivory-300 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-onyx-800 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory-50 text-xs uppercase tracking-wider mb-0.5">Operating Timings</h4>
                    <p className="text-ivory-300">
                      {settings.businessHours}
                    </p>
                    <span className="text-[11px] text-gold-400 font-medium">Open on all public holidays & Sundays</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-onyx-800 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory-50 text-xs uppercase tracking-wider mb-0.5">Call Front Desk</h4>
                    <a href={`tel:${settings.phone}`} className="text-gold-300 font-semibold hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-onyx-800 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory-50 text-xs uppercase tracking-wider mb-0.5">Email Inquiries</h4>
                    <a href={`mailto:${settings.email}`} className="text-ivory-300 hover:text-gold-300 truncate block">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 mt-6 border-t border-gold-500/20 flex flex-col sm:flex-row gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://wa.me/917337582104`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-onyx-900 hover:bg-onyx-800 text-ivory-100 border border-gold-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-gold-500/30 shadow-luxury min-h-[420px] bg-ivory-100 relative">
            <iframe
              title="Naturals Salon Vijaya Nagar Colony Hyderabad Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.391769651543!2d78.4449833!3d17.3929657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97711d953935%3A0x6b88b0a7019f200c!2sNaturals%20Salon!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-105"
            />
            
            {/* Overlay Chip */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gold-500/40 shadow-md">
              <span className="text-[10px] uppercase font-bold text-gold-700 block tracking-widest">
                Main Road Landmark
              </span>
              <p className="text-xs font-bold text-onyx-950">
                2nd Floor, D No 65/3 Rt, Vijaya Nagar Colony
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
