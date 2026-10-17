import Image from "next/image";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Spread on a container: its children fade in as they scroll into view.
// Content is server-rendered visible and the animation is pure CSS
// (scroll-driven, see globals.css), so it never hides text from slow devices,
// no-JS readers or translators. Browsers without support just show it.
export const revealGroup = { "data-reveal": "" } as const;

/** Kept so children can stay tagged; the CSS on the group does the work. */
export const revealItem = undefined;

export function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "group/photo relative aspect-[4/3] overflow-hidden rounded-xl",
        className,
      )}
      initial={{ clipPath: "inset(8% 8% 8% 8% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover motion-safe:transition-transform motion-safe:duration-[1.2s] motion-safe:group-hover/photo:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}
