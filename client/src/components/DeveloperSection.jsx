import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function DeveloperSection({ developerData, onOpenEnquiry }) {
  const badge = developerData?.badge || '38 YEARS OF ICONIC LANDMARKS';
  const heading = developerData?.heading || 'Crafting Landmarks That Transcend Time';
  const description = developerData?.description || 'With four decades of architectural distinction, our developments combine timeless design, structural engineering excellence, and impeccable delivery standards.';
  
  const metrics = developerData?.metrics || [
    { value: '38+', label: 'Years of Excellence' },
    { value: '18M+', label: 'Sq. Ft. Delivered' },
    { value: '24,000+', label: 'Delighted Residents' },
    { value: '100%', label: 'RERA Compliance' }
  ];

  const rera = developerData?.rera || 'MahaRERA Registration No: P51800049182 | Project available at maharera.mahaonline.gov.in';

  return (
    <section id="developer" className="py-24 sm:py-32 bg-[#07090C] border-t border-neutral-800/60 relative">
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
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4 Metrics Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#0F141F] border border-neutral-800 hover:border-gold-400/30 transition-all text-center flex flex-col items-center justify-center shadow-lg"
            >
              <span className="font-serif text-3xl sm:text-5xl font-bold text-white text-gold-gradient tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm tracking-[0.16em] text-neutral-400 uppercase font-medium mt-2">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* MahaRERA Trust Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D121B] border border-gold-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase block">Government Approved</span>
              <p className="text-white text-sm sm:text-base font-medium mt-0.5">{rera}</p>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry('Developer Credentials Consultation')}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-black hover:shadow-gold-glow transition-all flex-shrink-0 cursor-pointer"
          >
            VERIFY CREDENTIALS
          </button>
        </div>

      </div>
    </section>
  );
}
