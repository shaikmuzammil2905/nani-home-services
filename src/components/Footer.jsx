import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Map, CheckCircle2 } from 'lucide-react';
import { businessDetails } from '../data/websiteData';

const Footer = () => {
  return (
    <footer className="bg-[#020D26] text-slate-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-md border border-white/20">
              <img 
                src="/assets/logo.png" 
                alt="NANI CLEANING SERVICES" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              We provide reliable and professional cleaning services for a healthier and happier home using eco-friendly products and industrial grade equipment.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-royalBlue hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${businessDetails.whatsappClean}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(businessDetails.address)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Map className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-green inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About Us', 'Services', 'Pricing', 'Portfolio', 'Reviews', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : item === 'About Us' ? '/about' : item === 'Portfolio' ? '/gallery' : item === 'Reviews' ? '/testimonials' : `/${item.toLowerCase().replace(' ', '')}`;
                return (
                  <li key={item}>
                    <Link to={path} className="hover:text-brand-green transition-colors flex items-center space-x-2">
                      <span className="text-brand-green">›</span>
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-green inline-block">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home Cleaning', path: '/services/home-cleaning' },
                { name: 'Kitchen Cleaning', path: '/services/kitchen-cleaning' },
                { name: 'Bathroom Cleaning', path: '/services/bathroom-cleaning' },
                { name: 'Watertank Cleaning', path: '/services/water-tank-cleaning' },
                { name: 'Sofa & Carpet Cleaning', path: '/services/sofa-carpet-cleaning' },
                { name: 'Appliance Cleaning', path: '/services/appliance-cleaning' },
                { name: 'Window Cleaning', path: '/services/window-cleaning' }
              ].map((svc) => (
                <li key={svc.name}>
                  <Link to={svc.path} className="hover:text-brand-green transition-colors flex items-center space-x-2">
                    <span className="text-brand-green">›</span>
                    <span>{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Payment Accepted */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider mb-5 pb-2 border-b-2 border-brand-green inline-block">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${businessDetails.phone}`} className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>+91 63035 50847</span>
              </a>
              <a href={`https://wa.me/${businessDetails.whatsappClean}`} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>+91 85005 20847</span>
              </a>
              <a href={`mailto:${businessDetails.email}`} className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-brand-royalBlue shrink-0 mt-0.5" />
                <span className="break-all">{businessDetails.email}</span>
              </a>
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{businessDetails.address}</span>
              </div>
            </div>

            {/* Payment We Accept */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                Payment We Accept
              </h4>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-white text-blue-900 font-extrabold text-xs rounded shadow">VISA</span>
                <span className="px-2.5 py-1 bg-white text-red-600 font-extrabold text-xs rounded shadow">MasterCard</span>
                <span className="px-2.5 py-1 bg-white text-green-700 font-extrabold text-xs rounded shadow">UPI</span>
                <span className="px-2.5 py-1 bg-white text-cyan-600 font-extrabold text-xs rounded shadow">Paytm</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Nani Cleaning Service. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
