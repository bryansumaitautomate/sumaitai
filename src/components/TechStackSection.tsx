import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const glassStyle = {
  border: '1px solid transparent',
  backgroundImage: 'linear-gradient(rgba(23, 23, 23, 0.4), rgba(23, 23, 23, 0.4)), linear-gradient(135deg, rgba(239, 68, 68, 0.15), transparent)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
};

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
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header with 4-column grid */}
        <div className="grid grid-cols-4 border-x border-white/10 mb-16">
          <div className="col-span-4 text-center py-8 px-4">
            <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] mb-4">
              08 /// TOOLS
            </p>
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-slate-50 mb-4">
              Best-in-class stack
            </h2>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
              I work with the tools you already use—or help you choose the right ones. No
              vendor lock-in, just systems that work.
            </p>
          </div>
        </div>

        {/* Tool Grid */}
        <div
          ref={ref}
          className={`flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-neutral-900/40 backdrop-blur-xl"
                style={glassStyle}
              >
                <Icon
                  icon={tool.icon}
                  className="w-8 h-8 text-neutral-400 grayscale group-hover:grayscale-0 group-hover:text-[#EF4444] transition-all duration-300"
                />
              </div>
              <span className="font-mono text-xs text-neutral-400 group-hover:text-slate-50 transition-colors">
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
