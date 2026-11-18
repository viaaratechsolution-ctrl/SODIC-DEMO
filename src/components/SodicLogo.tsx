import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface SodicLogoProps {
  size?: 'lg' | 'sm';
  className?: string;
}

const SODIC_LOGO_SRC = '/assets/aistudio/SODIC_Logo_Teal_RGB_b6421046.png';

export const SodicLogo: React.FC<SodicLogoProps> = ({ size = 'lg', className = '' }) => {
  const { t } = useLanguage();

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#f8fafc] px-2.5 py-1.5 shadow-sm select-none ${className}`}
      >
        <img
          src={SODIC_LOGO_SRC}
          alt={t.brand.sodicLogoAlt}
          className="h-4 w-auto object-contain"
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={SODIC_LOGO_SRC}
        alt={t.brand.sodicLogoAlt}
        className="h-12 sm:h-14 w-auto object-contain"
      />
    </div>
  );
};
