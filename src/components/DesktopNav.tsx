import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNav({ messages, lang }: { messages: any, lang: 'pl' | 'en' }) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}#about`, label: messages.nav.about },
    { href: `/${lang}#offer`, label: messages.nav.offer },
    { href: `/${lang}#blog`, label: messages.nav.blog },
    { href: `/${lang}#contact`, label: messages.nav.contact },
  ];

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider text-primary-foreground"
        >
          {link.label}
        </Link>
      ))}
      <div className="flex items-center gap-2 border-l border-primary-foreground/30 pl-4">
        <Link href="/pl" className={`text-xs transition-opacity ${lang === 'pl' ? 'font-bold text-primary-foreground' : 'text-primary-foreground/70 hover:opacity-70'}`}>PL</Link>
        <span className="text-primary-foreground/70 text-xs">/</span>
        <Link href="/en" className={`text-xs transition-opacity ${lang === 'en' ? 'font-bold text-primary-foreground' : 'text-primary-foreground/70 hover:opacity-70'}`}>EN</Link>
      </div>
    </nav>
  );
}
