import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Download, Calendar, ShieldCheck } from 'lucide-react';

export default function Footer({ onAdminClick, onOpenEnquiry, onOpenBrochure, onOpenSiteTour }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSiteVisit = () => {
    if (onOpenSiteTour) {
      onOpenSiteTour('Footer Sunset Banner');
    } else if (onOpenEnquiry) {
      onOpenEnquiry('Schedule a Site Visit - Sunset Banner');
    }
  };

  const handleBrochure = () => {
    if (onOpenBrochure) {
      onOpenBrochure();
    } else if (onOpenEnquiry) {
      onOpenEnquiry('Download Brochure - Sunset Banner');
    }
  };

  return (
    <footer id="contact" className="relative text-neutral-300 font-sans select-none overflow-hidden">
      
      {/* ================= PRE-FOOTER SUNSET SKYLINE CTA BANNER ================= */}
      <div className="relative min-h-[290px] sm:min-h-[340px] flex items-center justify-center overflow-hidden">
        
        {/* Sunset Skyline Background Image - Positioned slightly lower to show sunset and skyline */}
        <img
          src="/images/sunset.jpeg"
          alt="Chembur Sunset Skyline"
          className="absolute inset-0 w-full h-full object-cover object-[center_32%] sm:object-[center_30%]"
        />

        {/* Balanced luxury overlay to gently tone down brightness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100B] via-black/45 to-black/45" />

        {/* Banner Content (Compact Length & Proportion) */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center flex flex-col items-center">
          
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#F6EFCF] uppercase mb-2.5 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            READY TO CALL IT HOME?
          </span>

          {/* Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Your Next Chapter Begins in Chembur
          </h2>

          {/* Dual Action Buttons with Luxury Gold Theme */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={handleSiteVisit}
              className="w-full sm:w-auto px-7 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-neutral-950 font-bold uppercase tracking-wider text-xs sm:text-[13px] transition-all duration-300 shadow-[0_8px_25px_rgba(212,175,55,0.35)] hover:shadow-gold-glow-lg hover:scale-105 cursor-pointer"
            >
              SCHEDULE A SITE VISIT
            </button>

            <button
              onClick={handleBrochure}
              className="w-full sm:w-auto px-7 sm:px-8 py-3 rounded-xl bg-black/45 hover:bg-black/75 text-[#F6EFCF] hover:text-white border border-gold-400/80 hover:border-gold-300 font-bold uppercase tracking-wider text-xs sm:text-[13px] transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-105 cursor-pointer"
            >
              DOWNLOAD BROCHURE
            </button>
          </div>

        </div>

      </div>

      {/* ================= MAIN FOOTER BODY (OUR LUXURY DARK/GOLD THEME) ================= */}
      <div className="bg-gradient-to-b from-[#18120C] via-[#0E0C09] to-[#07090C] border-t border-gold-500/30 pt-16 sm:pt-20 pb-12">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Column 1: Swastik Group Brand Logo & Tagline */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                {/* Swastik Group Stylized Flame Ribbon Icon */}
                <div className="flex-shrink-0 text-[#E5C178]">
                  <svg className="w-12 h-14" viewBox="0 0 50 60" fill="currentColor">
                    <path d="M12 50 C12 35, 22 25, 20 10 C18 18, 14 26, 8 36 C4 42, 6 48, 12 50 Z" opacity="0.75" />
                    <path d="M22 50 C22 35, 32 22, 28 6 C26 16, 22 26, 16 38 C12 44, 15 48, 22 50 Z" opacity="0.9" />
                    <path d="M32 50 C32 35, 42 20, 36 2 C34 14, 30 24, 24 38 C20 44, 24 49, 32 50 Z" />
                    <path d="M42 50 C42 38, 48 26, 44 12 C42 22, 38 30, 32 40 C28 46, 32 49, 42 50 Z" opacity="0.85" />
                  </svg>
                </div>

                <div className="flex flex-col leading-none">
                  <span className="font-serif font-black text-xl sm:text-2xl tracking-[0.16em] text-white">
                    SWASTIK
                  </span>
                  <span className="font-serif font-bold text-sm tracking-[0.24em] text-[#E5C178] mt-1">
                    GROUP
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mt-1">
                    BUILDERS & DEVELOPERS
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-xs sm:text-[13px] font-light leading-relaxed pt-2 max-w-sm">
                A legacy of trust. Building homes that endure for generations.
              </p>
            </div>

            {/* Column 2: Corporate Office */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold tracking-[0.18em] text-[#E5C178] uppercase block mb-3">
                CORPORATE OFFICE
              </span>
              
              <div className="text-xs text-neutral-300 font-light leading-relaxed space-y-1.5">
                <p>312, Swastik Group, Swastik Disa</p>
                <p>Corporate Park, L. B. S. Marg,</p>
                <p>Ghatkopar (West), Mumbai - 400086</p>
              </div>

              <div className="pt-2 space-y-1.5 text-xs text-neutral-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E5C178] flex-shrink-0" />
                  <a href="tel:02266890000" className="hover:text-gold-300 transition-colors">
                    022-6689 0000
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E5C178] flex-shrink-0" />
                  <a href="mailto:swastikgroup123@gmail.com" className="hover:text-gold-300 transition-colors">
                    swastikgroup123@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Column 3: Swastik Sales Office */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold tracking-[0.18em] text-[#E5C178] uppercase block mb-3">
                SWASTIK SALES OFFICE
              </span>
              
              <div className="text-xs text-neutral-300 font-light leading-relaxed space-y-1.5">
                <p>Swastik Bliss, Building no. 52, Adarsh</p>
                <p>Sapna CHS, Subhash Nagar,</p>
                <p>Chembur, Mumbai - 400071</p>
              </div>

              <div className="pt-2 space-y-1.5 text-xs text-neutral-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E5C178] flex-shrink-0" />
                  <span className="hover:text-gold-300 transition-colors">
                    <a href="tel:02250647478">022-5064 7478</a> • <a href="tel:9833108988">98331 08988</a>
                  </span>
                </p>
              </div>
            </div>

            {/* Column 4: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold tracking-[0.18em] text-[#E5C178] uppercase block mb-3">
                QUICK LINKS
              </span>

              <ul className="space-y-2 text-xs font-light">
                <li><a href="#project" className="hover:text-gold-300 transition-colors">About the Project</a></li>
                <li><a href="#residences" className="hover:text-gold-300 transition-colors">Floor Plans</a></li>
                <li><a href="#amenities" className="hover:text-gold-300 transition-colors">Amenities</a></li>
                <li><a href="#connectivity" className="hover:text-gold-300 transition-colors">Connectivity</a></li>
                <li><a href="#developer" className="hover:text-gold-300 transition-colors">About Developer</a></li>
                <li>
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry('Footer Quick Link Contact')}
                    className="hover:text-gold-300 transition-colors text-left cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-gold-400 text-neutral-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                  title="Scroll to top"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
                  <span>Back to top</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= BOTTOM COPYRIGHT & LEGAL BAR ================= */}
      <div className="border-t border-neutral-800/80 bg-[#050608] py-5 px-4 sm:px-6">
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500 font-light">
          <p>© {new Date().getFullYear()} Swastik Group. All Rights Reserved.</p>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="hover:text-neutral-400 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-neutral-400 transition-colors">Terms & Conditions</span>
            <span>•</span>
            <span>MahaRERA Registration No: P51800049182</span>
            <span>•</span>
            <button
              onClick={onAdminClick}
              className="text-gold-400/80 hover:text-gold-300 font-medium transition-colors cursor-pointer"
            >
              CMS Admin
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
