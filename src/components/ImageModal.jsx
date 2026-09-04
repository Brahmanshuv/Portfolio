import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageModal({ src, alt, caption, isOpen, onClose }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setIsZoomed(false);
            return;
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Focus close button on open for keyboard accessibility
        setTimeout(() => closeBtnRef.current?.focus(), 50);

        // Lock background scroll when open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt || "Full size image preview"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9999,
                    backgroundColor: 'rgba(5, 7, 12, 0.92)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    boxSizing: 'border-box',
                    cursor: 'zoom-out'
                }}
            >
                {/* TOP BAR / CONTROLS */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        zIndex: 10000,
                        cursor: 'default'
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setIsZoomed(!isZoomed)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            color: '#fff',
                            borderRadius: '100px',
                            padding: '8px 16px',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: 'Fira Code, monospace',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 200ms ease'
                        }}
                    >
                        {isZoomed ? '⊖ FIT' : '⊕ 100%'}
                    </button>

                    <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close full size view"
                        style={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '38px',
                            height: '38px',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 200ms ease'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* IMAGE CONTAINER */}
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(!isZoomed);
                    }}
                    style={{
                        maxWidth: isZoomed ? 'none' : '92vw',
                        maxHeight: isZoomed ? 'none' : '82vh',
                        overflow: isZoomed ? 'auto' : 'hidden',
                        borderRadius: '14px',
                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isZoomed ? 'grab' : 'zoom-in',
                        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            maxWidth: isZoomed ? 'none' : '100%',
                            maxHeight: isZoomed ? 'none' : '82vh',
                            width: isZoomed ? 'auto' : '100%',
                            height: isZoomed ? 'auto' : 'auto',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                    />
                </div>

                {/* CAPTION */}
                {caption && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            marginTop: '16px',
                            maxWidth: '800px',
                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontSize: '14px',
                            lineHeight: 1.5,
                            cursor: 'default'
                        }}
                    >
                        {caption}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
