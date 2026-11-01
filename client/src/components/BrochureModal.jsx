import React, { useState } from 'react';
import { X, DownloadCloud, CheckCircle2, FileText, Lock, Sparkles } from 'lucide-react';
import { apiUrl, saveLocalInquiry } from '../utils/api';

export default function BrochureModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'brochure-download@guest.com',
      source: 'Header Nav: Brochure Download',
      message: 'Downloaded digital project brochure dossier.',
    };

    saveLocalInquiry(payload);

    try {
      await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setDownloaded(true);
    } catch (err) {
      console.warn('Network issue saving brochure inquiry to server, preserved locally:', err);
      setDownloaded(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0F141F] border border-gold-400/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white bg-obsidian-800 border border-neutral-700 hover:border-gold-400 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {downloaded ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 border border-gold-400/50 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="font-serif text-2xl text-white font-medium">
              Dossier Ready
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-2 max-w-xs font-light leading-relaxed">
              The high-resolution architectural dossier has been unlocked for <span className="text-gold-300 font-semibold">{formData.name}</span>.
            </p>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('Brochure download initiated: Codename_ONE_Chembur_Brochure.pdf');
                onClose();
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>DOWNLOAD PDF DOSSIER (18.4 MB)</span>
            </a>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] font-semibold tracking-widest text-gold-400 uppercase mb-2">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>OFFICIAL BROCHURE</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-normal">
                Download Project Dossier
              </h3>
              <p className="text-neutral-400 text-xs font-light mt-1">
                Access full architectural renderings, floor layout dimensions, and unit price guides.
              </p>
            </div>

            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                  Mobile Number (To receive PDF on WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>{loading ? 'GENERATING LINK...' : 'UNLOCK DIGITAL DOSSIER'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1">
                <Lock className="w-3 h-3 text-gold-400" />
                <span>Zero spam guarantee. Immediate direct PDF access.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
