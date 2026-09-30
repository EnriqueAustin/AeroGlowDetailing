import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { SERVICES, PACKAGES, TRAVEL_ZONES } from '../data/studioData';
import { VehicleType, BookingState, WestCoastArea } from '../types';
import { AeroGlowLogo } from '../components/AeroGlowLogo';
import {
  Calendar,
  Clock,
  Car,
  Camera,
  Check,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const BookPage: React.FC = () => {
  const { preselectedServiceId } = useNavigation();
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

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  // Combine Core Services and Bundles
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

  const baseServicePrice = activeOption.price;

  const getTravelFee = (suburb: WestCoastArea, subtotal: number) => {
    if (suburb === 'Vredenburg') return 0;
    if (suburb === 'Surrounding West Coast') {
      return subtotal >= 1000 ? 0 : 200;
    }
    return subtotal >= 700 ? 0 : 150;
  };

  const travelFee = getTravelFee(booking.suburb, baseServicePrice);
  const totalEstimate = baseServicePrice + travelFee;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        names.push(e.target.files[i].name);
      }
      setUploadedPhotos((prev) => [...prev, ...names]);
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
      `*Area:* ${booking.suburb}\n` +
      `*Address:* ${booking.streetAddress || 'To be confirmed'}\n` +
      `*Water & Power on Site:* ${booking.waterAndPowerAvailable.toUpperCase()}\n` +
      `*Preferred Date:* ${booking.preferredDate} (${booking.preferredTime})\n` +
      `*Customer:* ${booking.clientName} (${booking.clientPhone})\n` +
      `*Estimated Total:* R${totalEstimate.toLocaleString()} (Pay on Completion)\n` +
      `*Call-Out:* ${travelFee === 0 ? 'FREE Call-Out' : `R${travelFee}`}\n` +
      `--------------------------------\n` +
      `*Notes:* ${booking.notes || 'None'}`
  );

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Direct Online Booking · West Coast"
        title="SCHEDULE YOUR MOBILE SERVICE"
        subtitle="Book a mobile appointment at your home or workplace across Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Transparent pricing, no advance deposit needed for headlights, pay upon completion."
        breadcrumbs={[{ label: 'Online Booking' }]}
        primaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like to book a mobile detailing appointment."
            )}`;
          },
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex justify-center mb-6">
          <AeroGlowLogo size="lg" showSubtitle={true} />
        </div>

        <div className="bg-[#121212] border border-neutral-800 rounded-sm shadow-2xl overflow-hidden">
          
          {/* Progress Tracker */}
          {!submitted && (
            <div className="p-3 sm:p-6 bg-[#161616] border-b border-neutral-800">
              <div className="flex items-center justify-between">
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
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-all shrink-0 ${
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
                        className={`text-xs hidden sm:inline ${
                          isCurrent ? 'text-white font-bold' : 'text-neutral-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10">
            {submitted ? (
              /* Success Screen */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#00D2FF]/15 border border-[#00D2FF]/40 flex items-center justify-center mx-auto text-[#00D2FF]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    BOOKING REQUEST SUBMITTED!
                  </h3>
                  <p className="text-neutral-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{booking.clientName}</strong>. Your mobile request for{' '}
                    <strong className="text-white">{booking.suburb}</strong> has been received.
                  </p>
                </div>

                <div className="bg-[#181818] border border-neutral-800 p-6 rounded-sm max-w-md mx-auto text-left text-xs space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Service:</span>
                    <span className="text-white font-semibold">{activeOption.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Location:</span>
                    <span className="text-white font-semibold">{booking.suburb}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Call-Out:</span>
                    <span className={travelFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                      {travelFee === 0 ? 'FREE Call-Out' : `R${travelFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Date:</span>
                    <span className="text-white font-semibold">{booking.preferredDate} ({booking.preferredTime})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-400">Payment:</span>
                    <span className="text-[#00D2FF] font-semibold">Pay on Completion</span>
                  </div>
                  <div className="flex justify-between py-2 pt-3">
                    <span className="text-neutral-300 font-bold">Estimated Cost:</span>
                    <span className="text-xl font-mono-tabular font-extrabold text-[#00D2FF]">
                      R{totalEstimate.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 max-w-md mx-auto pt-2">
                  <a
                    href={`https://wa.me/27738595637?text=${whatsAppText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition-transform shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Booking to WhatsApp (073 859 5637)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Start New Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* STEP 1: Select Service */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Step 1: Choose Your Mobile Service or Bundle
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Select a core headlight service, an individual mobile treatment, or a Weskus value bundle.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {allSelectableItems.map((s) => {
                        const isSelected = booking.serviceId === s.id;
                        return (
                          <div
                            key={s.id}
                            onClick={() => setBooking({ ...booking, serviceId: s.id })}
                            className={`p-4 sm:p-5 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                              isSelected
                                ? 'bg-[#181818] border-[#00D2FF] shadow-lg'
                                : 'bg-[#111111] hover:bg-[#151515] border-neutral-800 text-neutral-400'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <span
                                className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'border-[#00D2FF] bg-[#00D2FF]'
                                    : 'border-neutral-700'
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`font-bold font-display text-base ${
                                      isSelected ? 'text-white' : 'text-neutral-200'
                                    }`}
                                  >
                                    {s.title}
                                  </span>
                                  {s.badge && (
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-[#00D2FF] px-2 py-0.5 rounded-sm">
                                      {s.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-neutral-400 mt-1">{s.subtitle}</p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="font-mono-tabular font-bold text-base text-[#00D2FF]">
                                R{s.price.toLocaleString()}
                              </div>
                              <span className="text-[11px] text-neutral-500 font-mono block">
                                {s.duration}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Vehicle Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Step 2: Vehicle Information
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Provide your vehicle details so we arrive fully prepared.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Vehicle Classification
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { type: 'sedan', label: '🚗 Hatch / Sedan' },
                          { type: 'suv', label: '🚙 SUV / Crossover' },
                          { type: 'bakkie', label: '🛻 Bakkie / 4x4' },
                        ].map((v) => (
                          <button
                            key={v.type}
                            type="button"
                            onClick={() =>
                              setBooking({ ...booking, vehicleType: v.type as VehicleType })
                            }
                            className={`p-3.5 rounded-sm border text-xs font-semibold transition-all cursor-pointer text-center ${
                              booking.vehicleType === v.type
                                ? 'bg-[#181818] border-[#00D2FF] text-[#00D2FF]'
                                : 'bg-[#111111] hover:bg-[#151515] border-neutral-800 text-neutral-400'
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Make, Model & Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ford Ranger 2020 or Toyota Hilux 2017"
                        value={booking.vehicleModel}
                        onChange={(e) => setBooking({ ...booking, vehicleModel: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Upload Vehicle / Headlight Photos (Optional)
                      </label>
                      <label className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-sm p-6 text-center flex flex-col items-center justify-center gap-2 cursor-pointer bg-[#101010] transition-colors">
                        <Camera className="w-6 h-6 text-neutral-500" />
                        <span className="text-xs text-neutral-400">
                          Click to select photos of your headlights or vehicle
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {uploadedPhotos.length > 0 && (
                        <div className="mt-2 text-xs text-[#00D2FF] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>{uploadedPhotos.length} photo(s) selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: Location */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Step 3: West Coast Location
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        We are a 100% mobile service and perform all work at your location.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Operating Area
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                                : 'bg-[#111111] hover:bg-[#151515] border-neutral-800 text-neutral-400'
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
                            Call-out fee is R150, but <strong className="text-[#00D2FF]">completely waived</strong> on any booking over R700!
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Physical Street Address / Business Premises
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 14 Church Street, Vredenburg or Mykonos, Langebaan"
                        value={booking.streetAddress}
                        onChange={(e) => setBooking({ ...booking, streetAddress: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Water Tap & Electricity Plug Access
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
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
                            className={`p-2.5 sm:p-3 rounded-sm border text-xs font-semibold transition-all cursor-pointer text-center ${
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
                        A standard outdoor water tap is used for rinsing wet sanding residue.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 4: Date & Time */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Step 4: Select Appointment Date & Time
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Choose your preferred time slot (Monday – Saturday).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={booking.preferredDate}
                          onChange={(e) => setBooking({ ...booking, preferredDate: e.target.value })}
                          className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                          Preferred Time Window
                        </label>
                        <select
                          value={booking.preferredTime}
                          onChange={(e) => setBooking({ ...booking, preferredTime: e.target.value })}
                          className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm"
                        >
                          <option value="08:30 AM (Early Morning)">08:30 AM (Early Morning)</option>
                          <option value="11:00 AM (Late Morning)">11:00 AM (Late Morning)</option>
                          <option value="02:00 PM (Afternoon)">02:00 PM (Afternoon)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        Special Instructions or Parking Access
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Park behind gate, barking dog in yard, shady driveway, etc."
                        value={booking.notes}
                        onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                        className="w-full bg-[#111111] border border-neutral-800 rounded-sm p-4 text-white focus:outline-none focus:border-[#00D2FF] text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: Final Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Step 5: Contact Details & Confirmation
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        No advance deposit needed for headlight restoration. You inspect and pay upon completion.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={booking.clientName}
                          onChange={(e) => setBooking({ ...booking, clientName: e.target.value })}
                          className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 082 123 4567"
                          value={booking.clientPhone}
                          onChange={(e) => setBooking({ ...booking, clientPhone: e.target.value })}
                          className="w-full bg-[#111111] border border-neutral-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] text-sm font-mono"
                        />
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="p-5 bg-[#161616] border border-[#00D2FF]/30 rounded-sm space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-neutral-400">{activeOption.title}:</span>
                        <span className="text-white font-mono">R{baseServicePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-neutral-400">Call-Out Fee ({booking.suburb}):</span>
                        <span className={travelFee === 0 ? 'text-emerald-400 font-mono font-semibold' : 'text-white font-mono'}>
                          {travelFee === 0 ? 'FREE Call-Out' : `+R${travelFee}`}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-bold text-white block">
                            Estimated Total (Pay on Completion):
                          </span>
                          <span className="text-xs text-neutral-400">
                            1-Year Clarity Guarantee on Headlights · Instant EFT / Cash
                          </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] font-mono-tabular">
                          R{totalEstimate.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-sm transition-colors cursor-pointer"
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
                      className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-10 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Mobile Booking</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
