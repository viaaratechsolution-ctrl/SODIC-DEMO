import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LazyInteractiveDemoWorkspace = React.lazy(() =>
  import('./InteractiveDemoWorkspace').then((mod) => ({
    default: mod.InteractiveDemoWorkspace,
  }))
);

export const InteractiveDemo: React.FC = () => {
  const { t } = useLanguage();
  const demo = t.demoSection;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldRenderDemo, setShouldRenderDemo] = useState<boolean>(false);

  useEffect(() => {
    if (shouldRenderDemo) return;

    if (typeof window !== 'undefined' && window.location.hash === '#demo') {
      setShouldRenderDemo(true);
      return;
    }

    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldRenderDemo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderDemo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldRenderDemo]);

  return (
    <section
      ref={sectionRef}
      id="demo"
      aria-labelledby="demo-heading"
      className="relative scroll-mt-20 overflow-x-clip bg-card/25"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-24 lg:py-32">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary">
            {demo.kicker}
          </p>
          <h2
            id="demo-heading"
            className="mt-4 text-balance font-display text-3xl font-bold leading-snug md:text-5xl"
          >
            {demo.titlePrefix}{' '}
            <span className="text-gradient-brand">{demo.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
            {demo.subtitle}
          </p>
        </div>

        {/* Lazy-loaded Interactive Prototype */}
        {shouldRenderDemo ? (
          <Suspense
            fallback={
              <div className="mt-12 flex justify-center">
                <div className="aspect-[9/19] w-[min(100%,360px)] rounded-[3.25rem] border border-border bg-card/50 animate-pulse" />
              </div>
            }
          >
            <LazyInteractiveDemoWorkspace />
          </Suspense>
        ) : (
          <div className="mt-12 flex justify-center">
            <div className="aspect-[9/19] w-[min(100%,360px)] rounded-[3.25rem] border border-border bg-card/40 flex items-center justify-center text-sm text-muted-foreground px-4 text-center">
              {demo.loadingWorkspace}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
