import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMagnetic } from '@/hooks/useMagnetic';
const CTASection = () => {
  const {
    ref,
    isVisible
  } = useScrollReveal(0.2);
  const { ref: ctaRef, offset: ctaOffset } = useMagnetic({ range: 120, maxOffset: 8 });
  return <section id="contact" className="relative bg-[#0a0a0a]/80 backdrop-blur-sm py-20 md:py-32 overflow-hidden">
      {/* Radial Gradient - subtle red tint */}
      <div className="absolute inset-0 opacity-40" style={{
      background: 'radial-gradient(ellipse at 50% 100%, rgba(239, 68, 68, 0.15) 0%, transparent 60%)'
    }} />

      {/* 4-Column Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        <div className="border-r border-white/10"></div>
        <div className="border-r border-white/10"></div>
        <div className="border-r border-white/10"></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-6">
            11 /// LET'S BUILD
          </p>

          <h2 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-8">
            Ready to stop
            <br />
            <span className="text-[#ef4444]">losing leads?</span>
          </h2>

          <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto">
            Book a call to discuss your systems. No pitch deck, no pressure, just a technical conversation about what's broken and how to fix it.
          </p>

          {/* Shimmer Button with Glow */}
          <a ref={ctaRef as React.Ref<HTMLAnchorElement>} style={{ transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`, transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease" }} href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro" target="_blank" rel="noopener noreferrer" className="shimmer-button group relative inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] hover:shadow-[0_0_60px_12px_rgba(239,68,68,0.5)]">
            {/* Spinning border effect */}
            <span className="absolute inset-0 rounded-full">
              <span className="absolute inset-0 rounded-full border border-white/10"></span>
              <span className="absolute inset-[-2px] rounded-full animate-spin" style={{
              background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
              animationDuration: '3s'
            }}></span>
              <span className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-md"></span>
            </span>
            <span className="relative z-10 flex items-center gap-3">
              BOOK A CALL
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </span>
          </a>

          {/* Stats Row with Gradient Cards */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
              background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
            }}>
              <p className="font-syne font-bold text-2xl text-[#ef4444]">30 min</p>
              <p className="text-xs text-white/50">Discovery Call</p>
            </div>
            <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
              background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
            }}>
              <p className="font-syne font-bold text-2xl text-[#ef4444]">Free</p>
              <p className="text-xs text-white/50">System Audit</p>
            </div>
            <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
              background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
            }}>
              <p className="font-syne font-bold text-2xl text-[#ef4444]">30 days</p>
              <p className="text-xs text-white/50">Avg. Delivery</p>
            </div>
            <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
              background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
            }}>
              <p className="font-syne font-bold text-2xl text-[#ef4444]">12</p>
              <p className="text-xs text-white/50">Active Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTASection;