import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import WomensCollection from './pages/WomensCollection';
import KidsCollection from './pages/KidsCollection';
import RetailCollection from './pages/RetailCollection';
import Contact from './pages/Contact';
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
              <Route path="/collections/women" element={<WomensCollection />} />
              <Route path="/collections/kids" element={<KidsCollection />} />
              <Route path="/collections/retail" element={<RetailCollection />} />
              <Route path="/contact" element={<Contact />} />
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
