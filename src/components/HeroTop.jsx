import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePic from '../../assets/Profilepicture.jpeg';
import ShaderMarbleBackground from './ShaderMarbleBackground';

gsap.registerPlugin(ScrollTrigger);

const HeroTop = () => {
    const sectionRef = useRef(null);
    const sceneRef = useRef(null);
    const textRef = useRef(null);
    const textParallaxRef = useRef(null);
    const cardRef = useRef(null);

    // State hook to toggle project reveal card stack
    const [isProjectStackOpen, setIsProjectStackOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Project Peek Cards list
    const projectPeekCards = [
        {
            id: 'dream-holidays',
            badge: 'Case Study',
            title: 'Dream Holidays',
            category: 'Travel Product Design',
            link: '/projects/dream-holidays'
        },
        {
            id: '6s-marketers',
            badge: 'Dashboard',
            title: '6S Marketers',
            category: 'Client Dashboard',
            link: '#work' // TODO: Update to exact project page URL when available
        },
        {
            id: 'powertrace',
            badge: 'Product',
            title: 'Powertrace',
            category: 'Enterprise Dashboard System',
            link: '/projects/enterprise-dashboard'
        },
        {
            id: 'inverted-energy',
            badge: '3D',
            title: 'Inverted Energy',
            category: '3D Product Experience',
            link: '/projects/spatial-3d'
        },
        {
            id: 'redtape',
            badge: 'UX',
            title: 'Redtape',
            category: 'UX Research & Interface Design',
            link: '#work' // TODO: Update to exact project page URL when available
        }
    ];

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

            // Parallax — Foreground Glass Typography / Panel (moves slightly faster/closer)
            if (textParallaxRef.current) {
                textParallaxRef.current.style.transform =
                    `translateZ(120px) translate(${c.y * 1.6}px, ${c.x * 1.6}px)`;
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
                pointerEvents: 'auto',
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
                <ShaderMarbleBackground />

                {/* PERSPECTIVE WRAPPER — makes depth possible */}
                <div className="hero-top-perspective">

                    {/* 3D SCENE — rotates with cursor */}
                    <div ref={sceneRef} className="hero-top-scene">

                        {/* Centered Glass Typography & Panel */}
                        <div ref={textParallaxRef} className="hero-top-layer hero-top-title-parallax">
                            <div ref={textRef} className="hero-top-title-wrap">

                                {/* Hero Project Dock - Layered behind central glass panel */}
                                <div className={`hero-project-dock ${isProjectStackOpen ? 'is-open' : ''}`}>
                                    {/* 1. Left Outer Panel */}
                                    <div className="project-panel project-panel--left-outer">
                                        <div className="project-panel-inner">
                                            <span className="project-panel-label">Work Preview</span>
                                            <div className="project-panel-slab-detail">
                                                <span className="detail-line" />
                                                <span className="detail-line" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Left Inner Panel */}
                                    <div className="project-panel project-panel--left-inner">
                                        <div className="project-panel-inner">
                                            {/* Content Zone for Project 1: Dream Holidays */}
                                            <a href="/projects/dream-holidays" className="project-zone zone-1">
                                                <div className="project-zone-header">
                                                    <span className="project-zone-badge">Case Study</span>
                                                    <span className="project-zone-number">[01]</span>
                                                </div>
                                                <h3 className="project-zone-title">Dream Holidays</h3>
                                                <p className="project-zone-desc">Travel Product Design</p>
                                                <div className="project-zone-cta">
                                                    <span>View Project →</span>
                                                </div>
                                            </a>

                                            <div className="project-zone-divider" />

                                            {/* Content Zone for Project 2: 6S Marketers */}
                                            <a href="#work" className="project-zone zone-2">
                                                <div className="project-zone-header">
                                                    <span className="project-zone-badge">Dashboard</span>
                                                    <span className="project-zone-number">[02]</span>
                                                </div>
                                                <h3 className="project-zone-title">6S Marketers</h3>
                                                <p className="project-zone-desc">Client Dashboard</p>
                                                <div className="project-zone-cta">
                                                    <span>View Project →</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* 3. Right Inner Panel */}
                                    <div className="project-panel project-panel--right-inner">
                                        <div className="project-panel-inner">
                                            {/* Content Zone for Project 5: Redtape */}
                                            <a href="#work" className="project-zone zone-5">
                                                <div className="project-zone-header">
                                                    <span className="project-zone-badge">UX</span>
                                                    <span className="project-zone-number">[05]</span>
                                                </div>
                                                <h3 className="project-zone-title">Redtape</h3>
                                                <p className="project-zone-desc">UX Research & Interface Design</p>
                                                <div className="project-zone-cta">
                                                    <span>View Project →</span>
                                                </div>
                                            </a>

                                            <div className="project-zone-divider" />

                                            {/* Content Zone for Project 4: Inverted Energy */}
                                            <a href="/projects/spatial-3d" className="project-zone zone-4">
                                                <div className="project-zone-header">
                                                    <span className="project-zone-badge">3D</span>
                                                    <span className="project-zone-number">[04]</span>
                                                </div>
                                                <h3 className="project-zone-title">Inverted Energy</h3>
                                                <p className="project-zone-desc">3D Product Experience</p>
                                                <div className="project-zone-cta">
                                                    <span>View Project →</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* 4. Right Outer Panel */}
                                    <div className="project-panel project-panel--right-outer">
                                        <div className="project-panel-inner">
                                            <span className="project-panel-label">Archive Stack</span>
                                            <div className="project-panel-slab-detail">
                                                <span className="detail-line" />
                                                <span className="detail-line" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5. Bottom Horizontal Panel */}
                                    <div className="project-panel project-panel--bottom">
                                        <div className="project-panel-inner">
                                            <a href="/projects/enterprise-dashboard" className="project-zone project-zone--horizontal">
                                                <div className="horizontal-left">
                                                    <span className="project-zone-badge">Product</span>
                                                    <span className="project-zone-number">[03]</span>
                                                    <h3 className="project-zone-title">Powertrace</h3>
                                                    <span className="project-zone-separator">—</span>
                                                    <p className="project-zone-desc">Enterprise Dashboard System</p>
                                                </div>
                                                <div className="project-zone-cta">
                                                    <span>View Project →</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Central Glass Panel */}
                                <div className="hero-glass-panel">
                                    {/* Sculpted Bevel Edge Highlight */}
                                    <div className="hero-glass-bevel" />

                                    {/* Specular Curvature Sheen */}
                                    <div className="hero-glass-reflection" />

                                    {/* Animated Edge-Light Sweep */}
                                    <div className="hero-glass-sweep" />

                                    {/* Ambient inner glow behind headline */}
                                    <div className="hero-glass-glow" />

                                    <div className="hero-glass-content">
                                        {/* Eyebrow */}
                                        <span className="hero-eyebrow">PRODUCT DESIGNER · SYSTEMS THINKER</span>

                                        {/* Main Headline */}
                                        <h1 className={`hero-headline ${isScrolled ? 'is-scrolled' : ''}`}>
                                            <span className="hero-headline-sans">
                                                Everything's{" "}
                                                <span className="hero-word-swap-container slot-1">
                                                    <span className="hero-word-swap-item item-default">Intentional</span>
                                                    <span className="hero-word-swap-item item-scrolled font-serif-override">Silent</span>
                                                </span>
                                                .
                                            </span>
                                            <span className="hero-headline-serif">
                                                Even the{" "}
                                                <span className="hero-word-swap-container slot-2">
                                                    <span className="hero-word-swap-item item-default">Silence</span>
                                                    <span className="hero-word-swap-item item-scrolled font-sans-override">Intent</span>
                                                </span>
                                                .
                                            </span>
                                        </h1>

                                        {/* Spark/Axis Divider */}
                                        <div className="hero-spark-divider">
                                            <div className="hero-spark-line" />
                                            <svg className="hero-spark-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 0V12" stroke="currentColor" strokeWidth="0.5" />
                                                <path d="M0 6H12" stroke="currentColor" strokeWidth="0.5" />
                                                <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                                            </svg>
                                            <div className="hero-spark-line" />
                                        </div>

                                        {/* Supporting line */}
                                        <p className="hero-subtext">
                                            I design digital experiences, products, and systems with clarity, depth, and intention.
                                        </p>

                                        {/* Clickable reveal toggle button (scroll indicator shape) */}
                                        <button
                                            onClick={() => setIsProjectStackOpen(prev => !prev)}
                                            className={`hero-scroll-indicator ${isProjectStackOpen ? 'is-open' : ''}`}
                                            aria-expanded={isProjectStackOpen}
                                            aria-label="Toggle project preview cards"
                                        >
                                            <div className="hero-scroll-circle">
                                                <div className="hero-scroll-line" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>{/* end scene */}

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
