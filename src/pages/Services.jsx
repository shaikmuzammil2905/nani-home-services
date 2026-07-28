import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, Utensils, Bath, Droplets, Armchair, Tv, Maximize, ArrowRight, Check 
} from 'lucide-react';
import { servicesData } from '../data/websiteData';

const Services = () => {
  const iconMap = {
    'home-cleaning': HomeIcon,
    'kitchen-cleaning': Utensils,
    'bathroom-cleaning': Bath,
    'water-tank-cleaning': Droplets,
    'sofa-carpet-cleaning': Armchair,
    'appliance-cleaning': Tv,
    'window-cleaning': Maximize
  };

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            OUR SPECIALIZED CLEANING SERVICES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Professional Cleaning Services in Vijayawada
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Choose from our wide array of home, kitchen, bathroom, tank, sofa, appliance, and window cleaning solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => {
            const IconComponent = iconMap[svc.slug] || HomeIcon;
            return (
              <div key={svc.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition duration-300 group">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={svc.heroImage} 
                      alt={svc.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {svc.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-lightBlue text-brand-royalBlue flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-extrabold text-brand-navy font-heading">
                        {svc.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {svc.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                          <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="w-full bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white font-bold py-3 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>View Pricing & Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;
