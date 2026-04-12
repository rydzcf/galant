import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import messagesPl from "@/messages/pl.json";
import messagesEn from "@/messages/en.json";
import fs from "fs";
import path from "path";
import { MapPin, Clock, Building } from "lucide-react";

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
      <section className="w-full min-h-[100dvh] flex flex-col pt-24 md:pt-32 pb-0 bg-background overflow-hidden relative">
        <div className="container mx-auto px-4 z-10 w-full flex-1 flex flex-col justify-center md:justify-start md:flex-row items-stretch">

          <div className="w-full md:w-1/2 flex md:flex-1 items-center relative z-20 pb-16 md:pb-0 order-2 md:order-1">
            <Reveal>
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                  {messages.hero.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-primary font-medium mb-6 md:mb-8">
                  {messages.hero.subtitle}
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 md:mb-12">
                  {messages.hero.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href="tel:+48502759517"
                    className="flex flex-1 items-center justify-center gap-3 bg-transparent text-foreground hover:bg-secondary border-2 border-foreground px-6 py-4 rounded-full font-bold text-base transition-transform md:hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +48 502 759 517
                  </a>

                  <a
                    href="https://wa.me/48502759517"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4 rounded-full font-bold text-base transition-transform md:hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex w-full md:w-1/2 items-center justify-center md:items-end md:justify-end relative mt-8 md:mt-0 order-1 md:order-2 mb-8 md:mb-0">
            <Reveal delay={0.2}>
              <Image
                src="/images/lekarzGalant.jpeg"
                alt="lek. Adam Galant"
                width={1000}
                height={1200}
                priority
                className="w-72 h-72 md:w-full md:h-auto md:max-h-[85vh] object-cover md:object-contain object-top md:object-bottom origin-bottom rounded-full md:rounded-none shadow-2xl md:shadow-none md:scale-110 lg:scale-[1.5] xl:scale-[1.7] 2xl:scale-[1.8] transition-transform"
              />
            </Reveal>
          </div>

        </div>

        {/* Background decorative elements */}
        <div className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[100px] -z-10" />
      </section>



      {/* About Section */}
      <section id="about" className="w-full py-32 bg-primary/10">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="hidden md:flex md:w-1/2 flex-col gap-6">
                <Image
                  src="/images/omnie.jpeg"
                  alt="lek. Adam Galant"
                  width={600}
                  height={800}
                  className="object-cover w-full h-auto aspect-square lg:max-w-[450px] mx-auto rounded-full shadow-2xl border-4 border-background"
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

                  <div className="bg-secondary/30 p-6 rounded-3xl border border-border mt-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{lang === 'pl' ? "Wykształcenie" : "Education"}</h3>
                    <ul className="list-disc list-inside space-y-2 marker:text-primary">
                      <li>{lang === 'pl' ? "Absolwent Warszawskiego Uniwersytetu Medycznego" : "Graduate of Warsaw Medical University"}</li>
                      <li>{lang === 'pl' ? "Specjalizacje zdobyte z wyróżnieniem" : "Specializations obtained with honors"}</li>
                      <li>{lang === 'pl' ? "Certyfikowane kursy endokrynologiczne" : "Certified endocrinology courses"}</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/30 p-6 rounded-3xl border border-border mt-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{lang === 'pl' ? "Kariera zawodowa" : "Professional Career"}</h3>
                    <ul className="list-disc list-inside space-y-2 marker:text-primary">
                      <li>{lang === 'pl' ? "Wieloletnie doświadczenie w leczeniu pacjentów z niedoborami TRT" : "Many years of experience treating TRT deficiency patients"}</li>
                      <li>{lang === 'pl' ? "Indywidualne dobieranie terapii medycznych" : "Individualized selection of medical therapies"}</li>
                      <li>{lang === 'pl' ? "Praca z najnowocześniejszymi protokołami zaburzeń męskich" : "Work with state-of-the-art male disorder protocols"}</li>
                    </ul>
                  </div>
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
            <div className="flex flex-col items-center gap-6 mb-12 mt-8">
              <div className="flex items-center gap-4 text-xl opacity-90">
                <MapPin className="w-8 h-8" />
                <span>Łódź, ul. Tylna</span>
              </div>
              <div className="flex items-center gap-4 text-xl opacity-90">
                <Clock className="w-8 h-8" />
                <span>
                  {lang === 'pl' ? "Pon - Pt: 09:00 - 18:00" : "Mon - Fri: 09:00 - 18:00"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xl opacity-90">
                 <Building className="w-8 h-8" />
                 <span>
                    {lang === 'pl' ? "Gabinet Medycyny Personalnej" : "Personalized Medicine Clinic"}
                 </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <a
                href="tel:+48502759517"
                className="flex flex-1 items-center justify-center gap-3 bg-foreground text-background hover:bg-foreground/90 px-6 py-4 rounded-full font-bold text-base transition-transform md:hover:scale-105 active:scale-95 shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +48 502 759 517
              </a>

              <a
                href="https://wa.me/48502759517"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-3 border-2 border-black text-black hover:bg-black/5 px-6 py-4 rounded-full font-bold text-base transition-transform md:hover:scale-105 active:scale-95 shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
