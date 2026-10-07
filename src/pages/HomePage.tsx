import React from 'react';
import { Hero } from '../components/Hero';
import { TwinSpecialities } from '../components/TwinSpecialities';
import { InteractiveServices } from '../components/InteractiveServices';
import { HeadlightFeature } from '../components/HeadlightFeature';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { HeadlightProcessInteractive } from '../components/HeadlightProcessInteractive';
import { DetailingJourney } from '../components/DetailingJourney';
import { ComboValueBand } from '../components/ComboValueBand';
import { PackagesPricing } from '../components/PackagesPricing';
import { WorkGallery } from '../components/WorkGallery';
import { ReviewsSection } from '../components/ReviewsSection';
import { FaqSection } from '../components/FaqSection';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight } from 'lucide-react';
import { BUSINESS, whatsAppLink } from '../data/businessConfig';

export const HomePage: React.FC = () => {
  const { navigateTo, openBooking, openCoupon } = useNavigation();

  return (
    <div className="space-y-0">
      {/* 01: Hero Section */}
      <Hero
        onOpenBooking={() => openBooking()}
        onExploreWork={() => navigateTo('work')}
      />

      {/* 02: Twin Specialities — headlight restoration & detailing, equal billing */}
      <TwinSpecialities
        onNavigate={navigateTo}
        onOpenBooking={(id) => openBooking(id)}
      />

      {/* 03: Interactive Services Discovery (full detailing + headlight menu) */}
      <div className="relative">
        <InteractiveServices
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#080808] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('services')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">Browse All Mobile Detailing Services & Pricing</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 04: The Detailing Journey (Exterior & Interior, stage by stage) */}
      <DetailingJourney onOpenBooking={(id) => openBooking(id)} />

      {/* 05: Headlight Specialist Feature (Core Specialty Offer) */}
      <div className="relative">
        <HeadlightFeature
          onOpenCoupon={openCoupon}
          onBookHeadlights={() => navigateTo('headlights')}
        />
        <div className="bg-[#0D0D0D] pb-8 px-4 text-center">
          <button
            onClick={() => navigateTo('headlights')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">View Dedicated Headlight Restoration Page with Full Technical Specs</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 06: Interactive Draggable Before / After (headlights, trim & chrome proof) */}
      <div className="relative">
        <BeforeAfterSlider
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#0A0A0A] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('before-after')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">View Before & After Comparisons & Visual Proof</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 07: Combined Bundles — the two specialities in one call-out */}
      <ComboValueBand
        onNavigate={navigateTo}
        onOpenBooking={(id) => openBooking(id)}
      />

      {/* 08: Interactive Headlight Process (technical depth) */}
      <div className="relative">
        <HeadlightProcessInteractive />
        <div className="bg-[#080808] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('process')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">View Step-by-Step Mobile Restoration Process</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 09: Transparent Packages & Pricing */}
      <div className="relative">
        <PackagesPricing
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#080808] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('packages')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">Open Packages & Mobile Cost Calculator</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 10: Work Gallery */}
      <div className="relative">
        <WorkGallery onOpenBooking={(id) => openBooking(id)} />
        <div className="bg-[#0A0A0A] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('work')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">View Restoration Demonstrations & Work Archive</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 11: Client Reviews & Studio Credentials */}
      <div className="relative">
        <ReviewsSection />
        <div className="bg-[#080808] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('reviews')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">Read Our 5-Point Quality Charter & Guarantees</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* 12: Frequently Asked Questions Accordion */}
      <div className="relative">
        <FaqSection />
        <div className="bg-[#090909] pb-10 px-4 text-center">
          <button
            onClick={() => navigateTo('faq')}
            className="inline-flex items-center justify-center gap-2 max-w-full text-xs font-mono font-semibold uppercase tracking-wider text-[#00D2FF] hover:text-[#38BDF8] transition-colors cursor-pointer text-center"
          >
            <span className="text-balance">Have Questions? Read Common Questions & Requirements</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Final Conversion Callout */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0C0C0C] to-[#080808] border-b border-neutral-900 text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00D2FF] mb-3">
            Mobile Service Across The West Coast
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight text-balance mb-6">
            READY TO RESTORE YOUR VEHICLE?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed text-balance">
            Guaranteed headlight restoration, proper mobile detailing, or both in one visit. We come directly to your location in Vredenburg, Saldanha, Langebaan, and Jacobsbaai — and you only pay once the work is done.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('book')}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BOOK A MOBILE DETAIL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsAppLink(
                "Hi, I'd like to book mobile headlight restoration and/or detailing."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider text-[#25D366] border border-[#25D366]/50 hover:bg-[#25D366]/10 rounded-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>WHATSAPP: {BUSINESS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
