import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-4 border-x border-white/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Label */}
          <div className="lg:border-r border-white/10 lg:pr-8 pb-8 lg:pb-0 p-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444]">
              02 /// IDENTITY
            </p>
          </div>

          {/* Main Quote */}
          <div className="lg:col-span-2 lg:border-r border-white/10 lg:px-8 pb-8 lg:pb-0 p-8">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-8">
              I'm Bryan Sumait—I turn scattered funnels into revenue machines.
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              Most businesses leak leads at every stage. Forms that go nowhere.
              Emails that don't convert. Follow-ups that never happen. I fix that.
            </p>
            <p className="text-base md:text-lg text-white/50 leading-relaxed mt-4">
              My systems capture every lead, nurture them automatically, and book
              qualified calls—so you can focus on closing, not chasing.
            </p>
          </div>

          {/* Stats - Horizontal Row */}
          <div className="lg:pl-8 p-8">
            <div className="grid grid-cols-3 gap-4">
              {/* Circular Stat */}
              <div 
                className="group relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
                style={{
                  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
                }}
              >
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="283"
                      strokeDashoffset="28"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-syne font-bold text-xl text-white">90%</span>
                    <span className="text-[10px] text-white/30">Automation</span>
                  </div>
                </div>
              </div>

              {/* Years */}
              <div 
                className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] flex flex-col justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
                }}
              >
                <p className="font-syne font-bold text-3xl text-[#ef4444]">5+</p>
                <p className="text-sm text-white/30">Years Building Systems</p>
              </div>

              {/* Revenue */}
              <div 
                className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] flex flex-col justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
                }}
              >
                <p className="font-syne font-bold text-3xl text-[#ef4444]">$2M+</p>
                <p className="text-sm text-white/30">Revenue Generated for Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
