import React from 'react';

export function CtaSection({ lang }: { lang: 'pl' | 'en' }) {
  return (
    <section className="w-full py-16 px-4 flex justify-center">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-primary text-primary-foreground rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden group w-full">
          <div className="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-white/20 blur-[50px] mix-blend-overlay transition-opacity duration-500 group-hover:opacity-70" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {lang === 'pl' ? "Potrzebujesz konsultacji?" : "Need a consultation?"}
            </h3>
            <p className="text-lg opacity-90 font-medium mb-6">
              {lang === 'pl'
                ? "Zadzwoń do mnie lub napisz na WhatsApp. Odpowiadam najszybciej jak to możliwe."
                : "Call me or write on WhatsApp. I respond as quickly as possible."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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
                className="flex flex-1 items-center justify-center gap-3 border-2 border-black text-black px-6 py-4 rounded-full font-bold text-base transition-transform md:hover:scale-105 active:scale-95 shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
