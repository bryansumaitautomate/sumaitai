import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Lines Background */}
      <div className="absolute inset-0 grid-lines opacity-50" />
      
      {/* Beam Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="beam" style={{ left: '25%', animationDelay: '0s' }} />
        <div className="beam" style={{ left: '50%', animationDelay: '1.5s' }} />
        <div className="beam" style={{ left: '75%', animationDelay: '3s' }} />
      </div>

      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(0 84% 50% / 0.15) 0%, transparent 70%)'
        }}
      />

      <div className="container-grid relative z-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Main Content - Spans 3 columns */}
          <div className="lg:col-span-3 lg:col-divider lg:pr-12">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="pulse-dot" />
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Revenue Systems Builder
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-display mb-8"
            >
              I build the systems
              <br />
              that <span className="text-primary">capture leads</span>,
              <br />
              book calls, and
              <br />
              <span className="italic font-normal">close deals</span>—
              <br />
              while you sleep.
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-6 mt-12"
            >
              <a
                href="#contact"
                className="glow-button group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-syne font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
              >
                <span>START YOUR PROJECT</span>
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#systems"
                className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <span>Explore Systems</span>
                <Icon icon="solar:arrow-down-linear" className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8 flex flex-col justify-end"
          >
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs text-primary mb-2">01 ///</p>
                <p className="text-sm text-muted-foreground">
                  Automation systems that convert browsers into buyers on autopilot.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-primary mb-2">02 ///</p>
                <p className="text-sm text-muted-foreground">
                  Built for founders who value results over complexity.
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 hidden lg:block">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <Icon icon="solar:mouse-minimalistic-linear" className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">SCROLL</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
};

export default HeroSection;
