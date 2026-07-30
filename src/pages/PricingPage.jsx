import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, Utensils, Bath, Droplets, Armchair, Tv, Layers, Maximize, 
  CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck, Sparkles, Tag
} from 'lucide-react';
import { servicesData, businessDetails } from '../data/websiteData';
import PricingTable from '../components/PricingTable';

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    'All',
    'Home Cleaning',
    'Kitchen Cleaning',
    'Bathroom Cleaning',
    'Water Tank Cleaning',
    'Sofa & Carpet Cleaning',
    'Appliance Cleaning',
    'Floor Deep Cleaning',
    'Window Cleaning'
  ];

  const serviceIcons = {
    'home-cleaning': HomeIcon,
    'kitchen-cleaning': Utensils,
    'bathroom-cleaning': Bath,
    'water-tank-cleaning': Droplets,
    'sofa-carpet-cleaning': Armchair,
    'appliance-cleaning': Tv,
    'floor-deep-cleaning': Layers,
    'window-cleaning': Maximize
  };

  const filteredServices = activeTab === 'All'
    ? servicesData
    : servicesData.filter(s => s.shortTitle.toLowerCase().includes(activeTab.toLowerCase().replace(' cleaning', '')) || activeTab.toLowerCase().includes(s.shortTitle.toLowerCase()));

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-flex items-center space-x-2 text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            <Tag className="w-3.5 h-3.5" />
            <span>TRANSPARENT & AFFORDABLE RATES</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Cleaning Service Pricing Packages
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Upfront, transparent pricing with no hidden charges for all residential and commercial cleaning services in Vijayawada.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-brand-green text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing Cards List */}
        <div className="space-y-10">
          {filteredServices.map((svc) => {
            const IconComp = serviceIcons[svc.slug] || HomeIcon;
            return (
              <div key={svc.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:border-brand-green/30 transition duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-lightBlue text-brand-royalBlue flex items-center justify-center shrink-0">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-brand-green text-xs font-extrabold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                        {svc.badge}
                      </span>
                      <h2 className="text-2xl font-extrabold text-brand-navy font-heading mt-1">
                        {svc.title}
                      </h2>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent(`Hello NANI CLEANING SERVICES. I want to book ${svc.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow hover:shadow-lg transition self-start md:self-auto"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>

                {/* Table Layout for Home Cleaning */}
                {svc.pricingTable && (
                  <PricingTable 
                    title={svc.title} 
                    rows={svc.pricingTable.rows} 
                    extraNote={svc.pricingTable.extra} 
                  />
                )}

                {/* Cards Grid for Kitchen, Bathroom, Tank, Window, Floor */}
                {svc.pricingCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {svc.pricingCards.map((card, idx) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:bg-white hover:shadow-md transition">
                        <div>
                          <h4 className="font-extrabold text-brand-navy text-base">{card.name}</h4>
                          {card.highlight && (
                            <p className="text-xs text-slate-500 mt-1">{card.highlight}</p>
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xl font-extrabold text-brand-green">{card.price}</span>
                          <Link to="/contact" className="text-xs font-bold text-brand-navy hover:text-brand-green flex items-center space-x-1">
                            <span>Book Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items Group for Sofa, Carpet & Mattress */}
                {svc.pricingItems && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {svc.pricingItems.map((group, idx) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                        <h4 className="font-extrabold text-brand-navy text-base border-b border-slate-200 pb-2">
                          {group.category}
                        </h4>
                        <div className="space-y-3">
                          {group.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center justify-between text-xs sm:text-sm">
                              <div>
                                <span className="font-bold text-slate-800">{opt.type}</span>
                                {opt.detail && <p className="text-[11px] text-slate-500">{opt.detail}</p>}
                              </div>
                              <span className="font-extrabold text-brand-green">{opt.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grid for Appliance Cleaning */}
                {svc.pricingGrid && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {svc.pricingGrid.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">{item.name}</span>
                        <span className="font-extrabold text-sm text-brand-green ml-2">{item.price}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action footer banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Need a Customized Quote for Large Commercial or Custom Property?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Contact us directly on WhatsApp or Call for a free site inspection and instant transparent quote.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href={`https://wa.me/${businessDetails.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-8 py-3 rounded-full text-xs uppercase tracking-wider shadow"
            >
              Get Free WhatsApp Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
