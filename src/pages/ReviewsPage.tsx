import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { QUALITY_CHARTER_PILLARS } from '../data/studioData';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  MessageSquare,
  ArrowRight,
  FileCheck,
  MapPin,
  Check,
  Clock,
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Trust & Customer Commitment · West Coast"
        title="OUR QUALITY CHARTER & COMMITMENT"
        subtitle="We are building our reputation one car at a time across Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Review our written 5-Point Quality Charter and customer guarantees."
        breadcrumbs={[{ label: 'Quality Charter & Trust' }]}
        primaryAction={{
          label: 'Book Mobile Service',
          onClick: () => openBooking(),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like to book a mobile detailing service on the West Coast."
            )}`;
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* Quality Charter Hero Bar */}
        <section className="bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-neutral-800 p-8 sm:p-12 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#00D2FF] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>West Coast Customer Commitment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              OUR 5-POINT QUALITY CHARTER
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              We operate an honest, local mobile service. We do not make false claims or hide behind complicated terms. You inspect your car in person before paying.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="p-4 bg-black/60 rounded-sm border border-neutral-800 text-center">
              <span className="text-2xl font-bold font-mono text-[#00D2FF] block">
                1 YEAR
              </span>
              <span className="text-[10px] uppercase font-mono text-neutral-400">
                Clarity Guarantee
              </span>
            </div>
            <div className="p-4 bg-black/60 rounded-sm border border-neutral-800 text-center">
              <span className="text-2xl font-bold font-mono text-[#00D2FF] block">
                R0
              </span>
              <span className="text-[10px] uppercase font-mono text-neutral-400">
                Deposit Needed
              </span>
            </div>
          </div>
        </section>

        {/* The 5 Pillars in Detail */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-2">
              Our Principles
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              THE STANDARDS YOU CAN EXPECT
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Here is exactly what we promise every driver when we pull up to your driveway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_CHARTER_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[#121212] border border-neutral-800 p-6 sm:p-7 rounded-sm flex flex-col justify-between hover:border-[#00D2FF]/50 transition-all"
              >
                <div>
                  <div className="text-xs font-mono text-[#00D2FF] font-bold mb-3">
                    PILLAR {pillar.number}
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-medium mb-3">
                    {pillar.summary}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Written Guarantee Details */}
        <section className="bg-[#111111] border border-neutral-800 p-8 sm:p-12 rounded-sm space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest mb-1">
              Warranty Terms
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              HOW THE 1-YEAR CLARITY GUARANTEE WORKS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
              When we finish restoring your headlights, you receive a written guarantee card valid for 12 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 text-xs">
            <div className="p-4 bg-black/40 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block">01. WHAT IS COVERED</span>
              <p className="text-neutral-300 leading-relaxed">
                Covers any recurring yellow UV degradation, hazing, or clearcoat peeling under normal driving conditions across the West Coast.
              </p>
            </div>
            <div className="p-4 bg-black/40 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block">02. HOW TO CLAIM</span>
              <p className="text-neutral-300 leading-relaxed">
                Simply send a photo via WhatsApp with your name and address. We schedule a priority revisit to your location at zero charge.
              </p>
            </div>
            <div className="p-4 bg-black/40 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block">03. NO HASSLE POLICY</span>
              <p className="text-neutral-300 leading-relaxed">
                If the clearcoat does not hold up, we fix it. We stand 100% behind our preparation and UV protective chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Feedback Invitation */}
        <section className="bg-gradient-to-r from-[#141414] via-[#161616] to-[#141414] border border-neutral-800 p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF] uppercase">
              <MapPin className="w-4 h-4" />
              <span>West Coast Community Feedback</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Have We Restored Your Vehicle?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We welcome honest feedback from every client in Vredenburg, Saldanha, Langebaan, and Jacobsbaai. Your reviews help us grow and help other local drivers discover proper headlight restoration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/27738595637?text=${encodeURIComponent(
                "Hi, I'd like to leave feedback regarding my recent headlight restoration / mobile detail."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Us: 073 859 5637</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
