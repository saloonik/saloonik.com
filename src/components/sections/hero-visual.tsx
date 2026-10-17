"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";

// The calendar tips back and the SMS card drifts up as the hero scrolls away.
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const smsY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <motion.div
      ref={ref}
      className="relative min-w-0 [perspective:1400px]"
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        style={reduced ? undefined : { rotateX, y, transformOrigin: "top" }}
      >
        <CalendarMockup captionClassName="lg:pl-80" />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: smsY }}
        className="absolute -bottom-5 left-4 z-30 hidden w-72 lg:block"
      >
        <motion.div
          initial={{ opacity: 0, x: -48, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{
            delay: 1.2,
            type: "spring",
            stiffness: 140,
            damping: 16,
          }}
        >
          <SmsMockup className="motion-safe:animate-float" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
