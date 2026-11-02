'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  DollarSign, 
  Users, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight,
  MessageCircle,
  Eye,
  Filter
} from 'lucide-react';
import { Appointment, Service } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';

export default function AdminOverviewPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setAppointments(storage.getAppointments());
    setServices(storage.getServices());
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];

  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingAppointments = appointments.filter((a) => a.status === 'Pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed');
  const completedAppointments = appointments.filter((a) => a.status === 'Completed');
  const cancelledAppointments = appointments.filter((a) => a.status === 'Cancelled' || a.status === 'Rejected');

  // Total unique customers
  const uniquePhones = new Set(appointments.map((a) => a.customerPhone));
  const totalCustomers = uniquePhones.size;

  // Estimated revenue from confirmed & completed
  const estimatedRevenue = appointments
    .filter((a) => a.status === 'Confirmed' || a.status === 'Completed')
    .reduce((sum, a) => sum + (Number(a.servicePrice) || 0), 0);

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    const updated = storage.updateAppointmentStatus(id, status);
    setAppointments(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Executive Summary
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Salon Operations Dashboard
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Real-time status for Naturals Salon, Vijaya Nagar Colony, Hyderabad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin/appointments"
            className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider transition-all shadow-gold-glow"
          >
            Manage Appointments →
          </a>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Appointments */}
        <div className="p-5 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ivory-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-ivory-50">
            {totalAppointments}
          </div>
          <p className="text-[11px] text-ivory-400 mt-1">
            All registered appointments
          </p>
        </div>

        {/* Today's Bookings */}
        <div className="p-5 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ivory-400 uppercase tracking-wider">
              Today&apos;s Schedule
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-400">
            {todayAppointments.length}
          </div>
          <p className="text-[11px] text-ivory-400 mt-1">
            Appointments scheduled for today
          </p>
        </div>

        {/* Confirmed / Active */}
        <div className="p-5 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ivory-400 uppercase tracking-wider">
              Confirmed &amp; Active
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-blue-400">
            {confirmedAppointments.length}
          </div>
          <p className="text-[11px] text-ivory-400 mt-1">
            {pendingAppointments.length} pending review
          </p>
        </div>

        {/* Revenue Pipeline */}
        <div className="p-5 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-ivory-400 uppercase tracking-wider">
              Estimated Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-gold-400">
            {formatPrice(estimatedRevenue)}
          </div>
          <p className="text-[11px] text-ivory-400 mt-1">
            From confirmed &amp; completed bookings
          </p>
        </div>
      </div>

      {/* Secondary Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-onyx-900/60 border border-gold-500/15">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
            Pending Approval
          </span>
          <span className="font-serif text-2xl font-bold text-ivory-100 mt-1 block">
            {pendingAppointments.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-onyx-900/60 border border-gold-500/15">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
            Completed Visits
          </span>
          <span className="font-serif text-2xl font-bold text-ivory-100 mt-1 block">
            {completedAppointments.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-onyx-900/60 border border-gold-500/15">
          <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block">
            Cancelled / Rejected
          </span>
          <span className="font-serif text-2xl font-bold text-ivory-100 mt-1 block">
            {cancelledAppointments.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-onyx-900/60 border border-gold-500/15">
          <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block">
            Total Unique Clients
          </span>
          <span className="font-serif text-2xl font-bold text-ivory-100 mt-1 block">
            {totalCustomers}
          </span>
        </div>
      </div>

      {/* Recent Appointments Stream */}
      <div className="p-6 rounded-3xl bg-onyx-900 border border-gold-500/20 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-ivory-50">
              Recent Bookings &amp; Real-Time Requests
            </h3>
            <p className="text-xs text-ivory-400">
              Review, confirm, cancel, or WhatsApp customers directly.
            </p>
          </div>
          <a
            href="/admin/appointments"
            className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
          >
            View All ({appointments.length}) →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gold-500/15 text-ivory-400 uppercase tracking-wider">
                <th className="py-3 px-3">Reference</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Date &amp; Time</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-ivory-200">
              {appointments.slice(0, 6).map((apt) => (
                <tr key={apt.id} className="hover:bg-onyx-800/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-gold-400">
                    {apt.bookingReference}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-ivory-50">{apt.customerName}</div>
                    <div className="text-[11px] text-ivory-400">{apt.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-ivory-100">{apt.serviceName}</span>
                    {apt.notes && (
                      <div className="text-[10px] text-ivory-400 italic truncate max-w-xs">
                        Note: {apt.notes}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div>{apt.date}</div>
                    <div className="text-gold-400 font-semibold">{apt.timeSlot}</div>
                  </td>
                  <td className="py-3.5 px-3 font-serif font-bold text-ivory-50 whitespace-nowrap">
                    {formatPrice(apt.servicePrice)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        apt.status === 'Confirmed'
                          ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                          : apt.status === 'Completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : apt.status === 'Pending'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          : 'bg-red-950 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* WhatsApp Button */}
                      <a
                        href={`https://wa.me/${apt.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.customerName)},%20this%20is%20Naturals%20Salon%20Vijaya%20Nagar%20Colony%20regarding%20your%20appointment%20${apt.bookingReference}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-onyx-800 hover:bg-emerald-600 hover:text-white text-emerald-400 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>

                      {apt.status !== 'Confirmed' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px]"
                          title="Confirm Booking"
                        >
                          Accept
                        </button>
                      )}

                      {apt.status === 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px]"
                          title="Mark as Completed"
                        >
                          Done
                        </button>
                      )}

                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                          className="p-1.5 rounded-lg bg-onyx-800 hover:bg-red-900/60 text-red-400 transition-colors text-[11px]"
                          title="Cancel Booking"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
