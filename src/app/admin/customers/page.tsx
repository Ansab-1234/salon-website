'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, Phone, Mail, Calendar, MessageCircle, DollarSign, Sparkles } from 'lucide-react';
import { Appointment } from '@/types';
import { storage } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';

interface CustomerProfile {
  name: string;
  phone: string;
  email?: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  history: Appointment[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    const apts = storage.getAppointments();
    const map = new Map<string, CustomerProfile>();

    apts.forEach((a) => {
      const key = a.customerPhone;
      if (!map.has(key)) {
        map.set(key, {
          name: a.customerName,
          phone: a.customerPhone,
          email: a.customerEmail,
          totalBookings: 0,
          totalSpent: 0,
          lastVisit: a.date,
          history: [],
        });
      }

      const client = map.get(key)!;
      client.totalBookings += 1;
      client.totalSpent += Number(a.servicePrice) || 0;
      if (a.date > client.lastVisit) {
        client.lastVisit = a.date;
      }
      client.history.push(a);
    });

    setCustomers(Array.from(map.values()));
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Client Relationship Manager
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Customer Directory &amp; History
          </h1>
          <p className="text-xs text-ivory-400 mt-1">
            Track repeat salon visits, loyalty, preferences, and client value.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-ivory-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search customer name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-onyx-900 border border-gold-500/30 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="rounded-3xl bg-onyx-900 border border-gold-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-onyx-950 border-b border-gold-500/20 text-ivory-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Phone / WhatsApp</th>
                <th className="py-3.5 px-4">Total Visits</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Last Appointment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-ivory-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ivory-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((client) => (
                  <tr key={client.phone} className="hover:bg-onyx-800/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-ivory-50">
                      {client.name}
                      {client.email && (
                        <div className="text-[10px] text-ivory-400 font-normal">
                          {client.email}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-gold-400">
                      {client.phone}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-onyx-950 text-gold-400 font-bold border border-gold-500/20">
                        {client.totalBookings} visits
                      </span>
                    </td>

                    <td className="py-4 px-4 font-serif font-bold text-ivory-50">
                      {formatPrice(client.totalSpent)}
                    </td>

                    <td className="py-4 px-4 text-ivory-300">
                      {client.lastVisit}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(client.name)},%20greetings%20from%20Naturals%20Salon%20Vijaya%20Nagar%20Colony!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-onyx-800 hover:bg-emerald-600 hover:text-white text-emerald-400 transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => setSelectedCustomer(client)}
                          className="px-3 py-1.5 rounded-lg bg-onyx-800 hover:bg-gold-500 hover:text-onyx-950 text-gold-400 font-semibold text-[11px] transition-colors"
                        >
                          History ({client.history.length})
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

      {/* History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-onyx-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-onyx-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                  Customer History
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory-50 mt-0.5">
                  {selectedCustomer.name}
                </h3>
                <p className="text-xs text-ivory-400">{selectedCustomer.phone}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-ivory-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {selectedCustomer.history.map((h) => (
                <div
                  key={h.id}
                  className="p-3.5 rounded-xl bg-onyx-950 border border-gold-500/20 text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-ivory-100">{h.serviceName}</span>
                    <span className="font-serif font-bold text-gold-400">
                      {formatPrice(h.servicePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-ivory-400">
                    <span>
                      {h.date} at {h.timeSlot}
                    </span>
                    <span className="font-semibold text-gold-500">{h.status}</span>
                  </div>
                  {h.notes && (
                    <div className="text-[10px] text-ivory-500 italic mt-1">
                      Note: {h.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-gold-500/20">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-gold-500 text-onyx-950 font-bold text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
