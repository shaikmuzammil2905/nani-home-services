import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingActions from './components/FloatingActions';
import QuickBookingModal from './components/QuickBookingModal';
import PromoPopup from './components/PromoPopup';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Testimonials from './pages/Testimonials';
import FAQPage from './pages/FAQPage';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import PricingPage from './pages/PricingPage';
import { initStorage } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  useEffect(() => {
    initStorage();
  }, []);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  const handleOpenPromo = () => {
    setIsPromoOpen(true);
  };

  return (
    <Router>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-brand-royalBlue selection:text-white">
        <div>
          <Navbar 
            onOpenBooking={handleOpenBooking} 
            onOpenPromo={handleOpenPromo} 
          />
          <main>
            <Routes>
              <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
              <Route path="/about" element={<About onOpenBooking={handleOpenBooking} />} />
              <Route path="/services" element={<Services onOpenBooking={handleOpenBooking} />} />
              <Route path="/services/:slug" element={<ServiceDetail onOpenBooking={handleOpenBooking} />} />
              <Route path="/pricing" element={<PricingPage onOpenBooking={handleOpenBooking} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/testimonials" element={<Testimonials onOpenBooking={handleOpenBooking} />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        
        <Footer onOpenBooking={handleOpenBooking} />
        
        <FloatingActions 
          onOpenBooking={handleOpenBooking}
          onOpenPromo={handleOpenPromo}
        />

        {/* Global Pop-up Modals */}
        <QuickBookingModal 
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          defaultService={selectedService}
        />

        <PromoPopup 
          key={isPromoOpen ? 'open' : 'closed'}
          onOpenBooking={() => handleOpenBooking('')}
        />
      </div>
    </Router>
  );
}

export default App;

