import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroTop = () => {
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const textRef = useRef(null);
    const cardRef = useRef(null);
    const glowOrbRef = useRef(null);
    const gridRef = useRef(null);
    const bgRef = useRef(null);
    const cursorGlowRef = useRef(null);

    // Smoothed rotation values (using refs for animation frame)
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

            // Cursor light
            if (cursorGlowRef.current) {
                cursorGlowRef.current.style.background =
                    `radial-gradient(600px at ${c.mx}px ${c.my}px, rgba(255,255,255,0.07), transparent 80%)`;
            }

            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, []);

    /* ── GSAP scroll animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text: scale up, blur gradually, fade
            gsap.to(textRef.current, {
                scale: 1.8,
                opacity: 0,
                filter: 'blur(20px)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: true,
                    start: 'top top',
                    end: 'bottom top',
                },
            });

            // Info card reveals
            gsap.to(cardRef.current, {
                opacity: 1,
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: true,
                    start: '40% top',
                    end: '80% top',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="hero-top-section">
            {/* Sticky viewport lock */}
            <div className="hero-top-sticky">

                {/* PERSPECTIVE WRAPPER — makes depth possible */}
                <div className="hero-top-perspective">

                    {/* 3D SCENE — rotates with cursor */}
                    <div ref={sceneRef} className="hero-top-scene">

                        {/* LAYER 1: Background gradient (deepest, moves least) */}
                        <div ref={bgRef} className="hero-top-layer hero-top-bg-layer">
                            <div className="hero-top-gradient" />
                        </div>

                        {/* LAYER 2: Noise texture */}
                        <div className="hero-top-layer hero-top-noise" />

                        {/* LAYER 3: Ambient grid */}
                        <div ref={gridRef} className="hero-top-layer hero-top-grid" />

                        {/* LAYER 4: Atmospheric glow orb (behind text) */}
                        <div ref={glowOrbRef} className="hero-top-layer hero-top-orb" />

                        {/* LAYER 5: Glass Typography (foreground) */}
                        <div ref={textRef} className="hero-top-layer hero-top-title-wrap">
                            {/* SVG defs for text clip path */}
                            <svg className="hero-top-svg-defs" aria-hidden="true">
                                <defs>
                                    <clipPath id="glass-text-clip" clipPathUnits="objectBoundingBox">
                                        <text
                                            x="0.5" y="0.78"
                                            textAnchor="middle"
                                            fontFamily="'Inter', system-ui, sans-serif"
                                            fontWeight="800"
                                            fontSize="0.85"
                                            letterSpacing="-0.03"
                                        >PORTFOLIO</text>
                                    </clipPath>
                                </defs>
                            </svg>

                            {/* Layer A: Backdrop frost — clipped to text shape */}
                            <div className="glass-text-frost" />

                            {/* Layer B: Gradient highlight — reflection */}
                            <h1
                                className="glass-text-highlight"
                                aria-hidden="true"
                            >PORTFOLIO</h1>

                            {/* Layer C: Frosted edge / light-catch */}
                            <span
                                className="glass-text-edge"
                                data-text="PORTFOLIO"
                                aria-hidden="true"
                            />

                            {/* Layer D: Dispersion glow */}
                            <span className="glass-text-dispersion" aria-hidden="true">PORTFOLIO</span>

                            {/* Accessible / SEO text (visually hidden) */}
                            <h1 className="sr-only">PORTFOLIO</h1>
                        </div>

                    </div>{/* end scene */}

                    {/* LAYER 6: Cursor light (outside scene so it doesn't rotate) */}
                    <div ref={cursorGlowRef} className="hero-top-cursor-glow" />

                    {/* LAYER 7: Info card (outside scene) */}
                    <div ref={cardRef} className="hero-top-card">
                        <span className="hero-top-card-label">Brahmanshu Verma</span>
                        <p className="hero-top-card-role">Product Designer · UI/UX · Systems · 3D</p>
                    </div>

                </div>{/* end perspective */}
            </div>
        </section>
    );
};

export default HeroTop;
