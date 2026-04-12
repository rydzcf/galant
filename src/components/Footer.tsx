import Link from "next/link";
import { EmercoLogo } from "./EmercoLogo";
import messagesPl from "@/messages/pl.json";
import messagesEn from "@/messages/en.json";

export function Footer({ lang }: { lang: 'pl' | 'en' }) {
  const messages = lang === 'pl' ? messagesPl : messagesEn;

  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <p className="text-sm">
          {messages.footer.rights}
        </p>
        <div className="flex items-center gap-1 text-xs opacity-70">
          <span>powered by</span>
          <Link href="https://emer.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center">
            <EmercoLogo className="h-[0.8em] w-auto text-current" />
          </Link>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
