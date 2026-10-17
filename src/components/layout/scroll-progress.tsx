"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      aria-hidden
      className="from-primary absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r to-rose-400"
      style={{ scaleX }}
    />
  );
}
