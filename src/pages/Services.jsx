import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home as HomeIcon, Utensils, Bath, Droplets, Armchair, Tv, Maximize, Layers, ArrowRight, Check, Calendar 
} from 'lucide-react';
import { getStoredServices } from '../utils/storage';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Services = ({ onOpenBooking }) => {
  const [services, setServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setServices(getStoredServices());
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get('search')?.toLowerCase();

  const displayedServices = searchFilter 
    ? services.filter(s => s.title.toLowerCase().includes(searchFilter) || s.description.toLowerCase().includes(searchFilter))
    : services;

  const iconMap = {
    'home-cleaning': HomeIcon,
    'kitchen-cleaning': Utensils,
    'bathroom-cleaning': Bath,
    'water-tank-cleaning': Droplets,
    'sofa-carpet-cleaning': Armchair,
    'appliance-cleaning': Tv,
    'floor-deep-cleaning': Layers,
    'window-cleaning': Maximize
  };

  return (
    <div className="space-y-12 py-8 overflow-x-hidden">
      {/* Banner */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-brand-navy text-white py-16 px-4 text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            OUR SPECIALIZED CLEANING SERVICES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Professional Cleaning Services in Vijayawada
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Choose from our wide array of home, kitchen, bathroom, tank, sofa, appliance, and window cleaning solutions.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking && onOpenBooking('')}
              className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-glow-green transition-all inline-flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Instant Booking Pop-up</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Animated Counter Stats Bar */}
      <motion.section {...fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-navy via-[#031B4E] to-brand-royalBlue text-white p-6 rounded-3xl shadow-xl border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-green font-heading">
              <AnimatedCounter target={8} suffix="+" duration={1800} />
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Specialized Services</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-heading">
              <AnimatedCounter target={100} suffix="%" duration={1800} />
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Eco-Friendly Safe</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
              <AnimatedCounter target={4.9} decimals={1} suffix="★" duration={1800} />
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Average Review</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
              <AnimatedCounter target={5000} suffix="+" duration={2200} />
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Satisfied Homes</div>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section {...fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((svc, idx) => {
            const IconComponent = iconMap[svc.slug] || HomeIcon;
            return (
              <motion.div 
                key={svc.id} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition duration-300 group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={svc.heroImage} 
                      alt={svc.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {svc.badge || 'Active'}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-lightBlue text-brand-royalBlue flex items-center justify-center shrink-0">
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
                      {svc.features?.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                          <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onOpenBooking && onOpenBooking(svc.title)}
                    className="w-full bg-brand-navy hover:bg-brand-royalBlue text-white font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider shadow"
                  >
                    <Calendar className="w-4 h-4 text-brand-green" />
                    <span>Quick Booking Pop-up</span>
                  </button>

                  <Link
                    to={`/services/${svc.slug}`}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-brand-navy font-bold py-2.5 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
                  >
                    <span>View Pricing & Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default Services;

