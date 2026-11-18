import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const navT = t.nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: navT.about },
    { href: '#app', label: navT.app },
    { href: '#workflow', label: navT.workflow },
    { href: '#demo', label: navT.demo },
    { href: '#team', label: navT.team },
  ];

  const handleToggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const renderLanguagePill = (fullWidth = false) => (
    <button
      type="button"
      onClick={handleToggleLanguage}
      aria-label={navT.languageSwitcherLabel}
      aria-pressed={lang === 'en'}
      dir="ltr"
      className={`min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:bg-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background shrink-0 whitespace-nowrap ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <span
        className={`rounded-full px-2 py-0.5 transition-colors ${
          lang === 'ar'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground'
        }`}
      >
        عربي
      </span>
      <span className="text-border select-none" aria-hidden="true">
        |
      </span>
      <span
        className={`rounded-full px-2 py-0.5 transition-colors ${
          lang === 'en'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground'
        }`}
      >
        EN
      </span>
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <a href="#top" aria-label={t.brand.viaaraHomeLabel} className="flex items-center shrink-0">
          <img
            src="/brand/viaara-logo.webp"
            alt={t.brand.viaaraLogoAlt}
            className="h-11 w-auto drop-shadow-[0_0_24px_rgba(63,207,213,0.45)]"
          />
        </a>

        {/* Center Pill Nav */}
        <nav aria-label={navT.mainAriaLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-1.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap shrink-0 rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions: Language Switcher, Contact Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="flex items-center">{renderLanguagePill(false)}</div>

          <a
            href="#contact"
            className="hidden whitespace-nowrap shrink-0 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:inline-flex cursor-pointer"
          >
            {navT.contact}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? navT.closeMenuLabel : navT.openMenuLabel}
            className="grid min-w-[44px] min-h-[44px] size-11 place-items-center rounded-full border border-border lg:hidden text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label={navT.mobileAriaLabel}
          className="border-t border-border px-6 pb-6 lg:hidden bg-background text-start"
        >
          <ul className="flex flex-col pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-lg text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg font-semibold text-primary"
              >
                {navT.contact}
              </a>
            </li>
            <li className="pt-3 border-t border-border/60 mt-2">
              {renderLanguagePill(true)}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
