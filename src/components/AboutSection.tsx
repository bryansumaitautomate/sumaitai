import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="light-section section-padding">
      <div className="container-grid">
        <div 
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0 ${isVisible ? 'stagger-children visible' : 'stagger-children'}`}
        >
          {/* Section Label */}
          <div className="lg:col-divider-light lg:pr-8">
            <p className="section-label">01 /// IDENTITY</p>
          </div>

          {/* Main Quote */}
          <div className="lg:col-span-2 lg:col-divider-light lg:px-8">
            <h2 className="text-heading text-light-fg mb-8">
              I'm Bryan Sumait—I turn scattered funnels into revenue machines.
            </h2>
            <p className="text-body text-light-muted">
              Most businesses leak leads at every stage. Forms that go nowhere. 
              Emails that don't convert. Follow-ups that never happen. I fix that.
            </p>
            <p className="text-body text-light-muted mt-4">
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
                  stroke="hsl(0 0% 90%)"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(0 84% 50%)"
                  strokeWidth="2"
                  strokeDasharray="283"
                  strokeDashoffset="28"
                  strokeLinecap="round"
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-syne font-bold text-2xl text-light-fg">90%</span>
                <span className="text-xs text-light-muted">Automation</span>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <div>
                <p className="font-syne font-bold text-3xl text-primary">7+</p>
                <p className="text-sm text-light-muted">Years Building Systems</p>
              </div>
              <div>
                <p className="font-syne font-bold text-3xl text-primary">$2M+</p>
                <p className="text-sm text-light-muted">Revenue Generated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
