import React, { useState } from 'react';
import { PACKAGES, TRADE_DEALERSHIP_PACKAGES, TRAVEL_ZONES } from '../data/studioData';
import { Check, ShieldCheck, ArrowRight, Clock, MapPin, Briefcase, Zap, MessageSquare } from 'lucide-react';

interface PackagesPricingProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCoupon: () => void;
}

export const PackagesPricing: React.FC<PackagesPricingProps> = ({
  onOpenBooking,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'suv' | 'bakkie'>('sedan');

  const headlineOffer = {
    id: 'headlight-restoration',
    name: 'Core Service: Headlight Restoration',
    badge: '⭐ CORE SERVICE',
    price: 650,
    duration: '1.5 – 2 Hours',
    description:
      'Professional wet-sand restoration and protective clearcoat for both front headlights. Backed by our written 1-Year Guarantee.',
    includes: [
      'Dual front headlights restored (progressive 800 → 3000 grit)',
      'Removes yellow UV oxidation, haze & road pitting',
      "Sealed with Meguiar's Headlight Coating / 1K Acrylic Clear Coat",
      'Surrounding car paint masked and protected',
      '1-Year Written Clarity Guarantee against coastal sun',
      'Mobile service: we come to your location',
    ],
    savingsText: 'Both Headlights Included',
  };

  const getPrice = (pkg: typeof PACKAGES[0]) => {
    if (selectedVehicle === 'sedan') return pkg.priceSedan;
    if (selectedVehicle === 'suv') return pkg.priceSuv;
    return pkg.priceBakkie;
  };

  return (
    <section id="packages" className="py-20 lg:py-28 bg-[#080808] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
              Transparent West Coast Rates
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              PACKAGES & PRICING
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              No hidden surprise quotes. Straightforward mobile rates designed for West Coast vehicles. We come to your home, workplace, or lot.
            </p>
          </div>

          {/* Vehicle Category Selector */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 bg-[#141414] border border-neutral-800 rounded-sm w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedVehicle('sedan')}
              className={`px-2.5 sm:px-4 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer text-center ${
                selectedVehicle === 'sedan'
                  ? 'bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="hidden sm:inline">🚗 Sedan / Coupe</span>
              <span className="sm:hidden">🚗 Sedan</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedVehicle('suv')}
              className={`px-2.5 sm:px-4 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer text-center ${
                selectedVehicle === 'suv'
                  ? 'bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="hidden sm:inline">🚙 SUV / Crossover</span>
              <span className="sm:hidden">🚙 SUV</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedVehicle('bakkie')}
              className={`px-2.5 sm:px-4 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer text-center ${
                selectedVehicle === 'bakkie'
                  ? 'bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="hidden sm:inline">🛻 Bakkie / 4x4</span>
              <span className="sm:hidden">🛻 Bakkie</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Core Service + 3 Bundles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Core Headlight Restoration */}
          <div className="bg-[#121212] rounded-sm p-6 flex flex-col justify-between transition-all duration-300 relative border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.08)] bg-gradient-to-b from-[#161616] to-[#101010]">
            <div>
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-2.5 py-0.5 rounded-sm mb-3">
                {headlineOffer.badge}
              </div>

              <h3 className="text-lg font-bold text-white font-display">
                {headlineOffer.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-2 min-h-[36px] line-clamp-2">
                {headlineOffer.description}
              </p>

              {/* Price */}
              <div className="mt-5 pt-4 border-t border-neutral-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#D4AF37] font-mono-tabular">
                    R{headlineOffer.price}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Both Headlights</span>
                </div>
                <div className="text-[11px] text-[#E5C07B] mt-0.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    1-Year Written Guarantee
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400 font-mono">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    {headlineOffer.duration}
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="mt-6 space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  Procedure Inclusions
                </div>
                {headlineOffer.includes.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800 space-y-2">
              <button
                type="button"
                onClick={() => onOpenBooking('headlight-restoration')}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Book Headlights (R650)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards 2, 3, 4: Weskus Value Bundles */}
          {PACKAGES.map((pkg) => {
            const price = getPrice(pkg);
            const isBestSeller = pkg.id === 'weskus-bakkie-revive';

            return (
              <div
                key={pkg.id}
                className={`bg-[#121212] rounded-sm p-6 flex flex-col justify-between transition-all duration-300 relative border ${
                  isBestSeller
                    ? 'border-[#D4AF37]/80 shadow-[0_0_30px_rgba(212,175,55,0.12)] bg-gradient-to-b from-[#181818] to-[#111111]'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  {pkg.badge && (
                    <div
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-3 ${
                        isBestSeller
                          ? 'bg-[#D4AF37] text-black font-extrabold'
                          : 'text-[#D4AF37] border border-[#D4AF37]/40'
                      }`}
                    >
                      {pkg.badge}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white font-display">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 min-h-[36px] line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="mt-5 pt-4 border-t border-neutral-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#D4AF37] font-mono-tabular">
                        R{price.toLocaleString()}
                      </span>
                      {pkg.savingsText && (
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          {pkg.savingsText}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center justify-between">
                      <span>{selectedVehicle.toUpperCase()} Rate</span>
                      <span className="flex items-center gap-1 text-neutral-400 font-mono">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      Bundle Inclusions
                    </div>
                    {pkg.includes.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 space-y-2">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(pkg.id)}
                    className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isBestSeller
                        ? 'bg-[#D4AF37] text-black hover:bg-[#E5C07B] shadow-md'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    }`}
                  >
                    <span>Book {pkg.name.split(':')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplementary Section: Trade & Dealership + Travel Zones Bar */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-10 border-t border-neutral-800">
          {/* Trade Pricing Box */}
          <div className="lg:col-span-6 bg-[#111111] border border-neutral-800 rounded-sm p-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Used Car Lots, Panel Beaters & Fleet Managers</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display mb-3">
              TRADE & DEALERSHIP PRICING
            </h4>
            <div className="space-y-3 text-xs">
              {TRADE_DEALERSHIP_PACKAGES.map((trade) => (
                <div key={trade.id} className="p-3 bg-[#161616] rounded-sm border border-neutral-800/80 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-white block">{trade.title}</span>
                    <span className="text-neutral-400 text-[11px]">{trade.highlights[0]} · We come to your lot in Vredenburg / Saldanha</span>
                  </div>
                  <span className="font-mono-tabular font-bold text-sm text-[#D4AF37] shrink-0">
                    {trade.rateDescription}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel & Call-Out Policy Box */}
          <div className="lg:col-span-6 bg-[#111111] border border-neutral-800 rounded-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">
                <MapPin className="w-4 h-4" />
                <span>Mobile Service Radius · We Come To You</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">
                TRAVEL & CALL-OUT ZONES
              </h4>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Operating directly from Vredenburg. Call-out fees to surrounding coastal towns are completely waived when booking any bundle or service over R700!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#161616] border border-neutral-800 rounded-sm">
                  <span className="text-white font-bold block">Vredenburg</span>
                  <span className="text-emerald-400 text-[11px] font-mono">FREE Call-Out</span>
                </div>
                <div className="p-2.5 bg-[#161616] border border-neutral-800 rounded-sm">
                  <span className="text-white font-bold block">Saldanha, Langebaan, Jacobsbaai</span>
                  <span className="text-[#D4AF37] text-[11px] font-mono">R150 (FREE over R700!)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Questions? WhatsApp us:</span>
              <a
                href={`https://wa.me/27738595637?text=${encodeURIComponent(
                  "Hi, I'd like a quote for mobile detailing on the West Coast."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-mono font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>073 859 5637</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
