import { servicesData, initialPortfolio, teamMembers, testimonials, faqs } from '../data/websiteData';

const KEYS = {
  INQUIRIES: 'nani_inquiries_db',
  SERVICES: 'nani_services_db',
  GALLERY: 'nani_gallery_db',
  TEAM: 'nani_team_db',
  REVIEWS: 'nani_reviews_db',
  SETTINGS: 'nani_settings_db',
  ADMIN_AUTH: 'nani_admin_auth'
};

// Initialize default storage or update portfolio if expanded
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.SERVICES)) {
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(servicesData));
  }
  
  // Refresh gallery with updated initialPortfolio
  localStorage.setItem(KEYS.GALLERY, JSON.stringify(initialPortfolio));

  if (!localStorage.getItem(KEYS.TEAM)) {
    localStorage.setItem(KEYS.TEAM, JSON.stringify(teamMembers));
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(testimonials));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify([]));
  }
};

// Inquiries
export const saveInquiry = (inquiryData) => {
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
  return newInquiry;
};

export const getInquiries = () => {
  const data = localStorage.getItem(KEYS.INQUIRIES);
  return data ? JSON.parse(data) : [];
};

export const deleteInquiry = (id) => {
  const inquiries = getInquiries().filter(inq => inq.id !== id);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  return inquiries;
};

export const updateInquiryStatus = (id, status) => {
  const inquiries = getInquiries().map(inq => inq.id === id ? { ...inq, status } : inq);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(inquiries));
  return inquiries;
};

// Services
export const getStoredServices = () => {
  const data = localStorage.getItem(KEYS.SERVICES);
  return data ? JSON.parse(data) : servicesData;
};

export const saveServices = (services) => {
  localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
};

// Gallery
export const getStoredGallery = () => {
  const data = localStorage.getItem(KEYS.GALLERY);
  return data ? JSON.parse(data) : initialPortfolio;
};

export const saveGallery = (gallery) => {
  localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
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
