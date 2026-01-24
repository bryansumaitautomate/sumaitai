import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="contact" className="bg-[#0a0a0a] py-20 md:py-32 relative overflow-hidden">
      {/* Radial Gradient - subtle red tint */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(239, 68, 68, 0.15) 0%, transparent 60%)',
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
          <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-6">
            10 /// LET'S BUILD
          </p>

          <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-8">
            Ready to stop
            <br />
            <span className="text-[#ef4444]">losing leads?</span>
          </h2>

          <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto">
            Book a call to discuss your systems. No pitch deck, no pressure—just a
            technical conversation about what's broken and how to fix it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Shimmer Button with Glow */}
            <a
              href="https://bit.ly/sumaitcal"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] hover:shadow-[0_0_60px_12px_rgba(239,68,68,0.5)]"
            >
              {/* Spinning border effect */}
              <span className="absolute inset-0 rounded-full">
                <span className="absolute inset-0 rounded-full border border-white/10"></span>
                <span 
                  className="absolute inset-[-2px] rounded-full animate-spin"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
                    animationDuration: '3s',
                  }}
                ></span>
                <span className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-md"></span>
              </span>
              <span className="relative z-10 flex items-center gap-3">
                BOOK A CALL
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </span>
            </a>

            <span className="text-white/30 text-sm">or</span>

            <a
              href="mailto:bryan@sumait.ai"
              className="font-mono text-sm text-white/50 hover:text-[#ef4444] transition-colors"
            >
              bryan@sumait.ai
            </a>
          </div>

          {/* Stats Row with Glass Effect */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div 
              className="p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:border-[#ef4444]/25 transition-colors"
            >
              <p className="font-syne font-bold text-2xl text-[#ef4444]">30 min</p>
              <p className="text-xs text-white/30">Discovery Call</p>
            </div>
            <div 
              className="p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:border-[#ef4444]/25 transition-colors"
            >
              <p className="font-syne font-bold text-2xl text-[#ef4444]">Free</p>
              <p className="text-xs text-white/30">System Audit</p>
            </div>
            <div 
              className="p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:border-[#ef4444]/25 transition-colors"
            >
              <p className="font-syne font-bold text-2xl text-[#ef4444]">4 weeks</p>
              <p className="text-xs text-white/30">Avg. Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
