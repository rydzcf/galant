"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="relative w-full max-w-sm h-64 mb-8 rounded-3xl overflow-hidden shadow-lg">
        {/* Unsplash placeholder image directly if something goes very wrong */}
        <Image 
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop" 
          alt="Błąd" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <h2 className="text-3xl font-bold text-destructive">Wystąpił błąd</h2>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Ups! Coś poszło nie tak podczas ładowania tej strony. / Oops! Something went wrong while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        Spróbuj ponownie / Try again
      </button>
    </div>
  );
}
