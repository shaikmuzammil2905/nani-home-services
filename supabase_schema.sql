-- ========================================================
-- SUPABASE COMPLETE SQL SCHEMA & SEED DATA (DOLLAR-QUOTED)
-- Copy and paste this ENTIRE block into your Supabase SQL Editor and click RUN
-- ========================================================

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

-- Disable Row Level Security (RLS) to grant public read/write access via Anon Key
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings DISABLE ROW LEVEL SECURITY;

-- ========================================================
-- SEED DATA INSERTS (USING POSTGRESQL DOLLAR-QUOTING $$...$$)
-- ========================================================

-- Service 1: Home Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'home-cleaning', 
  'home-cleaning', 
  '1. Home Cleaning Services', 
  'Home Cleaning', 
  'Home', 
  'Most Popular', 
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80', 
  'Professional deep home cleaning for apartments, villas, and houses using advanced floor scrubbing machines, eco-friendly chemicals, and trained cleaning experts.', 
  $$["Deep cleaning of all living areas & bedrooms", "Floor scrubbing with high-power industrial machines", "Cobweb removal & wall dusting", "Balcony, window & glass door sanitation", "Disinfection of high-touch handles & switches"]$$::jsonb, 
  $$["Eliminates 99.9% of dust mites and allergens", "Restores natural shine of marble, tile & wooden floors", "Saves hours of laborious household cleaning", "Leaves home smelling fresh and hygienic"]$$::jsonb, 
  $${"headers": ["TYPE", "EMPTY FLAT", "OCCUPIED FLAT"], "rows": [{"type": "1BHK", "empty": "₹3,500", "occupied": "₹5,000"}, {"type": "2BHK", "empty": "₹6,000", "occupied": "₹8,000"}, {"type": "3BHK", "empty": "₹7,500", "occupied": "₹9,500"}, {"type": "4BHK", "empty": "₹10,000", "occupied": "₹14,000"}], "extra": "Floor Cleaning using Floor Scrubbing Machine starting from ₹7 per sq.ft (Price depends on floor condition)."}$$::jsonb, 
  NULL, NULL, NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_table = EXCLUDED.pricing_table;

-- Service 2: Kitchen Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'kitchen-cleaning', 
  'kitchen-cleaning', 
  '2. Kitchen Cleaning Services', 
  'Kitchen Cleaning', 
  'Utensils', 
  'Deep Scrubbing', 
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', 
  'Thorough oil, grease, and grime removal from cabinets, countertops, tiles, sink, chimney exterior, and kitchen walls.', 
  $$["Heavy degreasing of stove, wall tiles & countertops", "Exterior scrubbing of kitchen cabinets & handles", "Sink descaling & drain pipe sanitization", "Floor scrubbing & stain removal"]$$::jsonb, 
  $$["Removes stubborn grease deposits completely", "Creates a hygienic space for safe food preparation", "Eliminates bad odors and pest attraction"]$$::jsonb, 
  NULL, 
  $$[{"name": "Empty Kitchen", "price": "₹1,400", "highlight": "Best for move-in / move-out"}, {"name": "Occupied Kitchen", "price": "₹2,200", "highlight": "Includes deep cabinet exterior cleaning"}]$$::jsonb, 
  NULL, NULL, 
  $$["Utensils are not included.", "Appliance cleaning (chimney, fridge, microwave) is charged separately."]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_cards = EXCLUDED.pricing_cards;

-- Service 3: Bathroom Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'bathroom-cleaning', 
  'bathroom-cleaning', 
  '3. Bathroom Cleaning Services', 
  'Bathroom Cleaning', 
  'Bath', 
  'Hygienic Sterilization', 
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', 
  'Deep chemical descaling, hard water stain removal, tile joint scrubbing, toilet bowl disinfection, and mirror polishing.', 
  $$["Hard water stain & limescale removal from taps & showers", "Sanitization of commode, wash basin & tub", "Tile scrubbing and grout whitening", "Exhaust fan and mirror streak-free cleaning"]$$::jsonb, 
  $$["Restores original luster to tiles and chrome fittings", "Kills 99.9% germs and bacteria", "Removes mold, mildew, and foul odors"]$$::jsonb, 
  NULL, 
  $$[{"name": "Single Bathroom - Regular", "price": "₹449"}, {"name": "Single Bathroom - Deep Cleaning", "price": "₹599"}, {"name": "Single Bathroom - Move-In Cleaning", "price": "₹649"}, {"name": "Double Bathroom - Regular Cleaning", "price": "₹849"}, {"name": "Double Bathroom - Deep Cleaning", "price": "₹1,049"}]$$::jsonb, 
  NULL, NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_cards = EXCLUDED.pricing_cards;

-- Service 4: Water Tank Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'water-tank-cleaning', 
  'water-tank-cleaning', 
  '4. Water Tank Cleaning Services', 
  'Water Tank Cleaning', 
  'Droplets', 
  'Zet Wash Tech', 
  '/assets/watertank_hero.png', 
  '6-stage high-pressure Zet Wash machine cleaning for overhead RCC tanks, plastic Sintex tanks, and underground sumps.', 
  $$["Dewatering & sludge extraction", "High-pressure jet washing of internal walls", "Vacuum cleaning of remaining silt", "Antibacterial spray & UV sanitization"]$$::jsonb, 
  $$["Ensures crystal clean water for drinking & bathing", "Prevents waterborne diseases and skin irritation", "Removes green algae & sediment accumulation"]$$::jsonb, 
  NULL, 
  $$[{"name": "500 Litres Overhead Tank", "price": "₹499", "highlight": "For Sintex / Plastic overhead tanks"}, {"name": "1,000 Litres Overhead Tank", "price": "₹799", "highlight": "High pressure jet wash & sludge extraction"}, {"name": "2,000 Litres Overhead Tank", "price": "₹1,299", "highlight": "Antibacterial UV sanitization"}, {"name": "Underground Sump (Up to 5,000L)", "price": "₹1,499", "highlight": "6-stage Zet Wash machine dewatering & cleaning"}, {"name": "Underground Sump (5,000L - 10,000L)", "price": "₹2,499", "highlight": "Deep silt extraction & chemical wash"}, {"name": "Commercial Water Tanks (10,000L+)", "price": "₹0.50 per Litre", "highlight": "High pressure Zet Wash machine operation"}]$$::jsonb, 
  NULL, NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_cards = EXCLUDED.pricing_cards;

-- Service 5: Sofa & Carpet Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'sofa-carpet-cleaning', 
  'sofa-carpet-cleaning', 
  '5. Sofa and Carpet Cleaning', 
  'Sofa & Carpet Cleaning', 
  'Armchair', 
  'Shampoo & Extraction', 
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', 
  'Fabric and leather sofa shampooing, wet vacuum extraction, mattress allergen removal, and carpet deep extraction.', 
  $$["Shampooing & stain extraction for fabric sofas", "Conditioning & polishing for leather recliners", "Dust mite & bed bug extraction from mattresses", "Deep moisture extraction for fast drying"]$$::jsonb, 
  $$["Restores fabric color and soft texture", "Eliminates deep trapped dust, sweat & food spills", "Keeps furniture hygienic for family relaxation"]$$::jsonb, 
  NULL, NULL, 
  $$[{"category": "Sofa Cleaning", "options": [{"type": "Fabric Sofa Cleaning", "price": "₹249 / seat"}, {"type": "Leather Sofa Cleaning", "price": "₹299 / seat"}, {"type": "L-Shape Sofa Deep Cleaning", "price": "₹1,199 (5 Seater)"}, {"type": "Recliner Chair Cleaning", "price": "₹399 / chair"}]}, {"category": "Carpet Cleaning", "options": [{"type": "Small Carpet (Up to 20 sq.ft)", "price": "₹399"}, {"type": "Medium Carpet (Up to 50 sq.ft)", "price": "₹699"}, {"type": "Large Living Room Carpet (50+ sq.ft)", "price": "₹12 / sq.ft"}]}, {"category": "Mattress Cleaning", "options": [{"type": "Single Bed Mattress (Single Side)", "price": "₹499"}, {"type": "Double / Queen Mattress (Both Sides)", "price": "₹899"}, {"type": "King Size Mattress Deep Cleaning", "price": "₹1,099"}]}]$$::jsonb, 
  NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_items = EXCLUDED.pricing_items;

-- Service 6: Appliance Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'appliance-cleaning', 
  'appliance-cleaning', 
  '6. Appliance Cleaning Services', 
  'Appliance Cleaning', 
  'Tv', 
  'Interior & Exterior', 
  'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80', 
  'Detailed sanitization and degreasing for kitchen appliances including refrigerators, ovens, microwave, washing machines, and chimneys.', 
  $$["Exterior & interior degreasing of kitchen chimney", "Refrigerator shelf washing & odor elimination", "Microwave / Oven cavity scrubbing & sanitization", "Washing machine tub descaling"]$$::jsonb, 
  $$["Extends appliance lifespan and operational efficiency", "Ensures hygienic food storage and cooking", "Prevents electrical fire hazards from heavy oil buildup"]$$::jsonb, 
  NULL, NULL, NULL, 
  $$[{"name": "Kitchen Chimney Deep Clean", "price": "₹999"}, {"name": "Single Door Fridge Cleaning", "price": "₹599"}, {"name": "Double Door Fridge Cleaning", "price": "₹799"}, {"name": "Side-by-Side Fridge Deep Clean", "price": "₹1,099"}, {"name": "Microwave / Oven Interior Clean", "price": "₹399"}, {"name": "Washing Machine Tub Descale", "price": "₹699"}]$$::jsonb, 
  $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_grid = EXCLUDED.pricing_grid;

-- Service 7: Floor Deep Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'floor-deep-cleaning', 
  'floor-deep-cleaning', 
  '7. Floor Deep Cleaning Services', 
  'Floor Deep Cleaning', 
  'Layers', 
  'Industrial Scrubbing', 
  '/assets/floor_industrial.png', 
  'High-powered single-disc industrial machine scrubbing for marble, granite, vitrified tile, mosaic, and cement flooring.', 
  $$["Single-disc high RPM floor scrubber operation", "Stain removal & tile grout line scrubbing", "Marble & granite surface shine restoration", "Post-construction paint & cement mark removal"]$$::jsonb, 
  $$["Removes tough yellow stains, grout dark spots & rust marks", "Restores original mirror gloss on polished tiles", "Heavy duty solution for commercial halls & large homes"]$$::jsonb, 
  NULL, 
  $$[{"name": "Vitrified Tile Floor Scrubbing", "price": "₹7 / sq.ft", "highlight": "Machine scrubbing & grime extraction"}, {"name": "Marble & Granite Deep Scrubbing", "price": "₹9 / sq.ft", "highlight": "Restores natural luster & removes stains"}, {"name": "Post-Construction Floor Scrubbing", "price": "₹10 / sq.ft", "highlight": "Removes paint splatters, cement & adhesive"}]$$::jsonb, 
  NULL, NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_cards = EXCLUDED.pricing_cards;

-- Service 8: Window Cleaning
INSERT INTO public.services (id, slug, title, short_title, icon_name, badge, hero_image, description, features, benefits, pricing_table, pricing_cards, pricing_items, pricing_grid, notes) 
VALUES (
  'window-cleaning', 
  'window-cleaning', 
  '8. Window & Glass Cleaning', 
  'Window Cleaning', 
  'Maximize', 
  'Streak-Free Polish', 
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80', 
  'Streak-free chemical glass wiping, frame track dirt extraction, mosquito mesh washing, and high-reach window panel cleaning.', 
  $$["Mosquito mesh removal, washing & re-fixing", "Window track dust vacuuming & grime scraping", "Streak-free chemical wiping for glass panels", "Balcony glass railing cleaning"]$$::jsonb, 
  $$["Allows maximum natural sunlight into rooms", "Removes hard water spots from balcony glass", "Cleans hard-to-reach window tracks and corners"]$$::jsonb, 
  NULL, 
  $$[{"name": "2 Panel Window Cleaning", "price": "₹199 / window", "highlight": "Includes mesh washing & track cleaning"}, {"name": "3 Panel Large Window", "price": "₹299 / window", "highlight": "Includes frame & glass polish"}, {"name": "Balcony Glass Railing Cleaning", "price": "₹15 / sq.ft", "highlight": "Streak-free glass chemical wash"}]$$::jsonb, 
  NULL, NULL, $$[]$$::jsonb
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, pricing_cards = EXCLUDED.pricing_cards;

-- Seed Portfolio Data
INSERT INTO public.portfolio (id, title, category, image, description) VALUES
(1, '3BHK Villa Floor Machine Scrubbing', 'House Cleaning', '/assets/floor_industrial.png', 'Restored shine on vitrified tile floor using single-disc scrubbing machine.'),
(2, 'Modular Kitchen Deep Degreasing', 'Kitchen Cleaning', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', 'Heavy oil and grease stain removal from tiles & cabinet exterior.'),
(3, 'Bathroom Hard Water Stain Removal', 'Bathroom Cleaning', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', 'Complete descaling of wall tiles, taps, and commode sterilization.'),
(4, '1,000L Overhead Tank Jet Wash', 'Water Tank Cleaning', '/assets/watertank_hero.png', 'Zet Wash machine dewatering, silt extraction, and UV antibacterial wash.'),
(5, '5-Seater Fabric Sofa Shampooing', 'Sofa Cleaning', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', 'Wet vacuum extraction removing deep trapped dust and food stains.')
ON CONFLICT (id) DO NOTHING;

-- Seed Reviews Data
INSERT INTO public.reviews (id, name, location, rating, date, service, comment, verified) VALUES
(1, 'Venkateswara Rao', 'Currency Nagar, Vijayawada', 5, 'Jan 2025', '3BHK Full Home Deep Cleaning', 'NANI Cleaning staff arrived on time with industrial floor scrubbing machines. My entire flat floor and kitchen look brand new!', true),
(2, 'Priya Sharma', 'Ramavarappadu, Vijayawada', 5, 'Jan 2025', 'Kitchen & Bathroom Cleaning', 'Excellent service for kitchen grease and hard water stains in bathroom. Very polite and disciplined team.', true),
(3, 'Kiran Kumar', 'Prasadampadu, Vijayawada', 5, 'Dec 2024', 'Overhead Water Tank Jet Wash', 'Cleaned 1000L Sintex overhead tank with high pressure jet machine. Water is crystal clear now. Highly recommended!', true)
ON CONFLICT (id) DO NOTHING;
