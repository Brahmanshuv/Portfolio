import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';
import ImageModal from '../../components/ImageModal';

const CORA_METADATA = {
    id: 'cora',
    title: 'Cora',
    subtitle: 'AI-assisted retail media planning, with humans still in control.',
    eyebrow: 'RETAIL MEDIA / AGENTIC AI / PRODUCT DESIGN',
    slug: 'cora',
    role: 'UX Lead & Product Designer',
    timeline: '4 weeks',
    team: '3 Designers',
    platform: 'Enterprise Web',
    projectType: 'Internal RFP / Enterprise Concept',
    domain: 'Retail Media Network · Agentic AI',
    status: 'Case Study',
    tags: ['Retail Media Network', 'Agentic AI', 'Workflow Architecture', 'Enterprise UX', 'Confidence Systems'],
    pageTitle: 'Cora — AI Product Design Case Study | Brahmanshu Verma',
    metaDescription: 'An AI-assisted retail media planning platform designed around persistent context, human-in-the-loop checkpoints, and contextual optimization.'
};

const CORA_NAV_ITEMS = [
    { id: 'overview', label: '01 Overview', targetId: 'cora-overview' },
    { id: 'research', label: '02 Research', targetId: 'cora-research' },
    { id: 'system', label: '03 System', targetId: 'cora-system' },
    { id: 'product', label: '04 Product', targetId: 'cora-product' },
    { id: 'result', label: '05 Result', targetId: 'cora-result' }
];

export default function CoraPage() {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [activeSec, setActiveSec] = useState('overview');
    const [modalImg, setModalImg] = useState({ isOpen: false, src: '', alt: '', caption: '' });

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
            const sections = [
                { id: 'overview', el: document.getElementById('cora-overview') },
                { id: 'research', el: document.getElementById('cora-research') },
                { id: 'system', el: document.getElementById('cora-system') },
                { id: 'product', el: document.getElementById('cora-product') },
                { id: 'result', el: document.getElementById('cora-result') }
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
                            onClick={() => navigateTo('/projects/staple')}
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
                            Next: <span style={{ fontWeight: 600 }}>Staple</span>
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
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{CORA_METADATA.projectType}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{CORA_METADATA.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Timeline & Team</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{CORA_METADATA.timeline} · {CORA_METADATA.team}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Domain & Platform</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>{CORA_METADATA.domain} · {CORA_METADATA.platform}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                                    {CORA_METADATA.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: '11px',
                                                backgroundColor: 'rgba(139, 92, 246, 0.08)',
                                                border: '1px solid rgba(139, 92, 246, 0.2)',
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
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={CORA_NAV_ITEMS} />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Editorial Content & Packaged Media */}
                    <div className="project-right-col">
                        {/* Title & Eyebrow */}
                        <motion.div variants={elementVariants} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                {CORA_METADATA.subtitle}
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
                                Cora is an AI-assisted Retail Media Network platform designed to turn fragmented campaign planning into one continuous, guided workflow — from source documents and campaign strategy to human approval, launch, monitoring, and closed-loop optimization.
                            </p>
                        </motion.div>

                        {/* HERO VISUAL AREA (Cora Budget Proposal Workspace) */}
                        <motion.div variants={elementVariants} className="cs-media-card">
                            <button
                                type="button"
                                className="cs-zoom-trigger"
                                onClick={() => setModalImg({
                                    isOpen: true,
                                    src: '/assets/CORA/cora-budget-proposal.jpeg',
                                    alt: 'Cora AI Retail Media Network Budget Proposal and Campaign Planning Workspace',
                                    caption: 'Full-resolution view: AI-generated multi-channel retail media budget proposal and allocation workspace.'
                                })}
                                aria-label="Inspect Cora budget proposal in full resolution"
                            >
                                <span className="cs-zoom-badge">⤢ Inspect Full Size</span>
                                <img
                                    src="/assets/CORA/cora-budget-proposal.jpeg"
                                    alt="Cora AI Retail Media Network Budget Proposal and Campaign Planning Workspace"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </button>
                            <div className="cs-media-caption">
                                <span className="cs-media-caption-text">
                                    "AI-generated budget proposal and multi-channel investment allocation within Cora's planning workspace."
                                </span>
                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>
                                    CORA / RETAIL MEDIA
                                </span>
                            </div>
                        </motion.div>

                        {/* PURPOSEFUL ZOOMED DETAIL CROPS */}
                        <div className="cs-zoom-detail-grid">
                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · MULTI-CHANNEL BID MATRIX
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Granular Controls</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>Channel-by-channel allocation:</strong> Planners can inspect expected incremental ROAS, target CPM thresholds, and automated flight scheduling across On-Site Search, Off-Site DSP, and Connected TV surfaces.
                                    </p>
                                </div>
                            </div>

                            <div className="cs-detail-crop-card">
                                <div style={{ background: 'rgba(139, 92, 246, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, textTransform: 'uppercase' }}>
                                        DETAIL CROP · POLICY GUARDRAIL ENGINE
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Automated Verification</span>
                                </div>
                                <div className="cs-detail-crop-body">
                                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, margin: 0 }}>
                                        <strong>Pre-flight policy gates:</strong> Real-time compliance badges verify brand safety guidelines, inventory limits, and margin thresholds before triggering multi-stakeholder sign-off workflows.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* EDITORIAL SECTIONS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>

                            {/* 01 OVERVIEW */}
                            <motion.div id="cora-overview" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    01 / OVERVIEW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Retail media had a workflow problem before it had an AI problem.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '16px' }}>
                                    Campaign managers in retail media operate across deeply fragmented inputs: agency briefs, audience segment rules, inventory availability, budget allocations, creative guidelines, multi-tier approvals, and live telemetry.
                                </p>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                    The core challenge was never simply generating copy or bids faster. It was eliminating the operational tax of reconstructing context across siloed tools without hiding the reasoning behind AI-generated recommendations.
                                </p>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#8B5CF6' }}>CORE DESIGN CHALLENGE</span>
                                    <p className="cs-takeaway-text">
                                        "How might we compress a fragmented retail-media workflow without compressing the human judgment required to run it responsibly?"
                                    </p>
                                </div>

                                {/* Problem Breakdown Grid */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '30px',
                                    marginTop: '32px'
                                }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                        Strategy was getting buried under operations.
                                    </h3>
                                    <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        The existing process required users to constantly jump between disparate tools, re-entering data and manually synthesizing briefs into execution parameters.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        {[
                                            { num: '01', title: 'Manual synthesis', desc: 'Campaign information had to be interpreted and restructured manually before planning could begin.' },
                                            { num: '02', title: 'Fragmented decisions', desc: 'Audience, budget, creative, and KPI decisions were distributed across disconnected moments.' },
                                            { num: '03', title: 'Low-confidence automation', desc: 'Standalone chatbot recommendations lacked contextual explainability and were difficult to trust.' },
                                            { num: '04', title: 'Post-launch blindspots', desc: 'Campaign work continued after activation through manual monitoring, diagnosis, and reactive tuning.' }
                                        ].map((item) => (
                                            <div key={item.num} style={{
                                                background: 'rgba(255, 255, 255, 0.015)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '14px',
                                                padding: '20px'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                    [{item.num}] {item.title}
                                                </span>
                                                <p style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 02 RESEARCH */}
                            <motion.div id="cora-research" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    02 / RESEARCH & PERSONAS
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Two roles. Different pressures. One campaign.
                                </h2>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '36px' }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px'
                                    }}>
                                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <button
                                                type="button"
                                                className="cs-zoom-trigger"
                                                onClick={() => setModalImg({
                                                    isOpen: true,
                                                    src: '/assets/CORA/12.jpeg',
                                                    alt: 'Ethan Walker - Strategy Persona',
                                                    caption: 'Strategy Persona: Ethan Walker (Marketing Strategy Manager) — Focus on campaign intent, budget allocations, and decision rationale.'
                                                })}
                                                aria-label="Inspect Ethan Walker persona card"
                                            >
                                                <span className="cs-zoom-badge">⤢ Inspect</span>
                                                <img src="/assets/CORA/12.jpeg" alt="Ethan Walker - Strategy Persona" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                            </button>
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ROLE 01 · STRATEGY</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', margin: '6px 0 2px 0' }}>Ethan Walker</h3>
                                            <span style={{ fontSize: '12px', color: '#8B5CF6', display: 'block', marginBottom: '10px', fontWeight: 500 }}>Marketing Strategy Manager</span>
                                            <p className="cs-prose" style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '12px' }}>
                                                Ethan operates close to campaign intent. He needs to evaluate whether proposed audiences, budgets, and KPIs adhere to the overarching brand goals.
                                            </p>
                                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                                                <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.45)' }}>Core Need: </span>
                                                <strong style={{ color: '#fff', fontSize: '11.5px' }}>Decision confidence & rationale</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px'
                                    }}>
                                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <button
                                                type="button"
                                                className="cs-zoom-trigger"
                                                onClick={() => setModalImg({
                                                    isOpen: true,
                                                    src: '/assets/CORA/11.jpeg',
                                                    alt: 'Simon Brooks - Execution Persona',
                                                    caption: 'Execution Persona: Simon Brooks (Ad Operations Specialist) — Focus on configuration speed, line-item management, and delivery verification.'
                                                })}
                                                aria-label="Inspect Simon Brooks persona card"
                                            >
                                                <span className="cs-zoom-badge">⤢ Inspect</span>
                                                <img src="/assets/CORA/11.jpeg" alt="Simon Brooks - Execution Persona" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                            </button>
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ROLE 02 · EXECUTION</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', margin: '6px 0 2px 0' }}>Simon Brooks</h3>
                                            <span style={{ fontSize: '12px', color: '#8B5CF6', display: 'block', marginBottom: '10px', fontWeight: 500 }}>Ad Operations Specialist</span>
                                            <p className="cs-prose" style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '12px' }}>
                                                Simon operates close to execution. His day revolves around configuring line items, verifying creatives, securing approvals, and troubleshooting live delivery.
                                            </p>
                                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                                                <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.45)' }}>Core Need: </span>
                                                <strong style={{ color: '#fff', fontSize: '11.5px' }}>Operational clarity & speed</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comparison Table: Chatbot vs Agentic */}
                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '32px'
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                        <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.01)', borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                                                CONVERSATIONAL CHATBOT AI
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {['Waits for manual prompt', 'Conversation becomes the interface', 'User reconstructs context across apps', 'Recommendations feel detached from levers'].map((item, i) => (
                                                    <li key={i} style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.55)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ padding: '24px', background: 'rgba(139, 92, 246, 0.04)' }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
                                                CORA AGENTIC WORKFLOW
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {['Grounds in source documents automatically', 'Product workspace remains the interface', 'Context persists end-to-end through launch', 'Recommendations appear beside actionable levers'].map((item, i) => (
                                                    <li key={i} style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: '#8B5CF6' }}>✓</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 03 SYSTEM */}
                            <motion.div id="cora-system" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    03 / SYSTEM ARCHITECTURE
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    AI proposes. Humans commit.
                                </h2>
                                <p className="cs-prose" style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '32px' }}>
                                    Cora's interaction model enforces a strict principle: automation reduces repetitive operational overhead, but cannot erase human accountability.
                                </p>

                                {/* Confidence State Matrix */}
                                <div style={{
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    marginBottom: '36px'
                                }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '140px 1fr 1fr',
                                        padding: '14px 20px',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        fontFamily: 'Fira Code, monospace',
                                        fontSize: '11px',
                                        color: 'rgba(255, 255, 255, 0.45)',
                                        textTransform: 'uppercase'
                                    }}>
                                        <span>STATE</span>
                                        <span>AI PARTICIPATION</span>
                                        <span>HUMAN CONTROL</span>
                                    </div>
                                    {[
                                        { state: 'INPUT', ai: 'Parses raw media briefs & constraints', human: 'Uploads campaign assets' },
                                        { state: 'PROPOSAL', ai: 'Synthesizes channel allocation & bids', human: 'Reviews, overrides line items' },
                                        { state: 'GATE', ai: 'Checks safety policies & budget limits', human: 'Explicit multi-party approval' },
                                        { state: 'FLIGHT', ai: 'Monitors pacing & anomalies in real-time', human: 'Accepts or rejects adjustments' }
                                    ].map((row, idx, arr) => (
                                        <div
                                            key={row.state}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '140px 1fr 1fr',
                                                padding: '16px 20px',
                                                borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11.5px', color: '#8B5CF6', fontWeight: 600 }}>
                                                {row.state}
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
                                                {row.ai}
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)' }}>
                                                {row.human}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 04 PRODUCT */}
                            <motion.div id="cora-product" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    04 / SIX STAGES OF THE WORKFLOW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '32px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    From campaign brief to live telemetry.
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

                                    {/* STAGE 1: Brief Ingestion & Context Grounding */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 01 · SOURCE GROUNDING
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Grounding in campaign documents before generation.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Rather than expecting campaign planners to craft lengthy prompts, Cora accepts raw RFP documents, brand guidelines, and target spreadsheets. It parses constraints, dates, product categories, and budget parameters into a clean entity model.
                                        </p>
                                        
                                        {/* Packaged Video 1 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/12.jpeg">
                                                <source src="/assets/CORA/1.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Ingesting multi-page RFP brief documents and extracting campaign constraints.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 01</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STAGE 2: Understanding & Confirmation Checkpoint */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 02 · CONFIRMATION GATE
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Confirmation before generation prevents compound errors.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Discovering that an AI misunderstood an audience segment after generating an entire media plan is expensive. Cora presents an explicit review checkpoint where users inspect extracted objectives before triggering proposal generation.
                                        </p>
                                        
                                        {/* Packaged Video 2 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/13.jpeg">
                                                <source src="/assets/CORA/2.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Planners verify and tweak structured campaign goals prior to proposal synthesis.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 02</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STAGE 3: Proposal Generation & Multi-Surface Editor */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 03 · MULTI-SURFACE PROPOSAL
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Synthesizing channels, line-items, and creative assignments.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Cora constructs a multi-channel plan spanning on-site sponsored products, off-site programmatic display, and connected retail media inventory. Every parameter remains fully editable in place.
                                        </p>
                                        
                                        {/* Packaged Video 3 & 4 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/16.jpeg">
                                                <source src="/assets/CORA/3.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Inspecting AI proposal line items and channel allocations.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 03</span>
                                            </div>
                                        </div>

                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/17.jpeg">
                                                <source src="/assets/CORA/4.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Inline creative asset matching and inventory scheduling.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 04</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STAGE 4: Contextual Recommendations & Explainability */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 04 · CONTEXTUAL EXPLAINABILITY
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Recommendations appear where decisions happen.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Rather than a siloed recommendation tab, Cora embeds contextual optimization callouts beside specific line items, showing expected incremental ROAS, historical precedent, and confidence bands.
                                        </p>
                                        
                                        {/* Packaged Video 5 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/18.jpeg">
                                                <source src="/assets/CORA/5.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Explainable confidence scoring and 1-click parameter customization.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 05</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STAGE 5: Multi-Stakeholder Approval */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 05 · STAGED APPROVAL
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Approval is a collaborative state, not a blind button.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Brand managers, legal approvers, and media buyers can review specific portions of the plan independently. Cora highlights changes and model assumptions for rapid sign-off.
                                        </p>
                                        
                                        {/* Packaged Video 6 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/19.jpeg">
                                                <source src="/assets/CORA/6.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Multi-stakeholder sign-off and staged launch verification.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 06</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* STAGE 6: Live Telemetry & Closed-Loop Optimization */}
                                    <div>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            STAGE 06 · CLOSED-LOOP OPTIMIZATION
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>
                                            Campaign intelligence continues after launch.
                                        </h3>
                                        <p className="cs-prose" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.68)', marginBottom: '20px' }}>
                                            Post-launch, Cora monitors pacing, ad fatigue, and out-of-stock inventory in real time. It suggests live budget shifts directly within the active dashboard.
                                        </p>
                                        
                                        {/* Packaged Video 7 */}
                                        <div className="cs-media-card">
                                            <video controls playsInline preload="metadata" loop muted poster="/assets/CORA/21.jpeg">
                                                <source src="/assets/CORA/7.mp4" type="video/mp4" />
                                            </video>
                                            <div className="cs-media-caption">
                                                <span className="cs-media-caption-text">
                                                    <strong>Interactive Walkthrough:</strong> Real-time pacing telemetry and one-click budget reallocation.
                                                </span>
                                                <span className="cs-media-caption-tag" style={{ color: '#8B5CF6' }}>VIDEO 07</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>

                            {/* 05 RESULT */}
                            <motion.div id="cora-result" className="cs-section" variants={elementVariants}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    05 / OUTCOMES & REFLECTION
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    A grounded framework for enterprise AI products.
                                </h2>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
                                    {[
                                        { num: '01', title: 'Persistent campaign context', desc: 'Eliminated redundant re-entry by preserving one unified data model from raw brief to live flight.' },
                                        { num: '02', title: 'Actionable human checkpoints', desc: 'Replaced blind automation with structured confirmation gates that build operational trust.' },
                                        { num: '03', title: 'Contextual recommendations', desc: 'Integrated AI suggestions directly alongside the levers they influence.' },
                                        { num: '04', title: 'Closed-loop telemetry', desc: 'Extended AI assistance beyond generation into active performance diagnostics.' }
                                    ].map((item) => (
                                        <div key={item.num} style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '16px',
                                            padding: '22px'
                                        }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                [{item.num}] {item.title}
                                            </span>
                                            <p className="cs-prose" style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="cs-takeaway">
                                    <span className="cs-takeaway-label" style={{ color: '#8B5CF6' }}>SENIOR DESIGN REFLECTION</span>
                                    <p className="cs-takeaway-text">
                                        "Automation is valuable when it removes tedious work. Trust appears when human experts still understand, control, and take pride in the final decision."
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
                        onClick={() => navigateTo('/projects/staple')}
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
                        Next Project: <strong>Staple</strong> →
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
