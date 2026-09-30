import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES } from '../data/studioData';
import {
  Check,
  ShieldCheck,
  Clock,
  Tag,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  Plus,
  MapPin,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();

  const addOnServices = [
    {
      name: 'Hydrophobic Windshield Rain Treatment',
      price: 'R150',
      desc: 'Mineral water spots cleared from front windshield, followed by hydrophobic rain repellent for clear vision in winter rains and coastal fog.',
    },
    {
      name: 'Fog Light Pair Restoration',
      price: 'R200',
      desc: 'Have cloudy, pitted front fog lights? We wet-sand and apply UV clearcoat to both lower fog lenses alongside your main headlights.',
    },
    {
      name: 'Extra Pet Hair / Sand Extraction',
      price: 'R150',
      desc: 'Deep agitation and specialized rubber brush vacuuming to remove embedded pet hair and stubborn coastal beach sand from boot and carpets.',
    },
    {
      name: 'Hand Spray Polymer Paint Protection',
      price: 'R150',
      desc: 'Extra layer of high-slickness spray sealant applied after an exterior wash for added gloss and rain beading.',
    },
  ];

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="West Coast Mobile Detailing"
        title="OUR MOBILE SERVICES"
        subtitle="Professional headlight restoration and mobile vehicle care brought right to your driveway. We come to you across Vredenburg, Saldanha, Langebaan, and Jacobsbaai."
        breadcrumbs={[{ label: 'Services' }]}
        primaryAction={{
          label: 'Book Any Service',
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
        
        {/* Core Services Catalog Cards */}
        <section className="space-y-10">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
              Service Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              MOBILE PACKAGES & SPECIALIST SERVICES
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Every service is performed on-site at your home or workplace. Select a service to see full inclusions and transparent pricing.
            </p>
          </div>

          <div className="space-y-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-[#121212] border border-neutral-800 rounded-sm p-6 sm:p-8 hover:border-[#00D2FF]/50 transition-all shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Title, Overview */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#00D2FF] font-bold">
                        SERVICE {service.number}
                      </span>
                      {service.isSpecialistHero && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-black bg-[#00D2FF] px-2 py-0.5 rounded-sm">
                          Core Service
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#38BDF8] font-medium">
                      {service.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-2">
                      {service.description}
                    </p>

                    <div className="pt-4 flex items-baseline gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                          Standard Mobile Rate:
                        </span>
                        <div className="text-2xl font-extrabold text-[#00D2FF] font-mono-tabular">
                          {service.id === 'headlight-restoration' ? (
                            <>
                              R650 <span className="text-xs text-emerald-400 font-normal">(both headlights)</span>
                            </>
                          ) : (
                            `From R${service.priceZAR.toLocaleString()}`
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                        {service.durationHours}
                      </span>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => openBooking(service.id)}
                        className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Book This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Inclusions & Highlights */}
                  <div className="lg:col-span-8 bg-[#161616] p-6 rounded-sm border border-neutral-800/80 space-y-6">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#00D2FF] mb-3">
                        What’s Included:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                        {service.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {service.processHighlights && service.processHighlights.length > 0 && (
                      <div className="pt-4 border-t border-neutral-800">
                        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Process Notes:
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {service.processHighlights.map((hl, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-300 text-[11px]"
                            >
                              • {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Mobile Add-On Options */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
              Custom Upgrades
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              MOBILE ADD-ON SERVICES
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Add any of these quick enhancements to your headlight restoration or mobile wash booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((addon) => (
              <div
                key={addon.name}
                className="bg-[#121212] border border-neutral-800 p-6 rounded-sm flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-extrabold text-[#00D2FF] font-mono-tabular">
                      {addon.price}
                    </span>
                    <Plus className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display mb-2">
                    {addon.name}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {addon.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Expanding Services Notice */}
        <section className="bg-[#111111] border border-neutral-800 p-8 sm:p-10 rounded-sm">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-wider">
              Roadmap & Expansion
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              EXPANDING OUR SERVICES OVER TIME
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We are currently focused on mastering mobile headlight restoration and high-quality mobile maintenance detailing across Vredenburg, Saldanha, Langebaan, and Jacobsbaai. As our mobile workshop equips further, we look forward to introducing machine paint correction and advanced coatings to our local West Coast clients.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
