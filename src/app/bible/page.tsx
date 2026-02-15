"use client";

import { useState, useEffect } from "react";
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
    { id: "nvi", name: "Nova Versão Internacional (NVI)" },
    { id: "acf", name: "Almeida Corrigida Fiel (ACF)" },
    { id: "aa", name: "Almeida e Atualizada (AA)" },
    { id: "por_blj", name: "Bíblia Livre (BLJ)" },
    { id: "por_onbv", name: "Nova Bíblia Viva (ONBV)" },
    { id: "por_bsl", name: "Bíblia Portuguesa Mundial (BSL)" },
    { id: "por_blt", name: "Bíblia Livre para Todos (BLT)" },
    { id: "por_tft", name: "Tradução para Tradutores (TFT)" }
];

const BOOK_METADATA: Record<string, { id: string, chapters: number }> = {
    "Gênesis": { id: "gn", chapters: 50 },
    "Êxodo": { id: "ex", chapters: 40 },
    "Levítico": { id: "lv", chapters: 27 },
    "Números": { id: "nm", chapters: 36 },
    "Deuteronômio": { id: "dt", chapters: 34 },
    "Josué": { id: "js", chapters: 24 },
    "Juízes": { id: "jz", chapters: 21 },
    "Rute": { id: "rt", chapters: 4 },
    "1 Samuel": { id: "1sm", chapters: 31 },
    "2 Samuel": { id: "2sm", chapters: 24 },
    "1 Reis": { id: "1rs", chapters: 22 },
    "2 Reis": { id: "2rs", chapters: 25 },
    "1 Crônicas": { id: "1cr", chapters: 29 },
    "2 Crônicas": { id: "2cr", chapters: 36 },
    "Esdras": { id: "ed", chapters: 10 },
    "Neemias": { id: "ne", chapters: 13 },
    "Ester": { id: "et", chapters: 10 },
    "Jó": { id: "job", chapters: 42 },
    "Salmos": { id: "sl", chapters: 150 },
    "Provérbios": { id: "pv", chapters: 31 },
    "Eclesiastes": { id: "ec", chapters: 12 },
    "Cantares": { id: "ct", chapters: 8 },
    "Isaías": { id: "is", chapters: 66 },
    "Jeremias": { id: "jr", chapters: 52 },
    "Lamentações": { id: "lm", chapters: 5 },
    "Ezequiel": { id: "ez", chapters: 48 },
    "Daniel": { id: "dn", chapters: 12 },
    "Oseias": { id: "os", chapters: 14 },
    "Joel": { id: "jl", chapters: 3 },
    "Amós": { id: "am", chapters: 9 },
    "Obadias": { id: "ob", chapters: 1 },
    "Jonas": { id: "jn", chapters: 4 },
    "Miqueias": { id: "mq", chapters: 7 },
    "Naum": { id: "na", chapters: 3 },
    "Habacuque": { id: "hc", chapters: 3 },
    "Sofonias": { id: "sf", chapters: 3 },
    "Ageu": { id: "ag", chapters: 2 },
    "Zacarias": { id: "zc", chapters: 14 },
    "Malaquias": { id: "ml", chapters: 4 },
    "Mateus": { id: "mt", chapters: 28 },
    "Marcos": { id: "mc", chapters: 16 },
    "Lucas": { id: "lc", chapters: 24 },
    "João": { id: "jo", chapters: 21 },
    "Atos": { id: "at", chapters: 28 },
    "Romanos": { id: "rm", chapters: 16 },
    "1 Coríntios": { id: "1co", chapters: 16 },
    "2 Coríntios": { id: "2co", chapters: 13 },
    "Gálatas": { id: "gl", chapters: 6 },
    "Efésios": { id: "ef", chapters: 6 },
    "Filipenses": { id: "fp", chapters: 4 },
    "Colossenses": { id: "cl", chapters: 4 },
    "1 Tessalonicenses": { id: "1ts", chapters: 5 },
    "2 Tessalonicenses": { id: "2ts", chapters: 3 },
    "1 Timóteo": { id: "1tm", chapters: 6 },
    "2 Timóteo": { id: "2tm", chapters: 4 },
    "Tito": { id: "tt", chapters: 3 },
    "Filemom": { id: "fm", chapters: 1 },
    "Hebreus": { id: "hb", chapters: 13 },
    "Tiago": { id: "tg", chapters: 5 },
    "1 Pedro": { id: "1pe", chapters: 5 },
    "2 Pedro": { id: "2pe", chapters: 3 },
    "1 João": { id: "1jo", chapters: 5 },
    "2 João": { id: "2jo", chapters: 1 },
    "3 João": { id: "3jo", chapters: 1 },
    "Judas": { id: "jd", chapters: 1 },
    "Apocalipse": { id: "ap", chapters: 22 }
};

const BOOKS = Object.keys(BOOK_METADATA);

export default function BiblePage() {
    const [translation, setTranslation] = useState("arc"); // Padrão alterado para 'arc' (compatível com nova API)
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

            // Mapeamento de versões para a API abibliadigital
            // por_arc -> arc, por_acf -> acf, por_nvi -> nvi
            const apiTranslation = translation.replace("por_", "");

            // Try local fetch first if it's a local translation
            const localTranslations = ["blj", "onbv", "bsl", "blt", "tft"]; // ids simplificados se existirem localmente
            let usedLocal = false;

            // Se for uma versão local conhecida (ajustar conforme sua estrutura de arquivos)
            if (translation.startsWith("por_") && localTranslations.includes(apiTranslation)) {
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
                // Nova API: abibliadigital.com.br
                // Formato: https://www.abibliadigital.com.br/api/verses/[version]/[book]/[chapter]
                // Exemplo: https://www.abibliadigital.com.br/api/verses/arc/is/41

                const response = await fetch(`https://www.abibliadigital.com.br/api/verses/${apiTranslation}/${bookId}/${chapter}`);

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

                // Formatação específica para resposta da abibliadigital
                if (result.verses) {
                    const formattedData: BibleChapter = {
                        book: result.book.name,
                        chapter: result.chapter.number,
                        verses: result.verses.map((v: any) => ({
                            number: v.number,
                            text: v.text
                        }))
                    };
                    setData(formattedData);
                    return;
                }
            }

            // Fallback para estrutura antiga (se local) ou helloao (se mantido)
            // Mas aqui vamos assumir que se não foi abibliadigital, usamos o formato antigo
            if (usedLocal && result) {
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
            }

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
        // A busca ocorre automaticamente via useEffect quando os estados mudam
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
