import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles, Building2, Compass, Scale, Wrench, DraftingCompass } from 'lucide-react';

export default function DeveloperSection({ developerData, onOpenEnquiry }) {
  const badge = developerData?.badge || 'ABOUT THE DEVELOPER';
  const heading = developerData?.heading || 'Swastik Group';
  const tagline = developerData?.tagline || 'A legacy of trust';
  const description = developerData?.description || "Swastik Group has been shaping Mumbai's residential and commercial landscape with decades of trusted development. Each project reflects a commitment to quality construction, functional design, and community-centered living — delivered with the reliability that has made Swastik a preferred name for homebuyers across the city.";
  const image = developerData?.image || '/images/swastik-group.jpg';

  const consultants = developerData?.consultants || [
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

  const metrics = developerData?.metrics || [
    { value: '38+', label: 'Years of Excellence' },
    { value: '18M+', label: 'Sq. Ft. Delivered' },
    { value: '24,000+', label: 'Delighted Residents' },
    { value: '100%', label: 'RERA Compliance' }
  ];

  const rera = developerData?.rera || 'MahaRERA Registration No: P51800049182 | Project available at maharera.mahaonline.gov.in';

  return (
    <section id="developer" className="py-24 sm:py-32 bg-[#07090C] border-t border-neutral-800/80 relative overflow-hidden select-none">
      
      {/* Architectural decorative luxury curves echoing reference image */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold-500/10 via-[#3D2C1D]/20 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-[400px] h-[400px] rounded-tl-full bg-[#1A140F]/40 border-t border-l border-gold-400/10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Split Container: Left Framed Photo + Right Developer Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Framed Building / Developer Photo */}
          <div className="lg:col-span-5 relative">
            {/* Double Border Luxury Architectural Frame matching reference outline */}
            <div className="relative p-3 rounded-2xl bg-gradient-to-b from-neutral-800/80 via-neutral-900 to-black border border-gold-400/40 shadow-2xl group">
              
              {/* Outer decorative gold outline offset frame */}
              <div className="absolute -inset-2.5 border border-gold-400/25 rounded-3xl pointer-events-none transition-all group-hover:border-gold-400/40" />

              {/* Main Image */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#10141D]">
                <img
                  src={image}
                  alt="Swastik Group Iconic Development"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090C]/90 via-[#07090C]/20 to-transparent" />

                {/* Bottom Badge inside photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F15]/90 backdrop-blur-md border border-neutral-700/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold block">
                        LANDMARK ADDRESS
                      </span>
                      <h4 className="text-white text-sm font-serif font-bold tracking-wide mt-0.5">
                        Codename ONE • Chembur
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

            {/* Key Project Consultants Grid (2 columns matching reference) */}
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

            {/* 4 Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-neutral-800/80">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0F141F] border border-neutral-800/80 text-center">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-gold-300 block">
                    {m.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium block mt-0.5">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* MahaRERA Trust Banner (Below) */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#111622] via-[#0E131C] to-[#111622] border border-gold-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase block">Government Approved & Compliant</span>
              <p className="text-white text-xs sm:text-sm font-medium mt-0.5">{rera}</p>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry('Developer Credentials Consultation')}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-black hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 cursor-pointer"
          >
            VERIFY CREDENTIALS
          </button>
        </div>

      </div>
    </section>
  );
}
