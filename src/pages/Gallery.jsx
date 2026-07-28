import React, { useState } from 'react';
import { initialPortfolio } from '../data/websiteData';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { getStoredGallery } from '../utils/storage';

const Gallery = () => {
  const [galleryItems] = useState(getStoredGallery());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bathroom', 'Sofa', 'Water Tank', 'Floor Cleaning', 'Window Cleaning'];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            CLEANING PORTFOLIO & WORK SHOWCASE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Before & After Transformations
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Take a look at our recent cleaning projects across Vijayawada. Real results from real customer homes.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-green text-white shadow-lg shadow-glow-green'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setModalImage(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-wider">{item.category}</span>
                <h4 className="text-white font-bold text-sm">{item.title}</h4>
                <div className="mt-2 inline-flex items-center space-x-1 text-xs text-slate-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur transition"
            >
              <X className="w-6 h-6" />
            </button>

            <img src={modalImage.image} alt={modalImage.title} className="w-full max-h-[75vh] object-contain" />
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-brand-green font-bold text-xs uppercase">{modalImage.category}</span>
                <h3 className="text-xl font-bold font-heading">{modalImage.title}</h3>
              </div>
              <a
                href={`https://wa.me/918500520847?text=${encodeURIComponent(`Hello NANI CLEANING SERVICES. I saw your portfolio item "${modalImage.title}" and want similar cleaning.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-white font-bold px-5 py-2 rounded-full text-xs hover:bg-emerald-600 transition"
              >
                Book Similar Service
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
