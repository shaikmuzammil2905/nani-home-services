import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import InquiryForm from './InquiryForm';

const QuickBookingModal = ({ isOpen, onClose, defaultService = '' }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 my-auto"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-brand-navy via-[#031B4E] to-brand-royalBlue text-white p-5 sm:p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2 text-brand-green text-xs font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>INSTANT BOOKING & FREE QUOTE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Book Cleaning Service
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Get an instant quote & direct WhatsApp confirmation in 60 seconds!
            </p>

            <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-white/10 text-[11px] text-emerald-300 font-semibold">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Satisfaction</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Same Day Slot</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Hidden Fees</span>
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
            <InquiryForm defaultService={defaultService} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickBookingModal;
