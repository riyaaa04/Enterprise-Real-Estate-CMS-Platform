import React from 'react';
import { Sparkles, Building2, Compass, Scale, Wrench, DraftingCompass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SwastikGroupSection({ swastikData, onOpenEnquiry }) {
  const badge = swastikData?.badge || 'ABOUT THE DEVELOPER';
  const heading = swastikData?.heading || 'Swastik Group';
  const tagline = swastikData?.tagline || 'A legacy of trust';
  const description = swastikData?.description || "Swastik Group has been shaping Mumbai's residential and commercial landscape with decades of trusted development. Each project reflects a commitment to quality construction, functional design, and community-centered living — delivered with the reliability that has made Swastik a preferred name for homebuyers across the city.";
  const image = swastikData?.image || '/images/swastik-group.jpg';

  const consultants = swastikData?.consultants || [
    {
      role: 'ARCHITECT',
      name: 'Rohit Parmar, Sai Sampada DES',
      icon: DraftingCompass
    },
    {
      role: 'RCC CONSULTANT',
      name: 'System Structural Consultants Pvt. Ltd.',
      icon: Building2
    },
    {
      role: 'VAASTU CONSULTANT',
      name: 'Kamlesh Vastu Engineer',
      icon: Compass
    },
    {
      role: 'LEGAL CONSULTANT',
      name: 'Lexicon Law Partners',
      icon: Scale
    },
    {
      role: 'MEP CONSULTANT',
      name: 'Rupesh Gujarathi',
      icon: Wrench
    }
  ];

  return (
    <section id="swastik-group" className="py-24 sm:py-32 bg-[#0B0F15] border-t border-neutral-800/80 relative overflow-hidden select-none">
      
      {/* Architectural decorative curves echoing the design reference in luxury dark palette */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold-500/10 via-[#3D2C1D]/20 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-[420px] h-[420px] rounded-tl-full bg-[#18130E]/50 border-t border-l border-gold-400/10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Split Container: Left Framed Photo + Right Developer Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Framed Building Elevation */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 rounded-2xl bg-gradient-to-b from-neutral-800/80 via-neutral-900 to-black border border-gold-400/40 shadow-2xl group">
              
              {/* Outer decorative gold outline offset frame matching reference */}
              <div className="absolute -inset-2.5 border border-gold-400/25 rounded-3xl pointer-events-none transition-all group-hover:border-gold-400/45" />

              {/* Building Image */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#10141D]">
                <img
                  src={image}
                  alt="Swastik Group Project Elevation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090C]/90 via-[#07090C]/20 to-transparent" />

                {/* Bottom Badge inside photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F15]/90 backdrop-blur-md border border-neutral-700/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold block">
                        FLAGSHIP ADDRESS
                      </span>
                      <h4 className="text-white text-sm font-serif font-bold tracking-wide mt-0.5">
                        Swastik Bliss • Subhash Nagar
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Developer Story & Consultants Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{badge}</span>
            </div>

            {/* Main Heading: Swastik Group */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {heading}
            </h2>

            {/* Subtitle / Tagline: A legacy of trust */}
            <p className="font-serif italic text-lg sm:text-xl text-[#ECCF8E] mt-2 mb-6 font-light">
              {tagline}
            </p>

            {/* Description Paragraph */}
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>

            {/* Key Project Consultants Grid (matching reference) */}
            <div className="pt-6 border-t border-neutral-800/80">
              <div className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase mb-4">
                KEY PROJECT CONSULTANTS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {consultants.map((c, idx) => {
                  const Icon = c.icon || Building2;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-gold-400/90 flex-shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-gold-400">
                          {c.role}
                        </span>
                      </div>
                      <p className="text-white text-xs sm:text-[13px] font-medium pl-5.5 leading-snug">
                        {c.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-9 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 leading-tight">
                <span className="font-semibold text-white">Direct Developer Consultation:</span> Dedicated sales advisory & customized payment plans.
              </div>
              <button
                onClick={() => onOpenEnquiry('Swastik Group Developer Consultation')}
                className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-neutral-950 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-md"
              >
                <span>CONNECT WITH DEVELOPER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
