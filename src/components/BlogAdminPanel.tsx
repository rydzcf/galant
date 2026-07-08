"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// ============================================================
// KONFIGURACJA
// ============================================================

// Podmień na adres swojego backendu (Express + wordToJsonRoute),
// np. "https://api.twojadomena.pl/word-to-json"
const API_BASE_URL =
  process.env.NEXT_PUBLIC_WORD_TO_JSON_API_URL ?? "https://srv566170.hstgr.cloud:3000/wordToJson";

// ============================================================
// TYPY (spójne z backendem)
// ============================================================

type BlogPostLocale = {
  title: string;
  summary: string;
  content: string;
};

type BlogPost = {
  id: string;
  slug: string;
  image: string;
  locales: {
    pl?: BlogPostLocale;
    en?: BlogPostLocale;
  };
};

type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
};

type ApiErrorResponse = {
  status: "error";
  message: string;
  details?: string;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================
// KOMPONENT
// ============================================================

export default function BlogAdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // --- Stan formularza dodawania posta ---
  const [wordPl, setWordPl] = useState<File | null>(null);
  const [wordEn, setWordEn] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // --- Stan usuwania (per post: wpisane potwierdzenie) ---
  const [deleteInputs, setDeleteInputs] = useState<Record<string, string>>({});
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // ------------------------------------------------------------
  // Pobranie listy postów (GET)
  // ------------------------------------------------------------
  const fetchPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    setListError(null);
    try {
      const res = await fetch(API_BASE_URL, { cache: "no-store" });
      const json: ApiResponse<BlogPost[]> = await res.json();

      if (json.status === "error") {
        setListError(json.message);
        return;
      }

      setPosts(json.data);
    } catch (err) {
      setListError("Nie udało się pobrać listy postów. Sprawdź połączenie z serwerem.");
      console.error(err);
    } finally {
      setIsLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ------------------------------------------------------------
  // Dodawanie posta (POST)
  // ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!wordPl && !wordEn) {
      setSubmitError("Dodaj przynajmniej jeden plik Word (PL lub EN).");
      return;
    }
    if (!image) {
      setSubmitError("Dodaj plik zdjęcia.");
      return;
    }

    const formData = new FormData();
    if (wordPl) formData.append("word_pl", wordPl);
    if (wordEn) formData.append("word_en", wordEn);
    formData.append("image", image);

    setIsSubmitting(true);
    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
      });
      const json: ApiResponse<BlogPost> = await res.json();

      if (json.status === "error") {
        setSubmitError(json.details ? `${json.message} (${json.details})` : json.message);
        return;
      }

      setSubmitSuccess(`Dodano post: "${json.data.slug}"`);
      setWordPl(null);
      setWordEn(null);
      setImage(null);
      // reset input[type=file] elementów
      (e.target as HTMLFormElement).reset();

      await fetchPosts();
    } catch (err) {
      setSubmitError("Nie udało się wysłać formularza. Sprawdź połączenie z serwerem.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------------------------
  // Usuwanie posta (DELETE) - wymaga wpisania słowa "delete"
  // ------------------------------------------------------------
  const handleDelete = async (slug: string) => {
    setDeleteError(null);

    const confirmation = deleteInputs[slug]?.trim().toLowerCase();
    if (confirmation !== "delete") {
      setDeleteError('Aby usunąć post, wpisz dokładnie słowo "delete" w polu potwierdzenia.');
      return;
    }

    setDeletingSlug(slug);
    try {
      const res = await fetch(API_BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, confirmation: "delete" }),
      });
      const json: ApiResponse<BlogPost> = await res.json();

      if (json.status === "error") {
        setDeleteError(json.message);
        return;
      }

      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteInputs((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
    } catch (err) {
      setDeleteError("Nie udało się usunąć posta. Sprawdź połączenie z serwerem.");
      console.error(err);
    } finally {
      setDeletingSlug(null);
    }
  };

  // ==============================================================
  // RENDER
  // ==============================================================

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 space-y-16">
      <h1 className="text-3xl md:text-4xl font-bold">Panel bloga</h1>

      {/* -------------------- FORMULARZ DODAWANIA -------------------- */}
      <section className="bg-secondary/30 border border-border rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6">Dodaj nowy post</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="word_pl">
                Plik Word (PL)
              </label>
              <input
                id="word_pl"
                type="file"
                accept=".doc,.docx"
                onChange={(e) => setWordPl(e.target.files?.[0] ?? null)}
                className="block w-full text-sm rounded-xl border border-border bg-background p-2 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2 file:cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="word_en">
                Plik Word (EN)
              </label>
              <input
                id="word_en"
                type="file"
                accept=".doc,.docx"
                onChange={(e) => setWordEn(e.target.files?.[0] ?? null)}
                className="block w-full text-sm rounded-xl border border-border bg-background p-2 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2 file:cursor-pointer"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground -mt-2">
            Podaj przynajmniej jeden z powyższych plików (PL lub EN).
          </p>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="image">
              Zdjęcie posta
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              required
              className="block w-full text-sm rounded-xl border border-border bg-background p-2 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-2 file:cursor-pointer"
            />
          </div>

          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {submitError}
            </p>
          )}
          {submitSuccess && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              {submitSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full font-bold transition-transform active:scale-95"
          >
            {isSubmitting ? "Wysyłanie..." : "Dodaj post"}
          </button>
        </form>
      </section>
      
      {/* DEPLOY */}
      <section>
          <a href="/deploy.php?token=f7Kx2mQpL9nRvT4wYhDjAcE6bZsN3uGo"
          className="curosor-pointer"
          >Deploy</a>
      </section>

      {/* -------------------- LISTA POSTÓW + USUWANIE -------------------- */}
      <section>
        <h2 className="text-xl font-bold mb-6">Istniejące posty</h2>

        {listError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            {listError}
          </p>
        )}
        {deleteError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            {deleteError}
          </p>
        )}

        {isLoadingPosts ? (
          <p className="text-muted-foreground">Ładowanie...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">Brak postów.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const title = post.locales.pl?.title ?? post.locales.en?.title ?? post.slug;
              return (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 border border-border rounded-2xl p-4"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-secondary">
                    {post.image && (
                      <Image src={post.image} alt={title} fill className="object-cover" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{title}</p>
                    <p className="text-sm text-muted-foreground truncate">{post.slug}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder='wpisz "delete"'
                      value={deleteInputs[post.slug] ?? ""}
                      onChange={(e) =>
                        setDeleteInputs((prev) => ({ ...prev, [post.slug]: e.target.value }))
                      }
                      className="w-32 text-sm rounded-full border border-border bg-background px-4 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deletingSlug === post.slug}
                      className="text-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full font-bold transition-transform active:scale-95"
                    >
                      {deletingSlug === post.slug ? "Usuwanie..." : "Usuń"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
