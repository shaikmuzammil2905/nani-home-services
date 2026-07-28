import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { businessDetails } from '../data/websiteData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/gallery' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg transition-all duration-300">
      {/* Top Info Header Bar */}
      <div className="bg-[#020D26] text-slate-300 py-2 px-4 text-xs font-medium border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${businessDetails.phone}`} className="flex items-center space-x-1.5 hover:text-brand-green transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-green" />
              <span>{businessDetails.phoneFormatted}</span>
            </a>
            <a href={`https://wa.me/${businessDetails.whatsappClean}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-brand-green transition-colors">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping"></span>
              <span>WhatsApp: {businessDetails.whatsapp}</span>
            </a>
            <a href={`mailto:${businessDetails.email}`} className="flex items-center space-x-1.5 hover:text-brand-green transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-royalBlue" />
              <span>{businessDetails.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Currency Nagar, Vijayawada</span>
            </span>
            <Link to="/admin" className="text-slate-400 hover:text-white transition-colors text-[11px] underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled ? 'bg-[#031B4E]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-white/10' : 'bg-[#031B4E] py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-white/20 transition-transform group-hover:scale-105">
              <img 
                src="/assets/logo.png" 
                alt="NANI CLEANING SERVICES" 
                className="h-10 sm:h-12 w-auto object-contain max-w-[180px]"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-white/15 shadow-inner border border-white/10'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/contact"
              className="bg-brand-green hover:bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="bg-brand-green text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
            >
              Book Now
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#031B4E] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-white/15 text-white font-bold border-l-4 border-brand-green'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
            
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={`tel:${businessDetails.phone}`}
                className="w-full bg-brand-royalBlue text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 text-sm shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us: {businessDetails.phoneFormatted}</span>
              </a>
              <a
                href={`https://wa.me/${businessDetails.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-green text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 text-sm shadow"
              >
                <span>WhatsApp Instant Booking</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
