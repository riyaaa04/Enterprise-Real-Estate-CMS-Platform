import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection({ galleryData }) {
  const categories = galleryData?.categories || ['All', 'Architecture', 'Interiors', 'Clubhouse', 'Dusk Views'];
  const images = galleryData?.images || [
    { id: 1, title: 'Iconic Dusk Tower Facade', category: 'Architecture', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
    { id: 2, title: 'Grand Double-Height Living Room', category: 'Interiors', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { id: 3, title: '40th Floor Sky Infinity Pool', category: 'Clubhouse', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80' },
    { id: 4, title: 'Master Bedroom Private Sunset Balcony', category: 'Interiors', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' },
    { id: 5, title: 'Subhash Nagar 360° Dusk Skyline', category: 'Dusk Views', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
    { id: 6, title: 'Triple-Height Marble Arrival Portico', category: 'Architecture', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = activeFilter === 'All'
    ? images
    : images.filter(img => img.category === activeFilter);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0B0F15] border-t border-neutral-800/60 relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>VISUAL PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            {galleryData?.title || 'Curated Visual Gallery'}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-3">
            {galleryData?.subtitle || 'Glimpse into life elevated 400 feet above Chembur.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gold-gradient text-neutral-950 shadow-gold-glow font-bold'
                  : 'bg-[#121722] text-neutral-300 hover:text-white border border-neutral-800 hover:border-gold-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, idx) => (
            <div
              key={image.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-neutral-800 hover:border-gold-400/50 shadow-xl cursor-pointer transition-all duration-300"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-gold-400 font-semibold uppercase block">
                    {image.category}
                  </span>
                  <h4 className="text-white text-sm sm:text-base font-medium mt-0.5">
                    {image.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-gold-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-400 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-400 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-neutral-800 shadow-2xl"
            />
            <div className="text-center mt-4">
              <span className="text-xs tracking-widest text-gold-400 uppercase font-semibold">
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 className="font-serif text-xl text-white font-medium mt-1">
                {filteredImages[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
