import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { SodicShowcaseSection } from './sections/SodicShowcaseSection';
import { AboutSection } from './sections/AboutSection';
import { ProductSection } from './sections/ProductSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { InteractiveDemo } from './demo/InteractiveDemo';
import { TeamSection } from './sections/TeamSection';
import { CtaSection } from './sections/CtaSection';
import { Footer } from './components/Footer';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { dir } = useLanguage();

  return (
    <div
      dir={dir}
      className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground"
    >
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section (#top) */}
        <HeroSection />

        {/* 3. Dedicated SODIC Showcase Section */}
        <SodicShowcaseSection />

        {/* 4. About Viaara Tech (#about) */}
        <AboutSection />

        {/* 5. The Product (#app) */}
        <ProductSection />

        {/* 6. How It Works (#workflow) */}
        <HowItWorksSection />

        {/* 7. Interactive Live Demo (#demo) */}
        <InteractiveDemo />

        {/* 8. Meet The Team (#team) */}
        <TeamSection />

        {/* 9. Institutional CTA (#contact) */}
        <CtaSection />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
