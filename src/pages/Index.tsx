import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import LogoMarquee from '@/components/LogoMarquee';
import ServiceCards from '@/components/ServiceCards';
import AboutSection from '@/components/AboutSection';
import SystemsSection from '@/components/SystemsSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ProcessSection from '@/components/ProcessSection';
import TechStackSection from '@/components/TechStackSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <FloatingNav />
      <HeroSection />
      <LogoMarquee />
      <ServiceCards />
      <AboutSection />
      <SystemsSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TechStackSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
