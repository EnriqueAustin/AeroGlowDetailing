import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { HEADLIGHT_PROCESS_STEPS } from '../data/studioData';
import {
  Layers,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Droplets,
  ArrowRight,
  MapPin,
  Check,
  Car,
} from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();
  const [activeStep, setActiveStep] = useState(0);

  const realEquipment = [
    {
      title: 'Automotive Precision Masking Tape',
      role: 'Vehicle Bodywork Protection',
      desc: 'High-tack, low-residue automotive masking tape applied around the perimeter of every headlight. Shields your front bumper paintwork, fender clearcoat, and rubber seals during sanding and spraying.',
      icon: Layers,
    },
    {
      title: 'Ergonomic Wet-Sanding Blocks & Abrasives',
      role: 'Controlled Polycarbonate Leveling',
      desc: 'Progressive silicon carbide water-lubricated sheets (800, 1200, 2000, and 3000 grit). Gently and uniformly cuts away the yellow sun-burnt crust without gouging or warping lens curves.',
      icon: Wrench,
    },
    {
      title: 'Automotive UV Protective Clearcoat',
      role: 'Lasting Solar Barrier',
      desc: 'Automotive-grade UV clearcoat sprayed onto the keyed lens surface. Bonds directly with the polycarbonate, fills fine sanding lines to full transparency, and seals against future solar oxidation.',
      icon: Sparkles,
    },
    {
      title: 'Two-Bucket Safe Wash with Grit Guards',
      role: 'Scratch-Free Mobile Wash',
      desc: 'Dual wash buckets with sediment trap grids. Wash mitts are constantly rinsed in clean water so dirt and sand particles are never dragged across vehicle clearcoat.',
      icon: Droplets,
    },
  ];

  const mobileValetSteps = [
    {
      number: '01',
      phase: 'PRE-RINSE & SNOW FOAM BATH',
      desc: 'High-pressure rinse to knock off loose road sand and coastal salt, followed by a thick citrus pre-wash foam that loosens traffic film before any hand contact.',
      time: '15 – 20 min',
    },
    {
      number: '02',
      phase: 'TWO-BUCKET SAFE CONTACT WASH',
      desc: 'Gentle hand wash using plush microfiber wash mitts and dedicated grit-guard buckets. Wheel faces and tires scrubbed with dedicated non-acid cleaners.',
      time: '30 – 40 min',
    },
    {
      number: '03',
      phase: 'STREAK-FREE DRY & GLOSS SEALANT',
      desc: 'Blown dry and finished with ultra-plush drying towels. Hydrophobic spray gloss sealant applied across all painted panels for slick water beading.',
      time: '20 min',
    },
    {
      number: '04',
      phase: 'INTERIOR CABIN & BOOT VACUUM',
      desc: 'High-power mobile vacuuming of seats, floor carpets, floor mats, and boot luggage area to extract West Coast sand and dust build-up.',
      time: '30 – 40 min',
    },
    {
      number: '05',
      phase: 'TRIM WIPE & OEM MATTE FINISH',
      desc: 'Dashboard, console, air vents, and door panels dusted and wiped down with UV interior detailer leaving a non-greasy, factory matte appearance.',
      time: '20 min',
    },
  ];

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Our Practical Methodology · West Coast"
        title="OUR MOBILE RESTORATION PROCESS"
        subtitle="No shortcuts, no temporary toothpaste tricks. Discover how our multi-stage wet-sanding and safe mobile detailing methods deliver crystal-clear headlights and lasting protection right at your doorstep."
        breadcrumbs={[{ label: 'Our Process' }]}
        primaryAction={{
          label: 'Book Mobile Service',
          onClick: () => openBooking(),
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* Section 1: Headlight 5-Stage Mobile Process Interactive */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Primary Specialist Protocol
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              THE 5-STAGE HEADLIGHT RESTORATION WORKFLOW
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Every set of headlights is treated on-site with methodical care. Click each step below to inspect how we take lenses from cloudy to crystal clear.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection Accordion / List */}
            <div className="lg:col-span-6 space-y-3">
              {HEADLIGHT_PROCESS_STEPS.map((step, idx) => {
                const isCurrent = activeStep === idx;
                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-sm border cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-[#151515] border-[#D4AF37] shadow-lg'
                        : 'bg-[#0E0E0E] hover:bg-[#121212] border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={`font-mono text-lg font-bold ${
                            isCurrent ? 'text-[#D4AF37]' : 'text-neutral-600'
                          }`}
                        >
                          {step.step}
                        </span>
                        <div>
                          <h3
                            className={`text-base font-bold font-display ${
                              isCurrent ? 'text-white' : 'text-neutral-300'
                            }`}
                          >
                            {step.name}
                          </h3>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                        {step.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Step Detail Box */}
            <div className="lg:col-span-6 bg-[#131313] border border-neutral-800 p-6 sm:p-8 rounded-sm sticky top-28 shadow-xl">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-800 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#D4AF37] uppercase">
                    Stage Details
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
                    Stage {HEADLIGHT_PROCESS_STEPS[activeStep].step}: {HEADLIGHT_PROCESS_STEPS[activeStep].name}
                  </h4>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-700 shrink-0">
                  {HEADLIGHT_PROCESS_STEPS[activeStep].time}
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {HEADLIGHT_PROCESS_STEPS[activeStep].description}
              </p>

              <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 p-4 rounded-sm mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  Key Quality Action:
                </span>
                <p className="text-xs text-neutral-200">
                  {HEADLIGHT_PROCESS_STEPS[activeStep].keyAction}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <span className="text-xs text-neutral-400">
                  Backed by 1-Year Guarantee
                </span>
                <button
                  type="button"
                  onClick={() => openBooking('headlight-restoration')}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-colors cursor-pointer"
                >
                  Book This Procedure (R650)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mobile Setup & Real Equipment */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Tools & Supplies
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              OUR MOBILE EQUIPMENT & CHEMICALS
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              We carry proven, automotive-grade consumables and safe washing tools designed specifically for mobile vehicle care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realEquipment.map((eq) => {
              const Icon = eq.icon;
              return (
                <div
                  key={eq.title}
                  className="p-6 bg-[#121212] border border-neutral-800 rounded-sm hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#D4AF37]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#D4AF37] uppercase block">
                        {eq.role}
                      </span>
                      <h3 className="text-base font-bold text-white font-display mt-0.5 mb-2">
                        {eq.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {eq.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Safe Mobile Washing & Valeting Sequence */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2">
              Vehicle Maintenance
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              MOBILE WASH & MINI-VALET WORKFLOW
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              When we perform an exterior wash or interior valet at your home or workplace, we adhere to strict scratch-free procedures.
            </p>
          </div>

          <div className="space-y-3">
            {mobileValetSteps.map((phase) => (
              <div
                key={phase.number}
                className="p-5 bg-[#121212] border border-neutral-800 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-lg font-bold text-[#D4AF37] shrink-0">
                    {phase.number}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-display">
                      {phase.phase}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-2xl">
                      {phase.desc}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
                    {phase.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: On-Site Requirements Banner */}
        <section className="bg-gradient-to-r from-[#141414] via-[#161616] to-[#141414] border border-neutral-800 p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              On-Site Mobile Logistics
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              WHAT WE NEED FROM YOU ON-SITE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              To complete your mobile restoration or valet, we simply require access to a standard outdoor garden water tap and an ordinary electrical power plug (within ~20 meters). No complicated setup needed!
            </p>
          </div>

          <button
            type="button"
            onClick={() => openBooking()}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer shrink-0"
          >
            Book Mobile Appointment
          </button>
        </section>
      </div>
    </div>
  );
};
