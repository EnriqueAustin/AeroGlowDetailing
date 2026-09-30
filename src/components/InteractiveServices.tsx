import React, { useState } from 'react';
import { SERVICES } from '../data/studioData';
import { ArrowRight, Check, Clock, ShieldCheck, Tag } from 'lucide-react';

interface InteractiveServicesProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCoupon: () => void;
}

export const InteractiveServices: React.FC<InteractiveServicesProps> = ({
  onOpenBooking,
  onOpenCoupon,
}) => {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  const activeService =
    SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#080808] border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            Mobile Detailing & Headlight Restoration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            WHAT WE DO
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Select a service below to explore our mobile restoration methodology, inclusions, and transparent local rates.
          </p>
        </div>

        {/* Master Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Interactive Service List */}
          <div className="lg:col-span-6 space-y-2">
            {SERVICES.map((service) => {
              const isSelected = service.id === activeServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  className={`p-5 sm:p-6 rounded-sm border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-[#151515] border-[#00D2FF]/60 shadow-lg'
                      : 'bg-[#0E0E0E] hover:bg-[#121212] border-neutral-800/80 text-neutral-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Editorial Number */}
                      <span
                        className={`text-xl sm:text-2xl font-bold font-mono transition-colors ${
                          isSelected ? 'text-[#00D2FF]' : 'text-neutral-600 group-hover:text-neutral-400'
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-lg sm:text-xl font-bold font-display transition-colors ${
                              isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                            }`}
                          >
                            {service.title}
                          </h3>
                          {service.isSpecialistHero && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00D2FF] border border-[#00D2FF]/40 px-2 py-0.5 rounded-sm">
                              Specialist
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Price Indicator */}
                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-bold font-mono-tabular text-white">
                        {service.id === 'headlight-restoration' ? 'R650' : `From R${service.priceZAR.toLocaleString()}`}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {service.durationHours}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Card */}
          <div className="lg:col-span-6 sticky top-28 bg-[#131313] border border-neutral-800 rounded-sm p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
            {/* Visual Header */}
            <div>
              <div className="relative aspect-video w-full rounded-sm overflow-hidden mb-6 bg-black border border-neutral-800">
                <img
                  src={activeService.imageSrc}
                  alt={activeService.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#00D2FF] block">
                      CHAPTER {activeService.number}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                      {activeService.title}
                    </h4>
                  </div>
                  <div className="text-right bg-black/70 px-3 py-1 rounded-sm border border-neutral-800 text-xs text-[#00D2FF] font-mono-tabular">
                    Est. {activeService.durationHours}
                  </div>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs sm:text-sm font-medium text-neutral-300 mb-4 leading-relaxed">
                {activeService.description}
              </p>

              {/* Inclusions Checkbox list */}
              <div className="space-y-2 mb-6">
                <div className="text-xs uppercase font-semibold tracking-wider text-neutral-400">
                  Included in this procedure:
                </div>
                {activeService.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-neutral-400 block font-mono">
                  Standard Mobile Rate
                </span>
                <span className="text-2xl font-extrabold text-[#00D2FF] font-mono-tabular">
                  {activeService.id === 'headlight-restoration' ? (
                    <>
                      R650 <span className="text-xs text-emerald-400 font-normal">(both headlights)</span>
                    </>
                  ) : (
                    `From R${activeService.priceZAR.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/27738595637?text=${encodeURIComponent(
                    `Hi, I'd like to book ${activeService.title} in the West Coast.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/10 rounded-sm transition-colors cursor-pointer text-center"
                >
                  WhatsApp: 073 859 5637
                </a>
                <button
                  type="button"
                  onClick={() => onOpenBooking(activeService.id)}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
