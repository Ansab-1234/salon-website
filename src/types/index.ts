export type ServiceCategory = 'HAIR' | 'SKIN' | 'BEAUTY' | 'BRIDAL';

export interface Service {
  id: string;
  category: ServiceCategory;
  subCategory?: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  imageUrl: string;
  gender: 'Unisex' | 'Women' | 'Men';
  popular?: boolean;
  badge?: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rejected';

export interface Appointment {
  id: string;
  bookingReference: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  genderPreference: 'Any' | 'Female Stylist' | 'Male Stylist';
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hair' | 'Skin & Facials' | 'Bridal Studio' | 'Salon Ambience';
  imageUrl: string;
  description?: string;
  featured?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  serviceDone: string;
  avatar?: string;
}

export interface SalonOffer {
  id: string;
  code: string;
  title: string;
  discount: string;
  description: string;
  validTill: string;
  category?: string;
}

export interface SalonSettings {
  name: string;
  tagline: string;
  branchName: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  googleRating: number;
  googleReviewsCount: number;
  googleMapsUrl: string;
  officialWebsiteUrl: string;
  whatsappNumber: string;
  announcementText: string;
  isOnlineBookingOpen: boolean;
  offers: SalonOffer[];
}
