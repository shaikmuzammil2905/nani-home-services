import React from 'react';
import { Home, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingTable = ({ title, rows, extraNote }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 my-6">
      
      {/* Header Bar */}
      <div className="bg-[#041E42] text-white px-6 py-4 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white">
          <Home className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-extrabold font-heading tracking-wide uppercase">
          {title || '1. FULL HOUSE CLEANING'}
        </h3>
      </div>

      {/* Pricing Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase text-slate-600 tracking-wider">
              <th className="py-4 px-6">TYPE</th>
              <th className="py-4 px-6 text-brand-green font-black">EMPTY FLAT</th>
              <th className="py-4 px-6 text-brand-green font-black">OCCUPIED FLAT</th>
              <th className="py-4 px-6 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
            {rows.map((row, index) => (
              <tr 
                key={row.type} 
                className={`hover:bg-brand-lightBlue/40 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <td className="py-4 px-6 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-brand-royalBlue/10 text-brand-royalBlue flex items-center justify-center font-bold text-xs">
                    {row.type}
                  </div>
                  <span className="font-extrabold text-brand-navy">{row.type}</span>
                </td>
                <td className="py-4 px-6 text-emerald-600 font-extrabold text-base">
                  {row.empty}
                </td>
                <td className="py-4 px-6 text-emerald-600 font-extrabold text-base">
                  {row.occupied}
                </td>
                <td className="py-4 px-6 text-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-1 text-xs bg-brand-navy text-white px-3 py-1.5 rounded-full hover:bg-brand-green transition"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info Note */}
      {extraNote && (
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 text-xs text-slate-600 flex items-start space-x-2">
          <Info className="w-4 h-4 text-brand-royalBlue shrink-0 mt-0.5" />
          <span>{extraNote}</span>
        </div>
      )}

    </div>
  );
};

export default PricingTable;
