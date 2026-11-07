"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ExternalLink, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useSitePreferences } from "@/hooks/useSitePreferences";
import type { Certificate } from "@/lib/certificates";

export type CertificateOrigin = { x: number; y: number };

export function CertificatePreview({ certificate, origin, onClose }: {
    certificate: Certificate;
    origin: CertificateOrigin;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closingRef = useRef(false);
    const [closing, setClosing] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const reducedMotion = useReducedMotion();
    const { paused } = useSitePreferences();
    const quiet = reducedMotion || paused;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const root = document.documentElement;
        const previous = { body: document.body.style.overflow, root: root.style.overflow, padding: root.style.paddingRight };
        const scrollbar = window.innerWidth - root.clientWidth;
        root.dataset.certificatePreviewOpen = "true";
        if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
        document.body.style.overflow = "hidden";
        root.style.overflow = "hidden";
        window.dispatchEvent(new CustomEvent("certificatePreviewChange", { detail: { open: true } }));
        dialog.showModal();
        closeRef.current?.focus({ preventScroll: true });
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            dialog.close();
            document.body.style.overflow = previous.body;
            root.style.overflow = previous.root;
            root.style.paddingRight = previous.padding;
            delete root.dataset.certificatePreviewOpen;
            window.dispatchEvent(new CustomEvent("certificatePreviewChange", { detail: { open: false } }));
            opener?.focus({ preventScroll: true });
        };
    }, []);

    function dismiss() {
        if (closingRef.current) return;
        closingRef.current = true;
        setClosing(true);
        if (quiet) onClose();
        else closeTimer.current = setTimeout(onClose, 180);
    }

    function toggleZoom() {
        setRevealed(true);
        setZoomed(value => !value);
        viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="certificate-preview"
            aria-labelledby="certificate-preview-title"
            aria-describedby="certificate-preview-issuer"
            data-state={closing ? "closing" : "open"}
            data-quiet={Boolean(quiet)}
            data-lenis-prevent
            style={{ "--certificate-origin-x": `${origin.x * 0.18}px`, "--certificate-origin-y": `${origin.y * 0.18}px`, "--certificate-ratio": certificate.width / certificate.height } as CSSProperties}
            onCancel={event => { event.preventDefault(); dismiss(); }}
            onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
            onWheel={event => event.stopPropagation()}
            onTouchMove={event => event.stopPropagation()}
        >
            <section className="certificate-preview-panel">
                <header className="certificate-preview-header">
                    <div>
                        <h2 id="certificate-preview-title">{certificate.title}</h2>
                        <p id="certificate-preview-issuer">{certificate.issuer} <span>· {certificate.date}</span></p>
                    </div>
                    <button ref={closeRef} type="button" className="certificate-icon-button" onClick={dismiss} aria-label="Close certificate preview" title="Close certificate preview">
                        <X size={20} aria-hidden="true" />
                    </button>
                </header>
                <div ref={viewportRef} className="certificate-viewport" data-zoomed={zoomed} data-lenis-prevent tabIndex={0} role="region" aria-label="Certificate document" aria-busy={!loaded && !failed}>
                    {!failed && <div className="certificate-sheet" data-loaded={loaded} data-revealed={revealed} onAnimationEnd={() => setRevealed(true)}>
                        <Image src={certificate.src} alt={`${certificate.title} certificate awarded to Karlos Son Rivo`} width={certificate.width} height={certificate.height} unoptimized loading="eager" draggable={false} onLoad={() => { setLoaded(true); if (quiet) setRevealed(true); }} onError={() => setFailed(true)} />
                    </div>}
                    {!loaded && !failed && <p className="certificate-loading" role="status">Opening certificate…</p>}
                    {failed && <p className="certificate-error" role="alert">The preview couldn’t load. <a href={certificate.original} target="_blank" rel="noopener noreferrer">Open the original certificate</a>.</p>}
                </div>
                <footer className="certificate-preview-toolbar">
                    <button type="button" onClick={toggleZoom} disabled={!loaded || failed} aria-pressed={zoomed}>
                        {zoomed ? <ZoomOut size={17} aria-hidden="true" /> : <ZoomIn size={17} aria-hidden="true" />}
                        {zoomed ? "Fit to view" : "Zoom in"}
                    </button>
                    <div>
                        <a href={certificate.original} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" />Original<span className="sr-only"> (opens in a new tab)</span></a>
                    </div>
                </footer>
            </section>
        </dialog>,
        document.body,
    );
}
