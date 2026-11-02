'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle,
  MessageCircle,
  Scissors,
  Printer,
  Share2
} from 'lucide-react';
import { Service, Appointment } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice, TIME_SLOTS, generateBookingReference, getWhatsAppBookingLink } from '@/lib/utils';

interface BookingWizardProps {
  initialServiceId?: string;
  onSuccess?: (appointment: Appointment) => void;
  onClose?: () => void;
}

export default function BookingWizard({ initialServiceId, onSuccess, onClose }: BookingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'HAIR' | 'SKIN' | 'BEAUTY' | 'BRIDAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Booking State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [genderPreference, setGenderPreference] = useState<'Any' | 'Female Stylist' | 'Male Stylist'>('Any');
  const [notes, setNotes] = useState('');

  // Status & Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Load Services
  useEffect(() => {
    const list = storage.getServices();
    setServices(list);

    if (initialServiceId) {
      const found = list.find((s) => s.id === initialServiceId);
      if (found) {
        setSelectedService(found);
        setStep(2); // Jump straight to date selection if service is preselected
      }
    }

    // Default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, [initialServiceId]);

  // Filter Services
  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === 'ALL' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Today & Tomorrow strings
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Helper to check if a specific slot is booked on selectedDate
  const checkSlotAvailability = (slot: string) => {
    if (!selectedDate) return true;
    return !storage.isSlotBooked(selectedDate, slot);
  };

  // Step 4 Validation
  const canProceedToConfirmation = () => {
    return (
      customerName.trim().length >= 2 &&
      customerPhone.trim().replace(/[^0-9]/g, '').length >= 10 &&
      selectedService !== null &&
      selectedDate !== '' &&
      selectedTime !== ''
    );
  };

  // Handle final submission
  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select service, date, and time slot.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ref = generateBookingReference();
      const newApt = storage.createAppointment({
        bookingReference: ref,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        date: selectedDate,
        timeSlot: selectedTime,
        genderPreference: genderPreference,
        notes: notes.trim() || undefined,
      });

      setConfirmedAppointment(newApt);
      setStep(5);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#D4AF37', '#111111', '#B08E55'],
        });
      } catch (e) {
        // confetti fallback
      }

      if (onSuccess) onSuccess(newApt);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete booking. Please choose another time slot.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-luxury-lg border border-gold-500/30 overflow-hidden">
      {/* Top Header / Progress Indicator */}
      <div className="bg-onyx-950 p-6 text-ivory-100 border-b border-gold-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-ivory-50">
                Book Luxury Salon Experience
              </h2>
              <p className="text-xs text-gold-400/90 tracking-wide">
                Naturals Salon • Vijaya Nagar Colony, Hyderabad
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-ivory-400 hover:text-white p-2 rounded-full hover:bg-onyx-800 transition-colors text-sm"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* 5-Step Visual Stepper */}
        {step < 5 && (
          <div className="flex items-center justify-between pt-2 max-w-xl mx-auto">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date' },
              { num: 3, label: 'Time' },
              { num: 4, label: 'Details' },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num
                        ? 'bg-gold-500 text-onyx-950 ring-4 ring-gold-500/30 shadow-gold-glow'
                        : step > s.num
                        ? 'bg-emerald-600 text-white'
                        : 'bg-onyx-800 text-ivory-400'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-medium ${
                    step >= s.num ? 'text-gold-400 font-semibold' : 'text-ivory-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      step > s.num ? 'bg-gold-500' : 'bg-onyx-800'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-8 bg-ivory-50/50">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl font-bold text-onyx-950">
                Step 1: Choose Your Service
              </h3>
              <p className="text-xs text-onyx-600 mt-1">
                Select from our award-winning menu. All treatments performed by certified specialists.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(['ALL', 'HAIR', 'SKIN', 'BEAUTY', 'BRIDAL'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeCategory === cat
                      ? 'bg-onyx-950 text-gold-400 shadow-md border border-gold-500/50'
                      : 'bg-white text-onyx-700 border border-gold-500/20 hover:border-gold-400'
                  }`}
                >
                  {cat === 'ALL' ? 'All Services' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="Search services (e.g., HydraFacial, Keratin, Layers, Rica Wax)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
              />
            </div>

            {/* Services List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredServices.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-onyx-950 text-ivory-100 border-gold-400 shadow-lg ring-1 ring-gold-400'
                        : 'bg-white text-onyx-900 border-gold-500/20 hover:border-gold-500/60 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-gold-500/20 text-gold-400 border border-gold-400/30' : 'bg-gold-50 text-gold-800'
                        }`}>
                          {service.category} {service.badge ? `• ${service.badge}` : ''}
                        </span>
                        <span className={`font-serif text-sm font-bold ${isSelected ? 'text-gold-400' : 'text-onyx-950'}`}>
                          {formatPrice(service.price)}
                        </span>
                      </div>

                      <h4 className={`font-serif text-base font-bold mt-2 leading-tight ${isSelected ? 'text-ivory-50' : 'text-onyx-950'}`}>
                        {service.name}
                      </h4>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-ivory-300' : 'text-onyx-600'}`}>
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-3 mt-2 border-t border-gold-500/15">
                      <span className="flex items-center gap-1 opacity-80">
                        <Clock className="w-3 h-3 text-gold-500" /> {service.duration} mins
                      </span>
                      <span className={`font-semibold text-xs ${isSelected ? 'text-gold-400' : 'text-gold-700'}`}>
                        {isSelected ? '✓ Selected' : 'Select Service →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 1 Actions */}
            <div className="flex justify-end pt-4 border-t border-gold-500/20">
              <button
                type="button"
                disabled={!selectedService}
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full bg-onyx-950 text-gold-400 hover:text-gold-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs tracking-wider uppercase flex items-center gap-2 border border-gold-500/50 shadow-md transition-all"
              >
                <span>Continue to Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE SELECTION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-onyx-950">
                  Step 2: Select Preferred Date
                </h3>
                <p className="text-xs text-onyx-600 mt-1">
                  We are open 7 days a week, from 9:00 AM to 9:00 PM.
                </p>
              </div>

              {selectedService && (
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-onyx-500 uppercase tracking-wider">Service</span>
                  <p className="font-serif text-sm font-semibold text-onyx-900">{selectedService.name}</p>
                </div>
              )}
            </div>

            {/* Quick Date Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedDate(todayStr)}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  selectedDate === todayStr
                    ? 'bg-onyx-950 text-gold-400 border-gold-500 shadow-md'
                    : 'bg-white text-onyx-800 border-gold-500/20 hover:border-gold-400'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">Today</span>
                <span className="font-serif text-base font-bold block mt-0.5">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDate(tomorrowStr)}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  selectedDate === tomorrowStr
                    ? 'bg-onyx-950 text-gold-400 border-gold-500 shadow-md'
                    : 'bg-white text-onyx-800 border-gold-500/20 hover:border-gold-400'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">Tomorrow</span>
                <span className="font-serif text-base font-bold block mt-0.5">
                  {tomorrow.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </button>

              <div className="col-span-2 sm:col-span-1 bg-white p-3 rounded-2xl border border-gold-500/20 flex flex-col justify-center">
                <label className="text-[10px] uppercase font-bold text-onyx-500 tracking-wider mb-1 block">
                  Other Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full text-xs font-semibold text-onyx-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Selected Date Summary Notice */}
            <div className="p-4 rounded-xl bg-gold-50/60 border border-gold-500/30 flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-gold-700 shrink-0" />
              <div className="text-xs text-onyx-800">
                <span className="font-semibold text-onyx-950">Appointment Date: </span>
                {new Date(selectedDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="flex justify-between pt-4 border-t border-gold-500/20">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-full border border-onyx-300 text-onyx-700 hover:bg-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!selectedDate}
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full bg-onyx-950 text-gold-400 hover:text-gold-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs tracking-wider uppercase flex items-center gap-2 border border-gold-500/50 shadow-md transition-all"
              >
                <span>Continue to Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TIME SLOT SELECTION */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl font-bold text-onyx-950">
                Step 3: Select Available Time Slot
              </h3>
              <p className="text-xs text-onyx-600 mt-1">
                Slots in red/disabled are already confirmed for other clients to guarantee zero waiting time.
              </p>
            </div>

            {/* Time Slot Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {TIME_SLOTS.map((slot) => {
                const isAvailable = checkSlotAvailability(slot);
                const isSelected = selectedTime === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 px-2 rounded-xl text-center text-xs font-semibold transition-all ${
                      !isAvailable
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 line-through opacity-60'
                        : isSelected
                        ? 'bg-onyx-950 text-gold-400 border border-gold-400 shadow-md ring-2 ring-gold-500/40'
                        : 'bg-white text-onyx-800 border border-gold-500/20 hover:border-gold-500 hover:bg-gold-50/50'
                    }`}
                  >
                    <span>{slot}</span>
                    <span className="block text-[9px] font-normal mt-0.5 opacity-70">
                      {isAvailable ? (isSelected ? 'Selected' : 'Available') : 'Booked'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-[11px] text-onyx-600 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-gold-500"></span> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-onyx-950"></span> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span> Booked (Protected)
              </span>
            </div>

            {/* Step 3 Actions */}
            <div className="flex justify-between pt-4 border-t border-gold-500/20">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-full border border-onyx-300 text-onyx-700 hover:bg-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-full bg-onyx-950 text-gold-400 hover:text-gold-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs tracking-wider uppercase flex items-center gap-2 border border-gold-500/50 shadow-md transition-all"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-serif text-xl font-bold text-onyx-950">
                Step 4: Customer Information
              </h3>
              <p className="text-xs text-onyx-600 mt-1">
                We will send your booking confirmation reference and reminder to this phone number.
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-onyx-800 uppercase tracking-wider block mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ayesha Khan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-onyx-800 uppercase tracking-wider block mb-1.5">
                  Phone Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-onyx-800 uppercase tracking-wider block mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="ayesha@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-onyx-800 uppercase tracking-wider block mb-1.5">
                  Stylist Preference
                </label>
                <select
                  value={genderPreference}
                  onChange={(e: any) => setGenderPreference(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
                >
                  <option value="Any">Any Senior Stylist</option>
                  <option value="Female Stylist">Female Specialist</option>
                  <option value="Male Stylist">Male Specialist</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-onyx-800 uppercase tracking-wider block mb-1.5">
                  Additional Instructions or Hair / Skin Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Sensitive scalp, wedding reception in the evening, prefer layered cut with volume blowdry..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gold-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/50 bg-white"
                />
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="p-4 rounded-2xl bg-white border border-gold-500/30 shadow-sm space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-gold-700">
                Booking Summary Review
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-onyx-700 font-medium">Service:</span>
                <span className="font-semibold text-onyx-950">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-onyx-700 font-medium">Slot:</span>
                <span className="font-semibold text-onyx-950">
                  {selectedDate} at {selectedTime}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-gold-500/15 pt-2">
                <span className="text-onyx-700 font-medium">Starting Price (Pay at Salon):</span>
                <span className="font-serif text-sm font-bold text-gold-700">
                  {selectedService ? formatPrice(selectedService.price) : '₹0'}
                </span>
              </div>
            </div>

            {/* Step 4 Actions */}
            <div className="flex justify-between pt-4 border-t border-gold-500/20">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-full border border-onyx-300 text-onyx-700 hover:bg-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!canProceedToConfirmation() || loading}
                onClick={handleConfirmBooking}
                className="px-7 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-onyx-950 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-gold-glow transition-all"
              >
                {loading ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-onyx-950" />
                    <span>Confirm Appointment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION RECEIPT */}
        {step === 5 && confirmedAppointment && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-300 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Appointment Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-onyx-950 mt-3">
                Thank You, {confirmedAppointment.customerName}!
              </h3>
              <p className="text-xs text-onyx-600 max-w-md mx-auto mt-1">
                Your luxury appointment has been reserved at Naturals Salon Vijaya Nagar Colony.
              </p>
            </div>

            {/* Reference Badge Card */}
            <div className="p-6 rounded-3xl bg-white border border-gold-500/40 shadow-luxury max-w-md mx-auto text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-onyx-400 tracking-wider">
                    Booking Reference
                  </span>
                  <div className="font-mono text-base font-bold text-gold-700 tracking-wider">
                    {confirmedAppointment.bookingReference}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-onyx-400 tracking-wider">Status</span>
                  <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Confirmed
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-onyx-600 font-medium">Service:</span>
                  <span className="font-semibold text-onyx-950 text-right">{confirmedAppointment.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-onyx-600 font-medium">Date:</span>
                  <span className="font-semibold text-onyx-950">{confirmedAppointment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-onyx-600 font-medium">Time Slot:</span>
                  <span className="font-semibold text-onyx-950">{confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-onyx-600 font-medium">Stylist Preference:</span>
                  <span className="font-semibold text-onyx-950">{confirmedAppointment.genderPreference}</span>
                </div>
                <div className="flex justify-between border-t border-gold-500/15 pt-2">
                  <span className="text-onyx-600 font-medium">Payable at Salon:</span>
                  <span className="font-serif text-sm font-bold text-gold-700">
                    {formatPrice(confirmedAppointment.servicePrice)}
                  </span>
                </div>
              </div>

              {/* Salon Address Reminder */}
              <div className="p-3 bg-ivory-50 rounded-xl text-[11px] text-onyx-700 border border-gold-500/20 leading-snug">
                📍 <strong>Location:</strong> D No 65/3 Rt, 2nd Floor, Main Road, Vijaya Nagar Colony, Hyderabad 500057.
              </div>
            </div>

            {/* Actions: Send to WhatsApp, Print, Done */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <a
                href={getWhatsAppBookingLink("917337582104", {
                  reference: confirmedAppointment.bookingReference,
                  customerName: confirmedAppointment.customerName,
                  customerPhone: confirmedAppointment.customerPhone,
                  serviceName: confirmedAppointment.serviceName,
                  date: confirmedAppointment.date,
                  timeSlot: confirmedAppointment.timeSlot,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send to WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white border border-gold-500/40 text-onyx-800 hover:bg-gold-50 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-gold-600" />
                <span>Print Slip</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                  setSelectedTime('');
                  if (onClose) onClose();
                }}
                className="text-xs text-gold-700 hover:text-gold-900 font-semibold underline"
              >
                Book Another Service / Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
