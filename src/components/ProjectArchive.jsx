import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/router';

// Quick utility to convert hex colors to transparent RGBA
const getAccentRgba = (hex, alpha) => {
    if (!hex) return `rgba(255, 255, 255, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function ProjectArchive({ projects }) {
    // Filter active dossier projects
    const dossierProjects = projects.filter(p => p.dossier);

    const [hoveredId, setHoveredId] = useState(null);
    const [activeProjectId, setActiveProjectId] = useState(dossierProjects[0]?.id || null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Responsive screen layout checker
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 767);
            setIsTablet(width > 767 && width <= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeProject = dossierProjects.find(p => p.id === (hoveredId || activeProjectId));
    const isExpanded = hoveredId !== null;

    // ────────────────────────────────────────────────────────────────────────
    // MOBILE VERTICAL ACCORDION VIEW
    // ────────────────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <div className="mobile-archive-container" style={{ width: '100%', padding: '0 4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {dossierProjects.map((project, idx) => {
                        const isProjExpanded = activeProjectId === project.id;
                        const outcomeItem = project.dossier?.find(d => d.step === '06' || d.title === 'OUTCOME');
                        const outcomeText = outcomeItem ? outcomeItem.text : '';

                        return (
                            <div
                                key={project.id}
                                style={{
                                    background: isProjExpanded ? 'rgba(255, 255, 255, 0.025)' : 'rgba(255, 255, 255, 0.015)',
                                    border: isProjExpanded
                                        ? `1px solid ${getAccentRgba(project.accentColor, 0.3)}`
                                        : '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                                    boxShadow: isProjExpanded
                                        ? `0 12px 40px rgba(0, 0, 0, 0.25), 0 0 20px ${getAccentRgba(project.accentColor, 0.06)}`
                                        : '0 4px 16px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                {/* Project Tab Header */}
                                <div
                                    onClick={() => {
                                        setActiveProjectId(isProjExpanded ? null : project.id);
                                    }}
                                    style={{
                                        padding: '22px 24px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <span
                                            style={{
                                                fontFamily: 'Fira Code, monospace',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                color: isProjExpanded ? project.accentColor : 'rgba(255,255,255,0.3)',
                                                transition: 'color 0.3s ease'
                                            }}
                                        >
                                            [0{idx + 1}]
                                        </span>
                                        <div>
                                            <h4
                                                style={{
                                                    fontSize: '17px',
                                                    fontWeight: 600,
                                                    color: isProjExpanded ? '#fff' : 'rgba(255,255,255,0.8)',
                                                    margin: 0,
                                                    letterSpacing: '-0.01em',
                                                    lineHeight: 1.25
                                                }}
                                            >
                                                {project.title}
                                            </h4>
                                            <span style={{
                                                fontSize: '12px',
                                                color: isProjExpanded ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.35)',
                                                marginTop: '3px',
                                                display: 'block'
                                            }}>
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: '12px',
                                        color: isProjExpanded ? project.accentColor : 'rgba(255,255,255,0.25)',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        {isProjExpanded ? '▲' : '▼'}
                                    </span>
                                </div>

                                {/* Project Nested Chapter Accordion */}
                                <AnimatePresence initial={false}>
                                    {isProjExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            style={{
                                                overflow: 'hidden',
                                                background: 'rgba(0, 0, 0, 0.1)',
                                                borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                                            }}
                                        >
                                            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                {project.image && (
                                                    <div style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        borderRadius: '16px',
                                                        overflow: 'hidden',
                                                        border: `1px solid ${getAccentRgba(project.accentColor, 0.12)}`,
                                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                                                    }}>
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                )}

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <span style={{
                                                        fontFamily: 'Fira Code, monospace',
                                                        fontSize: '11px',
                                                        color: project.accentColor,
                                                        fontWeight: 600,
                                                        letterSpacing: '0.08em'
                                                    }}>
                                                        {project.category.toUpperCase()}
                                                    </span>
                                                    <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.45)' }}>
                                                        {project.role} · {project.year}
                                                    </span>
                                                </div>

                                                <p style={{
                                                    fontSize: '14px',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    lineHeight: 1.6,
                                                    margin: 0
                                                }}>
                                                    {project.description}
                                                </p>

                                                {outcomeText && (
                                                    <div style={{
                                                        background: getAccentRgba(project.accentColor, 0.04),
                                                        border: `1px solid ${getAccentRgba(project.accentColor, 0.1)}`,
                                                        borderRadius: '14px',
                                                        padding: '14px 16px',
                                                        fontSize: '13px',
                                                        lineHeight: '1.55',
                                                        color: 'rgba(255, 255, 255, 0.85)'
                                                    }}>
                                                        <span style={{
                                                            fontWeight: 600,
                                                            color: project.accentColor,
                                                            fontSize: '10px',
                                                            letterSpacing: '0.08em',
                                                            display: 'block',
                                                            marginBottom: '6px'
                                                        }}>
                                                            OUTCOME
                                                        </span>
                                                        {outcomeText}
                                                    </div>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        navigateTo(`/projects/${project.slug}`);
                                                    }}
                                                    className="cta-dossier-btn"
                                                    style={{
                                                        alignSelf: 'flex-start',
                                                        background: getAccentRgba(project.accentColor, 0.06),
                                                        border: `1px solid ${getAccentRgba(project.accentColor, 0.15)}`,
                                                        borderRadius: '100px',
                                                        padding: '12px 22px',
                                                        color: '#fff',
                                                        fontSize: '13px',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        transition: 'all 0.35s ease',
                                                        outline: 'none',
                                                        marginTop: '4px'
                                                    }}
                                                >
                                                    View Case Study
                                                    <span className="cta-arrow">→</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ────────────────────────────────────────────────────────────────────────
    // DESKTOP & TABLET — PREMIUM WIDE SHOWCASE VIEW
    // ────────────────────────────────────────────────────────────────────────
    return (
        <div
            className="archive-showcase-container"
            onMouseLeave={() => {
                if (!isTablet) setHoveredId(null);
            }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '28px',
                width: '100%',
                height: '740px',
                alignItems: 'stretch',
                position: 'relative',
                boxSizing: 'border-box'
            }}
        >
            {/* Ambient dynamic glow in the background */}
            {activeProject && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '55%',
                        transform: 'translate(-50%, -50%)',
                        width: '800px',
                        height: '800px',
                        background: `radial-gradient(circle, ${getAccentRgba(activeProject.accentColor, 0.035)} 0%, transparent 65%)`,
                        pointerEvents: 'none',
                        zIndex: 0,
                        transition: 'background 0.6s ease'
                    }}
                />
            )}

            {/* ── LEFT: Project Rows Column ── */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    zIndex: 1,
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                {dossierProjects.map((project, idx) => {
                    const isAnyHovered = hoveredId !== null;
                    const isThisHoveredOrActive = hoveredId === project.id || (!isAnyHovered && activeProjectId === project.id);
                    const opacity = isAnyHovered && hoveredId !== project.id ? 0.35 : 1;

                    return (
                        <motion.div
                            key={project.id}
                            onMouseEnter={() => {
                                if (!isTablet) {
                                    setHoveredId(project.id);
                                    setActiveProjectId(project.id);
                                }
                            }}
                            onClick={() => {
                                if (isTablet) {
                                    if (hoveredId === project.id) {
                                        setHoveredId(null);
                                    } else {
                                        setHoveredId(project.id);
                                        setActiveProjectId(project.id);
                                    }
                                } else {
                                    navigateTo(`/projects/${project.slug}`);
                                }
                            }}
                            animate={{
                                opacity,
                                y: isThisHoveredOrActive ? -2 : 0,
                                scale: isThisHoveredOrActive ? 1.01 : 1,
                                borderColor: isThisHoveredOrActive
                                    ? getAccentRgba(project.accentColor, 0.35)
                                    : 'rgba(255, 255, 255, 0.06)',
                                backgroundColor: isThisHoveredOrActive
                                    ? 'rgba(255, 255, 255, 0.03)'
                                    : 'rgba(255, 255, 255, 0.018)',
                                boxShadow: isThisHoveredOrActive
                                    ? `0 12px 40px rgba(0, 0, 0, 0.25), 0 0 25px ${getAccentRgba(project.accentColor, 0.08)}, inset 0 1px 0 rgba(255, 255, 255, 0.04)`
                                    : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
                            }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                height: '160px',
                                border: '1px solid',
                                borderRadius: '34px',
                                padding: '0 40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                boxSizing: 'border-box',
                                transformOrigin: 'center center'
                            }}
                        >
                            {/* Inner Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flex: 1, minWidth: 0 }}>
                                {/* Accent Line Indicator — 4px × 70px */}
                                <motion.div
                                    animate={{
                                        backgroundColor: isThisHoveredOrActive ? project.accentColor : 'rgba(255, 255, 255, 0.06)',
                                        scaleY: isThisHoveredOrActive ? 1 : 0.4,
                                        boxShadow: isThisHoveredOrActive
                                            ? `0 0 18px ${getAccentRgba(project.accentColor, 0.25)}`
                                            : 'none'
                                    }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        width: '4px',
                                        height: '70px',
                                        borderRadius: '2px',
                                        transformOrigin: 'center',
                                        flexShrink: 0
                                    }}
                                />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <span
                                            style={{
                                                fontFamily: 'Fira Code, monospace',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                color: isThisHoveredOrActive ? project.accentColor : 'rgba(255, 255, 255, 0.25)',
                                                transition: 'color 0.35s ease'
                                            }}
                                        >
                                            [0{idx + 1}]
                                        </span>
                                        <h4
                                            style={{
                                                fontSize: '28px',
                                                fontWeight: 600,
                                                color: isThisHoveredOrActive ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                                                margin: 0,
                                                letterSpacing: '-0.025em',
                                                transition: 'color 0.35s ease',
                                                lineHeight: 1.15
                                            }}
                                        >
                                            {project.title}
                                        </h4>
                                    </div>
                                    <span style={{
                                        fontSize: '16px',
                                        color: isThisHoveredOrActive ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.35)',
                                        fontWeight: 400,
                                        letterSpacing: '-0.005em',
                                        transition: 'color 0.35s ease'
                                    }}>
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Status Tag */}
                            {project.status && (
                                <div
                                    style={{
                                        border: isThisHoveredOrActive
                                            ? `1px solid ${getAccentRgba(project.accentColor, 0.4)}`
                                            : '1px solid rgba(255, 255, 255, 0.08)',
                                        background: isThisHoveredOrActive
                                            ? getAccentRgba(project.accentColor, 0.06)
                                            : 'rgba(255, 255, 255, 0.02)',
                                        color: isThisHoveredOrActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.45)',
                                        borderRadius: '100px',
                                        padding: '8px 18px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'all 0.35s ease',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                        letterSpacing: '0.01em'
                                    }}
                                >
                                    {project.status}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* ── RIGHT: Dossier Rail ── */}
            <motion.div
                animate={{
                    width: isExpanded ? (isTablet ? 520 : 680) : 120,
                    borderColor: isExpanded
                        ? getAccentRgba(activeProject.accentColor, 0.22)
                        : 'rgba(255, 255, 255, 0.06)',
                    boxShadow: isExpanded
                        ? `0 16px 48px rgba(0, 0, 0, 0.35), 0 0 30px ${getAccentRgba(activeProject.accentColor, 0.08)}`
                        : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                style={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: '38px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    zIndex: 2,
                    boxSizing: 'border-box',
                    flexShrink: 0
                }}
            >
                {/* ── 1. COLLAPSED VIEW — Folder Spine ── */}
                <motion.div
                    animate={{ opacity: isExpanded ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '32px 0',
                        pointerEvents: isExpanded ? 'none' : 'auto',
                        boxSizing: 'border-box'
                    }}
                >
                    {/* Thumbnail — 56px with 16px radius */}
                    {activeProject?.image && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: `1px solid ${getAccentRgba(activeProject.accentColor, 0.15)}`,
                                    background: 'rgba(0, 0, 0, 0.25)',
                                    boxShadow: `0 6px 20px rgba(0, 0, 0, 0.3), 0 0 12px ${getAccentRgba(activeProject.accentColor, 0.06)}`
                                }}
                            >
                                <img
                                    src={activeProject.image}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Center: Number + Vertical Label */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '14px'
                        }}
                    >
                        {/* Active dossier number — 17px */}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeProject?.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    fontFamily: 'Fira Code, monospace',
                                    fontSize: '17px',
                                    fontWeight: 600,
                                    color: activeProject?.accentColor,
                                    textShadow: `0 0 12px ${getAccentRgba(activeProject?.accentColor, 0.35)}`,
                                    letterSpacing: '0.02em'
                                }}
                            >
                                [0{dossierProjects.indexOf(activeProject) + 1}]
                            </motion.span>
                        </AnimatePresence>

                        {/* Vertical label — 11px, increased contrast */}
                        <span
                            style={{
                                fontFamily: 'Fira Code, monospace',
                                fontSize: '11px',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.4)',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            EXPLORE DOSSIER
                        </span>
                    </div>

                    {/* Bottom Accent Indicator — thicker, glowing */}
                    <motion.div
                        key={activeProject?.id}
                        animate={{
                            backgroundColor: activeProject?.accentColor,
                            boxShadow: `0 0 14px ${activeProject?.accentColor}, 0 0 4px ${activeProject?.accentColor}`
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            width: '3px',
                            height: '50px',
                            borderRadius: '2px'
                        }}
                    />
                </motion.div>

                {/* ── 2. EXPANDED VIEW — Showcase Content ── */}
                {activeProject && (
                    <motion.div
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: isExpanded ? 0.06 : 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: isTablet ? '520px' : '680px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '32px',
                            gap: '28px',
                            pointerEvents: isExpanded ? 'auto' : 'none',
                            boxSizing: 'border-box'
                        }}
                    >
                        {/* Image Banner */}
                        <div
                            style={{
                                width: '45%',
                                height: '100%',
                                borderRadius: '22px',
                                overflow: 'hidden',
                                border: `1px solid ${getAccentRgba(activeProject.accentColor, 0.12)}`,
                                position: 'relative',
                                background: 'rgba(0, 0, 0, 0.4)',
                                boxShadow: `0 12px 36px rgba(0, 0, 0, 0.3), 0 0 16px ${getAccentRgba(activeProject.accentColor, 0.05)}`,
                                flexShrink: 0
                            }}
                        >
                            <img
                                src={activeProject.image}
                                alt={activeProject.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>

                        {/* Details Stack */}
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                boxSizing: 'border-box',
                                minWidth: 0
                            }}
                        >
                            {/* Top info */}
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
                                    <span
                                        style={{
                                            fontFamily: 'Fira Code, monospace',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: activeProject.accentColor,
                                            letterSpacing: '0.06em'
                                        }}
                                    >
                                        {activeProject.category.toUpperCase()}
                                    </span>
                                    <span style={{
                                        fontSize: '14px',
                                        color: 'rgba(255, 255, 255, 0.45)',
                                        fontWeight: 400
                                    }}>
                                        {activeProject.role} · {activeProject.year}
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontSize: '26px',
                                        fontWeight: 600,
                                        margin: '0 0 18px 0',
                                        color: '#fff',
                                        letterSpacing: '-0.02em',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {activeProject.title}
                                </h3>

                                <p
                                    style={{
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        margin: 0,
                                        fontWeight: 400
                                    }}
                                >
                                    {activeProject.description}
                                </p>
                            </div>

                            {/* Outcomes & CTA */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                {(() => {
                                    const outcomeItem = activeProject.dossier?.find(d => d.step === '06' || d.title === 'OUTCOME');
                                    if (!outcomeItem) return null;
                                    return (
                                        <div
                                            style={{
                                                background: getAccentRgba(activeProject.accentColor, 0.04),
                                                border: `1px solid ${getAccentRgba(activeProject.accentColor, 0.1)}`,
                                                borderRadius: '16px',
                                                padding: '14px 18px',
                                                fontSize: '14px',
                                                lineHeight: '1.55',
                                                color: 'rgba(255, 255, 255, 0.85)'
                                            }}
                                        >
                                            <span style={{
                                                fontWeight: 600,
                                                color: activeProject.accentColor,
                                                fontSize: '10px',
                                                letterSpacing: '0.08em',
                                                display: 'block',
                                                marginBottom: '6px'
                                            }}>
                                                OUTCOME
                                            </span>
                                            {outcomeItem.text}
                                        </div>
                                    );
                                })()}

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        navigateTo(`/projects/${activeProject.slug}`);
                                    }}
                                    className="cta-dossier-btn"
                                    style={{
                                        alignSelf: 'flex-start',
                                        background: getAccentRgba(activeProject.accentColor, 0.06),
                                        border: `1px solid ${getAccentRgba(activeProject.accentColor, 0.18)}`,
                                        borderRadius: '100px',
                                        padding: '12px 26px',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        transition: 'all 0.35s ease',
                                        outline: 'none',
                                        letterSpacing: '0.01em'
                                    }}
                                >
                                    View Case Study
                                    <span className="cta-arrow" style={{ transition: 'transform 0.35s ease', fontSize: '16px' }}>→</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
