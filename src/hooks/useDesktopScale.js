import { useState, useEffect } from 'react';

/**
 * Desktop Fidelity Scaling Hook
 * 
 * Computes a normalized scale factor with a two-zone multiplier:
 *
 * Zone 1 — MacBook / small desktop (≤1728px):
 *   Applies ×0.85 reduction. Approved MacBook appearance.
 *   - 1024px → ~0.51 (floor)
 *   - 1280px → ~0.58–0.62
 *   - 1366px → ~0.60–0.64
 *   - 1440px → ~0.62–0.66
 *   - 1512px → ~0.65–0.68
 *   - 1728px → ~0.71–0.74
 *
 * Zone 2 — Large desktop (1728px → 2560px):
 *   Multiplier linearly interpolates from 0.85 → 1.00, restoring original scale.
 *   - 1920px → multiplier ~0.885 → effective ~0.78–0.82
 *   - 2200px → multiplier ~0.935 → effective ~0.90–0.95
 *   - 2560px → multiplier 1.00  → effective ~1.00 (original pre-reduction scale)
 *
 * Above 2560px: capped at 1.00.
 *
 * Also sets CSS variable `--desktop-ui-scale` on document.documentElement for pure CSS usage.
 */
export const getDesktopScale = () => {
    if (typeof window === 'undefined') return 0.85;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Base scale curve: maps viewport width 1024–2560 to a raw scale value
    const progress = Math.max(0, Math.min(1, (w - 1024) / 1536));
    const widthScale = 0.63 + 0.37 * Math.pow(progress, 0.72);

    // Vertical breathing room check for short laptops (e.g. 1366×768, 1440×900)
    const heightProgress = Math.max(0, Math.min(1, (h - 650) / 790));
    const heightScale = 0.63 + 0.37 * Math.pow(heightProgress, 0.72);

    const rawScale = Math.min(widthScale, Math.max(0.60, heightScale * 1.06));

    // Two-zone multiplier:
    // ≤1728px  → 0.85× (approved MacBook reduction)
    // 1728–2560 → linearly interpolate 0.85 → 1.00 (restore large desktop)
    // ≥2560px  → 1.00× (original pre-reduction scale)
    const MACBOOK_MAX_W = 1728;
    const DESKTOP_MAX_W = 2560;

    let multiplier;
    if (w <= MACBOOK_MAX_W) {
        multiplier = 0.85;
    } else if (w >= DESKTOP_MAX_W) {
        multiplier = 1.0;
    } else {
        const lerpProgress = (w - MACBOOK_MAX_W) / (DESKTOP_MAX_W - MACBOOK_MAX_W);
        multiplier = 0.85 + lerpProgress * 0.15;
    }

    return Math.max(0.51, Math.min(1.0, rawScale * multiplier));
};

export const useDesktopScale = () => {
    const [scale, setScale] = useState(getDesktopScale);

    useEffect(() => {
        const handleResize = () => {
            const currentScale = getDesktopScale();
            setScale(currentScale);
            document.documentElement.style.setProperty('--desktop-ui-scale', currentScale.toFixed(4));
        };

        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return scale;
};
