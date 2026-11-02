'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import WhyChooseNaturals from '@/components/home/WhyChooseNaturals';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import SpecialOffers from '@/components/home/SpecialOffers';
import GalleryShowcase from '@/components/home/GalleryShowcase';
import CustomerReviews from '@/components/home/CustomerReviews';
import LocationHours from '@/components/home/LocationHours';
import WhatsAppConcierge from '@/components/common/WhatsAppConcierge';
import BookingModal from '@/components/booking/BookingModal';

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  return (
    <main className="min-h-screen flex flex-col bg-ivory-50 text-onyx-950">
      {/* Premium Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Services Showcase */}
      <ServicesShowcase onSelectService={(id) => handleOpenBooking(id)} />

      {/* Why Choose Naturals */}
      <WhyChooseNaturals />

      {/* Special Offers & Packages */}
      <SpecialOffers onOpenBooking={() => handleOpenBooking()} />

      {/* Salon Gallery */}
      <GalleryShowcase />

      {/* Customer Reviews & Google Rating */}
      <CustomerReviews />

      {/* Location & Opening Hours */}
      <LocationHours />

      {/* Professional Footer */}
      <Footer />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppConcierge />

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        initialServiceId={selectedServiceId}
        onClose={handleCloseBooking}
      />
    </main>
  );
}
