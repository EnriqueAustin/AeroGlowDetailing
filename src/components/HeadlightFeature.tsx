import React from 'react';
import { ShieldCheck, Tag, Sparkles, Check, X, ArrowRight, Zap, Award } from 'lucide-react';
import { HERO_HEADLIGHT_OFFER } from '../data/studioData';

interface HeadlightFeatureProps {
  onOpenCoupon: () => void;
  onBookHeadlights: () => void;
}

export const HeadlightFeature: React.FC<HeadlightFeatureProps> = ({
  onOpenCoupon,
  onBookHeadlights,
}) => {
  return (
    <section id="headlights" className="py-20 lg:py-28 bg-[#0D0D0D] border-y border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Primary Core Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            PROFESSIONAL HEADLIGHT RESTORATION
          </h2>
          <p className="mt-3 text-lg text-[#E5C07B] font-medium">
            Full Multi-Stage Wet-Sanding + UV-Resistant Protective Clearcoat
          </p>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed text-balance">
            Most car washes simply buff oxidized lenses with paste. It looks clean for a month, then turns yellow and hazy again because the raw plastic has no UV shield.
            We come to your location across the West Coast, wet-sand through progressive abrasive grits (800 to 3000), and apply an automotive UV-blocking clearcoat that seals the polycarbonate for long-term clarity.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 bg-[#141414] border border-neutral-800 p-2 sm:p-4 rounded-sm relative overflow-hidden shadow-2xl">
            <div className="relative min-h-[220px] aspect-[4/3] sm:aspect-video overflow-hidden rounded-sm bg-neutral-900">
              <img
                src="/src/assets/images/headlight_clear_lens_1790548092543.jpg"
                alt="Headlight lens restored to crystal optical clarity with automotive clearcoat"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Overlay Badges */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 text-white">
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Restoration Outcome
                  </div>
                  <div className="text-sm sm:text-lg font-bold leading-tight mt-0.5">
                    Crystal Lens Clarity · Restored Night Visibility
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-300 font-mono-tabular bg-black/75 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm border border-neutral-700 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>1-Year Written Guarantee</span>
                </div>
              </div>
            </div>

            {/* Quick Micro-Process bullets below media */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="p-2 bg-neutral-900/60 rounded-sm">
                <span className="text-[#D4AF37] block font-mono">01. 800 Grit</span>
                <span className="text-neutral-300">Shaves UV Burn</span>
              </div>
              <div className="p-2 bg-neutral-900/60 rounded-sm">
                <span className="text-[#D4AF37] block font-mono">02. 3000 Grit</span>
                <span className="text-neutral-300">Smooths Scratches</span>
              </div>
              <div className="p-2 bg-neutral-900/60 rounded-sm">
                <span className="text-[#D4AF37] block font-mono">03. IPA Wipe</span>
                <span className="text-neutral-300">Degreases Surface</span>
              </div>
              <div className="p-2 bg-neutral-900/60 rounded-sm">
                <span className="text-[#D4AF37] block font-mono">04. UV Clear</span>
                <span className="text-neutral-300">Protective Seal</span>
              </div>
            </div>
          </div>

          {/* Pricing & Coupon Voucher Action Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Offer Card */}
            <div className="bg-[#181818] border-2 border-[#D4AF37]/40 p-6 sm:p-8 rounded-sm relative shadow-xl">
              {/* Floating Ribbon */}
              <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-3 py-1 rounded-sm mb-4">
                Special Mobile Service
              </div>

              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-800 pb-5 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Both Front Headlights
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Standard Mobile Rate: <span className="font-mono-tabular text-white font-semibold">R650</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#D4AF37] font-mono-tabular">
                    R650
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium block">Both Headlights Included</span>
                </div>
              </div>

              {/* Package Inclusions */}
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 mb-6">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Dual lenses progressively wet-sanded (800 → 1200 → 2000 → 3000 grit)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Sealed with premium UV acrylic clear coat / Meguiar's coating</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Protective tape shields bumper paintwork & fender clearcoat</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="font-semibold text-white">Written 1-Year Guarantee against West Coast sun</span>
                </li>
              </ul>

              {/* Curing Time Upsell Callout */}
              <div className="p-3 bg-[#111111] border border-[#D4AF37]/30 rounded-sm mb-6 text-xs">
                <div className="text-[#D4AF37] font-bold flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Curing Time Add-On (+R200):</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  While your headlight clear coat tacks and cures (20–30 mins), add Black Plastic Trim or Chrome Roll-Bar Polishing for just R200!
                </p>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onBookHeadlights}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer"
                >
                  <span>BOOK HEADLIGHT RESTORATION (R650)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/27738595637?text=${encodeURIComponent(
                    "Hi, I'd like to book a headlight restoration."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#1F1F1F] hover:bg-[#252525] border border-neutral-700 hover:border-[#25D366] rounded-sm transition-all cursor-pointer"
                >
                  <span className="text-[#25D366] font-bold">WhatsApp: 073 859 5637</span>
                </a>
              </div>

              <div className="mt-4 text-[11px] text-center text-neutral-400">
                Vredenburg: FREE Call-Out · Saldanha/Langebaan/Jacobsbaai: FREE over R700!
              </div>
            </div>

            {/* Why Ordinary Buffing Fails - Comparison Card */}
            <div className="bg-[#121212] border border-neutral-800 p-5 rounded-sm">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                Why Standard Polish Fails vs Our Wet-Sanding
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-neutral-400">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-300">Quick Polish/Toothpaste:</strong> Removes surface grime only; leaves bare, porous plastic exposed to UV. Yellows again in 4–8 weeks.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">AeroGlow Clearcoat:</strong> Shaves off the dead layer, creates an anchor profile, and bonds a brand-new UV hardcoat. Backed by 1-Year Guarantee.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
