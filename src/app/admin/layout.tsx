'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Image as ImageIcon, 
  Settings, 
  Users, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { auth } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // If on login page, skip protection
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    if (!auth.isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // If on login page, just render children directly
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center text-gold-400 text-sm">
        Verifying admin authorization...
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
    { href: '/admin/services', label: 'Services & Pricing', icon: <Scissors className="w-4 h-4" /> },
    { href: '/admin/gallery', label: 'Gallery Manager', icon: <ImageIcon className="w-4 h-4" /> },
    { href: '/admin/customers', label: 'Customer Directory', icon: <Users className="w-4 h-4" /> },
    { href: '/admin/settings', label: 'Business Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    auth.logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-onyx-950 text-ivory-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-onyx-900 border-r border-gold-500/20 p-5 shrink-0">
        <div className="space-y-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3 px-2 py-2 border-b border-gold-500/20 pb-4">
            <div className="w-10 h-10 rounded-full border border-gold-400 bg-onyx-950 flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-gold-glow">
              N
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-ivory-50 tracking-wider uppercase block leading-none">
                Naturals Admin
              </span>
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold mt-1 block">
                Vijaya Nagar Colony
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold-500 text-onyx-950 shadow-gold-glow font-bold'
                      : 'text-ivory-300 hover:text-white hover:bg-onyx-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-6 border-t border-gold-500/20">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-onyx-950 hover:bg-onyx-800 text-gold-400 text-xs font-semibold border border-gold-500/20 transition-all"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-onyx-950">
        {/* Top Header */}
        <header className="h-16 border-b border-gold-500/20 bg-onyx-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-ivory-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 hidden sm:inline">
              Branch Dashboard
            </span>
            <span className="hidden sm:inline text-gold-500/40">•</span>
            <span className="text-xs text-ivory-300 font-medium truncate">
              Hyderabad, Vijaya Nagar Colony
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Salon Open (9 AM – 9 PM)
            </span>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-onyx-800 hover:bg-onyx-700 text-ivory-200 text-xs font-medium border border-gold-500/30 flex items-center gap-1.5 transition-colors"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3 text-gold-400" />
            </a>

            <button
              onClick={handleLogout}
              className="p-2 text-ivory-400 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-onyx-900 border-b border-gold-500/30 p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === item.href ? 'bg-gold-500 text-onyx-950' : 'text-ivory-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            <div className="pt-2 border-t border-gold-500/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
