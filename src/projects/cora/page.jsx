import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/router';
import ProjectNav from '../../components/ProjectNav';

const CORA_METADATA = {
    id: 'cora',
    title: 'Cora',
    subtitle: 'AI-assisted retail media planning, with humans still in control.',
    eyebrow: 'AI / ENTERPRISE PRODUCT DESIGN',
    slug: 'cora',
    role: 'UX Lead',
    timeline: '4 weeks',
    team: '3 Designers',
    platform: 'Enterprise Web',
    projectType: 'Internal RFP / Concept',
    domain: 'Retail Media · Agentic AI',
    status: 'Internal Concept',
    tags: ['Retail Media', 'Agentic AI', 'Product Strategy', 'Enterprise UX', 'Workflow Design'],
    pageTitle: 'Cora — AI Product Design | Brahmanshu Verma',
    metaDescription: 'An AI-assisted retail media planning experience designed around persistent context, human approval and contextual recommendations.'
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
                            onClick={() => navigateTo('/projects/staple')}
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
                            Next: <span style={{ fontWeight: 500 }}>Staple</span>
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
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{CORA_METADATA.projectType}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Role</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{CORA_METADATA.role}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Timeline & Team</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{CORA_METADATA.timeline} · {CORA_METADATA.team}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Domain & Platform</span>
                                    <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{CORA_METADATA.domain} · {CORA_METADATA.platform}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                                    {CORA_METADATA.tags.map((tag, i) => (
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
                                <ProjectNav activeSection={activeSec} onSectionClick={scrollToSection} navItems={CORA_NAV_ITEMS} />
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
                                color: '#8B5CF6',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                fontWeight: 600
                            }}>
                                {CORA_METADATA.eyebrow}
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
                                {CORA_METADATA.subtitle}
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
                                Cora is an AI-assisted Retail Media Network platform designed to turn fragmented campaign planning into one guided workflow — from source documents and campaign strategy to approval, launch, monitoring, and optimization.
                            </p>
                        </motion.div>

                        {/* HERO VISUAL AREA */}
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
                                src="/assets/spatial_3d_preview.png"
                                alt="Cora AI Retail Media Planning Interface"
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
                                    "Designing AI that participates in the workflow without removing the person responsible for the decision."
                                </span>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#8B5CF6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    CORA / RETAIL MEDIA
                                </span>
                            </div>
                        </motion.div>

                        {/* EDITORIAL SECTIONS LIST */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>

                            {/* 01 OVERVIEW */}
                            <motion.div id="cora-overview" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    01 / OVERVIEW
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Retail media had a workflow problem before it had an AI problem.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                    Campaign managers were already working across complex inputs: campaign briefs, audience requirements, budgets, creative decisions, KPIs, approvals, and live performance.
                                </p>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                    The challenge wasn't simply generating a campaign faster. It was reducing the operational work surrounding every decision without hiding the reasoning behind AI-generated recommendations.
                                </p>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '36px' }}>
                                    Cora explored what that workflow could look like when AI becomes an active planning layer rather than another standalone chatbot.
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
                                        Strategy was getting buried under operations.
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        The existing process required users to repeatedly move between planning, interpreting campaign information, allocating budgets, preparing audience strategy, reviewing creative requirements, securing approvals, and monitoring performance. The individual tasks were manageable. The real cost came from reconstructing context between them.
                                    </p>

                                    {/* 4-Item Problem Matrix */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        {[
                                            { num: '01', title: 'Manual synthesis', desc: 'Campaign information had to be interpreted and reorganized before meaningful planning could begin.' },
                                            { num: '02', title: 'Fragmented decisions', desc: 'Audience, budget, creative and KPI decisions were distributed across different moments in the workflow.' },
                                            { num: '03', title: 'Low-confidence automation', desc: 'Recommendations without supporting context were difficult to trust.' },
                                            { num: '04', title: 'Post-launch complexity', desc: 'Campaign work continued after activation through monitoring, diagnosis and optimization.' }
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

                                {/* Design Question */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderLeft: '2px solid #8B5CF6',
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
                                        "How might we compress a fragmented retail-media workflow without compressing the human judgment required to run it responsibly?"
                                    </p>
                                </div>
                            </motion.div>

                            {/* 02 RESEARCH */}
                            <motion.div id="cora-research" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    02 / RESEARCH
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Two roles. Different pressures. One campaign.
                                </h2>

                                {/* Two Persona Blocks */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        padding: '26px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ROLE 01</span>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', margin: '8px 0 4px 0' }}>Ethan Walker</h3>
                                        <span style={{ fontSize: '12px', color: '#8B5CF6', display: 'block', marginBottom: '16px', fontWeight: 500 }}>Marketing Strategy Manager</span>
                                        <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '12px' }}>
                                            Ethan operates closer to campaign intent. He needs to understand whether the proposed audience, spend, creative direction and KPIs still align with the original marketing objective.
                                        </p>
                                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', marginTop: '12px' }}>
                                            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Primary requirement: </span>
                                            <strong style={{ color: '#fff', fontSize: '12px' }}>Decision confidence, not automation</strong>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        padding: '26px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ROLE 02</span>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', margin: '8px 0 4px 0' }}>Simon Brooks</h3>
                                        <span style={{ fontSize: '12px', color: '#8B5CF6', display: 'block', marginBottom: '16px', fontWeight: 500 }}>Ad Operations Specialist</span>
                                        <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '12px' }}>
                                            Simon operates closer to execution. His work depends on translating strategy into a campaign that can actually be configured, reviewed, launched, monitored and adjusted.
                                        </p>
                                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', marginTop: '12px' }}>
                                            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Primary requirement: </span>
                                            <strong style={{ color: '#fff', fontSize: '12px' }}>Operational clarity & structure</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Shared Tension */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>Confidence upstream. Clarity downstream.</h3>
                                    <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                        Ethan needs enough visibility to trust the campaign strategy. Simon needs enough structure to execute it without repeatedly reconstructing that strategy. Cora therefore couldn't optimize for one role by simply exposing more information. The system needed to preserve one shared campaign context while changing the level of detail presented at each stage.
                                    </p>
                                </div>

                                {/* Existing Workflow Breakdown */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginBottom: '40px'
                                }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                                        EXISTING WORKFLOW
                                    </span>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', marginBottom: '20px' }}>The problem was continuity.</h3>
                                    
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        alignItems: 'center',
                                        marginBottom: '24px',
                                        padding: '16px',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.04)'
                                    }}>
                                        {[
                                            'Campaign inputs', 'Manual interpretation', 'Campaign planning',
                                            'Budget & audience decisions', 'Creative / KPI config', 'Review',
                                            'Approval', 'Launch', 'Monitoring', 'Manual intervention'
                                        ].map((step, idx, arr) => (
                                            <React.Fragment key={step}>
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: 'rgba(255,255,255,0.8)',
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

                                    <div className="cs-takeaway" style={{ margin: 0 }}>
                                        <span className="cs-takeaway-label">CRITICAL INSIGHT</span>
                                        <p className="cs-takeaway-text">
                                            "The most important insight wasn't that every task was difficult. It was that context had to be reconstructed repeatedly between tasks."
                                        </p>
                                    </div>
                                </div>

                                {/* AI Benchmarking Comparison */}
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>A chatbot answers. An agent carries work forward.</h3>
                                    <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        Benchmarking explored conversational AI and agent-oriented product patterns, including Copilot-style interaction models and adjacent AI workflow products. The important distinction was behavioral, not visual.
                                    </p>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '16px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.01)', borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
                                                CHAT-STYLE AI
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {['Waits for a prompt', 'Returns information', 'Conversation becomes the interface', 'User reconstructs context', 'Recommendations can feel detached'].map((item, i) => (
                                                    <li key={i} style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ padding: '24px', background: 'rgba(139, 92, 246, 0.03)' }}>
                                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', display: 'block', marginBottom: '14px', fontWeight: 600 }}>
                                                AGENT-ORIENTED WORKFLOW
                                            </span>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {['Understands current workflow state', 'Produces a usable next step', 'Product workflow remains the interface', 'Context persists through the task', 'Recommendations appear where decisions happen'].map((item, i) => (
                                                    <li key={i} style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ color: '#8B5CF6' }}>✓</span> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                        <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                                            "Don't add AI beside the workflow. Give the workflow an intelligent layer."
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 03 SYSTEM */}
                            <motion.div id="cora-system" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    03 / SYSTEM
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    AI proposes. Humans commit.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '32px' }}>
                                    Cora's interaction model was built around a simple constraint: automation could reduce operational work, but it could not erase accountability.
                                </p>

                                {/* Principles System Table */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    marginBottom: '40px'
                                }}>
                                    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.02)' }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                                            CORE OPERATING PRINCIPLES
                                        </span>
                                    </div>
                                    <div style={{ padding: '12px 24px' }}>
                                        {[
                                            { title: 'GROUND BEFORE GENERATION', desc: 'AI starts from campaign source material rather than an empty prompt.' },
                                            { title: 'CONFIRM UNDERSTANDING', desc: 'Users validate the interpreted campaign context before generation.' },
                                            { title: 'KEEP RECOMMENDATIONS CONTEXTUAL', desc: 'Suggestions appear beside the decisions they affect.' },
                                            { title: 'EXPLAIN IMPORTANT SUGGESTIONS', desc: 'The interface exposes enough rationale and source context for evaluation.' },
                                            { title: 'PRESERVE EDITABILITY', desc: 'Generated output remains reviewable and editable.' },
                                            { title: 'MAKE APPROVAL EXPLICIT', desc: 'Generation is not authorization.' },
                                            { title: 'CONTINUE AFTER LAUNCH', desc: 'The intelligence layer remains useful during monitoring and optimization.' }
                                        ].map((p, idx, arr) => (
                                            <div key={idx} style={{
                                                padding: '16px 0',
                                                borderBottom: idx < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                                display: 'grid',
                                                gridTemplateColumns: '260px 1fr',
                                                gap: '20px',
                                                alignItems: 'baseline'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#fff', fontWeight: 500 }}>
                                                    {p.title}
                                                </span>
                                                <span style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5 }}>
                                                    {p.desc}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{
                                    padding: '20px 24px',
                                    borderRadius: '14px',
                                    background: 'rgba(139, 92, 246, 0.05)',
                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                    textAlign: 'center',
                                    marginBottom: '40px'
                                }}>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: 500 }}>
                                        "Automation should reduce operational effort without reducing accountability."
                                    </p>
                                </div>

                                {/* New Process Workflow */}
                                <div style={{ marginBottom: '48px' }}>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        One campaign context, from brief to optimization.
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gap: '10px',
                                        marginBottom: '20px'
                                    }}>
                                        {[
                                            { s: '01', l: 'Upload documents' },
                                            { s: '02', l: 'AI extracts intent' },
                                            { s: '03', l: 'Confirm brief' },
                                            { s: '04', l: 'Generate proposal' },
                                            { s: '05', l: 'Review components' },
                                            { s: '06', l: 'Evaluate advice' },
                                            { s: '07', l: 'Approve / Edit' },
                                            { s: '08', l: 'Launch campaign' },
                                            { s: '09', l: 'Monitor live' },
                                            { s: '10', l: 'Diagnose & optimize' }
                                        ].map((step, idx) => (
                                            <div key={idx} style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                padding: '14px 10px',
                                                textAlign: 'center'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#8B5CF6', display: 'block', marginBottom: '6px' }}>{step.s}</span>
                                                <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.3, display: 'block' }}>{step.l}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* System Model — Sequence of Confidence States */}
                                <div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        Cora is a sequence of confidence states.
                                    </h3>
                                    <div style={{
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '18px',
                                        overflow: 'hidden',
                                        background: 'rgba(255, 255, 255, 0.01)'
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
                                            { state: 'INPUT', ai: 'Interpret source material', human: 'Provide campaign context' },
                                            { state: 'UNDERSTANDING', ai: 'Structure the brief', human: 'Confirm or correct' },
                                            { state: 'GENERATION', ai: 'Build initial proposal', human: 'Evaluate proposal' },
                                            { state: 'RECOMMENDATION', ai: 'Surface opportunities', human: 'Accept, reject or edit' },
                                            { state: 'APPROVAL', ai: 'Prepare launch state', human: 'Authorize' },
                                            { state: 'MONITORING', ai: 'Detect meaningful signals', human: 'Prioritize action' },
                                            { state: 'OPTIMIZATION', ai: 'Propose adjustment', human: 'Commit change' }
                                        ].map((row, i, arr) => (
                                            <div key={row.state} style={{
                                                display: 'grid',
                                                gridTemplateColumns: '140px 1fr 1fr',
                                                padding: '16px 20px',
                                                borderBottom: i < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                                                alignItems: 'center',
                                                background: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                                            }}>
                                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600 }}>{row.state}</span>
                                                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>{row.ai}</span>
                                                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{row.human}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 04 PRODUCT */}
                            <motion.div id="cora-product" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    04 / PRODUCT
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '36px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    Architecting the product control surface.
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

                                    {/* Decision 01 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            01 / GROUNDING
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Don't start with an empty prompt.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                            A blank AI prompt would force campaign managers to translate source documents into instructions before Cora could help. That recreates work instead of removing it.
                                        </p>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Cora begins with the source material. The system interprets uploaded campaign information and produces a structured understanding that users can review before anything is generated.
                                        </p>
                                        <div style={{
                                            padding: '14px 18px',
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            fontSize: '13px',
                                            color: 'rgba(255,255,255,0.85)'
                                        }}>
                                            <span style={{ color: '#10B981', fontWeight: 600 }}>Cora flow: </span>
                                            Source → Interpretation → Confirmation
                                            <span style={{ color: 'rgba(255,255,255,0.35)', margin: '0 10px' }}>vs</span>
                                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Source → User re-explains → Prompt → Generation</span>
                                        </div>
                                    </div>

                                    {/* Decision 02 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            02 / CONFIDENCE
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Confirmation before generation.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                            Immediately generating a campaign after upload would be faster. It would also make incorrect interpretation harder to detect.
                                        </p>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Cora therefore introduces a checkpoint between AI understanding and proposal generation. Users inspect what the system believes the objective, constraints and campaign context to be before allowing the workflow to continue.
                                        </p>
                                        
                                        <div style={{
                                            padding: '16px 20px',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '12px',
                                            borderLeft: '2px solid #8B5CF6',
                                            marginBottom: '16px'
                                        }}>
                                            <span style={{ fontSize: '10px', fontFamily: 'Fira Code, monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                                                TRADE-OFF
                                            </span>
                                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>
                                                Adds one interaction step. Reduces the cost of discovering a wrong assumption after an entire campaign has been generated.
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>
                                            "A little friction before automation can prevent much larger friction after automation."
                                        </span>
                                    </div>

                                    {/* Decision 03 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            03 / CONTEXT
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Recommendations belong beside decisions.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                            A separate AI-suggestions page would force users to translate recommendations back into the campaign they were editing.
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                                            {[
                                                { label: 'Budget advice', detail: 'appears around budget decisions' },
                                                { label: 'Audience advice', detail: 'appears around audience configuration' },
                                                { label: 'Performance advice', detail: 'appears around performance telemetry' }
                                            ].map((item, idx) => (
                                                <div key={idx} style={{
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    borderRadius: '12px',
                                                    padding: '14px'
                                                }}>
                                                    <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600, display: 'block', marginBottom: '4px' }}>{item.label}</span>
                                                    <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, display: 'block' }}>{item.detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decision 04 */}
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.015)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '20px',
                                        padding: '30px'
                                    }}>
                                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#8B5CF6', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                            04 / EXPLAINABILITY
                                        </span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Explainability is part of the control surface.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '16px' }}>
                                            For high-impact campaign decisions, a recommendation alone isn't enough. The interface needs to make four things immediately clear:
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
                                            {['What is Cora recommending?', 'Why is this recommended?', 'What will change in the campaign?', 'Can I modify the parameters?'].map((q, i) => (
                                                <div key={i} style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{q}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.55)', margin: 0 }}>
                                            The goal is not to expose raw model telemetry, but to present actionable decision rationale and source context so the user remains in genuine control.
                                        </p>
                                    </div>

                                    {/* Campaign Generation & Review Lifecycle */}
                                    <div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            From interpretation to an editable proposal.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Once campaign context is confirmed, Cora produces a structured proposal combining: Audience, Budget allocation, Creative direction, KPIs, Campaign parameters, and AI recommendations.
                                        </p>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                            The generated state is intentionally not treated as finished. It is a high-confidence starting point that remains inspectable and editable.
                                        </p>
                                        
                                        <div className="cs-takeaway" style={{ marginBottom: '32px' }}>
                                            <span className="cs-takeaway-label">PRODUCT PRINCIPLE</span>
                                            <p className="cs-takeaway-text">
                                                "Generation accelerates the first draft. Review remains part of the product, not an exception to it."
                                            </p>
                                        </div>

                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            Approval is a product state, not a button at the end.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '28px' }}>
                                            Instead of asking the user to trust one large AI output, the proposal can be reviewed as smaller understandable decisions. This creates natural states for: Editing, Feedback, Recommendation acceptance, Recommendation rejection, and Approval. Human intervention is part of the happy path rather than an exception.
                                        </p>

                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#fff', marginBottom: '14px' }}>
                                            The campaign doesn't become less complex when it goes live.
                                        </h3>
                                        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
                                            Many AI campaign concepts end at generation. Cora continues into monitoring. Post-launch, the system surfaces performance signals, identifies potential issues and presents optimization recommendations inside the context of the live campaign.
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            gap: '12px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '16px',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '14px',
                                            border: '1px solid rgba(255,255,255,0.06)'
                                        }}>
                                            {['PLAN', 'REVIEW', 'LAUNCH', 'OBSERVE', 'ADJUST'].map((st, i, arr) => (
                                                <React.Fragment key={st}>
                                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#fff', fontWeight: 600 }}>{st}</span>
                                                    {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.25)' }}>→</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>

                            {/* 05 RESULT */}
                            <motion.div id="cora-result" variants={elementVariants} style={{ maxWidth: '800px', width: '100%' }}>
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>
                                    05 / RESULT
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    The intelligence layer became part of the campaign lifecycle.
                                </h2>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '32px' }}>
                                    Cora resulted in an end-to-end enterprise concept connecting campaign inputs, AI-assisted planning, review, approval, launch and post-launch optimization within one product model.
                                </p>

                                {/* Outcome Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
                                    {[
                                        { num: '01', title: 'Persistent context', desc: 'The campaign remains one connected product object across planning, review and optimization.' },
                                        { num: '02', title: 'Structured human control', desc: 'AI-generated output moves through explicit confirmation and approval states.' },
                                        { num: '03', title: 'Contextual intelligence', desc: 'Recommendations appear where their consequences can be understood.' },
                                        { num: '04', title: 'Closed-loop workflow', desc: 'AI support continues after generation into monitoring and optimization.' }
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
                                            <p style={{ fontSize: '0.94rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Success Metrics Framework */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.015)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    marginBottom: '40px'
                                }}>
                                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                        FUTURE SUCCESS METRICS
                                    </span>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#fff', marginBottom: '16px' }}>
                                        What I would measure in production.
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                        {[
                                            'Time from campaign input to review-ready proposal',
                                            'Number of manual planning steps',
                                            'Proposal revision cycles',
                                            'Approval turnaround time',
                                            'AI recommendation acceptance / modification / rejection',
                                            'Time from performance anomaly to action',
                                            'Campaign setup errors'
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
                                                <span style={{ color: '#8B5CF6', fontSize: '10px' }}>▪</span> {metric}
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
                                        What changed in how I think about AI products.
                                    </h3>
                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
                                        The strongest AI experience wasn't the one that generated the most. It was the one that made responsibility clear. Cora reinforced three principles:
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                                        {[
                                            '01 Ground AI before asking users to trust it.',
                                            '02 Put intelligence inside the workflow rather than beside it.',
                                            '03 Design human control as part of the happy path.'
                                        ].map((principle, idx) => (
                                            <div key={idx} style={{
                                                padding: '16px 20px',
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                color: '#fff',
                                                fontWeight: 500
                                            }}>
                                                {principle}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cs-takeaway" style={{ margin: 0 }}>
                                        <span className="cs-takeaway-label">CLOSING STATEMENT</span>
                                        <p className="cs-takeaway-text">
                                            "Automation is useful when it removes work. Trust appears when users still understand the decision."
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
                            onClick={() => navigateTo('/projects/staple')}
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
                            Next: <span style={{ fontWeight: 500 }}>Staple</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
