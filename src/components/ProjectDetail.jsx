import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../utils/router';
import { projectsData } from '../data/projects';

export default function ProjectDetail({ project }) {
    // If no project is found, load a default placeholder object
    const p = project || {
        title: "Project Coming Soon",
        category: "Case Study / Future Interface",
        year: "2026",
        role: "Lead Product Designer",
        description: "An immersive deep dive exploring next-generation digital interfaces, cognitive friction, and system-level visual frameworks.",
        tags: ["Future UI", "Cognitive Friction", "System Design"],
        slug: "coming-soon",
        status: "In Progress"
    };

    const [isNextHovered, setIsNextHovered] = useState(false);

    // Calculate loop navigation parameters for Next Project
    const activeSlug = p.slug;
    const currentIndex = projectsData.findIndex(proj => proj.slug === activeSlug);
    const nextIndex = currentIndex !== -1 ? (currentIndex + 1) % projectsData.length : 0;
    const nextProject = projectsData[nextIndex];

    // Soft ease-in-out case-study curves
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
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
                duration: 1.0,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Scroll to top automatically when loading
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [p.slug]);

    return (
        <motion.div
            className="project-detail-layout"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                minHeight: '100vh',
                color: '#fff',
                paddingTop: '100px',
                paddingBottom: '160px',
                position: 'relative',
                zIndex: 10
            }}
        >
            {/* STICKY GLASS HEADER */}
            <motion.header
                variants={headerVariants}
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
                        className="project-detail-back-btn"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.3s ease',
                            padding: 0,
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#fff'}
                        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                    >
                        <span>←</span> Back to Projects
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
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 16px',
                                borderRadius: '100px',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                outline: 'none'
                            }}
                        >
                            Next Project
                            <span
                                style={{
                                    display: 'inline-block',
                                    transform: isNextHovered ? 'translateX(4px)' : 'translateX(0px)',
                                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
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
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
            </motion.header>

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
                    {/* LEFT COLUMN: Metadata */}
                    <motion.div
                        variants={elementVariants}
                        className="project-meta-col"
                        style={{
                            gridColumn: 'span 4',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                            paddingRight: '20px'
                        }}
                    >
                        <div>
                            <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Category</span>
                            <span style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{p.category}</span>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Year</span>
                            <span style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{p.year}</span>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Role</span>
                            <span style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>{p.role}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                            {p.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    style={{
                                        fontSize: '11px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        padding: '4px 10px',
                                        borderRadius: '100px',
                                        color: 'rgba(255, 255, 255, 0.6)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Title & Summary */}
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
                            {p.title}
                        </h1>
                        <p
                            style={{
                                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                lineHeight: 1.5,
                                color: 'rgba(255, 255, 255, 0.65)',
                                maxWidth: '640px',
                                margin: 0
                            }}
                        >
                            {p.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* LARGE COVER IMAGE PLACEHOLDER AREA */}
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
                    {/* Grid pattern overlay inside the cover image area */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                            opacity: 0.8,
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Animated tech ring details inside image area placeholder */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 90, 0]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        style={{
                            width: '180px',
                            height: '180px',
                            border: '1px dashed rgba(255, 255, 255, 0.08)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <div
                            style={{
                                width: '120px',
                                height: '120px',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
                            }}
                        >
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>Visual Area</span>
                        </div>
                        {/* Glowing node point in layout */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-4px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '8px',
                                height: '8px',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #fff'
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* CASE STUDY CONTENTS (PLACEHOLDER EMPTY-STATE) */}
            <div className="container">
                <motion.div
                    variants={elementVariants}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px',
                        padding: '60px 40px',
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Subtle ambient light glow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-30%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '320px',
                            height: '320px',
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Glowing status dot */}
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            marginBottom: '28px'
                        }}
                    >
                        <span className="location-dot-container" style={{ position: 'relative', display: 'inline-block', width: '6px', height: '6px' }}>
                            <span className="location-dot" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '6px', height: '6px', borderRadius: '50%', display: 'block' }}></span>
                            <span className="location-dot-pulse" style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '6px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.7)', animation: 'location-pulse 2s infinite', display: 'block' }}></span>
                        </span>
                        <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>Case Study in Development</span>
                    </div>

                    <h2
                        style={{
                            fontSize: '2rem',
                            fontWeight: 400,
                            marginBottom: '16px',
                            letterSpacing: '-0.02em',
                            color: '#fff'
                        }}
                    >
                        Project Coming Soon
                    </h2>

                    <p
                        style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.5)',
                            maxWidth: '480px',
                            margin: '0 auto 40px auto'
                        }}
                    >
                        This case study is currently in development. Standard sections (Overview, Problem, Research, Process, Decisions, Final Solution, Impact, and Learnings) are being compiled for a detailed editorial breakdown.
                    </p>

                    {/* Back home anchor */}
                    <button
                        onClick={() => navigateTo('/#projects')}
                        className="premium-switch-bg"
                        style={{
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '100px',
                            padding: '12px 30px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#fff',
                            background: 'rgba(255, 255, 255, 0.02)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        Return to Projects
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
