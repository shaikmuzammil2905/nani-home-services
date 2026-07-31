import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { getStoredGallery } from '../utils/storage';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    setGalleryItems(getStoredGallery());
  }, []);

  const categories = [
    'All', 
    'House Cleaning', 
    'Kitchen', 
    'Bathroom', 
    'Sofa & Carpet', 
    'Floor Cleaning', 
    'Water Tank', 
    'Window Cleaning', 
    'Commercial'
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => {
        const itemCat = item.category?.toLowerCase().trim() || '';
        const selCat = selectedCategory.toLowerCase().trim();
        if (selCat === 'house cleaning' && (itemCat.includes('house') || itemCat.includes('residential'))) return true;
        if (selCat === 'sofa & carpet' && (itemCat.includes('sofa') || itemCat.includes('carpet'))) return true;
        return itemCat.includes(selCat) || selCat.includes(itemCat);
      });

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

      {/* Category Filter Tabs (Matching UI design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm ${
                selectedCategory === cat
                  ? 'bg-brand-green text-white shadow-lg shadow-glow-green scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-brand-green/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setModalImage(item)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 cursor-pointer transform hover:-translate-y-1.5 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/floor_industrial.png";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-navy/90 text-brand-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur shadow">
                  {item.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                  <div className="text-white text-xs font-semibold flex items-center space-x-1.5">
                    <Maximize2 className="w-4 h-4 text-brand-green" />
                    <span>Click to expand HD view</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1 bg-white">
                <h4 className="text-brand-navy font-bold text-base font-heading group-hover:text-brand-green transition-colors">
                  {item.title}
                </h4>
                {item.desc && (
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                )}
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
