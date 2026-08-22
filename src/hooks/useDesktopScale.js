import { useState, useEffect } from 'react';

/**
 * Desktop Fidelity Scaling Hook
 * 
 * Computes a normalized scale factor calibrated to the approved 2560x1440 desktop reference:
 * - 2560px -> 1.00 (LOCKED reference state)
 * - 1920px -> ~0.88-0.92
 * - 1728px -> ~0.82-0.87
 * - 1512px -> ~0.76-0.82
 * - 1440px -> ~0.74-0.80
 * - 1366px -> ~0.71-0.77
 * - 1280px -> ~0.68-0.74
 * - 1180px -> ~0.64-0.70
 * - 1024px -> ~0.60-0.66
 * 
 * Also sets CSS variable `--desktop-ui-scale` on document.documentElement for pure CSS usage.
 */
export const getDesktopScale = () => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w >= 2560) return 1;

    // Target scale curve mapping from 1024 to 2560:
    const progress = Math.max(0, Math.min(1, (w - 1024) / 1536));
    const widthScale = 0.63 + 0.37 * Math.pow(progress, 0.72);
    
    // Vertical breathing room check for short laptops (e.g. 1366x768, 1440x900)
    const heightProgress = Math.max(0, Math.min(1, (h - 650) / 790));
    const heightScale = 0.63 + 0.37 * Math.pow(heightProgress, 0.72);
    
    const scale = Math.min(widthScale, Math.max(0.60, heightScale * 1.06));
    return Math.max(0.60, Math.min(1.0, scale));
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
