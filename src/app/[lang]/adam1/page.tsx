"use client";

import React, { useState } from "react";

interface BlogPostResponse {
  status: string;
  data?: {
    id: string;
    slug: string;
    image: string;
    locales: {
      pl: { title: string; summary: string; content: string };
      en: { title: string; summary: string; content: string };
    };
  };
  message?: string;
}

export default function WordToJsonPage() {
  const [wordPl, setWordPl] = useState<File | null>(null);
  const [wordEn, setWordEn] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BlogPostResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordPl || !wordEn || !image) {
      setError("Proszę dodać wszystkie wymagane pliki.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Tworzymy obiekt FormData, ponieważ przesyłamy pliki binarne
    const formData = new FormData();
    formData.append("word_pl", wordPl);
    formData.append("word_en", wordEn);
    formData.append("image", image);

    try {
      const response = await fetch("https://srv566170.hstgr.cloud:3000/wordToJson", {
      method: "POST",
    body: formData,
  });

  // 1. Sprawdzamy, czy serwer w ogóle raczył zwrócić JSON
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // Jeśli nie, pobieramy odpowiedź jako czysty tekst, żeby zobaczyć co tam jest
    const rawText = await response.text();
    console.error("Serwer zwrócił coś innego niż JSON:", rawText);
    throw new Error(`Błąd serwera (status ${response.status}). Serwer nie zwrócił formatu JSON.`);
  }

  // 2. Skoro to JSON, teraz możemy go bezpiecznie sparsować
  const data: BlogPostResponse = await response.json();

  if (!response.ok || data.status === "error") {
    throw new Error(data.message || "Wystąpił błąd podczas konwersji.");
  }

  setResult(data);
} catch (err: any) {
  // Tutaj ładnie wyświetli się nasz nowy błąd, zamiast tajemniczego "string did not match..."
  setError(err.message || "Problem z połączeniem z serwerem.");
} finally {
  setLoading(false);
}
  };

  const copyToClipboard = () => {
    if (!result?.data) return;
    navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "100px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "10px" }}>Konwerter Word do JSON Bloga</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Wgraj dokumenty (.docx) oraz zdjęcie okładkowe, aby wygenerować strukturę wpisu.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Plik Polski */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Artykuł po polsku (.docx):</label>
          <input 
            type="file" 
            accept=".docx" 
            onChange={(e) => setWordPl(e.target.files?.[0] || null)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        {/* Plik Angielski */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Artykuł po angielsku (.docx):</label>
          <input 
            type="file" 
            accept=".docx" 
            onChange={(e) => setWordEn(e.target.files?.[0] || null)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        {/* Zdjęcie JPG */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Zdjęcie główne (.jpg / .jpeg):</label>
          <input 
            type="file" 
            accept=".jpg,.jpeg" 
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>

        {/* Przycisk wysyłania */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "12px", 
            backgroundColor: loading ? "#999" : "#0070f3", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          {loading ? "Przetwarzanie..." : "Generuj wpis JSON"}
        </button>
      </form>

      {/* Komunikat o błędzie */}
      {error && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "5px" }}>
          <strong>Błąd:</strong> {error}
        </div>
      )}

      {/* Wynik końcowy */}
      {result?.data && (
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h2 style={{ margin: 0 }}>Wygenerowany JSON:</h2>
            <button 
              onClick={copyToClipboard}
              style={{ padding: "8px 15px", backgroundColor: copied ? "#2e7d32" : "#333", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
            >
              {copied ? "Skopiowano!" : "Kopiuj JSON"}
            </button>
          </div>
          
          <pre style={{ 
            backgroundColor: "#f4f4f4", 
            padding: "20px", 
            borderRadius: "5px", 
            overflowX: "auto",
            maxHeight: "500px",
            border: "1px solid #ddd",
            fontSize: "14px"
          }}>
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}