import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
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
    <div className="bg-black text-white">
      <FloatingNav />
      {/* Hero - Black */}
      <HeroSection />
      {/* About - White */}
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
