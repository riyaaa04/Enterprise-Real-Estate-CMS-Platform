import React from 'react';
import { Navigation, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ConnectivitySection({ connectivityData, onOpenEnquiry }) {
  const badge = connectivityData?.badge || 'PRIME CENTRAL CONNECTIVITY';
  const heading = connectivityData?.heading || 'Minutes from Everywhere That Matters';
  const subheading = connectivityData?.subheading || 'Chembur offers effortless transit to South Mumbai, BKC, Navi Mumbai, and the International Airport.';

  const hubs = connectivityData?.hubs || [
    { name: 'BKC Business District', time: '12 Mins', route: 'Via BKC-Chembur Elevated Connector' },
    { name: 'Eastern Freeway', time: '03 Mins', route: 'Direct signal-free connectivity to Fort & Colaba' },
    { name: 'Chhatrapati Shivaji Intl Airport', time: '22 Mins', route: 'Via Santa Cruz-Chembur Link Road (SCLR)' },
    { name: 'Chembur Monorail & Metro Line 2B', time: '04 Mins', route: 'Walking transit hub connecting East to West' },
    { name: 'Bombay Presidency Golf Club', time: '06 Mins', route: 'Historic 18-hole championship golf course' },
    { name: 'Top Tier Hospitals & Schools', time: '05 Mins', route: 'Surana Sethia Hospital, The Green Acres Academy' }
  ];

  return (
    <section id="connectivity" className="py-24 sm:py-32 bg-[#07090C] border-t border-neutral-800/60 relative">
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

        {/* 6-box Transit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 hover:border-gold-400/40 transition-all duration-300 group shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-base sm:text-lg font-semibold tracking-wide group-hover:text-gold-200 transition-colors">
                    {hub.name}
                  </h3>
                  <p className="text-neutral-400 text-xs font-light mt-1.5 leading-relaxed">
                    {hub.route}
                  </p>
                </div>
                <div className="flex flex-col items-end flex-shrink-0 ml-3">
                  <div className="flex items-center gap-1.5 text-gold-400 bg-gold-400/10 border border-gold-400/30 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-serif text-sm font-bold">{hub.time}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Subhash Nagar, Chembur</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-300">Fast Transit</span>
              </div>
            </div>
          ))}
        </div>

        {/* Location Advantage Note */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#121824] via-[#101520] to-[#121824] border border-gold-400/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-white font-medium text-sm sm:text-base">Experience Chembur’s most connected luxury address</h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-light mt-0.5">Strategically positioned for frictionless executive commutes.</p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Location & Transit Inquiry')}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-400 text-black hover:bg-gold-300 transition-colors flex-shrink-0 cursor-pointer"
          >
            GET LOCATION DOSSIER
          </button>
        </div>

      </div>
    </section>
  );
}
