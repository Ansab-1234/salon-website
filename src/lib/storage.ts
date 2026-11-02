import { Appointment, GalleryItem, SalonSettings, Service } from '@/types';
import { INITIAL_APPOINTMENTS, INITIAL_GALLERY, INITIAL_SERVICES, INITIAL_SETTINGS } from './data';

const STORAGE_KEYS = {
  SERVICES: 'naturals_vnc_services_v1',
  APPOINTMENTS: 'naturals_vnc_appointments_v1',
  GALLERY: 'naturals_vnc_gallery_v1',
  SETTINGS: 'naturals_vnc_settings_v1',
  AUTH: 'naturals_vnc_admin_auth_v1',
};

// In-memory fallback for server-side execution
let memoryState = {
  services: [...INITIAL_SERVICES],
  appointments: [...INITIAL_APPOINTMENTS],
  gallery: [...INITIAL_GALLERY],
  settings: { ...INITIAL_SETTINGS },
};

export const storage = {
  // --- SERVICES ---
  getServices: (): Service[] => {
    if (typeof window === 'undefined') return memoryState.services;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    } catch {
      return memoryState.services;
    }
  },

  saveService: (service: Service): Service[] => {
    const services = storage.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    let updated: Service[];
    if (index >= 0) {
      updated = [...services];
      updated[index] = service;
    } else {
      updated = [service, ...services];
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.services = updated;
    return updated;
  },

  deleteService: (id: string): Service[] => {
    const services = storage.getServices();
    const updated = services.filter((s) => s.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.services = updated;
    return updated;
  },

  resetServices: (): Service[] => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.services = [...INITIAL_SERVICES];
    return INITIAL_SERVICES;
  },

  // --- APPOINTMENTS ---
  getAppointments: (): Appointment[] => {
    if (typeof window === 'undefined') return memoryState.appointments;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    } catch {
      return memoryState.appointments;
    }
  },

  createAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'> & { id?: string }): Appointment => {
    const existing = storage.getAppointments();

    // Check for overlap on Confirmed appointments
    const hasConflict = existing.some(
      (a) => a.date === appointment.date && a.timeSlot === appointment.timeSlot && a.status === 'Confirmed'
    );

    if (hasConflict) {
      throw new Error(`The time slot ${appointment.timeSlot} on ${appointment.date} is already confirmed for another client.`);
    }

    const newAppointment: Appointment = {
      ...appointment,
      id: appointment.id || `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'Confirmed', // Automatically confirm or pending
      createdAt: new Date().toISOString(),
    };

    const updated = [newAppointment, ...existing];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.appointments = updated;
    return newAppointment;
  },

  updateAppointmentStatus: (id: string, status: Appointment['status'], date?: string, timeSlot?: string, notes?: string): Appointment[] => {
    const existing = storage.getAppointments();
    const updated = existing.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status,
          date: date || a.date,
          timeSlot: timeSlot || a.timeSlot,
          notes: notes !== undefined ? notes : a.notes,
          updatedAt: new Date().toISOString(),
        };
      }
      return a;
    });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.appointments = updated;
    return updated;
  },

  deleteAppointment: (id: string): Appointment[] => {
    const existing = storage.getAppointments();
    const updated = existing.filter((a) => a.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.appointments = updated;
    return updated;
  },

  isSlotBooked: (date: string, timeSlot: string): boolean => {
    const appointments = storage.getAppointments();
    return appointments.some((a) => a.date === date && a.timeSlot === timeSlot && (a.status === 'Confirmed' || a.status === 'Pending'));
  },

  // --- GALLERY ---
  getGallery: (): GalleryItem[] => {
    if (typeof window === 'undefined') return memoryState.gallery;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    } catch {
      return memoryState.gallery;
    }
  },

  saveGalleryItem: (item: GalleryItem): GalleryItem[] => {
    const gallery = storage.getGallery();
    const index = gallery.findIndex((g) => g.id === item.id);
    let updated: GalleryItem[];
    if (index >= 0) {
      updated = [...gallery];
      updated[index] = item;
    } else {
      updated = [item, ...gallery];
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.gallery = updated;
    return updated;
  },

  deleteGalleryItem: (id: string): GalleryItem[] => {
    const gallery = storage.getGallery();
    const updated = gallery.filter((g) => g.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.gallery = updated;
    return updated;
  },

  // --- SETTINGS ---
  getSettings: (): SalonSettings => {
    if (typeof window === 'undefined') return memoryState.settings;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    } catch {
      return memoryState.settings;
    }
  },

  saveSettings: (settings: SalonSettings): SalonSettings => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    memoryState.settings = settings;
    return settings;
  },
};
