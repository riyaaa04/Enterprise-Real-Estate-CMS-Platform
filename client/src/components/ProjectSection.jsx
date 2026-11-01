import React from 'react';
import { Compass, Sparkles, Shield, Maximize2, Download, Home, Store, Building2 } from 'lucide-react';

export default function ProjectSection({ projectData, onOpenEnquiry, onOpenBrochure }) {
  const badge = projectData?.badge || 'ARCHITECTURAL MASTERPIECE';
  const heading = projectData?.heading || 'An Icon Above the Chembur Skyline';
  const subheading = projectData?.subheading || 'Engineered for those whose aspirations know no horizon.';
  const paragraph1 = projectData?.paragraph1 || 'Located in Subhash Nagar, Chembur, this residential redevelopment offers a practical yet elevated living experience. Comprising 1 & 2 BHK residences in Ground-Level Commercial Spaces + 16-Story Habitational Floors, the project is planned with a strong focus on functionality and lifestyle — adding daily convenience, a modern gymnasium/fitness center, and lifestyle amenities, ensuring a well-rounded living environment for residents.';
  const paragraph2 = projectData?.paragraph2 || '';
  const features = projectData?.features || [
    {
      title: '1 & 2 BHK Residences',
      desc: 'Thoughtfully planned, well-ventilated residences balancing modern comfort and family functionality.'
    },
    {
      title: 'Ground-Level Commercial Spaces',
      desc: 'Integrated retail and commercial zones bringing daily essentials and shopping convenience right downstairs.'
    },
    {
      title: '16-Story Habitational Floors',
      desc: 'Elevated residential floors complemented by a contemporary gymnasium, fitness center, and lifestyle amenities.'
    }
  ];

  const stats = projectData?.stats || [
    { value: '3.25', label: 'MILLION SQ FT ONGOING' },
    { value: '3.55', label: 'MILLION SQ FT COMPLETED' },
    { value: '2600+', label: 'HAPPY FAMILIES' }
  ];

  return (
    <section id="project" className="relative py-24 sm:py-32 bg-[#0B0F15] overflow-hidden border-t border-neutral-800/60">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            {heading}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-3">
            {subheading}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column with 3 Overlapping Stat Boxes over Building Photo */}
          <div className="lg:col-span-6 relative pr-0 sm:pr-2 lg:pr-4">
            {/* Architectural Outline Frame */}
            <div className="hidden sm:block absolute top-5 right-0 bottom-2 left-20 border border-gold-400/30 rounded-2xl pointer-events-none -z-0" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center">
              
              {/* 3 Overlapping Stat Boxes on the left */}
              <div className="w-full sm:w-[210px] md:w-[230px] flex flex-col gap-3.5 z-20 sm:-mr-14 mb-4 sm:mb-0">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="relative bg-[#FCFAF7] rounded-xl p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.6)] border-l-4 border-[#8B6E32] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="font-sans font-bold text-3xl sm:text-4xl text-[#3A2B1A] tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#75644E] uppercase mt-2 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Building Photo */}
              <div className="w-full sm:flex-1 relative rounded-2xl overflow-hidden border border-neutral-700/80 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                  alt="Building Photo"
                  className="w-full h-[360px] sm:h-[470px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15]/80 via-transparent to-transparent opacity-60" />

                {/* Subtle caption tag */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 text-[10px] text-neutral-300 font-medium tracking-wider uppercase">
                  Subhash Nagar, Chembur
                </div>
              </div>

            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              {paragraph1}
            </p>
            {paragraph2 && (
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                {paragraph2}
              </p>
            )}

            {/* Feature Cards: 3 Requested Boxes */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#121722]/80 border border-neutral-800 hover:border-gold-400/40 transition-colors flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx === 0 && <Home className="w-4 h-4 text-gold-400" />}
                    {idx === 1 && <Store className="w-4 h-4 text-gold-400" />}
                    {idx === 2 && <Building2 className="w-4 h-4 text-gold-400" />}
                  </div>
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-semibold tracking-wide">{feat.title}</h3>
                    {feat.desc && <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1">{feat.desc}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Brochure CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenBrochure || (() => onOpenEnquiry('Download Brochure'))}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-neutral-950 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD BROCHURE</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
