import React from 'react';
import { ArrowRight, Eye, Building2, Calendar, Sparkles } from 'lucide-react';

export default function HeroSection({
  heroData,
  highlightsData,
  onOpenEnquiry,
  onOpenSiteTour,
  onExploreResidences
}) {
  // Fallbacks matching the exact design
  const tagBadge = heroData?.tagBadge || '• SUBHASH NAGAR • CHEMBUR • MUMBAI | RERA REGISTERED';
  const subtitle = heroData?.subtitle || 'CODENAME';
  const mainTitle = heroData?.mainTitle || 'One';
  const locationTrack = heroData?.locationTrack || 'CHEMBUR';
  const tagline = heroData?.tagline || 'Where home extends to life.';
  const description = heroData?.description || 'Ultra-luxury bespoke 3 & 4 BHK landmark residences designed for effortless grandeur and timeless tranquility.';
  const primaryCtaText = heroData?.primaryCtaText || 'ENQUIRE NOW';
  const secondaryCtaText = heroData?.secondaryCtaText || 'EXPLORE RESIDENCES';

  const cardHeaderTitle = highlightsData?.headerTitle || 'SIGNATURE ADDRESS';
  const cardAddress = highlightsData?.address || 'Subhash Nagar, Chembur';
  const stats = highlightsData?.stats || [
    { id: 1, value: '40+', label: 'STOREYS ICONIC TOWER' },
    { id: 2, value: '25K', unit: 'SQ.FT', label: 'SKY CLUBHOUSE' },
    { id: 3, value: '3 & 4', label: 'GRAND BHK SUITES' },
    { id: 4, value: '360°', label: 'HANDCRAFTED DUSK VIEWS' }
  ];
  const cardFooterLabel = highlightsData?.footerLabel || 'Book Exclusive Site Tour';
  const cardActionText = highlightsData?.actionText || 'SCHEDULE >';

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#07090C]">
      {/* Background Architectural Rendering & Cinematic Dusk Lighting */}
      <div className="absolute inset-0 z-0">
        {/* Background Building Image */}
        <div
          className="absolute inset-0 bg-cover bg-right lg:bg-center transform scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('/images/tower-dusk.jpg'), url('/images/hero-reference.png')`,
            backgroundPosition: 'right 30% center',
            backgroundSize: 'cover',
          }}
        />

        {/* Ambient Dusk & Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090C] via-[#07090C]/90 to-[#07090C]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-[#07090C]/70" />
        <div className="absolute inset-0 bg-radial-luxury pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Location & RERA Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121721]/80 backdrop-blur-md border border-neutral-700/70 shadow-sm text-[10px] sm:text-xs tracking-[0.18em] text-neutral-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block shadow-gold-glow animate-pulse" />
              <span>{tagBadge.replace(/^•\s*/, '')}</span>
            </div>

            {/* Codename Subtitle with Gold Dash */}
            <div className="flex items-center gap-3 mt-6 sm:mt-8">
              <span className="w-8 sm:w-10 h-[1.5px] bg-gradient-to-r from-gold-400 to-transparent" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-gold-400">
                {subtitle}
              </span>
            </div>

            {/* Huge Main Title: One */}
            <div className="relative mt-1 sm:mt-2">
              <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-normal leading-[0.88] tracking-tight">
                <span className="text-gold-gradient select-none">
                  {mainTitle}
                </span>
              </h1>
            </div>

            {/* Spaced Chembur Tracking */}
            <div className="mt-2.5 sm:mt-3">
              <span className="text-xs sm:text-sm tracking-[0.5em] text-neutral-300 uppercase font-medium">
                {locationTrack}
              </span>
            </div>

            {/* Italic Serif Tagline */}
            <h2 className="font-serif italic font-light text-2xl sm:text-3xl md:text-[34px] text-neutral-100 mt-4 sm:mt-5 tracking-wide">
              {tagline}
            </h2>

            {/* Body Description */}
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl mt-3 sm:mt-4">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-8">
              {/* Primary: Enquire Now Gold Pill */}
              <button
                onClick={() => onOpenEnquiry('Hero Primary CTA')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] hover:shadow-gold-glow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary: Explore Residences Glass Pill */}
              <button
                onClick={onExploreResidences}
                className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase text-neutral-200 bg-[#121721]/70 hover:bg-[#1A2230]/90 backdrop-blur-md border border-neutral-700/80 hover:border-gold-400/50 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <span>{secondaryCtaText}</span>
                <Eye className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Floating Signature Address & Highlights Glass Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] rounded-2xl sm:rounded-3xl bg-[#10151E]/80 backdrop-blur-xl border border-white/10 shadow-luxury-card p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:border-gold-400/30">
              
              {/* Subtle Ambient Gold Corner Glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header: Address & Tower Icon */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.24em] font-semibold text-gold-400 uppercase block">
                    {cardHeaderTitle}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-white tracking-wide mt-1">
                    {cardAddress}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-gold-400" />
                </div>
              </div>

              {/* Card Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700/80 to-transparent my-5 sm:my-6" />

              {/* 2x2 Highlights Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-xs font-sans font-semibold text-neutral-400 tracking-wider">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase mt-1.5 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700/80 to-transparent my-5 sm:my-6" />

              {/* Card Footer: Book Site Tour & Schedule CTA */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-[13px]">
                  <Calendar className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="font-light">{cardFooterLabel}</span>
                </div>
                <button
                  onClick={() => onOpenSiteTour('Signature Card')}
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-gold-400 hover:text-gold-200 uppercase transition-colors group cursor-pointer"
                >
                  <span>{cardActionText.replace('>', '').trim()}</span>
                  <span className="transition-transform group-hover:translate-x-1">&gt;</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Gradient Fading to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07090C] to-transparent pointer-events-none" />
    </section>
  );
}
