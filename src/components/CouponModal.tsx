import React from 'react';
import { X, ShieldCheck, MessageSquare, ArrowRight, MapPin, Check } from 'lucide-react';
import { HERO_HEADLIGHT_OFFER } from '../data/studioData';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAndBook: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyAndBook,
}) => {
  if (!isOpen) return null;

  const whatsAppUrl = `https://wa.me/27738595637?text=${encodeURIComponent(
    "Hi, I'd like to book a headlight restoration at R650 for both headlights."
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141414] border-2 border-[#D4AF37]/60 max-w-md w-full rounded-sm shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-900 border border-neutral-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded-sm mb-4">
          <ShieldCheck className="w-3.5 h-3.5 fill-current" />
          <span>Core West Coast Rate</span>
        </div>

        <h3 className="text-2xl font-extrabold text-white font-display">
          HEADLIGHT RESTORATION: R650
        </h3>
        <p className="text-xs text-neutral-400 mt-1 mb-5 leading-relaxed">
          Both front headlights progressively wet-sanded and sealed with UV-resistant clearcoat / Meguiar's coating. We come to your location across Vredenburg, Saldanha, Langebaan, and Jacobsbaai.
        </p>

        {/* Pricing Card */}
        <div className="bg-[#1A1A1A] border border-neutral-800 p-4 rounded-sm flex items-center justify-between mb-5">
          <div>
            <span className="text-[11px] text-neutral-400 font-mono block">
              Both Front Headlights
            </span>
            <span className="text-3xl font-extrabold text-[#D4AF37] font-mono-tabular">
              R650
            </span>
          </div>
          <div className="text-right flex items-center gap-1.5 text-xs text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>1-Year Guarantee</span>
          </div>
        </div>

        {/* Inclusions */}
        <div className="space-y-2 text-xs text-neutral-300 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Multi-stage wet cut (800 to 3000 grit)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Protective UV clearcoat seal</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pay on completion in your driveway</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onApplyAndBook}
            className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Book Headlights (R650)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-sm transition-all flex items-center justify-center gap-2 text-center"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Direct: 073 859 5637</span>
          </a>
        </div>

        <p className="text-[10px] text-center text-neutral-500 mt-4">
          Vredenburg: FREE Call-Out · Saldanha/Langebaan/Jacobsbaai: FREE over R700!
        </p>
      </div>
    </div>
  );
};
