import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function ExperienceVideoSection({ experienceData, onOpenEnquiry }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const heading = experienceData?.heading || 'Experience One Chembur';
  const subheading = experienceData?.subheading || 'Step inside and see what elevated living truly feels like.';
  const videoSrc = experienceData?.videoUrl || '/images/building.mov';
  const posterSrc = experienceData?.posterUrl || '/images/tower-dusk.jpg';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.warn('Playback error, trying muted:', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
          setHasStarted(true);
        }
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(current);
    setDuration(dur);
    setProgress(dur ? (current / dur) * 100 : 0);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newPercent * duration;
    setProgress(newPercent * 100);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#07090C] border-t border-neutral-800/80 relative overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#5A3825]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching media_1793527994949.png */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
            <Film className="w-3.5 h-3.5 text-gold-400" />
            <span>CINEMATIC EXPERIENCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 mt-3 font-light">
            {subheading}
          </p>
        </div>

        {/* Video Player Container */}
        <div
          ref={containerRef}
          onClick={togglePlay}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative max-w-[1200px] mx-auto rounded-3xl overflow-hidden bg-[#1E1710] border border-gold-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group cursor-pointer aspect-video flex items-center justify-center"
        >
          {/* HTML5 Video element */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/quicktime" />
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          {/* Dark Vignette Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${
            isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
          }`} />

          {/* Centered Large Circular Play Button (Exactly matching reference image) */}
          {(!isPlaying || showControls) && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/80 flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer backdrop-blur-sm bg-black/40 hover:bg-black/60 hover:scale-110 hover:border-gold-300 hover:shadow-gold-glow ${
                  isPlaying ? 'opacity-80 scale-90' : 'opacity-100 scale-100'
                }`}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                ) : (
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-gold-300 fill-gold-300 translate-x-1" />
                )}
              </button>
            </div>
          )}

          {/* Luxury Bottom Video Controls Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 transition-opacity duration-300 flex flex-col gap-2 ${
              showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress Scrub Bar */}
            <div
              onClick={handleSeek}
              className="relative w-full h-1.5 sm:h-2 bg-neutral-700/80 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-[#ECCF8E] via-[#D4AF37] to-[#B8860B] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-neutral-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-wider text-gold-400/90 font-medium hidden sm:inline">
                  Codename ONE • Chembur
                </span>

                <button
                  onClick={handleFullscreen}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Corner Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700/80 text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>4K ARCHITECTURAL WALKTHROUGH</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action strip */}
        <div className="mt-8 max-w-[1200px] mx-auto p-5 sm:p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-medium text-sm sm:text-base">
              Impressed by the architecture of Codename ONE?
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm font-light mt-0.5">
              Experience the show residence in person or request the full high-resolution dossier.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Experience Chembur Video CTA')}
            className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#F6EFCF] via-[#D4AF37] to-[#B8860B] text-neutral-950 hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>SCHEDULE PRIVATE TOUR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
