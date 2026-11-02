'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageType, setMessageType] = useState<string>('general');
  const [customName, setCustomName] = useState('');
  const [customService, setCustomService] = useState('Haircut & Styling');

  const businessPhone = "917337582104";

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${businessPhone}?text=${encoded}`, '_blank');
  };

  const getTemplateText = () => {
    if (messageType === 'booking') {
      return `Hello Naturals Salon Vijaya Nagar Colony!\n\nI want to book an appointment.\n\nName: ${customName || '[Your Name]'}\nService: ${customService}\nDate: [Today / Tomorrow]\nTime: [Preferred Time]\n\nPlease confirm availability. Thank you!`;
    }
    if (messageType === 'bridal') {
      return `Hello Naturals Salon Vijaya Nagar Colony!\n\nI want to enquire about Bridal Packages & HD Makeup for my upcoming wedding event.\n\nName: ${customName || '[Your Name]'}\nEvent Date: [Date]\n\nPlease share your packages and bridal suite availability.`;
    }
    return `Hello Naturals Salon Vijaya Nagar Colony!\n\nI would like to enquire about your services, current offers, and walk-in availability today.`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-onyx-950 p-4 text-ivory-100 flex items-center justify-between border-b border-gold-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-onyx-950 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-ivory-50 flex items-center gap-1.5">
                  Naturals Salon Concierge
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </h4>
                <p className="text-[11px] text-ivory-300">Vijaya Nagar Colony • Online Now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-400 hover:text-white p-1 rounded-full hover:bg-onyx-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Body */}
          <div className="p-4 bg-ivory-50/70 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gold-500/20 shadow-sm text-onyx-800">
              <p className="font-medium text-onyx-900 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Namaste! Welcome to Naturals Salon.
              </p>
              <p className="text-onyx-600">
                How can our beauty specialists help you today? Choose an enquiry type or chat directly:
              </p>
            </div>

            {/* Quick Template Selector */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setMessageType('general')}
                className={`py-2 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                  messageType === 'general'
                    ? 'bg-onyx-900 text-ivory-50 border border-gold-500'
                    : 'bg-white text-onyx-800 border border-gray-200 hover:border-gold-400'
                }`}
              >
                General Info
              </button>
              <button
                type="button"
                onClick={() => setMessageType('booking')}
                className={`py-2 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                  messageType === 'booking'
                    ? 'bg-onyx-900 text-ivory-50 border border-gold-500'
                    : 'bg-white text-onyx-800 border border-gray-200 hover:border-gold-400'
                }`}
              >
                Book Service
              </button>
              <button
                type="button"
                onClick={() => setMessageType('bridal')}
                className={`py-2 px-2 rounded-lg text-center font-medium transition-all text-[11px] ${
                  messageType === 'bridal'
                    ? 'bg-onyx-900 text-ivory-50 border border-gold-500'
                    : 'bg-white text-onyx-800 border border-gray-200 hover:border-gold-400'
                }`}
              >
                Bridal Suite
              </button>
            </div>

            {messageType === 'booking' && (
              <div className="space-y-2 pt-1 animate-in fade-in">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-gold-500"
                />
                <select
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-gold-500 bg-white"
                >
                  <option value="Haircut & Styling">Haircut & Styling</option>
                  <option value="HydraFacial Cleanse">HydraFacial Cleanse</option>
                  <option value="Keratin Treatment">Keratin Treatment</option>
                  <option value="Global Hair Colouring">Global Hair Colouring</option>
                  <option value="Bridal Makeup & Package">Bridal Makeup & Package</option>
                  <option value="Manicure & Pedicure">Manicure & Pedicure</option>
                </select>
              </div>
            )}

            {/* Timings Note */}
            <div className="flex items-center justify-between text-[10px] text-onyx-500 pt-1 px-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-600" /> Open: 9 AM - 9 PM
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-600" /> Main Rd, Vijaya Nagar
              </span>
            </div>

            {/* Launch WhatsApp CTA */}
            <button
              onClick={() => handleSend(getTemplateText())}
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/80"
        aria-label="Open WhatsApp Concierge"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
