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
      className="relative w-full max-w-md aspect-square bg-neutral-900/50 backdrop-blur-md p-8"
      style={{
        border: '1px solid transparent',
        backgroundImage: 'linear-gradient(rgba(23, 23, 23, 0.5), rgba(23, 23, 23, 0.5)), linear-gradient(135deg, rgba(239, 68, 68, 0.2), transparent)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-[#EF4444]/30" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
      </div>

      {/* Main Icon */}
      <div className="flex items-center justify-center h-32">
        <Icon icon={icon} className="w-20 h-20 text-[#EF4444]/50" />
      </div>

      {/* Abstract Lines */}
      <div className="space-y-3 mt-6">
        <div className="h-2 bg-white/10 rounded w-3/4" />
        <div className="h-2 bg-white/10 rounded w-1/2" />
        <div className="h-2 bg-white/10 rounded w-2/3" />
      </div>

      {/* Floating Element */}
      <div className="absolute top-8 right-8 w-12 h-12 rounded-lg bg-[#EF4444]/20 flex items-center justify-center animate-float">
        <Icon icon="solar:bolt-linear" className="w-6 h-6 text-[#EF4444]" />
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
    <div className="bg-black py-20 md:py-32">
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
              <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] mb-6">
                {number} /// SYSTEM
              </p>
              <h3 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">
                {title}
              </h3>
              <p className="text-base md:text-lg text-white/60 mb-8">{description}</p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/60">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5"
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
