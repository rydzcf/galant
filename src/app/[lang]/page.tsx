import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import messagesPl from "@/messages/pl.json";
import messagesEn from "@/messages/en.json";
import fs from "fs";
import path from "path";

type PageProps = {
  params: Promise<{ lang: 'pl' | 'en' }>;
};

export default async function Home(props: PageProps) {
  const params = await props.params;
  const lang = params.lang;
  const messages = lang === 'pl' ? messagesPl : messagesEn;
  
  // Read local blog data
  const blogDataPath = path.join(process.cwd(), 'src/data/blog.json');
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  const posts = blogData.posts;

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex pt-24 pb-0 bg-background overflow-hidden relative">
        <div className="container mx-auto px-4 z-10 w-full flex flex-col md:flex-row items-stretch">
          
          <div className="w-full md:w-1/2 flex items-center pt-12 md:pt-0 relative z-20">
            <Reveal>
              <div className="max-w-xl">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  {messages.hero.title}
                </h1>
                <p className="text-2xl md:text-3xl text-primary font-medium mb-8">
                  {messages.hero.subtitle}
                </p>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  {messages.hero.description}
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="w-full md:w-1/2 flex items-end justify-center md:justify-end relative mt-12 md:mt-0">
            <Reveal delay={0.2}>
              <Image 
                src="/images/lekarzGalant.jpeg" 
                alt="lek. Adam Galant" 
                width={1000} 
                height={1200} 
                priority
                className="w-full h-auto max-h-[85vh] object-contain object-bottom origin-bottom md:scale-[1.5] lg:scale-[1.7] 2xl:scale-[1.8] transition-transform"
              />
            </Reveal>
          </div>

        </div>
        
        {/* Background decorative elements */}
        <div className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[100px] -z-10" />
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-32 bg-background">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 flex flex-col gap-6">
                <Image 
                  src="/images/lekarzGalant.jpeg" 
                  alt="lek. Adam Galant" 
                  width={600} 
                  height={800} 
                  className="rounded-3xl shadow-2xl object-cover w-full max-h-[600px]"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">{messages.nav.about}</h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    {lang === 'pl' 
                      ? "Nazywam się Adam Galant i jestem lekarzem specjalizującym się w leczeniu zaburzeń hormonalnych, ze szczególnym uwzględnieniem Terapii Hormonalnej Zastępczej (TRT)."
                      : "My name is Adam Galant and I am a doctor specializing in the treatment of hormonal disorders, with a particular focus on Testosterone Replacement Therapy (TRT)."}
                  </p>
                  <p>
                    {lang === 'pl' 
                      ? "Celem mojej praktyki jest przywrócenie pacjentom witalności, energii oraz optymalnego zdrowia psychicznego i fizycznego poprzez spersonalizowane podejście do każdego przypadku."
                      : "The goal of my practice is to restore patients' vitality, energy, and optimal mental and physical health through a personalized approach to each case."}
                  </p>
                </div>
                <div className="mt-12 flex gap-4">
                  <Image src="/images/lekarzGalant1.jpeg" alt="lek. Adam Galant consultation" width={300} height={300} className="rounded-2xl shadow-lg w-1/2 object-cover aspect-square" />
                  <Image src="/images/butelka z lekami.webp" alt="leki" width={300} height={300} className="rounded-2xl shadow-lg w-1/2 object-cover aspect-square" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Transformations / Offer Section */}
      <section id="offer" className="w-full py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{messages.nav.offer}</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal delay={0.2}>
              <div className="card bg-background rounded-3xl p-8 shadow-xl border border-border/50">
                <h3 className="text-2xl font-bold mb-6">Przed Terapią</h3>
                <Image src="/images/otyły mężczyzna na siłowni.webp" alt="Przed" width={600} height={400} className="rounded-xl w-full object-cover mb-6 aspect-video" />
                <p className="text-muted-foreground">
                  {lang === 'pl' ? "Brak energii, nadwaga, spadki nastroju i brak motywacji do treningu." : "Lack of energy, overweight, mood drops and lack of motivation to train."}
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="card bg-background rounded-3xl p-8 shadow-xl border border-border/50">
                <h3 className="text-2xl font-bold mb-6 text-primary">Po Terapii TRT</h3>
                <Image src="/images/umięśniony facet 1.webp" alt="Po" width={600} height={400} className="rounded-xl w-full object-cover mb-6 aspect-video" />
                <p className="text-muted-foreground">
                  {lang === 'pl' ? "Wzrost siły, poprawa sylwetki, wyższy poziom energii i lepsze samopoczucie." : "Increased strength, improved physique, higher energy levels and better well-being."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="w-full py-32 bg-background">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16">{messages.nav.blog}</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, index: number) => {
              const localeData = post.locales[lang];
              return (
                <Reveal key={post.id} delay={index * 0.2}>
                  <Link href={`/${lang}/blog/${post.slug}`} className="group block cursor-pointer">
                    <div className="overflow-hidden rounded-3xl mb-6 shadow-lg aspect-[4/3] bg-secondary">
                      <Image 
                        src={post.image} 
                        alt={localeData.title} 
                        width={600} 
                        height={450} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{localeData.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{localeData.summary}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{messages.nav.contact}</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
              {lang === 'pl' 
                ? "Umów się na konsultację i odzyskaj pełnię witalności. Zrób pierwszy krok w stronę lepszego zdrowia."
                : "Schedule a consultation and regain full vitality. Take the first step towards better health."}
            </p>
            <button className="bg-background text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary transition-colors shadow-xl">
              {lang === 'pl' ? "Skontaktuj się ze mną" : "Contact Me"}
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
