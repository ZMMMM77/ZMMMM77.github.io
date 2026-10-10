"use client";

import { motion, useInView, useReducedMotion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}
const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [animateOnScroll, setAnimateOnScroll] = useState(false);
  const inViewResult = useInView(ref, {
    once: true,
    ...(inViewMargin ? { margin: inViewMargin as any } : {})
  });
  useEffect(() => {
    const element = ref.current as HTMLElement | null;
    if (inView && element && element.getBoundingClientRect().top > window.innerHeight) {
      setAnimateOnScroll(true);
    }
  }, [inView]);
  const isInView = !animateOnScroll || inViewResult || reducedMotion;
  const defaultVariants: Variants = {
    hidden: { y: -yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: reducedMotion ? 0 : 0.04 + delay,
        duration: reducedMotion ? 0 : duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
