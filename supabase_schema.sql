-- Supabase SQL Schema for NANI CLEANING SERVICES Database

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    short_title TEXT,
    icon_name TEXT,
    badge TEXT,
    hero_image TEXT,
    description TEXT,
    features JSONB,
    benefits JSONB,
    pricing_table JSONB,
    pricing_cards JSONB,
    pricing_items JSONB,
    pricing_grid JSONB,
    notes JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Portfolio Table
CREATE TABLE IF NOT EXISTS public.portfolio (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Reviews / Testimonials Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    rating INTEGER DEFAULT 5,
    date TEXT,
    service TEXT,
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Customer Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    location TEXT,
    service TEXT,
    property_type TEXT,
    preferred_date TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Admin Settings Table
CREATE TABLE IF NOT EXISTS public.admin_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Disable Row Level Security (RLS) or enable public access policies for anon access
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings DISABLE ROW LEVEL SECURITY;
