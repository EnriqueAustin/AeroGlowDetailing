import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { HERO_HEADLIGHT_OFFER, HEADLIGHT_PROCESS_STEPS } from '../data/studioData';
import {
  ShieldCheck,
  Tag,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Award,
  ArrowRight,
  MoveHorizontal,
  MapPin,
  Check,
  X,
} from 'lucide-react';

export const HeadlightsPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();
  const [sliderPos, setSliderPos] = useState(50);
  const [activeStageIndex, setActiveStageIndex] = useState(1);

  const gritStages = [
    {
      grit: '800 Grit',
      action: 'Coarse Wet Cut',
      purpose: 'Removes the sun-baked, oxidized yellow factory crust and abrasive road pitting.',
    },
    {
      grit: '1200 Grit',
      action: 'Abrasive Refinement',
      purpose: 'Eliminates 800-grit sand scratches and smooths the polycarbonate lens curve.',
    },
    {
      grit: '2000 Grit',
      action: 'Micro-Fine Sanding',
      purpose: 'Levels out the surface into an ultra-fine, uniform translucent haze.',
    },
    {
      grit: '3000 Grit',
      action: 'Pre-Clear Finishing',
      purpose: 'Creates a microscopic mechanical anchor profile for maximum clearcoat adhesion.',
    },
    {
      grit: 'IPA Wipe',
      action: 'Chemical Degrease',
      purpose: 'Purges all residual sanding dust, oils, and moisture for a sterile bond.',
    },
    {
      grit: 'UV Clearcoat',
      action: 'Protective Spray',
      purpose: 'Fills fine sanding grooves, restores crystal optical clarity, and shields against UV rays.',
    },
  ];

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Core Specialist Service · West Coast"
        title="PROFESSIONAL HEADLIGHT RESTORATION"
        subtitle="Full Multi-Stage Wet-Sanding & Automotive UV-Resistant Clearcoat. We come to your location across Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Backed by our written 1-Year Guarantee."
        breadcrumbs={[{ label: 'Headlight Restoration' }]}
        primaryAction={{
          label: 'Book Headlights (R650)',
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        
        {/* Section 1: Hero Offer Highlight Banner */}
        <section className="bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border-2 border-[#D4AF37]/50 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm">
                <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                <span>Standard West Coast Rate · Both Headlights</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                HEADLIGHT RESTORATION — R650 PER PAIR
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                Cloudy, yellow, and faded headlights don't just look bad — they can drastically reduce visibility at night. Our process removes the damaged outer layer through progressive wet sanding before sealing with an automotive protective clearcoat. Backed by our written 1-Year Clarity Guarantee. We come to you.
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs font-mono text-neutral-400 pt-2">
                <div className="flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>1-Year Written Guarantee</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Mobile Service (We Come To You)</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>1.5 – 2 Hours Duration</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pay on Completion</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => openBooking('headlight-restoration')}
                className="w-full py-4 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Headlights (R650)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/27738595637?text=${encodeURIComponent(
                  "Hi, I'd like to book a headlight restoration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#1F1F1F] hover:bg-[#252525] border border-neutral-700 hover:border-[#25D366] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-[#25D366] font-bold">WhatsApp: 073 859 5637</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Before & After Visual Slider */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Visual Transformation
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              OXIDIZED VS RESTORED
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Drag the divider below to inspect the transformation from sun-baked yellow oxidation to restored crystal clarity with durable UV clearcoat.
            </p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-2 sm:p-4 rounded-sm shadow-2xl">
            <div
              className="relative aspect-video w-full overflow-hidden rounded-sm cursor-ew-resize select-none bg-black touch-none"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
              }}
            >
              {/* After Image */}
              <img
                src="/src/assets/images/headlight_clear_lens_1790548092543.jpg"
                alt="Headlight restored to crystal clarity"
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 max-w-[44%] truncate bg-black/80 backdrop-blur-sm border border-neutral-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[10px] sm:text-xs font-mono text-white flex items-center gap-1.5 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">RESTORED + UV CLEARCOAT</span>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/src/assets/images/headlight_oxidized_lens_1790548123675.jpg"
                  alt="Headlight with cloudy yellow UV oxidation"
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 max-w-[44%] truncate bg-black/80 backdrop-blur-sm border border-neutral-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[10px] sm:text-xs font-mono text-neutral-300 flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">OXIDIZED & HAZY</span>
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.7)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Multi-Stage Abrasive Science */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Our Methodology
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              WHY OUR PROGRESSIVE WET-SANDING WORKS
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Automotive polycarbonate lenses yellow because the factory UV coating breaks down under the sun. You cannot simply rub off sun-damage with polishing paste—you have to sand through the failed layer and apply a brand-new UV shield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gritStages.map((stage, idx) => (
              <div
                key={stage.grit}
                className="p-6 bg-[#121212] border border-neutral-800 rounded-sm hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#D4AF37] font-bold">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-neutral-300">
                    {stage.action}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {stage.grit}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {stage.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Why Toothpaste & Quick Buffing Fails */}
        <section className="bg-[#121212] border border-neutral-800 p-8 sm:p-12 rounded-sm space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Buyer Awareness
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              WHY QUICK COMPOUND POLISH FAILS VS OUR PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-red-950/20 border border-red-900/40 rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Quick Buff / Car Wash Paste / Toothpaste</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Only scrubs off surface road grime; fails to remove the underlying sun-damaged plastic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Leaves raw polycarbonate exposed without any UV protection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Clouds over and yellows again within 4 to 8 weeks, often worse than before.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>No guarantee offered.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-emerald-950/20 border border-emerald-900/40 rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>AeroGlow Multi-Stage Wet-Sanding & UV Clearcoat</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Sands progressively (800 to 3000 grit) to physically shave off the dead layer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Applies an automotive-grade UV clearcoat that bonds directly to the lens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Lasts for years under normal coastal driving conditions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Backed by our written 1-Year Clarity Guarantee.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: The 1-Year Written Guarantee Explained */}
        <section className="bg-gradient-to-br from-[#161616] to-[#0E0E0E] border border-neutral-800 p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Written Certificate</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              OUR 1-YEAR CLARITY GUARANTEE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              We stand firmly behind our work. If your restored headlights develop yellowing, UV hazing, or clearcoat peeling within 12 months under normal use, we will return to your location and re-clear them at zero charge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openBooking('headlight-restoration')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-lg cursor-pointer"
            >
              Book Headlights (R650)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
