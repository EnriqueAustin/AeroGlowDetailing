import React from 'react';
import { Hero } from '../components/Hero';
import { HeadlightFeature } from '../components/HeadlightFeature';
import { HeadlightProcessInteractive } from '../components/HeadlightProcessInteractive';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { InteractiveServices } from '../components/InteractiveServices';
import { TransformationSequence } from '../components/TransformationSequence';
import { PackagesPricing } from '../components/PackagesPricing';
import { WorkGallery } from '../components/WorkGallery';
import { ReviewsSection } from '../components/ReviewsSection';
import { FaqSection } from '../components/FaqSection';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openBooking, openCoupon } = useNavigation();

  return (
    <div className="space-y-0">
      {/* 01: Hero Section */}
      <Hero
        onOpenBooking={() => openBooking()}
        onExploreWork={() => navigateTo('work')}
      />

      {/* 02: Headlight Specialist Feature (Hero Product) */}
      <div className="relative">
        <HeadlightFeature
          onOpenCoupon={openCoupon}
          onBookHeadlights={() => navigateTo('headlights')}
        />
        <div className="bg-[#0D0D0D] pb-8 text-center">
          <button
            onClick={() => navigateTo('headlights')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>View Dedicated Headlight Restoration Page with Full Technical Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 03: Interactive Headlight Process */}
      <div className="relative">
        <HeadlightProcessInteractive />
        <div className="bg-[#080808] pb-10 text-center">
          <button
            onClick={() => navigateTo('process')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>View Step-by-Step Mobile Restoration Process</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 04: Interactive Draggable Before / After */}
      <div className="relative">
        <BeforeAfterSlider
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#0A0A0A] pb-10 text-center">
          <button
            onClick={() => navigateTo('before-after')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>View Before & After Comparisons & Visual Proof</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 05: Interactive Services Discovery */}
      <div className="relative">
        <InteractiveServices
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#080808] pb-10 text-center">
          <button
            onClick={() => navigateTo('services')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>Browse All Mobile Detailing Services & Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 06: The Transformation Journey (Dirty -> Clean -> Corrected -> Protected) */}
      <TransformationSequence onOpenBooking={() => openBooking()} />

      {/* 07: Transparent Packages & Pricing */}
      <div className="relative">
        <PackagesPricing
          onOpenBooking={(id) => openBooking(id)}
          onOpenCoupon={openCoupon}
        />
        <div className="bg-[#080808] pb-10 text-center">
          <button
            onClick={() => navigateTo('packages')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>Open Packages & Mobile Cost Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 08: Work Gallery */}
      <div className="relative">
        <WorkGallery onOpenBooking={(id) => openBooking(id)} />
        <div className="bg-[#0A0A0A] pb-10 text-center">
          <button
            onClick={() => navigateTo('work')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>View Restoration Demonstrations & Work Archive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 09: Client Reviews & Studio Credentials */}
      <div className="relative">
        <ReviewsSection />
        <div className="bg-[#080808] pb-10 text-center">
          <button
            onClick={() => navigateTo('reviews')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>Read Our 5-Point Quality Charter & Guarantees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10: Frequently Asked Questions Accordion */}
      <div className="relative">
        <FaqSection />
        <div className="bg-[#090909] pb-10 text-center">
          <button
            onClick={() => navigateTo('faq')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C07B] transition-colors cursor-pointer"
          >
            <span>View Mobile FAQs & Service Information</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Final Conversion Callout */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0C0C0C] to-[#080808] border-b border-neutral-900 text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
            Mobile Service Across The West Coast
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight text-balance mb-6">
            READY TO RESTORE YOUR VEHICLE'S HEADLIGHTS?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed text-balance">
            We come directly to your location in Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Professional wet-sanding, durable UV clearcoat, and a written 1-Year Guarantee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('book')}
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BOOK A MOBILE DETAIL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/27738595637?text=${encodeURIComponent(
                "Hi, I'd like to book a headlight restoration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider text-[#25D366] border border-[#25D366]/50 hover:bg-[#25D366]/10 rounded-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>WHATSAPP: 073 859 5637</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
