import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { Reveal } from "@/components/Reveal";
import { ArrowLeft } from "lucide-react";

type BlogPostProps = {
  params: Promise<{ lang: 'pl' | 'en'; slug: string }>;
};

// Generate static params for all languages and all posts
export async function generateStaticParams() {
  const blogDataPath = path.join(process.cwd(), 'src/data/blog.json');
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  const posts = blogData.posts;

  const params: { lang: string; slug: string }[] = [];
  
  posts.forEach((post: any) => {
    params.push({ lang: 'pl', slug: post.slug });
    params.push({ lang: 'en', slug: post.slug });
  });

  return params;
}

export default async function BlogPost(props: BlogPostProps) {
  const params = await props.params;
  const { lang, slug } = params;
  
  const blogDataPath = path.join(process.cwd(), 'src/data/blog.json');
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  const post = blogData.posts.find((p: any) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const localeData = post.locales[lang];

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
      {/* Article Header (Hero) */}
      <section className="w-full relative min-h-[50vh] flex items-end pt-32 pb-16 bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={post.image} 
            alt={localeData.title} 
            fill 
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <Link href={`/${lang}/#blog`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                {lang === 'pl' ? "Wróć do bloga" : "Back to blog"}
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

      {/* Article Content */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Reveal delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {/* In a real scenario, you'd probably use a Markdown parser or dangerous HTML here. 
                  Since we have plain text in JSON, we just render paragraphs separated by newlines. */}
              {localeData.content.split('\n').map((paragraph: string, i: number) => (
                 paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
