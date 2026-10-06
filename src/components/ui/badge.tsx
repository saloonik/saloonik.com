import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary dark:bg-primary/20",
        success:
          "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
        warning:
          "bg-amber-500/10 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
        onPrimary: "bg-primary-foreground/20 text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
