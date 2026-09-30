import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MultiStepBookingModal } from './components/MultiStepBookingModal';
import { CouponModal } from './components/CouponModal';

// Pages
import { HomePage } from './pages/HomePage';
import { HeadlightsPage } from './pages/HeadlightsPage';
import { ProcessPage } from './pages/ProcessPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { ServicesPage } from './pages/ServicesPage';
import { PackagesPage } from './pages/PackagesPage';
import { WorkGalleryPage } from './pages/WorkGalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { BookPage } from './pages/BookPage';

function AppContent() {
  const {
    currentPage,
    isBookingOpen,
    closeBooking,
    isCouponOpen,
    closeCoupon,
    preselectedServiceId,
    hasCouponApplied,
    applyCoupon,
  } = useNavigation();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'headlights':
        return <HeadlightsPage />;
      case 'process':
        return <ProcessPage />;
      case 'before-after':
        return <BeforeAfterPage />;
      case 'services':
        return <ServicesPage />;
      case 'packages':
        return <PackagesPage />;
      case 'work':
        return <WorkGalleryPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'faq':
        return <FaqPage />;
      case 'book':
        return <BookPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F0EFEA] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Bespoke Page Render Target */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Mobile Detailing Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Access */}
      <FloatingWhatsApp />

      {/* Multi-Step Interactive Booking Modal (Available on any page) */}
      <MultiStepBookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        preselectedServiceId={preselectedServiceId}
        hasCouponApplied={hasCouponApplied}
      />

      {/* Headlight Coupon Modal (Available on any page) */}
      <CouponModal
        isOpen={isCouponOpen}
        onClose={closeCoupon}
        onApplyAndBook={applyCoupon}
      />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
