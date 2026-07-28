import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingActions from './components/FloatingActions';
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
import { initStorage } from './utils/storage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initStorage();
  }, []);

  return (
    <Router>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 selection:bg-brand-royalBlue selection:text-white">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/pricing" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;
