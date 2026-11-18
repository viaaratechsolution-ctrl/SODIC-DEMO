import React from 'react';
import { Mail, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const CtaSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const contact = t.contact;
  const DirectionalArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-start">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card p-8 md:p-16">
          {/* Ambient Corner Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -start-32 -top-32 size-96 rounded-full bg-gradient-brand opacity-20 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            {/* Narrative & CTA Button */}
            <div>
              <h2
                id="contact-heading"
                className="text-balance font-display text-3xl font-bold leading-snug md:text-5xl text-foreground"
              >
                {contact.titlePrefix}{' '}
                <span className="text-gradient-brand">{contact.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {contact.subtitle}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-7 font-semibold text-primary-foreground transition hover:opacity-90 cursor-pointer whitespace-nowrap"
              >
                <span>{contact.ctaButton}</span>
                <DirectionalArrow className="size-4" />
              </a>
            </div>

            {/* Contact Details */}
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-primary shrink-0" />
                  <span dir="ltr">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone1.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  <span dir="ltr" className="tabular-nums">
                    {contact.phone1}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone2.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  <span dir="ltr" className="tabular-nums">
                    {contact.phone2}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
