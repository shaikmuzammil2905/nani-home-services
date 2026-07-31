import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

const WomensCollection = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-heading mb-4">
          Women's Collection
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Discover our premium range of beautifully crafted sarees and readymade designer blouses. Perfect for every occasion.
        </p>
      </div>

      {/* Sarees Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-heading">
            Exclusive Sarees
          </h2>
          <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {productsData.sarees.length} Products
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsData.sarees.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Blouses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-heading">
            Readymade Blouses
          </h2>
          <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            {productsData.blouses.length} Products
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsData.blouses.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WomensCollection;
