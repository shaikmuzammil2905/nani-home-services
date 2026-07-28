import React from 'react';
import { teamMembers } from '../data/websiteData';
import { Award, Briefcase, UserCheck } from 'lucide-react';

const Team = () => {
  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <section className="bg-brand-navy text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            EXPERIENCED CLEANING PROFESSIONALS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Meet Our Dedicated Team
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Background verified, well-trained, and dedicated experts making Vijayawada homes sparkle clean every day.
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-navy to-brand-deepBlue text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <img 
              src={teamMembers[0].image} 
              alt={teamMembers[0].name} 
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-brand-green shadow-2xl"
            />
          </div>
          <div className="md:col-span-8 space-y-4 text-left">
            <span className="bg-brand-green text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {teamMembers[0].category}
            </span>
            <h2 className="text-3xl font-extrabold font-heading">{teamMembers[0].name}</h2>
            <p className="text-brand-green font-bold text-sm">{teamMembers[0].role} • {teamMembers[0].experience} Experience</p>
            <p className="text-slate-300 text-sm leading-relaxed">{teamMembers[0].desc}</p>
          </div>
        </div>
      </section>

      {/* Staff & Supervisors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-brand-navy font-heading mb-8">
          Management & Field Specialists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(1).map((member) => (
            <div key={member.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4 hover:shadow-2xl transition">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div>
                <span className="text-[11px] font-extrabold text-brand-green uppercase tracking-wider">{member.category}</span>
                <h3 className="text-xl font-bold text-brand-navy font-heading">{member.name}</h3>
                <p className="text-xs text-brand-royalBlue font-bold">{member.role} ({member.experience})</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Team;
