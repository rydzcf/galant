"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export function MobileNav({ messages, lang }: { messages: any, lang: 'pl' | 'en' }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const links = [
    { href: `/${lang}#about`, label: messages.nav.about },
    { href: `/${lang}#offer`, label: messages.nav.offer },
    { href: `/${lang}#blog`, label: messages.nav.blog },
    { href: `/${lang}#contact`, label: messages.nav.contact },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2 text-primary-foreground hover:opacity-70 transition-opacity" aria-label="Toggle Menu">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="top" className="w-full h-[100dvh] pt-20 border-none px-6 flex flex-col gap-10 bg-background/95 backdrop-blur-md">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav className="flex flex-col items-center gap-8 flex-1 justify-center">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-3xl font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center justify-center gap-6 pb-12">
          <Link href="/pl" onClick={() => setOpen(false)} className={`text-xl ${lang === 'pl' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>PL</Link>
          <span className="text-muted-foreground text-xl">|</span>
          <Link href="/en" onClick={() => setOpen(false)} className={`text-xl ${lang === 'en' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>EN</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
