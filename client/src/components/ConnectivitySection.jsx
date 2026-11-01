import React, { useState, useMemo } from 'react';
import { 
  MapPin, Clock, Sparkles, Maximize2, X, Download, 
  Plus, Minus, RotateCcw, Search, ArrowRight, 
  Train, GraduationCap, ShoppingBag, Layers, Car, Compass, Zap
} from 'lucide-react';

export default function ConnectivitySection({ connectivityData, onOpenEnquiry }) {
  // Map filter layers: 'cadastral' | 'transit' | 'isochrone'
  const [activeLayer, setActiveLayer] = useState('cadastral');
  
  // Category tabs: 'all' | 'transit' | 'education' | 'lifestyle'
  const [activeTab, setActiveTab] = useState('education');

  // Interactive Map zoom state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [highlightedItem, setHighlightedItem] = useState(null);

  // Commute calculator state
  const [commuteInput, setCommuteInput] = useState('');
  const [commuteResult, setCommuteResult] = useState(null);

  // Lightbox for original survey map
  const [surveyMapModalOpen, setSurveyMapModalOpen] = useState(false);

  // Preset commute lookup table
  const commuteDatabase = [
    { name: 'BKC', match: ['bkc', 'bandra kurla', 'kurla complex'], time: '12-15 Mins', route: 'Via BKC-Chembur Elevated Connector (Signal-Free)', icon: 'Car' },
    { name: 'Eastern Freeway / Fort', match: ['freeway', 'fort', 'cst', 'colaba', 'south mumbai'], time: '15-18 Mins', route: 'Via Eastern Freeway Direct Ramp', icon: 'Car' },
    { name: 'Lower Parel / Worli', match: ['lower parel', 'worli', 'prabhadevi', 'currey road'], time: '18-22 Mins', route: 'Via SCLR & Eastern Express Highway', icon: 'Car' },
    { name: 'International Airport', match: ['airport', 'csmia', 't2', 'sahar', 'santacruz'], time: '22-25 Mins', route: 'Via Santa Cruz–Chembur Link Road (SCLR)', icon: 'Plane' },
    { name: 'Navi Mumbai / Vashi', match: ['vashi', 'navi mumbai', 'belapur', 'airoli'], time: '15-20 Mins', route: 'Via Sion-Panvel Highway', icon: 'Car' },
    { name: 'Powai / SEEPZ', match: ['powai', 'seepz', 'hiranandani', 'kanjurmarg'], time: '20-25 Mins', route: 'Via JVLR / Eastern Express Highway', icon: 'Car' },
    { name: 'Andheri East', match: ['andheri', 'midc', 'chakala', 'marol'], time: '25-30 Mins', route: 'Via SCLR & Western Express Highway', icon: 'Car' }
  ];

  const handleCalculateCommute = (e) => {
    e?.preventDefault();
    if (!commuteInput.trim()) return;
    const query = commuteInput.toLowerCase().trim();
    const found = commuteDatabase.find(c => c.match.some(m => query.includes(m)));
    if (found) {
      setCommuteResult(found);
    } else {
      setCommuteResult({
        name: commuteInput,
        time: '18-25 Mins',
        route: 'Direct arterial connectivity via Chembur Central Junction',
        icon: 'Car'
      });
    }
  };

  // Full 21 destinations across the 3 categories
  const allDestinations = useMemo(() => [
    // Education (8)
    { id: 'edu-1', name: 'AFAC English High School', time: '1 min', category: 'education', fast: true, coords: { x: 270, y: 195 } },
    { id: 'edu-2', name: 'St. Antony’s Girls High School', time: '1 min', category: 'education', fast: true, coords: { x: 285, y: 255 } },
    { id: 'edu-3', name: 'Our Lady of Perpetual Succour High School', time: '2 min', category: 'education', fast: true, coords: { x: 250, y: 280 } },
    { id: 'edu-4', name: 'St. Gregorios High School', time: '5 min', category: 'education', coords: { x: 310, y: 155 } },
    { id: 'edu-5', name: 'Shah & Anchor Campus', time: '7 min', category: 'education', coords: { x: 380, y: 220 } },
    { id: 'edu-6', name: 'Swami Vivekanand School & College', time: '8 min', category: 'education', coords: { x: 190, y: 310 } },
    { id: 'edu-7', name: 'Ryan International', time: '12 min', category: 'education', coords: { x: 140, y: 370 } },
    { id: 'edu-8', name: 'RBK International', time: '12 min', category: 'education', coords: { x: 110, y: 390 } },

    // Transit (7)
    { id: 'tra-1', name: 'Chembur Railway Station', time: '5 min', category: 'transit', coords: { x: 225, y: 115 } },
    { id: 'tra-2', name: 'Chembur Monorail Station', time: '5 min', category: 'transit', coords: { x: 105, y: 145 } },
    { id: 'tra-3', name: 'Eastern Freeway Direct Ramp', time: '7 min', category: 'transit', coords: { x: 415, y: 220 } },
    { id: 'tra-4', name: 'Upcoming Metro Station (Line 2B)', time: '8 min', category: 'transit', coords: { x: 200, y: 315 } },
    { id: 'tra-5', name: 'Santacruz–Chembur Link Road (SCLR)', time: '10 min', category: 'transit', coords: { x: 80, y: 195 } },
    { id: 'tra-6', name: 'BKC Commercial Hub', time: '15 min', category: 'transit', coords: { x: 60, y: 240 } },
    { id: 'tra-7', name: 'Chhatrapati Shivaji Intl Airport', time: '25 min', category: 'transit', coords: { x: 50, y: 170 } },

    // Lifestyle (6)
    { id: 'lif-1', name: 'K-Star Mall', time: '5 min', category: 'lifestyle', coords: { x: 210, y: 175 } },
    { id: 'lif-2', name: 'Westside Lifestyle Store', time: '5 min', category: 'lifestyle', coords: { x: 215, y: 195 } },
    { id: 'lif-3', name: 'Movie Time Cinema', time: '6 min', category: 'lifestyle', coords: { x: 235, y: 210 } },
    { id: 'lif-4', name: 'Fun Cinemas', time: '7 min', category: 'lifestyle', coords: { x: 260, y: 225 } },
    { id: 'lif-5', name: 'R City Mall (Ghatkopar)', time: '15 min', category: 'lifestyle', coords: { x: 160, y: 70 } },
    { id: 'lif-6', name: 'Phoenix Market City (Kurla)', time: '17 min', category: 'lifestyle', coords: { x: 90, y: 110 } }
  ], []);

  // Filtered destinations based on tab
  const displayedDestinations = useMemo(() => {
    if (activeTab === 'all') return allDestinations;
    return allDestinations.filter(d => d.category === activeTab);
  }, [activeTab, allDestinations]);

  // Counts
  const counts = {
    all: allDestinations.length,
    transit: allDestinations.filter(d => d.category === 'transit').length,
    education: allDestinations.filter(d => d.category === 'education').length,
    lifestyle: allDestinations.filter(d => d.category === 'lifestyle').length
  };

  const activeCategoryTitle = {
    all: 'ALL INFRASTRUCTURE & HUBS',
    transit: 'TRANSIT & STRATEGIC CONNECTIVITY',
    education: 'EDUCATION & ACADEMICS',
    lifestyle: 'RECREATION & LIFESTYLE'
  }[activeTab];

  const activeCategorySubtitle = {
    all: `${counts.all} Prime City Nodes`,
    transit: `${counts.transit} Transit Hubs & Corridors`,
    education: `${counts.education} Schools & Colleges`,
    lifestyle: `${counts.lifestyle} Malls & Retail Hubs`
  }[activeTab];

  return (
    <section id="connectivity" className="py-20 sm:py-28 bg-gradient-to-br from-[#ECCF8E] via-[#D4AF37] to-[#B8860B] border-y border-gold-600/40 relative overflow-hidden select-none">
      
      {/* Subtle luxury metallic light reflection overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with deep bold typography on signature gold container */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-md border border-neutral-900/60 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#F6EFCF] uppercase mb-3.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>LOCATION & CONNECTIVITY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
            What if your home is as well connected as your ambitions?
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-900 font-semibold mt-2.5">
            This is the one.
          </p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: MAP & COMMUTE CALCULATOR ==================== */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* The Cadastral Dark Map Card */}
            <div className="rounded-2xl bg-[#0D121B] border border-neutral-800 shadow-2xl p-4 sm:p-5 relative overflow-hidden">
              
              {/* Map Header Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-bold tracking-[0.14em] text-neutral-200 uppercase">
                    SUBHASH NAGAR ENCLAVE, CHEMBUR
                  </span>
                </div>

                {/* Layer Switcher Pills */}
                <div className="flex items-center gap-1 bg-[#141A25] p-1 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => setActiveLayer('cadastral')}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                      activeLayer === 'cadastral'
                        ? 'bg-[#E5C178] text-neutral-950 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cadastral Grid
                  </button>
                  <button
                    onClick={() => setActiveLayer('transit')}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                      activeLayer === 'transit'
                        ? 'bg-[#E5C178] text-neutral-950 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Transit Overlay
                  </button>
                  <button
                    onClick={() => setActiveLayer('isochrone')}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                      activeLayer === 'isochrone'
                        ? 'bg-[#E5C178] text-neutral-950 shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    5–10 Min Isochrone
                  </button>
                </div>
              </div>

              {/* Vector Map Canvas */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#090D14] rounded-xl overflow-hidden mt-3.5 border border-neutral-800/80 group">
                
                {/* SVG Blueprint Map */}
                <svg
                  viewBox="0 0 500 380"
                  className="w-full h-full transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <defs>
                    {/* Dark Blueprint Grid Pattern */}
                    <pattern id="cadastralGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#141C2B" strokeWidth="0.8" />
                    </pattern>

                    {/* Radial Isochrone Gradients */}
                    <radialGradient id="isochrone5" cx="72%" cy="37%" r="35%">
                      <stop offset="0%" stopColor="#E5C178" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#E5C178" stopOpacity="0.02" />
                    </radialGradient>
                    <radialGradient id="isochrone10" cx="72%" cy="37%" r="65%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                    </radialGradient>

                    {/* Gold Pin Pulse Glow */}
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Base Blueprint Grid */}
                  <rect width="500" height="380" fill="#090D14" />
                  <rect width="500" height="380" fill="url(#cadastralGrid)" />

                  {/* Layer: 5-10 Min Isochrone Rings */}
                  {activeLayer === 'isochrone' && (
                    <g className="animate-in fade-in duration-500">
                      <circle cx="360" cy="140" r="160" fill="url(#isochrone10)" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
                      <circle cx="360" cy="140" r="85" fill="url(#isochrone5)" stroke="#E5C178" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.8" />
                      <text x="360" y="240" fill="#E5C178" fontSize="9" fontWeight="bold" letterSpacing="1">5-MIN COMMUTE ZONE</text>
                      <text x="360" y="315" fill="#38BDF8" fontSize="9" fontWeight="bold" letterSpacing="1">10-MIN COMMUTE ZONE</text>
                    </g>
                  )}

                  {/* Parks & Open Greens (Ambedkar, Gandhi Maidan, Diamond Garden) */}
                  <g id="greens">
                    {/* Ambedkar Garden */}
                    <path
                      d="M 160 120 C 180 115, 195 125, 190 145 C 185 160, 165 165, 150 155 C 140 145, 145 125, 160 120 Z"
                      fill="#064E3B"
                      fillOpacity="0.45"
                      stroke="#059669"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text x="172" y="142" fill="#34D399" fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.5">
                      AMBEDKAR GARDEN
                    </text>

                    {/* Gandhi Maidan */}
                    <path
                      d="M 135 190 C 150 185, 160 195, 155 210 C 150 220, 135 225, 125 215 C 120 205, 125 192, 135 190 Z"
                      fill="#064E3B"
                      fillOpacity="0.4"
                      stroke="#059669"
                      strokeWidth="0.8"
                    />
                    <text x="142" y="206" fill="#34D399" fontSize="6" fontWeight="500" textAnchor="middle">
                      GANDHI MAIDAN
                    </text>

                    {/* Diamond Garden */}
                    <path
                      d="M 155 260 C 175 255, 185 265, 180 285 C 175 300, 155 305, 145 295 C 140 280, 145 262, 155 260 Z"
                      fill="#064E3B"
                      fillOpacity="0.45"
                      stroke="#059669"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text x="165" y="284" fill="#34D399" fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.5">
                      DIAMOND GARDEN
                    </text>
                  </g>

                  {/* Primary Arterials & Street Geometry */}
                  <g id="roads" stroke="#2A384E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Amar Mahal Flyover / SCLR (Top-left diagonal) */}
                    <line x1="20" y1="50" x2="220" y2="15" stroke="#475569" strokeWidth="3.5" />
                    
                    {/* Sion-Chembur / Central Link Corridor (Vertical spine) */}
                    <line x1="172" y1="20" x2="172" y2="350" stroke="#334155" strokeWidth="3" />
                    <text x="167" y="235" fill="#64748B" fontSize="6" fontWeight="bold" transform="rotate(-90 167 235)" letterSpacing="1">
                      MAHESHWARI UDYAN / SION-CHEMBUR LINK
                    </text>

                    {/* Southern Arterial (V.N. Purav Marg / Diamond Circle) */}
                    <line x1="20" y1="290" x2="250" y2="320" stroke="#334155" strokeWidth="3" />
                    <line x1="250" y1="320" x2="480" y2="330" stroke="#334155" strokeWidth="3" />

                    {/* Subhash Nagar Cadastral Residential Road Grid */}
                    <line x1="172" y1="135" x2="330" y2="135" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="132" fill="#475569" fontSize="5.5" letterSpacing="0.5">ROAD NO. 15</text>

                    <line x1="172" y1="165" x2="330" y2="165" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="162" fill="#475569" fontSize="5.5" letterSpacing="0.5">ROAD NO. 14</text>

                    <line x1="172" y1="195" x2="340" y2="195" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="192" fill="#475569" fontSize="5.5" letterSpacing="0.5">ROAD NO. 13</text>

                    <line x1="172" y1="225" x2="340" y2="225" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="222" fill="#475569" fontSize="5.5" letterSpacing="0.5">ROAD NO. 12</text>

                    <line x1="172" y1="250" x2="330" y2="250" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="247" fill="#475569" fontSize="5.5" letterSpacing="0.5">ROAD NO. 11</text>

                    {/* St. Anthony's Road */}
                    <line x1="172" y1="270" x2="310" y2="270" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="260" y="267" fill="#475569" fontSize="5" letterSpacing="0.5">ST. ANTHONY’S ROAD</text>
                  </g>

                  {/* Transit Overlay: Freeway, Monorail & Metro Lines */}
                  <g id="transit-network">
                    {/* Eastern Freeway (Diagonal amber dashed line) */}
                    <line
                      x1="60"
                      y1="90"
                      x2="480"
                      y2="245"
                      stroke="#E5C178"
                      strokeWidth="2.2"
                      strokeDasharray="6,4"
                      opacity="0.85"
                    />
                    <circle cx="395" cy="216" r="3" fill="#E5C178" />
                    <text x="403" y="214" fill="#E5C178" fontSize="6.5" fontWeight="bold">Eastern Freeway</text>
                    <text x="403" y="222" fill="#A38852" fontSize="5">7 Mins Direct to South Mumbai</text>

                    {/* Chembur Monorail Track (Cyan dotted line) */}
                    <path
                      d="M 50 120 L 105 145 L 140 210 L 175 320"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeDasharray="4,3"
                      opacity="0.8"
                    />

                    {/* Upcoming Metro Line 2B (Cyan dashed line along bottom) */}
                    <line
                      x1="120"
                      y1="340"
                      x2="450"
                      y2="340"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      strokeDasharray="5,4"
                      opacity="0.75"
                    />
                  </g>

                  {/* Transit Station Nodes */}
                  {/* Chembur Railway Station */}
                  <g id="stn-chembur-rail">
                    <circle cx="215" cy="115" r="4.5" fill="#E5C178" stroke="#090D14" strokeWidth="1.5" />
                    <rect x="225" y="106" width="95" height="18" rx="3" fill="#0D121B" stroke="#E5C178" strokeWidth="0.8" opacity="0.95" />
                    <text x="230" y="116" fill="#F4ECE3" fontSize="6.5" fontWeight="bold">Chembur Railway Station</text>
                    <text x="230" y="122" fill="#E5C178" fontSize="5" fontWeight="bold">5 MIN COMMUTE</text>
                  </g>

                  {/* Chembur Monorail Station */}
                  <g id="stn-chembur-monorail">
                    <circle cx="105" cy="145" r="5" fill="#090D14" stroke="#38BDF8" strokeWidth="2" />
                    <circle cx="105" cy="145" r="2" fill="#38BDF8" />
                    <text x="50" y="138" fill="#E2E8F0" fontSize="6" fontWeight="bold">Chembur Monorail</text>
                    <text x="75" y="145" fill="#38BDF8" fontSize="5">5 MIN</text>
                  </g>

                  {/* Upcoming Metro Station */}
                  <g id="stn-chembur-metro">
                    <circle cx="195" cy="318" r="5" fill="#090D14" stroke="#38BDF8" strokeWidth="2" />
                    <circle cx="195" cy="318" r="2" fill="#38BDF8" />
                    <text x="206" y="318" fill="#E2E8F0" fontSize="6" fontWeight="bold">Upcoming Metro Station</text>
                    <text x="206" y="325" fill="#38BDF8" fontSize="5">8 MIN</text>
                  </g>

                  {/* Landmark: OLPS Church & School */}
                  <g id="stn-olps">
                    <circle cx="245" cy="272" r="3" fill="#E5C178" />
                    <text x="252" y="274" fill="#CBD5E1" fontSize="5.5">Our Lady of Perpetual Succour (OLPS) — 2 min</text>
                  </g>

                  {/* Compass in Top Right */}
                  <g id="compass" transform="translate(460, 35)">
                    <circle cx="0" cy="0" r="10" fill="#0D121B" stroke="#334155" strokeWidth="0.8" />
                    <path d="M 0 -8 L 3 0 L 0 -2 L -3 0 Z" fill="#E5C178" />
                    <path d="M 0 8 L 3 0 L 0 2 L -3 0 Z" fill="#64748B" />
                    <text x="0" y="-11" fill="#E5C178" fontSize="6" fontWeight="bold" textAnchor="middle">N</text>
                  </g>

                  {/* Dynamic Marker when item is highlighted from the right list */}
                  {highlightedItem?.coords && (
                    <g id="highlighted-point" transform={`translate(${highlightedItem.coords.x}, ${highlightedItem.coords.y})`}>
                      <circle cx="0" cy="0" r="14" fill="#E5C178" fillOpacity="0.3" className="animate-ping" />
                      <circle cx="0" cy="0" r="5" fill="#E5C178" stroke="#000" strokeWidth="1.5" />
                      <rect x="-40" y="-22" width="80" height="14" rx="3" fill="#000" fillOpacity="0.9" stroke="#E5C178" strokeWidth="0.8" />
                      <text x="0" y="-13" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle">{highlightedItem.name.slice(0, 16)}...</text>
                    </g>
                  )}

                  {/* ================= PROJECT CALLOUT PIN: SWASTIK BLISS / CODENAME ONE ================= */}
                  <g id="project-marker">
                    {/* Concentric Pulsing Radar Rings */}
                    <circle cx="360" cy="140" r="28" fill="#E5C178" fillOpacity="0.08" />
                    <circle cx="360" cy="140" r="18" fill="#E5C178" fillOpacity="0.15" />
                    <circle cx="360" cy="140" r="8" fill="#E5C178" fillOpacity="0.4" />
                    <circle cx="360" cy="140" r="3.5" fill="#E5C178" stroke="#FFF" strokeWidth="1" filter="url(#goldGlow)" />

                    {/* Connecting Pin Line */}
                    <line x1="360" y1="140" x2="360" y2="120" stroke="#E5C178" strokeWidth="1.5" />

                    {/* Luxury Floating Badge */}
                    <g transform="translate(360, 105)">
                      <rect
                        x="-58"
                        y="-26"
                        width="116"
                        height="30"
                        rx="4"
                        fill="#0B0F17"
                        stroke="#E5C178"
                        strokeWidth="1.2"
                        filter="url(#goldGlow)"
                      />
                      <text x="0" y="-12" fill="#FBF7EE" fontSize="8.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
                        SWASTIK BLISS
                      </text>
                      <text x="0" y="-3" fill="#E5C178" fontSize="6" fontWeight="600" textAnchor="middle" letterSpacing="1.2">
                        CODENAME ONE
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Bottom Bar Controls inside the Map Frame */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
                  
                  {/* Left Pill: Location Enclave */}
                  <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-[11px] font-medium text-neutral-200 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Chembur East, Prime Central Enclave</span>
                  </div>

                  {/* Middle Pill: BKC Commute highlight */}
                  <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-gold-400/40 text-[11px] font-semibold text-gold-300 shadow-md">
                    <Zap className="w-3.5 h-3.5 text-gold-400" />
                    <span>15 Min to BKC Commercial Hub</span>
                  </div>

                  {/* Right: Map Zoom & Lightbox Controls */}
                  <div className="pointer-events-auto flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md p-1 rounded-lg border border-neutral-700/80 shadow-md">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
                      title="Zoom In"
                      className="p-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.9))}
                      title="Zoom Out"
                      className="p-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      title="Reset Zoom"
                      className="p-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <div className="w-px h-3.5 bg-neutral-700 mx-0.5" />
                    <button
                      onClick={() => setSurveyMapModalOpen(true)}
                      title="View Survey Roadmap"
                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-gold-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      SURVEY MAP
                    </button>
                  </div>
                </div>

              </div>

              {/* Map Legend Bar */}
              <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5C178]" />
                    <span>Primary Arteries</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span>Metro & Rail</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                    <span>Parks & Open Greens</span>
                  </span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  Source: GeoSpatial Urban Model • Chembur East
                </div>
              </div>

            </div>

            {/* Commute Time Calculator Card (Directly below the map card) */}
            <div className="rounded-2xl bg-[#141A25] border border-neutral-800 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              
              {/* Icon & Title */}
              <div className="flex items-center gap-3.5 w-full md:w-auto">
                <div className="w-10 h-10 rounded-xl bg-[#1F2737] border border-neutral-700/80 flex items-center justify-center flex-shrink-0 text-[#E5C178]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Calculate Personal Commute Time
                  </h4>
                  <p className="text-xs text-neutral-400 font-light">
                    Enter your workplace or destination across Mumbai
                  </p>
                </div>
              </div>

              {/* Search Form */}
              <form onSubmit={handleCalculateCommute} className="w-full md:w-auto flex-1 max-w-md flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={commuteInput}
                    onChange={(e) => {
                      setCommuteInput(e.target.value);
                      if (!e.target.value) setCommuteResult(null);
                    }}
                    placeholder="e.g. Bandra Kurla Complex (BKC)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0E15] border border-neutral-700/80 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C178] transition-colors"
                  />
                  {commuteInput && (
                    <button
                      type="button"
                      onClick={() => { setCommuteInput(''); setCommuteResult(null); }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#E5C178] hover:bg-[#d8b062] text-neutral-950 transition-colors flex-shrink-0 cursor-pointer"
                >
                  Check Transit
                </button>
              </form>
            </div>

            {/* Commute Result Banner (Dynamic) */}
            {commuteResult && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#182232] to-[#121A26] border border-gold-400/40 text-xs flex items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{commuteResult.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      {commuteResult.time}
                    </span>
                  </div>
                  <p className="text-neutral-400 font-light text-[11px]">{commuteResult.route}</p>
                </div>
                <button
                  onClick={() => onOpenEnquiry(`Transit route inquiry: ${commuteResult.name}`)}
                  className="text-[11px] font-semibold text-gold-300 hover:text-gold-200 underline whitespace-nowrap cursor-pointer"
                >
                  Request Route Map →
                </button>
              </div>
            )}

          </div>

          {/* ==================== RIGHT COLUMN: CATEGORY TABS & LIST ==================== */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Top Category Filter Pills */}
            <div className="p-1 rounded-xl bg-[#0D121B] border border-neutral-800 flex items-center justify-between gap-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#E5C178] text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({counts.all})
              </button>
              <button
                onClick={() => setActiveTab('transit')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'transit'
                    ? 'bg-[#E5C178] text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Transit ({counts.transit})
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-[#E5C178] text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Education ({counts.education})
              </button>
              <button
                onClick={() => setActiveTab('lifestyle')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === 'lifestyle'
                    ? 'bg-[#E5C178] text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Lifestyle ({counts.lifestyle})
              </button>
            </div>

            {/* Destination List Card */}
            <div className="rounded-2xl bg-[#101520] border border-neutral-800 p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
              
              <div>
                {/* List Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <h3 className="text-xs font-bold tracking-[0.14em] text-white uppercase">
                      {activeCategoryTitle}
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {activeCategorySubtitle}
                  </span>
                </div>

                {/* List Items */}
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {displayedDestinations.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHighlightedItem(item)}
                      onMouseLeave={() => setHighlightedItem(null)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        highlightedItem?.id === item.id
                          ? 'bg-[#182030] border-gold-400/60 shadow-md'
                          : 'bg-[#0C1018]/60 hover:bg-[#141A25] border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 flex-shrink-0" />
                        <span className="text-xs sm:text-[13px] font-medium text-neutral-200">
                          {item.name}
                        </span>
                      </div>

                      {/* Time Badge (Green for 1-2 min, Gold for 5+ min) */}
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                        item.fast
                          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                          : 'bg-amber-950/60 border border-amber-500/40 text-amber-300'
                      }`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="mt-6 pt-5 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenEnquiry('Download Location Dossier')}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase bg-[#E5C178] hover:bg-[#d8b062] text-neutral-950 transition-all shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-neutral-950" />
                  <span>DOWNLOAD LOCATION DOSSIER</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry('Schedule Site Visit from Connectivity')}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-widest uppercase bg-[#202735] hover:bg-[#283244] text-white border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SCHEDULE SITE VISIT</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Full Survey Roadmap */}
      {surveyMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-[#FAF8F5] rounded-3xl p-4 sm:p-6 shadow-2xl border border-neutral-700 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#8C694E]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                  Chembur Subhash Nagar Survey Roadmap & Landmarks
                </h3>
              </div>
              <button
                onClick={() => setSurveyMapModalOpen(false)}
                className="p-1.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition-colors cursor-pointer"
                aria-label="Close Map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto py-4 flex items-center justify-center bg-white rounded-xl">
              <img
                src="/images/map-only.png"
                alt="High Resolution Survey Transit Map"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="pt-3 border-t border-neutral-300 flex items-center justify-between text-xs text-neutral-600">
              <span>Subhash Nagar, Chembur East, Mumbai</span>
              <button
                onClick={() => {
                  setSurveyMapModalOpen(false);
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
