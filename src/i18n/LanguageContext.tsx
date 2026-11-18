import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Language, SiteDictionary, translations } from './translations';

interface LanguageContextValue {
  lang: Language;
  dir: 'rtl' | 'ltr';
  isRtl: boolean;
  setLang: (next: Language) => void;
  t: SiteDictionary;
  pick: <T>(arValue: T, enValue?: T) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguageFromUrl(): Language {
  if (typeof window === 'undefined') return 'ar';

  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang')?.toLowerCase();
    if (paramLang === 'en') return 'en';
    if (paramLang === 'ar') return 'ar';

    const path = window.location.pathname.toLowerCase();
    if (path === '/en' || path.startsWith('/en/')) {
      return 'en';
    }
  } catch {
    return 'ar';
  }
  return 'ar';
}

function updateMetaTag(selector: string, content: string) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguageFromUrl);

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';
  const isRtl = lang === 'ar';
  const t = translations[lang] || translations.ar;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      document.title = t.meta.title;
      updateMetaTag('meta[name="description"]', t.meta.description);
      updateMetaTag('meta[property="og:title"]', t.meta.ogTitle);
      updateMetaTag('meta[property="og:description"]', t.meta.ogDescription);
    }
  }, [lang, dir, t.meta]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', next);
        window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
      } catch {
        // Ignore URL update errors in restricted environments
      }
    }
  }, []);

  const pick = useCallback(
    <T,>(arValue: T, enValue?: T): T => {
      if (lang === 'en' && enValue !== undefined) {
        return enValue;
      }
      return arValue;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, dir, isRtl, setLang, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: 'ar',
      dir: 'rtl',
      isRtl: true,
      setLang: () => {},
      t: translations.ar,
      pick: <T,>(arValue: T) => arValue,
    };
  }
  return ctx;
}
