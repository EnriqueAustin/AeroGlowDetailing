import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_CASES } from '../data/studioData';
import { MoveHorizontal, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCoupon: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  onOpenBooking,
  onOpenCoupon,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState(BEFORE_AFTER_CASES[0].id);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase =
    BEFORE_AFTER_CASES.find((c) => c.id === selectedCaseId) || BEFORE_AFTER_CASES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="comparisons" className="py-20 lg:py-28 bg-[#0A0A0A] border-b border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
              Interactive Evidence
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              SEE THE DIFFERENCE
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              Drag the center divider horizontally across the vehicle to inspect before and after surface conditions.
            </p>
          </div>

          {/* Interactive Filter Controls - Allowed functional tabs as per frontend-design */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141414] border border-neutral-800 rounded-sm overflow-x-auto">
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
                  className={`px-4 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#222222] text-[#00D2FF] border border-[#00D2FF]/50 shadow-sm'
                      : 'text-neutral-400 hover:text-white border border-transparent'
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
        </div>

        {/* Draggable Slider Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Slider Frame */}
          <div className="lg:col-span-8 bg-[#111111] p-2 sm:p-3 rounded-sm border border-neutral-800 shadow-2xl">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => handleMove(e.touches[0].clientX)}
              onTouchMove={handleTouchMove}
              onClick={(e) => handleMove(e.clientX)}
              className="relative aspect-video w-full overflow-hidden rounded-sm cursor-ew-resize touch-none select-none bg-black"
            >
              {/* "After" Image (Full background layer) */}
              <img
                src={activeCase.afterImage}
                alt={`${activeCase.title} - ${activeCase.afterLabel}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* "Before" Image (Clipped overlay layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={activeCase.beforeImage}
                  alt={`${activeCase.title} - ${activeCase.beforeLabel}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Labels for Before / After */}
              <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 max-w-[44%] truncate pointer-events-none bg-black/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-neutral-800 text-[10px] sm:text-xs font-mono font-semibold text-neutral-300">
                BEFORE: {activeCase.beforeLabel}
              </div>
              <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 max-w-[44%] truncate pointer-events-none bg-black/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-neutral-800 text-[10px] sm:text-xs font-mono font-semibold text-[#00D2FF]">
                AFTER: {activeCase.afterLabel}
              </div>

              {/* Draggable Divider Line & Knob */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#00D2FF] pointer-events-none shadow-[0_0_10px_rgba(0,210,255,0.6)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#181818] border-2 border-[#00D2FF] flex items-center justify-center shadow-xl text-[#00D2FF]">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Bottom Drag Instruction */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-sm text-[11px] text-neutral-400 font-mono pointer-events-none backdrop-blur-sm">
                ← Drag Slider to Compare →
              </div>
            </div>
          </div>

          {/* Technical Case Study Inspection Panel */}
          <div className="lg:col-span-4 bg-[#141414] border border-neutral-800 p-6 sm:p-7 rounded-sm flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
                <span>BENCHMARK DATA</span>
                <span>Time: {activeCase.timeLogged}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display leading-snug mb-3">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                {activeCase.description}
              </p>

              {/* Technical Measurement List */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                <div className="text-xs font-mono uppercase tracking-wider text-[#00D2FF]">
                  Technical Audit Metrics
                </div>
                {activeCase.technicalDetails.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contextual Action Button */}
            <div className="pt-4 border-t border-neutral-800">
              {activeCase.category === 'headlights' ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={onOpenCoupon}
                    className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>CLAIM R650 COUPON</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 font-mono-tabular">
                    R650 Pair · 1 Year Written Guarantee
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenBooking(activeCase.id)}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>REQUEST CASE QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
