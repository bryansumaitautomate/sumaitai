import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      data-testid="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
    >
      <motion.div
        data-testid="scroll-progress-fill"
        className="h-full bg-[#ef4444] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgressBar;
