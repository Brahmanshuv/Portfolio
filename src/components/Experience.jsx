import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import logo6S from '../../assets/6s-logo.png';
import logoInverted from '../../assets/Inverted-Logo.png';
import logoRedtape from '../../assets/red tape logo.png';
import logoAdorn from '../../assets/Adorn abodes logo.png';

const Experience = () => {
    const [isExpandedView, setIsExpandedView] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    // Responsive screen layout checker
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset scroll to top of Experience section on view mode toggle
    useEffect(() => {
        const container = document.getElementById('experience');
        if (container) {
            if (window.lenis) {
                window.lenis.scrollTo(container, { immediate: true });
            } else {
                container.scrollIntoView({ behavior: 'auto' });
            }
        }
    }, [isExpandedView]);

    // Track scroll progress inside the timeline scroll area
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Active progress line scale - smoothly maps 0 to 1 across scroll
    const activeScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const dotX = useTransform(scrollYProgress, [0, 1], ["10%", "90%"]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
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
    }, [scrollYProgress]);

    // Parent orchestrates page transition and stagger children
    const containerVariants = {
        hidden: { 
            opacity: 0, 
            y: 12, 
            filter: "blur(8px)" 
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            opacity: 0,
            y: 12,
            filter: "blur(8px)",
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const pageTransitionVariants = {
        hidden: { 
            opacity: 0, 
            y: 12, 
            filter: "blur(8px)" 
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            opacity: 0,
            y: 12,
            filter: "blur(8px)",
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
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
                ease: [0.215, 0.610, 0.355, 1.000]
            }
        }
    };

    // Progressive card reveals: gentle translateY + fade
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.610, 0.355, 1.000]
            }
        }
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            <AnimatePresence mode="wait">
                {isMobile || isExpandedView ? (
                    <motion.div 
                        key="expanded"
                        variants={containerVariants}
                        initial={isMobile ? false : "hidden"}
                        animate="visible"
                        exit="exit"
                        className="container section-grid experience-vertical-wrapper"
                    >
                        <div className="experience-header-row">
                            <motion.div className="section-title" variants={titleVariants} style={{ margin: 0 }}>
                                <h3>Experience</h3>
                            </motion.div>
                            {!isMobile && (
                                <button
                                    className="experience-toggle"
                                    onClick={() => setIsExpandedView(false)}
                                    aria-label="Switch to Timeline View"
                                    style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none' }}
                                >
                                    <motion.div
                                        animate={{
                                            backgroundColor: 'rgba(0, 122, 255, 0.08)',
                                            borderColor: 'rgba(0, 122, 255, 0.16)',
                                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 14px rgba(0, 122, 255, 0.12), 0 0 12px rgba(0, 122, 255, 0.04)'
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '52px',
                                            height: '28px',
                                            border: '1px solid',
                                            borderRadius: '100px',
                                            padding: '3px',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            backdropFilter: 'blur(8px)',
                                            WebkitBackdropFilter: 'blur(8px)',
                                            outline: 'none',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <motion.div
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                                                borderRadius: '50%',
                                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                            }}
                                        />
                                    </motion.div>
                                </button>
                            )}
                        </div>

                        <div className="experience-list">
                            {/* Role 1 */}
                            <motion.div className="experience-item" variants={cardVariants}>
                                <div className="experience-header">
                                    <span className="exp-number">/01</span>
                                    <h4 className="exp-title">
                                        <span className="role-title">Product Designer</span>
                                        <span className="company-separator"> — </span>
                                        <span className="company-name">6S Marketers</span>
                                    </h4>
                                    <span className="exp-date">2024 — Present</span>
                                </div>
                                <div className="exp-body">
                                    <p className="exp-desc" style={{ marginBottom: '16px' }}>
                                        Designing internal tools, dashboards, and digital experiences that help streamline client management, campaign operations, and business workflows.
                                    </p>
                                    <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '600px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                            <span style={{ color: 'rgba(0, 122, 255, 0.6)', flexShrink: 0 }}>—</span>
                                            <span>Designed an internal management dashboard for handling clients, projects, and service workflows.</span>
                                        </li>
                                        <li style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                            <span style={{ color: 'rgba(0, 122, 255, 0.6)', flexShrink: 0 }}>—</span>
                                            <span>Improved visibility across marketing operations through structured dashboards and reporting interfaces.</span>
                                        </li>
                                        <li style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                            <span style={{ color: 'rgba(0, 122, 255, 0.6)', flexShrink: 0 }}>—</span>
                                            <span>Contributed to the redesign and modernization of the company website.</span>
                                        </li>
                                        <li style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                            <span style={{ color: 'rgba(0, 122, 255, 0.6)', flexShrink: 0 }}>—</span>
                                            <span>Worked closely with business stakeholders to translate operational requirements into usable product experiences.</span>
                                        </li>
                                    </ul>
                                    <div className="exp-expertise">
                                        Dashboard Design • Design Systems • Product Design
                                    </div>
                                </div>
                            </motion.div>

                            {/* Role 2 */}
                            <motion.div className="experience-item" variants={cardVariants}>
                                <div className="experience-header">
                                    <span className="exp-number">/02</span>
                                    <h4 className="exp-title">
                                        <span className="role-title">3D Visualization Intern</span>
                                        <span className="company-separator"> — </span>
                                        <span className="company-name">Inverted Energy</span>
                                    </h4>
                                    <span className="exp-date">2024</span>
                                </div>
                                <div className="exp-body">
                                    <p className="exp-desc">Produced product visualizations and launch assets for energy-focused products and marketing campaigns.</p>
                                    <div className="exp-expertise">
                                        3D Visualization • Product Rendering • Visual Storytelling
                                    </div>
                                </div>
                            </motion.div>

                            {/* Role 3 */}
                            <motion.div className="experience-item" variants={cardVariants}>
                                <div className="experience-header">
                                    <span className="exp-number">/03</span>
                                    <h4 className="exp-title">
                                        <span className="role-title">UI/UX Design Intern</span>
                                        <span className="company-separator"> — </span>
                                        <span className="company-name">Redtape</span>
                                    </h4>
                                    <span className="exp-date">2023</span>
                                </div>
                                <div className="exp-body">
                                    <p className="exp-desc">Supported research and usability-driven improvements across digital product experiences.</p>
                                    <div className="exp-expertise">
                                        Wireframing • Prototyping • Research Synthesis
                                    </div>
                                </div>
                            </motion.div>

                            {/* Role 4 */}
                            <motion.div className="experience-item" variants={cardVariants}>
                                <div className="experience-header">
                                    <span className="exp-number">/04</span>
                                    <h4 className="exp-title">
                                        <span className="role-title">UX Researcher Intern</span>
                                        <span className="company-separator"> — </span>
                                        <span className="company-name">Adorn Abodes</span>
                                    </h4>
                                    <span className="exp-date">2021</span>
                                </div>
                                <div className="exp-body">
                                    <p className="exp-desc">Conducted user interviews and research for interior design experiences, helping understand customer needs, space planning preferences, and design decision-making behavior.</p>
                                    <div className="exp-expertise">
                                        UX Research • User Interviews • Customer Insights
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="timeline"
                        variants={pageTransitionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="timeline-scroll-wrapper"
                    >
                        <div className="timeline-sticky-viewport">
                            <div className="container" style={{ width: '100%', marginBottom: '48px' }}>
                                <div className="experience-header-row">
                                    <div className="section-title" style={{ margin: 0 }}>
                                        <h3>Experience</h3>
                                    </div>
                                    <button
                                        className="experience-toggle"
                                        onClick={() => setIsExpandedView(true)}
                                        aria-label="Switch to List View"
                                        style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none' }}
                                    >
                                        <motion.div
                                            animate={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                                borderColor: 'rgba(255, 255, 255, 0.06)',
                                                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 10px rgba(0, 0, 0, 0.1)'
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '52px',
                                                height: '28px',
                                                border: '1px solid',
                                                borderRadius: '100px',
                                                padding: '3px',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                backdropFilter: 'blur(8px)',
                                                WebkitBackdropFilter: 'blur(8px)',
                                                outline: 'none',
                                                justifyContent: 'flex-start'
                                            }}
                                        >
                                            <motion.div
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                                                    borderRadius: '50%',
                                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                                }}
                                            />
                                        </motion.div>
                                    </button>
                                </div>
                            </div>

                            {/* Centered Floating Timeline Composition — 4-card zig-zag */}
                            <div className="timeline-floating-container">
                                
                                {/* Horizontal Progress Track Line */}
                                <div className="timeline-progress-line-bg" />
                                {/* Smooth scroll progress line */}
                                <motion.div 
                                    style={{ scaleX: activeScaleX }} 
                                    className="timeline-progress-line-active" 
                                />

                                {/* Glowing Progress Dot traveling along the line */}
                                <motion.div 
                                    style={{ left: dotX }}
                                    className="timeline-progress-dot-glowing"
                                />

                                {/* Milestone Dots — 4 nodes */}
                                <div style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
                                    <div className={`timeline-milestone-dot ${activeIndex >= 0 ? 'active' : ''}`} />
                                </div>
                                <div style={{ position: 'absolute', left: '36.66%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
                                    <div className={`timeline-milestone-dot ${activeIndex >= 1 ? 'active' : ''}`} />
                                </div>
                                <div style={{ position: 'absolute', left: '63.33%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
                                    <div className={`timeline-milestone-dot ${activeIndex >= 2 ? 'active' : ''}`} />
                                </div>
                                <div style={{ position: 'absolute', left: '90%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 12 }}>
                                    <div className={`timeline-milestone-dot ${activeIndex >= 3 ? 'active' : ''}`} />
                                </div>

                                {/* Card 1: Adorn Abodes — Top Left (oldest) */}
                                <div style={{ position: 'absolute', left: '10%', bottom: '58%', transform: 'translateX(-50%)', zIndex: 10 }}>
                                    <motion.div 
                                        animate={{ 
                                            y: [0, -6, 0],
                                            scale: activeIndex === 0 ? 1.05 : 0.95
                                        }}
                                        transition={{ 
                                            y: { duration: 4.2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                                        }}
                                        className={`timeline-floating-card ${activeIndex === 0 ? 'active' : ''}`}
                                    >
                                        <div className="card-logo-row">
                                            <img src={logoAdorn} alt="Adorn Abodes" className="card-logo" />
                                        </div>
                                        <div className="card-info">
                                            <span className="card-company">Adorn Abodes</span>
                                            <span className="card-role">UX Researcher Intern</span>
                                            <span className="card-year">2021</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card 2: Redtape — Bottom Left-Center */}
                                <div style={{ position: 'absolute', left: '36.66%', top: '58%', transform: 'translateX(-50%)', zIndex: 10 }}>
                                    <motion.div 
                                        animate={{ 
                                            y: [0, 6, 0],
                                            scale: activeIndex === 1 ? 1.05 : 0.95
                                        }}
                                        transition={{ 
                                            y: { duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                                        }}
                                        className={`timeline-floating-card ${activeIndex === 1 ? 'active' : ''}`}
                                    >
                                        <div className="card-logo-row">
                                            <img src={logoRedtape} alt="Redtape" className="card-logo" />
                                        </div>
                                        <div className="card-info">
                                            <span className="card-company">Redtape</span>
                                            <span className="card-role">UI/UX Design Intern</span>
                                            <span className="card-year">2023</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card 3: Inverted Energy — Top Right-Center */}
                                <div style={{ position: 'absolute', left: '63.33%', bottom: '58%', transform: 'translateX(-50%)', zIndex: 10 }}>
                                    <motion.div 
                                        animate={{ 
                                            y: [0, -6, 0],
                                            scale: activeIndex === 2 ? 1.05 : 0.95
                                        }}
                                        transition={{ 
                                            y: { duration: 5.0, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                                        }}
                                        className={`timeline-floating-card ${activeIndex === 2 ? 'active' : ''}`}
                                    >
                                        <div className="card-logo-row">
                                            <img src={logoInverted} alt="Inverted Energy" className="card-logo" />
                                        </div>
                                        <div className="card-info">
                                            <span className="card-company">Inverted Energy</span>
                                            <span className="card-role">3D Visualization Intern</span>
                                            <span className="card-year">2024</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card 4: 6S Marketers — Bottom Right (current) */}
                                <div style={{ position: 'absolute', left: '90%', top: '58%', transform: 'translateX(-50%)', zIndex: 10 }}>
                                    <motion.div 
                                        animate={{ 
                                            y: [0, 6, 0],
                                            scale: activeIndex === 3 ? 1.05 : 0.95
                                        }}
                                        transition={{ 
                                            y: { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" },
                                            scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                                        }}
                                        className={`timeline-floating-card current-role ${activeIndex === 3 ? 'active' : ''}`}
                                    >
                                        <div className="card-logo-row">
                                            <img src={logo6S} alt="6S Marketers" className="card-logo" />
                                        </div>
                                        <div className="card-info">
                                            <span className="card-company">6S Marketers</span>
                                            <span className="card-role">Product Designer</span>
                                            <span className="card-year">2024 — Present</span>
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default React.memo(Experience);
