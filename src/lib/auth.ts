'use client';

const ADMIN_STORAGE_KEY = 'naturals_admin_session_v1';

export interface AdminUser {
  email: string;
  role: 'superadmin' | 'manager';
  name: string;
}

export const auth = {
  login: (email: string, pass: string): boolean => {
    // Standard credential check (can also check env or supabase auth)
    const validEmail = 'admin@naturals.com';
    const validPass = 'Naturals@2026';

    if (
      (email.trim().toLowerCase() === validEmail && pass === validPass) ||
      (email.trim().toLowerCase() === 'owner@naturals.com' && pass === 'Naturals@2026')
    ) {
      const user: AdminUser = {
        email: email.trim().toLowerCase(),
        role: 'superadmin',
        name: 'Salon General Manager',
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
      }
      return true;
    }
    return false;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  },

  getUser: (): AdminUser | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return null;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return auth.getUser() !== null;
  },
};
