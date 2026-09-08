import { Icon } from '@iconify/react';
import ProjectPageLayout from '@/components/ProjectPageLayout';
import bbaMealPlanShot from '@/assets/client-builds/bba-meal-plan-generator.jpg';
import backlayrHrShot from '@/assets/client-builds/backlayr-hr-console.jpg';
import kitoCutsShot from '@/assets/client-builds/kito-cuts.jpg';

type BuildStatus = 'DELIVERED' | 'DEMO LIVE' | 'PILOT' | 'OFFER' | 'PARTNER';

interface ClientBuild {
  status: BuildStatus;
  category: string;
  title: string;
  description: string;
  tags: string[];
  metric?: string;
  metricLabel?: string;
  demoUrl?: string;
  screenshot?: string;
}

const fullStackApps: ClientBuild[] = [
  {
    status: 'DEMO LIVE',
    category: 'FITNESS COACHING · AI WEB APP',
    title: 'AI Meal Plan Generator',
    description:
      'Full-stack web app for a fitness coaching brand. Members enter goals and dietary constraints, an OpenAI-backed API route generates structured weekly meal plans in the coach’s brand voice, and everything renders as editable, exportable cards. Next.js front to back.',
    tags: ['Next.js', 'TypeScript', 'OpenAI API'],
    demoUrl: 'https://bba-meal-plan-generator.vercel.app',
    screenshot: bbaMealPlanShot,
  },
  {
    status: 'DEMO LIVE',
    category: 'HR · INTERNAL OPERATIONS TOOL',
    title: 'BackLayr HR Console',
    description:
      'Rebuilt a glued-together Make, Typeform, and ClickUp HR workflow as one proper web app: employee records, attendance tracking, payroll summary, and task reporting behind a single dashboard. Phase 1 running on seeded sample data.',
    tags: ['Next.js 15', 'React', 'Dashboards'],
    demoUrl: 'https://backlayr-hr-console.vercel.app',
    screenshot: backlayrHrShot,
  },
  {
    status: 'DEMO LIVE',
    category: 'BARBERSHOP · MARKETING SITE',
    title: 'Kito Cuts Barber Shop',
    description:
      'Award-style site for a barbershop: a Three.js 3D scene, scroll-driven animation, services and gallery sections, and a booking flow. The earlier classic version still runs at /classic.',
    tags: ['Three.js', 'GSAP', 'Vite'],
    demoUrl: 'https://kito-cuts.vercel.app',
    screenshot: kitoCutsShot,
  },
];

const clientBuilds: ClientBuild[] = [
  {
    status: 'DELIVERED',
    category: 'BEAUTY · LASH STUDIO',
    title: 'AI Instagram-DM Setter + GHL Pipeline',
    description:
      'Every Instagram DM gets an instant reply, qualification, and a booking link, around the clock. Pipeline and follow-up run through GoHighLevel. Active retainer client since July 2026.',
    tags: ['AI Setter', 'GoHighLevel', 'Instagram DMs'],
    metric: '0',
    metricLabel: 'Leads left waiting',
  },
  {
    status: 'DEMO LIVE',
    category: 'PROPERTY · RENOVATION OPS',
    title: 'M365 Renovation Tracker',
    description:
      'Biweekly tracker sync, delay flagging, and quote extraction for a ~500-unit renovation portfolio. Excel-native on Power Automate and Office Scripts, no new subscriptions. $4,500 fixed build.',
    tags: ['Power Automate', 'Office Scripts', 'Excel'],
    demoUrl: 'https://backlayr-renovation-tracker.vercel.app/demo.html',
  },
  {
    status: 'PILOT',
    category: 'HOME SERVICES · CLEANING',
    title: 'Local SEO Engine',
    description:
      'August pilot for a US cleaning company: 30 blog posts, Google Business Profile overhaul, citations, 14 neighborhood landing pages, and schema markup.',
    tags: ['Local SEO', 'Content', 'Schema'],
  },
  {
    status: 'OFFER',
    category: 'ECOMMERCE · CUSTOM HEADWEAR',
    title: 'Shopify Chatbot + Cart Recovery',
    description:
      'AI chatbot answering product questions, GoHighLevel follow-up, and abandoned-cart recovery for a custom headwear shop on Shopify. $1,500 build, offer stage.',
    tags: ['Shopify', 'Chatbot', 'Cart Recovery'],
  },
  {
    status: 'PARTNER',
    category: 'DELIVERY PARTNERS · WHITE-LABEL',
    title: 'Partner Channel Builds',
    description:
      'White-label delivery partner for automation agencies and consultants: CRM pipelines, voice stacks, Excel and M365 automation. Builds ship under partner brands, so client names stay private by design.',
    tags: ['White-label', 'CRM', 'Voice', 'Excel'],
  },
];

const statusStyles: Record<BuildStatus, string> = {
  DELIVERED: 'border-[#ef4444]/40 text-[#ef4444] bg-[#ef4444]/10',
  'DEMO LIVE': 'border-[#ef4444]/40 text-[#ef4444] bg-[#ef4444]/10',
  PILOT: 'border-white/20 text-white/60 bg-white/5',
  OFFER: 'border-white/20 text-white/60 bg-white/5',
  PARTNER: 'border-white/20 text-white/60 bg-white/5',
};

const BuildCard = ({ build }: { build: ClientBuild }) => (
  <div
    className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#ef4444]/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)]"
    style={{
      background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
    }}
  >
    {/* Screenshot preview */}
    {build.screenshot && build.demoUrl && (
      <a
        href={build.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden"
      >
        <img
          src={build.screenshot}
          alt={build.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </a>
    )}

    <div className="p-6 md:p-8">
      {/* Status + Category */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <span
          className={`px-3 py-1 text-xs font-mono tracking-[0.15em] border rounded-full ${statusStyles[build.status]}`}
        >
          {build.status}
        </span>
        <p className="font-mono text-xs text-white/30 text-right">{build.category}</p>
      </div>

      {/* Metric */}
      {build.metric && (
        <div className="mb-6">
          <p className="font-syne font-bold text-5xl text-[#ef4444]">
            {build.metric}
          </p>
          <p className="text-sm text-white/30 mt-1">{build.metricLabel}</p>
        </div>
      )}

      {/* Title & Description */}
      <h3 className="font-syne font-semibold text-xl text-white mb-3 group-hover:text-[#ef4444] transition-colors">
        {build.title}
      </h3>
      <p className="text-sm text-white/70 leading-relaxed mb-6">
        {build.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {build.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-mono tracking-wider text-white/60 bg-white/5 border border-white/10 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Demo Link */}
      {build.demoUrl && (
        <a
          href={build.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#ef4444] hover:text-white transition-colors pt-4 border-t border-white/10 w-full"
        >
          VIEW LIVE DEMO
          <Icon icon="solar:arrow-right-up-linear" width={16} />
        </a>
      )}
    </div>
  </div>
);

const ClientBuilds = () => (
  <ProjectPageLayout
    sectionNumber="04.5 /// CLIENT BUILDS"
    title="Client Builds 2026"
    description="This year's self-branded build log: what shipped, what's in pilot, and what's on offer. Statuses are honest on purpose."
  >
    {/* About card */}
    <div
      className="mb-12 p-8 rounded-2xl border border-white/10"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.1) 100%)',
      }}
    >
      <h3 className="font-syne font-bold text-xl text-white mb-4">About This Page</h3>
      <p className="text-white/60 leading-relaxed">
        The galleries under Automation, Chat Agents, Voice Agents, and Vibecoded show
        systems built across agencies and partnerships since 2021. This page is
        different: everything here shipped under my own brand in 2026 — full-stack
        web applications first, then builds for local service businesses. Every
        status label is current.
      </p>
    </div>

    {/* Full-Stack Applications */}
    <div className="mb-8">
      <h3 className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-2">
        FULL-STACK APPLICATIONS
      </h3>
      <p className="text-sm text-white/50">
        Complete web apps, front to back. Live links, real code.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fullStackApps.map((build) => (
        <BuildCard key={build.title} build={build} />
      ))}
    </div>

    {/* Service Business Builds */}
    <div className="mt-16 mb-8">
      <h3 className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-2">
        SERVICE BUSINESS BUILDS
      </h3>
      <p className="text-sm text-white/50">
        Automation and growth systems for local businesses.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {clientBuilds.map((build) => (
        <BuildCard key={build.title} build={build} />
      ))}
    </div>

    {/* Closing CTA */}
    <div className="mt-16 text-center">
      <a
        href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-lg md:text-xl text-white/50 hover:text-[#ef4444] transition-colors"
      >
        Next build slot is open. Book a call.
      </a>
    </div>
  </ProjectPageLayout>
);

export default ClientBuilds;
