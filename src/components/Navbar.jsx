import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, Calendar, Search, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import { businessDetails, servicesData } from '../data/websiteData';

const Navbar = ({ onOpenBooking, onOpenPromo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

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
    setSearchOpen(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    // #admin secret command trigger to open admin panel!
    if (query === '#admin' || query === 'admin' || query.includes('#admin')) {
      setSearchOpen(false);
      setSearchQuery('');
      navigate('/admin');
      return;
    }

    if (query) {
      setSearchOpen(false);
      setSearchQuery('');
      navigate(`/services?search=${encodeURIComponent(query)}`);
    }
  };

  const filteredSearchServices = servicesData.filter(svc => 
    svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    svc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
              {onOpenPromo && (
                <button
                  onClick={onOpenPromo}
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md text-xs font-bold border border-amber-500/40 flex items-center space-x-1 transition animate-pulse"
                >
                  <span>🔥 20% OFF Offer</span>
                </button>
              )}
              <button 
                onClick={() => setSearchOpen(true)}
                className="text-slate-300 hover:text-brand-green flex items-center space-x-1 transition text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-md"
              >
                <Search className="w-3 h-3 text-brand-green" />
                <span>Search</span>
              </button>
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

            {/* CTA Button & Search Button */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
                title="Search website or type #admin"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenBooking && onOpenBooking('')}
                className="bg-brand-green hover:bg-emerald-600 text-white text-sm font-extrabold px-5 py-2.5 rounded-full shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-brand-green" />
              </button>
              <button
                onClick={() => onOpenBooking && onOpenBooking('')}
                className="bg-brand-green text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow uppercase"
              >
                Book Now
              </button>
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

      {/* Search Modal with #admin code trigger */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider flex items-center space-x-2">
                <Search className="w-4 h-4 text-brand-green" />
                <span>Search NANI CLEANING SERVICES</span>
              </span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="p-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type service name or enter #admin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-24 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:border-brand-royalBlue text-sm font-semibold text-slate-900"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-brand-navy hover:bg-brand-royalBlue text-white font-bold text-xs px-4 py-1.5 rounded-xl transition"
                >
                  Search
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 px-1">
                Tip: Enter <code className="bg-slate-100 text-brand-navy px-1.5 py-0.5 rounded font-mono font-bold">#admin</code> to open Admin Portal Login.
              </p>
            </form>

            {searchQuery.trim() && searchQuery.toLowerCase() !== '#admin' && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 max-h-64 overflow-y-auto space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                  Matching Services ({filteredSearchServices.length})
                </span>
                {filteredSearchServices.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">No matching services found.</p>
                ) : (
                  filteredSearchServices.map((svc) => (
                    <div
                      key={svc.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        navigate(`/services/${svc.slug}`);
                      }}
                      className="p-3 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-brand-navy">{svc.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{svc.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-green shrink-0" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
