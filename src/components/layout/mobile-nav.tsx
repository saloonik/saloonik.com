"use client";

import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { NavLink } from "@/config/site";

type Props = {
  links: NavLink[];
  industries: { slug: string; name: string }[];
  registerUrl: string;
  loginUrl: string;
};

export function MobileNav({ links, industries, registerUrl, loginUrl }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Otwórz menu"
        >
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col gap-6 overflow-y-auto border-l p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Logo onClick={close} />
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Zamknij menu">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Nawigacja po stronie Saloonik
          </Dialog.Description>
          <nav aria-label="Menu mobilne" className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="hover:bg-accent rounded-lg px-3 py-2.5 text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <p className="text-muted-foreground mt-4 px-3 text-[11px] font-semibold tracking-wider uppercase">
              Branże
            </p>
            {industries.map((item) => (
              <Link
                key={item.slug}
                href={`/dla/${item.slug}`}
                onClick={close}
                className="hover:bg-accent text-muted-foreground rounded-lg px-3 py-2 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <Button asChild size="lg">
              <a href={registerUrl}>Wypróbuj za darmo</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={loginUrl}>Zaloguj się</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
