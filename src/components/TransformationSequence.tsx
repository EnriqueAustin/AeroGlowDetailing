import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Droplets, Layers } from 'lucide-react';

interface TransformationSequenceProps {
  onOpenBooking: () => void;
}

export const TransformationSequence: React.FC<TransformationSequenceProps> = ({
  onOpenBooking,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      label: 'INSPECT & MASK',
      subtitle: 'Inspection & Bodywork Protection',
      description:
        'Headlights and lenses are inspected for UV degradation, micro-cracks, and road pitting. Surrounding body paintwork and rubber seals are taped off with high-tack protective automotive tape.',
      metric: 'Zero-contact protection for vehicle body panels',
      icon: Layers,
      image: '/src/assets/images/headlight_oxidized_lens_1790548123675.jpg',
      visualNote: 'Oxidized, cloudy surface safely isolated and protected.',
    },
    {
      label: 'WET-SAND',
      subtitle: 'Multi-Stage Abrasive Leveling',
      description:
        'Progressive wet-sanding through 800, 1200, 2000, and 3000 grits with purified water lubrication. Shaves away the dead, chalky yellow polycarbonate layer.',
      metric: 'Progressive grit sequence removes yellow crust',
      icon: Droplets,
      image: '/src/assets/images/paint_swirled_surface_1790548135101.jpg',
      visualNote: 'Micro-scratches refined down to a uniform satin finish.',
    },
    {
      label: 'DEGREASE',
      subtitle: 'Solvent Decontamination',
      description:
        'Pure isopropyl alcohol (IPA) chemical wipe-down removes all microscopic sanding residue, oils, and moisture to ensure optimal chemical adhesion.',
      metric: 'Clean mechanical anchor for clearcoat adhesion',
      icon: Sparkles,
      image: '/src/assets/images/paint_correction_gloss_1790548103040.jpg',
      visualNote: 'Pristine, keyed surface ready for clearcoat application.',
    },
    {
      label: 'PROTECTED',
      subtitle: 'Automotive UV Clearcoat',
      description:
        'Spraying of high-grade UV-resistant clearcoat. Fills all microscopic sanding marks, instantly restoring crystal optical clarity and sealing against future sun burn.',
      metric: 'Backed by 1-Year Written Clarity Guarantee',
      icon: ShieldCheck,
      image: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
      visualNote: 'Crystal clear lens transparency and lasting UV seal.',
    },
  ];

  const current = stages[activeStage];
  const IconComp = current.icon;

  return (
    <section className="py-20 lg:py-28 bg-[#090909] border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            The Automotive Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            THE TRANSFORMATION
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every vehicle that enters our studio advances through four meticulous stages of renewal.
          </p>
        </div>

        {/* Timeline Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-[#111111] p-1.5 rounded-sm border border-neutral-800">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`py-2.5 sm:py-3.5 px-2.5 sm:px-4 text-left rounded-sm transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1D1D] border border-[#00D2FF]/50 shadow-md'
                    : 'bg-transparent hover:bg-neutral-900/60 border border-transparent text-neutral-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-[#00D2FF] font-bold' : 'text-neutral-500'}>
                    0{idx + 1}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />}
                </div>
                <div className={`text-xs sm:text-sm font-bold tracking-wider font-display truncate ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {stage.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131313] border border-neutral-800 p-6 sm:p-10 rounded-sm">
          {/* Left Media Canvas */}
          <div className="lg:col-span-7 relative aspect-video rounded-sm overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            <img
              src={current.image}
              alt={`${current.label} transformation state`}
              className="w-full h-full object-cover object-center transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-neutral-700 rounded-sm flex items-center gap-2">
              <IconComp className="w-4 h-4 text-[#00D2FF]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                STAGE: {current.label}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs text-[#00D2FF] font-mono block">State Diagnosis</span>
              <span className="text-sm font-semibold text-neutral-200">{current.visualNote}</span>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00D2FF] mb-2">
                Phase 0{activeStage + 1} of 04
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
                {current.label}
              </h3>
              <p className="text-sm font-medium text-[#38BDF8] mb-4">
                {current.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="p-4 bg-[#181818] border border-neutral-800 rounded-sm">
                <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">
                  Target Outcome Metric
                </div>
                <div className="text-sm font-semibold text-white">
                  {current.metric}
                </div>
              </div>
            </div>

            {/* Stage Selector Controls */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 3))}
                className="text-xs text-neutral-400 hover:text-white transition-colors"
              >
                ← Previous
              </button>

              <div className="flex gap-1.5">
                {stages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === activeStage ? 'bg-[#00D2FF]' : 'bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to stage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev < 3 ? prev + 1 : 0))}
                className="text-xs text-[#00D2FF] hover:text-[#38BDF8] font-semibold transition-colors"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* Closing Action Ribbon */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-neutral-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D2FF] mb-1">
              Your Vehicle Next
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              YOUR CAR. YOUR TURN.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Lock in your restoration slot with verified studio specialists. Transparent pricing with no hidden charges.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full md:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>BOOK YOUR DETAIL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
