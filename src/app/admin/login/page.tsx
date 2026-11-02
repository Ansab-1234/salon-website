'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Key, AlertCircle } from 'lucide-react';
import { auth } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = auth.login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid email or password. Please use the demo credentials below or check your login.');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@naturals.com');
    setPassword('Naturals@2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-onyx-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Gold Ambient Lights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-onyx-900 border border-gold-500/30 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Brand Icon */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-gold-400 bg-onyx-950 flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <ShieldCheck className="w-7 h-7 text-gold-400" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-400 block mb-1">
            Management Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50">
            Naturals Salon Admin
          </h1>
          <p className="text-xs text-ivory-300 mt-1">
            Vijaya Nagar Colony, Hyderabad Branch
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-ivory-200 uppercase tracking-wider block mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@naturals.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ivory-200 uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-onyx-950 border border-gold-500/30 text-ivory-100 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-onyx-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition-all duration-300"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className="mt-8 pt-6 border-t border-gold-500/20 text-center space-y-3">
          <p className="text-[11px] text-ivory-400">
            Evaluating the application? Click to auto-fill credentials:
          </p>

          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-onyx-950 hover:bg-onyx-800 border border-gold-500/40 text-gold-400 hover:text-gold-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Auto-Fill Admin Credentials</span>
          </button>

          <div className="text-[10px] text-ivory-500 font-mono">
            Demo Login: admin@naturals.com | Naturals@2026
          </div>
        </div>

        {/* Back to Client Site */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-ivory-400 hover:text-gold-400 transition-colors inline-flex items-center gap-1"
          >
            ← Return to Naturals Salon Customer Site
          </Link>
        </div>
      </div>
    </div>
  );
}
