import { servicesData, initialPortfolio, teamMembers, testimonials } from '../data/websiteData';
import { supabase } from './supabaseClient';

const KEYS = {
  INQUIRIES: 'nani_inquiries_db',
  SERVICES: 'nani_services_db',
  GALLERY: 'nani_gallery_db',
  TEAM: 'nani_team_db',
  REVIEWS: 'nani_reviews_db',
  ADMIN_AUTH: 'nani_admin_auth'
};

// Initialize local storage defaults only if not set (preserves edits!)
export const initStorage = async () => {
  if (!localStorage.getItem(KEYS.SERVICES)) {
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(servicesData));
  }
  if (!localStorage.getItem(KEYS.GALLERY)) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialPortfolio));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(testimonials));
  }
  if (!localStorage.getItem(KEYS.TEAM)) {
    localStorage.setItem(KEYS.TEAM, JSON.stringify(teamMembers));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
  }

  // Attempt background sync from Supabase
  try {
    const { data: dbServices } = await supabase.from('services').select('*');
    if (dbServices && dbServices.length > 0) {
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(dbServices));
    }

    const { data: dbPortfolio } = await supabase.from('portfolio').select('*');
    if (dbPortfolio && dbPortfolio.length > 0) {
      localStorage.setItem(KEYS.GALLERY, JSON.stringify(dbPortfolio));
    }

    const { data: dbReviews } = await supabase.from('reviews').select('*');
    if (dbReviews && dbReviews.length > 0) {
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify(dbReviews));
    }
  } catch (err) {
    console.log('Supabase offline or tables not initialized yet. Using local cache.');
  }
};

// --- SERVICES ---
export const getStoredServices = () => {
  const data = localStorage.getItem(KEYS.SERVICES);
  return data ? JSON.parse(data) : servicesData;
};

export const saveServices = async (services) => {
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
  try {
    for (const svc of services) {
      await supabase.from('services').upsert({
        id: svc.id,
        slug: svc.slug,
        title: svc.title,
        short_title: svc.shortTitle || svc.title,
        badge: svc.badge,
        hero_image: svc.heroImage,
        description: svc.description,
        features: svc.features || [],
        benefits: svc.benefits || [],
        pricing_table: svc.pricingTable || null,
        pricing_cards: svc.pricingCards || null,
        pricing_items: svc.pricingItems || null,
        pricing_grid: svc.pricingGrid || null,
        notes: svc.notes || []
      });
    }
  } catch (err) {
    console.warn('Failed to sync services to Supabase:', err);
  }
};

// --- GALLERY / PORTFOLIO ---
export const getStoredGallery = () => {
  const data = localStorage.getItem(KEYS.GALLERY);
  return data ? JSON.parse(data) : initialPortfolio;
};

export const saveGallery = async (gallery) => {
  localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
  try {
    await supabase.from('portfolio').delete().neq('id', 0);
    for (const item of gallery) {
      await supabase.from('portfolio').upsert({
        id: item.id || Date.now(),
        title: item.title,
        category: item.category,
        image: item.image,
        description: item.description || ''
      });
    }
  } catch (err) {
    console.warn('Failed to sync portfolio to Supabase:', err);
  }
};

// --- REVIEWS / TESTIMONIALS ---
export const getStoredReviews = () => {
  const data = localStorage.getItem(KEYS.REVIEWS);
  return data ? JSON.parse(data) : testimonials;
};

export const saveReviews = async (reviews) => {
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
  try {
    await supabase.from('reviews').delete().neq('id', 0);
    for (const item of reviews) {
      await supabase.from('reviews').upsert({
        id: item.id || Date.now(),
        name: item.name,
        location: item.location || '',
        rating: item.rating || 5,
        date: item.date || 'Recently',
        service: item.service || 'General Service',
        comment: item.comment,
        verified: item.verified !== false,
        avatar: item.avatar || ''
      });
    }
  } catch (err) {
    console.warn('Failed to sync reviews to Supabase:', err);
  }
};

// --- INQUIRIES ---
export const getInquiries = () => {
  const data = localStorage.getItem(KEYS.INQUIRIES);
  return data ? JSON.parse(data) : [];
};

export const saveInquiry = async (inquiryData) => {
  const inquiries = getInquiries();
  const newInquiry = {
    id: 'INQ-' + Date.now(),
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'Pending',
    ...inquiryData
  };
  inquiries.unshift(newInquiry);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));

  try {
    await supabase.from('inquiries').insert({
      id: newInquiry.id,
      name: newInquiry.name,
      phone: newInquiry.phone,
      email: newInquiry.email || '',
      location: newInquiry.location || '',
      service: newInquiry.service || '',
      property_type: newInquiry.propertyType || '',
      preferred_date: newInquiry.preferredDate || '',
      message: newInquiry.message || '',
      status: newInquiry.status
    });
  } catch (err) {
    console.warn('Failed to push inquiry to Supabase:', err);
  }

  return newInquiry;
};

export const deleteInquiry = async (id) => {
  const inquiries = getInquiries().filter(inq => inq.id !== id);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  try {
    await supabase.from('inquiries').delete().eq('id', id);
  } catch (err) {
    console.warn('Failed to delete inquiry in Supabase:', err);
  }
  return inquiries;
};

export const updateInquiryStatus = async (id, status) => {
  const inquiries = getInquiries().map(inq => inq.id === id ? { ...inq, status } : inq);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  try {
    await supabase.from('inquiries').update({ status }).eq('id', id);
  } catch (err) {
    console.warn('Failed to update inquiry status in Supabase:', err);
  }
  return inquiries;
};

// Export to CSV
export const exportInquiriesToCSV = () => {
  const inquiries = getInquiries();
  if (inquiries.length === 0) return;

  const headers = ["Inquiry ID", "Date", "Name", "Phone", "Email", "Location", "Service", "Property Type", "Preferred Date", "Message", "Status"];
  const csvRows = [headers.join(",")];

  inquiries.forEach(i => {
    const row = [
      `"${i.id}"`,
      `"${i.date}"`,
      `"${i.name || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.email || ''}"`,
      `"${i.location || ''}"`,
      `"${i.service || ''}"`,
      `"${i.propertyType || ''}"`,
      `"${i.preferredDate || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.status}"`
    ];
    csvRows.push(row.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Nani_Cleaning_Inquiries_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
