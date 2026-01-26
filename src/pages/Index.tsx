import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import AboutSection from '@/components/AboutSection';
import SystemsSection from '@/components/SystemsSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ProcessSection from '@/components/ProcessSection';
import TechStackSection from '@/components/TechStackSection';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-transparent text-white relative">
      <FloatingNav />
      {/* Hero - Black */}
      <HeroSection />
      {/* Profile - Deep Black with Glass */}
      <ProfileSection />
      {/* About - Black */}
      <AboutSection />
      {/* Systems - Alternating Black/White/Black */}
      <SystemsSection />
      {/* Case Studies - White */}
      <CaseStudiesSection />
      {/* Process - Black */}
      <ProcessSection />
      {/* Tech Stack - White */}
      <TechStackSection />
      {/* Testimonials - Black with red accents */}
      <TestimonialSection />
      {/* FAQ - White */}
      <FAQSection />
      {/* CTA - Black */}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
