import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative p-8 bg-secondary/50 border border-white/10 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Radial Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Icon Container */}
      <div className="relative z-10 mb-6 w-20 h-20">
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-syne text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Isometric Cube SVG with hover animation
const IsometricCube = () => (
  <svg
    viewBox="0 0 80 80"
    className="w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
  >
    {/* Top face */}
    <polygon
      points="40,10 70,25 40,40 10,25"
      fill="hsl(var(--primary))"
      opacity="0.9"
      className="transition-all duration-500 group-hover:opacity-100"
    />
    {/* Left face */}
    <polygon
      points="10,25 40,40 40,70 10,55"
      fill="hsl(var(--primary))"
      opacity="0.6"
      className="transition-all duration-500 group-hover:opacity-75"
    />
    {/* Right face */}
    <polygon
      points="40,40 70,25 70,55 40,70"
      fill="hsl(var(--primary))"
      opacity="0.3"
      className="transition-all duration-500 group-hover:opacity-45"
    />
  </svg>
);

// Isometric Layers SVG
const IsometricLayers = () => (
  <svg
    viewBox="0 0 80 80"
    className="w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
  >
    {/* Bottom layer */}
    <polygon
      points="40,50 70,65 40,80 10,65"
      fill="hsl(var(--primary))"
      opacity="0.3"
    />
    {/* Middle layer */}
    <polygon
      points="40,35 70,50 40,65 10,50"
      fill="hsl(var(--primary))"
      opacity="0.5"
    />
    {/* Top layer */}
    <polygon
      points="40,20 70,35 40,50 10,35"
      fill="hsl(var(--primary))"
      opacity="0.8"
    />
  </svg>
);

// Isometric Bars SVG
const IsometricBars = () => (
  <svg
    viewBox="0 0 80 80"
    className="w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
  >
    {/* Bar 1 */}
    <rect x="10" y="50" width="15" height="25" fill="hsl(var(--primary))" opacity="0.4" />
    {/* Bar 2 */}
    <rect x="32" y="35" width="15" height="40" fill="hsl(var(--primary))" opacity="0.6" />
    {/* Bar 3 */}
    <rect x="55" y="20" width="15" height="55" fill="hsl(var(--primary))" opacity="0.9" />
  </svg>
);

// Isometric Diamond SVG
const IsometricDiamond = () => (
  <svg
    viewBox="0 0 80 80"
    className="w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
  >
    <polygon
      points="40,5 75,40 40,75 5,40"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      opacity="0.8"
    />
    <polygon
      points="40,15 65,40 40,65 15,40"
      fill="hsl(var(--primary))"
      opacity="0.4"
    />
  </svg>
);

const services = [
  {
    title: 'Branding',
    description: 'Strategic brand identity that captures your essence and resonates with your audience.',
    icon: <IsometricCube />,
  },
  {
    title: 'Development',
    description: 'Custom web applications built with modern technologies for optimal performance.',
    icon: <IsometricLayers />,
  },
  {
    title: 'Analytics',
    description: 'Data-driven insights to optimize your conversion funnels and maximize ROI.',
    icon: <IsometricBars />,
  },
  {
    title: 'Strategy',
    description: 'Comprehensive growth strategies tailored to your unique business goals.',
    icon: <IsometricDiamond />,
  },
];

const ServiceCards = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-grid">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-label mb-4 block">02 /// SERVICES</span>
          <h2 className="text-heading max-w-2xl">
            Systems that <span className="text-primary">drive revenue</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
