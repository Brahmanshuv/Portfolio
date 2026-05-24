import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GridSignalCanvas from './GridSignalCanvas';
import profilePic from '../../assets/Profilepicture.jpeg';

gsap.registerPlugin(ScrollTrigger);

const HeroTop = () => {
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const textRef = useRef(null);
    const textParallaxRef = useRef(null);
    const cardRef = useRef(null);
    const glowOrbRef = useRef(null);
    const gridRef = useRef(null);
    const bgRef = useRef(null);
    const cursorGlowRef = useRef(null);
    const verticalListFgRef = useRef(null);
    const verticalListBgRef = useRef(null);
    const verticalWrapFgRef = useRef(null);
    const verticalWrapBgRef = useRef(null);
    const fgItemRefs = useRef([]);
    const bgItemRefs = useRef([]);

    const verticalListRightFgRef = useRef(null);
    const verticalListRightBgRef = useRef(null);
    const verticalWrapRightFgRef = useRef(null);
    const verticalWrapRightBgRef = useRef(null);
    const rightFgItemRefs = useRef([]);
    const rightBgItemRefs = useRef([]);

    // Curated foreground keywords
    const fgItems = [
        "IMMEDIACY",
        "SPATIAL UI",
        "IMMERSIVE",
        "CINEMATIC",
        "FUTURISTIC",
        "MINIMALISM",
        "GLASSMORPHISM",
        "UI/UX DESIGN",
        "3D SCENOGRAPHY",
        "CREATIVE CODE",
        "INTERACTIVE",
        "DESIGN SYSTEMS",
        "AESTHETICS",
        "INTERFACE",
        "MOTION ENGINE"
    ];
    const loopedFgItems = [...fgItems, ...fgItems, ...fgItems];

    // Curated background keywords (different words or offset)
    const bgItems = [
        "PARALLAX",
        "DEPTH",
        "ATMOSPHERE",
        "REFRACTION",
        "TRANSLUCENCY",
        "CHROME",
        "ABERRATION",
        "FROSTED",
        "GLOW",
        "PERSPECTIVE",
        "SCROLL",
        "KINETIC",
        "DYNAMICS",
        "LIGHTING",
        "ORB"
    ];
    const loopedBgItems = [...bgItems, ...bgItems, ...bgItems];

    // Curated foreground business / product / stakeholder keywords
    const rightFgItems = [
        "BUSINESS STRATEGY",
        "PRODUCT VISION",
        "SCALABLE SYSTEMS",
        "GROWTH FOCUSED",
        "STRATEGIC DECISIONS",
        "KPI DRIVEN",
        "USER RETENTION",
        "PLATFORM THINKING",
        "STAKEHOLDER ALIGNMENT",
        "DESIGN LEADERSHIP",
        "SYSTEM THINKING",
        "WORKFLOW OPTIMIZATION",
        "EXPERIENCE STRATEGY",
        "PROBLEM SOLVING",
        "ENTERPRISE UX"
    ];
    const loopedRightFgItems = [...rightFgItems, ...rightFgItems, ...rightFgItems];

    // Curated background business / product / stakeholder keywords
    const rightBgItems = [
        "PRODUCT ARCHITECTURE",
        "ROADMAP THINKING",
        "CONVERSION FOCUSED",
        "PRODUCT ECOSYSTEMS",
        "CROSS-FUNCTIONAL",
        "TEAM COLLABORATION",
        "DEVELOPER HANDOFF",
        "USER ADVOCACY",
        "RESEARCH INSIGHTS",
        "DESIGN OPERATIONS",
        "DECISION MAKING",
        "HUMAN-CENTERED",
        "SCALABLE UX",
        "DESIGN CONSISTENCY",
        "OPERATIONAL CLARITY"
    ];
    const loopedRightBgItems = [...rightBgItems, ...rightBgItems, ...rightBgItems];

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

            // Parallax — Foreground Glass Typography (moves slightly faster/closer)
            if (textParallaxRef.current) {
                textParallaxRef.current.style.transform =
                    `translateZ(120px) translate(${c.y * 1.6}px, ${c.x * 1.6}px)`;
            }

            // Parallax — Mid Plane Primary vertical list (angled & distinct speed)
            if (verticalWrapFgRef.current) {
                verticalWrapFgRef.current.style.transform =
                    `translateZ(40px) rotateY(-10deg) rotateX(1deg) translate(${c.y * 1.1}px, ${c.x * 1.1}px)`;
            }

            // Parallax — Background Plane Secondary vertical list (faded & slower)
            if (verticalWrapBgRef.current) {
                verticalWrapBgRef.current.style.transform =
                    `translateZ(-60px) rotateY(-15deg) translate(${c.y * 0.6}px, ${c.x * 0.6}px)`;
            }

            // Parallax — Mid Plane Primary vertical list (angled & distinct speed) (Right side)
            if (verticalWrapRightFgRef.current) {
                verticalWrapRightFgRef.current.style.transform =
                    `translateZ(40px) rotateY(10deg) rotateX(-1deg) translate(${c.y * 1.1}px, ${c.x * 1.1}px)`;
            }

            // Parallax — Background Plane Secondary vertical list (faded & slower) (Right side)
            if (verticalWrapRightBgRef.current) {
                verticalWrapRightBgRef.current.style.transform =
                    `translateZ(-60px) rotateY(15deg) translate(${c.y * 0.6}px, ${c.x * 0.6}px)`;
            }

            // Recalculate dynamic scaling for vertical kinetic strip items on each frame
            const vh = window.innerHeight;
            const center = vh * 0.5;

            fgItemRefs.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenter = rect.top + rect.height * 0.5;
                const distance = itemCenter - center;
                const absDistance = Math.abs(distance);

                const normalized = Math.min(absDistance / (vh * 0.45), 1);
                const scale = 1.0 - (normalized * 0.35); // Grow to 1.0 at center, shrink to 0.65
                const opacity = 0.28 - (normalized * 0.22); // Bright 0.28 at center, fades to 0.06

                el.style.transform = `scale(${scale.toFixed(4)})`;
                el.style.opacity = opacity.toFixed(3);
                el.style.setProperty("--aberration", (normalized * 0.25).toFixed(3));
            });

            bgItemRefs.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenter = rect.top + rect.height * 0.5;
                const distance = itemCenter - center;
                const absDistance = Math.abs(distance);

                const normalized = Math.min(absDistance / (vh * 0.45), 1);
                const scale = 0.85 - (normalized * 0.25); // Grow to 0.85 at center, shrink to 0.60
                const opacity = 0.14 - (normalized * 0.11); // Bright 0.14 at center, fades to 0.03

                el.style.transform = `scale(${scale.toFixed(4)})`;
                el.style.opacity = opacity.toFixed(3);
                el.style.setProperty("--aberration", (normalized * 0.15).toFixed(3));
            });

            rightFgItemRefs.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenter = rect.top + rect.height * 0.5;
                const distance = itemCenter - center;
                const absDistance = Math.abs(distance);

                const normalized = Math.min(absDistance / (vh * 0.45), 1);
                const scale = 1.0 - (normalized * 0.35); // Grow to 1.0 at center, shrink to 0.65
                const opacity = 0.28 - (normalized * 0.22); // Bright 0.28 at center, fades to 0.06

                el.style.transform = `scale(${scale.toFixed(4)})`;
                el.style.opacity = opacity.toFixed(3);
                el.style.setProperty("--aberration", (normalized * 0.25).toFixed(3));
            });

            rightBgItemRefs.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenter = rect.top + rect.height * 0.5;
                const distance = itemCenter - center;
                const absDistance = Math.abs(distance);

                const normalized = Math.min(absDistance / (vh * 0.45), 1);
                const scale = 0.85 - (normalized * 0.25); // Grow to 0.85 at center, shrink to 0.60
                const opacity = 0.14 - (normalized * 0.11); // Bright 0.14 at center, fades to 0.03

                el.style.transform = `scale(${scale.toFixed(4)})`;
                el.style.opacity = opacity.toFixed(3);
                el.style.setProperty("--aberration", (normalized * 0.15).toFixed(3));
            });

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

            // Kinetic left vertical strip scrolling animation (Foreground - Faster)
            if (verticalListFgRef.current) {
                gsap.fromTo(verticalListFgRef.current,
                    { y: "15vh" },
                    {
                        y: () => {
                            const listHeight = verticalListFgRef.current.scrollHeight;
                            const viewportHeight = window.innerHeight;
                            return -(listHeight - viewportHeight * 0.4);
                        },
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            scrub: 1.0, // Brisk foreground scrub
                            start: 'top top',
                            end: 'bottom top',
                        }
                    }
                );
            }

            // Kinetic left vertical strip scrolling animation (Background - Slower)
            if (verticalListBgRef.current) {
                gsap.fromTo(verticalListBgRef.current,
                    { y: "5vh" },
                    {
                        y: () => {
                            const listHeight = verticalListBgRef.current.scrollHeight;
                            const viewportHeight = window.innerHeight;
                            return -(listHeight - viewportHeight * 0.6); // Slower travel
                        },
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            scrub: 1.8, // Slower background scrub
                            start: 'top top',
                            end: 'bottom top',
                        }
                    }
                );
            }

            // Kinetic right vertical strip scrolling animation (Foreground - Faster)
            if (verticalListRightFgRef.current) {
                gsap.fromTo(verticalListRightFgRef.current,
                    { y: "15vh" },
                    {
                        y: () => {
                            const listHeight = verticalListRightFgRef.current.scrollHeight;
                            const viewportHeight = window.innerHeight;
                            return -(listHeight - viewportHeight * 0.4);
                        },
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            scrub: 1.0, // Brisk foreground scrub
                            start: 'top top',
                            end: 'bottom top',
                        }
                    }
                );
            }

            // Kinetic right vertical strip scrolling animation (Background - Slower)
            if (verticalListRightBgRef.current) {
                gsap.fromTo(verticalListRightBgRef.current,
                    { y: "5vh" },
                    {
                        y: () => {
                            const listHeight = verticalListRightBgRef.current.scrollHeight;
                            const viewportHeight = window.innerHeight;
                            return -(listHeight - viewportHeight * 0.6); // Slower travel
                        },
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            scrub: 1.8, // Slower background scrub
                            start: 'top top',
                            end: 'bottom top',
                        }
                    }
                );
            }
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
                        <div ref={gridRef} className="hero-top-layer hero-top-grid">
                            <GridSignalCanvas />
                        </div>

                        {/* LAYER 4: Atmospheric glow orb (behind text) */}
                        <div ref={glowOrbRef} className="hero-top-layer hero-top-orb" />

                        {/* Kinetic Left Vertical Text Strip (Foreground depth 40px) */}
                        <div ref={verticalWrapFgRef} className="hero-vertical-strip-wrap fg">
                            <div ref={verticalListFgRef} className="hero-vertical-strip-list">
                                {loopedFgItems.map((item, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (fgItemRefs.current[index] = el)}
                                        className="hero-vertical-strip-item"
                                    >
                                        <span className="hvs-text" data-text={item}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kinetic Left Vertical Text Strip (Background depth 10px + blur) */}
                        <div ref={verticalWrapBgRef} className="hero-vertical-strip-wrap bg">
                            <div ref={verticalListBgRef} className="hero-vertical-strip-list">
                                {loopedBgItems.map((item, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (bgItemRefs.current[index] = el)}
                                        className="hero-vertical-strip-item"
                                    >
                                        <span className="hvs-text" data-text={item}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kinetic Right Vertical Text Strip (Foreground depth 40px) */}
                        <div ref={verticalWrapRightFgRef} className="hero-vertical-strip-wrap right fg">
                            <div ref={verticalListRightFgRef} className="hero-vertical-strip-list">
                                {loopedRightFgItems.map((item, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (rightFgItemRefs.current[index] = el)}
                                        className="hero-vertical-strip-item"
                                    >
                                        <span className="hvs-text" data-text={item}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kinetic Right Vertical Text Strip (Background depth -60px + blur) */}
                        <div ref={verticalWrapRightBgRef} className="hero-vertical-strip-wrap right bg">
                            <div ref={verticalListRightBgRef} className="hero-vertical-strip-list">
                                {loopedRightBgItems.map((item, index) => (
                                    <div
                                        key={index}
                                        ref={(el) => (rightBgItemRefs.current[index] = el)}
                                        className="hero-vertical-strip-item"
                                    >
                                        <span className="hvs-text" data-text={item}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* LAYER 5: Glass Typography (foreground) */}
                        <div ref={textParallaxRef} className="hero-top-layer hero-top-title-parallax">
                            <div ref={textRef} className="hero-top-title-wrap">
                                <div className="hero-top-title-scaler">
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
                            </div>
                        </div>


                    </div>{/* end scene */}

                    {/* LAYER 6: Cursor light (outside scene so it doesn't rotate) */}
                    <div ref={cursorGlowRef} className="hero-top-cursor-glow" />

                    {/* LAYER 7: Info card (outside scene) */}
                    <div ref={cardRef} className="hero-top-card">
                        <div className="hero-top-profile-wrap">
                            <img src={profilePic} alt="Brahmanshu Verma" className="hero-top-profile-img" />
                            <div className="hero-top-profile-glow" />
                        </div>
                        <span className="hero-top-card-label">Brahmanshu Verma</span>
                        <p className="hero-top-card-role">Product Designer · UI/UX · Systems · 3D</p>
                    </div>

                </div>{/* end perspective */}
            </div>
        </section>
    );
};

export default HeroTop;
