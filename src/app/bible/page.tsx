"use client";

import { useState, useEffect, useCallback } from "react";
import { Book, ChevronRight, Search, Loader2, AlertCircle } from "lucide-react";
import styles from "./page.module.css";
import clsx from "clsx";

interface BibleVerse {
    number: number;
    text: string;
}

interface BibleChapter {
    book: string;
    chapter: number;
    verses: BibleVerse[];
}

const TRANSLATIONS = [
    { id: "por_arc", name: "Almeida Revista e Corrigida (ARC)" },
    { id: "por_acf", name: "Almeida Corrigida Fiel (ACF)" },
    { id: "por_blj", name: "Bíblia Livre (BLJ)" },
    { id: "por_onbv", name: "Nova Bíblia Viva (ONBV)" },
    { id: "por_bsl", name: "Bíblia Portuguesa Mundial (BSL)" },
    { id: "por_blt", name: "Bíblia Livre para Todos (BLT)" },
    { id: "por_tft", name: "Tradução para Tradutores (TFT)" }
];

const BOOK_METADATA: Record<string, { id: string, chapters: number }> = {
    "Gênesis": { id: "GEN", chapters: 50 },
    "Êxodo": { id: "EXO", chapters: 40 },
    "Levítico": { id: "LEV", chapters: 27 },
    "Números": { id: "NUM", chapters: 36 },
    "Deuteronômio": { id: "DEU", chapters: 34 },
    "Josué": { id: "JOS", chapters: 24 },
    "Juízes": { id: "JDG", chapters: 21 },
    "Rute": { id: "RUT", chapters: 4 },
    "1 Samuel": { id: "1SA", chapters: 31 },
    "2 Samuel": { id: "2SA", chapters: 24 },
    "1 Reis": { id: "1KI", chapters: 22 },
    "2 Reis": { id: "2KI", chapters: 25 },
    "1 Crônicas": { id: "1CH", chapters: 29 },
    "2 Crônicas": { id: "2CH", chapters: 36 },
    "Esdras": { id: "EZR", chapters: 10 },
    "Neemias": { id: "NEH", chapters: 13 },
    "Ester": { id: "EST", chapters: 10 },
    "Jó": { id: "JOB", chapters: 42 },
    "Salmos": { id: "PSA", chapters: 150 },
    "Provérbios": { id: "PRO", chapters: 31 },
    "Eclesiastes": { id: "ECC", chapters: 12 },
    "Cantares": { id: "SNG", chapters: 8 },
    "Isaías": { id: "ISA", chapters: 66 },
    "Jeremias": { id: "JER", chapters: 52 },
    "Lamentações": { id: "LAM", chapters: 5 },
    "Ezequiel": { id: "EZK", chapters: 48 },
    "Daniel": { id: "DAN", chapters: 12 },
    "Oseias": { id: "HOS", chapters: 14 },
    "Joel": { id: "JOL", chapters: 3 },
    "Amós": { id: "AMO", chapters: 9 },
    "Obadias": { id: "OBA", chapters: 1 },
    "Jonas": { id: "JON", chapters: 4 },
    "Miqueias": { id: "MIC", chapters: 7 },
    "Naum": { id: "NAM", chapters: 3 },
    "Habacuque": { id: "HAB", chapters: 3 },
    "Sofonias": { id: "ZEP", chapters: 3 },
    "Ageu": { id: "HAG", chapters: 2 },
    "Zacarias": { id: "ZEC", chapters: 14 },
    "Malaquias": { id: "MAL", chapters: 4 },
    "Mateus": { id: "MAT", chapters: 28 },
    "Marcos": { id: "MRK", chapters: 16 },
    "Lucas": { id: "LUK", chapters: 24 },
    "João": { id: "JHN", chapters: 21 },
    "Atos": { id: "ACT", chapters: 28 },
    "Romanos": { id: "ROM", chapters: 16 },
    "1 Coríntios": { id: "1CO", chapters: 16 },
    "2 Coríntios": { id: "2CO", chapters: 13 },
    "Gálatas": { id: "GAL", chapters: 6 },
    "Efésios": { id: "EPH", chapters: 6 },
    "Filipenses": { id: "PHP", chapters: 4 },
    "Colossenses": { id: "COL", chapters: 4 },
    "1 Tessalonicenses": { id: "1TH", chapters: 5 },
    "2 Tessalonicenses": { id: "2TH", chapters: 3 },
    "1 Timóteo": { id: "1TI", chapters: 6 },
    "2 Timóteo": { id: "2TI", chapters: 4 },
    "Tito": { id: "TIT", chapters: 3 },
    "Filemom": { id: "PHM", chapters: 1 },
    "Hebreus": { id: "HEB", chapters: 13 },
    "Tiago": { id: "JAS", chapters: 5 },
    "1 Pedro": { id: "1PE", chapters: 5 },
    "2 Pedro": { id: "2PE", chapters: 3 },
    "1 João": { id: "1JN", chapters: 5 },
    "2 João": { id: "2JN", chapters: 1 },
    "3 João": { id: "3JN", chapters: 1 },
    "Judas": { id: "JUD", chapters: 1 },
    "Apocalipse": { id: "REV", chapters: 22 }
};

const BOOKS = Object.keys(BOOK_METADATA);

export default function BiblePage() {
    const [translation, setTranslation] = useState("pt-arc");
    const [book, setBook] = useState("Isaías");
    const [chapter, setChapter] = useState(41);
    const [data, setData] = useState<BibleChapter | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChapter = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const meta = BOOK_METADATA[book];
            if (!meta) throw new Error("Livro não encontrado.");

            // Validate chapter locally
            if (chapter < 1 || chapter > meta.chapters) {
                throw new Error(`${book} tem apenas ${meta.chapters} capítulos.`);
            }

            const bookId = meta.id;
            let result;

            // Try local fetch first if it's a local translation
            const localTranslations = ["por_blj", "por_onbv", "por_bsl", "por_blt", "por_tft"];
            let usedLocal = false;

            if (localTranslations.includes(translation)) {
                try {
                    const localRes = await fetch(`/bible/${translation}/${bookId}/${chapter}.json`);
                    if (localRes.ok) {
                        result = await localRes.json();
                        usedLocal = true;
                    }
                } catch (e) {
                    console.log("Local fetch failed, falling back to API");
                }
            }

            if (!usedLocal) {
                // API Format: https://bible.helloao.org/api/[translation]/[bookId]/[chapter].json
                const response = await fetch(`https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`O capítulo ${chapter} de ${book} não foi encontrado na tradução selecionada.`);
                    }
                    throw new Error("Não foi possível carregar este capítulo.");
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Resposta inválida da API (esperava JSON).");
                }

                result = await response.json();
            }

            // Format helloao data to our internal structure
            const formattedData: BibleChapter = {
                book: result.book.name,
                chapter: result.chapter.number,
                verses: result.chapter.content
                    .filter((c: any) => c.type === "verse")
                    .map((c: any) => ({
                        number: c.number,
                        text: c.content ? c.content.map((inner: any) => typeof inner === 'string' ? inner : (inner.text || '')).join('') : ""
                    }))
            };

            setData(formattedData);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Erro ao carregar a Bíblia.");
        } finally {
            setLoading(false);
        }
    }, [translation, book, chapter]);

    useEffect(() => {
        // Auto-correct chapter if book changes and current chapter is too high
        const meta = BOOK_METADATA[book];
        if (meta && chapter > meta.chapters) {
            setChapter(meta.chapters);
        }
    }, [book, chapter]);

    useEffect(() => {
        fetchChapter();
    }, [fetchChapter]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchChapter();
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Bíblia Sagrada</h1>
                    <p className={styles.subtitle}>Consulte as Escrituras e aprofunde seu conhecimento.</p>
                </header>

                <form className={styles.controls} onSubmit={handleSearch}>
                    <div className={styles.controlGroup}>
                        <label className={styles.label}>Tradução</label>
                        <select
                            className={styles.select}
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                        >
                            {TRANSLATIONS.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.label}>Livro</label>
                        <select
                            className={styles.select}
                            value={book}
                            onChange={(e) => setBook(e.target.value)}
                        >
                            {BOOKS.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.label}>Capítulo</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={chapter}
                            min={1}
                            max={150}
                            onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                    </button>
                </form>

                <div className={styles.readingView}>
                    {loading ? (
                        <div className={styles.loading}>
                            <Loader2 className="animate-spin" size={40} />
                            <p>Carregando as Escrituras...</p>
                        </div>
                    ) : error ? (
                        <div className={styles.error}>
                            <AlertCircle size={40} />
                            <p>{error}</p>
                            <button onClick={fetchChapter} className={styles.button} style={{ marginTop: '1rem' }}>Tentar Novamente</button>
                        </div>
                    ) : data ? (
                        <div className={styles.content}>
                            <h2 className={styles.chapterTitle}>{data.book} {data.chapter}</h2>
                            <div className={styles.verseList}>
                                {data.verses.map(v => (
                                    <span key={v.number} className={styles.verse}>
                                        <span className={styles.verseNumber}>{v.number}</span>
                                        {v.text}{" "}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
}
