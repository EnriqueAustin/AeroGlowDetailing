import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { FAQ_LIST } from '../data/studioData';
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Droplets,
  Sun,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();
  const [openIds, setOpenIds] = useState<string[]>([FAQ_LIST[0].id, FAQ_LIST[1].id]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'headlights' | 'mobile' | 'booking'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Knowledge Base & Guidance · West Coast"
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle="Clear, honest answers regarding our wet-sanding restoration processes, UV clearcoat protection, mobile logistics, and payment terms across the West Coast."
        breadcrumbs={[{ label: 'FAQ' }]}
        primaryAction={{
          label: 'Book Mobile Service',
          onClick: () => openBooking(),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like a quote for mobile detailing on the West Coast."
            )}`;
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Search & Category Filter */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search questions (e.g. wet-sanding, guarantee, deposit, mobile tap)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3.5 bg-neutral-900 border border-neutral-800 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00D2FF]"
          />

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-neutral-800 rounded-sm">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'headlights', label: 'Headlight Restoration' },
              { id: 'mobile', label: 'Mobile Logistics & Areas' },
              { id: 'booking', label: 'Payment & Guarantees' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#222222] text-[#00D2FF] border border-[#00D2FF]/50 shadow-sm'
                      : 'text-neutral-400 hover:text-white border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#121212] border border-neutral-800 rounded-sm overflow-hidden transition-colors"
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
                    className={`w-5 h-5 text-[#00D2FF] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Post-Restoration Care Guide Section */}
        <section className="bg-gradient-to-r from-[#121212] via-[#161616] to-[#121212] border border-neutral-800 p-8 sm:p-12 rounded-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00D2FF] tracking-widest">
            <BookOpen className="w-4 h-4 text-[#00D2FF]" />
            <span>Driver Aftercare Guide</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            HOW TO MAINTAIN YOUR RESTORED HEADLIGHTS
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Protect your freshly clearcoated headlights and clean vehicle with simple safe washing habits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-neutral-300">
            <div className="p-4 bg-black/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block text-sm">
                01. Two-Bucket Wash Method
              </span>
              <p>
                Never use a single dirty bucket. One bucket holds your clean shampoo solution, while the other holds rinse water with a grit guard.
              </p>
            </div>
            <div className="p-4 bg-black/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block text-sm">
                02. Avoid Spinning Automatic Brushes
              </span>
              <p>
                Service station nylon brushes drag dirt across your headlights and paint. Stick to touchless or gentle hand washing.
              </p>
            </div>
            <div className="p-4 bg-black/50 border border-neutral-800 rounded-sm space-y-2">
              <span className="text-[#00D2FF] font-mono font-bold block text-sm">
                03. Caring For New UV Clearcoat
              </span>
              <p>
                Allow 48 hours before direct high-pressure washing. Gentle pH-neutral washing ensures lasting optical clarity and protects the clearcoat shield.
              </p>
            </div>
          </div>
        </section>

        {/* Direct WhatsApp Callout */}
        <div className="p-6 bg-[#111111] border border-neutral-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Send us a photo of your headlights or message us on WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I have a question regarding mobile headlight restoration / detailing on the West Coast."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-semibold text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp: 073 859 5637</span>
          </a>
        </div>

      </div>
    </div>
  );
};
