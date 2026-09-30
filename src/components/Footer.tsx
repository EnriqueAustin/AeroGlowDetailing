import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { MapPin, MessageSquare, Clock, ShieldCheck, ArrowRight, Car, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openBooking, openCoupon } = useNavigation();

  return (
    <footer className="bg-[#050505] text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left group shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  AEROGLOW DETAILING
                </span>
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase pl-4 mt-0.5">
                Mobile Detailing · West Coast
              </div>
            </button>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Professional mobile headlight restoration and vehicle detailing. We come to your home or workplace across Vredenburg, Saldanha, Langebaan, and Jacobsbaai.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>1-Year Written Clarity Guarantee</span>
            </div>
          </div>

          {/* Dedicated Bespoke Pages */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Bespoke Pages
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('headlights')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Headlight Restoration (R650)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('process')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Our Mobile Process & Method
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('before-after')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Before & After Demonstrations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('services')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Mobile Detailing Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('packages')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Packages & Pricing Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Client & Verification Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Trust & Booking
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('work')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Work & Demonstration Archive
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('reviews')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  5-Point Quality Charter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('faq')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Mobile FAQs & Requirements
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/27738595637?text=${encodeURIComponent(
                    "Hi, I'd like to book a headlight restoration."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline cursor-pointer text-left block"
                >
                  WhatsApp: 073 859 5637 →
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('book')}
                  className="text-[#D4AF37] font-semibold hover:underline cursor-pointer text-left block"
                >
                  Book Mobile Service Online →
                </button>
              </li>
            </ul>
          </div>

          {/* Service Area & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Service Areas
            </div>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Operating Hub: Vredenburg, West Coast</span>
              </div>
              <div className="text-[11px] text-neutral-400 pl-5.5 leading-relaxed">
                Mobile service covering Vredenburg (FREE call-out), Saldanha, Langebaan, and Jacobsbaai (FREE call-out over R700!).
              </div>
              <div className="flex items-center gap-2 pt-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/27738595637?text=${encodeURIComponent(
                    "Hi, I'd like to book a headlight restoration or mobile detailing service."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D4AF37] transition-colors font-mono font-bold"
                >
                  WhatsApp: 073 859 5637
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Mon – Sat: 08:00 – 17:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} AeroGlow Detailing. Mobile Headlight Restoration & Detailing. Vredenburg, Saldanha, Langebaan, West Coast.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-3 sm:gap-6">
            <span>Multi-Stage Wet-Sanding & UV Clearcoat</span>
            <span className="hidden sm:inline">·</span>
            <span>We Come To You</span>
            <span className="hidden sm:inline">·</span>
            <span>Pay on Completion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
