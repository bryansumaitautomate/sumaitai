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
    { name: 'n8n', icon: 'simple-icons:n8n', color: '#EA4B71' },
    { name: 'Make', icon: 'simple-icons:make', color: '#6d30ca' },
    { name: 'Claude', icon: 'simple-icons:anthropic', color: undefined },
    { name: 'OpenAI', icon: 'simple-icons:openai', color: undefined },
    { name: 'GoHighLevel', icon: 'solar:server-square-bold', color: undefined },
    { name: 'Claude Code', icon: 'solar:code-circle-bold', color: undefined },
    { name: 'Lovable.dev', icon: 'solar:programming-bold', color: undefined },
    { name: 'Aura.build', icon: 'solar:layers-minimalistic-bold', color: undefined },
    { name: 'Premiere Pro', icon: 'simple-icons:adobepremierepro', color: '#9999FF' },
    { name: 'CapCut', icon: 'solar:videocamera-record-bold', color: undefined },
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
              I stay current through paid communities and courses—not outdated YouTube tutorials.
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
                  className="w-8 h-8 text-neutral-400 grayscale group-hover:grayscale-0 transition-all duration-300"
                  style={{ color: undefined }}
                  onMouseEnter={(e: React.MouseEvent<SVGSVGElement>) => {
                    (e.currentTarget as SVGSVGElement).style.color = tool.color || '#EF4444';
                  }}
                  onMouseLeave={(e: React.MouseEvent<SVGSVGElement>) => {
                    (e.currentTarget as SVGSVGElement).style.color = '';
                  }}
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
