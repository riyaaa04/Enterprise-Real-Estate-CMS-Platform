import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Sparkles, Maximize2, X, Download } from 'lucide-react';

export default function ConnectivitySection({ connectivityData, onOpenEnquiry }) {
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const badge = connectivityData?.badge || 'LOCATION & CONNECTIVITY';
  const heading = connectivityData?.heading || 'What if your home is as well connected as your ambitions?';
  const tagline = connectivityData?.tagline || 'This is the one.';
  const mapImage = connectivityData?.mapImage || '/images/map-only.png';

  const defaultCategories = [
    {
      title: 'CONNECTIVITY',
      items: [
        { name: 'Chembur Railway Station', time: '5 min' },
        { name: 'Chembur Monorail Station', time: '5 min' },
        { name: 'Eastern Freeway', time: '7 min' },
        { name: 'Upcoming Metro Station', time: '8 min' },
        { name: 'Santacruz–Chembur Link Road', time: '10 min' },
        { name: 'BKC', time: '15 min' },
        { name: 'Airport', time: '25 min' }
      ]
    },
    {
      title: 'EDUCATION',
      items: [
        { name: 'AFAC English High School', time: '1 min' },
        { name: 'St. Antony\'s Girls High School', time: '1 min' },
        { name: 'St. Gregorios High School', time: '5 min' },
        { name: 'Our Lady of Perpetual Succour High School', time: '2 min' },
        { name: 'Swami Vivekanand School & College', time: '8 min' },
        { name: 'Ryan International', time: '12 min' },
        { name: 'Shah & Anchor Campus', time: '7 min' },
        { name: 'RBK International', time: '12 min' }
      ]
    },
    {
      title: 'RECREATION & LIFESTYLE',
      items: [
        { name: 'K-Star Mall', time: '5 min' },
        { name: 'Westside', time: '5 min' },
        { name: 'Phoenix Market City', time: '17 min' },
        { name: 'R City Mall', time: '15 min' },
        { name: 'Fun Cinemas', time: '7 min' },
        { name: 'Movie Time', time: '6 min' }
      ]
    }
  ];

  const categories = connectivityData?.categories || defaultCategories;

  return (
    <section id="connectivity" className="py-20 sm:py-28 bg-[#07090C] border-t border-neutral-800/80 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6F513A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Luxury Container matching the uploaded design */}
        <div className="rounded-3xl border border-neutral-800/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#0B0F15]">
          
          {/* Left Column: Chembur Transit & Road Network Map */}
          <div className="lg:col-span-5 bg-[#FAF8F5] relative flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[420px] lg:min-h-[580px] group">
            <img
              src={mapImage}
              alt="Chembur Transit Network & Strategic Location Map"
              className="w-full h-auto max-h-[540px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />

            {/* Click to Enlarge Overlay Pill */}
            <button
              onClick={() => setMapModalOpen(true)}
              className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-950 backdrop-blur-md text-[11px] font-medium tracking-wider text-white border border-neutral-700 shadow-lg cursor-pointer transition-all hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
              <span>ENLARGE MAP</span>
            </button>

            {/* Subhash Nagar Chembur Location Tag */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold tracking-wide text-neutral-800 border border-neutral-300/80 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#8C694E]" />
              <span>Subhash Nagar, Chembur</span>
            </div>
          </div>

          {/* Right Column: Warm Coffee/Bronze Section with 3 Categories */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#684B35] via-[#5C412D] to-[#4A3322] p-6 sm:p-10 lg:p-12 text-white flex flex-col justify-between relative">
            
            <div>
              {/* Eyebrow / Badge */}
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#E7D6C4] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span>{badge}</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight leading-[1.2] mb-3">
                {heading}
              </h2>

              {/* Tagline */}
              <p className="font-serif italic text-base sm:text-lg text-[#E9D9CB]/90 font-light mb-8 sm:mb-10">
                {tagline}
              </p>

              {/* 3 Columns of Categories matching exact layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6 pt-4 border-t border-[#8D6B4F]/50">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex flex-col">
                    {/* Category Title */}
                    <div className="pb-2.5 mb-3 border-b border-[#9A765A]/60">
                      <h3 className="text-xs sm:text-[11px] lg:text-xs font-bold tracking-[0.16em] uppercase text-[#F4ECE3]">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Bullet List */}
                    <ul className="space-y-2.5 text-xs sm:text-[11px] lg:text-xs leading-relaxed text-[#EDE3D8]">
                      {cat.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          {/* Square bullet like reference image */}
                          <span className="inline-block w-1.5 h-1.5 rounded-[1px] bg-gold-300 flex-shrink-0 mt-1.5" />
                          <span className="flex-1">
                            <span className="font-medium text-white">{item.name}</span>
                            <span className="text-[#E0CBB7] mx-1">—</span>
                            <span className="font-semibold text-gold-200 whitespace-nowrap">{item.time}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="mt-8 pt-6 border-t border-[#8D6B4F]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-[#E9D7C7]/90 leading-tight">
                <span className="font-semibold text-white">Central Transit Crossroads:</span> Signal-free BKC & Freeway transit.
              </div>
              <button
                onClick={() => onOpenEnquiry('Location & Connectivity Dossier')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#F6EFCF] hover:bg-[#D4AF37] text-neutral-950 transition-all shadow-md hover:shadow-gold-glow flex-shrink-0 cursor-pointer"
              >
                REQUEST LOCATION DOSSIER
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* High-Resolution Map Lightbox Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-[#FAF8F5] rounded-3xl p-4 sm:p-6 shadow-2xl border border-neutral-700 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#8C694E]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                  Chembur Transit & Strategic Connectivity Map
                </h3>
              </div>
              <button
                onClick={() => setMapModalOpen(false)}
                className="p-1.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition-colors cursor-pointer"
                aria-label="Close Map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto py-4 flex items-center justify-center">
              <img
                src={mapImage}
                alt="High Resolution Transit Map"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="pt-3 border-t border-neutral-300 flex items-center justify-between text-xs text-neutral-600">
              <span>Subhash Nagar, Chembur, Mumbai</span>
              <button
                onClick={() => {
                  setMapModalOpen(false);
                  onOpenEnquiry('Full Location Map Download');
                }}
                className="px-4 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Download PDF Map
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
