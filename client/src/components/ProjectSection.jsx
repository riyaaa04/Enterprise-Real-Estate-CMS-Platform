import React from 'react';
import { Compass, Sparkles, Shield, Maximize2 } from 'lucide-react';

export default function ProjectSection({ projectData, onOpenEnquiry }) {
  const badge = projectData?.badge || 'ARCHITECTURAL MASTERPIECE';
  const heading = projectData?.heading || 'An Icon Above the Chembur Skyline';
  const subheading = projectData?.subheading || 'Engineered for those whose aspirations know no horizon.';
  const paragraph1 = projectData?.paragraph1 || 'Located in Subhash Nagar, Chembur, this residential redevelopment offers a practical yet elevated living experience. Comprising 1 & 2 BHK residences in Ground-Level Commercial Spaces + 16-Story Habitational Floors, the project is planned with a strong focus on functionality and lifestyle — adding daily convenience, a modern gymnasium/fitness center, and lifestyle amenities, ensuring a well-rounded living environment for residents.';
  const paragraph2 = projectData?.paragraph2 || '';
  const features = projectData?.features || [
    { title: 'Curated Privacy', desc: 'Only 3 bespoke residences per floor with zero overlooking corridors.' },
    { title: 'Expansive Decks', desc: 'Generous 8-foot deep sunset terraces offering unobstructed views.' },
    { title: 'Skyline Orientation', desc: 'Vastu-compliant layouts engineered for cross ventilation and natural lighting.' }
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
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-700/80 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Codename ONE Architecture"
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-transparent to-transparent opacity-80" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian-900/90 backdrop-blur-md border border-gold-400/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-gold-400 uppercase font-semibold">Structure Status</span>
                  <p className="text-white font-medium text-sm">Ground + 16-Story Habitational Floors</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-gold-400" />
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

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#121722]/80 border border-neutral-800 hover:border-gold-400/40 transition-colors flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-semibold tracking-wide">{feat.title}</h3>
                    <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inquire CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('The Project Section')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-400 text-black hover:bg-gold-300 transition-colors shadow-gold-glow cursor-pointer"
              >
                <span>REQUEST COMPLETE ARCHITECTURAL BRIEF</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
