import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Label */}
          <div className="lg:border-r border-neutral-200 lg:pr-8 pb-8 lg:pb-0">
            <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444]">
              02 /// IDENTITY
            </p>
          </div>

          {/* Main Quote */}
          <div className="lg:col-span-2 lg:border-r border-neutral-200 lg:px-8 pb-8 lg:pb-0">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-8">
              I'm Bryan Sumait—I turn scattered funnels into revenue machines.
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              Most businesses leak leads at every stage. Forms that go nowhere.
              Emails that don't convert. Follow-ups that never happen. I fix that.
            </p>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mt-4">
              My systems capture every lead, nurture them automatically, and book
              qualified calls—so you can focus on closing, not chasing.
            </p>
          </div>

          {/* Stats */}
          <div className="lg:pl-8 flex flex-col justify-between">
            {/* Circular Stat */}
            <div className="relative w-32 h-32 mx-auto lg:mx-0 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="283"
                  strokeDashoffset="28"
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-syne font-bold text-2xl text-neutral-900">90%</span>
                <span className="text-xs text-neutral-500">Automation</span>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <div>
                <p className="font-syne font-bold text-3xl text-[#EF4444]">7+</p>
                <p className="text-sm text-neutral-500">Years Building Systems</p>
              </div>
              <div>
                <p className="font-syne font-bold text-3xl text-[#EF4444]">$2M+</p>
                <p className="text-sm text-neutral-500">Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
