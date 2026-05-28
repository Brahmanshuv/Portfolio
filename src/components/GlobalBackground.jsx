import React, { useEffect, useRef, useCallback } from 'react';
import GridSignalCanvas from './GridSignalCanvas';

const GlobalBackground = () => {
    const sceneRef = useRef(null);
    const bgRef = useRef(null);
    const gridRef = useRef(null);
    const glowOrbRef = useRef(null);
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
            x: nx * 10,      // rotateX degrees
            y: ny * -10,     // rotateY degrees
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

            // Parallax — background layer (0.2x)
            if (bgRef.current) {
                bgRef.current.style.transform =
                    `translateZ(-200px) scale(1.4) translate(${c.y * 0.2}px, ${c.x * 0.2}px)`;
            }

            // Parallax — grid layer (0.5x)
            if (gridRef.current) {
                gridRef.current.style.transform =
                    `translateZ(-100px) scale(1.2) translate(${c.y * 0.5}px, ${c.x * 0.5}px)`;
            }

            // Parallax — atmospheric glow (0.8x)
            if (glowOrbRef.current) {
                glowOrbRef.current.style.transform =
                    `translateZ(80px) translate(${c.y * 2}px, ${c.x * 2}px)`;
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
                    {/* LAYER 1: Background gradient (deepest) */}
                    <div ref={bgRef} className="global-bg-layer global-bg-gradient-layer">
                        <div className="hero-top-gradient" />
                    </div>

                    {/* LAYER 2: Noise texture */}
                    <div className="global-bg-layer hero-top-noise" />

                    {/* LAYER 3: Ambient grid */}
                    <div ref={gridRef} className="global-bg-layer hero-top-grid">
                        <GridSignalCanvas />
                    </div>

                    {/* LAYER 4: Atmospheric glow orb */}
                    <div ref={glowOrbRef} className="global-bg-layer hero-top-orb" />
                </div>
            </div>

            {/* LAYER 6: Cursor light (outside scene so it doesn't rotate) */}
            <div ref={cursorGlowRef} className="global-bg-cursor-glow" />
        </div>
    );
};

export default React.memo(GlobalBackground);
