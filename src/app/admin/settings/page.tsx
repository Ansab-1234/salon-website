'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import { SalonSettings } from '@/types';
import { storage } from '@/lib/storage';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SalonSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(storage.getSettings());
  }, []);

  if (!settings) {
    return <div className="text-ivory-400 text-sm">Loading salon settings...</div>;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    storage.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Salon Configuration
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Business Profile &amp; Settings
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Update branch contact information, operating hours, and customer notification banners.
          </p>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Salon Identity */}
        <div className="p-6 rounded-3xl bg-onyx-900 border border-gold-500/25 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-ivory-50 border-b border-gold-500/20 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            Branch Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                Salon Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                Branch Location Tag
              </label>
              <input
                type="text"
                value={settings.branchName}
                onChange={(e) => setSettings({ ...settings, branchName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-ivory-200 block mb-1">
                Editorial Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-ivory-200 block mb-1">
                Announcement Banner Text (Top of Public Website)
              </label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="p-6 rounded-3xl bg-onyx-900 border border-gold-500/25 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg font-bold text-ivory-50 border-b border-gold-500/20 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold-400" />
            Contact &amp; Operations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                Official Phone Number *
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                WhatsApp Business Number *
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                Salon Email *
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="font-semibold text-ivory-200 block mb-1">
                Operating Timings *
              </label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-ivory-200 block mb-1">
                Full Physical Address *
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-ivory-200 block mb-1">
                Google Maps URL
              </label>
              <input
                type="url"
                value={settings.googleMapsUrl}
                onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Salon Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
