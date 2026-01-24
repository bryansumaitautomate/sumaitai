import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TechStackSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  const tools = [
    { name: 'Make', icon: 'simple-icons:integromat' },
    { name: 'Zapier', icon: 'simple-icons:zapier' },
    { name: 'HubSpot', icon: 'simple-icons:hubspot' },
    { name: 'Salesforce', icon: 'simple-icons:salesforce' },
    { name: 'Stripe', icon: 'simple-icons:stripe' },
    { name: 'Calendly', icon: 'simple-icons:calendly' },
    { name: 'Notion', icon: 'simple-icons:notion' },
    { name: 'Slack', icon: 'simple-icons:slack' },
    { name: 'Airtable', icon: 'simple-icons:airtable' },
    { name: 'Typeform', icon: 'simple-icons:typeform' },
  ];

  return (
    <section className="light-section section-padding">
      <div className="container-grid">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">07 /// TOOLS</p>
          <h2 className="text-heading text-light-fg mb-4">
            Best-in-class stack
          </h2>
          <p className="text-body text-light-muted max-w-2xl mx-auto">
            I work with the tools you already use—or help you choose the right ones. 
            No vendor lock-in, just systems that work.
          </p>
        </div>

        {/* Tool Grid */}
        <div 
          ref={ref}
          className={`flex flex-wrap justify-center gap-8 md:gap-12 ${isVisible ? 'stagger-children visible' : 'stagger-children'}`}
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-xl bg-black/5 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                <Icon 
                  icon={tool.icon} 
                  className="w-8 h-8 text-light-muted grayscale group-hover:grayscale-0 group-hover:text-primary transition-all duration-300" 
                />
              </div>
              <span className="font-mono text-xs text-light-muted group-hover:text-light-fg transition-colors">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
