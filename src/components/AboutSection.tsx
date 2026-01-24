import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@iconify/react';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32 border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-4 h-full">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`border-l border-white/5 ${i === 4 ? 'border-r' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* LEFT COLUMN - Section Label */}
          <div className="lg:col-span-1 flex flex-col">
            <p className="font-mono text-xs text-[#ef4444] mb-6 tracking-[0.3em]">
              02 /// IDENTITY
            </p>
            {/* Vertical Text - Desktop Only */}
            <div className="hidden lg:block mt-auto">
              <p 
                className="font-mono text-xs text-white/20 tracking-[0.5em] origin-bottom-left"
                style={{ 
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)'
                }}
              >
                ABOUT
              </p>
            </div>
          </div>

          {/* MIDDLE COLUMN - Content */}
          <div className="lg:col-span-2">
            {/* Headline with pulsing dot */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] animate-pulse mt-3 flex-shrink-0" />
              <h2 className="font-syne font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                I'm Bryan Sumait—I build revenue systems that run while you sleep.
              </h2>
            </div>

            {/* Body Copy */}
            <div className="max-w-2xl space-y-4 pl-6">
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Most service businesses lose money every day. Missed calls. Slow follow-ups. 
                Manual chaos. Leads that slip through the cracks.
              </p>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                I fix that with AI-powered systems that capture every lead, respond in minutes, 
                generate proposals automatically, and book calls 24/7.
              </p>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                My clients stop chasing leads and start closing deals—because their systems 
                do the heavy lifting.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - Stats Cards */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Card 1 - Automation Uptime */}
            <div 
              className="group rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
              style={{
                background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="6"
                      strokeDasharray="264"
                      strokeDashoffset="2.64"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <Icon icon="solar:chart-2-bold" className="w-5 h-5 text-white/30" />
              </div>
              <p className="font-syne font-bold text-4xl md:text-5xl text-[#ef4444] mb-1">99%</p>
              <p className="text-xs text-white/50">Automation Uptime</p>
            </div>

            {/* Card 2 - Years Building */}
            <div 
              className="group rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
              style={{
                background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center">
                  <Icon icon="solar:calendar-bold" className="w-5 h-5 text-[#ef4444]" />
                </div>
                <Icon icon="solar:magic-stick-3-bold" className="w-5 h-5 text-white/30" />
              </div>
              <p className="font-syne font-bold text-4xl md:text-5xl text-[#ef4444] mb-1">5+</p>
              <p className="text-xs text-white/50">Years Building Systems</p>
            </div>

            {/* Card 3 - Revenue Generated */}
            <div 
              className="group rounded-2xl border border-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
              style={{
                background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center">
                  <Icon icon="solar:dollar-bold" className="w-5 h-5 text-[#ef4444]" />
                </div>
                <Icon icon="solar:graph-up-bold" className="w-5 h-5 text-white/30" />
              </div>
              <p className="font-syne font-bold text-4xl md:text-5xl text-[#ef4444] mb-1">$2M+</p>
              <p className="text-xs text-white/50">Revenue Generated for Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
