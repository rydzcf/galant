import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ArrowLeft } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import fs from "fs/promises";
import path from "path";

type BlogPostProps = {
  params: Promise<{ lang: "pl" | "en"; slug: string }>;
};

const DATA_PATH = path.join(process.cwd(), "src/data/blog.json");

async function getPosts() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw); // tablica postów
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.flatMap((post: any) => [
    { lang: "pl", slug: String(post.slug) },
    { lang: "en", slug: String(post.slug) },
  ]);
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { lang, slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p: any) => p.slug === slug);
  const localeData = post?.locales?.[lang];

  if (!localeData) notFound();

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      <section className="w-full relative min-h-[50vh] flex items-end pt-32 pb-16 bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={`/images/blog/${post.image.split('/').pop()}`}
            alt={localeData.title}
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="container mx-auto px-4 z-10">
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <Link
                href={`/${lang}/#blog`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {lang === "pl" ? "Wróć do bloga" : "Back to blog"}
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {localeData.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {localeData.summary}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Reveal delay={0.2}>
            <article
              className="max-w-5xl mx-auto"
              dangerouslySetInnerHTML={{ __html: localeData.content }}
            />
          </Reveal>
        </div>
      </section>

      <CtaSection lang={lang} />
    </div>
  );
}