import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#031B4E] flex flex-col items-center justify-center p-4 transition-opacity duration-500">
      {/* Animated Glowing Background Effect */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-royalBlue/20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute w-60 h-60 rounded-full bg-brand-green/20 blur-2xl animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo Container */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-brand-royalBlue to-brand-green opacity-75 blur-md group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
          <div className="relative bg-white p-5 rounded-2xl shadow-2xl border border-white/20">
            <img 
              src="/assets/logo.png" 
              alt="NANI CLEANING SERVICES Logo" 
              className="h-28 w-auto object-contain max-w-[240px] drop-shadow-md"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-spin" />
          <span>Professional Touch & Quality Cleaning</span>
        </div>

        {/* Loading Bar */}
        <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden mb-3 border border-white/10 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-brand-royalBlue via-brand-green to-emerald-400 rounded-full transition-all duration-150 shadow-glow-green"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between w-full text-xs font-medium text-slate-300">
          <span>Loading Services...</span>
          <span className="font-bold text-white text-sm">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
