import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { PACKAGES, TRADE_DEALERSHIP_PACKAGES, TRAVEL_ZONES } from '../data/studioData';
import {
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  Calculator,
  CheckSquare,
  Square,
  Briefcase,
  MapPin,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { openBooking } = useNavigation();
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'bakkie'>('sedan');
  const [activeCategory, setActiveCategory] = useState<'all' | 'combined' | 'detailing' | 'headlight'>('all');

  // Custom Detail Configurator using all Mobile Offerings
  const [customIncludes, setCustomIncludes] = useState<{ [key: string]: boolean }>({
    headlights: true,
    wash: true,
    trim: false,
    chrome: false,
    windshield: false,
    interiorVacuum: false,
    engineBay: false,
    interiorSpot: false,
    doorSeals: false,
  });

  const customItems = [
    {
      id: 'headlights',
      label: '1. Premium Headlight Restoration (Both Headlights)',
      price: 650,
      note: "Multi-stage wet sanding + Meguiar's / 1K Acrylic UV clearcoat · 1-Year Guarantee",
    },
    {
      id: 'wash',
      label: '2. The West Coast Wash & Wax (Hand Wash & Polymer Wax)',
      price: vehicleType === 'sedan' ? 250 : 350,
      note: 'Grit-guard two-bucket wash, wheel degrease, spray wax & tire/trim dressing',
    },
    {
      id: 'interiorVacuum',
      label: '3. Essential Interior Detail (Deep Vacuum & Dust-Down)',
      price: vehicleType === 'sedan' ? 300 : 350,
      note: 'Beach sand extracted, dash/console degreased, UV satin dressing, glass cleaned',
    },
    {
      id: 'trim',
      label: '4. Black Plastic Trim Restoration',
      price: 250,
      note: 'Sun-bleached bumpers, wheel arches, mirrors restored to deep factory black',
    },
    {
      id: 'chrome',
      label: '5. Chrome & Roll-Bar Polishing',
      price: 250,
      note: 'Roll bars, nudge bars, and side steps polished to mirror shine, cuts salt haze',
    },
    {
      id: 'windshield',
      label: '6. Windshield Water-Spot & Sea-Salt Removal',
      price: 200,
      note: 'Hand compounded to clear mineral scale, eliminates wiper glare and chatter',
    },
    {
      id: 'engineBay',
      label: '7. Engine Bay Degreasing & Detail',
      price: 300,
      note: 'Safe citrus degrease & satin plastics dressing, showroom resale appeal',
    },
    {
      id: 'interiorSpot',
      label: '8. Localized Interior Spot-Cleaning',
      price: 250,
      note: 'Enzyme spot lift for seat spills and roof lining without soaking carpets',
    },
    {
      id: 'doorSeals',
      label: '9. Rubber Door Seal Rejuvenation',
      price: 150,
      note: 'All door and boot rubbers conditioned, stops gravel road dust and wind whistle',
    },
  ];

  const calculateCustomTotal = () => {
    return customItems.reduce((acc, item) => {
      return customIncludes[item.id] ? acc + item.price : acc;
    }, 0);
  };

  const getPackagePrice = (pkg: typeof PACKAGES[0]) => {
    if (vehicleType === 'sedan') return pkg.priceSedan;
    if (vehicleType === 'suv') return pkg.priceSuv;
    return pkg.priceBakkie;
  };

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'combined') return pkg.category === 'combined-bundle';
    if (activeCategory === 'detailing') return pkg.category === 'wash-detailing';
    if (activeCategory === 'headlight') return pkg.category === 'headlight';
    return true;
  });

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Transparent Fixed Rates · West Coast"
        title="PACKAGES & PRICING"
        subtitle="No hidden surprises or call-out fees for primary service areas. Select your vehicle class below to explore fixed mobile packages or calculate your own custom detail."
        breadcrumbs={[{ label: 'Packages & Pricing' }]}
        primaryAction={{
          label: 'Book Mobile Service',
          onClick: () => openBooking(),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like a quote for mobile detailing on the West Coast."
            )}`;
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* Vehicle Class Segmented Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#121212] border border-neutral-800 rounded-sm">
          <div>
            <div className="text-xs font-mono uppercase text-[#00D2FF] font-semibold">
              Vehicle Profile Selection
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Transparent rates for workhorse bakkies, family SUVs, and daily sedans.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 bg-[#181818] border border-neutral-700/80 rounded-sm w-full sm:w-auto">
            {[
              { id: 'sedan', label: '🚗 Hatch / Sedan', short: '🚗 Sedan' },
              { id: 'suv', label: '🚙 SUV / Crossover', short: '🚙 SUV' },
              { id: 'bakkie', label: '🛻 Bakkie / 4x4', short: '🛻 Bakkie' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicleType(v.id as typeof vehicleType)}
                className={`px-2 sm:px-4 py-2 text-xs font-semibold rounded-sm transition-all cursor-pointer text-center ${
                  vehicleType === v.id
                    ? 'bg-[#262626] text-[#00D2FF] border border-[#00D2FF]/50 shadow-sm'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                <span className="hidden sm:inline">{v.label}</span>
                <span className="sm:hidden">{v.short}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid with Category Filter */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
                The Weskus Value Bundles & Packages
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                MOBILE RESTORATION & DETAILING PACKAGES
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Bundling services saves you money and gets your vehicle looking its best in one visit.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-neutral-800 rounded-sm">
              {[
                { id: 'all', label: 'All Packages' },
                { id: 'combined', label: '⭐ Combined Bundles' },
                { id: 'detailing', label: '🚗 Detailing Only' },
                { id: 'headlight', label: '💡 Headlight Packages' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#00D2FF] text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Filtered Packages */}
            {filteredPackages.map((pkg) => {
              const currentPrice = getPackagePrice(pkg);
              const isBestSeller = pkg.badge?.includes('BEST SELLER') || pkg.badge?.includes('Core');

              return (
                <div
                  key={pkg.id}
                  className={`bg-[#121212] border rounded-sm p-6 flex flex-col justify-between transition-all ${
                    isBestSeller
                      ? 'border-[#00D2FF]/80 shadow-[0_0_25px_rgba(0,210,255,0.12)] bg-gradient-to-b from-[#181818] to-[#111111]'
                      : 'border-neutral-800 hover:border-neutral-700 bg-gradient-to-b from-[#141414] to-[#0E0E0E]'
                  }`}
                >
                  <div>
                    {pkg.badge && (
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm mb-4 ${
                          isBestSeller
                            ? 'bg-[#00D2FF] text-black font-extrabold'
                            : 'text-[#00D2FF] border border-[#00D2FF]/40'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    )}

                    <h3 className="text-lg font-bold text-white font-display leading-snug">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-2 min-h-[36px] line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Price Block */}
                    <div className="my-5 pb-5 border-b border-neutral-800">
                      <div className="text-3xl font-extrabold text-[#00D2FF] font-mono-tabular">
                        R{currentPrice.toLocaleString()}
                      </div>
                      <span className="text-xs text-neutral-400 font-mono mt-1 block">
                        Est. duration: {pkg.duration}
                      </span>
                      {pkg.savingsText && (
                        <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
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
                    <div className="space-y-2 text-xs text-neutral-300 mb-6">
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

        {/* Section 2: Custom Detail Builder & Live Calculator */}
        <section className="bg-[#121212] border border-neutral-800 p-6 sm:p-10 rounded-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00D2FF] tracking-widest mb-1">
                <Calculator className="w-4 h-4" />
                <span>Interactive Weskus Price Configurator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                BUILD YOUR CUSTOM MOBILE SERVICE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Tick the exact services you want from our 7 core mobile offerings. The total updates live. No machinery required, no mess, pay on completion.
              </p>
            </div>

            <div className="flex items-center justify-between sm:block text-left sm:text-right bg-black/60 p-4 rounded-sm border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                Estimated Total:
              </span>
              <span className="text-2xl sm:text-4xl font-extrabold text-[#00D2FF] font-mono-tabular">
                R{calculateCustomTotal().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customItems.map((item) => {
              const isChecked = customIncludes[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setCustomIncludes({ ...customIncludes, [item.id]: !isChecked })
                  }
                  className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isChecked
                      ? 'bg-[#181818] border-[#00D2FF]/80'
                      : 'bg-[#0E0E0E] hover:bg-[#141414] border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#00D2FF]">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-[#00D2FF] text-black" />
                      ) : (
                        <Square className="w-5 h-5 text-neutral-600" />
                      )}
                    </span>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-bold ${
                          isChecked ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {item.label}
                      </div>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">
                        {item.note}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono-tabular font-bold text-white shrink-0">
                    +R{item.price}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
            <span className="text-xs text-neutral-400">
              Pay upon completion · We come to your home or office · FREE call-out over R700
            </span>
            <button
              type="button"
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-4 sm:px-8 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>Book Selected Services (R{calculateCustomTotal().toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </section>

        {/* Section 3: Trade & Dealership + Travel Zones */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trade Pricing */}
          <div className="bg-[#121212] border border-neutral-800 p-6 sm:p-8 rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00D2FF]">
              <Briefcase className="w-4 h-4" />
              <span>Used Car Lots, Panel Beaters & Fleet Managers</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              TRADE & DEALERSHIP PRICING
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We come directly to your lot in Vredenburg or Saldanha. Fast turnaround with zero disruption to your sales floor or workshop.
            </p>
            <div className="space-y-3 pt-2 text-xs">
              {TRADE_DEALERSHIP_PACKAGES.map((t) => (
                <div key={t.id} className="p-4 bg-[#181818] border border-neutral-800 rounded-sm">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-bold text-white text-sm">{t.title}</span>
                    <span className="text-[#00D2FF] font-mono font-bold text-base">{t.rateDescription}</span>
                  </div>
                  <ul className="space-y-1 text-neutral-400 text-[11px]">
                    {t.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#00D2FF]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Zones */}
          <div className="bg-[#121212] border border-neutral-800 p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00D2FF]">
                <MapPin className="w-4 h-4" />
                <span>Operating Radius · We Come To You</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                TRAVEL & CALL-OUT ZONES
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                We are based in Vredenburg. Call-out fees for surrounding West Coast areas are 100% waived whenever you book a service or bundle over R700!
              </p>
              <div className="space-y-2.5 text-xs">
                {TRAVEL_ZONES.map((zone) => (
                  <div key={zone.area} className="p-3 bg-[#181818] border border-neutral-800 rounded-sm flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{zone.area}</span>
                      <span className="text-neutral-400 text-[11px]">{zone.description}</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#00D2FF] shrink-0 pl-3">
                      {zone.callOutFeeZAR === 0 ? 'FREE' : `R${zone.callOutFeeZAR}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Direct bookings & inquiries:</span>
              <a
                href={`https://wa.me/27738595637?text=${encodeURIComponent(
                  "Hi, I'd like a quote for mobile detailing on the West Coast."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-mono font-bold"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>073 859 5637</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
