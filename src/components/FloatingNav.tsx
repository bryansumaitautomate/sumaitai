import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const FloatingNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Systems', href: '#systems' },
    { label: 'Experience', href: '#experience' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div
        className="max-w-4xl mx-auto rounded-full py-3 px-6 flex items-center justify-between"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,10,0.55), rgba(10,10,10,0.35)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box`,
          border: '1px solid transparent',
          backdropFilter: 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: 'blur(16px) saturate(120%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Logo */}
        <a href="#" className="font-syne text-lg font-semibold text-white/90">
          SUMAIT.AI
        </a>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <Icon icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} className="w-5 h-5" />
          </button>

          {/* CTA Button - Desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex bg-[#ef4444] text-white px-5 py-2 rounded-full hover:bg-[#ef4444]/90 transition-colors text-sm font-medium"
          >
            Let's Talk →
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-4xl mx-auto rounded-2xl p-4"
            style={{
              background: `linear-gradient(180deg, rgba(10,10,10,0.9), rgba(10,10,10,0.85)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05)) border-box`,
              border: '1px solid transparent',
              backdropFilter: 'blur(16px) saturate(120%)',
              WebkitBackdropFilter: 'blur(16px) saturate(120%)',
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-[#ef4444] text-white px-5 py-3 rounded-lg hover:bg-[#ef4444]/90 transition-colors text-sm font-medium text-center"
              >
                Let's Talk →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default FloatingNav;
