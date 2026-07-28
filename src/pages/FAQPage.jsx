import React, { useState } from 'react';
import { faqs } from '../data/websiteData';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Got Questions? We Have Answers.
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Find answers to common questions regarding home cleaning, chemical safety, equipment, and booking process.
          </p>
        </div>
      </section>

      {/* Accordion FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-brand-navy text-base sm:text-lg focus:outline-none"
              >
                <div className="flex items-center space-x-3 pr-4">
                  <HelpCircle className="w-5 h-5 text-brand-green shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'transform rotate-180 text-brand-green' : ''}`} />
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
