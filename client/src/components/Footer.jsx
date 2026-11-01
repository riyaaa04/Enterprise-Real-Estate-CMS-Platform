import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ onAdminClick, onOpenEnquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#05070A] border-t border-neutral-800 text-neutral-400 text-xs font-light">
      {/* Upper Footer */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-gold-400/50 bg-[#151C28] flex items-center justify-center">
                <span className="font-serif italic font-bold text-xl text-gold-300">I</span>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] tracking-[0.25em] text-gold-400 font-medium uppercase">CODENAME •</span>
                <span className="text-base font-serif font-bold tracking-[0.18em] text-white mt-0.5">ONE</span>
                <span className="text-[8px] tracking-[0.28em] text-neutral-400 uppercase mt-0.5">CHEMBUR • MUMBAI</span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-2">
              Ultra-luxury bespoke 3 & 4 BHK landmark residences designed for effortless grandeur and timeless tranquility. Soaring 40 storeys above Subhash Nagar, Chembur.
            </p>

            <div className="pt-2 text-neutral-300 text-xs space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Site Address: Subhash Nagar, Chembur, Mumbai, Maharashtra 400071</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Private Sales Desk: +91 22 6820 4400</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>Concierge: contact@codenameone-chembur.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block mb-3">
              EXPLORE RESIDENCES
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-gold-300 transition-colors">The Landmark Tower</a></li>
              <li><a href="#project" className="hover:text-gold-300 transition-colors">Architectural Masterplan</a></li>
              <li><a href="#residences" className="hover:text-gold-300 transition-colors">3 & 4 BHK Floor Configurations</a></li>
              <li><a href="#amenities" className="hover:text-gold-300 transition-colors">25K Sq.Ft Sky Clubhouse</a></li>
              <li><a href="#connectivity" className="hover:text-gold-300 transition-colors">Chembur Transit Advantage</a></li>
              <li><a href="#gallery" className="hover:text-gold-300 transition-colors">Curated Dusk Gallery</a></li>
              <li><a href="#developer" className="hover:text-gold-300 transition-colors">Developer Track Record</a></li>
            </ul>
          </div>

          {/* MahaRERA & Compliance */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-semibold tracking-widest text-gold-400 uppercase block mb-3">
              RERA REGISTRATION & COMPLIANCE
            </span>
            <div className="p-4 rounded-xl bg-[#0F141F] border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-medium text-xs">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>MahaRERA: P51800049182</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal font-light">
                This project is registered under MahaRERA as "Codename ONE Chembur". Details are available on the website <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="text-gold-400 underline">maharera.mahaonline.gov.in</a> under registered projects.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onOpenEnquiry('Footer VIP Form')}
                className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#151C28] text-gold-300 border border-gold-400/30 hover:bg-gold-400 hover:text-black transition-all cursor-pointer"
              >
                REQUEST CALLBACK
              </button>

              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-gold-400 transition-colors"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 bg-[#030406] py-6 px-4 sm:px-6">
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Codename ONE Chembur. All rights reserved. Architectural artistic impressions shown are representative.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Use</a>
            <span>•</span>
            <button
              onClick={onAdminClick}
              className="text-gold-400/80 hover:text-gold-300 font-medium transition-colors cursor-pointer"
            >
              CMS Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
