"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Markmap.module.css';

// Importa o MarkmapViewer dinamicamente para evitar erros de SSR com D3/Markmap
const MarkmapViewer = dynamic(() => import('@/components/MarkmapViewer'), {
    ssr: false,
    loading: () => <div className={styles.loading}>Carregando visualizador...</div>
});

const DEFAULT_MARKDOWN = `# Markmap Interativo

## Funcionalidades
- [x] Zoom e Pan
- [x] Expansão de nós
- [x] Suporte a Markdown

## Como usar
1. Digite seu texto no editor
2. Use identação para criar níveis
3. O mapa atualiza automaticamente

## Exemplo de Lista
- Item 1
    - Subitem A
    - Subitem B
- Item 2

## Fórmulas Matemáticas
- $f(x) = x^2$
`;

export default function MarkmapPage() {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mapas Mentais Interativos</h1>
                <p className={styles.subtitle}>Crie e visualize mapas mentais instantaneamente a partir de texto.</p>
            </header>

            <div className={styles.editorContainer}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>Editor (Markdown)</div>
                    <textarea
                        className={styles.textarea}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Digite seu markdown aqui..."
                    />
                </div>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>Visualização</div>
                    <div className={styles.preview}>
                        <MarkmapViewer markdown={markdown} />
                    </div>
                </div>
            </div>
        </div>
    );
}
