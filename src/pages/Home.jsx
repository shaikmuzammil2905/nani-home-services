import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getAllFeaturedProducts } from '../data/products';

const Home = () => {
  const featuredProducts = getAllFeaturedProducts();

  return (
    <div className="space-y-16 pb-12">
      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-slate-50 pt-10 pb-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-brand-royalBlue/10 text-brand-royalBlue px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <ShoppingBag className="w-4 h-4" />
                <span>NEW ARRIVALS 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy leading-tight font-heading">
                DISCOVER <br />
                <span className="text-brand-royalBlue">TRUE ELEGANCE</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Explore our exclusive premium collection of authentic Sarees, Readymade Blouses, and Fashion for everyone. Crafted for perfection, designed for you.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/collections/women"
                  className="bg-brand-navy hover:bg-brand-royalBlue text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm uppercase tracking-wider"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/collections/kids"
                  className="bg-white text-brand-navy border-2 border-slate-200 hover:border-brand-navy font-extrabold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-sm uppercase tracking-wider"
                >
                  KIDS COLLECTION
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-royalBlue/20 to-pink-200/40 rounded-[2rem] blur-2xl"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                  <img
                    src="/products/image copy 134.png"
                    alt="Featured Premium Fashion"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-1 shadow-sm">Bridal Banarasi Silk</h3>
                    <p className="text-sm font-medium opacity-90">Experience the Royal Heritage</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-brand-navy font-heading">
            Trending Now
          </h2>
          <div className="h-1 w-20 bg-brand-royalBlue mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-500">Handpicked premium selections for this season</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CATEGORIES / FEATURES SECTION */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-royalBlue rounded-full flex items-center justify-center mb-4">
                <Truck size={32} />
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">Fast Delivery</h3>
              <p className="text-slate-500 text-sm">Secure and fast delivery across the country with real-time tracking.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-royalBlue rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">Premium Quality</h3>
              <p className="text-slate-500 text-sm">100% authentic products crafted with the highest quality materials.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-brand-royalBlue rounded-full flex items-center justify-center mb-4">
                <RotateCcw size={32} />
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">Easy Returns</h3>
              <p className="text-slate-500 text-sm">Hassle-free 7-day return and exchange policy for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
