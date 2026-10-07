"use client";

import { Loader2Icon, XIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { ToastStatusIcon } from "@/components/ui/toast-status-icon";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <ToastStatusIcon tone="success" />,
        info: <ToastStatusIcon tone="info" />,
        warning: <ToastStatusIcon tone="warning" />,
        error: <ToastStatusIcon tone="error" />,
        loading: (
          <Loader2Icon className="text-muted-foreground size-7 animate-spin" />
        ),
        close: <XIcon className="size-4" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-popover text-popover-foreground relative flex w-[min(24rem,calc(100vw-2rem))] items-center gap-3 rounded-lg border p-4 shadow-lg",
          icon: "flex shrink-0 items-center",
          content: "min-w-0 flex-1 space-y-0.5 pr-5",
          title: "text-sm font-medium leading-snug",
          description: "text-muted-foreground text-xs",
          actionButton: buttonVariants({
            variant: "outline",
            size: "sm",
            className: "mr-8 shrink-0",
          }),
          cancelButton: buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "shrink-0",
          }),
          closeButton:
            "text-muted-foreground! hover:text-foreground! focus-visible:ring-ring absolute top-2! right-2! left-auto! size-6! transform-none! cursor-pointer rounded! border-0! bg-transparent! outline-none focus-visible:ring-2",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
