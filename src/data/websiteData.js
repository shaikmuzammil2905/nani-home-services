export const businessDetails = {
  name: "NANI CLEANING SERVICES",
  tagline: "PROFESSIONAL TOUCH",
  experience: "5+ Years",
  address: "9/160, Prasadampadu, Currency Nagar, Ramavarappadu, Vijayawada, Andhra Pradesh – 521108",
  phone: "6303550847",
  phoneFormatted: "+91 63035 50847",
  whatsapp: "+91 85005 20847",
  whatsappClean: "918500520847",
  email: "issaknani123456789@gmail.com",
  workingHours: "Monday - Sunday: 8:00 AM - 9:00 PM",
  vision: "To become the most trusted and preferred professional cleaning service provider by delivering high-quality, hygienic, affordable, and reliable cleaning solutions.",
  mission: "Deliver exceptional cleaning services using modern equipment, trained professionals, eco-friendly methods, and complete customer satisfaction.",
  coreValues: [
    { title: "Quality", desc: "Top-tier standards in every corner cleaning" },
    { title: "Trust", desc: "Background verified and vetted cleaning staff" },
    { title: "Professionalism", desc: "Punctual, courteous and disciplined execution" },
    { title: "Customer Satisfaction", desc: "100% satisfaction guarantee on all services" },
    { title: "Safety", desc: "Eco-friendly, non-toxic products safe for kids & pets" },
    { title: "Reliability", desc: "Dependable service delivered right on schedule" },
    { title: "Honesty", desc: "Transparent upfront pricing with zero hidden charges" },
    { title: "Affordable Pricing", desc: "Best value pricing package for every home budget" },
    { title: "Timely Service", desc: "Quick response team and fast turnaround time" }
  ]
};

export const servicesData = [
  {
    id: "home-cleaning",
    slug: "home-cleaning",
    title: "1. Home Cleaning Services",
    shortTitle: "Home Cleaning",
    iconName: "Home",
    badge: "Most Popular",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    description: "Professional deep home cleaning for apartments, villas, and houses using advanced floor scrubbing machines, eco-friendly chemicals, and trained cleaning experts.",
    features: [
      "Deep cleaning of all living areas & bedrooms",
      "Floor scrubbing with high-power industrial machines",
      "Cobweb removal & wall dusting",
      "Balcony, window & glass door sanitation",
      "Disinfection of high-touch handles & switches"
    ],
    benefits: [
      "Eliminates 99.9% of dust mites and allergens",
      "Restores natural shine of marble, tile & wooden floors",
      "Saves hours of laborious household cleaning",
      "Leaves home smelling fresh and hygienic"
    ],
    pricingTable: {
      headers: ["TYPE", "EMPTY FLAT", "OCCUPIED FLAT"],
      rows: [
        { type: "1BHK", empty: "₹3,500", occupied: "₹5,000" },
        { type: "2BHK", empty: "₹6,000", occupied: "₹8,000" },
        { type: "3BHK", empty: "₹7,500", occupied: "₹9,500" },
        { type: "4BHK", empty: "₹10,000", occupied: "₹14,000" }
      ],
      extra: "Floor Cleaning using Floor Scrubbing Machine starting from ₹7 per sq.ft (Price depends on floor condition)."
    }
  },
  {
    id: "kitchen-cleaning",
    slug: "kitchen-cleaning",
    title: "2. Kitchen Cleaning Services",
    shortTitle: "Kitchen Cleaning",
    iconName: "Utensils",
    badge: "Deep Scrubbing",
    heroImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    description: "Thorough oil, grease, and grime removal from cabinets, countertops, tiles, sink, chimney exterior, and kitchen walls.",
    features: [
      "Heavy degreasing of stove, wall tiles & countertops",
      "Exterior scrubbing of kitchen cabinets & handles",
      "Sink descaling & drain pipe sanitization",
      "Floor scrubbing & stain removal"
    ],
    benefits: [
      "Removes stubborn grease deposits completely",
      "Creates a hygienic space for safe food preparation",
      "Eliminates bad odors and pest attraction"
    ],
    pricingCards: [
      { name: "Empty Kitchen", price: "₹1,400", highlight: "Best for move-in / move-out" },
      { name: "Occupied Kitchen", price: "₹2,200", highlight: "Includes deep cabinet exterior cleaning" }
    ],
    notes: [
      "Utensils are not included.",
      "Appliance cleaning (chimney, fridge, microwave) is charged separately."
    ]
  },
  {
    id: "bathroom-cleaning",
    slug: "bathroom-cleaning",
    title: "3. Bathroom Cleaning Services",
    shortTitle: "Bathroom Cleaning",
    iconName: "Bath",
    badge: "Hygienic Sterilization",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    description: "Deep chemical descaling, hard water stain removal, tile joint scrubbing, toilet bowl disinfection, and mirror polishing.",
    features: [
      "Hard water stain & limescale removal from taps & showers",
      "Sanitization of commode, wash basin & tub",
      "Tile scrubbing and grout whitening",
      "Exhaust fan and mirror streak-free cleaning"
    ],
    benefits: [
      "Restores original luster to tiles and chrome fittings",
      "Kills 99.9% germs and bacteria",
      "Removes mold, mildew, and foul odors"
    ],
    pricingCards: [
      { name: "Single Bathroom - Regular", price: "₹449" },
      { name: "Single Bathroom - Deep Cleaning", price: "₹599" },
      { name: "Single Bathroom - Move-In Cleaning", price: "₹649" },
      { name: "Double Bathroom - Regular Cleaning", price: "₹849" },
      { name: "Double Bathroom - Deep Cleaning", price: "₹1,049" }
    ]
  },
  {
    id: "water-tank-cleaning",
    slug: "water-tank-cleaning",
    title: "4. Water Tank Cleaning Services",
    shortTitle: "Watertank Cleaning",
    iconName: "Droplets",
    badge: "Zet Wash Tech",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    description: "6-stage high-pressure Zet Wash machine cleaning for overhead RCC tanks, plastic Sintex tanks, and underground sumps.",
    features: [
      "Dewatering & sludge extraction",
      "High-pressure jet washing of internal walls",
      "Vacuum cleaning of remaining silt",
      "Antibacterial spray & UV sanitization"
    ],
    benefits: [
      "Ensures crystal clean water for drinking & bathing",
      "Prevents waterborne diseases and skin irritation",
      "Removes green algae & sediment accumulation"
    ],
    pricingCards: [
      { name: "Residential Tanks", price: "₹1 per Litre", highlight: "For Sintex & Overhead RCC tanks" },
      { name: "Commercial Tanks (10,000L+)", price: "₹0.50 per Litre", highlight: "High pressure Zet Wash Machine" }
    ]
  },
  {
    id: "sofa-carpet-cleaning",
    slug: "sofa-carpet-cleaning",
    title: "5. Sofa and Carpet Cleaning",
    shortTitle: "Sofa & Carpet Cleaning",
    iconName: "Armchair",
    badge: "Steam & Foam",
    heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    description: "Professional dry vacuuming, deep foam scrubbing, and high-temperature steam extraction for sofas, carpets, and mattresses.",
    features: [
      "Deep fabric vacuuming to remove hidden dust & mites",
      "Stain treatment with non-bleach eco shampoos",
      "Steam extraction to eliminate odors & bacteria",
      "Quick dry process"
    ],
    benefits: [
      "Brightens fabric colors and removes stubborn stains",
      "Prolong fabric life and soft feel",
      "Safe for children and pets"
    ],
    pricingItems: [
      { category: "5-Seater Sofa", options: [
        { type: "Dusting & Vacuum", price: "₹1,000" },
        { type: "Steam Cleaning", price: "₹1,750", detail: "₹350 per seat" },
        { type: "Foam Cleaning", price: "₹1,500", detail: "₹300 per seat" }
      ]},
      { category: "Carpet Cleaning", options: [
        { type: "Deep Carpet Shampooing", price: "₹16 per sq.ft" }
      ]},
      { category: "Mattress Cleaning", options: [
        { type: "Single Mattress", price: "₹399" },
        { type: "Double Mattress", price: "₹699" }
      ]}
    ]
  },
  {
    id: "appliance-cleaning",
    slug: "appliance-cleaning",
    title: "6. Appliance Cleaning",
    shortTitle: "Appliance Cleaning",
    iconName: "Tv",
    badge: "Detail Scrub",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    description: "Specialized deep cleaning for kitchen appliances, refrigerators, fans, chimneys, dining tables, and mirrors.",
    features: [
      "Internal & external shelf disinfection",
      "Oil & grease extraction from chimney mesh filters",
      "Dust removal from fan blades & motor casing",
      "Dining table & mirror polish"
    ],
    benefits: [
      "Improves appliance efficiency & cooling/airflow",
      "Eliminates stale food smell in fridges",
      "Enhances home aesthetics"
    ],
    pricingGrid: [
      { name: "Single Door Fridge", price: "₹349" },
      { name: "Double Door Fridge", price: "₹499" },
      { name: "Ceiling Fan", price: "₹49 each" },
      { name: "Kitchen Chimney", price: "₹499 each" },
      { name: "Kitchen Exhaust Fan", price: "₹149 each" },
      { name: "Bathroom Exhaust Fan", price: "₹89 each" },
      { name: "Microwave Oven", price: "₹349 each" },
      { name: "Dining Table with 4 Chairs", price: "₹399" },
      { name: "Wash Basin", price: "₹99 each" },
      { name: "Kitchen Sink", price: "₹99 each" },
      { name: "Gas Stove", price: "₹149 each" },
      { name: "Mirror Cleaning", price: "₹99 each" }
    ]
  },
  {
    id: "window-cleaning",
    slug: "window-cleaning",
    title: "7. Window Cleaning",
    shortTitle: "Window Cleaning",
    iconName: "Maximize",
    badge: "Crystal Clear",
    heroImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    description: "Streak-free glass panel washing, track scrubbing, mesh cleaning, and high-level cobweb dusting.",
    features: [
      "Glass pane squeegee washing",
      "Window frame & track mud removal",
      "Mosquito mesh dust vacuuming",
      "Cobweb removal from high ceilings"
    ],
    benefits: [
      "Allows maximum natural sunlight into rooms",
      "Removes hard water spots on glass",
      "Keeps window tracks sliding smoothly"
    ],
    pricingCards: [
      { name: "Regular Window", price: "₹149 each" },
      { name: "Kitchen Window", price: "₹249 each" },
      { name: "Cobweb Dusting", price: "₹199 per room" }
    ]
  }
];

export const initialPortfolio = [
  // WATER TANK CLEANING
  { 
    id: 1, 
    title: "OVERHEAD WATER TANK CLEANING", 
    category: "Water Tank", 
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
    desc: "High pressure jet washing and chemical descaling for Sintex overhead water tank."
  },
  { 
    id: 2, 
    title: "UNDERGROUND SUMP DEEP CLEANING", 
    category: "Water Tank", 
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    desc: "Sludge extraction & antibacterial UV sanitization for residential water sump."
  },
  { 
    id: 3, 
    title: "COMMERCIAL TANK WASHING", 
    category: "Water Tank", 
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80",
    desc: "10,000L+ Commercial water tank vacuum & high-pressure jet wash."
  },

  // FLOOR CLEANING
  { 
    id: 4, 
    title: "INDUSTRIAL FLOOR SCRUBBING", 
    category: "Floor Cleaning", 
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    desc: "Single disc floor scrubbing machine operation on marble tiles."
  },
  { 
    id: 5, 
    title: "MARBLE & TILE POLISHING", 
    category: "Floor Cleaning", 
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80",
    desc: "Stain removal and high-gloss floor polishing."
  },
  { 
    id: 6, 
    title: "DEEP TILED FLOOR SANITIZATION", 
    category: "Floor Cleaning", 
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80",
    desc: "Grout joint cleaning & anti-bacterial floor mopping."
  },

  // WINDOW CLEANING
  { 
    id: 7, 
    title: "STREAK-FREE WINDOW WASHING", 
    category: "Window Cleaning", 
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    desc: "Squeegee washing & glass pane stain removal."
  },
  { 
    id: 8, 
    title: "BALCONY GLASS PANEL CLEANING", 
    category: "Window Cleaning", 
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    desc: "Dust & cobweb vacuuming from window tracks."
  },
  { 
    id: 9, 
    title: "HIGH-RISE WINDOW GLASS CLEANING", 
    category: "Window Cleaning", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Exterior window frame & mosquito mesh cleaning."
  },

  // SOFA & CARPET
  { 
    id: 10, 
    title: "SOFA SHAMPOOING & STEAM CLEANING", 
    category: "Sofa", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    desc: "Deep foam extraction for 5-seater fabric sofa."
  },
  { 
    id: 11, 
    title: "CARPET DEEP VACUUMING", 
    category: "Sofa", 
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy duty carpet washing and spot treatment."
  },
  { 
    id: 12, 
    title: "MATTRESS STERILIZATION", 
    category: "Sofa", 
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    desc: "UV steam cleaning for double bed mattress."
  },

  // KITCHEN
  { 
    id: 13, 
    title: "KITCHEN DEGREASING & CLEANING", 
    category: "Kitchen", 
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    desc: "Oil stain removal from chimney, stove & wall tiles."
  },
  { 
    id: 14, 
    title: "CABINET & COUNTERTOP POLISH", 
    category: "Kitchen", 
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80",
    desc: "Disinfection of kitchen sink and modular drawers."
  },

  // BATHROOM
  { 
    id: 15, 
    title: "BATHROOM HARD WATER DESCALING", 
    category: "Bathroom", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    desc: "Limescale removal from shower taps, tub & tile walls."
  },
  { 
    id: 16, 
    title: "COMMODE & BASIN STERILIZATION", 
    category: "Bathroom", 
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    desc: "99.9% germ elimination with non-corrosive chemicals."
  },

  // RESIDENTIAL & COMMERCIAL
  { 
    id: 17, 
    title: "FULL HOUSE 3BHK DEEP CLEAN", 
    category: "Residential", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    desc: "Comprehensive move-in cleaning for villa."
  },
  { 
    id: 18, 
    title: "COMMERCIAL OFFICE SANITIZATION", 
    category: "Commercial", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    desc: "Workspace desk & carpet deep cleaning."
  }
];

export const statsCounterData = [
  { count: 5, label: "Years Experience", suffix: "+" },
  { count: 2500, label: "Projects Completed", suffix: "+" },
  { count: 1500, label: "Happy Customers", suffix: "+" },
  { count: 100, label: "Satisfaction Rate", suffix: "%" }
];

export const teamMembers = [
  {
    id: 1,
    name: "Issak Nani",
    role: "Founder & Managing Director",
    category: "Founder",
    experience: "5+ Years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    desc: "Passionate entrepreneur committed to revolutionizing the cleaning industry with eco-friendly solutions and uncompromised quality standards in Vijayawada."
  },
  {
    id: 2,
    name: "K. Rajesh",
    role: "Operations Supervisor",
    category: "Supervisors",
    experience: "4 Years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    desc: "Oversees site inspections, quality control audits, and field team deployments."
  },
  {
    id: 3,
    name: "S. Venkatesh",
    role: "Senior Cleaning Specialist",
    category: "Cleaning Staff",
    experience: "5 Years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    desc: "Specialist in industrial floor scrubbing machines and Zet wash tank cleaning."
  },
  {
    id: 4,
    name: "M. Anitha",
    role: "Customer Success Manager",
    category: "Management",
    experience: "3 Years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    desc: "Ensures 100% customer satisfaction, schedule management, and instant inquiry response."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "Currency Nagar, Vijayawada",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent and professional service! My 3BHK home looks brand new after their deep cleaning service. Highly recommended!",
    service: "3BHK Full House Cleaning"
  },
  {
    id: 2,
    name: "Ramesh Babu",
    location: "Prasadampadu, Vijayawada",
    rating: 5,
    date: "1 week ago",
    comment: "The floor scrubbing machine service removed stains that were 3 years old. Very polite staff and punctual service.",
    service: "Floor Scrubbing & Kitchen Cleaning"
  },
  {
    id: 3,
    name: "Sowmya K.",
    location: "Ramavarappadu, Vijayawada",
    rating: 5,
    date: "2 weeks ago",
    comment: "Water tank cleaning done with Zet Wash machine was super clean! Crystal clear water now. Thank you Nani Cleaning Services!",
    service: "Overhead Water Tank Cleaning"
  }
];

export const faqs = [
  {
    q: "How do I book a cleaning service with NANI CLEANING SERVICES?",
    a: "You can book directly by filling the Inquiry Form on our website, clicking the 'Book Now' button, or calling/WhatsApping us at +91 85005 20847."
  },
  {
    q: "Are your cleaning chemicals safe for kids and pets?",
    a: "Yes! We use 100% eco-friendly, non-toxic, and anti-bacterial cleaning solutions that are completely safe for your family and pets."
  },
  {
    q: "Do I need to supply any cleaning tools or liquids?",
    a: "No! Our professional cleaning team arrives fully equipped with industrial floor scrubbing machines, vacuum cleaners, steam cleaners, microfiber cloths, and chemicals."
  },
  {
    q: "What is the difference between Empty Flat and Occupied Flat cleaning?",
    a: "Empty Flat cleaning focuses on empty space scrubbing, windows, balcony, and floor polishing. Occupied Flat cleaning includes moving light furniture, dusting appliances, and cleaning around household belongings."
  },
  {
    q: "How long does a 2BHK or 3BHK home deep cleaning take?",
    a: "Typically a 2BHK/3BHK full deep cleaning takes between 4 to 6 hours with a dedicated team of 3-4 professional cleaners."
  }
];
