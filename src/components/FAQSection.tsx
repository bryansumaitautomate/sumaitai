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
        "I work primarily with B2B service providers, SaaS companies, and coaches/consultants who have proven offers but need better systems to scale. If you're doing $20K+/month and losing leads to manual processes, I can probably help.",
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "Most complete system builds take 4-6 weeks from kickoff to launch. Simpler automations or fixes can be done in 1-2 weeks. I'll give you a realistic timeline after our discovery call.",
    },
    {
      question: 'Do I need to be technical?',
      answer:
        "Not at all. I handle all the technical implementation. You just need to understand your sales process and be able to answer questions about how you want things to work. I'll translate that into systems.",
    },
    {
      question: 'What if I already have some systems in place?',
      answer:
        "That's common. I'll audit what you have, keep what's working, and fix or replace what isn't. No need to start from scratch—we'll build on your existing foundation.",
    },
    {
      question: "What's included in support after launch?",
      answer:
        'Every project includes 30 days of support after launch for bugs and adjustments. For ongoing optimization and new automations, I offer monthly retainer packages.',
    },
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 border-x border-neutral-200">
          {/* Sidebar */}
          <div className="lg:border-r border-neutral-200 p-8">
            <p className="font-mono text-xs tracking-[0.3em] text-[#EF4444] mb-4">
              09 /// FAQ
            </p>
            <h2 className="font-syne font-bold text-xl md:text-2xl text-neutral-900">
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
            <div className="divide-y divide-neutral-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="font-syne font-semibold text-lg text-neutral-900 group-hover:text-[#EF4444] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <Icon
                      icon={openIndex === index ? 'solar:minus-linear' : 'solar:add-linear'}
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        openIndex === index ? 'text-[#EF4444]' : 'text-neutral-400'
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
                        <p className="text-base text-neutral-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
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
