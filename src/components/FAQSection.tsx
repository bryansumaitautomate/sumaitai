import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What types of businesses do you work with?',
      answer:
        "I work primarily with B2B service providers, SaaS companies, and coaches or consultants. The fit is best when you have proven offers but need better systems to scale. If you're doing $20K per month or more and losing leads to manual processes, I can probably help.",
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "Most complete system builds ship in 30 days from kickoff. Lighter scopes can be done in 1 to 2 weeks. I'll give you a realistic timeline after our discovery call.",
    },
    {
      question: 'Do I need to be technical?',
      answer:
        "Not at all. My team handles the technical implementation. I scope the work, run discovery, and stay close to delivery. You just need to understand your sales process and be able to answer questions about how you want things to work.",
    },
    {
      question: 'What if I already have some systems in place?',
      answer:
        "That's common. We'll audit what you have, keep what's working, and fix or replace what isn't. No need to start from scratch, we'll build on your existing foundation.",
    },
    {
      question: "What's included in support after launch?",
      answer:
        'Every project includes 30 days of support after launch for bugs and adjustments. For ongoing optimization and new automations, we offer monthly retainer packages.',
    },
    {
      question: 'Do you work with clients outside the Philippines?',
      answer:
        "Yes. SUMAIT is Manila-based, GMT+8. We work async-first with clients in the US, EU, and Asia. Most of our retainer clients are not in the Philippines.",
    },
    {
      question: "What's your pricing?",
      answer:
        "Pricing is custom to each engagement. We will quote you on the discovery call once we understand your scope and goals.",
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a]/80 backdrop-blur-sm py-20 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 border-x border-white/10">
          {/* Sidebar */}
          <div className="lg:border-r border-white/10 p-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4">
              10 /// FAQ
            </p>
            <h2 className="font-syne font-bold text-xl md:text-2xl text-white">
              Common questions, straight answers.
            </h2>
          </div>

          {/* FAQ List */}
          <div
            ref={ref}
            className={`lg:col-span-3 p-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="divide-y divide-white/10">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="py-6"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="font-syne font-semibold text-lg text-white group-hover:text-[#ef4444] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <Icon
                      icon={openIndex === index ? 'solar:minus-linear' : 'solar:add-linear'}
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        openIndex === index ? 'text-[#ef4444]' : 'text-white/30'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="mt-4 p-4 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10"
                        >
                          <p className="text-base text-white/50 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
