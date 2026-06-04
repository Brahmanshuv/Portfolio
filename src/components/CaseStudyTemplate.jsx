import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../utils/router';
import { projectsData } from '../data/projects';
import ProjectNav from './ProjectNav';

export default function CaseStudyTemplate({ metadata, content }) {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [activeParentSec, setActiveParentSec] = useState('overview');

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = [
                { id: 'overview', el: document.getElementById('overview-section') },
                { id: 'flow', el: document.getElementById('flow-section') },
                { id: 'approach', el: document.getElementById('approach-section') },
                { id: 'prototype', el: document.getElementById('prototype-section') },
                { id: 'result', el: document.getElementById('result-section') }
            ];

            let current = 'overview';

            // Check if we are near the bottom of the page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
                current = 'result';
            } else {
                sections.forEach(sec => {
                    if (sec.el) {
                        const rect = sec.el.getBoundingClientRect();
                        if (rect.top <= window.innerHeight * 0.4) {
                            current = sec.id;
                        }
                    }
                });
            }
            setActiveParentSec(current);
        };

        window.addEventListener('scroll', handleScrollSpy);
        return () => window.removeEventListener('scroll', handleScrollSpy);
    }, []);

    const scrollToSection = (targetId) => {
        const el = document.getElementById(targetId);
        if (el) {
            if (window.lenis) {
                window.lenis.scrollTo(el, { offset: -120 });
            } else {
                const y = el.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    // Calculate loop navigation parameters for Next Project
    const activeSlug = metadata.slug;
    const currentIndex = projectsData.findIndex(proj => proj.slug === activeSlug);
    const nextIndex = currentIndex !== -1 ? (currentIndex + 1) % projectsData.length : 0;
    const nextProject = projectsData[nextIndex];

    const c = content.sections;

    // Scroll to top automatically when loading
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [metadata.slug]);

    // Animation entry variants (ease-in-out case-study curves)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
            }
        }
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <motion.div
            className="project-detail-layout"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                minHeight: '100vh',
                color: '#fff',
                paddingTop: '120px',
                paddingBottom: '160px',
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* STICKY GLASS HEADER */}
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '24px 0',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: 'rgba(10, 10, 10, 0.6)',
                    zIndex: 100
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        onClick={() => navigateTo('/#projects')}
                        onMouseEnter={() => setIsBackHovered(true)}
                        onMouseLeave={() => setIsBackHovered(false)}
                        className="project-detail-back-btn"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: isBackHovered ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                            padding: 0,
                            outline: 'none'
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                transform: isBackHovered ? 'translateX(-4px)' : 'translateX(0px)',
                                transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            ←
                        </span>
                        Projects
                    </button>

                    {/* PREMIUM NEXT PROJECT HOVER SYSTEM */}
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
                            onClick={() => navigateTo(`/projects/${nextProject.slug}`)}
                            className="project-detail-next-btn"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                color: isNextHovered ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                                borderColor: isNextHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                backgroundColor: isNextHovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                                boxShadow: isNextHovered ? '0 4px 12px rgba(255, 255, 255, 0.02)' : 'none',
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 16px',
                                borderRadius: '100px',
                                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                                outline: 'none'
                            }}
                        >
                            NEXT PROJECT
                            <span
                                style={{
                                    display: 'inline-block',
                                    transform: isNextHovered ? 'translateX(4px)' : 'translateX(0px)',
                                    transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                →
                            </span>
                        </button>

                        {/* Tiny Preview Label */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: '8px',
                                opacity: isNextHovered ? 0.45 : 0,
                                transform: isNextHovered ? 'translateY(0px)' : 'translateY(-4px)',
                                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                                fontSize: '10px',
                                color: '#fff',
                                letterSpacing: '0.05em',
                                marginTop: '6px',
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap',
                                textAlign: 'right'
                            }}
                        >
                            Next: <span style={{ fontWeight: 500 }}>{nextProject.title}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN TWO-COLUMN LAYOUT */}
            <div className="container project-grid-container" style={{ marginTop: '40px' }}>
                <div
                    className="project-main-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '40px',
                        position: 'relative'
                    }}
                >
                    {/* LEFT COLUMN: Sticky Navigation & Metadata */}
                    <div
                        className="project-left-col"
                        style={{
                            gridColumn: 'span 4'
                        }}
                    >
                        <div
                            style={{
                                position: 'sticky',
                                top: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px'
                            }}
                        >
                            {/* Metadata Table */}
                            <motion.div
                                variants={elementVariants}
                                className="project-meta-col"
                            >
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Project Type</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{metadata.projectType}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Timeline</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{metadata.timeline}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{metadata.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Status</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{metadata.status}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                                    {metadata.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: '10px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                color: 'rgba(255, 255, 255, 0.5)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Sticky Vertical Progress Indicator */}
                            <motion.div
                                className="project-nav-wrapper"
                                variants={elementVariants}
                            >
                                <ProjectNav activeSection={activeParentSec} onSectionClick={scrollToSection} />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Title, Cover Image & Editorial Sections */}
                    <div
                        className="project-right-col"
                        style={{
                            gridColumn: 'span 8',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '60px'
                        }}
                    >
                        {/* Title & Subtitle */}
                        <motion.div
                            variants={elementVariants}
                            className="project-title-col"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px'
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    fontWeight: 400,
                                    lineHeight: 1.05,
                                    letterSpacing: '-0.03em',
                                    margin: 0,
                                    background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.75) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                {metadata.title}
                            </h1>
                            <p
                                style={{
                                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                    lineHeight: 1.45,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    maxWidth: '640px',
                                    margin: 0
                                }}
                            >
                                {metadata.subtitle}
                            </p>
                        </motion.div>

                        {/* LARGE HERO COVER PLACEHOLDER AREA */}
                        <motion.div
                            variants={elementVariants}
                            style={{
                                width: '100%',
                                height: 'clamp(320px, 45vw, 560px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                background: 'radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                                    backgroundSize: '24px 24px',
                                    opacity: 0.8,
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Atmospheric glow orb */}
                            <div style={{
                                position: 'absolute',
                                width: '350px',
                                height: '350px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                top: '15%',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }} />

                            <div style={{ textAlign: 'center', zIndex: 5 }}>
                                <span style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Visual Area Placeholder</span>
                                <h4 style={{ fontSize: '20px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>{metadata.coverImage}</h4>
                            </div>
                        </motion.div>

                        {/* EDITORIAL SECTIONS LIST */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>

                            {/* SECTION 1: Overview */}
                            <motion.div id="overview-section" variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>01 / {c.overview.title}</span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em' }}>{c.overview.heading}</h2>
                                {c.overview.keyTakeaway && (
                                    <div className="cs-takeaway" style={{ marginBottom: '32px' }}>
                                        <span className="cs-takeaway-label">Key Takeaway</span>
                                        <p className="cs-takeaway-text">{c.overview.keyTakeaway}</p>
                                    </div>
                                )}
                                {c.overview.paragraphs.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                            </motion.div>

                            {/* SECTION 2: The Problem */}
                            <motion.div variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>02 / {c.problem.title}</span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em' }}>{c.problem.heading}</h2>
                                {c.problem.keyTakeaway && (
                                    <div className="cs-takeaway" style={{ marginBottom: '32px' }}>
                                        <span className="cs-takeaway-label">Key Takeaway</span>
                                        <p className="cs-takeaway-text">{c.problem.keyTakeaway}</p>
                                    </div>
                                )}
                                {c.problem.paragraphs && c.problem.paragraphs.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                                {c.problem.bullets && (
                                    <ul className="cs-bullet-list" style={{ marginBottom: '24px', marginTop: '8px' }}>
                                        {c.problem.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                                {c.problem.paragraphsAfter && c.problem.paragraphsAfter.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                            </motion.div>

                            {/* SECTION 3: Existing Journey */}
                            <motion.div id="flow-section" variants={elementVariants} style={{ width: '100%' }}>
                                <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>03 / {c.existingJourney.title}</span>
                                    <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '16px', letterSpacing: '-0.02em' }}>{c.existingJourney.heading}</h2>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{c.existingJourney.subtitle}</span>
                                </div>

                                {/* Step-by-Step Flow Chart Cards */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(7, 1fr)',
                                        gap: '12px',
                                        marginBottom: '40px'
                                    }}
                                    className="journey-grid-responsive"
                                >
                                    {c.existingJourney.steps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                padding: '16px 12px',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                minHeight: '110px'
                                            }}
                                        >
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.35)', marginBottom: '8px', display: 'block' }}>0{idx + 1}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.35 }}>{step}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Diagram visual area */}
                                <div
                                    style={{
                                        width: '100%',
                                        height: '240px',
                                        borderRadius: '16px',
                                        border: '1px dashed rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(255, 255, 255, 0.01)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>Visual Diagram Placeholder</span>
                                        <h5 style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.5)', margin: '8px 0 0 0' }}>{c.existingJourney.image}</h5>
                                    </div>
                                </div>
                            </motion.div>

                            {/* SECTION 4: Approach */}
                            <motion.div id="approach-section" variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>04 / {c.approach.title}</span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em' }}>{c.approach.heading}</h2>
                                {c.approach.keyTakeaway && (
                                    <div className="cs-takeaway" style={{ marginBottom: '32px' }}>
                                        <span className="cs-takeaway-label">Key Takeaway</span>
                                        <p className="cs-takeaway-text">{c.approach.keyTakeaway}</p>
                                    </div>
                                )}
                                {c.approach.paragraphs && c.approach.paragraphs.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                                {c.approach.bullets && (
                                    <ul className="cs-bullet-list" style={{ marginBottom: '24px', marginTop: '8px' }}>
                                        {c.approach.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                                {c.approach.paragraphsAfter && c.approach.paragraphsAfter.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                            </motion.div>

                            {/* SECTION 5: Solution */}
                            <motion.div id="prototype-section" variants={elementVariants} style={{ width: '100%' }}>
                                <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>05 / {c.solution.title}</span>
                                    <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.solution.heading}</h2>
                                    {c.solution.keyTakeaway && (
                                        <div className="cs-takeaway">
                                            <span className="cs-takeaway-label">Key Takeaway</span>
                                            <p className="cs-takeaway-text">{c.solution.keyTakeaway}</p>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                                    {c.solution.subsections.map((sub, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(12, 1fr)',
                                                gap: '40px',
                                                alignItems: 'center'
                                            }}
                                            className="layout-grid-responsive"
                                        >
                                            {/* TEXT COLUMN */}
                                            <div style={{ gridColumn: idx % 2 === 0 ? 'span 5' : 'span 5 / 13' }} className="solution-text-col">
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.3)', display: 'block', marginBottom: '8px' }}>SUBSECTION 0{idx + 1}</span>
                                                <h4 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>{sub.title}</h4>
                                                <p style={{ fontSize: '1rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.6)' }}>{sub.description}</p>
                                            </div>

                                            {/* IMAGE PLACEHOLDER COLUMN */}
                                            <div
                                                style={{
                                                    gridColumn: idx % 2 === 0 ? 'span 7' : '1 / span 7',
                                                    gridRow: idx % 2 === 0 ? 'auto' : '1'
                                                }}
                                                className="solution-img-col"
                                            >
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '280px',
                                                        borderRadius: '16px',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                                                            backgroundSize: '16px 16px',
                                                            opacity: 0.6,
                                                            pointerEvents: 'none'
                                                        }}
                                                    />
                                                    <div style={{ textAlign: 'center', zIndex: 2 }}>
                                                        <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>Visual Screen Placeholder</span>
                                                        <h5 style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.55)', margin: '6px 0 0 0' }}>{sub.image}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* SECTION 6: Outcome (HIGHLIGHT PANEL) */}
                            <motion.div id="result-section" variants={elementVariants} style={{ width: '100%' }}>
                                <div
                                    style={{
                                        width: '100%',
                                        padding: '60px',
                                        background: 'rgba(255, 255, 255, 0.01)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        borderRadius: '32px',
                                        backdropFilter: 'blur(15px)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    className="highlight-panel-responsive"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        width: '400px',
                                        height: '400px',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
                                        filter: 'blur(30px)',
                                        top: '-20%',
                                        left: '-10%'
                                    }} />

                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>06 / {c.outcome.title}</span>
                                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em' }}>{c.outcome.heading}</h2>

                                        {c.outcome.keyTakeaway && (
                                            <div className="cs-takeaway" style={{ marginBottom: '40px' }}>
                                                <span className="cs-takeaway-label">Key Takeaway</span>
                                                <p className="cs-takeaway-text">{c.outcome.keyTakeaway}</p>
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            {c.outcome.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '16px',
                                                        borderBottom: idx !== c.outcome.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                                        paddingBottom: '20px'
                                                    }}
                                                >
                                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.3)', paddingTop: '3px', flexShrink: 0 }}>0{idx + 1}</span>
                                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* SECTION 7: Reflection */}
                            <motion.div variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>07 / {c.reflection.title}</span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em' }}>{c.reflection.heading}</h2>
                                {c.reflection.keyTakeaway && (
                                    <div className="cs-takeaway" style={{ marginBottom: '32px' }}>
                                        <span className="cs-takeaway-label">Key Takeaway</span>
                                        <p className="cs-takeaway-text">{c.reflection.keyTakeaway}</p>
                                    </div>
                                )}
                                {c.reflection.paragraphs.map((p, i) => (
                                    <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>{p}</p>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* BOTTOM NAVIGATION FOOTER */}
            <div className="container" style={{ marginTop: '100px', paddingBottom: '40px' }}>
                <div
                    style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '60px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    {/* Bottom Left: ← Projects */}
                    <button
                        onClick={() => navigateTo('/#projects')}
                        onMouseEnter={() => setIsBackHovered(true)}
                        onMouseLeave={() => setIsBackHovered(false)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: isBackHovered ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                            padding: 0,
                            outline: 'none'
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                transform: isBackHovered ? 'translateX(-4px)' : 'translateX(0px)',
                                transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            ←
                        </span>
                        Projects
                    </button>

                    {/* Bottom Right: NEXT PROJECT → */}
                    <div
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
                            onClick={() => navigateTo(`/projects/${nextProject.slug}`)}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                color: isNextHovered ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                                borderColor: isNextHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                backgroundColor: isNextHovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                                boxShadow: isNextHovered ? '0 4px 12px rgba(255, 255, 255, 0.02)' : 'none',
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 20px',
                                borderRadius: '100px',
                                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                                outline: 'none'
                            }}
                        >
                            NEXT PROJECT
                            <span
                                style={{
                                    display: 'inline-block',
                                    transform: isNextHovered ? 'translateX(4px)' : 'translateX(0px)',
                                    transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                →
                            </span>
                        </button>

                        {/* Tiny Preview Label */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: '8px',
                                opacity: isNextHovered ? 0.45 : 0,
                                transform: isNextHovered ? 'translateY(0px)' : 'translateY(-4px)',
                                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                                fontSize: '10px',
                                color: '#fff',
                                letterSpacing: '0.05em',
                                marginTop: '6px',
                                pointerEvents: 'none',
                                whiteSpace: 'nowrap',
                                textAlign: 'right'
                            }}
                        >
                            Next: <span style={{ fontWeight: 500 }}>{nextProject.title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
