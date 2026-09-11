<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectArchive from './ProjectArchive';

const SelectedWork = () => {
    // Parent container coordinates staggers
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.09,
                delayChildren: 0.05
            }
        }
    };

    // Smooth section title reveal
    const titleVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1] // Premium deceleration
            }
        }
    };

    return (
        <motion.div
            className="container selected-work-container alternative-active"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <div className="work-header-container">
                <motion.div className="section-title" variants={titleVariants} style={{ margin: 0 }}>
                    <h3>Work</h3>
                </motion.div>
            </div>
=======
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { navigateTo } from '../utils/router';

// Canonical 4 projects preserved with authentic metadata
const CANONICAL_PROJECTS = [
    {
        id: 'dream-holidays',
        indexStr: '01',
        title: 'Dream Holidays',
        slug: 'dream-holidays',
        category: 'Travel / Product Design',
        domain: 'Travel Tech',
        role: 'Lead Product Designer',
        year: '2024',
        accentColor: '#0EA5E9',
        description: 'Transforming a traditional travel agency into a discovery-first digital experience built around easier exploration and qualified enquiries.'
    },
    {
        id: 'cora',
        indexStr: '02',
        title: 'Cora',
        slug: 'cora',
        category: 'Retail Media / AI Concept',
        domain: 'Retail Media · AI',
        role: 'Product Designer',
        year: '2024',
        accentColor: '#8B5CF6',
        description: 'An AI-assisted campaign concept connecting the brief, the proposal, the people reviewing it, and the next decision after launch.'
    },
    {
        id: 'staple',
        indexStr: '03',
        title: 'Staple',
        slug: 'staple',
        category: 'Productivity / Document Workspace',
        domain: 'Document Operations',
        role: 'Product Designer (UI/UX)',
        year: '2024',
        accentColor: '#3B82F6',
        description: 'A unified document workspace designed to reduce fragmented file-management and PDF workflows.'
    },
    {
        id: '6s-seo',
        indexStr: '04',
        title: '6s SEO Tool',
        slug: '6s-marketers-seo-tool',
        category: 'B2B SaaS / SEO Product Design',
        domain: 'SEO Analytics',
        role: 'Lead Product Designer',
        year: '2024',
        accentColor: '#10B981',
        description: 'An SEO intelligence product designed to turn complex search data into clearer, faster decisions.'
    }
];

const SelectedWork = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
>>>>>>> Stashed changes

=======
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { navigateTo } from '../utils/router';

// Canonical 4 projects preserved with authentic metadata
const CANONICAL_PROJECTS = [
    {
        id: 'dream-holidays',
        indexStr: '01',
        title: 'Dream Holidays',
        slug: 'dream-holidays',
        category: 'Travel / Product Design',
        domain: 'Travel Tech',
        role: 'Lead Product Designer',
        year: '2024',
        accentColor: '#0EA5E9',
        description: 'Transforming a traditional travel agency into a discovery-first digital experience built around easier exploration and qualified enquiries.'
    },
    {
        id: 'cora',
        indexStr: '02',
        title: 'Cora',
        slug: 'cora',
        category: 'Retail Media / AI Concept',
        domain: 'Retail Media · AI',
        role: 'Product Designer',
        year: '2024',
        accentColor: '#8B5CF6',
        description: 'An AI-assisted campaign concept connecting the brief, the proposal, the people reviewing it, and the next decision after launch.'
    },
    {
        id: 'staple',
        indexStr: '03',
        title: 'Staple',
        slug: 'staple',
        category: 'Productivity / Document Workspace',
        domain: 'Document Operations',
        role: 'Product Designer (UI/UX)',
        year: '2024',
        accentColor: '#3B82F6',
        description: 'A unified document workspace designed to reduce fragmented file-management and PDF workflows.'
    },
    {
        id: '6s-seo',
        indexStr: '04',
        title: '6s SEO Tool',
        slug: '6s-marketers-seo-tool',
        category: 'B2B SaaS / SEO Product Design',
        domain: 'SEO Analytics',
        role: 'Lead Product Designer',
        year: '2024',
        accentColor: '#10B981',
        description: 'An SEO intelligence product designed to turn complex search data into clearer, faster decisions.'
    }
];

const SelectedWork = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

>>>>>>> Stashed changes
    // Responsive & accessibility checks
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(motionQuery.matches);
        const handleMotionChange = (e) => setIsReducedMotion(e.matches);

        handleResize();
        window.addEventListener('resize', handleResize);
        motionQuery.addEventListener('change', handleMotionChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            motionQuery.removeEventListener('change', handleMotionChange);
        };
    }, []);

    // Framer Motion scroll tracking across viewport-scale section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Derive active project smoothly from scroll progress (25% per project)
    useEffect(() => {
        if (isMobile) return;
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest < 0.25) {
                setActiveIndex(0);
            } else if (latest < 0.50) {
                setActiveIndex(1);
            } else if (latest < 0.75) {
                setActiveIndex(2);
            } else {
                setActiveIndex(3);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, isMobile]);

    const activeProject = CANONICAL_PROJECTS[activeIndex] || CANONICAL_PROJECTS[0];

    // Scroll to section project on click
    const handleProjectClick = (idx) => {
        setActiveIndex(idx);
        if (containerRef.current && !isMobile) {
            const containerTop = containerRef.current.offsetTop;
            const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
            const targetScroll = containerTop + (idx / 3.5) * containerHeight;
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // MOBILE VIEW (<= 768px): Clean unpinned vertical typographic stack
    // ─────────────────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <section id="work" className="home-work-section">
                <div className="home-work-container">
                    <div className="home-work-header">
                        <h2 className="home-work-heading">Work</h2>
                        <span className="home-work-counter">[ 01 — 04 ]</span>
                    </div>

                    <div className="home-work-mobile-list">
                        {CANONICAL_PROJECTS.map((project) => (
                            <article
                                key={project.id}
                                className="home-work-mobile-card"
                                onClick={() => navigateTo(`/projects/${project.slug}`)}
                            >
                                <div className="home-work-mobile-card-top">
                                    <span
                                        className="home-work-mobile-num"
                                        style={{ color: project.accentColor }}
                                    >
                                        [{project.indexStr}]
                                    </span>
                                    <span className="home-work-mobile-domain">{project.domain}</span>
                                </div>

                                <h3 className="home-work-mobile-title">{project.title}</h3>

                                <p className="home-work-mobile-desc">{project.description}</p>

                                <div className="home-work-mobile-meta-row">
                                    <div>
                                        <span className="home-work-meta-label">ROLE</span>
                                        <span className="home-work-meta-value">{project.role}</span>
                                    </div>
                                    <div>
                                        <span className="home-work-meta-label">YEAR</span>
                                        <span className="home-work-meta-value">{project.year}</span>
                                    </div>
                                    <div style={{ alignSelf: 'flex-end' }}>
                                        <span className="home-work-cta-text">
                                            View Case Study <span className="home-work-cta-arrow">→</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DESKTOP: Full-Width Typographic Editorial Project Showcase
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div ref={containerRef} className="home-work-scroll-track">
            <section id="work" className="home-work-section">
                <div className="home-work-container">
                    {/* Header: Left "Work", Right Monospace Counter "[ 01 / 04 ]" */}
                    <div className="home-work-header">
                        <h2 className="home-work-heading">Work</h2>
                        <div className="home-work-counter">
                            <span>[ {activeProject.indexStr} / 04 ]</span>
                        </div>
                    </div>

                    {/* Single Full-Width Continuous Typographic Editorial Stack */}
                    <div className="home-work-stack">
                        {CANONICAL_PROJECTS.map((project, idx) => {
                            const isActive = idx === activeIndex;

                            if (isActive) {
                                return (
                                    <motion.div
                                        key={project.id}
                                        layout={!isReducedMotion}
                                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                        className="home-work-active-row"
                                        onClick={() => navigateTo(`/projects/${project.slug}`)}
                                    >
                                        {/* Top Row: Index + Oversized Title */}
                                        <div className="home-work-active-main">
                                            <span
                                                className="home-work-active-num"
                                                style={{ color: project.accentColor }}
                                            >
                                                [{project.indexStr}]
                                            </span>
                                            <h3 className="home-work-active-title">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Supporting Metadata & CTA Grid spanning width */}
                                        <div className="home-work-active-meta">
                                            <div className="home-work-meta-item">
                                                <span className="home-work-meta-label">ROLE</span>
                                                <span className="home-work-meta-value">{project.role}</span>
                                            </div>
                                            <div className="home-work-meta-item">
                                                <span className="home-work-meta-label">DOMAIN</span>
                                                <span className="home-work-meta-value">{project.domain}</span>
                                            </div>
                                            <div className="home-work-meta-item">
                                                <span className="home-work-meta-label">YEAR</span>
                                                <span className="home-work-meta-value">{project.year}</span>
                                            </div>
                                            <div className="home-work-meta-item home-work-meta-cta">
                                                <span className="home-work-cta-text">
                                                    View Case Study <span className="home-work-cta-arrow">→</span>
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            }

                            // Inactive Large Editorial Project Title Row
                            return (
                                <motion.div
                                    key={project.id}
                                    layout={!isReducedMotion}
                                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                    className="home-work-inactive-row"
                                    onClick={() => handleProjectClick(idx)}
                                >
                                    <div className="home-work-inactive-left">
                                        <span className="home-work-inactive-num">
                                            [{project.indexStr}]
                                        </span>
                                        <h4 className="home-work-inactive-title">
                                            {project.title}
                                        </h4>
                                    </div>
                                    <div className="home-work-inactive-right">
                                        <span className="home-work-inactive-domain">
                                            {project.domain}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default React.memo(SelectedWork);
