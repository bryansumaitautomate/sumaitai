import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1]
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container-grid">
        <div className="grid grid-cols-3 border-b border-white/10">
          {/* Logo */}
          <div className="col-divider py-4 md:py-5">
            <a href="#" className="font-syne font-bold text-lg md:text-xl tracking-tight">
              ​SUMAIT<span className="text-primary">.AI</span>
            </a>
          </div>

          {/* Center - Status */}
          <div className="col-divider py-4 md:py-5 flex items-center justify-center">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="pulse-dot" />
              <span>AVAILABLE FOR PROJECTS</span>
            </div>
          </div>

          {/* CTA */}
          <div className="py-4 md:py-5 flex items-center justify-end">
            <a href="#contact" className="font-mono text-xs tracking-wider hover:text-primary transition-colors duration-300">
              LET'S TALK →
            </a>
          </div>
        </div>
      </div>
    </motion.nav>;
};
export default FloatingNav;