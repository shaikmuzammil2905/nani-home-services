import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles, Phone, MessageCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { businessDetails } from '../data/websiteData';
import AnimatedCounter from './AnimatedCounter';

const PromoPopup = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user closed pop up recently
    const isDismissed = sessionStorage.getItem('nani_promo_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 4000); // Popup after 4 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('nani_promo_dismissed', 'true');
  };

  const handleClaimOffer = () => {
    setIsOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative z-10 w-full max-w-lg bg-gradient-to-br from-[#020D26] via-[#041E42] to-brand-navy rounded-3xl shadow-2xl overflow-hidden border-2 border-brand-green/40 text-white my-auto"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            aria-label="Close offer pop-up"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Decorative Header */}
          <div className="relative p-6 text-center overflow-hidden">
            {/* Glow effect background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-brand-green text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg mb-3">
              <Gift className="w-4 h-4 animate-bounce" />
              <span>EXCLUSIVE FESTIVE OFFER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight uppercase">
              GET <span className="text-brand-green underline decoration-wavy decoration-emerald-400">20% OFF</span> YOUR CLEANING!
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
              Book any deep cleaning service today in Vijayawada & get an instant discount on machine floor scrubbing & sanitization!
            </p>

            {/* Counting Numbers Banner */}
            <div className="mt-5 grid grid-cols-3 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-brand-green font-heading">
                  <AnimatedCounter target={5000} suffix="+" />
                </div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Homes Cleaned</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading flex justify-center items-center">
                  <AnimatedCounter target={4.9} decimals={1} />
                  <Star className="w-4 h-4 text-amber-400 fill-current ml-1" />
                </div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Rating Score</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-heading">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-[10px] text-slate-300 uppercase tracking-wider font-medium">Satisfaction</div>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="mt-5 bg-emerald-950/60 border border-brand-green/50 rounded-xl p-3 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-bold">Use Coupon Code:</span>
                <span className="text-sm font-extrabold text-white tracking-wider font-mono">NANI20SPECIAL</span>
              </div>
              <span className="bg-brand-green text-white text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                20% OFF
              </span>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleClaimOffer}
                className="w-full bg-brand-green hover:bg-emerald-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-glow-green transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                <span>CLAIM DISCOUNT & BOOK NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent('Hello NANI CLEANING SERVICES. I want to claim the 20% OFF promo code NANI20SPECIAL for cleaning.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl transition flex items-center justify-center space-x-2 text-xs uppercase tracking-wider border border-white/15"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Claim via WhatsApp Chat</span>
              </a>
            </div>

            {/* Footer subtext */}
            <p className="text-[11px] text-slate-400 mt-4 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Eco-Friendly Products & Professional Equipment</span>
            </p>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PromoPopup;
