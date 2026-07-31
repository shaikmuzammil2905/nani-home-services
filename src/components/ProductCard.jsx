import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-brand-royalBlue text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </div>
        )}
        
        {/* Hover Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-brand-royalBlue hover:text-white transition-colors text-slate-600" title="Add to Wishlist">
            <Heart size={18} />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-brand-royalBlue hover:text-white transition-colors text-slate-600" title="Quick View">
            <Eye size={18} />
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick Add To Cart Button on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white/90 backdrop-blur-sm text-brand-navy font-semibold py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-brand-royalBlue hover:text-white transition-colors border border-slate-200">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-800 text-sm md:text-base mb-2 line-clamp-2 hover:text-brand-royalBlue cursor-pointer transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-brand-navy">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <button className="bg-brand-navy text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-royalBlue transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
