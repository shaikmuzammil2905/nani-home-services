import React, { useState, useEffect } from 'react';
import { 
  Lock, User, LogOut, Download, Trash2, CheckCircle, Clock, Search, Plus, Edit, Save, X,
  FileText, Image as ImageIcon, DollarSign, Settings, Users, MessageSquare, Shield, Upload, RefreshCw, Star
} from 'lucide-react';
import { 
  getInquiries, deleteInquiry, updateInquiryStatus, exportInquiriesToCSV, 
  getStoredServices, saveServices, getStoredGallery, saveGallery,
  getStoredReviews, saveReviews 
} from '../utils/storage';
import { uploadToCloudinary } from '../utils/cloudinary';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('services');
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Edit Service Modal State
  const [editingService, setEditingService] = useState(null);

  // New Gallery item state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Residential');
  const [newGalleryImage, setNewGalleryImage] = useState('');

  // New Review state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('Vijayawada');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewService, setNewReviewService] = useState('Home Cleaning');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('nani_admin_logged');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadAllData = () => {
    setInquiries(getInquiries());
    setServices(getStoredServices());
    setGallery(getStoredGallery());
    setReviews(getStoredReviews());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && (password === 'nani123' || password === 'admin123' || password === 'admin')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('nani_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password! (Default: admin / nani123 or admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nani_admin_logged');
  };

  // --- SERVICE & PRICING EDITING ---
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    const updatedServices = services.map(s => s.id === editingService.id ? editingService : s);
    setServices(updatedServices);
    await saveServices(updatedServices);
    setEditingService(null);
    alert('Service & Price changes saved and synced successfully!');
  };

  const handleServiceImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setEditingService(prev => ({ ...prev, heroImage: url }));
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // --- GALLERY / PORTFOLIO ---
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setNewGalleryImage(url);
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImage) {
      alert('Please provide title and image');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: newGalleryTitle,
      category: newGalleryCategory,
      image: newGalleryImage
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    await saveGallery(updated);
    setNewGalleryTitle('');
    setNewGalleryImage('');
    alert('Portfolio image added!');
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm('Delete this item from portfolio?')) {
      const updated = gallery.filter(item => item.id !== id);
      setGallery(updated);
      await saveGallery(updated);
    }
  };

  // --- REVIEWS / TESTIMONIALS ---
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) {
      alert('Please fill out customer name and review text');
      return;
    }

    const newRev = {
      id: Date.now(),
      name: newReviewName,
      location: newReviewLocation,
      rating: Number(newReviewRating),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      service: newReviewService,
      comment: newReviewComment,
      verified: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newReviewName)}`
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    await saveReviews(updated);
    setNewReviewName('');
    setNewReviewComment('');
    alert('Review added successfully!');
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Delete this review?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      await saveReviews(updated);
    }
  };

  const handleSaveReviewEdit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;
    const updated = reviews.map(r => r.id === editingReview.id ? editingReview : r);
    setReviews(updated);
    await saveReviews(updated);
    setEditingReview(null);
    alert('Review updated successfully!');
  };

  // --- INQUIRIES ---
  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry?')) {
      const updated = await deleteInquiry(id);
      setInquiries(updated);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-100 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-brand-navy text-brand-green rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
              Admin Portal Login
            </h2>
            <p className="text-xs text-slate-500">
              NANI CLEANING SERVICES Management Dashboard
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold text-center border border-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm focus:border-brand-royalBlue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm focus:border-brand-royalBlue"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-royalBlue text-white font-extrabold py-3 rounded-xl shadow-lg transition text-sm uppercase tracking-wider"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">Default Access: admin / admin123</span>
          </div>

        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-xl">
            <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold font-heading">NANI Admin Control Dashboard</h1>
            <p className="text-xs text-emerald-400 font-semibold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Supabase & Cloudinary Backend Connected</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              loadAllData();
              alert('Synced with database!');
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center space-x-1.5 transition border border-white/15"
            title="Refresh Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync DB</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-2 transition border border-white/15"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Total Inquiries</span>
            <h3 className="text-2xl font-extrabold text-brand-navy">{inquiries.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-brand-green flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Active Services</span>
            <h3 className="text-2xl font-extrabold text-brand-navy">{services.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Portfolio Items</span>
            <h3 className="text-2xl font-extrabold text-brand-navy">{gallery.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border border-slate-200 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Customer Reviews</span>
            <h3 className="text-2xl font-extrabold text-brand-navy">{reviews.length}</h3>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'services', label: 'Services & Pricing Edit', icon: DollarSign },
          { id: 'pricing', label: 'Pricing Packages', icon: FileText },
          { id: 'gallery', label: 'Portfolio Uploads', icon: ImageIcon },
          { id: 'reviews', label: 'Customer Reviews', icon: Star },
          { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SERVICES & INDIVIDUAL SERVICE PRICE EDITING */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
                Services & Pricing Edit Options
              </h2>
              <p className="text-xs text-slate-500">
                Click any service card to directly edit its pricing details, title, features, and images.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc) => (
              <div 
                key={svc.id} 
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-brand-green hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                onClick={() => setEditingService(JSON.parse(JSON.stringify(svc)))}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-brand-green px-2.5 py-0.5 rounded-full">
                      {svc.badge || 'Active'}
                    </span>
                    <Edit className="w-4 h-4 text-brand-royalBlue" />
                  </div>
                  <h4 className="font-extrabold text-brand-navy text-base leading-snug">{svc.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{svc.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Click to Edit Rates</span>
                  <span className="text-xs font-extrabold text-brand-green bg-emerald-50 px-2 py-1 rounded">Edit →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRICING PACKAGES VIEW & EDIT */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
              Cleaning Service Pricing Packages
            </h2>
            <p className="text-xs text-slate-500">
              Manage transparent rates for 1BHK, 2BHK, 3BHK, 4BHK, Kitchen, Bathroom, Tank, Sofa, Appliance, Floor, and Window cleaning.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((svc) => (
              <div key={svc.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-brand-navy">{svc.title}</h3>
                  <button
                    onClick={() => setEditingService(JSON.parse(JSON.stringify(svc)))}
                    className="bg-brand-navy hover:bg-brand-royalBlue text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Prices</span>
                  </button>
                </div>

                {/* Table rates */}
                {svc.pricingTable && (
                  <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 p-3">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b text-[11px] font-bold text-slate-500 uppercase">
                          <th className="py-2 px-3">Type</th>
                          <th className="py-2 px-3">Empty Flat Rate</th>
                          <th className="py-2 px-3">Occupied Flat Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {svc.pricingTable.rows?.map((r, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="py-2 px-3 font-bold text-brand-navy">{r.type}</td>
                            <td className="py-2 px-3 font-bold text-brand-green">{r.empty}</td>
                            <td className="py-2 px-3 font-bold text-brand-green">{r.occupied}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Card rates */}
                {svc.pricingCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {svc.pricingCards.map((c, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{c.name}</span>
                        <span className="text-sm font-extrabold text-brand-green">{c.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items group */}
                {svc.pricingItems && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {svc.pricingItems.map((grp, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-xs font-extrabold text-brand-navy block border-b pb-1">{grp.category}</span>
                        {grp.options?.map((opt, oIdx) => (
                          <div key={oIdx} className="flex justify-between text-xs">
                            <span className="text-slate-700">{opt.type}</span>
                            <span className="font-bold text-brand-green">{opt.price}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO UPLOADS (Cloudinary) */}
      {activeTab === 'gallery' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
              Portfolio & Work Showcase Uploads
            </h2>
            <p className="text-xs text-slate-500">
              Upload before & after transformation photos using Cloudinary or image links.
            </p>
          </div>

          {/* Add Image Form */}
          <form onSubmit={handleAddGalleryItem} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Portfolio Image</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Image Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kitchen Deep Cleaning Transformation"
                  value={newGalleryTitle}
                  onChange={(e) => setNewGalleryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none focus:border-brand-royalBlue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Category</label>
                <select 
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none bg-white font-semibold"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Sofa">Sofa & Carpet</option>
                  <option value="Water Tank">Water Tank</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Upload File to Cloudinary</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white hover:file:bg-brand-royalBlue"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Or Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={newGalleryImage}
                  onChange={(e) => setNewGalleryImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none focus:border-brand-royalBlue"
                />
              </div>

              <button 
                type="submit"
                disabled={isUploading}
                className="w-full sm:w-auto bg-brand-green hover:bg-emerald-600 text-white font-extrabold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 shadow self-end"
              >
                {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isUploading ? 'Uploading...' : 'Add Portfolio Upload'}</span>
              </button>
            </div>

            {newGalleryImage && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Preview:</span>
                <img src={newGalleryImage} alt="Preview" className="h-28 w-auto rounded-xl object-cover border border-slate-300" />
              </div>
            )}
          </form>

          {/* Current Gallery List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow border border-slate-200 bg-white">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-3 bg-slate-900 text-white text-xs">
                  <span className="text-[10px] text-brand-green font-extrabold uppercase block">{item.category}</span>
                  <span className="font-bold truncate block">{item.title}</span>
                </div>
                <button
                  onClick={() => handleDeleteGalleryItem(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
                  title="Delete Portfolio Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVIEWS MANAGEMENT */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
              Customer Reviews Management
            </h2>
            <p className="text-xs text-slate-500">
              Edit customer feedback, add new ratings, or remove existing reviews.
            </p>
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Customer Review</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Currency Nagar, Vijayawada"
                  value={newReviewLocation}
                  onChange={(e) => setNewReviewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Service Used</label>
                <input 
                  type="text" 
                  placeholder="e.g. 3BHK Full Home Deep Clean"
                  value={newReviewService}
                  onChange={(e) => setNewReviewService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Star Rating (1-5)</label>
                <select 
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none bg-white font-bold"
                >
                  <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                  <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                  <option value={3}>3 Stars ⭐⭐⭐</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Review Comment</label>
              <textarea 
                required
                rows={2}
                placeholder="Enter customer review text..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="bg-brand-green hover:bg-emerald-600 text-white font-extrabold py-2 px-5 rounded-xl text-xs flex items-center space-x-1 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer Review</span>
            </button>
          </form>

          {/* List of Reviews */}
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-brand-navy text-sm">{rev.name}</span>
                    <span className="text-[11px] text-slate-500">({rev.location})</span>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                  <span className="text-[10px] text-brand-green font-bold block">{rev.service}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingReview(JSON.parse(JSON.stringify(rev)))}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="bg-red-100 hover:bg-red-600 hover:text-white text-red-600 font-bold text-xs p-2 rounded-xl transition"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
                Customer Inquiries Database
              </h2>
              <p className="text-xs text-slate-500">
                Inquiries submitted via website booking form & WhatsApp redirect
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  placeholder="Search name, phone, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-royalBlue"
                />
              </div>

              <button
                onClick={exportInquiriesToCSV}
                className="bg-brand-green hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Inquiries Table */}
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No customer inquiries found in records yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-600">
                    <th className="py-3 px-4">Date / ID</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Service & Property</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono">
                        <span className="font-bold text-brand-navy">{inq.id}</span>
                        <span className="block text-[10px] text-slate-400">{inq.date}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{inq.name}</span>
                        <a href={`tel:${inq.phone}`} className="text-brand-royalBlue font-semibold hover:underline block">{inq.phone}</a>
                        <span className="text-[10px] text-slate-500">{inq.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-brand-green block">{inq.service}</span>
                        <span className="text-[10px] text-slate-500">{inq.propertyType}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {inq.location || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200 outline-none ${
                            inq.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            inq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SERVICE EDIT MODAL (image copy 32.png edit capability) */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-brand-navy text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold font-heading">Edit Service & Prices</h3>
                <p className="text-xs text-brand-green">{editingService.title}</p>
              </div>
              <button 
                onClick={() => setEditingService(null)}
                className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-700 mb-1">Service Title</label>
                  <input 
                    type="text" 
                    value={editingService.title} 
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-700 mb-1">Badge</label>
                  <input 
                    type="text" 
                    value={editingService.badge || ''} 
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    className="w-full p-2.5 rounded-xl border"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={editingService.description} 
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 mb-1">Hero Image URL or Upload</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={editingService.heroImage || ''} 
                    onChange={(e) => setEditingService({ ...editingService, heroImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl border text-xs"
                  />
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleServiceImageUpload}
                    className="text-xs file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-brand-navy file:text-white"
                  />
                </div>
              </div>

              {/* Table Pricing Edit */}
              {editingService.pricingTable && (
                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-extrabold text-brand-navy text-sm">Pricing Table Rows (Empty vs Occupied Flat)</h4>
                  {editingService.pricingTable.rows?.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-xl border">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Type</label>
                        <input 
                          type="text" 
                          value={row.type} 
                          onChange={(e) => {
                            const newRows = [...editingService.pricingTable.rows];
                            newRows[idx].type = e.target.value;
                            setEditingService({
                              ...editingService,
                              pricingTable: { ...editingService.pricingTable, rows: newRows }
                            });
                          }}
                          className="w-full p-1.5 rounded border font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Empty Flat Rate</label>
                        <input 
                          type="text" 
                          value={row.empty} 
                          onChange={(e) => {
                            const newRows = [...editingService.pricingTable.rows];
                            newRows[idx].empty = e.target.value;
                            setEditingService({
                              ...editingService,
                              pricingTable: { ...editingService.pricingTable, rows: newRows }
                            });
                          }}
                          className="w-full p-1.5 rounded border text-brand-green font-extrabold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Occupied Flat Rate</label>
                        <input 
                          type="text" 
                          value={row.occupied} 
                          onChange={(e) => {
                            const newRows = [...editingService.pricingTable.rows];
                            newRows[idx].occupied = e.target.value;
                            setEditingService({
                              ...editingService,
                              pricingTable: { ...editingService.pricingTable, rows: newRows }
                            });
                          }}
                          className="w-full p-1.5 rounded border text-brand-green font-extrabold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cards Pricing Edit */}
              {editingService.pricingCards && (
                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-extrabold text-brand-navy text-sm">Package Pricing Cards</h4>
                  {editingService.pricingCards.map((card, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Package Name</label>
                        <input 
                          type="text" 
                          value={card.name} 
                          onChange={(e) => {
                            const newCards = [...editingService.pricingCards];
                            newCards[idx].name = e.target.value;
                            setEditingService({ ...editingService, pricingCards: newCards });
                          }}
                          className="w-full p-1.5 rounded border font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Price</label>
                        <input 
                          type="text" 
                          value={card.price} 
                          onChange={(e) => {
                            const newCards = [...editingService.pricingCards];
                            newCards[idx].price = e.target.value;
                            setEditingService({ ...editingService, pricingCards: newCards });
                          }}
                          className="w-full p-1.5 rounded border text-brand-green font-extrabold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-green hover:bg-emerald-600 text-white font-extrabold shadow flex items-center space-x-1"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT REVIEW MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-brand-navy text-base">Edit Customer Review</h3>
              <button onClick={() => setEditingReview(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveReviewEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  value={editingReview.name}
                  onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Text</label>
                <textarea 
                  rows={3}
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setEditingReview(null)} className="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-brand-green text-white font-extrabold text-xs shadow">Update Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
