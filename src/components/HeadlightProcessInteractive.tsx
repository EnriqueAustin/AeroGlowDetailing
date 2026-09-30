import React, { useState } from 'react';
import { HEADLIGHT_PROCESS_STEPS } from '../data/studioData';
import { CheckCircle2, ChevronRight, Eye, ShieldAlert, Sparkles, Layers, Flame } from 'lucide-react';
import { IMAGES } from '../data/images';

export const HeadlightProcessInteractive: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepVisuals = [
    {
      stage: 'OLD / OXIDISED',
      image: IMAGES.headlightOxidized,
      headline: 'Degraded Polycarbonate Surface',
      caption: 'Sun-baked UV yellowing, coastal road film oxidation, and surface pitting.',
      icon: ShieldAlert,
    },
    {
      stage: 'WET-SANDING',
      image: IMAGES.headlightOxidized,
      headline: 'Progressive Multi-Stage Wet Sanding',
      caption: 'Water-lubricated 800 to 3000 grit blocks safely level away the yellow dead material.',
      icon: Layers,
    },
    {
      stage: 'PREPARATION',
      image: IMAGES.headlightClear,
      headline: 'Solvent Degreasing & Masking Protection',
      caption: 'Pure IPA wipe-down leaves a clean mechanical anchor surface ready for clearcoat adhesion.',
      icon: Sparkles,
    },
    {
      stage: 'NEW CLEARCOAT',
      image: IMAGES.headlightClear,
      headline: 'Automotive UV Protective Clearcoat Spray',
      caption: 'Application of durable UV clearcoat fills fine sanding grooves, restoring crystal transparency.',
      icon: Sparkles,
    },
    {
      stage: 'RESTORED & INSPECTED',
      image: IMAGES.headlightClear,
      headline: 'Cured & Backed by 1-Year Written Guarantee',
      caption: 'Night driving light output and clarity restored. Backed by our written guarantee.',
      icon: CheckCircle2,
    },
  ];

  const currentVisual = stepVisuals[activeStepIndex];
  const currentStepData = HEADLIGHT_PROCESS_STEPS[activeStepIndex];
  const IconComponent = currentVisual.icon;

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#080808] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            The Scientific Method
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            OUR RESTORATION PROCESS
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Click through the stages below to see how full progressive wet-sanding and automotive UV clearcoat restores durable optical clarity.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8 bg-[#111111] p-1.5 rounded-sm border border-neutral-800">
          {HEADLIGHT_PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`py-3 px-3 text-left transition-all rounded-sm flex flex-col justify-between cursor-pointer ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isActive
                    ? 'bg-[#1C1C1C] border border-[#00D2FF]/60 shadow-md'
                    : 'bg-transparent hover:bg-neutral-900/60 border border-transparent text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-[#00D2FF] font-bold' : 'text-neutral-500'}>
                    STAGE {step.step}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />}
                </div>
                <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {stepVisuals[idx].stage}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-neutral-800/80 p-6 sm:p-8 rounded-sm">
          {/* Visual Presentation */}
          <div className="lg:col-span-7 relative aspect-video bg-black rounded-sm overflow-hidden border border-neutral-800 shadow-xl group">
            <img
              src={currentVisual.image}
              alt={currentVisual.headline}
              className="w-full h-full object-cover transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Visual Stage Overlay Tag */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 border border-neutral-700 rounded-sm flex items-center gap-2">
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00D2FF]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white">
                STAGE {currentStepData.step}: {currentVisual.stage}
              </span>
            </div>

            {/* Bottom Scrim & Caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="text-white text-sm sm:text-base font-bold font-display">
                {currentVisual.headline}
              </div>
              <div className="text-neutral-300 text-xs mt-1">
                {currentVisual.caption}
              </div>
            </div>
          </div>

          {/* Technical Explanations */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF] uppercase tracking-wider mb-2">
                <span>Phase Breakdown</span>
                <span>·</span>
                <span>Approx. {currentStepData.time}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3">
                {currentStepData.name}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                {currentStepData.description}
              </p>

              <div className="p-4 bg-[#181818] border border-neutral-800 rounded-sm">
                <div className="text-xs uppercase font-semibold text-[#00D2FF] mb-1">
                  Why this step is essential:
                </div>
                <div className="text-xs sm:text-sm text-neutral-300">
                  {currentStepData.keyAction}
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 0))}
                disabled={activeStepIndex === 0}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous Stage
              </button>

              <span className="text-xs font-mono text-neutral-500">
                {activeStepIndex + 1} / {HEADLIGHT_PROCESS_STEPS.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    prev < HEADLIGHT_PROCESS_STEPS.length - 1 ? prev + 1 : prev
                  )
                }
                disabled={activeStepIndex === HEADLIGHT_PROCESS_STEPS.length - 1}
                className="px-4 py-2 text-xs font-semibold text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
