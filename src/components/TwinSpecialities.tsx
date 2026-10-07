import React from 'react';
import { ArrowRight, Check, Sun, Droplets } from 'lucide-react';
import { IMAGES } from '../data/images';
import { AppPage } from '../types';

interface TwinSpecialitiesProps {
  onNavigate: (page: AppPage) => void;
  onOpenBooking: (serviceId?: string) => void;
}

const PILLARS = [
  {
    id: 'headlight-restoration',
    page: 'headlights' as AppPage,
    kicker: 'Speciality 01',
    icon: Sun,
    title: 'HEADLIGHT RESTORATION',
    fromPrice: 'From R650 per pair',
    image: IMAGES.headlightClear,
    imageAlt:
      'Crystal clear restored headlight lens after multi-stage wet-sanding and UV clearcoat',
    blurb:
      'Real multi-stage wet-sanding and a sealed UV clearcoat — not a polish that fades in two months. Backed by a written 1-Year Clarity Guarantee.',
    points: [
      '800 → 3000 grit progressive wet-sand',
      'UV clearcoat / Meguiar\'s seal',
      '1-Year Written Clarity Guarantee',
    ],
    cta: 'Explore Headlight Restoration',
  },
  {
    id: 'west-coast-wash-wax',
    page: 'detailing' as AppPage,
    kicker: 'Speciality 02',
    icon: Droplets,
    title: 'MOBILE DETAILING',
    fromPrice: 'From R250 per vehicle',
    image: IMAGES.westCoastWashFoam,
    imageAlt:
      'Vehicle covered in cleaning foam during a safe two-bucket mobile hand wash',
    blurb:
      'Scratch-free two-bucket hand washes, interiors stripped of beach sand, sun-bleached trim brought back to black — all at your home or workplace.',
    points: [
      'Two-bucket wash + polymer gloss wax',
      'Deep interior vacuum & dressing',
      'Trim, chrome, glass & engine bay',
    ],
    cta: 'Explore Mobile Detailing',
  },
];

export const TwinSpecialities: React.FC<TwinSpecialitiesProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0B] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            Two Specialities · One Mobile Visit
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            CLEAR HEADLIGHTS. CLEAN CAR.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed text-balance">
            AeroGlow is built on two things we do properly: guaranteed headlight
            restoration and genuine mobile detailing. Book either on its own, or
            let us handle both in a single visit.
          </p>
        </div>

        {/* Equal-weight pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group flex flex-col bg-[#101010] border border-neutral-800 hover:border-[#00D2FF]/50 rounded-sm overflow-hidden transition-colors"
              >
                {/* Visual */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#00D2FF]">
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{pillar.kicker}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="mt-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF]">
                    {pillar.fromPrice}
                  </div>

                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                    {pillar.blurb}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-neutral-300"
                      >
                        <Check className="w-4 h-4 text-[#00D2FF] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(pillar.id)}
                      className="flex-1 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-colors cursor-pointer"
                    >
                      Book This
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate(pillar.page)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-sm transition-colors cursor-pointer"
                    >
                      <span>{pillar.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
