import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CaseStudy {
  category: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}

const ShimmerCard = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <div
    className="group/shimmer relative rounded-2xl overflow-hidden cursor-pointer"
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Shimmer border container */}
    <div className="absolute inset-0 rounded-2xl overflow-hidden">
      {/* Static border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover/shimmer:border-transparent transition-colors duration-300" />
      
      {/* Rotating shimmer beam - only visible on hover */}
      <div 
        className="absolute left-1/2 top-1/2 h-40 w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#ef4444_40%,#ef4444_60%,transparent_100%)] opacity-0 group-hover/shimmer:opacity-25 group-hover/shimmer:animate-shimmer-rotate transition-opacity duration-500"
      />
      
      {/* Border gradient overlay */}
      <div 
        className="absolute inset-[1px] rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] opacity-0 group-hover/shimmer:opacity-100 transition-opacity duration-300"
      />
    </div>
    
    {/* Card content */}
    <div className="relative rounded-2xl bg-[#0a0a0a] p-8 transition-all duration-300 group-hover/shimmer:bg-white/[0.04] group-hover/shimmer:shadow-[0px_-16px_24px_0px_rgba(239,68,68,0.15)_inset]">
      {children}
    </div>
  </div>
);

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const caseStudies: CaseStudy[] = [
    {
      category: 'B2B SAAS',
      title: 'Demo Booking System',
      metric: '340%',
      metricLabel: 'More demos booked',
      description:
        'Replaced manual outreach with automated qualification and scheduling. Demos went from 12/month to 53/month.',
    },
    {
      category: 'COACHING',
      title: 'Client Onboarding Flow',
      metric: '8hrs',
      metricLabel: 'Saved weekly',
      description:
        'Automated the entire journey from lead to first session. Contracts, payments, and scheduling on autopilot.',
    },
    {
      category: 'E-COMMERCE',
      title: 'Cart Recovery Engine',
      metric: '$127K',
      metricLabel: 'Revenue recovered',
      description:
        'Multi-touch abandoned cart sequences that recovered 23% of lost sales over 6 months.',
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* 4-column grid overlay */}
        <div className="grid grid-cols-4 border-x border-white/10 mb-16">
          <div className="border-r border-white/10 py-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] px-4">
              06 /// RESULTS
            </p>
          </div>
          <div className="col-span-3 py-8 px-4">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Real systems. Real numbers.
            </h2>
          </div>
        </div>

        {/* Case Study Cards - 3 Column Grid */}
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {caseStudies.map((study, index) => (
            <ShimmerCard key={index} delay={index * 100}>
              {/* Category */}
              <p className="font-mono text-xs text-white/30 mb-6">{study.category}</p>

              {/* Metric - Red accent */}
              <div className="mb-6">
                <p className="font-syne font-bold text-5xl text-[#ef4444]">
                  {study.metric}
                </p>
                <p className="text-sm text-white/30 mt-1">{study.metricLabel}</p>
              </div>

              {/* Title & Description */}
              <h3 className="font-syne font-semibold text-xl text-white mb-3">
                {study.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {study.description}
              </p>
            </ShimmerCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
