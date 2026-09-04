import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';
import ImageModal from '../../components/ImageModal';

const SEO_METADATA = {
    id: '6s-seo',
    title: '6s SEO Tool',
    subtitle: 'Turning complex search data into prioritized, confident decisions.',
    eyebrow: 'SAAS / SEO INTELLIGENCE / PRODUCT DESIGN',
    slug: '6s-marketers-seo-tool',
    role: 'Lead Product Designer',
    timeline: '8 weeks',
    team: 'Product Designer + 2 Engineers',
    platform: 'B2B SaaS Web Application',
    projectType: 'Commercial SaaS Product',
    domain: 'Search Analytics & Workflow Intelligence',
    status: 'Case Study',
    tags: ['B2B SaaS', 'SEO Analytics', 'Data Visualization', 'Workflow Design', 'Information Architecture'],
    pageTitle: '6s SEO Tool — SaaS Product Design Case Study | Brahmanshu Verma',
    metaDescription: 'An SEO intelligence product designed to transform dense keyword tracking and crawl diagnostic metrics into prioritized, high-impact growth actions.'
};

const SEO_NAV_ITEMS = [
    { id: 'overview', label: '01 Overview', targetId: 'seo-overview' },
    { id: 'problem', label: '02 Problem', targetId: 'seo-problem' },
    { id: 'system', label: '03 System', targetId: 'seo-system' },
    { id: 'product', label: '04 Product', targetId: 'seo-product' },
    { id: 'outcome', label: '05 Outcome', targetId: 'seo-outcome' }
];

export default function SeoToolPage() {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [activeSec, setActiveSec] = useState('overview');
    const [modalImg, setModalImg] = useState({ isOpen: false, src: '', alt: '', caption: '' });

    useEffect(() => {
        document.title = SEO_METADATA.pageTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', SEO_METADATA.metaDescription);
        }
        window.scrollTo(0, 0);
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, []);

    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = [
                { id: 'overview', el: document.getElementById('seo-overview') },
                { id: 'problem', el: document.getElementById('seo-problem') },
                { id: 'system', el: document.getElementById('seo-system') },
                { id: 'product', el: document.getElementById('seo-product') },
                { id: 'outcome', el: document.getElementById('seo-outcome') }
            ];

            let current = 'overview';
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
                current = 'outcome';
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

                    {/* NEXT PROJECT BUTTON (Loops back to Cora) */}
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
                            onClick={() => navigateTo('/projects/cora')}
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
                            Next: <span style={{ fontWeight: 600 }}>Cora</span>
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
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{SEO_METADATA.projectType}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{SEO_METADATA.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Timeline & Team</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{SEO_METADATA.timeline} · {SEO_METADATA.team}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Domain & Platform</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{SEO_METADATA.domain} · {SEO_METADATA.platform}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                                    {SEO_METADATA.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: '11px',
                                                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                                border: '1px solid rgba(16, 185, 129, 0.2)',
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
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={SEO_NAV_ITEMS} />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Editorial Content & Analytics Mockups */}
                    <div className="project-right-col">
                        {/* Title & Eyebrow */}
                        <motion.div variants={elementVariants} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <span style={{
                                fontFamily: 'Fira Code, monospace',
                                fontSize: '12px',
                                color: '#10B981',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                fontWeight: 600
                            }}>
                                {SEO_METADATA.eyebrow}
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
                                {SEO_METADATA.subtitle}
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
                                6s SEO Tool is an intelligence platform for growth teams and agency marketers. By uniting multi-domain rank tracking, crawl anomaly detection, and opportunity scoring, 6s translates thousands of raw search metrics into a prioritized, actionable queue of optimization tasks.
                            </p>
                        </motion.div>

                        {/* HERO COVER VISUAL */}
                        <motion.div variants={elementVariants} className="cs-media-card">
                            <button
                                type="button"
                                className="cs-zoom-trigger"
                                onClick={() => setModalImg({
                                    isOpen: true,
                                    src: '/assets/ios_notifications_preview.png',
                                    alt: '6s SEO Intelligence Platform Interface',
                                    caption: 'Full-resolution view: 6s SEO tool dashboard showing domain visibility, keyword volatility, and prioritized growth queues.'
                                })}
                                aria-label="Inspect 6s SEO platform in full resolution"
                            >
                                <span className="cs-zoom-badge">⤢ Inspect Full Size</span>
                                <img
                                    src="/assets/ios_notifications_preview.png"
                                    alt="6s SEO Intelligence Platform Interface"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </button>
                            <div className="cs-media-caption">
                                <span className="cs-media-caption-text">
                                    "Designing dense analytical dashboards that emphasize actionable growth tasks rather than raw data dumps."
                                </span>
                                <span className="cs-media-caption-tag" style={{ color: '#10B981' }}>
                                    6S SEO / INTELLIGENCE
                                </span>
                            </div>
                        </motion.div>

                        {/* PURPOSEFUL ZOOMED DETAIL CROPS */}
                        <div className="cs-zoom-detail-grid">
                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#10B981', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · OPPORTUNITY SCORE MATRIX
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Action Prioritization</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>Composite impact calculation:</strong> Rather than forcing marketers to cross-reference search volume, difficulty, and intent manually, 6s computes an actionable opportunity rating for every target query.
                                    </p>
                                </div>
                            </div>

                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#10B981', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · SERP VOLATILITY & DISPATCH
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Workflow Execution</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>One-click task conversion:</strong> Detected crawl anomalies and rank drops can be converted directly into assigned content briefs or developer tickets with verified remediation guidance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* EDITORIAL SECTIONS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>

                            {/* 01 OVERVIEW */}
                            <motion.div id="seo-overview" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    01 / OVERVIEW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    SEO marketers are overwhelmed with data and starved for clarity.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '16px' }}>
                                    Search engine optimization requires monitoring countless volatile signals: daily keyword rank fluctuations, search intent shifts, core algorithm updates, competitor content releases, and technical crawl anomalies.
                                </p>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                    Most legacy tools present massive, unfilterable tables with hundreds of columns. Marketers spend hours manually copying numbers into spreadsheets and slide decks just to understand what to fix first.
                                </p>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#10B981' }}>PRODUCT MISSION</span>
                                    <p className="cs-takeaway-text">
                                        "How might we bridge the gap between raw diagnostic search telemetry and prioritized, high-leverage execution tasks?"
                                    </p>
                                </div>
                            </motion.div>

                            {/* 02 PROBLEM */}
                            <motion.div id="seo-problem" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    02 / PROBLEM SPACE
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Analysis paralysis across fragmented reports.
                                </h2>

                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginBottom: '32px'
                                }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        The four failure points of legacy SEO dashboards:
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                                        {[
                                            { num: '01', title: 'Data density without hierarchy', desc: 'Equal visual weight given to minor fluctuations and critical revenue-impacting rank losses.' },
                                            { num: '02', title: 'Disconnected workflow loops', desc: 'Identifying an issue required opening separate project management tools to assign tasks.' },
                                            { num: '03', title: 'Noisy algorithm panic', desc: 'No baseline distinction between routine search volatility and genuine sitewide penalties.' },
                                            { num: '04', title: 'Manual reporting overhead', desc: 'Agencies spent 20+ hours per month formatting client PDF updates from raw exports.' }
                                        ].map((item) => (
                                            <div key={item.num} style={{
                                                background: 'rgba(255, 255, 255, 0.015)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '14px',
                                                padding: '20px'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                    [{item.num}] {item.title}
                                                </span>
                                                <p className="cs-prose" style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 03 SYSTEM */}
                            <motion.div id="seo-system" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    03 / SYSTEM ARCHITECTURE
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    The 3-Tier Opportunity Engine.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '28px' }}>
                                    6s reimagines search analytics by ranking every diagnostic observation against business impact and effort:
                                </p>

                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '36px'
                                }}>
                                    {[
                                        {
                                            tier: 'TIER 1 · REVENUE THREATS',
                                            color: '#EF4444',
                                            focus: 'Immediate action required',
                                            desc: 'Sudden position drops on top-converting transactional keywords, 4xx/5xx crawl surges, canonical mismatches.'
                                        },
                                        {
                                            tier: 'TIER 2 · STRIKING DISTANCE',
                                            color: '#10B981',
                                            focus: 'Highest ROI optimization',
                                            desc: 'High-volume keywords currently ranking in positions 4–10. Minor title tag, internal linking, or content refreshes yield immediate page-1 traffic jumps.'
                                        },
                                        {
                                            tier: 'TIER 3 · TECHNICAL HYGIENE',
                                            color: '#3B82F6',
                                            focus: 'Long-term baseline health',
                                            desc: 'Image optimization, schema markup consistency, orphan page discovery, and core web vitals speed tuning.'
                                        }
                                    ].map((tier, idx, arr) => (
                                        <div key={tier.tier} style={{
                                            padding: '20px 24px',
                                            borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: '20px',
                                            alignItems: 'baseline'
                                        }}>
                                            <div>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: tier.color, fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                                                    {tier.tier}
                                                </span>
                                                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>
                                                    {tier.focus}
                                                </span>
                                            </div>
                                            <p className="cs-prose" style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: 0 }}>
                                                {tier.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 04 PRODUCT */}
                            <motion.div id="seo-product" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    04 / PRODUCT EXECUTION
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    High-density data without visual fatigue.
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                                    {[
                                        {
                                            num: '01',
                                            title: 'Unified Health & Volatility Command Center',
                                            desc: 'A single scannable viewport showing organic visibility health across all tracked domains. Algorithm volatility indicators prevent premature panic by contextualizing fluctuations.'
                                        },
                                        {
                                            num: '02',
                                            title: 'Opportunity Impact Matrix',
                                            desc: 'Visual scatter charts plotting search volume against ranking difficulty, allowing marketers to spot underserved keyword clusters with 1-click filtering.'
                                        },
                                        {
                                            num: '03',
                                            title: 'Actionable Task Queue',
                                            desc: 'Every diagnostic finding can be converted directly into an assigned workflow task, connecting SEO audits with content writers and web developers in real time.'
                                        },
                                        {
                                            num: '04',
                                            title: 'Automated Client-Ready Synthesis',
                                            desc: 'One-click executive summaries that highlight revenue impact, top winning keywords, and completed optimizations, eliminating manual monthly reporting slide decks.'
                                        }
                                    ].map((feature) => (
                                        <div key={feature.num} style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '20px',
                                            padding: '26px'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                FEATURE {feature.num}
                                            </span>
                                            <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '10px' }}>
                                                {feature.title}
                                            </h3>
                                            <p className="cs-prose" style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 05 OUTCOME */}
                            <motion.div id="seo-outcome" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    05 / OUTCOMES & REFLECTION
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Turning search diagnostics into business velocity.
                                </h2>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                                    {[
                                        { num: '01', title: '40% reduction in reporting time', desc: 'Automated executive synthesis replaced manual spreadsheet export and slide formatting.' },
                                        { num: '02', title: 'Faster diagnostic turnaround', desc: 'Prioritized opportunity tiers helped teams address striking-distance keywords within days.' },
                                        { num: '03', title: 'High-density scannability', desc: 'Engineered clean typographic hierarchy with dark mode contrast suited for continuous daily use.' },
                                        { num: '04', title: 'Integrated accountability', desc: 'Connected technical audits directly to team task queues without tool switching.' }
                                    ].map((item) => (
                                        <div key={item.num} style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '16px',
                                            padding: '22px'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                [{item.num}] {item.title}
                                            </span>
                                            <p className="cs-prose" style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#10B981' }}>SENIOR DESIGN REFLECTION</span>
                                    <p className="cs-takeaway-text">
                                        "Data visualization is not about displaying all numbers at once. It is the discipline of helping users know exactly what to do next."
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
                        onClick={() => navigateTo('/projects/cora')}
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
                        Next Project: <strong>Cora</strong> →
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
