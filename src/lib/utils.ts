import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateBookingReference(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `NAT-VNC-${num}`;
}

export function formatTimeSlot(time: string): string {
  return time;
}

export function getWhatsAppBookingLink(
  phoneNumber: string,
  details: {
    reference: string;
    customerName: string;
    customerPhone: string;
    serviceName: string;
    date: string;
    timeSlot: string;
  }
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const message = `Hello Naturals Salon Vijaya Nagar Colony!

I want to book an appointment.

Booking Ref: ${details.reference}
Name: ${details.customerName}
Phone: ${details.customerPhone}
Service: ${details.serviceName}
Date: ${details.date}
Time: ${details.timeSlot}

Please confirm availability. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
];
