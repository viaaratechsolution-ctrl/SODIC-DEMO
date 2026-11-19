import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.05] bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#top" aria-label={t.brand.viaaraBackToTopLabel} className="flex items-center">
            <img
              src="/brand/viaara-logo.webp"
              alt={t.brand.viaaraLogoAlt}
              className="h-9 w-auto drop-shadow-[0_0_16px_rgba(63,207,213,0.35)]"
              loading="lazy"
            />
          </a>
          <span className="text-border" aria-hidden="true">
            |
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {t.footer.platformTag}
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-center">{t.footer.copyright}</p>
      </div>
    </footer>
  );
};
