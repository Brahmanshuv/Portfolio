import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';
import ImageModal from '../../components/ImageModal';

const CORA_METADATA = {
    id: 'cora',
    title: 'Cora',
    eyebrow: 'Cora · Retail Media Network',
    headline: 'Campaign decisions, with the context still attached.',
    supportingCopy: 'An AI-assisted campaign concept connecting the brief, the proposal, the people reviewing it, and the next decision after launch.',
    slug: 'cora',
    role: 'Product Designer',
    format: 'Product-design case study and prototype',
    scope: 'Briefing, proposal review, approval, launch and monitoring',
    domain: 'Retail Media Network · AI Concept',
    status: 'Case Study',
    tags: ['Retail Media', 'Workflow Architecture', 'Enterprise UX', 'Campaign Planning'],
    pageTitle: 'Cora · Retail Media Network — Product Design Case Study | Brahmanshu Verma',
    metaDescription: 'An AI-assisted campaign concept connecting the brief, the proposal, the people reviewing it, and the next decision after launch.'
};

const CORA_NAV_ITEMS = [
    { id: 'overview', label: '01 Overview', targetId: 'cora-overview' },
    { id: 'workflow', label: '02 People & workflow', targetId: 'cora-workflow' },
    { id: 'brief', label: '03 Brief', targetId: 'cora-brief' },
    { id: 'proposal', label: '04 Proposal', targetId: 'cora-proposal' },
    { id: 'review', label: '05 Review & launch', targetId: 'cora-review' },
    { id: 'monitoring', label: '06 Monitoring', targetId: 'cora-monitoring' },
    { id: 'reflection', label: '07 Reflection', targetId: 'cora-reflection' }
];

export default function CoraPage() {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [activeSec, setActiveSec] = useState('overview');
    const [modalImg, setModalImg] = useState({ isOpen: false, src: '', alt: '', caption: '' });

    // Hero showcase video state
    const [isHeroPlaying, setIsHeroPlaying] = useState(false);
    const [showFilmSummary, setShowFilmSummary] = useState(false);
    const [heroVideoError, setHeroVideoError] = useState(false);
    const heroVideoRef = useRef(null);

    // Optional video disclosures state
    const [expandedDisclosures, setExpandedDisclosures] = useState({});

    // Pause all other videos when any video plays
    const handleVideoPlay = useCallback((e) => {
        const currentVideo = e.currentTarget;
        document.querySelectorAll('video').forEach((v) => {
            if (v !== currentVideo && !v.paused) {
                v.pause();
            }
        });
    }, []);

    const toggleDisclosure = (id) => {
        setExpandedDisclosures(prev => {
            const nextState = !prev[id];
            if (!nextState) {
                const el = document.getElementById(`video-${id}`);
                if (el && !el.paused) el.pause();
            }
            return { ...prev, [id]: nextState };
        });
    };

    const handleHeroPlay = () => {
        setHeroVideoError(false);
        setIsHeroPlaying(true);
        setTimeout(() => {
            if (heroVideoRef.current) {
                document.querySelectorAll('video').forEach((v) => {
                    if (v !== heroVideoRef.current && !v.paused) v.pause();
                });
                heroVideoRef.current.play().catch(() => {
                    setHeroVideoError(true);
                });
            }
        }, 50);
    };

    useEffect(() => {
        document.title = CORA_METADATA.pageTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', CORA_METADATA.metaDescription);
        }
        window.scrollTo(0, 0);
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, []);

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = CORA_NAV_ITEMS.map(item => ({
                id: item.id,
                el: document.getElementById(item.targetId)
            }));

            let current = 'overview';
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160) {
                current = 'reflection';
            } else {
                sections.forEach(sec => {
                    if (sec.el) {
                        const rect = sec.el.getBoundingClientRect();
                        if (rect.top <= 140) {
                            current = sec.id;
                        }
                    }
                });
            }
            setActiveSec(current);
        };

        window.addEventListener('scroll', handleScrollSpy, { passive: true });
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    const scrollToSection = (targetId) => {
        const el = document.getElementById(targetId);
        if (el) {
            if (window.lenis) {
                window.lenis.scrollTo(el, { offset: -88 });
            } else {
                const y = el.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 24, scale: 0.99 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            className="project-detail-layout"
            initial="hidden"
            animate="visible"
            style={{
                minHeight: '100vh',
                color: '#fff',
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* STICKY TOP NAVIGATION BAR */}
            <header className="project-top-header" role="banner">
                <div className="project-top-header-inner">
                    <button
                        type="button"
                        onClick={() => navigateTo('/#work')}
                        onMouseEnter={() => setIsBackHovered(true)}
                        onMouseLeave={() => setIsBackHovered(false)}
                        className="project-detail-back-btn"
                        aria-label="Back to projects list"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: isBackHovered ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 220ms ease',
                            padding: 0,
                            outline: 'none'
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                transform: isBackHovered ? 'translateX(-4px)' : 'translateX(0px)',
                                transition: 'transform 220ms ease'
                            }}
                        >
                            ←
                        </span>
                        Projects
                    </button>

                    {/* NEXT PROJECT BUTTON */}
                    <div
                        className="next-project-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            position: 'relative'
                        }}
                        onMouseEnter={() => setIsNextHovered(true)}
                        onMouseLeave={() => setIsNextHovered(false)}
                    >
                        <button
                            type="button"
                            onClick={() => navigateTo('/projects/staple')}
                            className="project-detail-next-btn"
                            aria-label="Navigate to next project: Staple"
                            style={{
                                background: isNextHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${isNextHovered ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.08)'}`,
                                backdropFilter: 'blur(6px)',
                                WebkitBackdropFilter: 'blur(6px)',
                                color: isNextHovered ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '0.06em',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 18px',
                                borderRadius: '100px',
                                transition: 'all 220ms ease',
                                outline: 'none'
                            }}
                        >
                            NEXT PROJECT
                            <span
                                style={{
                                    display: 'inline-block',
                                    transform: isNextHovered ? 'translateX(4px)' : 'translateX(0px)',
                                    transition: 'transform 220ms ease'
                                }}
                            >
                                →
                            </span>
                        </button>

                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: '8px',
                                opacity: isNextHovered ? 0.7 : 0,
                                transform: isNextHovered ? 'translateY(0px)' : 'translateY(-4px)',
                                transition: 'all 220ms ease',
                                fontSize: '11px',
                                color: '#fff',
                                letterSpacing: '0.04em',
                                marginTop: '6px',
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap',
                                textAlign: 'right'
                            }}
                        >
                            Next: <span style={{ fontWeight: 600 }}>Staple</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN WIDE GRID CONTAINER */}
            <div className="project-grid-container" style={{ marginTop: '24px' }}>
                <div className="project-main-grid">

                    {/* LEFT COLUMN: Sticky Navigation & Verified Metadata */}
                    <aside className="project-left-col" aria-label="Project details and table of contents">
                        <div className="project-sticky-sidebar">

                            {/* Verified Metadata Block */}
                            <motion.div variants={elementVariants} className="project-meta-col">
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                        Role
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                        {CORA_METADATA.role}
                                    </span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                        Format
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, lineHeight: 1.4, display: 'block' }}>
                                        {CORA_METADATA.format}
                                    </span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                        Scope
                                    </span>
                                    <span style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 400, lineHeight: 1.5, display: 'block' }}>
                                        {CORA_METADATA.scope}
                                    </span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                                        Domain
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                        {CORA_METADATA.domain}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                                    {CORA_METADATA.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: '11px',
                                                backgroundColor: 'rgba(139, 92, 246, 0.08)',
                                                border: '1px solid rgba(139, 92, 246, 0.22)',
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                color: 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Sticky Chapter Progress Navigation */}
                            <motion.div className="project-nav-wrapper" variants={elementVariants}>
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={CORA_NAV_ITEMS} />
                            </motion.div>

                        </div>
                    </aside>

                    {/* RIGHT COLUMN: Editorial Narrative & Curated Product Evidence */}
                    <main className="project-right-col" role="main">

                        {/* SECTION A: OVERVIEW & HERO SHOWCASE */}
                        <section id="cora-overview" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <motion.div variants={elementVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <span style={{
                                    fontFamily: 'Fira Code, monospace',
                                    fontSize: '12px',
                                    color: '#8B5CF6',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    fontWeight: 600
                                }}>
                                    {CORA_METADATA.eyebrow}
                                </span>
                                <h1
                                    style={{
                                        fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
                                        fontWeight: 400,
                                        lineHeight: 1.12,
                                        letterSpacing: '-0.03em',
                                        margin: 0,
                                        background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.78) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {CORA_METADATA.headline}
                                </h1>
                                <p
                                    className="cs-prose"
                                    style={{
                                        fontSize: 'clamp(1.05rem, 1.7vw, 1.22rem)',
                                        lineHeight: 1.6,
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        margin: 0
                                    }}
                                >
                                    {CORA_METADATA.supportingCopy}
                                </p>
                            </motion.div>

                            {/* HERO MEDIA: 60-SECOND PRODUCT SHOWCASE FILM */}
                            <motion.div variants={elementVariants} className="cs-media-card" style={{ marginTop: '8px' }}>
                                <div className="cs-video-aspect-box">
                                    {!isHeroPlaying ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <img
                                                src="/assets/CORA/Cora_Showcase_Poster.jpg"
                                                alt="Cora Retail Media Network product showcase poster preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleHeroPlay}
                                                className="cs-hero-play-btn"
                                                aria-label="Play 60-second Cora product showcase film"
                                            >
                                                <span aria-hidden="true" style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#8B5CF6',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    fontSize: '11px',
                                                    paddingLeft: '2px'
                                                }}>
                                                    ▶
                                                </span>
                                                <span>Watch Cora · 60 seconds</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <video
                                            ref={heroVideoRef}
                                            controls
                                            playsInline
                                            preload="auto"
                                            onPlay={handleVideoPlay}
                                            poster="/assets/CORA/Cora_Showcase_Poster.jpg"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        >
                                            <source src="/assets/CORA/Cora_Product_Showcase_1440p60.mp4" type="video/mp4" />
                                            Your browser does not support HTML5 video playback.
                                        </video>
                                    )}

                                    {heroVideoError && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '20px',
                                            right: '20px',
                                            padding: '12px 16px',
                                            background: 'rgba(239, 68, 68, 0.9)',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            color: '#fff',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span>Playback could not be started automatically. You can inspect the video controls above or download the showcase directly.</span>
                                            <button
                                                type="button"
                                                onClick={handleHeroPlay}
                                                style={{ background: '#fff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="cs-media-caption">
                                    <span className="cs-media-caption-text">
                                        60-second product film · Original prototype footage · Sample data
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowFilmSummary(!showFilmSummary)}
                                        aria-expanded={showFilmSummary}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#8B5CF6',
                                            fontSize: '12.5px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '4px 8px',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        <span>{showFilmSummary ? 'Hide sequence' : 'Film summary'}</span>
                                        <span>{showFilmSummary ? '▲' : '▼'}</span>
                                    </button>
                                </div>

                                {showFilmSummary && (
                                    <div style={{
                                        padding: '16px 24px',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                        fontSize: '13.5px',
                                        lineHeight: 1.6,
                                        color: 'rgba(255, 255, 255, 0.75)'
                                    }}>
                                        <p style={{ margin: '0 0 8px 0', color: '#fff', fontWeight: 500 }}>Film sequence walkthrough:</p>
                                        <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <li><strong>Source Grounding:</strong> Ingesting campaign briefs, verifying extracted brand parameters, and linking back to original files.</li>
                                            <li><strong>Proposal Generation:</strong> Synthesizing audience segments, multi-channel budget allocations, and estimated KPIs.</li>
                                            <li><strong>Interactive Audience Adjustment:</strong> Refining lookalike similarity parameters, committing the update, and triggering budget review.</li>
                                            <li><strong>Review & Sign-Off:</strong> Leaving contextual comments on proposal line items, completing staged approvals, and triggering campaign launch.</li>
                                            <li><strong>Live Monitoring:</strong> Inspecting active telemetry and grouped diagnostic insights across performance and growth opportunities.</li>
                                        </ol>
                                    </div>
                                )}
                            </motion.div>

                            {/* CORE PROBLEM STATEMENT */}
                            <motion.div variants={elementVariants} style={{ marginTop: '12px' }}>
                                <div className="cs-takeaway" style={{ borderLeftColor: '#8B5CF6' }}>
                                    <span className="cs-takeaway-label" style={{ color: '#8B5CF6' }}>THE CORE PROBLEM</span>
                                    <p className="cs-takeaway-text" style={{ fontStyle: 'normal' }}>
                                        “A campaign is more than a brief. It brings together an audience, a budget, creative work and a go-ahead. Cora explores how those pieces can stay connected while different people review the proposal.”
                                    </p>
                                </div>
                            </motion.div>
                        </section>

                        {/* SECTION B: PEOPLE & WORKFLOW */}
                        <section id="cora-workflow" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    02 / PEOPLE & WORKFLOW
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    Two roles. Different pressures. One campaign.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    Retail media campaigns require coordinated decisions between planning strategy and practical execution. Documented persona artifacts establish two core perspectives:
                                </p>
                            </motion.div>

                            {/* TWO ROLE CARDS */}
                            <motion.div variants={elementVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                {/* Role 1: Strategy */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.07)',
                                    borderRadius: '18px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                                            ROLE 01 · STRATEGY PERSPECTIVE
                                        </span>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', margin: '8px 0 4px 0' }}>
                                            Marketing Strategy Manager
                                        </h3>
                                        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', display: 'block', marginBottom: '12px' }}>
                                            Documented persona: Ethan Walker
                                        </span>
                                        <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.72)', margin: 0 }}>
                                            Responsible for connecting campaign decisions with campaign goals. Needs to verify that audience targeting, channel splits, and estimated KPIs align with brand growth objectives.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/12.jpeg',
                                            alt: 'Marketing Strategy Manager persona artifact (Ethan Walker)',
                                            caption: 'Documented persona artifact · Marketing Strategy Manager (Ethan Walker). Focuses on campaign objectives, budget alignment, and decision context.'
                                        })}
                                        style={{
                                            alignSelf: 'flex-start',
                                            background: 'rgba(139, 92, 246, 0.08)',
                                            border: '1px solid rgba(139, 92, 246, 0.22)',
                                            borderRadius: '100px',
                                            padding: '8px 16px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        <span>⤢ Inspect Ethan Walker slide</span>
                                    </button>
                                </div>

                                {/* Role 2: Execution */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.07)',
                                    borderRadius: '18px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                                            ROLE 02 · EXECUTION PERSPECTIVE
                                        </span>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', margin: '8px 0 4px 0' }}>
                                            Ad Operations Specialist
                                        </h3>
                                        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', display: 'block', marginBottom: '12px' }}>
                                            Documented persona: Simon Brooks
                                        </span>
                                        <p style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.72)', margin: 0 }}>
                                            Manages the practical work of preparing, reviewing, and operating campaigns. Focuses on line-item parameters, asset scheduling, approval workflows, and delivery troubleshooting.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/11.jpeg',
                                            alt: 'Ad Operations Specialist persona artifact (Simon Brooks)',
                                            caption: 'Documented persona artifact · Ad Operations Specialist (Simon Brooks). Focuses on line-item configuration, approval routing, and flight operations.'
                                        })}
                                        style={{
                                            alignSelf: 'flex-start',
                                            background: 'rgba(139, 92, 246, 0.08)',
                                            border: '1px solid rgba(139, 92, 246, 0.22)',
                                            borderRadius: '100px',
                                            padding: '8px 16px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        <span>⤢ Inspect Simon Brooks slide</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* WORKFLOW EVIDENCE: DOCUMENTED VS PROPOSED ASSISTED WORKFLOW */}
                            <motion.div variants={elementVariants} style={{
                                background: 'rgba(255, 255, 255, 0.018)',
                                border: '1px solid rgba(255, 255, 255, 0.07)',
                                borderRadius: '20px',
                                padding: '28px',
                                marginTop: '8px'
                            }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#fff', margin: '0 0 8px 0' }}>
                                    Workflow Architecture Comparison
                                </h3>
                                <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: '0 0 24px 0' }}>
                                    Comparing the documented multi-tool campaign handoff against the proposed assisted workflow model. Checkpoints at brief confirmation, review feedback, approval, and launch preserve human judgment throughout.
                                </p>

                                <div className="cs-workflow-grid">
                                    {/* Documented Workflow */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '14px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: '16px'
                                    }}>
                                        <div>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                                                DOCUMENTED WORKFLOW (OBSERVED PRACTICE)
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {[
                                                    'Manual synthesis: Planner parses fragmented RFP spreadsheets and CRM data',
                                                    'Manual budget division across siloed ad platforms and line items',
                                                    'Feedback loops split across asynchronous email chains and chat tools',
                                                    'Staged approval tracking requires manual follow-ups without consolidated context',
                                                    'Post-launch pacing and ad fatigue monitored reactively across separate dashboards'
                                                ].map((step, idx) => (
                                                    <li key={idx} style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', display: 'flex', gap: '8px' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Fira Code, monospace' }}>0{idx + 1}.</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setModalImg({
                                                isOpen: true,
                                                src: '/assets/CORA/15.jpeg',
                                                alt: 'Original documented workflow journey board',
                                                caption: 'Original artifact · Documented workflow board detailing data ingestion, manual budget division, asynchronous review loops, and reactive post-launch monitoring.'
                                            })}
                                            style={{
                                                alignSelf: 'flex-start',
                                                background: 'transparent',
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                borderRadius: '100px',
                                                padding: '7px 14px',
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '11.5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ⤢ Inspect original documented board
                                        </button>
                                    </div>

                                    {/* Proposed Assisted Workflow */}
                                    <div style={{
                                        background: 'rgba(139, 92, 246, 0.035)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: '14px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: '16px'
                                    }}>
                                        <div>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                PROPOSED ASSISTED WORKFLOW (DESIGN CONCEPT)
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {[
                                                    'Structured intake: Extracts brief parameters while linking directly to source citations',
                                                    'Checkpoint 1: Human confirmation gate before triggering media plan generation',
                                                    'Contextual proposal: AI synthesizes allocation, line items, and editable audience sliders',
                                                    'Checkpoint 2: In-line comment threads and multi-tier approval sign-offs attached to proposal',
                                                    'Checkpoint 3: Explicit launch commitment followed by grouped telemetry inspection'
                                                ].map((step, idx) => (
                                                    <li key={idx} style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.88)', display: 'flex', gap: '8px' }}>
                                                        <span style={{ color: '#8B5CF6', fontFamily: 'Fira Code, monospace', fontWeight: 600 }}>0{idx + 1}.</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setModalImg({
                                                isOpen: true,
                                                src: '/assets/CORA/14.jpeg',
                                                alt: 'Original proposed assisted workflow architecture board',
                                                caption: 'Original artifact · Proposed assisted workflow board highlighting brief confirmation, automated proposal generation, review checkpoints, and grouped telemetry.'
                                            })}
                                            style={{
                                                alignSelf: 'flex-start',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                borderRadius: '100px',
                                                padding: '7px 14px',
                                                color: '#fff',
                                                fontSize: '11.5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ⤢ Inspect proposed assisted board
                                        </button>
                                    </div>
                                </div>

                                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', fontStyle: 'italic', display: 'block', marginTop: '8px' }}>
                                    Note: Checkpoints indicate proposed design intent and review handoffs, not a proven operational benchmark.
                                </span>
                            </motion.div>
                        </section>

                        {/* SECTION C: BRIEF */}
                        <section id="cora-brief" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    03 / BRIEF
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    Check the brief before it becomes a plan.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    “The prototype presents the extracted brand, product, dates, budget and goal alongside source references. The next action stays explicit: modify the brief or continue into proposal generation.”
                                </p>
                            </motion.div>

                            {/* SOURCE-CONFIRMATION STILL */}
                            <motion.div variants={elementVariants} className="cs-media-card">
                                <button
                                    type="button"
                                    className="cs-zoom-trigger"
                                    onClick={() => setModalImg({
                                        isOpen: true,
                                        src: '/assets/CORA/cora-brief-confirmation.jpg',
                                        alt: 'Cora Brief Extraction and Source Confirmation Screen',
                                        caption: 'Source-confirmation still · Extracted parameters (Unilever, Dove Men+, $50,000 budget, flight dates, campaign goal) shown with verified source document links and explicit "Looks Good / Modify" action controls.'
                                    })}
                                    aria-label="Inspect brief confirmation still in full resolution"
                                >
                                    <span className="cs-zoom-badge">⤢ Inspect Full Size</span>
                                    <img
                                        src="/assets/CORA/cora-brief-confirmation.jpg"
                                        alt="Cora Brief Extraction and Source Confirmation Screen"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </button>
                                <div className="cs-media-caption">
                                    <span className="cs-media-caption-text">
                                        Source-confirmation still · Verified parameters alongside original document citations (BRD.xlsx, Brand guidelines, Advertiser CRM).
                                    </span>
                                    <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>
                                        CONFIRMATION GATE
                                    </span>
                                </div>
                            </motion.div>

                            {/* SUPPORTING ARTIFACTS: DETAIL CROP & GENERATION CHECKLIST */}
                            <motion.div variants={elementVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                                {/* Genuine Detail Crop */}
                                <div className="cs-detail-crop-card">
                                    <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                            DETAIL CROP · SOURCE CITATIONS & ACTIONS
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Genuine Crop</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="cs-zoom-trigger"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/cora-brief-crop.jpg',
                                            alt: 'Detail crop of source references and action controls',
                                            caption: 'Detail crop · Source links (Business Requirement Document.xlsx, Brand guidelines, Advertiser CRM) and explicit action controls.'
                                        })}
                                        aria-label="Inspect detail crop"
                                    >
                                        <img
                                            src="/assets/CORA/cora-brief-crop.jpg"
                                            alt="Detail crop of source references and action controls"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </button>
                                    <div className="cs-detail-crop-body">
                                        <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.55, margin: 0 }}>
                                            Grounding in cited sources: Planners can inspect extracted goals against source files before committing to proposal generation.
                                        </p>
                                    </div>
                                </div>

                                {/* Supporting State: Generation Checklist */}
                                <div className="cs-detail-crop-card">
                                    <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                            SUPPORTING STATE · GENERATION CHECKLIST
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Artifact</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="cs-zoom-trigger"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/17.jpeg',
                                            alt: 'Generation checklist supporting state',
                                            caption: 'Generation checklist · Step-by-step extraction status displaying parsing of data sources, trend analysis, audience targeting, and budget allocation.'
                                        })}
                                        aria-label="Inspect generation checklist artifact"
                                    >
                                        <img
                                            src="/assets/CORA/17.jpeg"
                                            alt="Generation checklist supporting state"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </button>
                                    <div className="cs-detail-crop-body">
                                        <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.55, margin: 0 }}>
                                            Visible synthesis steps: Shows real-time progress across data extraction, audience segment matching, and budget allocation.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* OPTIONAL DISCLOSURE: BRIEFING FLOW RECORDING */}
                            <motion.div variants={elementVariants} className="cs-disclosure-card">
                                <button
                                    type="button"
                                    onClick={() => toggleDisclosure('brief')}
                                    className="cs-disclosure-trigger"
                                    aria-expanded={Boolean(expandedDisclosures['brief'])}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#8B5CF6' }}>▶</span>
                                        <strong>Optional walkthrough:</strong> Watch the briefing flow (21s)
                                    </span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                        {expandedDisclosures['brief'] ? 'Close walkthrough ▲' : 'Expand walkthrough ▼'}
                                    </span>
                                </button>

                                {expandedDisclosures['brief'] && (
                                    <div className="cs-disclosure-content" style={{ paddingTop: '16px' }}>
                                        <div className="cs-video-aspect-box">
                                            <video
                                                id="video-brief"
                                                controls
                                                playsInline
                                                preload="metadata"
                                                onPlay={handleVideoPlay}
                                                poster="/assets/CORA/posters/video-1-poster.jpg"
                                            >
                                                <source src="/assets/CORA/1.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                            Recorded prototype walkthrough · Brief ingestion, source reference confirmation, and parameter generation (20.88s).
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </section>

                        {/* SECTION D: PROPOSAL */}
                        <section id="cora-proposal" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    04 / PROPOSAL
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    A recommendation you can inspect—and change.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    “The proposal brings together audience details, budget allocation and estimated KPIs. The audience-editing flow lets a planner change lookalike similarity, save that change and continue into budget review. Rationale provides additional context for inspecting the recommendation.”
                                </p>
                            </motion.div>

                            {/* ACTUAL MAIN BUDGET-PROPOSAL SCREEN (19.jpeg) */}
                            <motion.div variants={elementVariants} className="cs-media-card">
                                <button
                                    type="button"
                                    className="cs-zoom-trigger"
                                    onClick={() => setModalImg({
                                        isOpen: true,
                                        src: '/assets/CORA/19.jpeg',
                                        alt: 'Cora Main Budget Proposal Screen',
                                        caption: 'Main budget proposal screen · Baseline multi-channel breakdown (Video ads 20%, Sponsored products 60%, Brand 20%), estimated KPIs (+2M impressions, +15% conversions, 2.4% CTR, 3x ROAS), cited document sources, and proposal controls ("Continue to submit", "Download proposal").'
                                    })}
                                    aria-label="Inspect main budget proposal screen in full resolution"
                                >
                                    <span className="cs-zoom-badge">⤢ Inspect Full Size</span>
                                    <img
                                        src="/assets/CORA/19.jpeg"
                                        alt="Cora Main Budget Proposal Screen"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </button>
                                <div className="cs-media-caption">
                                    <span className="cs-media-caption-text">
                                        Main budget proposal screen · Multi-channel investment chart, estimated KPI table, source references, and proposal controls.
                                    </span>
                                    <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>
                                        BUDGET PROPOSAL
                                    </span>
                                </div>
                            </motion.div>

                            {/* PROMINENT DEMO 1: AUDIENCE ADJUSTMENT & SAVE (3.mp4) */}
                            <motion.div variants={elementVariants}>
                                <div style={{ marginBottom: '14px' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                                        PROMINENT INTERACTION DEMO 01 · AUDIENCE ADJUSTMENT
                                    </span>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', margin: 0 }}>
                                        Lookalike audience similarity adjustment & parameter commit
                                    </h3>
                                </div>

                                <div className="cs-media-card">
                                    <div className="cs-video-aspect-box">
                                        <video
                                            controls
                                            playsInline
                                            preload="metadata"
                                            onPlay={handleVideoPlay}
                                            poster="/assets/CORA/posters/video-3-poster.jpg"
                                        >
                                            <source src="/assets/CORA/3.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="cs-media-caption">
                                        <span className="cs-media-caption-text">
                                            Recorded prototype walkthrough · Lookalike audience similarity adjustment, parameter saving, and subsequent budget review (23.47s).
                                        </span>
                                        <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>
                                            DEMO 01 · 23s
                                        </span>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '14px',
                                    padding: '18px 22px',
                                    marginTop: '12px'
                                }}>
                                    <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 8px 0' }}>
                                        <strong>Interaction breakdown:</strong> The planner inspects the Look-Alike Audience segment, adjusts similarity percentage (e.g. from 100% to 80% to expand reachable volume), and clicks <em>Save</em>. The interface commits the change and immediately triggers a contextual notification informing the user that budget parameters have been updated accordingly, offering a direct <em>Review</em> action.
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', margin: 0, fontStyle: 'italic' }}>
                                        Clarification: Audience similarity percentage represents a segmentation match threshold, not an AI confidence score.
                                    </p>
                                </div>
                            </motion.div>

                            {/* OPTIONAL SUPPORTING VIEWS (2.mp4, 4.mp4, 20.jpeg) */}
                            <motion.div variants={elementVariants} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {/* Optional Tour Video (2.mp4) */}
                                <div className="cs-disclosure-card">
                                    <button
                                        type="button"
                                        onClick={() => toggleDisclosure('tour')}
                                        className="cs-disclosure-trigger"
                                        aria-expanded={Boolean(expandedDisclosures['tour'])}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#8B5CF6' }}>▶</span>
                                            <strong>Optional walkthrough:</strong> Watch the generated proposal tour (57s)
                                        </span>
                                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                            {expandedDisclosures['tour'] ? 'Close walkthrough ▲' : 'Expand walkthrough ▼'}
                                        </span>
                                    </button>

                                    {expandedDisclosures['tour'] && (
                                        <div className="cs-disclosure-content" style={{ paddingTop: '16px' }}>
                                            <div className="cs-video-aspect-box">
                                                <video
                                                    id="video-tour"
                                                    controls
                                                    playsInline
                                                    preload="metadata"
                                                    onPlay={handleVideoPlay}
                                                    poster="/assets/CORA/posters/video-2-poster.jpg"
                                                >
                                                    <source src="/assets/CORA/2.mp4" type="video/mp4" />
                                                </video>
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                                Recorded prototype walkthrough · Full tour of generated proposal: creative assets, target audience details, and baseline budget allocation (56.90s).
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Optional Expanded Rationale Video (4.mp4) */}
                                <div className="cs-disclosure-card">
                                    <button
                                        type="button"
                                        onClick={() => toggleDisclosure('rationale')}
                                        className="cs-disclosure-trigger"
                                        aria-expanded={Boolean(expandedDisclosures['rationale'])}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#8B5CF6' }}>▶</span>
                                            <strong>Optional walkthrough:</strong> Watch budget review & expanded rationale (32s)
                                        </span>
                                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                            {expandedDisclosures['rationale'] ? 'Close walkthrough ▲' : 'Expand walkthrough ▼'}
                                        </span>
                                    </button>

                                    {expandedDisclosures['rationale'] && (
                                        <div className="cs-disclosure-content" style={{ paddingTop: '16px' }}>
                                            <div className="cs-video-aspect-box">
                                                <video
                                                    id="video-rationale"
                                                    controls
                                                    playsInline
                                                    preload="metadata"
                                                    onPlay={handleVideoPlay}
                                                    poster="/assets/CORA/posters/video-4-poster.jpg"
                                                >
                                                    <source src="/assets/CORA/4.mp4" type="video/mp4" />
                                                </video>
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                                Recorded prototype walkthrough · Audience-change budget update and expanded channel rationale (31.96s).
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Optional Supporting Artifact: Enhanced Rationale (20.jpeg) */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '14px',
                                    padding: '16px 20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '16px',
                                    flexWrap: 'wrap'
                                }}>
                                    <div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500, display: 'block' }}>
                                            Supporting screen: Enhanced allocation & placement rationale
                                        </span>
                                        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>
                                            Sample prototype content · Note: Numerical figures ($125K total beside $60K + $140K breakdown) represent prototype demonstration data.
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/20.jpeg',
                                            alt: 'Enhanced allocation and rationale screen (sample prototype content)',
                                            caption: 'Sample prototype content · Detailed view showing mid-level allocation and channel rationale. Note: Numerical figures ($125K total beside $60K + $140K breakdown) represent demonstration prototype data, not production accounting.'
                                        })}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            borderRadius: '100px',
                                            padding: '6px 14px',
                                            color: '#fff',
                                            fontSize: '11.5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ⤢ Inspect supporting screen
                                    </button>
                                </div>
                            </motion.div>
                        </section>

                        {/* SECTION E: REVIEW & LAUNCH */}
                        <section id="cora-review" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    05 / REVIEW & LAUNCH
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    The next decision still belongs to a person.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    “A saved comment stays with the proposal, alongside the choice to approve or send it for rework. The demonstrated path continues to an approved proposal and an explicit launch action. The interface shows the handoff; the full approval policy still needs definition.”
                                </p>
                            </motion.div>

                            {/* PROMINENT DEMO 2: COMMENTS, APPROVAL & LAUNCH (6.mp4) */}
                            <motion.div variants={elementVariants}>
                                <div style={{ marginBottom: '14px' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                                        PROMINENT INTERACTION DEMO 02 · REVIEW TO LAUNCH
                                    </span>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', margin: 0 }}>
                                        Review feedback, staged sign-off, and launch confirmation
                                    </h3>
                                </div>

                                <div className="cs-media-card">
                                    <div className="cs-video-aspect-box">
                                        <video
                                            controls
                                            playsInline
                                            preload="metadata"
                                            onPlay={handleVideoPlay}
                                            poster="/assets/CORA/posters/video-6-poster.jpg"
                                        >
                                            <source src="/assets/CORA/6.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="cs-media-caption">
                                        <span className="cs-media-caption-text">
                                            Recorded prototype walkthrough · Adding review comments, multi-stakeholder sign-off, approved state, and final launch trigger (21.28s).
                                        </span>
                                        <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>
                                            DEMO 02 · 21s
                                        </span>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '14px',
                                    padding: '18px 22px',
                                    marginTop: '12px'
                                }}>
                                    <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 8px 0' }}>
                                        <strong>Demonstrated path:</strong> Reviewers leave structured notes directly within the proposal tabs (e.g. <em>“The overall direction looks good. Could you please increase the budget.”</em>). The saved feedback stays attached to the proposal record. Once stakeholder approvals are satisfied, the proposal switches to <em>Approved</em> status and reveals an explicit, human-committed <em>Launch campaign</em> trigger.
                                    </p>
                                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', margin: 0, fontStyle: 'italic' }}>
                                        Next-iteration question: The prototype demonstrates the review-to-launch handoff; comprehensive approval policy enforcement and the full rework/skip-approval branch remain open questions for future design iterations.
                                    </p>
                                </div>
                            </motion.div>

                            {/* OPTIONAL RECORDING: APPROVAL SUBMISSION (5.mp4) */}
                            <motion.div variants={elementVariants} className="cs-disclosure-card">
                                <button
                                    type="button"
                                    onClick={() => toggleDisclosure('approval')}
                                    className="cs-disclosure-trigger"
                                    aria-expanded={Boolean(expandedDisclosures['approval'])}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#8B5CF6' }}>▶</span>
                                        <strong>Optional walkthrough:</strong> Watch approval submission confirmation (7s)
                                    </span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                        {expandedDisclosures['approval'] ? 'Close walkthrough ▲' : 'Expand walkthrough ▼'}
                                    </span>
                                </button>

                                {expandedDisclosures['approval'] && (
                                    <div className="cs-disclosure-content" style={{ paddingTop: '16px' }}>
                                        <div className="cs-video-aspect-box">
                                            <video
                                                id="video-approval"
                                                controls
                                                playsInline
                                                preload="metadata"
                                                onPlay={handleVideoPlay}
                                                poster="/assets/CORA/posters/video-5-poster.jpg"
                                            >
                                                <source src="/assets/CORA/5.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                            Recorded prototype walkthrough · Pre-launch approval tier notification and confirmation (7.00s). This is not confidence scoring.
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </section>

                        {/* SECTION F: MONITORING */}
                        <section id="cora-monitoring" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    06 / MONITORING
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    Launch starts the next conversation.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    “My Campaigns groups the campaign overview with what is performing well, where improvement may be needed and where opportunities may exist. The concept gives someone a place to inspect the campaign and consider a next step.”
                                </p>
                            </motion.div>

                            {/* READABLE MONITORING STILLS: OVERVIEW & GROUPED INSIGHTS */}
                            <motion.div variants={elementVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                                {/* Campaign Summary Still */}
                                <div className="cs-detail-crop-card">
                                    <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                            CAMPAIGN SUMMARY STILL
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Telemetry</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="cs-zoom-trigger"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/cora-monitoring-summary.jpg',
                                            alt: 'Cora Active Campaign Performance Summary',
                                            caption: 'Campaign summary still · Aggregate telemetry (Impressions, Clicks, Conversions, Spend) and active campaign status list.'
                                        })}
                                        aria-label="Inspect campaign summary still"
                                    >
                                        <img
                                            src="/assets/CORA/cora-monitoring-summary.jpg"
                                            alt="Cora Active Campaign Performance Summary"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </button>
                                    <div className="cs-detail-crop-body">
                                        <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.55, margin: 0 }}>
                                            Structured campaign status: Consolidates active campaign pacing and delivery metrics in one scannable overview.
                                        </p>
                                    </div>
                                </div>

                                {/* Grouped Diagnostic Insights Still */}
                                <div className="cs-detail-crop-card">
                                    <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                            GROUPED INSIGHT STILL
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Diagnosis</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="cs-zoom-trigger"
                                        onClick={() => setModalImg({
                                            isOpen: true,
                                            src: '/assets/CORA/cora-monitoring-insights.jpg',
                                            alt: 'Cora Grouped Performance Diagnostic Insights',
                                            caption: 'Grouped insight still · Diagnostic cards categorizing "Areas for Improvement" (weekend spend, desktop bounce rate) and "Growth Opportunities" (lookalike expansion, video ad formats).'
                                        })}
                                        aria-label="Inspect grouped diagnostic insights still"
                                    >
                                        <img
                                            src="/assets/CORA/cora-monitoring-insights.jpg"
                                            alt="Cora Grouped Performance Diagnostic Insights"
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </button>
                                    <div className="cs-detail-crop-body">
                                        <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.55, margin: 0 }}>
                                            Diagnostic surfaces: Grouped cards highlight areas to inspect and discuss rather than unconfirmed automated budget shifts.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={elementVariants}>
                                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', fontStyle: 'italic', margin: 0 }}>
                                    Sample metrics (e.g. CTR, conversions, pacing) are illustrative demonstration data. Insights surface opportunities for human evaluation rather than unverified autonomous execution.
                                </p>
                            </motion.div>

                            {/* OPTIONAL MONITORING VIDEO (7.mp4) */}
                            <motion.div variants={elementVariants} className="cs-disclosure-card">
                                <button
                                    type="button"
                                    onClick={() => toggleDisclosure('monitoring')}
                                    className="cs-disclosure-trigger"
                                    aria-expanded={Boolean(expandedDisclosures['monitoring'])}
                                >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#8B5CF6' }}>▶</span>
                                        <strong>Optional walkthrough:</strong> Watch post-launch monitoring (26s)
                                    </span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                        {expandedDisclosures['monitoring'] ? 'Close walkthrough ▲' : 'Expand walkthrough ▼'}
                                    </span>
                                </button>

                                {expandedDisclosures['monitoring'] && (
                                    <div className="cs-disclosure-content" style={{ paddingTop: '16px' }}>
                                        <div className="cs-video-aspect-box">
                                            <video
                                                id="video-monitoring"
                                                controls
                                                playsInline
                                                preload="metadata"
                                                onPlay={handleVideoPlay}
                                                poster="/assets/CORA/posters/video-7-poster.jpg"
                                            >
                                                <source src="/assets/CORA/7.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                                            Recorded prototype walkthrough · Active campaign telemetry and grouped insight surfaces (26.29s).
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </section>

                        {/* SECTION G: REFLECTION */}
                        <section id="cora-reflection" className="cs-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
                            <motion.div variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                                    07 / REFLECTION
                                </span>
                                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                                    What the work shows. What still needs testing.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                    “The work demonstrates a connected interaction concept: source material becomes a proposal, a proposal becomes a review, and a launched campaign becomes something to inspect again. Its strongest evidence is the visible flow—source references, editable audience controls, comments and explicit next actions.”
                                </p>
                            </motion.div>

                            {/* FUTURE VALIDATION QUESTIONS */}
                            <motion.div variants={elementVariants} style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '18px',
                                padding: '28px'
                            }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                                    FUTURE VALIDATION QUESTIONS
                                </span>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                    {[
                                        {
                                            q: 'Can a planner confirm the extracted brief and identify its sources?',
                                            desc: 'Evaluate whether planners can verify extracted goals against source documents without needing to re-read original spreadsheets.'
                                        },
                                        {
                                            q: 'Can they understand an audience adjustment and its relationship to budget review?',
                                            desc: 'Test whether changing lookalike similarity makes the downstream budget reallocation impact intuitive and manageable.'
                                        },
                                        {
                                            q: 'Is it clear who needs to review the proposal and what approval permits?',
                                            desc: 'Investigate how different organizational tiers understand their specific signing boundaries and what actions require consensus.'
                                        },
                                        {
                                            q: 'Can they distinguish a monitoring insight from an action already taken?',
                                            desc: 'Ensure users clearly recognize diagnostic suggestions as items for human consideration rather than background system changes.'
                                        }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.015)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '14px',
                                                padding: '20px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '8px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#8B5CF6', fontWeight: 600 }}>
                                                    [0{i + 1}]
                                                </span>
                                                <h4 style={{ fontSize: '0.98rem', fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.4 }}>
                                                    {item.q}
                                                </h4>
                                            </div>
                                            <p style={{ fontSize: '0.88rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.6)', margin: 0, paddingLeft: '28px' }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </section>

                        {/* BOTTOM NAVIGATION FOOTER (INSIDE RIGHT COL TO PREVENT PREMATURE SIDEBAR COLLAPSE) */}
                        <footer className="project-footer-container" style={{ marginTop: '80px', paddingBottom: '60px', width: '100%' }}>
                            <div
                                style={{
                                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                    paddingTop: '36px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '16px'
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => navigateTo('/#work')}
                                    onMouseEnter={() => setIsBackHovered(true)}
                                    onMouseLeave={() => setIsBackHovered(false)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: isBackHovered ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 220ms ease',
                                        padding: 0,
                                        outline: 'none'
                                    }}
                                >
                                    <span>←</span> Back to Projects
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigateTo('/projects/staple')}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        backdropFilter: 'blur(10px)',
                                        color: '#fff',
                                        padding: '12px 24px',
                                        borderRadius: '100px',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 220ms ease'
                                    }}
                                >
                                    Next Project: <strong>Staple</strong> →
                                </button>
                            </div>
                        </footer>

                    </main>
                </div>
            </div>

            {/* FULL SIZE KEYBOARD-ACCESSIBLE IMAGE MODAL */}
            <ImageModal
                isOpen={modalImg.isOpen}
                src={modalImg.src}
                alt={modalImg.alt}
                caption={modalImg.caption}
                onClose={() => setModalImg({ ...modalImg, isOpen: false })}
            />
        </motion.div>
    );
}
