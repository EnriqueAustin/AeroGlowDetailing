import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Calendar, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { AppPage } from '../types';
import { AeroGlowLogo } from './AeroGlowLogo';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, openBooking, openCoupon } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage; badge?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Headlights', page: 'headlights', badge: 'R650' },
    { label: 'Detailing', page: 'detailing', badge: 'NEW' },
    { label: 'Process', page: 'process' },
    { label: 'Before & After', page: 'before-after' },
    { label: 'Services', page: 'services' },
    { label: 'Packages', page: 'packages' },
    { label: 'Our Work', page: 'work' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'FAQ', page: 'faq' },
  ];

  const handleLinkClick = (page: AppPage) => {
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/92 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#080808]/98 via-[#080808]/85 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Wordmark & Official Brand Logo */}
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="text-left group shrink-0 cursor-pointer flex items-center hover:opacity-95 transition-opacity"
            >
              <AeroGlowLogo size="md" showSubtitle={true} />
            </button>

            {/* Zone 2: Navigation Links for Bespoke Pages */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-neutral-300">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleLinkClick(link.page)}
                    className={`transition-colors relative py-1 text-xs tracking-wider uppercase flex items-center gap-1 cursor-pointer ${
                      isActive ? 'text-[#00D2FF] font-semibold' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-mono text-black bg-[#00D2FF] px-1.5 py-0.2 rounded-sm font-bold">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00D2FF]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <a
                href={`https://wa.me/27738595637?text=${encodeURIComponent(
                  "Hi, I'd like to book a headlight restoration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#25D366] border border-[#25D366]/50 hover:border-[#25D366] rounded-sm hover:bg-[#25D366]/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>WhatsApp: 073 859 5637</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => handleLinkClick('book')}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 text-xs font-semibold text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Book Mobile Detail</span>
                <span className="sm:hidden">Book</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-400 hover:text-white xl:hidden rounded focus:outline-none focus:ring-1 focus:ring-[#00D2FF] cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden bg-[#080808]/98 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between border-b border-neutral-800 animate-fade-in overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
            <span className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest">
              Navigation Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 py-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left text-lg font-medium py-2.5 px-3 rounded-sm border-b border-neutral-900 flex items-center justify-between cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#00D2FF] bg-neutral-900/60 font-bold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs font-mono text-black bg-[#00D2FF] px-2 py-0.5 rounded font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-neutral-900 space-y-3">
            <a
              href={`https://wa.me/27738595637?text=${encodeURIComponent(
                "Hi, I'd like to book a headlight restoration."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block py-3 text-center text-xs font-bold uppercase tracking-wider text-[#25D366] border border-[#25D366]/50 rounded-sm cursor-pointer"
            >
              WhatsApp: 073 859 5637
            </a>
            <button
              type="button"
              onClick={() => handleLinkClick('book')}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] rounded-sm cursor-pointer"
            >
              Book Mobile Service
            </button>
          </div>
        </div>
      )}
    </>
  );
};
