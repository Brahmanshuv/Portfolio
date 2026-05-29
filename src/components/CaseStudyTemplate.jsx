import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../utils/router';
import { projectsData } from '../data/projects';

export default function CaseStudyTemplate({ metadata, content }) {
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);

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

            {/* HERO BLOCK */}
            <div className="container" style={{ marginTop: '40px' }}>
                <div 
                    className="section-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gap: '40px',
                        marginBottom: '60px'
                    }}
                >
                    {/* LEFT COLUMN: Metadata Table */}
                    <motion.div 
                        variants={elementVariants}
                        className="project-meta-col"
                        style={{
                            gridColumn: 'span 4',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                            paddingRight: '20px'
                        }}
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

                    {/* RIGHT COLUMN: Title & Subtitle */}
                    <motion.div 
                        variants={elementVariants}
                        className="project-title-col"
                        style={{
                            gridColumn: 'span 8',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
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
                </div>
            </div>

            {/* LARGE HERO COVER PLACEHOLDER AREA */}
            <div className="container">
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
                        overflow: 'hidden',
                        marginBottom: '80px'
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
            </div>

            {/* EDITORIAL SECTIONS GRID LAYOUT */}
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
                
                {/* SECTION 1: Context */}
                <motion.div variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>01 / {c.context.title}</span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.context.heading}</h2>
                    {c.context.paragraphs.map((p, i) => (
                        <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>{p}</p>
                    ))}
                </motion.div>

                {/* SECTION 2: Why This Project? */}
                <motion.div variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>02 / {c.whyThisProject.title}</span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.whyThisProject.heading}</h2>
                    {c.whyThisProject.paragraphs.map((p, i) => (
                        <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>{p}</p>
                    ))}
                </motion.div>

                {/* SECTION 3: Problem Statement */}
                <motion.div 
                    variants={elementVariants} 
                    style={{ 
                        maxWidth: '800px', 
                        margin: '0 auto', 
                        width: '100%',
                        padding: '40px',
                        background: 'rgba(255, 255, 255, 0.01)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>03 / {c.problemStatement.title}</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.4)', marginBottom: '24px' }}>{c.problemStatement.heading}</h3>
                    <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', lineHeight: 1.4, fontWeight: 300, color: '#fff', margin: 0 }}>
                        "{c.problemStatement.highlight}"
                    </p>
                </motion.div>

                {/* SECTION 4: Understanding The Existing Journey */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>04 / {c.existingJourney.title}</span>
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

                {/* SECTION 5: Design Principles */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>05 / {c.designPrinciples.title}</span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.designPrinciples.heading}</h2>
                    </div>

                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '24px' 
                        }}
                        className="layout-2col-responsive"
                    >
                        {c.designPrinciples.cards.map((card, idx) => (
                            <div 
                                key={idx}
                                style={{
                                    padding: '30px',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '20px',
                                    backdropFilter: 'blur(5px)'
                                }}
                            >
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.3)', display: 'block', marginBottom: '12px' }}>PRINCIPLE 0{idx + 1}</span>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', marginBottom: '12px' }}>{card.title}</h4>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.6)' }}>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SECTION 6: Product Strategy */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>06 / {c.productStrategy.title}</span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.productStrategy.heading}</h2>
                    </div>

                    {/* Paradigm Diagram Panel */}
                    <div 
                        style={{
                            padding: '40px',
                            background: 'rgba(255, 255, 255, 0.01)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '40px',
                            marginBottom: '40px'
                        }}
                        className="paradigm-diagram-responsive"
                    >
                        <div style={{ flex: 1, textAlign: 'right' }} className="paradigm-block">
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.5)', marginBottom: '8px' }}>{c.productStrategy.diagram.from}</h4>
                            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.35)', margin: 0 }}>{c.productStrategy.diagram.fromDesc}</p>
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '24px' }}>➔</div>
                        <div style={{ flex: 1, textAlign: 'left' }} className="paradigm-block">
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>{c.productStrategy.diagram.to}</h4>
                            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>{c.productStrategy.diagram.toDesc}</p>
                        </div>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {c.productStrategy.paragraphs.map((p, i) => (
                            <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>{p}</p>
                        ))}
                    </div>
                </motion.div>

                {/* SECTION 7: Solution */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>07 / {c.solution.title}</span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.solution.heading}</h2>
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

                {/* SECTION 8: Systems Thinking (HIGHLIGHT PANEL) */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
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
                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>08 / {c.systemsThinking.title}</span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '40px', letterSpacing: '-0.02em' }}>{c.systemsThinking.heading}</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                {c.systemsThinking.questions.map((item, idx) => (
                                    <div 
                                        key={idx}
                                        style={{
                                            borderBottom: idx !== c.systemsThinking.questions.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                            paddingBottom: '24px'
                                        }}
                                    >
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>{item.q}</h4>
                                        <p style={{ fontSize: '0.98rem', lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SECTION 9: Visual Direction */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>09 / {c.visualDirection.title}</span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.visualDirection.heading}</h2>
                    </div>

                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(4, 1fr)', 
                            gap: '20px',
                            marginBottom: '40px'
                        }}
                        className="principles-grid-responsive"
                    >
                        {c.visualDirection.points.map((pt, idx) => (
                            <div 
                                key={idx}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px',
                                    padding: '24px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}
                            >
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.3)' }}>0{idx + 1}</span>
                                <h5 style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', margin: '4px 0 0 0' }}>{pt.title}</h5>
                                <p style={{ fontSize: '0.88rem', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>{pt.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Visual direction placeholders */}
                    <div 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px'
                        }}
                        className="layout-2col-responsive"
                    >
                        <div style={{ height: '180px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifycontent: 'center', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>Mood Asset 01</span>
                        </div>
                        <div style={{ height: '180px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifycontent: 'center', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>Mood Asset 02</span>
                        </div>
                    </div>
                </motion.div>

                {/* SECTION 10: What Success Would Look Like */}
                <motion.div variants={elementVariants} style={{ width: '100%' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 40px auto' }}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>10 / {c.successHypotheses.title}</span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.successHypotheses.heading}</h2>
                    </div>

                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(5, 1fr)', 
                            gap: '16px' 
                        }}
                        className="journey-grid-responsive"
                    >
                        {c.successHypotheses.cards.map((card, idx) => (
                            <div 
                                key={idx}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px',
                                    padding: '24px 16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}
                            >
                                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: 'rgba(255, 255, 255, 0.3)' }}>HYPOTHESIS 0{idx + 1}</span>
                                <h5 style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.3 }}>{card.title}</h5>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SECTION 11: Key Learnings */}
                <motion.div variants={elementVariants} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>11 / {c.learnings.title}</span>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '24px', letterSpacing: '-0.02em' }}>{c.learnings.heading}</h2>
                    {c.learnings.paragraphs.map((p, i) => (
                        <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>{p}</p>
                    ))}
                </motion.div>
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
