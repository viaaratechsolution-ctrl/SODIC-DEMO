import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SodicLogo } from '../components/SodicLogo';

export const SodicShowcaseSection: React.FC = () => {
  const { t } = useLanguage();
  const showcase = t.sodicShowcase;

  return (
    <section
      id="sodic-pitch"
      aria-labelledby="sodic-showcase-heading"
      className="border-y border-white/[0.06] bg-card/35"
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 text-center">
        <h2
          id="sodic-showcase-heading"
          className="text-balance font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl"
        >
          {showcase.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {showcase.subtitle}
        </p>

        {/* Centered SODIC Logo Clear-Space Container */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center rounded-3xl border border-white/15 bg-[#f8fafc] px-10 py-9 shadow-[0_24px_60px_-24px_rgba(26,209,209,0.28)]">
          <SodicLogo size="lg" />
        </div>

        {/* 3 Demo Project Scenario Chips */}
        <div className="mt-7 flex flex-col items-center gap-2.5">
          <span className="text-xs font-medium text-muted-foreground">
            {showcase.scenariosLabel}
          </span>
          <div
            dir="ltr"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {showcase.projects.map((project) => (
              <span
                key={project}
                className="rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
