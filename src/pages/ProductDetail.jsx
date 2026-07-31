import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import { Star, ShoppingBag, Heart, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);
    
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setRelatedProducts(getRelatedProducts(id));
      
      // Select defaults
      if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
        setSelectedSize(fetchedProduct.sizes[0]);
      }
      if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
        setSelectedColor(fetchedProduct.colors[0]);
      }
      setActiveImage(0);
      setQuantity(1);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
          <p className="text-slate-500 mb-6">The product you are looking for does not exist.</p>
          <Link to="/" className="bg-brand-navy text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-royalBlue transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-slate-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-500 space-x-2">
            <Link to="/" className="hover:text-brand-royalBlue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/collections/women" className="hover:text-brand-royalBlue transition-colors">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-32 h-fit">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 pb-2 md:pb-0 scrollbar-hide">
              {product.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 md:w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-brand-royalBlue shadow-md' : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} - view ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-grow bg-white rounded-2xl overflow-hidden shadow-sm aspect-[3/4] md:aspect-auto md:h-[600px] border border-slate-100">
              <img 
                src={product.gallery[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-brand-royalBlue text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading mb-4">
              {product.name}
            </h1>
            
            {/* Reviews */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-slate-200">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} 
                  />
                ))}
              </div>
              <span className="text-sm text-brand-royalBlue font-semibold">{product.rating} Rating</span>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-600">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-extrabold text-brand-navy">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
              )}
              <span className="text-xs text-brand-green font-bold bg-brand-green/10 px-2 py-1 rounded mb-1.5 ml-2 uppercase tracking-wide">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Color: <span className="text-brand-royalBlue font-medium ml-1 capitalize">{selectedColor}</span></h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedColor === color 
                          ? 'border-brand-royalBlue bg-brand-royalBlue/5 text-brand-royalBlue shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Size</h3>
                  <button className="text-xs text-brand-royalBlue underline font-medium hover:text-brand-navy transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3.5rem] px-3 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedSize === size 
                          ? 'border-brand-royalBlue bg-brand-royalBlue/5 text-brand-royalBlue shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-6 border-t border-slate-200">
              {/* Quantity */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl h-14 w-full sm:w-32 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex items-center justify-center text-slate-500 hover:text-brand-royalBlue transition-colors h-full"
                >
                  <Minus size={18} />
                </button>
                <span className="flex-1 text-center font-bold text-slate-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex items-center justify-center text-slate-500 hover:text-brand-royalBlue transition-colors h-full"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart */}
              <button className="flex-grow flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-royalBlue text-white h-14 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-brand-royalBlue/20 transition-all transform hover:-translate-y-0.5">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              
              {/* Wishlist */}
              <button className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 bg-white hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm">
                <Heart size={22} />
              </button>
            </div>
            
            {/* Buy Now (Full width) */}
            <button className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-emerald-600 text-white h-14 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-brand-green/20 transition-all transform hover:-translate-y-0.5 mb-8">
              Buy It Now
            </button>

            {/* Features list */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-brand-green p-1.5 rounded-full shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">100% Authentic Quality</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Premium fabrics directly from master weavers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-brand-green p-1.5 rounded-full shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">7 Days Easy Return</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Hassle-free return if you are not satisfied.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-brand-green p-1.5 rounded-full shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Free Secure Shipping</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We safely deliver right to your doorstep.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews & Details Tabs (Simplified) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 mt-8">
        <h2 className="text-2xl font-bold text-brand-navy font-heading mb-6">Product Details & Reviews</h2>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
          <p className="text-slate-600 leading-relaxed mb-8">
            Experience the exquisite craftsmanship with our {product.name}. Designed to provide supreme comfort while making a bold fashion statement. Made with premium materials, this piece undergoes strict quality control checks before reaching you. We ensure that the colors are long-lasting and the fabric feels luxurious against the skin.
          </p>
          
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Recent Customer Reviews</h3>
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-50">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-400">
                  <Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="fill-current" />
                </div>
                <span className="font-bold text-sm text-slate-800">Priya Sharma</span>
                <span className="text-xs text-slate-400">• Verified Buyer</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">"Absolutely gorgeous! The fabric is so soft and the colors look exactly like they do in the pictures. Highly recommended!"</p>
            </div>
            <div className="pb-4 border-b border-slate-50">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-400">
                  <Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="fill-current" /><Star size={14} className="text-slate-200 fill-current" />
                </div>
                <span className="font-bold text-sm text-slate-800">Anita Reddy</span>
                <span className="text-xs text-slate-400">• Verified Buyer</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">"Good quality product. Delivery was on time. The fit is perfect based on the size guide."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-heading">
              You May Also Like
            </h2>
            <Link to="/collections/women" className="text-sm font-bold text-brand-royalBlue hover:text-brand-navy underline transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
