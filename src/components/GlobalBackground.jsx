import React, { useEffect, useRef, useCallback } from 'react';

const GlobalBackground = () => {
    const sceneRef = useRef(null);
    const bgRef = useRef(null);
    const gridRef = useRef(null);
    const glowRef = useRef(null);
    const cursorGlowRef = useRef(null);

    const target = useRef({ x: 0, y: 0, mx: 0, my: 0 });
    const current = useRef({ x: 0, y: 0, mx: 0, my: 0 });
    const rafId = useRef(null);

    /* ── Smooth mouse tracking via rAF ── */
    const handleMouse = useCallback((e) => {
        const cx = e.clientX;
        const cy = e.clientY;
        const nx = (cy / window.innerHeight - 0.5);   // -0.5 → 0.5
        const ny = (cx / window.innerWidth - 0.5);     // -0.5 → 0.5

        target.current = {
            x: nx * 6,      // rotateX degrees (reduced for very subtle movement)
            y: ny * -6,     // rotateY degrees (reduced for very subtle movement)
            mx: cx,
            my: cy,
        };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [handleMouse]);

    /* ── Animation loop — smooth lerp ── */
    useEffect(() => {
        const lerp = (a, b, t) => a + (b - a) * t;
        const ease = 0.08;
        let activity = 0; // Tracks mouse activity/velocity

        const tick = () => {
            const c = current.current;
            const t = target.current;

            c.x = lerp(c.x, t.x, ease);
            c.y = lerp(c.y, t.y, ease);
            c.mx = lerp(c.mx, t.mx, ease);
            c.my = lerp(c.my, t.my, ease);

            // Scene rotation (camera feel)
            if (sceneRef.current) {
                sceneRef.current.style.transform =
                    `rotateX(${c.x}deg) rotateY(${c.y}deg)`;
            }

            // Parallax — background layer (0.15x)
            if (bgRef.current) {
                bgRef.current.style.transform =
                    `translateZ(-150px) scale(1.2) translate(${c.y * 0.15}px, ${c.x * 0.15}px)`;
            }

            // Parallax — grid layer (0.3x)
            if (gridRef.current) {
                gridRef.current.style.transform =
                    `translateZ(-80px) scale(1.15) translate(${c.y * 0.3}px, ${c.x * 0.3}px)`;
            }

            // Parallax — center glow (0.5x)
            if (glowRef.current) {
                glowRef.current.style.transform =
                    `translateZ(-40px) scale(1.05) translate(${c.y * 0.5}px, ${c.x * 0.5}px)`;
            }

            // Dynamic reactive spotlight glow based on movement velocity
            const dx = t.mx - c.mx;
            const dy = t.my - c.my;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // lerp activity towards target based on speed
            const targetActivity = Math.min(speed / 15, 1.0);
            activity = lerp(activity, targetActivity, 0.05);

            // Fade to extremely subtle dark ambient (0.008) when idle, brighten to sweep (0.035)
            const cursorOpacity = 0.008 + activity * 0.027;
            const cursorRadius = 500 + activity * 250;

            // Cursor light
            if (cursorGlowRef.current) {
                cursorGlowRef.current.style.background =
                    `radial-gradient(${cursorRadius}px at ${c.mx}px ${c.my}px, rgba(255, 255, 255, ${cursorOpacity}), transparent 80%)`;
            }

            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, []);

    return (
        <div className="global-bg-container">
            <div className="global-bg-perspective">
                <div ref={sceneRef} className="global-bg-scene">
                    {/* LAYER 1: Background gradient & Noise */}
                    <div ref={bgRef} className="global-bg-layer global-bg-gradient-layer">
                        <div className="hero-top-gradient" />
                        <div className="global-bg-layer hero-top-noise" />
                    </div>

                    {/* LAYER 2: Subtle Grid Layer */}
                    <div ref={gridRef} className="global-bg-layer hero-top-grid" />

                    {/* LAYER 3: Soft Center Glow (behind card) */}
                    <div ref={glowRef} className="global-bg-layer">
                        <div className="hero-center-glow" />
                    </div>
                </div>
            </div>

            {/* LAYER 4: Edge Vignette (fixed, framing viewport) */}
            <div className="hero-vignette" />

            {/* LAYER 5: Cursor light (outside scene so it doesn't rotate) */}
            <div ref={cursorGlowRef} className="global-bg-cursor-glow" />
        </div>
    );
};

export default React.memo(GlobalBackground);
