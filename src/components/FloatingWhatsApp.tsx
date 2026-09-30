import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const defaultMessage = encodeURIComponent(
    "Hi AeroGlow Detailing! I'm interested in booking a headlight restoration or mobile detail in the West Coast (Vredenburg / Saldanha / Langebaan / Jacobsbaai)."
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
      <a
        href={`https://wa.me/27738595637?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
        aria-label="Direct WhatsApp Chat with AeroGlow Detailing"
      >
        <MessageSquare className="w-5 h-5 sm:w-4 sm:h-4 fill-current shrink-0" />
        <span className="font-bold tracking-wide hidden sm:inline">WhatsApp Us: 073 859 5637</span>
      </a>
    </div>
  );
};
