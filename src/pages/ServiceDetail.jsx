import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Info 
} from 'lucide-react';
import { servicesData, businessDetails } from '../data/websiteData';
import PricingTable from '../components/PricingTable';
import InquiryForm from '../components/InquiryForm';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="space-y-12 py-8">
      
      {/* Professional Banner Header */}
      <section className="relative bg-brand-navy text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-block bg-brand-green text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
            {service.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            {service.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`tel:${businessDetails.phone}`}
              className="bg-brand-royalBlue hover:bg-blue-600 text-white font-extrabold px-6 py-2.5 rounded-full text-sm flex items-center space-x-2 shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {businessDetails.phoneFormatted}</span>
            </a>
            <a
              href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent(`Hello NANI CLEANING SERVICES. I need info on ${service.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-full text-sm flex items-center space-x-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Details & Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-8">
            {/* HD Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src={service.heroImage} 
                alt={service.title} 
                className="w-full h-[350px] sm:h-[400px] object-cover"
              />
            </div>

            {/* Description & Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
                Service Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {service.description} Our professional staff comes equipped with high-performance scrubbing machines, anti-bacterial cleaning solutions, and protective gear to make your space pristine.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-navy font-heading">
                What's Included in {service.shortTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start space-x-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-navy font-heading">
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((ben, idx) => (
                  <div key={idx} className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 flex items-start space-x-3 text-sm">
                    <Sparkles className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{ben}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Pricing Cards & Quick Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* PRICING SECTION */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
              <h3 className="text-2xl font-extrabold text-brand-navy font-heading border-b border-slate-100 pb-3">
                Pricing Rates
              </h3>

              {/* Home Cleaning Table */}
              {service.pricingTable && (
                <PricingTable 
                  title={service.title} 
                  rows={service.pricingTable.rows} 
                  extraNote={service.pricingTable.extra}
                />
              )}

              {/* Pricing Cards List */}
              {service.pricingCards && (
                <div className="space-y-3">
                  {service.pricingCards.map((card, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-brand-navy text-sm">{card.name}</h4>
                        {card.highlight && <span className="text-[11px] text-slate-500">{card.highlight}</span>}
                      </div>
                      <span className="text-lg font-extrabold text-brand-green">{card.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Items Group */}
              {service.pricingItems && (
                <div className="space-y-4">
                  {service.pricingItems.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">{group.category}</h4>
                      {group.options.map((opt, oIdx) => (
                        <div key={oIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
                          <div>
                            <span className="font-semibold text-slate-800">{opt.type}</span>
                            {opt.detail && <span className="block text-[11px] text-slate-500">{opt.detail}</span>}
                          </div>
                          <span className="font-bold text-brand-green">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Appliance Pricing Grid */}
              {service.pricingGrid && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                  {service.pricingGrid.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.name}</span>
                      <span className="font-extrabold text-brand-green">{item.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes Disclaimer */}
              {service.notes && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Important Notes:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {service.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Direct Inquiry Form */}
            <InquiryForm defaultService={service.title} />

          </div>

        </div>
      </section>

      {/* Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-12">
        <h3 className="text-2xl font-extrabold text-brand-navy font-heading mb-6">
          Explore Related Cleaning Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((rel) => (
            <Link key={rel.id} to={`/services/${rel.slug}`} className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition group flex items-center space-x-4">
              <img src={rel.heroImage} alt={rel.title} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-brand-navy group-hover:text-brand-green transition-colors text-sm">{rel.shortTitle}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{rel.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
