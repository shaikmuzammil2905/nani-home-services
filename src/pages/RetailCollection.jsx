import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

const RetailCollection = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy font-heading mb-4">
          Retail Collection
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Exclusive premium bulk and retail fashion products tailored for your business needs.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsData.retail.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RetailCollection;
