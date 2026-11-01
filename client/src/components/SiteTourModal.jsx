import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Car, Sparkles } from 'lucide-react';
import { apiUrl, saveLocalInquiry } from '../utils/api';

export default function SiteTourModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '2026-11-05',
    timeSlot: '11:00 AM - Morning Light Tour',
    needChauffeur: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and contact phone number.');
      return;
    }

    setLoading(true);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'guest@walkthrough.com',
      source: 'Signature Card: Exclusive Site Tour',
      siteTourDate: `${formData.date} (${formData.timeSlot})`,
      message: `Requested exclusive site tour on ${formData.date} at ${formData.timeSlot}. Chauffeur pickup: ${formData.needChauffeur ? 'Yes' : 'No'}.`,
    };

    try {
      await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Network issue saving tour booking to server, preserved locally:', err);
      saveLocalInquiry(payload);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0F141F] border border-gold-400/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        <button
          onClick={onClose}
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
              Private Tour Reserved
            </h3>
            <p className="text-neutral-300 text-sm mt-3 max-w-sm font-light leading-relaxed">
              We look forward to welcoming you at <span className="text-gold-300 font-semibold">Subhash Nagar, Chembur</span> on <span className="text-white font-semibold">{formData.date}</span> at <span className="text-gold-300 font-semibold">{formData.timeSlot}</span>. A concierge confirmation has been dispatched.
            </p>
            <div className="mt-8">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all cursor-pointer"
              >
                CLOSE CONFIRMATION
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] font-semibold tracking-widest text-gold-400 uppercase mb-2">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>PRIVATE VIP SHOWCASE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Schedule Exclusive Site Tour
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1">
                Walk through the 40-storey sample suites and the 25K sq.ft Sky Clubhouse.
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
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Mobile Phone *
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
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium tracking-wider text-neutral-300 uppercase block mb-1">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="11:00 AM - Morning Light Tour">11:00 AM (Morning Tour)</option>
                      <option value="02:30 PM - Afternoon Tour">02:30 PM (Afternoon Tour)</option>
                      <option value="05:30 PM - Sunset Dusk View Tour">05:30 PM (Sunset Dusk Tour)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#151C28] border border-neutral-800">
                <input
                  type="checkbox"
                  id="chauffeur"
                  checked={formData.needChauffeur}
                  onChange={(e) => setFormData({ ...formData, needChauffeur: e.target.checked })}
                  className="rounded border-neutral-700 text-gold-400 focus:ring-gold-400 w-4 h-4"
                />
                <label htmlFor="chauffeur" className="text-xs text-neutral-300 flex items-center gap-2 cursor-pointer select-none">
                  <Car className="w-4 h-4 text-gold-400" />
                  <span>Request complimentary luxury chauffeur pickup & drop within Mumbai</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <span>{loading ? 'CONFIRMING SLOT...' : 'CONFIRM SITE TOUR RESERVATION'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
