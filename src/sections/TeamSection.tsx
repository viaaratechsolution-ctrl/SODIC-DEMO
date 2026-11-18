import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { COMPANY_TEAM } from '../data/mockData';

export const TeamSection: React.FC = () => {
  const { t, pick } = useLanguage();
  const team = t.teamSection;

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-start">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">
            {team.kicker}
          </p>
          <h2
            id="team-heading"
            className="mt-4 text-balance font-display text-3xl font-bold leading-snug md:text-5xl"
          >
            {team.titlePrefix}{' '}
            <span className="text-gradient-brand">{team.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {team.subtitle}
          </p>
        </div>

        {/* 6 Real Team Members Grid */}
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY_TEAM.map((member) => {
            const memberName = pick(member.name, member.nameEn);
            const memberRole = pick(member.role, member.roleEn);
            const memberBio = pick(member.bio, member.bioEn);

            return (
              <li
                key={member.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card/60 transition hover:border-primary/30"
              >
                {/* Photo */}
                <div className="relative aspect-[4/4.2] overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={`${team.photoAltPrefix} ${memberName} — ${memberRole}`}
                    className="h-full w-full object-cover object-top grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent"
                  />
                </div>

                {/* Info Body */}
                <div className="p-6">
                  <p className="text-xs font-semibold text-primary">
                    {memberRole}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                    {memberName}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {memberBio}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
