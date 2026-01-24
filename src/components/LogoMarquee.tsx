import { motion } from 'framer-motion';

const logos = [
  { name: 'N8N', icon: 'n8n' },
  { name: 'CLAUDE', icon: 'claude' },
  { name: 'LOVABLE', icon: 'lovable' },
  { name: 'MAKE', icon: 'make' },
  { name: 'ANTIGRAVITY', icon: 'antigravity' },
  { name: 'GHL', icon: 'ghl' },
];

const LogoMarquee = () => {
  return (
    <section className="relative bg-black border-y border-white/5 overflow-hidden py-6">
      <div className="flex">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3 px-8 group cursor-default"
            >
              <span className="font-mono text-sm tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-colors duration-300 whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoMarquee;
