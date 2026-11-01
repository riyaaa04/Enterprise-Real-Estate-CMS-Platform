import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Phone, Mail, User, Sparkles } from 'lucide-react';
import { apiUrl, saveLocalInquiry } from '../utils/api';

export default function InquiryModal({ isOpen, onClose, defaultSource = 'Hero CTA' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bhkPreference: '3 & 4 BHK',
    budget: '₹ 5 - 8 Cr',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      source: defaultSource,
    };

    try {
      const res = await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        saveLocalInquiry(payload);
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('Network issue saving inquiry to server, preserved in local storage:', err);
      saveLocalInquiry(payload);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      bhkPreference: '3 & 4 BHK',
      budget: '₹ 5 - 8 Cr',
      message: '',
    });
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0F141F] border border-gold-400/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white bg-obsidian-800 border border-neutral-700 hover:border-gold-400 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 border border-gold-400/50 flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
              Privilege Inquiry Confirmed
            </h3>
            <p className="text-neutral-300 text-sm mt-3 max-w-sm font-light leading-relaxed">
              Thank you, <span className="text-gold-300 font-semibold">{formData.name}</span>. Our Senior Private Relationship Officer will reach you at <span className="text-gold-300 font-semibold">{formData.phone}</span> shortly with exclusive pricing and suite availability.
            </p>
            <div className="mt-8">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all cursor-pointer"
              >
                RETURN TO OVERVIEW
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] font-semibold tracking-widest text-gold-400 uppercase mb-2">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>EXECUTIVE INQUIRY</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Enquire for Codename ONE
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1">
                Subhash Nagar, Chembur • Landmark 3 & 4 BHK Residences
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/50 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Suite Preference
                  </label>
                  <select
                    value={formData.bhkPreference}
                    onChange={(e) => setFormData({ ...formData, bhkPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="1 RK Classic">1 RK Classic (285 Sq.Ft Carpet | 330 Sq.Ft Total)</option>
                    <option value="1 BHK Grand">1 BHK Grand (385 Sq.Ft Carpet | 450 Sq.Ft Total)</option>
                    <option value="2 BHK Alto">2 BHK Alto (585 Sq.Ft Carpet | 670 Sq.Ft Total)</option>
                    <option value="All Configurations">All Configurations</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Budget Preference
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    <option value="₹ 4.8 - 6 Cr">₹ 4.85 - 6 Cr</option>
                    <option value="₹ 6 - 8 Cr">₹ 6 - 8 Cr</option>
                    <option value="₹ 8 Cr+">₹ 8 Cr and above</option>
                    <option value="Undisclosed">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                  Custom Notes / Questions
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us about floor height, view preference, or specific timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-neutral-950 hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'SUBMITTING INQUIRY...' : 'CONFIRM VIP INQUIRY'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Confidential • Direct Developer Representation • No Broker Spam</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
