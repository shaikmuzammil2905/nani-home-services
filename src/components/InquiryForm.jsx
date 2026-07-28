import React, { useState } from 'react';
import { Send, CheckCircle2, User, Phone, Mail, MapPin, Calendar, Home as HomeIcon, MessageSquare } from 'lucide-react';
import { saveInquiry } from '../utils/storage';
import { businessDetails } from '../data/websiteData';

const InquiryForm = ({ defaultService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: defaultService || 'Full House Cleaning',
    propertyType: '1BHK Apartment',
    preferredDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Save to local database for Admin Panel
    saveInquiry(formData);

    // Prepare WhatsApp redirect message
    const waNumber = businessDetails.whatsappClean;
    const messageText = `Hello NANI CLEANING SERVICES. My name is ${formData.name}. I am interested in ${formData.service}. Location: ${formData.location || 'Vijayawada'}. Preferred Date: ${formData.preferredDate || 'Asap'}. Phone: ${formData.phone}. Property: ${formData.propertyType}. Please contact me regarding cleaning services.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Immediately open WhatsApp
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl shadow-premium p-6 sm:p-8 border border-slate-100 relative overflow-hidden">
      {/* Decorative header ribbon */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-navy via-brand-royalBlue to-brand-green"></div>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-brand-navy font-heading">
          BOOK YOUR SERVICE
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Fill in details below for instant free quote & WhatsApp confirmation
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Inquiry Received Successfully!</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Opening WhatsApp to complete your booking with our specialist... If WhatsApp didn't open automatically, click button below.
          </p>
          <a
            href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent(`Hello NANI CLEANING SERVICES. My name is ${formData.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-brand-green text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-glow-green transition"
          >
            <span>Open WhatsApp Chat Now</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Issak Nani"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Mobile / Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 6303550847"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Location / Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Currency Nagar, Vijayawada"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Select Service */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Select Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm bg-white transition"
              >
                <option value="Full House Cleaning">1. Home Cleaning (Full House)</option>
                <option value="Kitchen Cleaning">2. Kitchen Cleaning</option>
                <option value="Bathroom Cleaning">3. Bathroom Cleaning</option>
                <option value="Water Tank Cleaning">4. Water Tank Cleaning</option>
                <option value="Sofa & Carpet Cleaning">5. Sofa & Carpet Cleaning</option>
                <option value="Appliance Cleaning">6. Appliance Cleaning</option>
                <option value="Window Cleaning">7. Window Cleaning</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm bg-white transition"
              >
                <option value="1BHK Apartment">1BHK Flat / House</option>
                <option value="2BHK Apartment">2BHK Flat / House</option>
                <option value="3BHK Apartment">3BHK Flat / House</option>
                <option value="4BHK+ Villa">4BHK+ Independent Villa</option>
                <option value="Commercial Office">Commercial Office / Shop</option>
              </select>
            </div>

          </div>

          {/* Preferred Date & Message */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Special Message / Note
              </label>
              <input
                type="text"
                name="message"
                placeholder="Any special instruction or request..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-royalBlue focus:ring-2 focus:ring-brand-royalBlue/20 outline-none text-sm transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-brand-green hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-base uppercase tracking-wider"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Processing...</span>
              </span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
