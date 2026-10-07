import React from 'react';
import { ArrowRight, Plus, TrendingDown } from 'lucide-react';
import { PACKAGES } from '../data/studioData';
import { AppPage } from '../types';

interface ComboValueBandProps {
  onNavigate: (page: AppPage) => void;
  onOpenBooking: (packageId?: string) => void;
}

const BUNDLES = PACKAGES.filter((p) => p.category === 'combined-bundle');

export const ComboValueBand: React.FC<ComboValueBandProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A] border-b border-neutral-900 relative overflow-hidden">
      {/* Subtle accent wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 700px at 15% 20%, rgba(0, 210, 255, 0.5), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            Better Together
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            HEADLIGHTS + DETAILING, ONE CALL-OUT
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed text-balance">
            The clearcoat on your headlights needs time to cure — so we use it.
            While it sets we wash, dress and detail the rest of the vehicle. One
            visit, one call-out fee, and a bundle rate that beats booking the
            services separately.
          </p>
        </div>

        {/* Visual equation */}
        <div className="flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center gap-2.5 sm:gap-4 mb-10 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-center sm:text-left">
          <span className="px-4 py-2.5 bg-[#121212] border border-neutral-800 rounded-sm text-white">
            Headlight Restoration
          </span>
          <Plus className="w-4 h-4 text-[#00D2FF] shrink-0 self-center" />
          <span className="px-4 py-2.5 bg-[#121212] border border-neutral-800 rounded-sm text-white">
            Mobile Detailing
          </span>
          <span aria-hidden="true" className="text-neutral-600 self-center">
            =
          </span>
          <span className="px-4 py-2.5 bg-[#00D2FF]/10 border border-[#00D2FF]/50 rounded-sm text-[#00D2FF] inline-flex items-center justify-center gap-2">
            <TrendingDown className="w-4 h-4 shrink-0" />
            <span>Save R100 – R650</span>
          </span>
        </div>

        {/* Bundle cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="flex flex-col bg-[#111111] border border-neutral-800 hover:border-[#00D2FF]/40 rounded-sm p-6 transition-colors"
            >
              {bundle.badge && (
                <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#00D2FF] mb-3">
                  {bundle.badge}
                </div>
              )}

              <h3 className="text-lg font-bold text-white font-display leading-snug">
                {bundle.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-display">
                  R{bundle.priceSedan}
                </span>
                {bundle.priceBakkie !== bundle.priceSedan && (
                  <span className="text-xs text-neutral-500 font-mono">
                    / R{bundle.priceBakkie} bakkie &amp; SUV
                  </span>
                )}
              </div>

              <div className="mt-1.5 text-xs font-mono text-[#00D2FF]">
                {bundle.savingsText}
              </div>
              <div className="mt-0.5 text-xs font-mono text-neutral-500">
                {bundle.duration}
              </div>

              <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                {bundle.recommendedFor}
              </p>

              <button
                type="button"
                onClick={() => onOpenBooking(bundle.id)}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer self-start"
              >
                <span>Book This Bundle</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">
              Compare All Headlight, Detailing &amp; Combined Packages
            </span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
