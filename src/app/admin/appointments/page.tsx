'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Edit, 
  Trash2, 
  User, 
  Phone, 
  Sparkles, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { Appointment } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice, TIME_SLOTS } from '@/lib/utils';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Reschedule Modal State
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [rescheduleNotes, setRescheduleNotes] = useState('');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  useEffect(() => {
    setAppointments(storage.getAppointments());
  }, []);

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    const updated = storage.updateAppointmentStatus(id, status);
    setAppointments(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this appointment record?')) {
      const updated = storage.deleteAppointment(id);
      setAppointments(updated);
    }
  };

  const handleOpenReschedule = (apt: Appointment) => {
    setEditingApt(apt);
    setRescheduleDate(apt.date);
    setRescheduleTime(apt.timeSlot);
    setRescheduleNotes(apt.notes || '');
    setRescheduleError(null);
  };

  const handleSaveReschedule = () => {
    if (!editingApt || !rescheduleDate || !rescheduleTime) {
      setRescheduleError('Please select both date and time slot.');
      return;
    }

    // Check conflict (excluding current appointment)
    const isConflict = appointments.some(
      (a) =>
        a.id !== editingApt.id &&
        a.date === rescheduleDate &&
        a.timeSlot === rescheduleTime &&
        a.status === 'Confirmed'
    );

    if (isConflict) {
      setRescheduleError(`Time slot ${rescheduleTime} on ${rescheduleDate} is already confirmed for another customer.`);
      return;
    }

    const updated = storage.updateAppointmentStatus(
      editingApt.id,
      editingApt.status,
      rescheduleDate,
      rescheduleTime,
      rescheduleNotes
    );
    setAppointments(updated);
    setEditingApt(null);
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.date === dateFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery) ||
      apt.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesDate && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Bookings Manager
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Appointments &amp; Schedules
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Accept, reschedule, complete, or contact salon guests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gold-400 bg-onyx-900 px-3 py-1.5 rounded-xl border border-gold-500/20">
            Total {filteredAppointments.length} Bookings
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-onyx-900 border border-gold-500/20 shadow-md flex flex-wrap items-center justify-between gap-4">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-gold-500 text-onyx-950 font-bold shadow-sm'
                  : 'bg-onyx-950 text-ivory-300 hover:text-white border border-gold-500/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Date Filter & Search Input */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="text-[10px] text-ivory-400 hover:text-white underline"
            >
              Clear Date
            </button>
          )}

          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-ivory-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search name, phone, ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-3xl bg-onyx-900 border border-gold-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-onyx-950 border-b border-gold-500/20 text-ivory-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Appointment Slot</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-ivory-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-ivory-400">
                    No appointments found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-onyx-800/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-gold-400 whitespace-nowrap">
                      {apt.bookingReference}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-ivory-50 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold-400" />
                        {apt.customerName}
                      </div>
                      <div className="text-[11px] text-ivory-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-gold-500/60" />
                        {apt.customerPhone}
                      </div>
                      {apt.customerEmail && (
                        <div className="text-[10px] text-ivory-500 truncate max-w-[180px]">
                          {apt.customerEmail}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-ivory-100">{apt.serviceName}</div>
                      <div className="text-[10px] text-gold-500/80">
                        Pref: {apt.genderPreference}
                      </div>
                      {apt.notes && (
                        <div className="text-[11px] text-ivory-400 italic mt-0.5 line-clamp-1 max-w-xs">
                          &ldquo;{apt.notes}&rdquo;
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-ivory-100 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-gold-400" />
                        {apt.date}
                      </div>
                      <div className="text-gold-400 font-bold text-[11px] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {apt.timeSlot}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-serif font-bold text-ivory-50 whitespace-nowrap">
                      {formatPrice(apt.servicePrice)}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Message Link */}
                        <a
                          href={`https://wa.me/${apt.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.customerName)}!%20This%20is%20Naturals%20Salon%20Vijaya%20Nagar%20Colony.%20Regarding%20your%20appointment%20ref%20${apt.bookingReference}%20for%20${encodeURIComponent(apt.serviceName)}%20on%20${apt.date}%20at%20${encodeURIComponent(apt.timeSlot)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-onyx-800 hover:bg-emerald-600 hover:text-white text-emerald-400 transition-colors"
                          title="Chat with Customer on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Status Switchers */}
                        {apt.status !== 'Confirmed' && apt.status !== 'Completed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors"
                            title="Confirm / Accept"
                          >
                            Accept
                          </button>
                        )}

                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition-colors"
                            title="Mark as Completed"
                          >
                            Done
                          </button>
                        )}

                        {/* Reschedule Button */}
                        <button
                          onClick={() => handleOpenReschedule(apt)}
                          className="p-1.5 rounded-lg bg-onyx-800 hover:bg-gold-500 hover:text-onyx-950 text-gold-400 transition-colors"
                          title="Reschedule Date / Time"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                            className="p-1.5 rounded-lg bg-onyx-800 hover:bg-red-900/60 text-red-400 transition-colors"
                            title="Reject / Cancel Appointment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="p-1.5 rounded-lg bg-onyx-800 hover:bg-red-950 text-red-400 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      {editingApt && (
        <div className="fixed inset-0 z-50 bg-onyx-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-onyx-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                Reschedule Booking
              </span>
              <h3 className="font-serif text-xl font-bold text-ivory-50 mt-1">
                {editingApt.customerName} ({editingApt.bookingReference})
              </h3>
              <p className="text-xs text-ivory-400">
                Service: {editingApt.serviceName}
              </p>
            </div>

            {rescheduleError && (
              <div className="p-3 rounded-xl bg-red-950 text-red-200 text-xs border border-red-500/40 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{rescheduleError}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-ivory-300 block mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ivory-300 block mb-1">
                  New Time Slot
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ivory-300 block mb-1">
                  Internal Notes / Reason
                </label>
                <textarea
                  rows={2}
                  value={rescheduleNotes}
                  onChange={(e) => setRescheduleNotes(e.target.value)}
                  placeholder="e.g., Client requested shift by 1 hour"
                  className="w-full p-2.5 rounded-xl bg-onyx-950 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gold-500/20">
              <button
                type="button"
                onClick={() => setEditingApt(null)}
                className="px-4 py-2 rounded-xl bg-onyx-800 text-ivory-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReschedule}
                className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 text-xs font-bold uppercase tracking-wider shadow-gold-glow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
