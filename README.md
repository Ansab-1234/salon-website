# Naturals Salon – Vijaya Nagar Colony, Hyderabad
### Luxury Web Experience, Booking Engine & Complete Admin Portal

A commercial-grade, luxury web application engineered for **Naturals Salon – Vijaya Nagar Colony, Hyderabad**. Designed with high-fashion editorial aesthetics (ivory backgrounds, onyx typography, champagne gold accents) and full full-stack capabilities including real-time appointment booking, WhatsApp click-to-chat integration, conflict-free scheduling, and a comprehensive management dashboard.

---

## 📍 Real Business Details

- **Salon Name:** Naturals Salon
- **Branch:** Vijaya Nagar Colony, Hyderabad
- **Address:** D No 65/3 Rt, 2nd Floor, Main Road, Vijaya Nagar Colony, Hyderabad, Telangana 500057
- **Phone:** `+91 73375 82104`
- **Email:** `naturalsvijaynagarcolony@gmail.com`
- **Operating Hours:** 9:00 AM – 9:00 PM (All 7 Days)
- **Google Rating:** 4.8 / 5.0 (1,480+ Google Reviews)
- **Google Maps:** [https://maps.app.goo.gl/fo7U1cfaB6Y6Pt1ZA?g_st=aw](https://maps.app.goo.gl/fo7U1cfaB6Y6Pt1ZA?g_st=aw)
- **Official Chain Website:** [https://salons.naturals.in/](https://salons.naturals.in/)

---

## 🌟 Key Highlights & Features

### 1. Creative Direction & Luxury Aesthetics
- **Visual Identity:** Warm ivory tones (`#FAF8F5`), deep onyx (`#111111`), champagne gold accents (`#C5A880`, `#D4AF37`).
- **Typography:** Serif editorial headers (*Cormorant Garamond*) paired with modern crisp sans-serif (*Plus Jakarta Sans*).
- **Transitions:** Framer Motion-inspired fluid animations, glassmorphism sticky navigation, and hover micro-interactions.

### 2. Customer Journey & Homepage
- **Luxury Announcement Bar:** Business hours (9 AM – 9 PM), Hyderabad branch location, direct phone call `+91 73375 82104`, and quick admin link.
- **Hero Section:** "Discover Your Beauty. Define Your Style." with 4.8★ Google badge, book appointment CTA, and WhatsApp CTA.
- **Our Services:** Interactive category switcher (HAIR, SKIN, BEAUTY, BRIDAL) with live starting prices, treatment durations, and instant "Book Now" buttons.
- **Why Choose Naturals:** Master Stylists, 100% Medical-Grade Sterilization, Authentic Global Brands (L'Oréal Professionnel, Kérastase, Cheryl's, MAC), Transparent Pricing.
- **Special Offers:** Promotional coupons (Festive Glow, Royal Bridal Suite, Keratin Smooth Treat, Mani-Pedi Duo) with 1-click code copy.
- **Salon Gallery:** Categorized photo showcase (Hair, Skin & Facials, Bridal Studio, Ambience) with full-screen lightbox modal.
- **Customer Reviews:** Real feedback from Hyderabad residents and rating distribution breakdown.
- **Location & Timings:** Live Google Maps embed, physical address card, one-tap calling, and "Get Directions" navigation.

### 3. Services Page (`/services`)
- Full catalog organized into:
  - **HAIR:** Haircuts, Hair Styling, Hair Colouring & Balayage, L'Oréal Absolut Molecular Hair Spa, Keratin Treatment, Permanent Smoothening / Rebonding.
  - **SKIN:** O3+ Bridal Glow, Medical-Grade HydraFacial Cleanse, Cheryl's Brightening, Sara Herbal De-Tan.
  - **BEAUTY:** Rica Italian White Chocolate Waxing, Artistic Threading, Aroma Luxe Manicure, Crystal Healing Pedicure.
  - **BRIDAL:** Signature HD Bridal Makeup, Royal 7-Day Pre-Bridal Suite, Muhurtham & Reception Hairstyling.
- Live search and unisex/women/men filter.
- Real starting prices editable anytime through the Admin Portal.

### 4. 5-Step Appointment Booking System (`/book` and Site-Wide Modal)
1. **Step 1:** Select service (filterable by category with duration and starting price).
2. **Step 2:** Select preferred date (past dates prevented; today/tomorrow shortcuts).
3. **Step 3:** Select available time slot (9 AM to 8:30 PM; slots with confirmed bookings are automatically disabled to prevent overlaps).
4. **Step 4:** Enter customer info (Name, WhatsApp Phone Number, Email, Stylist Preference, Custom Notes).
5. **Step 5:** Instant Confirmation:
   - Generates unique reference code (`NAT-VNC-XXXX`).
   - Celebratory confetti animation.
   - 1-Click "Send to WhatsApp" button with pre-filled booking details.
   - "Print Slip" option.

### 5. WhatsApp Concierge Integration
- Business Number: `+91 73375 82104`
- Floating pulse concierge widget on every page.
- Direct click-to-chat with automated templates:
  - Appointment booking format
  - Bridal package enquiry
  - Directions and salon timings

### 6. Comprehensive Admin Portal (`/admin`)
- **Authentication (`/admin/login`):**
  - Protected routes with session validation.
  - Quick "Auto-Fill Admin Credentials" button for evaluation.
  - **Demo Login:** `admin@naturals.com` | **Password:** `Naturals@2026`
- **Dashboard Overview (`/admin`):**
  - KPI Metrics: Total Bookings, Today's Schedule, Pending, Confirmed, Completed, Cancelled, Estimated Revenue, Total Customers.
  - Real-time recent bookings stream with 1-click Accept, Complete, Cancel, or WhatsApp customer.
- **Appointment Management (`/admin/appointments`):**
  - Search by customer name, phone, or reference code.
  - Filter by date and status.
  - Reschedule modal with conflict-check.
  - Direct WhatsApp conversation starter.
- **Service & Pricing Management (`/admin/services`):**
  - Add new treatments.
  - Edit prices, descriptions, durations, images, and categories.
  - Reset to catalog defaults button.
- **Gallery Manager (`/admin/gallery`):**
  - Add new lookbook or ambience photos.
  - Toggle homepage featured status.
  - Delete photos.
- **Business Settings (`/admin/settings`):**
  - Update branch phone, WhatsApp, email, address, operating hours, and top announcement banner.
- **Customer CRM (`/admin/customers`):**
  - Directory of all clients with phone numbers, lifetime visits, total spend, and appointment history.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti, CSS Transitions
- **Database & Persistence:**
  - Built-in resilient local storage & server-side API routes for instant out-of-the-box operation.
  - **Supabase / PostgreSQL:** Production-ready schema provided at `supabase/schema.sql` with Row Level Security (RLS) policies.

---

## 🚀 Running the Project

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Run
```bash
npm run build
npm start
```
The server will listen at `http://localhost:3000`.

---

## 🔐 Admin Credentials

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@naturals.com`
- **Password:** `Naturals@2026`
- *(A one-click "Auto-Fill Admin Credentials" button is also provided on the login page for convenience).*

---

© 2026 Naturals Salon – Vijaya Nagar Colony, Hyderabad.
