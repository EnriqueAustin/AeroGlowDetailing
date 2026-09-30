import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { AppPage } from '../types';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; page?: AppPage }[];
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbs,
  primaryAction,
  secondaryAction,
}) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/80 bg-gradient-to-b from-[#0F0F0F] via-[#0A0A0A] to-[#080808] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-neutral-400 mb-6">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-[#00D2FF] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>HOME</span>
          </button>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              {crumb.page ? (
                <button
                  type="button"
                  onClick={() => crumb.page && navigateTo(crumb.page)}
                  className="hover:text-[#00D2FF] transition-colors uppercase cursor-pointer"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-neutral-300 font-semibold uppercase">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header content */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            {badge && (
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#00D2FF] uppercase mb-3 border border-[#00D2FF]/30 px-2.5 py-1 rounded-sm bg-[#00D2FF]/5">
                <span>{badge}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight text-balance leading-[1.1]">
              {title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl text-balance">
              {subtitle}
            </p>
          </div>

          {/* Action CTAs */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold tracking-wider uppercase text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700/80 rounded-sm transition-colors cursor-pointer text-center"
                >
                  {secondaryAction.label}
                </button>
              )}
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold tracking-wider uppercase text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-colors shadow-lg shadow-[#00D2FF]/10 cursor-pointer text-center"
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
