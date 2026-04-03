"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileNav } from "@/components/MobileNav";
import messagesPl from "@/messages/pl.json";
import messagesEn from "@/messages/en.json";
import { EmercoLogo } from "@/components/EmercoLogo";
import { GalantLogo } from "@/components/GalantLogo";

export function Header({ lang }: { lang: 'pl' | 'en' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const messages = lang === 'pl' ? messagesPl : messagesEn;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-primary/20 backdrop-blur-md bg-primary text-primary-foreground ${isScrolled ? 'py-2' : 'py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3 flex-shrink-0">
          <GalantLogo className={`text-primary-foreground transition-all duration-300 ${isScrolled ? 'w-7 h-7' : 'w-11 h-11'}`} />
          <span className={`font-semibold hidden sm:block leading-tight tracking-widest uppercase transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-base'}`}>
            {lang === 'pl' ? (
              <>Medycyna<br />Personalna</>
            ) : (
              <>Personalized<br />Medicine</>
            )}
          </span>
        </Link>

        <div className="hidden md:block">
          <DesktopNav messages={messages} lang={lang} />
        </div>

        <div className="md:hidden">
          <MobileNav messages={messages} lang={lang} />
        </div>
      </div>
    </header>
  );
}
