import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { businessDetails } from '../data/websiteData';
import InquiryForm from '../components/InquiryForm';

const Contact = () => {
  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            GET IN TOUCH WITH US
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Contact NANI CLEANING SERVICES
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            We are here to assist you with free quotes, service bookings, and inquiries across Vijayawada.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Details & Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 space-y-6">
              <h2 className="text-2xl font-extrabold text-brand-navy font-heading border-b border-slate-100 pb-3">
                Contact Information
              </h2>

              <div className="space-y-5">
                <a href={`tel:${businessDetails.phone}`} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-lightBlue text-brand-royalBlue flex items-center justify-center shrink-0 group-hover:bg-brand-royalBlue group-hover:text-white transition">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Call Us Directly</h4>
                    <p className="text-brand-navy font-extrabold text-base">{businessDetails.phoneFormatted}</p>
                    <span className="text-xs text-slate-500">Available 8:00 AM - 9:00 PM</span>
                  </div>
                </a>

                <a href={`https://wa.me/${businessDetails.whatsappClean}`} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-brand-green flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">WhatsApp Instant Chat</h4>
                    <p className="text-brand-green font-extrabold text-base">{businessDetails.whatsapp}</p>
                    <span className="text-xs text-slate-500">Instant free quote response</span>
                  </div>
                </a>

                <a href={`mailto:${businessDetails.email}`} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Email Address</h4>
                    <p className="text-slate-700 font-semibold text-sm break-all">{businessDetails.email}</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Office Address</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{businessDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Working Hours</h4>
                    <p className="text-slate-600 text-xs">{businessDetails.workingHours}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

        </div>
      </section>

      {/* Google Maps Location Embed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-lg font-heading">Our Service Location in Vijayawada</h3>
            <span className="text-xs text-brand-green font-semibold">Prasadampadu, Currency Nagar</span>
          </div>
          <div className="w-full h-80 sm:h-96">
            <iframe 
              title="NANI CLEANING SERVICES Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.260029986341!2d80.6865!3d16.5135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fab1e1455555%3A0x8bb8888888888888!2sCurrency%20Nagar%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
