"use client";

import { motion, useReducedMotion } from "motion/react";

// A quiet version of Magic UI's Border Beam for one featured project.
export function BorderBeam() {
  const reducedMotion = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="border-beam pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
    >
      <motion.span
        className="absolute size-16 bg-linear-to-l from-sky-400/70 via-indigo-400/50 to-transparent"
        style={{ offsetPath: "rect(0 auto auto 0 round 64px)" }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: reducedMotion ? "0%" : ["0%", "100%"] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 16, ease: "linear", repeat: Infinity }}
      />
    </span>
  );
}
