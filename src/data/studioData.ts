import {
  ServiceItem,
  PackagePlan,
  BeforeAfterItem,
  GalleryProject,
  CharterPillar,
  FaqItem,
  TradeDealershipPackage,
  TravelZone,
} from '../types';

export const HERO_HEADLIGHT_OFFER = {
  regularPrice: 650,
  couponPrice: 650,
  couponCode: 'AEROGLOW-DIRECT',
  guaranteeText: '1-Year Written Clarity Guarantee',
  coverage: 'Both Front Headlights',
  processName: "Multi-Stage Wet-Sanding + Meguiar's Headlight Coating / 1K Acrylic Clear Coat",
  serviceArea: 'Vredenburg (FREE Call-Out) · Saldanha, Langebaan, Jacobsbaai (FREE Call-Out on bookings over R700!)',
};

export const TRAVEL_ZONES: TravelZone[] = [
  {
    area: 'Vredenburg',
    callOutFeeZAR: 0,
    waiveThresholdZAR: 0,
    description: 'FREE Call-Out to your home, workplace, or lot.',
  },
  {
    area: 'Saldanha',
    callOutFeeZAR: 150,
    waiveThresholdZAR: 700,
    description: 'R150 Call-Out (Waived completely on any booking over R700!)',
  },
  {
    area: 'Langebaan',
    callOutFeeZAR: 150,
    waiveThresholdZAR: 700,
    description: 'R150 Call-Out (Waived completely on any booking over R700!)',
  },
  {
    area: 'Jacobsbaai',
    callOutFeeZAR: 150,
    waiveThresholdZAR: 700,
    description: 'R150 Call-Out (Waived completely on any booking over R700!)',
  },
  {
    area: 'Surrounding West Coast',
    callOutFeeZAR: 200,
    waiveThresholdZAR: 1000,
    description: 'St Helena Bay, Velddrif & Paternoster by arrangement.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'headlight-restoration',
    number: '01',
    title: 'Premium Headlight Restoration',
    subtitle: '1-Year Guarantee Against West Coast Sun',
    tagline: 'Stop struggling to see at night. Full multi-stage wet-sanding and UV clearcoat.',
    description:
      "Stop struggling to see at night. We don't just do a cheap polish that fades in two months. We fully wet-sand the old UV damage and seal the lens with a premium 1K Acrylic Clear Coat or Meguiar's Headlight Coating. Crystal clear headlights guaranteed against West Coast sun for a full year.",
    priceZAR: 650,
    durationHours: '1.5 – 2 Hours',
    isSpecialistHero: true,
    imageSrc: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
    inclusions: [
      'Dual-side progressive wet-sanding (800 → 1200 → 2000 → 3000 grit)',
      'Total removal of cloudy yellow UV damage & road pitting',
      'Sealed with premium UV-resistant clearcoat / Meguiar\'s protective coating',
      'Automotive masking tape shields surrounding bumper & body paint',
      'Written 1-Year Clarity Guarantee against fading and yellowing',
      'Mobile service: we come to your home, workplace, or lot',
    ],
    processHighlights: [
      'Protective masking applied around lights',
      'Progressive water-lubricated wet cut',
      'IPA chemical wipe degreasing',
      'UV-blocking acrylic clearcoat seal',
    ],
    upsellOption: {
      label: 'While clear coat cures: Add Black Plastic Trim Restoration',
      addPriceZAR: 200,
    },
  },
  {
    id: 'black-plastic-trim',
    number: '02',
    title: 'Black Plastic Trim Restoration',
    subtitle: 'Sun-Bleached Bumpers, Wheel Arches & Mirrors',
    tagline: 'Has the coastal sun turned your bakkie or SUV trims an ugly chalky grey?',
    description:
      'Perfect for bakkies and SUVs. Has the sun turned your bumpers, wheel arches, or mirrors a chalky, ugly grey? We restore the deep black factory finish using premium trim restorer.',
    priceZAR: 250,
    durationHours: '30 – 45 min',
    imageSrc: '/src/assets/images/paint_correction_gloss_1790548103040.jpg',
    inclusions: [
      'Deep chemical purge to lift embedded road dirt from plastic pores',
      'Front & rear unpainted plastic bumpers treated',
      'Wheel arch flares, side mirror caps & door handles restored',
      'UV-penetrating black restorative dye (non-greasy, OEM factory finish)',
      'Waterproof hydrophobic barrier prevents immediate sun bleaching',
    ],
    processHighlights: [
      'Removes chalky white oxidation',
      'Deep satin black appearance restored',
      'No messy silicone residue',
    ],
  },
  {
    id: 'chrome-rollbar-polishing',
    number: '03',
    title: 'Chrome & Roll-Bar Polishing',
    subtitle: 'Roll Bars, Nudge Bars & Side Steps',
    tagline: "Sea salt and road grime dull your bakkie's stainless steel over time.",
    description:
      "Sea salt and road grime dull your bakkie's stainless steel over time. We polish your roll bars, nudge bars, and side steps back to a flawless mirror shine.",
    priceZAR: 250,
    durationHours: '30 – 45 min',
    imageSrc: '/src/assets/images/hero_cinematic_automotive_1790548077922.jpg',
    inclusions: [
      'Stainless steel sports bars & roll bars polished to high gloss',
      'Front nudge bars & bull bars cleared of sea-salt oxidation',
      'Tubular side steps & exhaust tips decontaminated and shined',
      'Specialized micro-abrasive metal polish applied by hand',
      'Protective sealant layer retards future coastal salt corrosion',
    ],
    processHighlights: [
      'Cuts through stubborn coastal salt haze',
      'Restores brilliant reflective mirror sheen',
      'Protects stainless steel against pitting',
    ],
  },
  {
    id: 'windshield-waterspot-removal',
    number: '04',
    title: 'Windshield Water-Spot & Sea-Salt Removal',
    subtitle: 'Baked-On Mineral Rings & Sea-Salt Haze',
    tagline: "Baked-on hard water rings and salt spray that your wipers can't remove.",
    description:
      "Baked-on hard water rings and salt spray that your wipers can't remove. We safely compound the glass so your vision is 100% clear.",
    priceZAR: 200,
    durationHours: '20 – 30 min',
    imageSrc: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
    inclusions: [
      'Deep chemical stripping of road grease and tree sap',
      'Hand compounding of baked-on borehole mineral water spots',
      'Removes etched coastal salt film that creates night wiper glare',
      'Leaves front windshield ultra-slick and completely transparent',
      'Eliminates annoying wiper blade chatter and squeaking',
    ],
    processHighlights: [
      'Dissolves tough mineral scale',
      'Zero wiper chatter',
      'Crystal clear night driving vision',
    ],
  },
  {
    id: 'engine-bay-degreasing',
    number: '05',
    title: 'Engine Bay Degreasing & Detail',
    subtitle: 'Safe Degrease & Showroom Plastics Dressing',
    tagline: 'Selling your car? A dusty, greasy engine bay lowers resale value.',
    description:
      'Selling your car? A dusty, greasy engine bay lowers resale value. We safely degrease the engine block and dress the plastics so it looks like it just drove off the showroom floor.',
    priceZAR: 300,
    durationHours: '45 – 60 min',
    imageSrc: '/src/assets/images/paint_swirled_surface_1790548135101.jpg',
    inclusions: [
      'Alternator and sensitive electronics carefully protected',
      'Citrus heavy-duty degreaser agitated into dirt and oil deposits',
      'Low-moisture controlled rinse preventing electrical damage',
      'Engine covers, plenum, and airbox detailed and conditioned',
      'Satin heat-resistant dressing applied to all plastics and rubber hoses',
    ],
    processHighlights: [
      'Safely dissolves baked-on grime and road dust',
      'Showroom clean appearance under the bonnet',
      'Adds immediate buyer appeal when selling',
    ],
  },
  {
    id: 'interior-spot-cleaning',
    number: '06',
    title: 'Localized Interior Spot-Cleaning',
    subtitle: 'Upholstery, Seats & Roof Lining Stains',
    tagline: 'Spilled coffee on the seat? Greasy marks on the roof lining?',
    description:
      'Spilled coffee on the seat? Greasy marks on the roof lining? We safely agitate and lift isolated stains without needing to soak your entire interior.',
    priceZAR: 250,
    durationHours: '30 – 45 min',
    imageSrc: '/src/assets/images/interior_leather_studio_1790548112651.jpg',
    inclusions: [
      'Targeted enzyme stain lifters agitated into fabric fibers',
      'Lifts coffee spills, mud, oil smudges & food marks',
      'Specialized delicate technique for roof lining fingerprint grease',
      'Controlled localized extraction preventing waterlogged foam',
      'Fast-drying protocol with fresh, subtle cabin scent (no damp odors)',
    ],
    processHighlights: [
      'Price ranges from R200 to R350 depending on stain size',
      'No soaked interior or mould risk',
      'Leaves upholstery clean and fresh',
    ],
  },
  {
    id: 'rubber-door-seal-rejuvenation',
    number: '07',
    title: 'Rubber Door Seal Rejuvenation',
    subtitle: 'Stops Gravel Dust & Highway Wind Whistle',
    tagline: 'Prevent coastal sun from drying out and cracking your door and boot rubbers.',
    description:
      'Prevent coastal sun from drying out and cracking your door and boot rubbers. We treat all seals to keep them soft, preventing dust and wind noise on gravel roads.',
    priceZAR: 150,
    durationHours: '20 min',
    imageSrc: '/src/assets/images/paint_correction_gloss_1790548103040.jpg',
    inclusions: [
      'Deep cleaning of all 4 doors, boot lid, and bonnet rubber gaskets',
      'Silicone-free nourishing UV conditioner massaged into rubber',
      'Restores elasticity and softness so seals do not stick or tear',
      'Forms a tight seal blocking West Coast gravel road dust ingress',
      'Substantially cuts down cabin wind whistle at highway speeds',
    ],
    processHighlights: [
      'Prevents sun-drying and brittle cracking',
      'Keeps West Coast dust out of your cabin',
      'Restores factory acoustic sealing',
    ],
  },
];

export const PACKAGES: PackagePlan[] = [
  {
    id: 'sight-and-shine',
    name: 'Tier 1: The "Sight & Shine" Combo',
    badge: 'Popular Front-End',
    priceSedan: 750,
    priceSuv: 750,
    priceBakkie: 750,
    duration: '1.5 – 2 Hours',
    description:
      'Perfect for a quick front-end facelift! Combines our premium headlight restoration with either full black plastic trim restoration OR chrome & roll-bar polishing.',
    includes: [
      'Premium Headlight Restoration (both front lenses wet-sanded & sealed)',
      '1-Year Written Clarity Guarantee against West Coast sun',
      'Choice of: Chrome & Roll-Bar Polishing OR Black Plastic Trim Restoration',
      'FREE Call-Out across Vredenburg, Saldanha, Langebaan & Jacobsbaai (Over R700!)',
      'Clean combo rate: R750 (Save R150 vs separate items)',
    ],
    recommendedFor: 'Drivers needing clear headlights plus shiny chrome or dark black bumpers.',
    savingsText: 'Save R150 (Combo Rate)',
    warranty: '1-Year Clarity Guarantee',
  },
  {
    id: 'weskus-bakkie-revive',
    name: 'Tier 2: The "Weskus Bakkie Revive"',
    badge: '⭐ BEST SELLER',
    priceSedan: 950,
    priceSuv: 950,
    priceBakkie: 950,
    duration: '2 – 2.5 Hours',
    description:
      "Takes years off your bakkie's appearance in just 90 to 120 minutes. Our most popular bundle for West Coast workhorses and family SUVs.",
    includes: [
      'Premium Headlight Restoration (with 1-Year Guarantee)',
      'Black Plastic Trim Restoration (bumpers, mirrors, wheel arches)',
      'Chrome & Stainless Steel Polish (roll bar, nudge bar, side steps)',
      'Windshield Water-Spot & Sea-Salt Removal',
      'FREE Call-Out to Vredenburg, Saldanha, Langebaan & Jacobsbaai',
      'Straightforward bundle rate: R950 (Save R400 on separate rates!)',
    ],
    recommendedFor: 'Bakkies, 4x4s, and SUVs battered by coastal sun, sea salt, and gravel roads.',
    savingsText: 'Save R400 (⭐ Best Seller)',
    warranty: '1-Year Clarity Guarantee',
  },
  {
    id: 'resale-prep-full-detail',
    name: 'Tier 3: The "Resale Prep" Full Detail',
    badge: 'Maximum Value',
    priceSedan: 1400,
    priceSuv: 1400,
    priceBakkie: 1400,
    duration: '3 – 3.5 Hours',
    description:
      'If you are selling your car, this package will easily add R5,000+ to your asking price. The complete cosmetic refresh inside and out without noisy machines.',
    includes: [
      'Everything in Tier 2 (Headlights, Plastic Trims, Chrome & Windshield)',
      'Full Engine Bay Degrease & Detail (showroom plastics dressing)',
      'Rubber Door Seal Rejuvenation (all 4 doors & boot rubbers)',
      'Localized Interior Spot Stain Removal & Dash Conditioning',
      'FREE Call-Out to your location across the West Coast',
      'Comprehensive detail rate: R1,400 (Save R650+ on separate rates!)',
    ],
    recommendedFor: 'Anyone selling their vehicle or wanting a complete bumper-to-bumper transformation.',
    savingsText: 'Save R650+',
    warranty: '1-Year Clarity Guarantee',
  },
];

export const TRADE_DEALERSHIP_PACKAGES: TradeDealershipPackage[] = [
  {
    id: 'trade-lot-prep',
    title: 'Lot Prep Headlights (3+ Cars Same Day)',
    rateDescription: 'R350 per pair',
    priceZAR: 350,
    targetAudience: 'Used Car Lots, Panel Beaters & Dealerships',
    highlights: [
      'Minimum 3 vehicles serviced on the same lot visit',
      'Full progressive wet-sanding and clear coat seal',
      'Immediate roadworthy compliance and crystal front-line appeal',
      'We come to your lot in Vredenburg or Saldanha',
      'Fast turnaround with zero disruption to your sales floor',
    ],
  },
  {
    id: 'trade-bakkie-fleet',
    title: 'Bakkie Fleet Bundle (Headlights + Plastic Trims)',
    rateDescription: 'R500 per bakkie',
    priceZAR: 500,
    targetAudience: 'Fleet Managers, Rental Companies & Contractors',
    highlights: [
      'Both headlights restored with UV clear coat',
      'All faded bumpers, mirrors, and arches restored to deep black',
      'Maintains professional commercial image for fleet bakkies',
      'On-site servicing at your yard or depot',
      'Bulk invoicing available for businesses',
    ],
  },
];

export const HEADLIGHT_PROCESS_STEPS = [
  {
    step: '01',
    name: 'Precision Perimeter Masking',
    description:
      'We examine the headlights for surface yellowing, pitting, or internal moisture. We apply high-grade automotive masking tape to completely protect the surrounding body paint, bumper, and rubber trim.',
    keyAction: 'Full perimeter masking to guarantee zero contact with car paintwork.',
    time: '10 min',
  },
  {
    step: '02',
    name: 'Progressive Multi-Stage Wet-Sanding',
    description:
      'Using ergonomic wet-sanding blocks with water lubrication, we step progressively through 800, 1200, 2000, and 3000 grit abrasives. This safely shaves away the sun-burnt, oxidized factory layer.',
    keyAction: 'Removes the chalky yellow crust and highway road pitting.',
    time: '40 min',
  },
  {
    step: '03',
    name: 'Chemical Surface Decontamination',
    description:
      'The wet-sanded polycarbonate is wiped down with pure isopropyl alcohol (IPA) to eliminate all sanding slurry, oils, and particulate matter before clearcoat application.',
    keyAction: 'Creates a clean microscopic mechanical anchor for clearcoat adhesion.',
    time: '10 min',
  },
  {
    step: '04',
    name: '1K Acrylic Clear Coat / Meguiar\'s Seal',
    description:
      'We apply a premium 1K Acrylic Clear Coat or Meguiar\'s Headlight Coating. The wet layer immediately fills the fine 3000-grit haze, restoring transparent optical clarity and providing an active UV barrier.',
    keyAction: 'Seals the raw polycarbonate against the harsh West Coast sun.',
    time: '25 min',
  },
  {
    step: '05',
    name: 'Curing & 1-Year Guarantee Issuance',
    description:
      'While the clear coat tacks and cures (20–30 min), you can optionally add black trim or chrome polishing! We inspect the lens clarity, remove all masking tape, and issue your 1-Year Written Guarantee.',
    keyAction: 'Backed by our written 1-Year Guarantee against West Coast sun.',
    time: '15 min',
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterItem[] = [
  {
    id: 'case-headlights',
    title: 'Premium Headlight Restoration: UV Oxidation Removal',
    category: 'headlights',
    beforeImage: '/src/assets/images/headlight_oxidized_lens_1790548123675.jpg',
    afterImage: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
    beforeLabel: 'Cloudy, Yellowed & Oxidized Lens',
    afterLabel: 'Crystal Restored + 1K Acrylic UV Clear Coat',
    description:
      'Demonstrating the difference between sun-baked, oxidized polycarbonate and a lens restored through 4-stage wet-sanding (800 to 3000 grit) followed by UV-protective clearcoat.',
    timeLogged: '1.5 Hours On-Site',
    technicalDetails: [
      'Eliminates cloudy yellow haze caused by coastal UV sun exposure',
      'Significantly improves night driving beam clarity and road visibility',
      'Restores clear optical appearance for roadworthy checks',
      'Protected by our 1-Year Written Clarity Guarantee',
    ],
  },
  {
    id: 'case-trim',
    title: 'Black Plastic Trim Restoration: Chalky Sun Fade',
    category: 'trim',
    beforeImage: '/src/assets/images/paint_swirled_surface_1790548135101.jpg',
    afterImage: '/src/assets/images/paint_correction_gloss_1790548103040.jpg',
    beforeLabel: 'Faded Chalky Grey Bumper & Arches',
    afterLabel: 'Restored Deep Factory Satin Black',
    description:
      'Demonstrating the transformation on sun-bleached bakkie plastics. Specialized trim restorer penetrates deep into the plastic pores to revive the rich black color.',
    timeLogged: '45 min On-Site',
    technicalDetails: [
      'Removes chalky white oxidation caused by West Coast sun',
      'Deep penetrating dye bonds with plastic rather than sitting on top',
      'Non-greasy satin OEM finish that will not wash off in rain',
      'Protects against future UV bleaching and drying',
    ],
  },
  {
    id: 'case-chrome',
    title: 'Chrome & Roll-Bar Polishing: Salt Tarnish Removal',
    category: 'chrome',
    beforeImage: '/src/assets/images/paint_swirled_surface_1790548135101.jpg',
    afterImage: '/src/assets/images/hero_cinematic_automotive_1790548077922.jpg',
    beforeLabel: 'Dull, Salt-Stained Stainless Steel',
    afterLabel: 'Mirror Polish with Corrosion Seal',
    description:
      'Demonstrating the recovery of roll bars and nudge bars dulled by coastal sea salt and road film. Hand-compounded to a brilliant reflective shine.',
    timeLogged: '40 min On-Site',
    technicalDetails: [
      'Removes stubborn coastal salt crust and road film',
      'Restores true mirror reflection without scratching metal',
      'Seals stainless steel against micro-pitting and surface rust',
      'Perfect complement to restored headlights',
    ],
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'demo-headlights-1',
    title: 'Premium Headlight Restoration',
    vehicle: 'Sedan / Hatchback Headlights',
    area: 'Vredenburg',
    category: 'headlights',
    thumbnail: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
    beforeImage: '/src/assets/images/headlight_oxidized_lens_1790548123675.jpg',
    afterImage: '/src/assets/images/headlight_clear_lens_1790548092543.jpg',
    servicesCompleted: [
      'Multi-Stage Wet-Sanding (800 to 3000 grit)',
      '1K Acrylic Clear Coat Seal',
      'Precision Perimeter Masking',
    ],
    hoursLogged: '1.5 Hours',
    quoteZAR: 650,
    summary:
      'Severe yellow cloudiness on oxidized polycarbonate lenses completely removed using 4 progressive wet sanding stages and sealed with UV clearcoat.',
    keyOutcomes: [
      'Restored crystal optical transparency',
      'Substantially improved night driving beam output',
      'Backed by 1-Year Written Clarity Guarantee',
    ],
  },
  {
    id: 'demo-bakkie-revive-1',
    title: 'Tier 2: The Weskus Bakkie Revive',
    vehicle: 'Double Cab Bakkie',
    area: 'Langebaan',
    category: 'combo',
    thumbnail: '/src/assets/images/hero_cinematic_automotive_1790548077922.jpg',
    servicesCompleted: [
      'Premium Headlight Restoration (Clear Coat Seal)',
      'Black Plastic Trim Restoration (Bumpers & Arches)',
      'Chrome Roll-Bar & Nudge Bar Polish',
      'Windshield Water-Spot & Salt Removal',
    ],
    hoursLogged: '2.5 Hours',
    quoteZAR: 1100,
    summary:
      'Complete turnaround for an everyday Weskus bakkie: dull yellowed headlights cleared, grey plastics dyed black, roll bars polished, and glass compounded.',
    keyOutcomes: [
      'Took years off the vehicle appearance in one visit',
      'Headlights backed by 1-Year Written Guarantee',
      'FREE Call-Out to Langebaan applied',
    ],
  },
  {
    id: 'demo-trim-1',
    title: 'Black Plastic Trim Restoration',
    vehicle: 'SUV Bumpers & Mirror Housings',
    area: 'Saldanha',
    category: 'trim',
    thumbnail: '/src/assets/images/paint_correction_gloss_1790548103040.jpg',
    servicesCompleted: [
      'Deep Plastic Pore Decontamination',
      'UV-Penetrating Black Restorative Dye',
      'Hydrophobic Protective Shield',
    ],
    hoursLogged: '45 min',
    quoteZAR: 250,
    summary:
      'Sun-bleached chalky white bumper trim and door handles restored to deep rich satin black with zero greasy silicone residue.',
    keyOutcomes: [
      'Rich factory OEM satin black finish',
      'Long-lasting UV resistance',
      'Added while headlights were curing',
    ],
  },
  {
    id: 'demo-chrome-1',
    title: 'Chrome & Roll-Bar Polishing',
    vehicle: 'Bakkie Stainless Steel Roll Bar',
    area: 'Jacobsbaai',
    category: 'chrome',
    thumbnail: '/src/assets/images/paint_swirled_surface_1790548135101.jpg',
    servicesCompleted: [
      'Sea Salt Decontamination',
      'Hand Metal Polishing Compound',
      'Corrosion Barrier Sealant',
    ],
    hoursLogged: '40 min',
    quoteZAR: 250,
    summary:
      'Roll bars dulled by coastal mist polished back to a mirror shine. Surface sealed against harsh sea-salt air.',
    keyOutcomes: [
      'Flawless mirror finish restored',
      'Salt pitting halted',
      'Stainless steel protected',
    ],
  },
];

export const QUALITY_CHARTER_PILLARS: CharterPillar[] = [
  {
    id: 'pillar-1',
    number: '01',
    title: '1-Year Written Clarity Guarantee',
    summary: 'Clear headlights that last against the West Coast sun.',
    details:
      'We stand behind our wet-sanding and clearcoat process. If your restored headlights develop yellowing or hazing within 12 months under normal use, we return to your location and re-clear them at zero charge.',
  },
  {
    id: 'pillar-2',
    number: '02',
    title: 'Pay Upon Completion',
    summary: 'No advance deposit needed for headlight restoration.',
    details:
      'You only pay once the job is done and you have inspected the crystal-clear results yourself in your driveway. Pay conveniently via Instant EFT or Cash.',
  },
  {
    id: 'pillar-3',
    number: '03',
    title: 'We Come To Your Location',
    summary: 'Hassle-free mobile service across the West Coast.',
    details:
      'No need to leave your car at a workshop or arrange lifts. We bring our mobile equipment directly to you in Vredenburg (FREE call-out), Saldanha, Langebaan, and Jacobsbaai.',
  },
  {
    id: 'pillar-4',
    number: '04',
    title: 'Real Progressive Wet-Sanding',
    summary: 'Proper multi-stage cut, not temporary paste.',
    details:
      'We never use cheap DIY buffing pastes or toothpaste that cloud over in 4 weeks. We use progressive water-lubricated 800 to 3000 grit wet sanding and durable 1K Acrylic Clear Coat or Meguiar\'s coating.',
  },
  {
    id: 'pillar-5',
    number: '05',
    title: 'Transparent West Coast Pricing',
    summary: 'Fixed ZAR pricing with call-out fee waived over R700.',
    details:
      'Headlights are R650 standard for both front lights (with written 1-Year Guarantee). Call-out to Saldanha, Langebaan, or Jacobsbaai is R150, but waived completely if you book any service or bundle over R700!',
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'headlights',
    question: 'Why do you wet-sand and spray clearcoat instead of using a quick polish?',
    answer:
      "Modern car headlights are made of polycarbonate plastic with a factory UV shield. The harsh West Coast sun breaks down this barrier, turning the plastic yellow and cloudy. Simply buffing the lens with polishing paste or toothpaste only cleans surface dirt for 3 to 6 weeks, leaving the bare plastic exposed to yellow even faster. Our process physically wet-sands away the dead, oxidized layer across 4 grits (800 to 3000) and seals the lens with a premium 1K Acrylic Clear Coat or Meguiar's Headlight Coating that bonds with the plastic and shields it from the sun. That is why we back our work with a 1-Year Guarantee.",
  },
  {
    id: 'faq-2',
    category: 'headlights',
    question: 'What does the 1-Year Clarity Guarantee cover?',
    answer:
      'Our 1-Year Clarity Guarantee covers both front headlight lenses against yellowing, UV hazing, or clearcoat peeling under normal driving conditions. If your headlights begin to yellow within 12 months of restoration, we will return to your location and re-treat them at zero charge.',
  },
  {
    id: 'faq-3',
    category: 'booking',
    question: 'How do your travel and call-out fees work?',
    answer:
      'We are based in Vredenburg, so call-outs within Vredenburg are completely FREE. For Saldanha, Langebaan, and Jacobsbaai, our standard call-out fee is R150. However, if you book any service or bundle over R700 (such as Tier 1 Sight & Shine, Tier 2 Weskus Bakkie Revive, or headlights with an add-on), the call-out fee is WAIVED COMPLETELY!',
  },
  {
    id: 'faq-4',
    category: 'mobile',
    question: 'What is the "Curing Time Upsell"?',
    answer:
      'After we apply the acrylic clear coat to your headlights, the clear coat needs 20 to 30 minutes to tack and cure. While we wait on-site, you can add Black Plastic Trim Restoration for only R200 (normally R250) or Chrome Polishing for R200. It gives your vehicle an instant extra facelift while saving you money!',
  },
  {
    id: 'faq-5',
    category: 'trade',
    question: 'Do you offer trade and dealership pricing for car lots and panel beaters?',
    answer:
      'Yes! For used car lots, panel beaters, and fleet managers in Vredenburg and Saldanha, we offer Lot Prep Headlights at R350 per pair (minimum 3 vehicles on the same day) and Bakkie Fleet Bundles (Headlights + Plastic Trims) at R500 per bakkie. We come directly to your lot with fast turnaround and no disruption to your sales floor.',
  },
  {
    id: 'faq-6',
    category: 'booking',
    question: 'Do you require a deposit, and how do I pay?',
    answer:
      'No advance deposit is required for residential headlight restoration or bundle services. You inspect the completed restoration on your vehicle in your driveway and only pay once you are completely satisfied with the clarity. We accept Instant EFT and Cash upon completion.',
  },
  {
    id: 'faq-7',
    category: 'mobile',
    question: 'What do you need from me on-site?',
    answer:
      'Because all our services are hand-applied and mobile (no noisy power tools or delicate machines needed!), we simply need a space to park next to your vehicle, access to a standard garden water tap for wet-sanding rinsing, and an electrical plug if interior vacuuming or spot cleaning is booked.',
  },
];
