import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-syne font-bold text-[16vw] text-white/10 mix-blend-overlay select-none tracking-tighter">
          LUMINAL
        </h1>
      </div>

      {/* 4-Column Grid */}
      <div className="relative z-10 w-full min-h-screen grid grid-cols-1 md:grid-cols-4">
        {/* Column 1 */}
        <div className="relative border-r border-white/10 p-6 md:p-8 flex flex-col justify-between min-h-[50vh] md:min-h-screen">
          {/* Beam Animation */}
          <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
            <motion.div
              className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          
          {/* Top Left - Logo */}
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-white/60">
              LUMINAL STUDIO
            </span>
          </div>
          
          {/* Bottom Left - Description */}
          <div className="max-w-xs">
            <p className="text-sm text-white/60 leading-relaxed">
              I build the systems that capture leads, book calls, and close deals—while you sleep.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="relative border-r border-white/10 p-6 md:p-8 hidden md:block">
          {/* Beam Animation */}
          <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
            <motion.div
              className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="relative border-r border-white/10 p-6 md:p-8 hidden md:block">
          {/* Beam Animation */}
          <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
            <motion.div
              className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ y: ['-100%', '500%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 3 }}
            />
          </div>
        </div>

        {/* Column 4 */}
        <div className="relative p-6 md:p-8 flex flex-col justify-between min-h-[50vh] md:min-h-screen">
          {/* Top Right - Menu Button */}
          <div className="flex justify-end">
            <button className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors uppercase">
              Menu
            </button>
          </div>
          
          {/* Bottom Right - View Work Button */}
          <div className="flex justify-end">
            <a
              href="#systems"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase text-white overflow-hidden"
            >
              {/* Spinning Border Container */}
              <span className="absolute inset-0 rounded-sm">
                {/* Static border */}
                <span className="absolute inset-0 border border-white/20 rounded-sm" />
                {/* Spinning gradient border on hover */}
                <span className="absolute inset-[-2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 animate-border-spin" style={{
                    background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)',
                    borderRadius: '4px',
                  }} />
                </span>
                {/* Inner background to mask the spinning gradient */}
                <span className="absolute inset-[1px] bg-background rounded-sm" />
              </span>
              <span className="relative z-10">View Work</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
};

export default HeroSection;
