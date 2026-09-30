import React, { useState } from 'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  Car,
  Tag,
  Camera,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { VehicleType, BookingState, WestCoastArea } from '../types';
import { SERVICES, PACKAGES, TRAVEL_ZONES } from '../data/studioData';
import { AeroGlowLogo } from './AeroGlowLogo';

interface MultiStepBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  hasCouponApplied?: boolean;
}

export const MultiStepBookingModal: React.FC<MultiStepBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [booking, setBooking] = useState<BookingState>({
    serviceId: preselectedServiceId || 'headlight-restoration',
    vehicleType: 'sedan',
    vehicleModel: '',
    condition: 'moderate',
    suburb: 'Vredenburg',
    streetAddress: '',
    waterAndPowerAvailable: 'yes',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '08:30 AM (Morning)',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    uploadedPhotoNames: [],
    couponApplied: false,
    couponCode: '',
    notes: '',
  });

  const [simulatedUploadedImages, setSimulatedUploadedImages] = useState<string[]>([]);

  if (!isOpen) return null;

  // Combine Core Services and Bundles for seamless booking
  const allSelectableItems = [
    ...SERVICES.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      price: s.priceZAR,
      duration: s.durationHours,
      badge: s.isSpecialistHero ? 'Core Specialist' : 'Core Service',
      isBundle: false,
    })),
    ...PACKAGES.map((p) => ({
      id: p.id,
      title: p.name,
      subtitle: p.description,
      price: p.priceSedan,
      duration: p.duration,
      badge: p.badge || 'Weskus Value Bundle',
      isBundle: true,
    })),
  ];

  const activeOption =
    allSelectableItems.find((item) => item.id === booking.serviceId) || allSelectableItems[0];

  // Base service price
  const baseServicePrice = activeOption.price;

  // Travel calculation
  const getTravelFee = (suburb: WestCoastArea, subtotal: number) => {
    if (suburb === 'Vredenburg') return 0;
    if (suburb === 'Surrounding West Coast') {
      return subtotal >= 1000 ? 0 : 200;
    }
    // Saldanha, Langebaan, Jacobsbaai
    return subtotal >= 700 ? 0 : 150;
  };

  const travelFee = getTravelFee(booking.suburb, baseServicePrice);
  const totalEstimate = baseServicePrice + travelFee;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        names.push(e.target.files[i].name);
      }
      setSimulatedUploadedImages((prev) => [...prev, ...names]);
      setBooking((prev) => ({
        ...prev,
        uploadedPhotoNames: [...prev.uploadedPhotoNames, ...names],
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsAppText = encodeURIComponent(
    `*NEW MOBILE BOOKING REQUEST — AEROGLOW DETAILING*\n` +
      `--------------------------------\n` +
      `*Service:* ${activeOption.title}\n` +
      `*Vehicle:* ${booking.vehicleModel || 'Not specified'} (${booking.vehicleType.toUpperCase()})\n` +
      `*Location:* ${booking.suburb} — ${booking.streetAddress || 'Address on file'}\n` +
      `*Date & Time:* ${booking.preferredDate} at ${booking.preferredTime}\n` +
      `*Water & Power Available:* ${booking.waterAndPowerAvailable.toUpperCase()}\n` +
      `*Client:* ${booking.clientName} (${booking.clientPhone})\n` +
      `*Estimated Cost:* R${totalEstimate.toLocaleString()} (Pay on Completion)\n` +
      `*Travel:* ${travelFee === 0 ? 'FREE Call-Out' : `R${travelFee} Call-Out Fee`}\n` +
      `--------------------------------\n` +
      `*Notes:* ${booking.notes || 'None'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#121212] border border-neutral-800 max-w-2xl w-full rounded-sm shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <AeroGlowLogo size="sm" showSubtitle={false} />
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00D2FF] uppercase tracking-wider">
                <MapPin className="w-3 h-3" />
                <span>West Coast Mobile Booking</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                BOOK YOUR MOBILE SERVICE
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800 cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        {!submitted && (
          <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[#0E0E0E] border-b border-neutral-800/80 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Vehicle' },
              { num: 3, label: 'Location' },
              { num: 4, label: 'Schedule' },
              { num: 5, label: 'Confirm' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="flex items-center gap-1 sm:gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-colors shrink-0 ${
                      isPast
                        ? 'bg-[#00D2FF] text-black'
                        : isCurrent
                        ? 'bg-white text-black ring-2 ring-[#00D2FF]'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {isPast ? '✓' : step.num}
                  </div>
                  <span
                    className={`hidden sm:inline ${
                      isCurrent ? 'text-white font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm text-neutral-300">
          {submitted ? (
            /* Submission Confirmation Screen */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 flex items-center justify-center mx-auto text-[#00D2FF]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  BOOKING REQUEST RECEIVED!
                </h3>
                <p className="text-neutral-400 mt-2 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                  Thank you, <strong className="text-white">{booking.clientName || 'valued customer'}</strong>. We have logged your request for{' '}
                  <strong className="text-white">{booking.suburb}</strong> on{' '}
                  <strong className="text-white">{booking.preferredDate}</strong>.
                </p>
              </div>

              {/* Order Summary Receipt */}
              <div className="bg-[#181818] border border-neutral-800 p-5 rounded-sm max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Selected Service:</span>
                  <span className="text-white font-semibold">{activeOption.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Service Location:</span>
                  <span className="text-white font-semibold">{booking.suburb}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Call-Out Fee:</span>
                  <span className={travelFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                    {travelFee === 0 ? 'FREE Call-Out' : `R${travelFee}`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Payment Terms:</span>
                  <span className="text-[#00D2FF] font-semibold">Pay on Completion</span>
                </div>
                <div className="flex justify-between py-1.5 pt-3">
                  <span className="text-neutral-300 font-bold">Estimated Total:</span>
                  <span className="text-lg font-mono-tabular font-extrabold text-[#00D2FF]">
                    R{totalEstimate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 max-w-md mx-auto">
                <a
                  href={`https://wa.me/27738595637?text=${whatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-transform shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Confirmation to WhatsApp (073 859 5637)</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Step 1: Choose Your Mobile Service or Bundle
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Select from our 7 core services or choose a popular West Coast value bundle.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {allSelectableItems.map((item) => {
                      const isSelected = booking.serviceId === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setBooking({ ...booking, serviceId: item.id })}
                          className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                            isSelected
                              ? 'bg-[#181818] border-[#00D2FF] shadow-md'
                              : 'bg-[#111111] hover:bg-[#141414] border-neutral-800 text-neutral-400'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-[#00D2FF] bg-[#00D2FF]'
                                  : 'border-neutral-700'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-bold font-display text-sm ${
                                    isSelected ? 'text-white' : 'text-neutral-300'
                                  }`}
                                >
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-black bg-[#00D2FF] px-1.5 py-0.2 rounded-sm">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-mono-tabular font-bold text-sm text-[#00D2FF]">
                              R{item.price.toLocaleString()}
                            </div>
                            <span className="text-[10px] text-neutral-500 font-mono block">
                              {item.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Vehicle Body & Condition */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Step 2: Vehicle Details
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Tell us about your vehicle so we arrive with the exact right pads and coatings.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Vehicle Body Classification
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { type: 'sedan', label: '🚗 Hatch / Sedan' },
                        { type: 'suv', label: '🚙 SUV / Crossover' },
                        { type: 'bakkie', label: '🛻 Bakkie / 4x4' },
                      ].map((item) => (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() =>
                            setBooking({ ...booking, vehicleType: item.type as VehicleType })
                          }
                          className={`p-3 rounded-sm border text-xs font-semibold transition-all cursor-pointer text-center ${
                            booking.vehicleType === item.type
                              ? 'bg-[#181818] border-[#00D2FF] text-[#00D2FF]'
                              : 'bg-[#111111] hover:bg-[#141414] border-neutral-800 text-neutral-400'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Vehicle Make, Model & Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Toyota Hilux 2018 or VW Polo 2016"
                      value={booking.vehicleModel}
                      onChange={(e) => setBooking({ ...booking, vehicleModel: e.target.value })}
                      className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm"
                    />
                  </div>

                  {/* Optional Photo Upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Upload Headlight / Car Photo (Optional)
                    </label>
                    <label className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-sm p-4 text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-[#101010] transition-colors">
                      <Camera className="w-5 h-5 text-neutral-500" />
                      <span className="text-xs text-neutral-400">
                        Click to select vehicle photos for evaluation
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleSimulatedUpload}
                        className="hidden"
                      />
                    </label>
                    {simulatedUploadedImages.length > 0 && (
                      <div className="mt-2 text-xs text-[#00D2FF] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>{simulatedUploadedImages.length} photo(s) selected</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: West Coast Location */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Step 3: Service Location (West Coast)
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      We operate a mobile service across the West Coast and come directly to you.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Primary Operating Area
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Vredenburg',
                        'Saldanha',
                        'Langebaan',
                        'Jacobsbaai',
                        'Surrounding West Coast',
                      ].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() =>
                            setBooking({ ...booking, suburb: area as WestCoastArea })
                          }
                          className={`p-3 rounded-sm border text-xs font-semibold transition-all cursor-pointer text-center ${
                            area === 'Surrounding West Coast' ? 'col-span-2 sm:col-span-1' : ''
                          } ${
                            booking.suburb === area
                              ? 'bg-[#181818] border-[#00D2FF] text-[#00D2FF]'
                              : 'bg-[#111111] hover:bg-[#141414] border-neutral-800 text-neutral-400'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-2">
                      {booking.suburb === 'Vredenburg' ? (
                         <span className="text-emerald-400">✓ FREE Call-Out in Vredenburg</span>
                      ) : (
                        <span>
                          Call-out is R150, but <strong className="text-[#00D2FF]">completely waived</strong> on any booking over R700!
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Street Address / Workplace Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 14 Main Road, Vredenburg or Business Park, Saldanha"
                      value={booking.streetAddress}
                      onChange={(e) => setBooking({ ...booking, streetAddress: e.target.value })}
                      className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      Water & Electricity on Site
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'yes', label: '✓ Tap & Plug Available', short: '✓ Available' },
                        { id: 'no', label: '✗ No Tap / Plug', short: '✗ No Tap/Plug' },
                        { id: 'inquire', label: '? Please Inquire', short: '? Inquire' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setBooking({
                              ...booking,
                              waterAndPowerAvailable: item.id as 'yes' | 'no' | 'inquire',
                            })
                          }
                          className={`p-2.5 rounded-sm border text-xs font-semibold transition-all cursor-pointer text-center ${
                            booking.waterAndPowerAvailable === item.id
                              ? 'bg-[#181818] border-[#00D2FF] text-[#00D2FF]'
                              : 'bg-[#111111] border-neutral-800 text-neutral-400'
                          }`}
                        >
                          <span className="hidden sm:inline">{item.label}</span>
                          <span className="sm:hidden">{item.short}</span>
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Standard outdoor garden tap and standard 220V plug required on site.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 4: Schedule */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Step 4: Date & Time Preference
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Select your preferred appointment slot (Monday – Saturday).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={booking.preferredDate}
                        onChange={(e) => setBooking({ ...booking, preferredDate: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={booking.preferredTime}
                        onChange={(e) => setBooking({ ...booking, preferredTime: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm"
                      >
                        <option value="08:30 AM (Early Morning)">08:30 AM (Early Morning)</option>
                        <option value="11:00 AM (Late Morning)">11:00 AM (Late Morning)</option>
                        <option value="02:00 PM (Afternoon)">02:00 PM (Afternoon)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Special Notes or Access Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Gate code, park in driveway, shading available, etc."
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      className="w-full bg-[#111111] border border-neutral-800 rounded-sm p-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Contact & Final Review */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-base font-bold text-white font-display">
                      Step 5: Contact Details & Confirmation
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Enter your details to confirm your mobile appointment. No advance deposit needed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={booking.clientName}
                        onChange={(e) => setBooking({ ...booking, clientName: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 082 123 4567"
                        value={booking.clientPhone}
                        onChange={(e) => setBooking({ ...booking, clientPhone: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-3.5 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-[#00D2FF] text-xs sm:text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-4 bg-[#141414] border border-[#00D2FF]/30 rounded-sm space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">{activeOption.title}:</span>
                      <span className="text-white font-mono">R{baseServicePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Call-Out ({booking.suburb}):</span>
                      <span className={travelFee === 0 ? 'text-emerald-400 font-mono' : 'text-white font-mono'}>
                        {travelFee === 0 ? 'FREE Call-Out' : `+R${travelFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-white font-bold block">
                          Total (Pay On Completion):
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          1-Year Guarantee on headlights · Instant EFT or Cash
                        </span>
                      </div>
                      <div className="text-2xl font-extrabold text-[#00D2FF] font-mono-tabular">
                        R{totalEstimate.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-sm transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 text-xs font-extrabold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
