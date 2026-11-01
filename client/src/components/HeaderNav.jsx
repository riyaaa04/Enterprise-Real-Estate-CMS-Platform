import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Menu, X, ShieldCheck } from 'lucide-react';

export default function HeaderNav({ navigationData, onOpenEnquiry, onOpenBrochure, onAdminClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = navigationData?.navLinks || [
    { label: 'HOME', href: '#home', active: true },
    { label: 'PROJECT', href: '#project' },
    { label: 'CONNECTIVITY', href: '#connectivity' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'AMENITIES', href: '#amenities' },
    { label: 'RESIDENCES', href: '#residences' },
    { label: 'DEVELOPER', href: '#developer' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      {/* Top Floating Glass Pill */}
      <div className={`w-full max-w-[1340px] rounded-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E131A]/95 backdrop-blur-xl border border-gold-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-2 sm:py-2.5 px-4 sm:px-6'
          : 'bg-[#121721]/90 backdrop-blur-md border border-neutral-700/60 shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-2.5 sm:py-3 px-4 sm:px-7'
      } flex items-center justify-between`}>
        
        {/* Brand: CODENAME below ONE then CHEMBUR (Logo removed) */}
        <a href="#home" className="flex flex-col text-left leading-none justify-center group py-0.5">
          <span className="text-[9px] sm:text-[10px] tracking-[0.26em] text-gold-400/90 font-medium uppercase">
            {navigationData?.brandSuper?.replace(/•\s*$/, '').trim() || 'CODENAME'}
          </span>
          <span className="text-sm sm:text-base font-serif font-bold tracking-[0.18em] text-white group-hover:text-gold-200 transition-colors mt-0.5">
            {navigationData?.brandMain || 'ONE'}
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-neutral-400 uppercase font-light mt-0.5">
            {navigationData?.brandSub?.split('•')[0]?.trim() || 'CHEMBUR'}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] xl:text-xs tracking-[0.16em] font-medium">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                item.active
                  ? 'text-gold-400 font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {item.active && <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-gold-glow" />}
              {item.label}
            </a>
          ))}

          {/* Brochure Link with Icon */}
          <button
            onClick={onOpenBrochure}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-gold-300 transition-colors py-1 pl-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gold-400" />
            <span>{navigationData?.brochureText || 'BROCHURE'}</span>
          </button>
        </nav>

        {/* Right CTA Button & Admin Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick CMS Admin Entry (Small discrete gold key) */}
          <button
            onClick={onAdminClick}
            title="Open Admin CMS"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-obsidian-800/80 border border-neutral-700/80 text-neutral-300 hover:text-gold-300 hover:border-gold-400/50 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>CMS</span>
          </button>

          {/* Enquire Now Golden Pill */}
          <button
            onClick={() => onOpenEnquiry('Header Nav')}
            className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>{navigationData?.enquireText || 'ENQUIRE NOW'}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white bg-obsidian-800/80 border border-neutral-700"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-obsidian-900/98 backdrop-blur-2xl border border-gold-400/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-center z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 text-sm tracking-widest font-medium uppercase ${
                item.active ? 'text-gold-400 font-bold' : 'text-neutral-200 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-neutral-800 my-1" />
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBrochure();
            }}
            className="flex items-center justify-center gap-2 text-sm text-gold-300 py-2 tracking-widest uppercase font-medium"
          >
            <Download className="w-4 h-4 text-gold-400" />
            <span>DOWNLOAD BROCHURE</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onAdminClick();
            }}
            className="flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-gold-300 py-1 tracking-widest uppercase"
          >
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>ADMIN CMS PORTAL</span>
          </button>
        </div>
      )}
    </header>
  );
}
