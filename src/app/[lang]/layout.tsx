import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

const manrope = Manrope({ subsets: ["latin", "latin-ext"] });

// Podmień na domyślny adres swojej witryny
const BASE_URL = "https://medycynapersonalna.pl";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  return {
    metadataBase: new URL(BASE_URL),
    title: "lek. Adam Galant - Medycyna Personalizowana",
    description: "Terapia Hormonalna Zastępcza - TRT",
    appleWebApp: {
      title: "medycynapersonalna",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        pl: "/pl",
        en: "/en",
        "x-default": "/pl",
      },
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: Props) {
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
      <GoogleAnalytics gaId="G-9D1VBT4ZVH" />
    </html>
  );
}