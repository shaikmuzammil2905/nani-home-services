import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Calendar, Sparkles, Gift } from 'lucide-react';
import { businessDetails } from '../data/websiteData';

const FloatingActions = ({ onOpenBooking, onOpenPromo }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-3 pointer-events-none">
      
      {/* Back To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-navy text-white flex items-center justify-center shadow-2xl hover:bg-brand-royalBlue transition-all transform hover:scale-110 border border-white/20"
          aria-label="Back To Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Special Promo Offer Button */}
      {onOpenPromo && (
        <button
          onClick={onOpenPromo}
          className="pointer-events-auto group relative flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:shadow-lg transition-all transform hover:scale-110 border border-white/30"
          aria-label="Claim Special 20% Discount"
          title="20% OFF Special Offer Pop-up"
        >
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-extrabold text-xs px-1 uppercase tracking-wider">
            20% OFF Offer Pop-up
          </span>
        </button>
      )}

      {/* Quick Booking Pop-up Modal Button */}
      {onOpenBooking && (
        <button
          onClick={() => onOpenBooking('')}
          className="pointer-events-auto group relative flex items-center bg-brand-navy text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:shadow-glow-blue transition-all transform hover:scale-110 border border-white/20"
          aria-label="Instant Booking Pop-up"
          title="Quick Book Pop-up"
        >
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-extrabold text-xs px-1 uppercase tracking-wider">
            Quick Booking Pop-up
          </span>
        </button>
      )}

      {/* Direct Call Button */}
      <a
        href={`tel:${businessDetails.phone}`}
        className="pointer-events-auto group relative flex items-center bg-brand-royalBlue text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:shadow-glow-blue transition-all transform hover:scale-105 border border-white/20"
        aria-label="Call NANI CLEANING SERVICES"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs px-1">
          Call Now: {businessDetails.phoneFormatted}
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent('Hello NANI CLEANING SERVICES. I need a free quote for cleaning services.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center bg-brand-green text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:shadow-glow-green transition-all transform hover:scale-110 border border-white/20"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs px-1">
          WhatsApp Chat
        </span>
      </a>

    </div>
  );
};

export default FloatingActions;

