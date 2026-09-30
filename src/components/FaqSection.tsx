import React, { useState } from 'react';
import { FAQ_LIST } from '../data/studioData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_LIST[0].id]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#090909] border-b border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
            Clarity & Confidence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our wet-sanding restoration method, clearcoats, and booking policies.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#121212] border border-neutral-800/80 rounded-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#161616]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-200 hover:text-white font-display">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp enquiry fallback */}
        <div className="mt-10 p-6 bg-[#111111] border border-neutral-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Have a specific car or condition question?
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Send us a quick photo of your headlights or vehicle on WhatsApp for an instant mobile evaluation.
            </p>
          </div>
          <a
            href={`https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like a quote for mobile detailing on the West Coast."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm text-center"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp: 073 859 5637</span>
          </a>
        </div>
      </div>
    </section>
  );
};
