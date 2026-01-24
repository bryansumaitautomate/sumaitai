import { Icon } from '@iconify/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SystemCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  reversed?: boolean;
}

const AbstractMockup = ({ icon }: { icon: string }) => {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] w-full max-w-[320px] aspect-square"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
      }}
    >
      <div className="relative w-full h-full p-6">
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>

        {/* Main Icon */}
        <div className="flex items-center justify-center h-24">
          <Icon icon={icon} className="w-16 h-16 text-[#ef4444]/60 group-hover:text-[#ef4444] transition-colors" />
        </div>

        {/* Abstract Lines */}
        <div className="space-y-2 mt-4">
          <div className="h-2 bg-white/10 rounded w-3/4" />
          <div className="h-2 bg-white/10 rounded w-1/2" />
          <div className="h-2 bg-white/10 rounded w-2/3" />
        </div>

        {/* Floating Element */}
        <div 
          className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center animate-float group-hover:border-[#ef4444]/40 transition-colors"
        >
          <Icon icon="solar:bolt-linear" className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const SystemCard = ({
  number,
  title,
  description,
  features,
  icon,
  reversed = false,
}: SystemCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div className="bg-[#0a0a0a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* 4-column grid with visible borders */}
        <div className="grid grid-cols-4 border-x border-white/10">
          <div className="border-r border-white/10"></div>
          <div className="border-r border-white/10"></div>
          <div className="border-r border-white/10"></div>
          <div></div>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Content */}
            <div
              className={`${reversed ? 'lg:order-2' : ''} flex flex-col justify-center`}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-6">
                {number} /// SYSTEM
              </p>
              <h3 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">
                {title}
              </h3>
              <p className="text-base md:text-lg text-white/50 mb-8">{description}</p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/50">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Abstract Mockup */}
            <div
              className={`${reversed ? 'lg:order-1' : ''} flex items-center justify-center`}
            >
              <AbstractMockup icon={icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemsSection = () => {
  const systems = [
    {
      number: '03',
      title: 'Lead Capture Engine',
      description:
        'Stop losing leads to broken forms and slow follow-ups. My capture systems grab every prospect and start nurturing instantly.',
      features: [
        'Multi-channel capture (web, social, ads)',
        'Instant lead scoring and routing',
        'Automated welcome sequences',
        'CRM integration and sync',
      ],
      icon: 'solar:magnet-linear',
      reversed: false,
    },
    {
      number: '04',
      title: 'Appointment Booking Flow',
      description:
        'Turn interested leads into booked calls without the back-and-forth. Qualification, scheduling, and reminders—all automated.',
      features: [
        'Smart qualification questions',
        'Calendar sync across platforms',
        'Automated confirmation and reminders',
        'No-show recovery sequences',
      ],
      icon: 'solar:calendar-linear',
      reversed: true,
    },
    {
      number: '05',
      title: 'Deal Closing Pipeline',
      description:
        'Keep deals moving with automated follow-ups, proposal delivery, and contract workflows that close faster.',
      features: [
        'Stage-based automation triggers',
        'Proposal and contract templates',
        'Payment integration ready',
        'Win/loss analysis tracking',
      ],
      icon: 'solar:chart-linear',
      reversed: false,
    },
  ];

  return (
    <div id="systems">
      {systems.map((system, index) => (
        <SystemCard key={index} {...system} />
      ))}
    </div>
  );
};

export default SystemsSection;
