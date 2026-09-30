export type VehicleType = 'sedan' | 'suv' | 'bakkie' | 'hatchback';

export type VehicleCondition = 'light' | 'moderate' | 'heavy';

export type WestCoastArea =
  | 'Vredenburg'
  | 'Saldanha'
  | 'Langebaan'
  | 'Jacobsbaai'
  | 'Surrounding West Coast';

export type AppPage =
  | 'home'
  | 'headlights'
  | 'detailing'
  | 'process'
  | 'before-after'
  | 'services'
  | 'packages'
  | 'work'
  | 'reviews'
  | 'faq'
  | 'book';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  priceZAR: number;
  priceVehicle?: {
    sedan: number;
    suv: number;
    bakkie: number;
  };
  durationHours: string;
  inclusions: string[];
  processHighlights: string[];
  imageSrc: string;
  isSpecialistHero?: boolean;
  upsellOption?: {
    label: string;
    addPriceZAR: number;
  };
}

export interface PackagePlan {
  id: string;
  name: string;
  badge?: string;
  category?: 'headlight' | 'wash-detailing' | 'combined-bundle';
  priceSedan: number;
  priceSuv: number;
  priceBakkie: number;
  duration: string;
  description: string;
  includes: string[];
  recommendedFor: string;
  savingsText?: string;
  warranty?: string;
}

export interface TradeDealershipPackage {
  id: string;
  title: string;
  rateDescription: string;
  priceZAR: number;
  targetAudience: string;
  highlights: string[];
}

export interface TravelZone {
  area: WestCoastArea;
  callOutFeeZAR: number;
  waiveThresholdZAR: number;
  description: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: 'headlights' | 'trim' | 'chrome' | 'interior' | 'wash';
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  timeLogged: string;
  technicalDetails: string[];
}

export interface GalleryProject {
  id: string;
  title: string;
  vehicle: string;
  area: string;
  category: 'headlights' | 'trim' | 'chrome' | 'combo' | 'interior';
  thumbnail: string;
  beforeImage?: string;
  afterImage?: string;
  servicesCompleted: string[];
  hoursLogged: string;
  quoteZAR: number;
  summary: string;
  keyOutcomes: string[];
}

export interface CharterPillar {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  area: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'headlights' | 'mobile' | 'booking' | 'trade';
}

export interface BookingState {
  serviceId: string;
  vehicleType: VehicleType;
  vehicleModel: string;
  condition: VehicleCondition;
  suburb: WestCoastArea;
  streetAddress: string;
  waterAndPowerAvailable: 'yes' | 'no' | 'inquire';
  preferredDate: string;
  preferredTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  uploadedPhotoNames: string[];
  couponApplied: boolean;
  couponCode: string;
  curingAddonSelected?: boolean;
  notes: string;
}
