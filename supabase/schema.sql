-- =========================================================================
-- NATURALS SALON - VIJAYA NAGAR COLONY, HYDERABAD
-- Supabase PostgreSQL Schema & Security Policies
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    category TEXT NOT NULL CHECK (category IN ('HAIR', 'SKIN', 'BEAUTY', 'BRIDAL')),
    sub_category TEXT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    image_url TEXT NOT NULL,
    gender TEXT NOT NULL DEFAULT 'Unisex' CHECK (gender IN ('Unisex', 'Women', 'Men')),
    popular BOOLEAN DEFAULT false,
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    booking_reference TEXT NOT NULL UNIQUE,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    service_price NUMERIC(10, 2) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    gender_preference TEXT DEFAULT 'Any',
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Constraint to prevent double bookings on same confirmed date & time slot
    CONSTRAINT unique_confirmed_slot UNIQUE NULLS NOT DISTINCT (date, time_slot, status)
);

-- 3. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SALON SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'primary_settings',
    name TEXT NOT NULL DEFAULT 'Naturals Salon',
    tagline TEXT DEFAULT 'Discover Your Beauty. Define Your Style.',
    branch_name TEXT DEFAULT 'Vijaya Nagar Colony, Hyderabad',
    address TEXT DEFAULT 'D No 65/3 Rt, 2nd Floor, Main Road, Vijaya Nagar Colony, Hyderabad, Telangana 500057.',
    phone TEXT DEFAULT '+91 73375 82104',
    email TEXT DEFAULT 'naturalsvijaynagarcolony@gmail.com',
    business_hours TEXT DEFAULT '9:00 AM – 9:00 PM, all days',
    google_rating NUMERIC(2, 1) DEFAULT 4.8,
    google_maps_url TEXT DEFAULT 'https://maps.app.goo.gl/fo7U1cfaB6Y6Pt1ZA?g_st=aw',
    whatsapp_number TEXT DEFAULT '+917337582104',
    announcement_text TEXT DEFAULT '✨ Welcome to Naturals Salon Vijaya Nagar Colony • Celebrating 4.8★ on Google • Book Online for Exclusive Offers!',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read appointments by ref" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

-- Authenticated Admin Policies (full control)
CREATE POLICY "Admin full services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full appointments" ON public.appointments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');
