import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };
  const socialLinks = [{
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    href: '#'
  }, {
    name: 'Twitter',
    icon: 'simple-icons:x',
    href: '#'
  }, {
    name: 'GitHub',
    icon: 'simple-icons:github',
    href: '#'
  }];
  return <footer className="relative border-t border-white/10 mt-20 py-12 bg-[#0a0a0a]/80 backdrop-blur-sm">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inner Glassmorphic Card */}
        <div className="relative overflow-hidden bg-[#0a0a0a]/60 backdrop-blur ring-1 ring-white/10 rounded-3xl p-6 sm:p-10 lg:p-14">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Left Side */}
              <div className="max-w-md">
                {/* Logo */}
                <p className="font-syne text-2xl font-semibold text-white/90">
                  SUMAIT<span className="text-[#ef4444]">.AI</span>
                </p>

                {/* Tagline */}
                <p className="mt-4 text-sm text-white/50 leading-relaxed">
                  What if AI could run your follow-ups, qualification calls, and appointment booking while you sleep? 
                </p>

                {/* Newsletter Form */}
                <div className="mt-6 flex items-center gap-2">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 rounded-full bg-white/5 text-white placeholder-white/40 px-4 py-3 text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-[#ef4444]/30 outline-none transition" required />
                  <a 
                    href="https://sumait-ai-audit.lovable.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#ef4444] text-white px-4 py-3 rounded-full hover:bg-[#ef4444]/90 transition font-medium text-sm flex items-center gap-1"
                  >
                    Ai Audit
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Subtext */}
                <p className="mt-2 text-xs text-white/40">
                  Get a free automation audit to see what's possible for your business.
                </p>
              </div>

              {/* Right Side - Link Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Product Column */}
                <div>
                  <h4 className="text-sm font-medium text-white/90 tracking-tight">Product</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <a href="#systems" className="text-white/50 hover:text-white transition">
                        Systems
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="text-white/50 hover:text-white transition">
                        Experience
                      </a>
                    </li>
                    <li>
                      <a href="#process" className="text-white/50 hover:text-white transition">
                        Process
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Services Column */}
                <div>
                  <h4 className="text-sm font-medium text-white/90 tracking-tight">Services</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <span className="text-white/50">Lead Capture</span>
                    </li>
                    <li>
                      <span className="text-white/50">Sales Automation</span>
                    </li>
                    <li>
                      <span className="text-white/50">Content Systems</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Column */}
                <div>
                  <h4 className="text-sm font-medium text-white/90 tracking-tight">Contact</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <a href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
                        Book a Call
                      </a>
                    </li>
                    <li>
                      <a href="mailto:bryan@sumait.ai" className="text-white/50 hover:text-white transition">
                        bryansumait@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white/50 hover:text-white transition">
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-xs text-white/30">
                © 2026 Bryan Sumait. All rights reserved.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((link, index) => <a key={index} href={link.href} className="h-8 w-8 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition flex items-center justify-center" aria-label={link.name}>
                    <Icon icon={link.icon} className="w-4 h-4 text-white/50" />
                  </a>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;