import Link from "next/link";
import { EmercoLogo } from "./EmercoLogo";
import messagesPl from "@/messages/pl.json";
import messagesEn from "@/messages/en.json";

export function Footer({ lang }: { lang: 'pl' | 'en' }) {
  const messages = lang === 'pl' ? messagesPl : messagesEn;
  
  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 lowercase">
        <p className="text-sm">
          {messages.footer.rights}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span>powered by</span>
          <Link href="https://emer.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <EmercoLogo className="h-4 w-auto text-current" />
          </Link>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
