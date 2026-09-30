import React from 'react';
import { QUALITY_CHARTER_PILLARS } from '../data/studioData';
import { ShieldCheck, CheckCircle2, MessageSquare, Award, ThumbsUp, MapPin } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#080808] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Our Local Customer Commitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            THE AEROGLOW QUALITY CHARTER
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed text-balance">
            We are a mobile service dedicated to quality restoration, not high-volume rushing.
            Here is our written promise to every vehicle owner across Vredenburg, Saldanha, Langebaan, and Jacobsbaai.
          </p>
        </div>

        {/* 5-Point Quality Assurance Charter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left mb-16">
          {QUALITY_CHARTER_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 bg-[#111111] border border-neutral-800 rounded-sm hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#D4AF37] mb-3 font-bold">
                  {pillar.number}
                </div>
                <h3 className="text-base font-bold text-white font-display mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#E5C07B] font-medium mb-3">
                  {pillar.summary}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust & Feedback Callout Banner */}
        <div className="bg-gradient-to-r from-[#121212] via-[#161616] to-[#121212] border border-neutral-800 p-8 sm:p-10 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>West Coast Local Business</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Building Trust in Our Local Community
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We take pride in every headlight set we restore and every vehicle we clean. You inspect the work in person before paying, guaranteeing complete peace of mind. Have we worked on your vehicle? We invite your feedback directly on Google or via WhatsApp!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/27738595637?text=${encodeURIComponent(
                "Hi, I'd like to book a mobile detailing service or ask a question."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp: 073 859 5637</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
