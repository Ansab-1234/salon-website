'use client';

import React from 'react';
import BookingWizard from './BookingWizard';

interface BookingModalProps {
  isOpen: boolean;
  initialServiceId?: string;
  onClose: () => void;
}

export default function BookingModal({ isOpen, initialServiceId, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-onyx-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-3xl z-10 my-8">
        <BookingWizard 
          initialServiceId={initialServiceId} 
          onClose={onClose} 
        />
      </div>
    </div>
  );
}
