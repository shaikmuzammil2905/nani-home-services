import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, Phone, Calendar, ArrowRight, Home as HomeIcon, 
  Utensils, Bath, Droplets, Armchair, Tv, Sparkles, Star, Users, Award, Clock, Layers, Maximize
} from 'lucide-react';
import { businessDetails, servicesData, initialPortfolio, statsCounterData, testimonials } from '../data/websiteData';
import PricingTable from '../components/PricingTable';
import AnimatedCounter from '../components/AnimatedCounter';
import InquiryForm from '../components/InquiryForm';

const Home = () => {
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

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO BANNER SECTION (Matches image copy 2.png & updated requests) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-lightBlue/50 via-white to-slate-50 pt-10 pb-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-brand-green px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-emerald-200">
                <Sparkles className="w-4 h-4 text-brand-green animate-spin" />
                <span>PROFESSIONAL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-tight font-heading">
                PROFESSIONAL <br />
                <span className="text-brand-green">HOME CLEANING</span> <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-brand-navy block mt-1 uppercase tracking-wide">
                  Experience Our Professional Touch
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                We make your home sparkle clean with our professional touch, eco-friendly cleaning solutions, and advanced machine technology.
              </p>

              {/* Animated HD Feature Cards (image copy 8.png & 9.png fit in marked spot) */}
              <div className="pt-2 grid grid-cols-2 gap-3 sm:gap-4 max-w-lg">
                <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl border-2 border-brand-green/40 bg-white hover:border-brand-green transition-all duration-500 transform hover:-translate-y-1">
                  <div className="relative h-28 sm:h-36 overflow-hidden">
                    <img 
                      src="/assets/hero_floor_scrubbing.png" 
                      alt="Industrial Machine Floor Scrubbing" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <span className="absolute top-2 left-2 bg-brand-green text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                      Zet Wash Tech
                    </span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-brand-navy text-white text-left">
                    <p className="text-[11px] sm:text-xs font-extrabold leading-tight text-emerald-300">
                      Machine Floor Scrubbing
                    </p>
                  </div>
                </div>

                <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl border-2 border-brand-royalBlue/40 bg-white hover:border-brand-royalBlue transition-all duration-500 transform hover:-translate-y-1">
                  <div className="relative h-28 sm:h-36 overflow-hidden">
                    <img 
                      src="/assets/hero_bathroom_sanitization.png" 
                      alt="Deep Bathroom Sanitization" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <span className="absolute top-2 left-2 bg-brand-royalBlue text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                      Sanitized
                    </span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-brand-navy text-white text-left">
                    <p className="text-[11px] sm:text-xs font-extrabold leading-tight text-blue-300">
                      Deep Sanitization Specialist
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="bg-brand-navy hover:bg-brand-royalBlue text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK NOW</span>
                </Link>

                <a
                  href={`https://wa.me/${businessDetails.whatsappClean}?text=${encodeURIComponent('Hello NANI CLEANING SERVICES. I want a free quote for cleaning services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-glow-green transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL & WHATSAPP</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image & Badge (Matches image copy 2.png) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              <div className="relative w-full max-w-lg">
                
                {/* Glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-royalBlue/20 to-brand-green/20 rounded-3xl blur-2xl"></div>

                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/assets/floor_industrial.png"
                    alt="NANI CLEANING SERVICES Professional Cleaning"
                    className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent"></div>
                </div>

                {/* Floating 100% Satisfaction Badge (Matching UI design) */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-6 bg-brand-navy text-white px-6 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-3 animate-float">
                  <div className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center font-extrabold text-lg shadow-inner">
                    100%
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-brand-green uppercase tracking-wider">SATISFACTION</h4>
                    <p className="text-[11px] text-slate-300 font-semibold">GUARANTEED SERVICE</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION (Matches image copy 2.png & copy 10.png) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-block mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading uppercase tracking-wide">
            OUR SERVICES
          </h2>
          <div className="text-brand-green text-lg font-bold diamond-divider my-1">✦</div>
        </div>

        {/* Services Grid Cards (All Services shown) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
          {servicesData.map((service, index) => {
            const IconComp = serviceIcons[service.slug] || HomeIcon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-card-hover border border-slate-100 hover:border-brand-green/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center justify-between"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-lightBlue group-hover:bg-brand-green text-brand-royalBlue group-hover:text-white flex items-center justify-center transition-all duration-300 mb-3 shadow-sm">
                  <IconComp className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-brand-navy group-hover:text-brand-green transition-colors leading-snug">
                  {index + 1}. {service.shortTitle}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>



      {/* WHY CHOOSE NANI CLEANING SERVICE? (Matches dark navy card in image copy 2.png) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#041E42] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-heading tracking-wide">
              WHY CHOOSE <span className="text-brand-green">NANI CLEANING SERVICE?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand-green flex items-center justify-center shrink-0 border border-white/15">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Trained & Verified Professionals</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Background verified and well-trained staff.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand-green flex items-center justify-center shrink-0 border border-white/15">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">Eco-Friendly Products</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Safe for your family and pets.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand-green flex items-center justify-center shrink-0 border border-white/15">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">On-Time Service</h4>
                <p className="text-xs text-slate-300 leading-relaxed">We value your time and punctuality.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand-green flex items-center justify-center shrink-0 border border-white/15">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">100% Satisfaction Guarantee</h4>
                <p className="text-xs text-slate-300 leading-relaxed">We ensure quality in every corner.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATS COUNTER SECTION (Typing mode / Animated counters) */}
      <section className="bg-brand-navy py-12 border-y border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statsCounterData.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-extrabold text-brand-green font-heading">
                  <AnimatedCounter target={stat.count} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PORTFOLIO SHOWCASE (Matches image copy 2.png) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-block mb-8">
          <h2 className="text-3xl font-extrabold text-brand-navy font-heading uppercase tracking-wide">
            OUR PORTFOLIO
          </h2>
          <div className="text-brand-green text-lg font-bold diamond-divider my-1">✦</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {initialPortfolio.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="inline-block bg-brand-green text-white font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-extrabold px-6 py-2.5 rounded-full text-sm transition-all"
          >
            <span>VIEW MORE WORK</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* CALLOUT BANNER (Matches green bar in image copy 2.png) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-green to-emerald-600 rounded-3xl p-6 sm:p-10 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-4 text-left">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
              <Phone className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading">
                Book your cleaning service today!
              </h3>
              <p className="text-sm text-emerald-100 mt-1 font-medium">
                Call or WhatsApp us for a free quote: {businessDetails.whatsapp}
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${businessDetails.whatsappClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-navy hover:bg-[#020D26] text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all whitespace-nowrap text-sm uppercase tracking-wider"
          >
            CALL & WHATSAPP
          </a>

        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-block mb-8">
          <h2 className="text-3xl font-extrabold text-brand-navy font-heading uppercase tracking-wide">
            CUSTOMER REVIEWS
          </h2>
          <div className="text-brand-green text-lg font-bold diamond-divider my-1">✦</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-4 hover:shadow-lg transition">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-sm italic">"{rev.comment}"</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <h4 className="font-bold text-slate-900 not-italic">{rev.name}</h4>
                  <span>{rev.location}</span>
                </div>
                <span className="text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* INQUIRY FORM SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <InquiryForm />
      </section>

    </div>
  );
};

export default Home;
