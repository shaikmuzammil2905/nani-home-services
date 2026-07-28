import React, { useState, useEffect } from 'react';
import { 
  Lock, User, LogOut, Download, Trash2, CheckCircle, Clock, Search, Plus, 
  FileText, Image as ImageIcon, DollarSign, Settings, Users, MessageSquare, Shield 
} from 'lucide-react';
import { 
  getInquiries, deleteInquiry, updateInquiryStatus, exportInquiriesToCSV, 
  getStoredServices, saveServices, getStoredGallery, saveGallery 
} from '../utils/storage';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // New Gallery item state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Residential');
  const [newGalleryImage, setNewGalleryImage] = useState('');

  useEffect(() => {
    // Check if session stored
    const authStatus = sessionStorage.getItem('nani_admin_logged');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setInquiries(getInquiries());
      setServices(getStoredServices());
      setGallery(getStoredGallery());
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'nani123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nani_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password! (Default: admin / nani123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nani_admin_logged');
  };

  const handleDeleteInquiry = (id) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry?')) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
  };

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImage) return;

    const newItem = {
      id: Date.now(),
      title: newGalleryTitle,
      category: newGalleryCategory,
      image: newGalleryImage
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveGallery(updated);
    setNewGalleryTitle('');
    setNewGalleryImage('');
  };

  const handleDeleteGalleryItem = (id) => {
    if (window.confirm('Delete this image from portfolio?')) {
      const updated = gallery.filter(item => item.id !== id);
      setGallery(updated);
      saveGallery(updated);
    }
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
            <span className="text-[11px] text-slate-400">Default Access: admin / nani123</span>
          </div>

        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
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
            <p className="text-xs text-emerald-400 font-semibold">Logged in as Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-2 transition border border-white/15"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
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
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Website Status</span>
            <h3 className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">Live & Active</h3>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'inquiries', label: 'Manage Inquiries', icon: MessageSquare },
          { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
          { id: 'services', label: 'Manage Services & Prices', icon: DollarSign },
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

      {/* TAB 1: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
                Customer Inquiries Database
              </h2>
              <p className="text-xs text-slate-500">
                Inquiries submitted via website form & WhatsApp redirect
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

      {/* TAB 2: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
            Portfolio Gallery Management
          </h2>

          {/* Add Image Form */}
          <form onSubmit={handleAddGalleryItem} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Image Title</label>
              <input 
                type="text" 
                placeholder="e.g. Kitchen Deep Clean"
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
                className="w-full px-3 py-2 rounded-xl border text-xs outline-none bg-white"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Sofa">Sofa</option>
                <option value="Water Tank">Water Tank</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Image URL</label>
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
              className="bg-brand-green text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-1 hover:bg-emerald-600 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Image</span>
            </button>
          </form>

          {/* Current Gallery List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden shadow border border-slate-200">
                <img src={item.image} alt={item.title} className="w-full h-36 object-cover" />
                <div className="p-2 bg-slate-900 text-white text-xs">
                  <span className="text-[10px] text-brand-green font-bold uppercase block">{item.category}</span>
                  <span className="font-semibold truncate block">{item.title}</span>
                </div>
                <button
                  onClick={() => handleDeleteGalleryItem(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow hover:bg-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES & PRICING */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
            Services & Pricing Management
          </h2>
          <p className="text-xs text-slate-500">
            View active pricing packages. Updates are synced live to the homepage & service pages.
          </p>

          <div className="space-y-4">
            {services.map((svc) => (
              <div key={svc.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-brand-navy text-sm">{svc.title}</h4>
                  <p className="text-xs text-slate-500">{svc.description}</p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-brand-green px-3 py-1 rounded-full whitespace-nowrap">
                  {svc.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
