import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { BEFORE_AFTER_CASES } from '../data/studioData';
import {
  MoveHorizontal,
  Columns,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';

export const BeforeAfterPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();
  const [selectedCaseId, setSelectedCaseId] = useState(BEFORE_AFTER_CASES[0].id);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'slider' | 'sideBySide'>('slider');

  const activeCase =
    BEFORE_AFTER_CASES.find((c) => c.id === selectedCaseId) || BEFORE_AFTER_CASES[0];

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Evidence & Demonstrations · West Coast"
        title="BEFORE & AFTER COMPARISONS"
        subtitle="Inspect real restoration results. Drag the slider to compare cloudy oxidized headlights against crystal-clear restored lenses with durable UV clearcoat, and clean mobile detailing results."
        breadcrumbs={[{ label: 'Before & After' }]}
        primaryAction={{
          label: 'Book Headlight Restoration',
          onClick: () => openBooking('headlight-restoration'),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like to book a headlight restoration."
            )}`;
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        
        {/* Navigation / Filter Tabs & Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          {/* Functional Case Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {BEFORE_AFTER_CASES.map((item) => {
              const isSelected = item.id === selectedCaseId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCaseId(item.id);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E1E1E] text-[#D4AF37] border border-[#D4AF37] shadow-md'
                      : 'bg-[#121212] hover:bg-[#161616] text-neutral-400 border border-neutral-800'
                  }`}
                >
                  {item.category === 'headlights'
                    ? 'Headlight Restoration'
                    : item.category === 'trim'
                    ? 'Black Plastic Trim'
                    : item.category === 'chrome'
                    ? 'Chrome & Roll-Bar'
                    : 'Detailing Result'}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Interactive Slider vs Side-by-Side */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121212] border border-neutral-800 rounded-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-[#222] text-[#D4AF37] font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>Slider Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('sideBySide')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'sideBySide'
                  ? 'bg-[#222] text-[#D4AF37] font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>
        </div>

        {/* The Interactive Inspection Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Display Area */}
          <div className="lg:col-span-8 bg-[#111111] p-3 sm:p-4 rounded-sm border border-neutral-800 shadow-2xl">
            {viewMode === 'slider' ? (
              <div
                className="relative aspect-video w-full overflow-hidden rounded-sm cursor-ew-resize select-none bg-black touch-none"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
                onTouchStart={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
              >
                {/* After Image */}
                <img
                  src={activeCase.afterImage}
                  alt={`${activeCase.title} restored state`}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Before Image with clip */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={activeCase.beforeImage}
                    alt={`${activeCase.title} damaged state`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 max-w-[44%] truncate bg-black/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-neutral-800 text-[10px] sm:text-xs font-mono text-neutral-300 pointer-events-none">
                  BEFORE: {activeCase.beforeLabel}
                </div>
                <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 max-w-[44%] truncate bg-black/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-neutral-800 text-[10px] sm:text-xs font-mono text-[#D4AF37] pointer-events-none">
                  AFTER: {activeCase.afterLabel}
                </div>

                {/* Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] pointer-events-none shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#181818] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-2xl">
                    <MoveHorizontal className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-sm text-[11px] text-neutral-400 font-mono pointer-events-none">
                  ← Drag to Compare Surface Finish →
                </div>
              </div>
            ) : (
              /* Side-by-Side Mode */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black p-2 rounded-sm">
                <div className="relative aspect-video rounded-sm overflow-hidden border border-neutral-800">
                  <img
                    src={activeCase.beforeImage}
                    alt="Before state"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-xs font-mono text-red-400 border border-neutral-800">
                    BEFORE: {activeCase.beforeLabel}
                  </div>
                </div>
                <div className="relative aspect-video rounded-sm overflow-hidden border border-[#D4AF37]/50">
                  <img
                    src={activeCase.afterImage}
                    alt="Restored state"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-xs font-mono text-[#D4AF37] border border-neutral-800">
                    AFTER: {activeCase.afterLabel}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Inspector & Technical Audit Metrics */}
          <div className="lg:col-span-4 bg-[#141414] border border-neutral-800 p-6 sm:p-8 rounded-sm space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
                <span>AUDIT ARCHIVE</span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <Clock className="w-3.5 h-3.5" /> {activeCase.timeLogged}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight mb-3">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeCase.description}
              </p>
            </div>

            {/* Technical Metrics List */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Diagnostic Audit</span>
              </div>
              {activeCase.technicalDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              {activeCase.category === 'headlights' ? (
                <>
                  <button
                    type="button"
                    onClick={openCoupon}
                    className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer text-center"
                  >
                    Claim R650 Coupon & Book
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 font-mono">
                    Regular: R750 · 1 Year Written Guarantee
                  </p>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openBooking(activeCase.id)}
                  className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Defect Severity Scale Diagnostic Guide */}
        <section className="bg-[#111111] border border-neutral-800 p-6 sm:p-10 rounded-sm space-y-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-1">
              Condition Assessment
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              HOW WE ASSESS HEADLIGHT DEGRADATION
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              We inspect your lenses before beginning wet-sanding to ensure the proper grit progression and clearcoat bonding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-sm space-y-1.5">
              <span className="text-[#D4AF37] font-mono font-bold block">GRADE 01 · MILD</span>
              <div className="text-white font-semibold">Light Surface Hazing</div>
              <p className="text-neutral-400 leading-relaxed">
                Early UV cloudiness creeping onto top edges. Cleared with progressive wet-sanding and UV clearcoat.
              </p>
            </div>
            <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-sm space-y-1.5">
              <span className="text-[#D4AF37] font-mono font-bold block">GRADE 02 · MODERATE</span>
              <div className="text-white font-semibold">Yellowing Headlight Lens</div>
              <p className="text-neutral-400 leading-relaxed">
                Visible yellow tint across the center and upper lens. Night driving light pattern begins to scatter.
              </p>
            </div>
            <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-sm space-y-1.5">
              <span className="text-[#D4AF37] font-mono font-bold block">GRADE 03 · HEAVY</span>
              <div className="text-white font-semibold">Chalky Yellow Breakdown</div>
              <p className="text-neutral-400 leading-relaxed">
                Severe yellow crusting across the entire lens. Light output is muffled and hazy.
              </p>
            </div>
            <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-sm space-y-1.5">
              <span className="text-[#D4AF37] font-mono font-bold block">GRADE 04 · SEVERE</span>
              <div className="text-white font-semibold">Opaque Polycarbonate & Pitting</div>
              <p className="text-neutral-400 leading-relaxed">
                Risk of roadworthy failure. Thoroughly leveled with coarse 800-grit wet cut and sealed with UV clearcoat.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
