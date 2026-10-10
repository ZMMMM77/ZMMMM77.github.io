"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagicCardProps = {
  children: ReactNode;
  className?: string;
};

// A restrained spotlight variant of Magic UI's Magic Card for portfolio cards.
export function MagicCard({ children, className }: MagicCardProps) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const border = useMotionTemplate`
    linear-gradient(var(--card) 0 0) padding-box,
    radial-gradient(200px circle at ${mouseX}px ${mouseY}px,
      color-mix(in srgb, var(--foreground) 35%, transparent),
      var(--border) 100%) border-box
  `;
  const spotlight = useMotionTemplate`
    radial-gradient(220px circle at ${mouseX}px ${mouseY}px,
      color-mix(in srgb, var(--foreground) 7%, transparent),
      transparent 100%)
  `;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  }

  return (
    <motion.div
      className={cn("magic-card relative isolate overflow-hidden rounded-xl border border-transparent", className)}
      style={{ background: border }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        mouseX.set(-300);
        mouseY.set(-300);
      }}
    >
      <div className="pointer-events-none absolute inset-px rounded-[inherit] bg-card" />
      <motion.div
        aria-hidden="true"
        className="magic-card-glow pointer-events-none absolute inset-px rounded-[inherit]"
        style={{ background: spotlight }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
