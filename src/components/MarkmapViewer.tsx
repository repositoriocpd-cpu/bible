"use client";

import React, { useRef, useEffect } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

const transformer = new Transformer();

interface MarkmapViewerProps {
    markdown: string;
}

export default function MarkmapViewer({ markdown }: MarkmapViewerProps) {
    const refSvg = useRef<SVGSVGElement>(null);
    const refMm = useRef<Markmap | null>(null);
    const refToolbar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refMm.current || !refSvg.current) return;

        refMm.current = Markmap.create(refSvg.current);

        if (refToolbar.current) {
            const { el } = Toolbar.create(refMm.current);
            el.style.position = 'absolute';
            el.style.bottom = '0.5rem';
            el.style.right = '0.5rem';
            refToolbar.current.append(el);
        }
    }, []);

    useEffect(() => {
        const mm = refMm.current;
        if (!mm) return;

        const { root } = transformer.transform(markdown);
        mm.setData(root);
        mm.fit();
    }, [markdown]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
            <svg
                ref={refSvg}
                style={{ width: '100%', height: '100%', minHeight: '500px' }}
            />
            <div ref={refToolbar} />
        </div>
    );
}
