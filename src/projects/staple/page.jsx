import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';

const STAPLE_METADATA = {
    id: 'staple',
    title: 'Staple',
    subtitle: 'One workspace for document operations.',
    eyebrow: 'PRODUCTIVITY / PRODUCT DESIGN',
    slug: 'staple',
    role: 'UI/UX Designer · Product Design',
    timeline: '4-day Take-home Assignment',
    platform: 'Desktop SaaS',
    domain: 'Document Operations',
    focus: 'IA · Workflow Design · Utility UX · Interaction Design',
    status: 'Concept Design',
    tags: ['Document Operations', 'Workflow UX', 'Desktop SaaS', 'Information Architecture', 'Interaction Design'],
    pageTitle: 'Staple — Product Design Case Study | Brahmanshu Verma',
    metaDescription: 'A document operations workspace connecting file organization, page-level manipulation, preview and export in one workflow.'
};

const STAPLE_NAV_ITEMS = [
    { id: 'overview', label: '01 Overview', targetId: 'staple-overview' },
    { id: 'research', label: '02 Research', targetId: 'staple-research' },
    { id: 'system', label: '03 System', targetId: 'staple-system' },
    { id: 'product', label: '04 Product', targetId: 'staple-product' },
    { id: 'result', label: '05 Result', targetId: 'staple-result' }
];

export default function StaplePage() {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [activeSec, setActiveSec] = useState('overview');

    useEffect(() => {
        document.title = STAPLE_METADATA.pageTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', STAPLE_METADATA.metaDescription);
        }
        window.scrollTo(0, 0);
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, []);

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = [
                { id: 'overview', el: document.getElementById('staple-overview') },
                { id: 'research', el: document.getElementById('staple-research') },
                { id: 'system', el: document.getElementById('staple-system') },
                { id: 'product', el: document.getElementById('staple-product') },
                { id: 'result', el: document.getElementById('staple-result') }
            ];

            let current = 'overview';
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
                current = 'result';
            } else {
                sections.forEach(sec => {
                    if (sec.el) {
                        const rect = sec.el.getBoundingClientRect();
                        if (rect.top <= window.innerHeight * 0.45) {
                            current = sec.id;
                        }
                    }
                });
            }
            setActiveSec(current);
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.05 }
        }
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
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
                        onClick={() => navigateTo('/#work')}
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

                    {/* NEXT PROJECT HOVER SYSTEM */}
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
                            onClick={() => navigateTo('/projects/dream-holidays')}
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
                            Next: <span style={{ fontWeight: 500 }}>Dream Holidays</span>
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
                    <div className="project-left-col" style={{ gridColumn: 'span 4' }}>
                        <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Metadata Block */}
                            <motion.div variants={elementVariants} className="project-meta-col">
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Project Type</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{STAPLE_METADATA.timeline}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{STAPLE_METADATA.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Domain & Platform</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{STAPLE_METADATA.domain} · {STAPLE_METADATA.platform}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Focus</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{STAPLE_METADATA.focus}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                                    {STAPLE_METADATA.tags.map((tag, i) => (
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
                            <motion.div className="project-nav-wrapper" variants={elementVariants}>
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={STAPLE_NAV_ITEMS} />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Editorial Content */}
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                        >
                            <span style={{
                                fontFamily: 'Fira Code, monospace',
                                fontSize: '12px',
                                color: '#3B82F6',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                fontWeight: 600
                            }}>
                                {STAPLE_METADATA.eyebrow}
                            </span>
                            <h1
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                                    fontWeight: 400,
                                    lineHeight: 1.08,
                                    letterSpacing: '-0.03em',
                                    margin: 0,
                                    background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.75) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                {STAPLE_METADATA.subtitle}
                            </h1>
                            <p
                                style={{
                                    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                                    lineHeight: 1.55,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    maxWidth: '680px',
                                    margin: 0
                                }}
                            >
                                Staple is a document workflow concept for finance and operations teams working with invoices, purchase orders, delivery notes and multi-document bundles. Instead of moving files between storage systems and disconnected PDF utilities, Staple brings browsing, page-level editing, document operations, preview and export into one workspace.
                            </p>
                        </motion.div>

                        {/* HERO COVER VISUAL */}
                        <motion.div
                            variants={elementVariants}
                            style={{
                                width: '100%',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                background: 'rgba(12, 16, 24, 0.6)',
                                backdropFilter: 'blur(20px)',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <img
                                src="/assets/enterprise_dashboard_preview.png"
                                alt="Staple Document Operations Workspace"
                                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                            />
                            <div style={{
                                padding: '16px 24px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                background: 'rgba(0, 0, 0, 0.4)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>
                                    "The challenge wasn't designing another file manager. It was keeping context intact while users manipulated the contents of a document."
                                </span>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#3B82F6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    STAPLE / WORKSPACE
                                </span>
                            </div>
                        </motion.div>

                        {/* EDITORIAL SECTIONS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>

                            {/* 01 OVERVIEW */}
                            <motion.div id="staple-overview" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    01 / OVERVIEW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Documents rarely arrive ready to use.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                    Finance and operations teams frequently receive document bundles from different sources — email, cloud storage or direct upload.
                                </p>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                    A single bundle may contain invoices, purchase orders, delivery notes, supporting pages or documents that need to be separated and recombined.
                                </p>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '36px' }}>
                                    The files already exist. The problem begins when users need to do something with them.
                                </p>

                                {/* Problem Block */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '32px',
                                    marginBottom: '36px'
                                }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                                        File management and document manipulation lived in different worlds.
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        Typical document workflows force users to leave their storage context, open a separate PDF utility, manipulate pages, export a new document, rename it and place it back into the correct location.
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        alignItems: 'center',
                                        padding: '16px',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.04)',
                                        marginBottom: '20px'
                                    }}>
                                        {[
                                            'Find document', 'Download', 'Open PDF utility',
                                            'Manipulate pages', 'Export', 'Rename',
                                            'Return to storage', 'Upload', 'Reorganize'
                                        ].map((step, idx, arr) => (
                                            <React.Fragment key={step}>
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: 'rgba(255,255,255,0.85)',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px'
                                                }}>
                                                    {step}
                                                </span>
                                                {idx < arr.length - 1 && (
                                                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>→</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', fontStyle: 'italic' }}>
                                            "Each tool may solve its individual task. The workflow remains fragmented."
                                        </span>
                                    </div>
                                </div>

                                {/* Design Question */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderLeft: '2px solid #3B82F6',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    padding: '24px 28px',
                                    borderRadius: '0 18px 18px 0'
                                }}>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.4)', display: 'block', marginBottom: '8px', fontFamily: 'Fira Code, monospace' }}>
                                        CORE DESIGN QUESTION
                                    </span>
                                    <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.95)', margin: 0, lineHeight: 1.45, fontWeight: 400 }}>
                                        "How might we reduce fragmented document workflows into one coherent workspace?"
                                    </p>
                                </div>
                            </motion.div>

                            {/* 02 RESEARCH */}
                            <motion.div id="staple-research" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    02 / RESEARCH
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    The opportunity appeared between product categories.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '32px' }}>
                                    Rather than treating competitors as a screen-reference exercise, the research grouped existing products by the job users hired them to do.
                                </p>

                                {/* Category Comparison Table */}
                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '36px'
                                }}>
                                    {[
                                        { cat: 'CLOUD STORAGE', strong: 'Finding and organizing files', friction: 'Limited page-level manipulation' },
                                        { cat: 'PDF UTILITIES', strong: 'Split, merge and page operations', friction: 'Documents lose storage context' },
                                        { cat: 'OFFICE SUITES', strong: 'Rich creation and editing', friction: 'More complexity than operational document tasks require' },
                                        { cat: 'STAPLE OPPORTUNITY', strong: 'Organization + contextual document operations', friction: 'Keep the workflow together.', isHighlight: true }
                                    ].map((row, idx, arr) => (
                                        <div key={row.cat} style={{
                                            display: 'grid',
                                            gridTemplateColumns: '200px 1fr 1fr',
                                            padding: '18px 24px',
                                            borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                            background: row.isHighlight ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                                            alignItems: 'baseline'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: row.isHighlight ? '#3B82F6' : 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                                                {row.cat}
                                            </span>
                                            <div>
                                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', textTransform: 'uppercase' }}>Strong at</span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{row.strong}</span>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '2px', textTransform: 'uppercase' }}>{row.isHighlight ? 'Focus' : 'Friction'}</span>
                                                <span style={{ fontSize: '13px', color: row.isHighlight ? '#60A5FA' : 'rgba(255,255,255,0.6)' }}>{row.friction}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cs-takeaway" style={{ marginBottom: '40px' }}>
                                    <span className="cs-takeaway-label">CRITICAL INSIGHT</span>
                                    <p className="cs-takeaway-text">
                                        "The missing value wasn't another utility. It was continuity between utilities."
                                    </p>
                                </div>

                                {/* Reframing */}
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                        Not a file manager with PDF tools attached.
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        That was the initial interpretation of the problem. It was too shallow. The stronger product model became a complete <strong>Document Operations Workspace</strong>:
                                    </p>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '14px',
                                        marginBottom: '20px'
                                    }}>
                                        {[
                                            { step: 'NAVIGATE', desc: 'Establishes folder and document context without jumping out of storage.' },
                                            { step: 'MANIPULATE', desc: 'Editor operates directly on selected pages with clear, immediate scope.' },
                                            { step: 'FINALIZE', desc: 'Preview and export convert operations into verified, ready-to-use results.' }
                                        ].map((item) => (
                                            <div key={item.step} style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                borderRadius: '14px',
                                                padding: '20px'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                    {item.step}
                                                </span>
                                                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5, margin: 0 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 03 SYSTEM */}
                            <motion.div id="staple-system" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    03 / SYSTEM
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Keep location and operation visible at the same time.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                    The product needed to continuously answer three fundamental questions at any moment in the workflow:
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '12px',
                                    marginBottom: '40px'
                                }}>
                                    {['Where am I?', 'What am I editing?', 'What will this action affect?'].map((q, i) => (
                                        <div key={i} style={{
                                            padding: '16px',
                                            background: 'rgba(59, 130, 246, 0.04)',
                                            border: '1px solid rgba(59, 130, 246, 0.15)',
                                            borderRadius: '12px',
                                            textAlign: 'center'
                                        }}>
                                            <span style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{q}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* IA System Blocks */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        Information architecture layers.
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {[
                                            { layer: 'NAVIGATION', desc: 'Folder and document hierarchy context' },
                                            { layer: 'DOCUMENT SELECTION', desc: 'Choose and activate the material being worked on' },
                                            { layer: 'EDITOR WORKSPACE', desc: 'Inspect, reorder, and manipulate individual pages' },
                                            { layer: 'ACTION LAYER', desc: 'Contextual split, merge, move, copy and metadata operations' },
                                            { layer: 'PREVIEW / EXPORT', desc: 'Validate final document structure and commit output' }
                                        ].map((block, idx) => (
                                            <div key={block.layer} style={{
                                                padding: '16px 20px',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                display: 'grid',
                                                gridTemplateColumns: '220px 1fr',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11.5px', color: '#3B82F6', fontWeight: 600 }}>
                                                    [0{idx + 1}] {block.layer}
                                                </span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                                                    {block.desc}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Core Workflow Diagram */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        One continuous task instead of a chain of utilities.
                                    </h3>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '10px',
                                        alignItems: 'center',
                                        padding: '18px 24px',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '14px',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {[
                                            'Browse folders', 'Select document(s)', 'Open editor workspace',
                                            'Select pages', 'Split / merge / move / copy',
                                            'Preview resulting structure', 'Export finalized document'
                                        ].map((step, idx, arr) => (
                                            <React.Fragment key={step}>
                                                <span style={{
                                                    fontSize: '12.5px',
                                                    color: '#fff',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    padding: '6px 14px',
                                                    borderRadius: '8px',
                                                    fontWeight: 500
                                                }}>
                                                    {step}
                                                </span>
                                                {idx < arr.length - 1 && (
                                                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>→</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                                {/* Object Model System Table */}
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        The workspace is built around a small set of understandable objects.
                                    </h3>
                                    <div style={{
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        background: 'rgba(255, 255, 255, 0.01)'
                                    }}>
                                        {[
                                            { obj: 'FOLDER', role: 'Where the work belongs in organizational space' },
                                            { obj: 'DOCUMENT', role: 'Source file container and metadata boundary' },
                                            { obj: 'PAGE', role: 'Smallest manipulable unit with visual preview' },
                                            { obj: 'SELECTION', role: 'Current active action scope' },
                                            { obj: 'SECTION', role: 'New organizational grouping within document bundles' },
                                            { obj: 'OPERATION', role: 'Transformation being applied (split, merge, move)' },
                                            { obj: 'PREVIEW', role: 'Expected resulting document structure' },
                                            { obj: 'EXPORT', role: 'Finalized, clean document output' }
                                        ].map((item, idx, arr) => (
                                            <div key={item.obj} style={{
                                                display: 'grid',
                                                gridTemplateColumns: '160px 1fr',
                                                padding: '14px 20px',
                                                borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                                alignItems: 'center',
                                                background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600 }}>
                                                    {item.obj}
                                                </span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>
                                                    {item.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 04 PRODUCT */}
                            <motion.div id="staple-product" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    04 / PRODUCT
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '36px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Interaction design for high-density document tasks.
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

                                    {/* Decision 01 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            01 / SELECTION
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Selection had to become a visible system state.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                            Page manipulation becomes dangerous when users aren't certain what an action will affect. Selection therefore wasn't treated as a temporary visual highlight. It became a first-class interaction state. The interface makes the scope of the next operation legible before the user triggers it.
                                        </p>
                                        <div style={{
                                            padding: '14px 20px',
                                            background: 'rgba(59, 130, 246, 0.05)',
                                            borderLeft: '2px solid #3B82F6',
                                            borderRadius: '0 12px 12px 0'
                                        }}>
                                            <span style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic' }}>
                                                "Before showing what an action does, show what it will act on."
                                            </span>
                                        </div>
                                    </div>

                                    {/* Decision 02 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            02 / CONTEXT
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Tools should appear where the work already is.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Traditional utility products often begin with: <em>"What tool do you want?"</em> Staple begins with: <em>"What document are you working on?"</em> Available actions emerge from the selected document/page context instead of requiring users to first choose a utility and then locate their content.
                                        </p>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '16px',
                                            padding: '16px',
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.04)',
                                            textAlign: 'center'
                                        }}>
                                            <div>
                                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '4px' }}>TRADITIONAL PARADIGM</span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Tool → Document</span>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '11px', color: '#3B82F6', display: 'block', marginBottom: '4px', fontWeight: 600 }}>STAPLE PARADIGM</span>
                                                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>Document → Relevant Action</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decision 03 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            03 / STRUCTURE
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Splitting should create structure, not more cleanup.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            Users can select relevant pages and split them into new sections. Instead of forcing naming and organization to interrupt the operation, the system supports a continuous path from page selection to a usable new document structure with immediately editable titles.
                                        </p>
                                    </div>

                                    {/* Decision 04 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            04 / CROSS-DOCUMENT OPERATIONS
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Page operations shouldn't stop at file boundaries.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            Users may need to combine material originating in separate sections or documents. The workspace therefore treats pages as manipulable objects rather than locking every action to its original container, clearly communicating what is selected, where it will move, and what the resulting document will contain.
                                        </p>
                                    </div>

                                    {/* Move vs Copy */}
                                    <div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Similar actions. Different consequences.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Move and copy may appear adjacent in a toolbar, but their structural consequences differ. The interface clarifies the resulting document state before execution:
                                        </p>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: '12px',
                                            padding: '18px',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '14px',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            textAlign: 'center'
                                        }}>
                                            <div>
                                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>ORIGIN STATE</span>
                                                <span style={{ fontSize: '13px', color: '#fff' }}>BEFORE</span>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '11px', color: '#3B82F6', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>TRANSFORMATION</span>
                                                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>ACTION (Move vs Copy)</span>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '11px', color: '#10B981', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>DESTINATION STATE</span>
                                                <span style={{ fontSize: '13px', color: '#fff' }}>RESULTING CONTAINER</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bulk Actions & Recoverability */}
                                    <div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Efficiency is only useful when scope remains obvious.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Document operations become repetitive quickly. Bulk actions reduce that repetition, but they also amplify mistakes. The system balances speed, selection confidence, clear action scope, and recoverability.
                                        </p>
                                        <div className="cs-takeaway" style={{ margin: 0 }}>
                                            <span className="cs-takeaway-label">DESIGN RULE</span>
                                            <p className="cs-takeaway-text">
                                                "A multi-page action should never feel casually irreversible."
                                            </p>
                                        </div>
                                    </div>

                                    {/* Preview / Export & Visual System */}
                                    <div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Export is the commitment point.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Instead of treating export as a generic download action, Staple uses preview as the final validation layer. Users inspect the resulting document structure before generating the output: <strong>MANIPULATE → VERIFY → FINALIZE</strong>.
                                        </p>

                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px', marginTop: '36px' }}>
                                            Utility software should get quieter as the task gets harder.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            The workspace uses stronger navigation around a quieter document canvas so attention stays on the material being manipulated. Primary controls follow the current task, while secondary utilities remain available without competing with the document content.
                                        </p>
                                    </div>

                                </div>
                            </motion.div>

                            {/* 05 RESULT */}
                            <motion.div id="staple-result" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    05 / RESULT
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    The solution reduced the workflow, not the feature set.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                    Staple consolidated the core document journey into one connected product model: <strong>FIND → OPEN → SELECT → MANIPULATE → PREVIEW → EXPORT</strong>. The resulting concept demonstrated how file organization and page-level document operations could coexist without repeatedly forcing users out of their working context.
                                </p>

                                <div style={{
                                    padding: '16px 20px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '12px',
                                    marginBottom: '40px',
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)'
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Fira Code, monospace', fontSize: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>CONTEXT NOTE</span>
                                    "This was completed as a four-day take-home assignment, so no production metrics are claimed."
                                </div>

                                {/* What I Would Validate Next */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginBottom: '40px'
                                }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                        FUTURE CONSIDERATIONS
                                    </span>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                        The next layer is failure and recovery.
                                    </h3>
                                    <p style={{ fontSize: '0.96rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>
                                        A longer product cycle would need to validate the system against less predictable document states:
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                        {[
                                            'Non-contiguous page selections',
                                            'Large document bundles',
                                            'Conflicting or duplicate operations',
                                            'Long document/section names',
                                            'Unsupported or failed files',
                                            'Interrupted export workflows',
                                            'Multi-step undo / recovery states',
                                            'Permission-limited documents'
                                        ].map((item, i) => (
                                            <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12.5px', color: 'rgba(255,255,255,0.75)' }}>
                                                • {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Success Metrics Framework */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginBottom: '40px'
                                }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                        FUTURE SUCCESS METRICS
                                    </span>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        What I would measure.
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                        {[
                                            'Task completion time',
                                            'Number of tool/context switches',
                                            'Incorrect bulk operations',
                                            'Undo/recovery frequency',
                                            'Time to locate source documents',
                                            'Time to produce finalized document',
                                            'Export failure rate',
                                            'Confidence before high-impact operations'
                                        ].map((metric, idx) => (
                                            <div key={idx} style={{
                                                padding: '10px 14px',
                                                background: 'rgba(255,255,255,0.02)',
                                                borderRadius: '8px',
                                                fontSize: '12.5px',
                                                color: 'rgba(255,255,255,0.75)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                <span style={{ color: '#3B82F6', fontSize: '10px' }}>▪</span> {metric}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reflection */}
                                <div style={{
                                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                    paddingTop: '36px'
                                }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '18px' }}>
                                        The most important unit wasn't the file.
                                    </h3>
                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                        I initially approached the problem through documents and utilities. Mapping the complete task changed the solution.
                                    </p>
                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '32px' }}>
                                        The value wasn't created by adding more PDF tools. It came from keeping location, selection, operation and result connected throughout the task. That shifted the project from designing features to designing continuity.
                                    </p>
                                    <div className="cs-takeaway" style={{ margin: 0 }}>
                                        <span className="cs-takeaway-label">CLOSING STATEMENT</span>
                                        <p className="cs-takeaway-text">
                                            "Good utility UX doesn't make every operation visible. It makes the next operation obvious."
                                        </p>
                                    </div>
                                </div>
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
                    <button
                        onClick={() => navigateTo('/projects/cora')}
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
                        Previous: Cora
                    </button>

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
                            onClick={() => navigateTo('/projects/dream-holidays')}
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
                            Next: <span style={{ fontWeight: 500 }}>Dream Holidays</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
