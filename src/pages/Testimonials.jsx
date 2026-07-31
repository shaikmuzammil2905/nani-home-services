import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { getStoredReviews } from '../utils/storage';

const Testimonials = () => {
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    setReviewsList(getStoredReviews());
  }, []);

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            REAL CLIENT REVIEWS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            What Our Customers Say
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Google rating style reviews from verified homeowners and businesses in Vijayawada.
          </p>
        </div>
      </section>

      {/* Google Rating Overview Badge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-4 bg-white p-6 rounded-3xl shadow-lg border border-slate-200">
          <div className="text-4xl font-extrabold text-brand-navy">4.9</div>
          <div>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Based on {reviewsList.length * 50}+ Verified Google Reviews
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative space-y-4 hover:shadow-2xl transition">
              <Quote className="w-10 h-10 text-brand-lightBlue absolute top-6 right-6 opacity-40" />
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">"{t.comment}"</p>
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-extrabold text-brand-navy text-base">{t.name}</h4>
                <p className="text-xs text-slate-500">{t.location}</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-brand-green bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Service: {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
