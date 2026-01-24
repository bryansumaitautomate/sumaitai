import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="contact" className="bg-black py-20 md:py-32 relative overflow-hidden">
      {/* Radial Gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(239, 68, 68, 0.2) 0%, transparent 60%)',
        }}
      />

      {/* 4-Column Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        <div className="border-r border-white/10"></div>
        <div className="border-r border-white/10"></div>
        <div className="border-r border-white/10"></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] mb-6">
            10 /// LET'S BUILD
          </p>

          <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-8">
            Ready to stop
            <br />
            <span className="text-[#EF4444]">losing leads?</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Book a call to discuss your systems. No pitch deck, no pressure—just a
            technical conversation about what's broken and how to fix it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#EF4444] text-white font-syne font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              <span>BOOK A CALL</span>
              <Icon
                icon="solar:arrow-right-linear"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </a>

            <span className="text-white/40 text-sm">or</span>

            <a
              href="mailto:bryan@sumait.ai"
              className="font-mono text-sm text-white/60 hover:text-[#EF4444] transition-colors"
            >
              bryan@sumait.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
