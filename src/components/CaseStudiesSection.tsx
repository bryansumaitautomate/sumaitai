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
      description: 'Replaced manual outreach with automated qualification and scheduling. Demos went from 12/month to 53/month.'
    },
    {
      category: 'COACHING',
      title: 'Client Onboarding Flow',
      metric: '8hrs',
      metricLabel: 'Saved weekly',
      description: 'Automated the entire journey from lead to first session. Contracts, payments, and scheduling on autopilot.'
    },
    {
      category: 'E-COMMERCE',
      title: 'Cart Recovery Engine',
      metric: '$127K',
      metricLabel: 'Revenue recovered',
      description: 'Multi-touch abandoned cart sequences that recovered 23% of lost sales over 6 months.'
    }
  ];

  return (
    <section className="light-section section-padding">
      <div className="container-grid">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-divider-light lg:pr-8">
            <p className="section-label">05 /// RESULTS</p>
          </div>
          <div className="lg:col-span-3 lg:pl-8">
            <h2 className="text-heading text-light-fg">
              Real systems. Real numbers.
            </h2>
          </div>
        </div>

        {/* Case Study Cards */}
        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isVisible ? 'stagger-children visible' : 'stagger-children'}`}
        >
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group p-8 border border-black/10 hover:border-primary transition-all duration-300 bg-white"
            >
              {/* Category */}
              <p className="font-mono text-xs text-light-muted mb-6">{study.category}</p>
              
              {/* Metric */}
              <div className="mb-6">
                <p className="font-syne font-bold text-5xl text-primary">{study.metric}</p>
                <p className="text-sm text-light-muted mt-1">{study.metricLabel}</p>
              </div>

              {/* Title & Description */}
              <h3 className="font-syne font-semibold text-xl text-light-fg mb-3">{study.title}</h3>
              <p className="text-small text-light-muted">{study.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
