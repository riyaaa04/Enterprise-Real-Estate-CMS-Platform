import React, { useState } from 'react';
import { Home, Layers, CheckCircle2, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function ResidencesSection({ residencesData, onOpenEnquiry }) {
  const units = residencesData?.units || [
    {
      id: '1rk-classic',
      type: '1 RK Classic',
      carpetArea: '285 Sq. Ft.',
      balconyArea: '45 Sq. Ft.',
      totalArea: '330 Sq. Ft.',
      pricing: 'Price on Request',
      image: '/images/1RK.png',
      description: 'Smartly planned 1 RK residence featuring an airy studio hall, dedicated kitchen area, and attached open-air balcony.',
      features: [
        'Spacious studio living room with ceiling fan & electrical fittings',
        'Functional kitchen space with dedicated granite platform',
        '45 sq.ft attached private balcony with natural light & ventilation',
        'Well-appointed bathroom with branded sanitaryware & geyser provision',
        'Concealed copper electrical wiring & vitrified tile flooring'
      ]
    },
    {
      id: '1bhk-grand',
      type: '1 BHK Grand',
      carpetArea: '450 Sq. Ft.',
      balconyArea: '60 Sq. Ft.',
      totalArea: '510 Sq. Ft.',
      pricing: 'Price on Request',
      image: '/images/1RK.png',
      description: 'Spacious 1-bedroom residence with dedicated master bedroom, separate dining nook, and smart kitchen platform.',
      features: [
        'Master bedroom with wardrobe recess',
        'Cross-ventilated living & dining zone',
        'Branded sanitaryware & fittings',
        'Dedicated kitchen utility space'
      ]
    },
    {
      id: '2bhk-alto',
      type: '2 BHK Alto',
      carpetArea: '620 Sq. Ft.',
      balconyArea: '75 Sq. Ft.',
      totalArea: '695 Sq. Ft.',
      pricing: 'Price on Request',
      image: '/images/1RK.png',
      description: 'Elevated 2-bedroom residence offering dual bathrooms, master bedroom privacy, generous living hall, and scenic skyline views.',
      features: [
        'Dual well-appointed bathrooms',
        'Dedicated master suite with attached bath',
        'Generous private sunset balcony',
        'Unobstructed Chembur skyline views'
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const selectedUnit = units[activeTab] || units[0];

  return (
    <section id="residences" className="py-24 sm:py-32 bg-[#07090C] border-t border-neutral-800/60 relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>CURATED SUITES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            {residencesData?.heading || 'Find the home that fits your life'}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-3">
            {residencesData?.subheading || 'Intelligently planned spaces balancing everyday functionality and elevated lifestyle.'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {units.map((unit, idx) => (
            <button
              key={unit.id || idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeTab === idx
                  ? 'bg-gold-gradient text-neutral-950 shadow-gold-glow scale-105 font-bold'
                  : 'bg-[#121722] text-neutral-300 hover:text-white border border-neutral-800 hover:border-gold-400/40'
              }`}
            >
              {unit.type}
            </button>
          ))}
        </div>

        {/* Unit Showcase Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0E131C] border border-neutral-800 overflow-hidden shadow-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Details & Specs */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">CONFIGURATION</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mt-1">
                  {selectedUnit.type}
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed mt-3">
                  {selectedUnit.description}
                </p>
              </div>

              {/* Spec Pills: Carpet Area, Balcony, Total Area */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Carpet Area</span>
                  <span className="font-serif text-lg font-bold text-white mt-0.5 block">{selectedUnit.carpetArea}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Balcony</span>
                  <span className="font-serif text-lg font-bold text-white mt-0.5 block">{selectedUnit.balconyArea}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Total Area</span>
                  <span className="font-serif text-lg font-bold text-gold-300 mt-0.5 block">{selectedUnit.totalArea || selectedUnit.pricing}</span>
                </div>
              </div>

              {/* Key Features / Inclusions List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">Suite Inclusions:</span>
                {selectedUnit.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-neutral-300 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry(`Floor Plan: ${selectedUnit.type}`)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>REQUEST DETAILED FLOOR PLAN</span>
                </button>
              </div>
            </div>

            {/* Right Column: Actual Residence Image / Architectural Plan */}
            <div className="lg:col-span-6 relative flex justify-center">
              {selectedUnit.image ? (
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-gold-400/40 relative group shadow-2xl bg-[#0A0D12]">
                  <img
                    src={selectedUnit.image}
                    alt={`${selectedUnit.type} Interior View`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090C]/85 via-transparent to-transparent opacity-80" />

                  {/* Floating Unit Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/40 text-xs text-gold-300 font-semibold tracking-wider uppercase">
                      {selectedUnit.type} — Actual Residence View
                    </div>
                    <button
                      onClick={() => onOpenEnquiry(`Schedule Site Visit: ${selectedUnit.type}`)}
                      className="px-3.5 py-1.5 rounded-full bg-gold-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-gold-300 transition-colors cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-[#121824] to-[#0A0D12] border border-gold-400/30 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gold-400/10 border border-gold-400/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-8 h-8 text-gold-400" />
                    </div>
                    <span className="font-serif text-xl sm:text-2xl text-white font-medium">
                      {selectedUnit.type}
                    </span>
                    <span className="text-xs tracking-widest text-neutral-400 uppercase mt-1">
                      Architectural Layout Plan
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
