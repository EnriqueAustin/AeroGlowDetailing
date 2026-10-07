import React, { useState } from 'react';
import { SERVICES, PACKAGES } from '../data/studioData';
import { BookingState, WestCoastArea } from '../types';
import { BUSINESS } from '../data/businessConfig';

export const useBookingFlow = (preselectedServiceId?: string) => {
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

  const allSelectableItems = [
    ...SERVICES.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      price: s.priceVehicle
        ? (booking.vehicleType === 'sedan' || booking.vehicleType === 'hatchback'
            ? s.priceVehicle.sedan
            : s.priceVehicle.bakkie)
        : s.priceZAR,
      duration: s.durationHours,
      badge: s.isSpecialistHero ? 'Core Specialist' : 'Mobile Service',
      isBundle: false,
    })),
    ...PACKAGES.map((p) => ({
      id: p.id,
      title: p.name,
      subtitle: p.description,
      price:
        booking.vehicleType === 'sedan' || booking.vehicleType === 'hatchback'
          ? p.priceSedan
          : booking.vehicleType === 'suv'
          ? p.priceSuv
          : p.priceBakkie,
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

  const submitBooking = (e: React.FormEvent, whatsAppText: string) => {
    e.preventDefault();
    if (currentStep < 5) {
      handleNext();
      return;
    }
    window.open(`${BUSINESS.whatsAppBase}?text=${whatsAppText}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return {
    currentStep,
    setCurrentStep,
    submitted,
    setSubmitted,
    booking,
    setBooking,
    uploadedPhotos,
    allSelectableItems,
    activeOption,
    baseServicePrice,
    travelFee,
    totalEstimate,
    handlePhotoUpload,
    handleNext,
    handleBack,
    submitBooking,
  };
};
