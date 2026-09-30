import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppPage } from '../types';

interface NavigationContextType {
  currentPage: AppPage;
  navigateTo: (page: AppPage, serviceId?: string) => void;
  isBookingOpen: boolean;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  isCouponOpen: boolean;
  openCoupon: () => void;
  closeCoupon: () => void;
  preselectedServiceId?: string;
  hasCouponApplied: boolean;
  applyCoupon: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const PAGE_TITLES: Record<AppPage, string> = {
  home: 'AeroGlow Detailing | Mobile Headlight Restoration & Detailing | Vredenburg, Saldanha, Langebaan',
  headlights: 'Mobile Headlight Restoration (Wet-Sanding & UV Clearcoat) | AeroGlow Detailing',
  detailing: 'Mobile Auto Detailing & Exterior Wash Packages | AeroGlow Detailing West Coast',
  process: '5-Stage Mobile Restoration Process & Tools | AeroGlow Detailing',
  'before-after': 'Before & After Headlight Restoration Results | AeroGlow Detailing',
  services: 'Mobile Detailing Services & Pricing | AeroGlow Detailing West Coast',
  packages: 'Mobile Packages & Weskus Value Bundles | AeroGlow Detailing',
  work: 'Restoration Demonstrations & Portfolio Archive | AeroGlow Detailing',
  reviews: 'Quality Charter & 1-Year Clarity Guarantee | AeroGlow Detailing',
  faq: 'Mobile Service FAQs & Driver Advice | AeroGlow Detailing',
  book: 'Book Mobile Detailing in Vredenburg, Saldanha, Langebaan | AeroGlow Detailing',
};

const getPageFromHash = (): AppPage => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const validPages: AppPage[] = [
    'home',
    'headlights',
    'detailing',
    'process',
    'before-after',
    'services',
    'packages',
    'work',
    'reviews',
    'faq',
    'book',
  ];
  if (validPages.includes(hash as AppPage)) {
    return hash as AppPage;
  }
  return 'home';
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>(getPageFromHash);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [hasCouponApplied, setHasCouponApplied] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial document title set
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const navigateTo = useCallback((page: AppPage, serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openBooking = useCallback((serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const openCoupon = useCallback(() => {
    setIsCouponOpen(true);
  }, []);

  const closeCoupon = useCallback(() => {
    setIsCouponOpen(false);
  }, []);

  const applyCoupon = useCallback(() => {
    setHasCouponApplied(true);
    setPreselectedServiceId('headlight-restoration');
    setIsCouponOpen(false);
    setIsBookingOpen(true);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateTo,
        isBookingOpen,
        openBooking,
        closeBooking,
        isCouponOpen,
        openCoupon,
        closeCoupon,
        preselectedServiceId,
        hasCouponApplied,
        applyCoupon,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
