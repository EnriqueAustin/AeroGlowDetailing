import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreWork }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]"
    >
      {/* Background cinematic photography with layered scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_cinematic_automotive_1790548077922.jpg"
          alt="Cinematic luxury vehicle showcasing freshly detailed glossy paintwork and crystal clear restored headlights"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Measured dark scrim to guarantee WCAG text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]/60" />
        <div className="absolute inset-0 bg-[#080808]/40" />

        {/* Dynamic subtle ambient light spotlight responding to cursor */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.15), transparent 70%)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Clean unboxed editorial kicker without pill enclosure */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-5 sm:mb-6 text-center">
          <span>Mobile Headlight Restoration & Detailing</span>
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] hidden sm:inline-block" />
          <span>West Coast, WC</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-display leading-[1.05] max-w-4xl text-balance mb-6">
          YOUR CAR. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#D4AF37]">
            RESTORED.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl text-balance font-normal leading-relaxed mb-10">
          Professional vehicle restoration at your location. We come to you across <strong className="text-white font-medium">Vredenburg, Saldanha, Langebaan, and Jacobsbaai</strong>.
          Specialized in multi-stage wet-sanding headlight restoration with UV clearcoat protection, plus thorough mobile washing and interior cleaning.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all duration-200 shadow-lg shadow-[#D4AF37]/15 group cursor-pointer"
          >
            <span>BOOK A MOBILE DETAIL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-700/80 rounded-sm backdrop-blur-sm transition-all duration-200 cursor-pointer"
          >
            <span>VIEW OUR WORK</span>
          </button>
        </div>

        {/* Trust Badges - Unboxed, clean metadata with typographic separators */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-neutral-400 font-medium border-t border-neutral-800/80 pt-8 w-full max-w-3xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="tracking-wide">We Come To You (West Coast)</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-neutral-700">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="tracking-wide">1-Year Written Clarity Guarantee</span>
          </div>
          <span aria-hidden="true" className="hidden sm:inline text-neutral-700">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="tracking-wide">Pay on Completion (R650 per Pair)</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-xs text-neutral-500 uppercase tracking-widest">
          <span>Scroll to experience</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-neutral-400" />
        </div>
      </div>
    </section>
  );
};
