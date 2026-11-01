import React from 'react';
import { Sparkles, Waves, Dumbbell, Wine, Compass, Trees, ShieldAlert, Award } from 'lucide-react';

export default function AmenitiesSection({ amenitiesData, onOpenEnquiry }) {
  const badge = amenitiesData?.badge || '25,000 SQ. FT. SKY CLUBHOUSE';
  const heading = amenitiesData?.heading || 'Indulgences Elevated 400 Feet High';
  const subheading = amenitiesData?.subheading || 'World-class recreational amenities curated for rejuvenation and celebration.';

  const categories = amenitiesData?.categories || [
    {
      category: 'Sky Level Experiences',
      items: [
        { name: 'Sky Infinity Lap Pool', desc: 'Heated infinity edge looking out into the glittering Mumbai horizon.' },
        { name: 'Dusk Observatory Deck', desc: 'Handcrafted sunset viewing deck equipped with astronomical telescope.' },
        { name: 'Sky Cigar & Wine Lounge', desc: 'Temperature-controlled sommelier cellar with plush leather seating.' }
      ]
    },
    {
      category: 'Wellness & Vitality',
      items: [
        { name: 'TechnoGym Wellness Arena', desc: 'Biometric biomechanical cardio & strength training zones.' },
        { name: 'The Obsidian Spa', desc: 'Swedish sauna, Turkish steam bath, and herbal therapy rooms.' },
        { name: 'Yoga & Zen Meditation Pavilions', desc: 'Tranquil open-air deck surrounded by vertical bamboo gardens.' }
      ]
    },
    {
      category: 'Sports & Social Club',
      items: [
        { name: 'Indoor Badminton & Squash Arena', desc: 'World-Badminton-Federation approved wooden sprung courts.' },
        { name: 'Grand Ballroom & Private Dining', desc: 'Catering kitchen and banquet capacity for 150 guests.' },
        { name: 'Children\'s Cosmic Play Hub', desc: 'Interactive digital learning and soft obstacle wonderland.' }
      ]
    }
  ];

  return (
    <section id="amenities" className="py-24 sm:py-32 bg-[#0B0F15] border-t border-neutral-800/60 relative">
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#101622] border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between hover:border-gold-400/40 transition-all duration-300 group shadow-xl"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Waves className="w-5 h-5 text-gold-400" />}
                  {idx === 1 && <Dumbbell className="w-5 h-5 text-gold-400" />}
                  {idx === 2 && <Award className="w-5 h-5 text-gold-400" />}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-6 pb-3 border-b border-neutral-800 group-hover:border-gold-400/30 transition-colors">
                  {cat.category}
                </h3>

                <div className="space-y-6">
                  {cat.items?.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1">
                      <h4 className="text-sm font-semibold text-neutral-100 tracking-wide group-hover:text-gold-200 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onOpenEnquiry(`Amenities: ${cat.category}`)}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-neutral-300 hover:text-white bg-[#151C28] hover:bg-[#1C2638] border border-neutral-700/60 transition-colors cursor-pointer"
                >
                  Explore Amenities
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
