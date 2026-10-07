import React, { useState } from 'react';
import {
  ArrowRight,
  Car,
  Droplets,
  Sparkles,
  ShieldCheck,
  Wind,
  Armchair,
  SprayCan,
  Brush,
} from 'lucide-react';
import { IMAGES } from '../data/images';

interface DetailingJourneyProps {
  onOpenBooking: (serviceId?: string) => void;
}

type TrackId = 'exterior' | 'interior';

interface Stage {
  label: string;
  subtitle: string;
  description: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  visualNote: string;
}

interface Track {
  id: TrackId;
  tab: string;
  icon: React.ComponentType<{ className?: string }>;
  serviceId: string;
  headline: string;
  blurb: string;
  fromPrice: string;
  stages: Stage[];
}

const TRACKS: Track[] = [
  {
    id: 'exterior',
    tab: 'Exterior Detail',
    icon: Car,
    serviceId: 'west-coast-wash-wax',
    headline: 'THE EXTERIOR DETAIL',
    blurb:
      'Coastal salt, beach sand and gravel-road grit do real damage out here. Four stages to lift it off safely and leave a protected, glossy finish.',
    fromPrice: 'From R250 · 45 – 60 min',
    stages: [
      {
        label: 'DECONTAMINATE',
        subtitle: 'Pre-Rinse & Salt Removal',
        description:
          'A high-pressure pre-rinse floods off loose coastal sand, gravel dust and corrosive sea salt before a single cloth touches the paint. This is the step that prevents wash marring — dragging grit across panels is what puts swirls in your clearcoat.',
        metric: 'Abrasive grit removed before any contact wash',
        icon: Droplets,
        image: IMAGES.paintSwirledSurface,
        visualNote: 'Embedded road film and salt deposits lifted from the surface.',
      },
      {
        label: 'TWO-BUCKET WASH',
        subtitle: 'Scratch-Free Contact Wash',
        description:
          'A pH-neutral slick shampoo with separate wash and rinse buckets on grit guards, so dirt never returns to your paint. Wheel faces, brake-dust arches and tyres are degreased, then the whole vehicle is hand-dried with waffle-weave microfibre.',
        metric: 'Zero hard-water mineral spotting on dry-off',
        icon: SprayCan,
        image: IMAGES.westCoastWashFoam,
        visualNote: 'Safe lubricated wash media, grit isolated in the rinse bucket.',
      },
      {
        label: 'TRIM & GLASS',
        subtitle: 'Plastics, Chrome & Windscreen',
        description:
          'The details that actually age a vehicle. Sun-bleached bumpers, wheel arches and mirror caps are purged and restored to deep factory black, stainless roll bars and side steps are polished out of their salt haze, and baked-on water spots are cut off the glass.',
        metric: 'Chalky grey oxidation and wiper chatter gone',
        icon: Brush,
        image: IMAGES.workshopBay,
        visualNote: 'Faded trim and tarnished metal brought back to an OEM finish.',
      },
      {
        label: 'SEAL & PROTECT',
        subtitle: 'Polymer Gloss & UV Shield',
        description:
          'A high-gloss polymer spray wax is laid over all exterior paintwork, leaving a hydrophobic, UV-resistant barrier against the Langebaan sun. Tyres and exterior plastics get a satin black dressing — no greasy sling, no silicone mess.',
        metric: 'Water-beading UV barrier over every painted panel',
        icon: ShieldCheck,
        image: IMAGES.ceramicBeads,
        visualNote: 'Tight water beading confirms an even, active protective layer.',
      },
    ],
  },
  {
    id: 'interior',
    tab: 'Interior Detail',
    icon: Armchair,
    serviceId: 'essential-interior-detail',
    headline: 'THE INTERIOR DETAIL',
    blurb:
      'No soaking carpets, no damp smell, no waiting for it to dry. A meticulous dry refresh that gets the beach sand out and hands the car back ready to drive.',
    fromPrice: 'From R300 · 45 – 60 min',
    stages: [
      {
        label: 'STRIP & VACUUM',
        subtitle: 'Brush-Agitated Deep Extraction',
        description:
          'Mats out, seats forward, and a brush-agitated vacuum through carpets, seat rails, under the seats and the boot. Agitation is what lifts embedded beach sand out of the pile — a vacuum alone just rides over the top of it.',
        metric: 'Embedded coastal sand pulled from the carpet pile',
        icon: Wind,
        image: IMAGES.interiorLeather,
        visualNote: 'Grit cleared from seat rails, footwells and boot carpeting.',
      },
      {
        label: 'DEGREASE',
        subtitle: 'Dash, Console & Door Cards',
        description:
          'Dashboard, instrument cluster, centre console, switchgear and door cards are worked over with detailing brushes and a light interior cleaner to pull out the dust and skin oils that collect in seams, vents and around the gear lever.',
        metric: 'Dust and hand-oil residue out of every seam and vent',
        icon: Sparkles,
        image: IMAGES.interiorClean,
        visualNote: 'Grime drawn out of textured plastics and tight panel gaps.',
      },
      {
        label: 'DRESS & PROTECT',
        subtitle: 'UV-Protectant Satin Finish',
        description:
          'All interior plastics and door trims get a UV-protectant dressing in a matte/satin finish — the factory look, not a greasy shine that throws windscreen glare. It slows the sun-cracking that turns West Coast dashboards brittle.',
        metric: 'Factory satin feel with zero glare or greasy residue',
        icon: ShieldCheck,
        image: IMAGES.interiorLeather,
        visualNote: 'Even satin sheen across the dash top and door cards.',
      },
      {
        label: 'GLASS & FINISH',
        subtitle: 'Streak-Free Glass & Fresh Cabin',
        description:
          'Interior glass and rearview mirrors are brought up streak-free — the inside film is what wrecks your night vision into oncoming headlights. A subtle deodoriser finishes it off, and the cabin is completely dry and ready to drive immediately.',
        metric: 'Clear night vision and a dry, fresh cabin on handover',
        icon: Droplets,
        image: IMAGES.interiorClean,
        visualNote: 'Interior film cleared from the windscreen and side glass.',
      },
    ],
  },
];

export const DetailingJourney: React.FC<DetailingJourneyProps> = ({
  onOpenBooking,
}) => {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('exterior');
  const [activeStage, setActiveStage] = useState<number>(0);

  const track = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];
  const stages = track.stages;
  const current = stages[activeStage];
  const IconComp = current.icon;

  const selectTrack = (id: TrackId) => {
    setActiveTrackId(id);
    setActiveStage(0);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#090909] border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
            Inside The Mobile Detail
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            INSIDE & OUT
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Detailing is not a car wash. Switch between the exterior and interior
            tracks below to see exactly what we do to your vehicle, stage by
            stage, in your own driveway.
          </p>
        </div>

        {/* Exterior / Interior Track Toggle */}
        <div
          role="tablist"
          aria-label="Detailing tracks"
          className="inline-flex w-full sm:w-auto gap-2 mb-6 bg-[#111111] p-1.5 rounded-sm border border-neutral-800"
        >
          {TRACKS.map((t) => {
            const TabIcon = t.icon;
            const isActive = t.id === activeTrackId;
            return (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => selectTrack(t.id)}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-7 py-3 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00D2FF] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                <TabIcon className="w-4 h-4 shrink-0" />
                <span>{t.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Summary */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">
              {track.headline}
            </h3>
            <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">
              {track.blurb}
            </p>
          </div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] shrink-0">
            {track.fromPrice}
          </div>
        </div>

        {/* Timeline Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-[#111111] p-1.5 rounded-sm border border-neutral-800">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`py-2.5 sm:py-3.5 px-2.5 sm:px-4 text-left rounded-sm transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1D1D] border border-[#00D2FF]/50 shadow-md'
                    : 'bg-transparent hover:bg-neutral-900/60 border border-transparent text-neutral-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-[#00D2FF] font-bold' : 'text-neutral-500'}>
                    0{idx + 1}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />}
                </div>
                <div className={`text-xs sm:text-sm font-bold tracking-wider font-display truncate ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {stage.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131313] border border-neutral-800 p-6 sm:p-10 rounded-sm">
          {/* Left Media Canvas */}
          <div className="lg:col-span-7 relative aspect-video rounded-sm overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            <img
              loading="lazy"
              decoding="async"
              src={current.image}
              alt={`${track.tab}: ${current.label} stage`}
              className="w-full h-full object-cover object-center transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-neutral-700 rounded-sm flex items-center gap-2">
              <IconComp className="w-4 h-4 text-[#00D2FF]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                STAGE: {current.label}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs text-[#00D2FF] font-mono block">What This Step Does</span>
              <span className="text-sm font-semibold text-neutral-200">{current.visualNote}</span>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#00D2FF] mb-2">
                {track.tab} · Stage 0{activeStage + 1} of 04
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
                {current.label}
              </h3>
              <p className="text-sm font-medium text-[#38BDF8] mb-4">
                {current.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="p-4 bg-[#181818] border border-neutral-800 rounded-sm">
                <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">
                  What You Get Out Of It
                </div>
                <div className="text-sm font-semibold text-white">
                  {current.metric}
                </div>
              </div>
            </div>

            {/* Stage Selector Controls */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 3))}
                className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Previous
              </button>

              <div className="flex gap-1.5">
                {stages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                      i === activeStage ? 'bg-[#00D2FF]' : 'bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to stage ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveStage((prev) => (prev < 3 ? prev + 1 : 0))}
                className="text-xs text-[#00D2FF] hover:text-[#38BDF8] font-semibold transition-colors cursor-pointer"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* Closing Action Ribbon */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-neutral-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D2FF] mb-1">
              Inside, Outside, Or Both
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              YOUR CAR. YOUR TURN.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Book the exterior detail, the interior detail, or both together — we bring the water, power and products to your door. Transparent pricing, no hidden charges.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking(track.serviceId)}
            className="w-full md:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>BOOK THIS DETAIL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
