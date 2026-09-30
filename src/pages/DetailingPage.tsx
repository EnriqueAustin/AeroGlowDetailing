import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { PACKAGES } from '../data/studioData';
import { IMAGES } from '../data/images';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  MapPin,
  Check,
  Droplets,
  Wind,
  Layers,
  Car,
  CircleGauge,
  SlidersHorizontal,
} from 'lucide-react';

export const DetailingPage: React.FC = () => {
  const { openBooking } = useNavigation();
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'bakkie'>('sedan');
  const [detailingTab, setDetailingTab] = useState<'all' | 'standalone' | 'combined'>('all');

  const detailingPackages = PACKAGES.filter((p) => {
    if (detailingTab === 'standalone') return p.category === 'wash-detailing';
    if (detailingTab === 'combined') return p.category === 'combined-bundle';
    return p.category === 'wash-detailing' || p.category === 'combined-bundle';
  });

  const getPackagePrice = (pkg: typeof PACKAGES[0]) => {
    if (vehicleType === 'sedan') return pkg.priceSedan;
    if (vehicleType === 'suv') return pkg.priceSuv;
    return pkg.priceBakkie;
  };

  const processStandards = [
    {
      icon: Droplets,
      title: 'Two-Bucket Grit-Guard Wash',
      desc: 'Never swirl-inducing automatic brushes. We use pH-balanced automotive foam and microfibre mitts that safely trap sand without scratching paint.',
    },
    {
      icon: Wind,
      title: 'West Coast Sea-Salt Dissolve',
      desc: 'Corrosive coastal brine and fog settle deep into paint pores and metal joints. Our high-pressure rinse dissolves mineral crust safely.',
    },
    {
      icon: Sparkles,
      title: 'High-Gloss Polymer Wax UV Seal',
      desc: 'The harsh Saldanha and Langebaan UV rays oxidize clearcoats quickly. We lock in paint gloss with UV polymer spray protection.',
    },
    {
      icon: Layers,
      title: 'Permanent Plastic Trim Revival',
      desc: 'Sun-bleached bumpers, door handles, and arches are restored back to factory deep satin black, not washed away by the next rain.',
    },
    {
      icon: CircleGauge,
      title: 'Chrome & Stainless Steel Polish',
      desc: 'Restores shiny bakkie roll bars, nudge bars, and side steps while removing rust-spotting and marine scale.',
    },
    {
      icon: Car,
      title: 'Zero-Mess Mobile Service',
      desc: 'We bring all equipment right to your driveway or workplace. Fast, self-contained, and courteous across the West Coast.',
    },
  ];

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Mobile Auto Care & Detailing · West Coast"
        title="MOBILE DETAILING & EXTERIOR WASH"
        subtitle="Professional vehicle care at your doorstep across Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Safe two-bucket hand washes, permanent trim revival, sea-salt removal, and flagship bundles."
        breadcrumbs={[{ label: 'Mobile Detailing' }]}
        primaryAction={{
          label: 'Book Wash & Protect (From R250)',
          onClick: () => openBooking('west-coast-wash-wax'),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like to book a mobile detailing service."
            )}`;
          },
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        
        {/* Section 1: Hero Detailing Highlight Banner */}
        <section className="bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border-2 border-[#00D2FF]/50 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D2FF]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00D2FF] text-black text-xs font-bold uppercase tracking-wider rounded-sm">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Safe Coastal Mobile Wash & Care</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                THE WEST COAST WASH & PROTECT — FROM R250
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                A massive step up from scratchy local car washes. We safely blast off corrosive coastal sea salt, perform a scratch-free two-bucket hand wash, and apply high-gloss polymer spray wax to shield your vehicle from the harsh West Coast sun. Includes temporary black dressing on tires and faded plastics.
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs font-mono text-neutral-400 pt-2">
                <div className="flex items-center gap-1.5 text-white">
                  <Droplets className="w-4 h-4 text-[#00D2FF]" />
                  <span>Two-Bucket Hand Wash</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-[#00D2FF]" />
                  <span>Mobile: We Come To Your Driveway</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <Clock className="w-4 h-4 text-[#00D2FF]" />
                  <span>45 – 60 min</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
                  <span>UV Polymer Protection</span>
                </div>
              </div>
            </div>

            {/* Quick Price Block */}
            <div className="lg:col-span-4 bg-[#0E0E0E] border border-neutral-800 p-6 rounded-sm space-y-4 text-center lg:text-left">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Entry Rate
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#00D2FF] font-mono-tabular">
                  R250
                </span>
                <span className="text-xs text-neutral-400 font-mono">Cars / R350 Bakkies</span>
              </div>
              <p className="text-xs text-neutral-400 leading-normal">
                Perfect for routine monthly upkeep or prep before a weekend coastal drive.
              </p>
              <button
                type="button"
                onClick={() => openBooking('west-coast-wash-wax')}
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Mobile Wash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Mobile Detailing & Bundle Packages Grid */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
                Packages & Value Bundles
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                MOBILE DETAILING PACKAGES
              </h2>
              <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
                Choose standalone mobile care (wash, trim, chrome, resale prep) or bundle with headlight restoration for combined savings.
              </p>
            </div>

            {/* Vehicle Selector & Tab Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#121212] border border-neutral-800 rounded-sm">
                {[
                  { id: 'all', label: 'All Packages' },
                  { id: 'standalone', label: '🚗 Detailing Only' },
                  { id: 'combined', label: '⭐ With Headlights' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDetailingTab(tab.id as typeof detailingTab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                      detailingTab === tab.id
                        ? 'bg-[#00D2FF] text-black font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Vehicle Type Toggle */}
              <div className="inline-flex rounded-sm border border-neutral-800 bg-[#121212] p-1 text-xs">
                {(['sedan', 'suv', 'bakkie'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVehicleType(type)}
                    className={`px-3 py-1.5 rounded-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      vehicleType === type
                        ? 'bg-[#00D2FF] text-black shadow-sm font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {type === 'sedan' ? 'Car' : type === 'suv' ? 'SUV' : 'Bakkie'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailingPackages.map((pkg) => {
              const currentPrice = getPackagePrice(pkg);
              const isBestSeller = pkg.badge?.includes('BEST SELLER') || pkg.badge?.includes('Resale');

              return (
                <div
                  key={pkg.id}
                  className={`bg-[#121212] border rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    isBestSeller
                      ? 'border-[#00D2FF]/80 shadow-[0_0_25px_rgba(0,210,255,0.12)] bg-gradient-to-b from-[#181818] to-[#111111]'
                      : 'border-neutral-800 hover:border-neutral-700 bg-gradient-to-b from-[#141414] to-[#0E0E0E]'
                  }`}
                >
                  <div>
                    {pkg.badge && (
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-4 ${
                          pkg.badge.includes('BEST')
                            ? 'text-black bg-[#00D2FF]'
                            : pkg.badge.includes('Resale') || pkg.badge.includes('Full')
                            ? 'text-black bg-[#38BDF8]'
                            : 'text-[#00D2FF] border border-[#00D2FF]/40'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-white font-display leading-snug">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-2 min-h-[36px] line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="my-5 pb-5 border-b border-neutral-800">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#00D2FF] font-mono-tabular">
                        R{currentPrice.toLocaleString()}
                      </div>
                      <span className="text-xs text-neutral-400 font-mono mt-1 block">
                        Estimated duration: {pkg.duration}
                      </span>
                      {pkg.savingsText && (
                        <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                          {pkg.savingsText}
                        </span>
                      )}
                      {pkg.warranty && (
                        <div className="text-[11px] text-[#38BDF8] flex items-center gap-1 mt-1 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
                          <span>{pkg.warranty}</span>
                        </div>
                      )}
                    </div>

                    {/* Includes List */}
                    <div className="space-y-2.5 text-xs text-neutral-300 mb-6">
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => openBooking(pkg.id)}
                      className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isBestSeller
                          ? 'bg-[#00D2FF] hover:bg-[#38BDF8] text-black shadow-md'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700'
                      }`}
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Visual Detailing Gallery */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
              Visual Transformation
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              COASTAL FOAM WASH & INTERIOR FRESHNESS
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Real mobile detailing results delivered directly to your driveway or workplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-neutral-800 rounded-sm overflow-hidden group">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={IMAGES.westCoastWashFoam}
                  alt="West Coast snow foam hand wash"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D2FF] font-bold block mb-1">
                    Exterior Protection
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    Snow Foam Hand-Wash & Polymer Spray Wax
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Safely dissolves abrasive coastal grit and salts before gentle microfiber contact.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 rounded-sm overflow-hidden group">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={IMAGES.interiorClean}
                  alt="Clean dry automotive cockpit detailing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D2FF] font-bold block mb-1">
                    Cabin Rejuvenation
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    Essential Dry Vacuum & UV Dash Satin Dressing
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Extracts embedded beach sand and restores deep OEM matte finishes without oily residue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Detailing Standards & Methodology */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
              Our Standard
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              WHY OUR MOBILE DETAILING STANDS OUT
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              We focus on paint preservation, non-damaging washing methods, and permanent restoration rather than quick temporary covers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processStandards.map((std, i) => {
              const IconComp = std.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-[#121212] border border-neutral-800 rounded-sm hover:border-[#00D2FF]/50 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#1A1A1A] border border-neutral-700 flex items-center justify-center text-[#00D2FF]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    {std.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Driveway Callout CTA */}
        <section className="bg-gradient-to-br from-[#161616] to-[#0E0E0E] border border-neutral-800 p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>West Coast Mobile Service</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              WE COME TO YOUR HOME OR OFFICE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              No long queues at the petrol station wash. We serve Vredenburg, Saldanha, Langebaan, and Jacobsbaai with premium mobile auto care, zero mess, and pay on completion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openBooking('west-coast-wash-wax')}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-lg cursor-pointer"
            >
              Book Mobile Detail
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailingPage;
