import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CaseStudy {
  category: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
}

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
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* 4-column grid overlay */}
        <div className="grid grid-cols-4 border-x border-neutral-200 mb-16">
          <div className="border-r border-neutral-200 py-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] px-4">
              06 /// RESULTS
            </p>
          </div>
          <div className="col-span-3 py-8 px-4">
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900">
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
            <div
              key={index}
              className="group p-8 border border-neutral-200 hover:border-[#EF4444] transition-all duration-300 bg-white"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Category */}
              <p className="font-mono text-xs text-neutral-400 mb-6">{study.category}</p>

              {/* Metric - Red accent */}
              <div className="mb-6">
                <p className="font-syne font-bold text-5xl text-[#EF4444]">
                  {study.metric}
                </p>
                <p className="text-sm text-neutral-500 mt-1">{study.metricLabel}</p>
              </div>

              {/* Title & Description */}
              <h3 className="font-syne font-semibold text-xl text-neutral-900 mb-3">
                {study.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
