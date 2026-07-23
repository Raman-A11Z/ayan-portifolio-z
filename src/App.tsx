import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeId } from './types';
import { THEMES } from './data/themeData';
import { Header } from './components/Header';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { HeroSection } from './components/HeroSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TeamSection } from './components/TeamSection';
import { ServicesSection } from './components/ServicesSection';
import { IncludedFeaturesSection } from './components/IncludedFeaturesSection';
import { PricingSection } from './components/PricingSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TrustAndProcessSection } from './components/TrustAndProcessSection';
import { CTASection } from './components/CTASection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

// Interactive UX & CMS Utilities
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { CMSProvider } from './contexts/CMSContext';

// Pages
import { AboutSection } from './components/AboutSection';
import { ServicesPage } from './components/ServicesPage';
import { BookConsultationPage } from './components/BookConsultationPage';
import { ContactPage } from './components/ContactPage';
import { BlogPage } from './components/BlogPage';
import { FAQPage } from './components/FAQPage';
import { TestimonialsPage } from './components/TestimonialsPage';
import { PoliciesPage } from './components/PoliciesPage';
import { EarnCareersPage } from './components/EarnCareersPage';
import { SEOHead } from './components/SEOHead';

// Admin area (protected)
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Dashboard } from './components/admin/Dashboard';
import { BlogManager } from './components/admin/BlogManager';

// Status & Error Pages
import { NotFoundPage } from './components/NotFoundPage';
import { ServerErrorPage } from './components/ServerErrorPage';
import { MaintenancePage } from './components/MaintenancePage';
import { ComingSoonPage } from './components/ComingSoonPage';

function HomePage({
  currentTheme,
  onOpenContactWithBrief,
  onOpenContact
}: {
  currentTheme: ThemeId;
  onOpenContactWithBrief: (brief: string) => void;
  onOpenContact: () => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Ayan Web Studio • Premium Web Development & 3D Digital Experiences in Patna, India"
        description="Ayan Web Studio engineers high-performance custom React business websites, 3D WebGL applications, e-commerce storefronts, and digital experiences in India with 3 months free maintenance."
        keywords="website design company patna, web development agency bihar, ayan web studio, custom react development, 3d website development, ecommerce website patna"
      />

      {/* 1. Hero Section */}
      <HeroSection
        currentTheme={currentTheme}
        onOpenEstimator={() => navigate('/book')}
        onOpenContact={() => navigate('/book')}
      />

      {/* 2. Core Services */}
      <ServicesSection
        currentTheme={currentTheme}
        currency="INR"
        onSelectServiceForEstimator={() => navigate('/book')}
        onOpenContact={onOpenContact}
      />

      {/* 3. Simple Featured Showcase (Top 3 Projects) */}
      <ShowcaseSection currentTheme={currentTheme} isHome={true} />

      {/* 4. Transparent Pricing Tiers */}
      <PricingSection
        currentTheme={currentTheme}
        currency="INR"
        onOpenContactWithBrief={onOpenContactWithBrief}
      />

      {/* 5. Trust Pillars & Verified Client Reviews */}
      <TrustAndProcessSection
        currentTheme={currentTheme}
        onOpenContact={onOpenContact}
      />

      {/* 6. Direct Call to Action */}
      <CTASection
        currentTheme={currentTheme}
        onOpenContact={() => navigate('/book')}
      />
    </>
  );
}

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('artisticFlair');
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [contactInitialBrief, setContactInitialBrief] = useState<string>('');

  const activeTheme = THEMES[currentTheme] || THEMES['artisticFlair'] || THEMES['deepPurple'];

  const handleOpenContactWithBrief = (briefText: string) => {
    setContactInitialBrief(briefText);
    setContactModalOpen(true);
  };

  return (
    <CMSProvider>
      <BrowserRouter>
        {/* Production Loading Animation */}
        <LoadingScreen />

        {/* Global UX Enhancement Controls */}
        <CustomCursor />
        <ScrollProgressBar />
        <BackToTop />

        <div className={`min-h-screen ${activeTheme.bgClass} ${activeTheme.textPrimary} transition-colors duration-500 font-sans selection:bg-cyan-400 selection:text-black overflow-x-hidden relative flex flex-col justify-between`}>
          
          {/* Ambient background glow orbs */}
          <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

          {/* Header Navigation */}
          <Header
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            onOpenContact={() => {
              setContactInitialBrief('');
              setContactModalOpen(true);
            }}
          />

          {/* Theme Switcher Control */}
          <ThemeSwitcher
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
          />

          {/* Main Routes */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    currentTheme={currentTheme}
                    onOpenContactWithBrief={handleOpenContactWithBrief}
                    onOpenContact={() => setContactModalOpen(true)}
                  />
                }
              />

              <Route
                path="/team"
                element={
                  <div className="pt-24 pb-16">
                    <SEOHead
                      title="Meet the Team Behind Ayan Web Studio • Leadership & Developers"
                      description="Passionate professionals working together to design, develop, and deliver modern digital experiences for businesses across India."
                    />
                    <TeamSection currentTheme={currentTheme} />
                  </div>
                }
              />

              <Route
                path="/services"
                element={
                  <ServicesPage
                    currentTheme={currentTheme}
                    onOpenContact={() => setContactModalOpen(true)}
                  />
                }
              />

              <Route
                path="/pricing"
                element={
                  <div className="pt-24 pb-16">
                    <SEOHead
                      title="Transparent Web Development Pricing Packages • Ayan Web Studio"
                      description="Explore clear website packages starting at ₹11,999 with 3-month free maintenance."
                    />
                    <PricingSection
                      currentTheme={currentTheme}
                      currency="INR"
                      onOpenContactWithBrief={handleOpenContactWithBrief}
                    />
                  </div>
                }
              />

              <Route
                path="/showcase"
                element={
                  <div className="pt-24 pb-16">
                    <SEOHead
                      title="Client Portfolio & Case Studies • Ayan Web Studio Patna"
                      description="Discover live client projects, sub-second Lighthouse performance ratings, and before/after website transformations."
                    />
                    <ShowcaseSection currentTheme={currentTheme} />
                  </div>
                }
              />

              <Route
                path="/earn-careers"
                element={<EarnCareersPage currentTheme={currentTheme} />}
              />
              <Route
                path="/earn"
                element={<EarnCareersPage currentTheme={currentTheme} />}
              />

              <Route
                path="/about"
                element={<AboutSection currentTheme={currentTheme} />}
              />

              <Route
                path="/book"
                element={<BookConsultationPage currentTheme={currentTheme} currency="INR" />}
              />

              <Route
                path="/contact"
                element={<ContactPage currentTheme={currentTheme} />}
              />

              <Route
                path="/blog/:slug"
                element={<BlogPage currentTheme={currentTheme} />}
              />

              <Route
                path="/blog"
                element={<BlogPage currentTheme={currentTheme} />}
              />

              <Route
                path="/faq"
                element={
                  <FAQPage
                    currentTheme={currentTheme}
                    onOpenContact={() => setContactModalOpen(true)}
                  />
                }
              />

              <Route
                path="/testimonials"
                element={<TestimonialsPage currentTheme={currentTheme} />}
              />

              <Route
                path="/privacy"
                element={<PoliciesPage type="privacy" />}
              />

              <Route
                path="/terms"
                element={<PoliciesPage type="terms" />}
              />

              <Route
                path="/500"
                element={<ServerErrorPage />}
              />

              <Route
                path="/maintenance"
                element={<MaintenancePage />}
              />

              <Route
                path="/coming-soon"
                element={<ComingSoonPage />}
              />

              <Route
                path="*"
                element={<NotFoundPage />}
              />

              {/* Admin routes: login and protected panel */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
               <Route index element={<Dashboard />} />
               <Route path="blog" element={<BlogManager />} />
               {/* Additional admin subroutes (media, services, pricing, contact) will be added in Phase 2 */}
              </Route>
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer
            currentTheme={currentTheme}
            onOpenContact={() => setContactModalOpen(true)}
          />

          {/* VIP Strategy Consultation & Discovery Modal */}
          {contactModalOpen && (
            <ContactModal
              currentTheme={currentTheme}
              currency="INR"
              initialBrief={contactInitialBrief}
              onClose={() => setContactModalOpen(false)}
            />
          )}

        </div>
      </BrowserRouter>
    </CMSProvider>
  );
}
