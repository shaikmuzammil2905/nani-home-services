import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, Target, Eye, Users, Star, Calendar } from 'lucide-react';
import { businessDetails } from '../data/websiteData';
import AnimatedCounter from '../components/AnimatedCounter';

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const About = ({ onOpenBooking }) => {
  return (
    <div className="space-y-16 py-8 overflow-x-hidden">
      
      {/* Page Header */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-brand-navy text-white py-16 px-4 text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            ABOUT NANI CLEANING SERVICES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Delivering Excellence & Hygienic Cleanliness
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Serving Vijayawada with professional deep cleaning expertise, eco-friendly chemical solutions, and trained specialists.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking && onOpenBooking('')}
              className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-glow-green transition-all inline-flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service (Quick Pop-up)</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Company Overview & History */}
      <motion.section {...fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-extrabold text-brand-navy font-heading">
              Our Journey & Commitment
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              NANI CLEANING SERVICES was founded with a singular mission: to elevate cleaning standards for homes and commercial establishments across Vijayawada and nearby regions. What started as a small team of passionate cleaning professionals has grown into a premier cleaning company trusted by over 5,000+ happy families and business owners.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              We utilize industrial floor scrubbing machines, high-pressure Zet wash equipment for water tanks, and hospital-grade non-toxic disinfectants to ensure every home shines with hygiene and safety.
            </p>
            
            {/* Animated Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-brand-green transition">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-green font-heading block">
                  <AnimatedCounter target={5} suffix="+" duration={2000} />
                </span>
                <span className="text-[11px] font-extrabold uppercase text-slate-600">Years Exp.</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-brand-royalBlue transition">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-royalBlue font-heading block">
                  <AnimatedCounter target={5000} suffix="+" duration={2200} />
                </span>
                <span className="text-[11px] font-extrabold uppercase text-slate-600">Deep Cleans</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-amber-500 transition">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-heading block">
                  <AnimatedCounter target={4.9} decimals={1} suffix="★" duration={2000} />
                </span>
                <span className="text-[11px] font-extrabold uppercase text-slate-600">User Rating</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-emerald-600 transition">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading block">
                  <AnimatedCounter target={100} suffix="%" duration={2000} />
                </span>
                <span className="text-[11px] font-extrabold uppercase text-slate-600">Satisfaction</span>
              </div>
            </div>

          </div>

          <div className="relative">
            <img 
              src="/assets/floor_industrial.png" 
              alt="Nani Cleaning Services Professional Team" 
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-navy text-white p-6 rounded-2xl shadow-xl border border-white/20 hidden sm:block">
              <h4 className="font-extrabold text-xl font-heading text-brand-green">100% Satisfaction</h4>
              <p className="text-xs text-slate-300">Guaranteed quality service every time</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Vision & Mission Cards */}
      <motion.section {...fadeInUp} className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-lightBlue text-brand-royalBlue flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy font-heading">Company Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{businessDetails.vision}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-brand-green flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy font-heading">Company Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{businessDetails.mission}</p>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section {...fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-brand-navy font-heading uppercase tracking-wide mb-10">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {businessDetails.coreValues.map((val, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition space-y-2"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <h4 className="font-extrabold text-brand-navy text-lg">{val.title}</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default About;

