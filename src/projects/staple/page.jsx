import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';
import ImageModal from '../../components/ImageModal';

const STAPLE_METADATA = {
    id: 'staple',
    title: 'Staple',
    subtitle: 'One workspace for document operations.',
    eyebrow: 'PRODUCTIVITY / PRODUCT DESIGN',
    slug: 'staple',
    role: 'Product Designer (UI/UX)',
    timeline: '4-day Design Sprint',
    platform: 'Desktop SaaS',
    domain: 'Document Operations & Finance',
    focus: 'IA · Workflow Design · Utility UX · Interaction Architecture',
    status: 'Case Study',
    tags: ['Document Operations', 'Workflow UX', 'Desktop SaaS', 'Information Architecture', 'Interaction Design'],
    pageTitle: 'Staple — Document Operations Workspace | Brahmanshu Verma',
    metaDescription: 'A unified document operations workspace connecting file organization, page-level manipulation, preview, and verified export into one frictionless workflow.'
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
    const [modalImg, setModalImg] = useState({ isOpen: false, src: '', alt: '', caption: '' });

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
                window.lenis.scrollTo(el, { offset: -90 });
            } else {
                const y = el.getBoundingClientRect().top + window.scrollY - 90;
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
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* STICKY GLASS HEADER */}
            <header className="project-top-header">
                <div className="project-top-header-inner">
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
                            onClick={() => navigateTo('/projects/dream-holidays')}
                            className="project-detail-next-btn"
                            style={{
                                background: isNextHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${isNextHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                color: isNextHovered ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '0.06em',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 18px',
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
                                opacity: isNextHovered ? 0.6 : 0,
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
                            Next: <span style={{ fontWeight: 600 }}>Dream Holidays</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN TWO-COLUMN WIDE LAYOUT */}
            <div className="project-grid-container" style={{ marginTop: '24px' }}>
                <div className="project-main-grid">
                    {/* LEFT COLUMN: Sticky Navigation & Metadata */}
                    <div className="project-left-col">
                        <div className="project-sticky-sidebar">
                            {/* Metadata Block */}
                            <motion.div variants={elementVariants} className="project-meta-col">
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Project Type</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{STAPLE_METADATA.timeline}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{STAPLE_METADATA.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Domain & Platform</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{STAPLE_METADATA.domain} · {STAPLE_METADATA.platform}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Focus</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{STAPLE_METADATA.focus}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                                    {STAPLE_METADATA.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: '11px',
                                                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                                padding: '4px 10px',
                                                borderRadius: '100px',
                                                color: 'rgba(255, 255, 255, 0.75)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Slim Sticky Chapter Progress Nav */}
                            <motion.div className="project-nav-wrapper" variants={elementVariants}>
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={STAPLE_NAV_ITEMS} />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Editorial Content & Visual Artifacts */}
                    <div className="project-right-col">
                        {/* Title & Eyebrow */}
                        <motion.div variants={elementVariants} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                    fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                                    fontWeight: 400,
                                    lineHeight: 1.1,
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
                                className="cs-prose"
                                style={{
                                    fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    margin: 0
                                }}
                            >
                                Staple is a document operations workspace designed for finance and operations teams handling multi-document bundles. Instead of shuffling PDFs between cloud drives, desktop editors, and web converters, Staple unites folder navigation, page-level manipulation, live inspection, and verified export into one calm desktop environment.
                            </p>
                        </motion.div>

                        {/* HERO COVER VISUAL */}
                        <motion.div variants={elementVariants} className="cs-media-card">
                            <button
                                type="button"
                                className="cs-zoom-trigger"
                                onClick={() => setModalImg({
                                    isOpen: true,
                                    src: '/assets/enterprise_dashboard_preview.png',
                                    alt: 'Staple Document Operations Workspace',
                                    caption: 'Full-resolution view: Staple unified document operations workspace with dual-pane layout and live verification.'
                                })}
                                aria-label="Inspect Staple workspace in full resolution"
                            >
                                <span className="cs-zoom-badge">⤢ Inspect Full Size</span>
                                <img
                                    src="/assets/enterprise_dashboard_preview.png"
                                    alt="Staple Document Operations Workspace"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </button>
                            <div className="cs-media-caption">
                                <span className="cs-media-caption-text">
                                    "The challenge wasn't designing another file manager. It was keeping context intact while users manipulated the contents of a document."
                                </span>
                                <span className="cs-media-caption-tag" style={{ color: '#3B82F6' }}>
                                    STAPLE / WORKSPACE
                                </span>
                            </div>
                        </motion.div>

                        {/* PURPOSEFUL ZOOMED DETAIL CROPS */}
                        <div className="cs-zoom-detail-grid">
                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · DUAL-PANE FILE & PAGE INSPECTION
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Context Retention</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>Source navigation alongside page manipulation:</strong> Operators browse parent bundle structures in the left pane while reordering, rotating, or extracting individual invoice pages in the right workspace without modal context switches.
                                    </p>
                                </div>
                            </div>

                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · PRE-EXPORT DIFF VERIFICATION
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Zero Data Loss</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>Side-by-side structural comparison:</strong> Before committing changes to enterprise storage, Staple highlights deleted blank pages, renamed files, and bundle target folders to eliminate costly operational errors.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* EDITORIAL SECTIONS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>

                            {/* 01 OVERVIEW */}
                            <motion.div id="staple-overview" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    01 / OVERVIEW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Documents rarely arrive ready to use.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '16px' }}>
                                    Finance and operations teams frequently receive messy document bundles from disparate channels: vendor invoices, shipping manifests, customs paperwork, and scanned receipts mixed into single, disorderly PDF files.
                                </p>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                    The files exist, but users must split invoices, remove blank pages, combine attachments, and verify page sequences before handing them over to accounting systems.
                                </p>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#3B82F6' }}>CORE WORKFLOW FRICTION</span>
                                    <p className="cs-takeaway-text">
                                        "File storage and document manipulation lived in different worlds. Every single page edit forced users to abandon their folder context."
                                    </p>
                                </div>

                                {/* 9-Step Fragmented Workflow Chain */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginTop: '32px'
                                }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                                        EXISTING BROKEN WORKFLOW (9 DISJOINTED STEPS)
                                    </span>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        alignItems: 'center',
                                        padding: '16px',
                                        background: 'rgba(0,0,0,0.35)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        marginBottom: '16px'
                                    }}>
                                        {[
                                            'Find document', 'Download', 'Open PDF utility',
                                            'Manipulate pages', 'Export', 'Rename file',
                                            'Return to drive', 'Upload', 'Re-file into directory'
                                        ].map((step, idx, arr) => (
                                            <React.Fragment key={step}>
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: 'rgba(255,255,255,0.85)',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px'
                                                }}>
                                                    {step}
                                                </span>
                                                {idx < arr.length - 1 && (
                                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>→</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                                        "Each standalone tool may work in isolation, but the overall operational chain is full of friction and cognitive overhead."
                                    </span>
                                </div>
                            </motion.div>

                            {/* 02 RESEARCH */}
                            <motion.div id="staple-research" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    02 / RESEARCH & MARKET GAP
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    The opportunity between product categories.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '32px' }}>
                                    Rather than benchmarking screen aesthetics, the research analyzed tools according to the underlying jobs-to-be-done:
                                </p>

                                {/* Competitive Matrix Table */}
                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '36px'
                                }}>
                                    {[
                                        { cat: 'CLOUD STORAGE (Drive, Dropbox)', strong: 'Locating & categorizing files', friction: 'Zero page-level manipulation capabilities' },
                                        { cat: 'PDF UTILITIES (Acrobat, Smallpdf)', strong: 'Splitting, merging & reordering pages', friction: 'Completely strips away storage context & folder hierarchy' },
                                        { cat: 'OFFICE SUITES (Docs, Word)', strong: 'Rich inline text authoring', friction: 'Too complex & heavyweight for fast document operations' },
                                        { cat: 'STAPLE WORKSPACE', strong: 'Contextual organization + inline manipulation', friction: 'One continuous, unified workflow', isHighlight: true }
                                    ].map((row, idx, arr) => (
                                        <div key={row.cat} style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            padding: '18px 24px',
                                            borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                            background: row.isHighlight ? 'rgba(59, 130, 246, 0.06)' : 'transparent',
                                            alignItems: 'baseline',
                                            gap: '12px'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: row.isHighlight ? '#3B82F6' : 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                                                {row.cat}
                                            </span>
                                            <div>
                                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '2px', textTransform: 'uppercase' }}>Strong At</span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{row.strong}</span>
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: '2px', textTransform: 'uppercase' }}>{row.isHighlight ? 'Focus' : 'Friction'}</span>
                                                <span style={{ fontSize: '13px', color: row.isHighlight ? '#60A5FA' : 'rgba(255,255,255,0.6)' }}>{row.friction}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#3B82F6' }}>STRATEGIC INSIGHT</span>
                                    <p className="cs-takeaway-text">
                                        "The missing product value wasn't another PDF tool. It was continuity between file storage and page manipulation."
                                    </p>
                                </div>
                            </motion.div>

                            {/* 03 SYSTEM */}
                            <motion.div id="staple-system" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    03 / SYSTEM & INTERACTION MODEL
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Keep location and operation visible simultaneously.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '24px' }}>
                                    The workspace interface continuously answers three fundamental questions for the user:
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                    gap: '12px',
                                    marginBottom: '36px'
                                }}>
                                    {[
                                        { q: 'Where am I?', a: 'Persistent breadcrumb & folder hierarchy' },
                                        { q: 'What am I editing?', a: 'Active multi-page selection canvas' },
                                        { q: 'What will change?', a: 'Live instant export simulation' }
                                    ].map((item, i) => (
                                        <div key={i} style={{
                                            padding: '18px 16px',
                                            background: 'rgba(59, 130, 246, 0.04)',
                                            border: '1px solid rgba(59, 130, 246, 0.16)',
                                            borderRadius: '14px',
                                            textAlign: 'center'
                                        }}>
                                            <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{item.q}</span>
                                            <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.4 }}>{item.a}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Object Model System Table */}
                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '36px'
                                }}>
                                    <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.03)' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                                            WORKSPACE OBJECT MODEL
                                        </span>
                                    </div>
                                    {[
                                        { obj: 'FOLDER', role: 'Organizational boundary and persistence context' },
                                        { obj: 'DOCUMENT', role: 'Source file container with metadata properties' },
                                        { obj: 'PAGE', role: 'Smallest manipulable entity with high-res thumbnail' },
                                        { obj: 'SELECTION', role: 'Active multi-page scope for batch actions' },
                                        { obj: 'SECTION', role: 'Semantic groupings (e.g. Invoices, Receipts, Notes)' },
                                        { obj: 'OPERATION', role: 'Atomic transformation (Split, Merge, Reorder, Delete)' },
                                        { obj: 'PREVIEW', role: 'Deterministic rendering of resulting file bundle' },
                                        { obj: 'EXPORT', role: 'Validated, signed commit back to cloud storage' }
                                    ].map((item, idx, arr) => (
                                        <div key={item.obj} style={{
                                            display: 'grid',
                                            gridTemplateColumns: '160px 1fr',
                                            padding: '14px 20px',
                                            borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                            alignItems: 'center',
                                            background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600 }}>{item.obj}</span>
                                            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>{item.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 04 PRODUCT */}
                            <motion.div id="staple-product" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    04 / PRODUCT EXECUTION
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Calm, keyboard-first document editing.
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    {/* Feature Block 1 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '28px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            01 / DUAL-PANE WORKSPACE
                                        </span>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Folder navigation on the left, page canvas on the right.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            Users never lose sight of their folder directory. Selecting any document immediately renders its pages into an interactive thumbnail matrix where pages can be dragged, extracted, rotated, or split with single key commands.
                                        </p>
                                    </div>

                                    {/* Feature Block 2 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '28px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            02 / ATOMIC SPLIT & MERGE
                                        </span>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Multi-select page boundaries with instant batch action.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            Placing divider cuts between pages allows users to burst a 50-page invoice bundle into individual categorized documents in seconds, complete with auto-suggested naming based on OCR header text.
                                        </p>
                                    </div>

                                    {/* Feature Block 3 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '28px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            03 / DETERMINISTIC EXPORT
                                        </span>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Verify before committing changes.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                            Before overwriting or saving, Staple shows a side-by-side preview diff of resulting files, page numbers, and destination folders, guaranteeing zero accidental data loss.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 05 RESULT */}
                            <motion.div id="staple-result" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    05 / OUTCOMES & REFLECTION
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Crafting focused utility software.
                                </h2>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                                    {[
                                        { num: '01', title: 'Context preservation', desc: 'Eliminated tool-switching by keeping folder storage and document editing in one unified frame.' },
                                        { num: '02', title: 'Streamlined page operations', desc: 'Replaced multi-step PDF conversions with direct spatial drag-and-drop page manipulation.' },
                                        { num: '03', title: 'Error prevention', desc: 'Provided real-time preview diffs to verify bundle structure before committing exports.' },
                                        { num: '04', title: 'Dense yet calm aesthetics', desc: 'Maintained high data density with generous padding and subdued neutral surfaces.' }
                                    ].map((item) => (
                                        <div key={item.num} style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '16px',
                                            padding: '22px'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                [{item.num}] {item.title}
                                            </span>
                                            <p className="cs-prose" style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#3B82F6' }}>SENIOR DESIGN REFLECTION</span>
                                    <p className="cs-takeaway-text">
                                        "The most satisfying product design often happens in utilitarian workflows — transforming frustrating daily chores into calm, dependable tools."
                                    </p>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM NAVIGATION FOOTER */}
            <div className="project-footer-container" style={{ marginTop: '100px', paddingBottom: '40px' }}>
                <div
                    style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <button
                        onClick={() => navigateTo('/#work')}
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
                            transition: 'all 250ms ease',
                            padding: 0,
                            outline: 'none'
                        }}
                    >
                        <span>←</span> Back to Projects
                    </button>

                    <button
                        onClick={() => navigateTo('/projects/dream-holidays')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.04)',
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
                            transition: 'all 250ms ease'
                        }}
                    >
                        Next Project: <strong>Dream Holidays</strong> →
                    </button>
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
