import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
}

export const AeroGlowLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Height presets
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    hero: 'h-24 sm:h-32 md:h-40',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official AeroGlow Logo with Transparent Background */}
      <div className={`relative flex items-center justify-center shrink-0 ${heightClasses}`}>
        <img
          src="/src/assets/images/aeroglow_logo_transparent.png"
          alt="AeroGlow Detailing Logo"
          className="h-full w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,210,255,0.2)]"
        />
      </div>

      {showSubtitle && size !== 'sm' && (
        <div className="hidden sm:flex flex-col justify-center border-l border-neutral-800 pl-3">
          <span className="text-[10px] font-mono tracking-widest text-[#00D2FF] uppercase font-bold">
            Mobile Detailing
          </span>
          <span className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase">
            West Coast, WC
          </span>
        </div>
      )}
    </div>
  );
};

export default AeroGlowLogo;
