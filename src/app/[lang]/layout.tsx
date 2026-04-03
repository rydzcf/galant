import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const manrope = Manrope({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "lek. Adam Galant - Medycyna Personalizowana",
  description: "Terapia Hormonalna Zastępcza - TRT",
};

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as 'pl' | 'en';

  return (
    <html lang={lang}>
      <body className={`${manrope.className} min-h-screen flex flex-col`}>
        <Header lang={lang} />
        <main className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
