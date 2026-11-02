'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingWizard from '@/components/booking/BookingWizard';
import WhatsAppConcierge from '@/components/common/WhatsAppConcierge';

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-onyx-950">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <BookingWizard />
        </div>
      </main>

      <Footer />
      <WhatsAppConcierge />
    </div>
  );
}
