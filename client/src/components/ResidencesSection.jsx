import React, { useState } from 'react';
import { Home, Layers, CheckCircle2, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function ResidencesSection({ residencesData, onOpenEnquiry }) {
  const units = residencesData?.units || [
    {
      id: '3bhk-grande',
      type: '3 BHK Grande Suite',
      carpetArea: '1,325 Sq. Ft.',
      balconyArea: '185 Sq. Ft.',
      pricing: '₹ 4.85 Cr* Onwards',
      description: 'Expansive 3-bedroom suite with Italian marble living room, dedicated powder room, and private deck.',
      features: ['Master suite with walk-in wardrobe', 'Separate utility area', 'East-facing sunrise views']
    },
    {
      id: '4bhk-palatial',
      type: '4 BHK Palatial Residence',
      carpetArea: '1,960 Sq. Ft.',
      balconyArea: '260 Sq. Ft.',
      pricing: '₹ 7.25 Cr* Onwards',
      description: 'Double master suites, formal drawing room, state-of-the-art island kitchen layout, and dual balconies.',
      features: ['Private elevator lobby access', 'Servant quarter with private entry', 'Unobstructed 360° dusk vistas']
    },
    {
      id: '4bhk-sky-villa',
      type: '4 BHK Sky Duplex Villa',
      carpetArea: '2,850 Sq. Ft.',
      balconyArea: '420 Sq. Ft.',
      pricing: 'Price on Application',
      description: 'Crown level penthouse with private double-height glass rotunda, private heated plunge pool, and sky terrace.',
      features: ['Private plunge pool & jacuzzi', 'Double-height ceiling in salon', 'Ultra-exclusive 39th & 40th levels']
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
            {residencesData?.heading || 'Bespoke Residences & Floor Plans'}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-3">
            {residencesData?.subheading || 'Intelligently planned spaces balancing palatial entertainment and private tranquility.'}
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
                  ? 'bg-gold-gradient text-neutral-950 shadow-gold-glow scale-105'
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

              {/* Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Carpet Area</span>
                  <span className="font-serif text-lg font-bold text-white mt-0.5 block">{selectedUnit.carpetArea}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Balcony Deck</span>
                  <span className="font-serif text-lg font-bold text-white mt-0.5 block">{selectedUnit.balconyArea}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#151D28] border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase block">Price Guide</span>
                  <span className="font-serif text-lg font-bold text-gold-300 mt-0.5 block">{selectedUnit.pricing}</span>
                </div>
              </div>

              {/* Key Features List */}
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

            {/* Right Column: Architectural Plan Preview & Visual */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-[#121824] to-[#0A0D12] border border-gold-400/30 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                
                {/* Architectural Blueprint Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* SVG Blueprint Illustration */}
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
                  <div className="mt-4 px-4 py-2 rounded-full bg-obsidian-900/90 border border-neutral-700 text-xs text-gold-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>Vastu Compliant Layout</span>
                  </div>
                </div>

                {/* Interactive Blueprint Tag */}
                <button
                  onClick={() => onOpenEnquiry(`Preview Layout: ${selectedUnit.type}`)}
                  className="absolute bottom-4 right-4 text-[11px] font-semibold text-gold-400 hover:text-white uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Enquire For Dimensions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
