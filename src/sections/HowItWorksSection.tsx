import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();
  const workflow = t.workflow;

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary">
            {workflow.kicker}
          </p>
          <h2
            id="workflow-heading"
            className="mt-4 text-balance font-display text-3xl font-bold leading-snug md:text-5xl"
          >
            {workflow.titlePrefix}{' '}
            <span className="text-gradient-brand">{workflow.titleHighlight}</span>
          </h2>
        </div>

        {/* 4-Step Sequential Flow (auto flows right-to-left in dir="rtl", left-to-right in dir="ltr") */}
        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.05] md:grid-cols-2 lg:grid-cols-4 text-start">
          {workflow.steps.map((step) => (
            <li key={step.num} className="flex flex-col bg-background p-8">
              <span className="font-display text-5xl font-bold text-gradient-brand tabular-nums">
                {step.num}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
