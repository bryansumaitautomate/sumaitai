import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="contact" className="bg-background section-padding relative overflow-hidden">
      {/* Radial Gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, hsl(0 84% 50% / 0.2) 0%, transparent 60%)'
        }}
      />

      {/* Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="container-grid relative z-10">
        <div 
          ref={ref}
          className={`text-center max-w-3xl mx-auto ${isVisible ? 'reveal visible' : 'reveal'}`}
        >
          <p className="section-label mb-6">09 /// LET'S BUILD</p>
          
          <h2 className="text-display mb-8">
            Ready to stop
            <br />
            <span className="text-primary">losing leads?</span>
          </h2>

          <p className="text-body text-muted-foreground mb-12 max-w-xl mx-auto">
            Book a call to discuss your systems. No pitch deck, no pressure—just 
            a technical conversation about what's broken and how to fix it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#"
              className="glow-button group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-syne font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <span>BOOK A CALL</span>
              <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <span className="text-muted-foreground text-sm">or</span>
            
            <a
              href="mailto:bryan@example.com"
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              bryan@example.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
