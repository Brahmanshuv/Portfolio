import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { navigateTo } from '../utils/router';

const SelectedWork = () => {
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    // Responsive screen layout checker
    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth <= 900); // 900px tablet breakpoint
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Parent container coordinates staggers
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.09, // Restrained sequencing between 80ms and 120ms
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

    // Progressive card reveals: gentle translateY + fade
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1] // Deceleration ease-out curve
            }
        }
    };

    // Expanding drawer panel slide out transition: 0px to 450px, opacity 0 to 1, ease-out over 700ms
    const drawerVariants = {
        hidden: (isLeftColumn) => ({
            width: 0,
            opacity: 0,
            x: isLeftColumn ? -15 : 15, // Subtle sliding entrance direction
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
            }
        }),
        visible: {
            width: 450, // Optimal balanced drawer column width
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] // Apple/Linear cubic bezier curve
            }
        }
    };

    // Image transitions: scale(1.05)->scale(1), blur(8px)->blur(0), fade 0->1
    const imageVariants = {
        hidden: {
            scale: 1.05,
            filter: 'blur(8px)',
            opacity: 0
        },
        visible: {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.15, // Smooth cascaded entry delay
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Dynamic color-coding class for status badge
    const getStatusClass = (status) => {
        switch (status) {
            case 'Case Study':
                return 'status-case-study';
            case 'Concept':
            case 'Concept Project':
                return 'status-concept';
            case 'Active':
                return 'status-active';
            case 'Coming Soon':
                return 'status-coming-soon';
            default:
                return '';
        }
    };

    return (
        <motion.div
            className="container selected-work-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <div className="work-header-row">
                <motion.div className="section-title" variants={titleVariants} style={{ margin: 0 }}>
                    <h3>Work</h3>
                </motion.div>
                <button
                    className="work-toggle"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'alternative' : 'grid')}
                    aria-label="Switch Work View"
                    style={{ border: 'none', background: 'transparent', padding: 0, outline: 'none' }}
                >
                    <motion.div
                        animate={{
                            backgroundColor: viewMode === 'alternative' ? 'rgba(0, 122, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                            borderColor: viewMode === 'alternative' ? 'rgba(0, 122, 255, 0.16)' : 'rgba(255, 255, 255, 0.06)',
                            boxShadow: viewMode === 'alternative' 
                                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 14px rgba(0, 122, 255, 0.12), 0 0 12px rgba(0, 122, 255, 0.04)'
                                : 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 10px rgba(0, 0, 0, 0.1)'
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
                            justifyContent: viewMode === 'alternative' ? 'flex-end' : 'flex-start'
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

            <div className="view-transition-container" style={{ position: 'relative', width: '100%' }}>
                <div className={`projects-grid-wrapper view-fade-wrapper ${viewMode === 'grid' ? 'show-desktop' : 'hide-desktop'}`}>
                    <div className="projects-grid">
                        {projectsData.map((project, index) => {
                            const isComingSoon = project.status === 'Coming Soon';
                            const isLeftColumn = index % 2 === 0; // Even indices = Left column, Odd indices = Right column
                            const isHovered = hoveredCardId === project.id;
                            const hasPreviewImage = !!project.image;

                            return (
                                <div
                                    key={project.id}
                                    className="project-card-wrapper"
                                    onMouseEnter={() => !isComingSoon && setHoveredCardId(project.id)}
                                    onMouseLeave={() => setHoveredCardId(null)}
                                    style={{ zIndex: isHovered ? 50 : 1 }}
                                >
                                    <motion.div
                                        className={`project-card ${isComingSoon ? 'coming-soon-card' : ''} ${isHovered ? 'card-hovered' : ''}`}
                                        variants={cardVariants}
                                        onClick={isComingSoon ? undefined : () => navigateTo(`/projects/${project.slug}`)}
                                        style={{ cursor: isComingSoon ? 'default' : 'pointer' }}
                                    >
                                        <div className="project-card-header">
                                            <span className="project-category">{project.category}</span>
                                            {project.status && (
                                                <span className={`project-status-badge ${getStatusClass(project.status)}`}>
                                                    {project.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="project-card-body">
                                            <h4 className="project-title">{project.title}</h4>
                                            <p className="project-desc">{project.description}</p>
                                            
                                            {/* Tablet/Mobile fallbacks: inline high-fidelity image display inside card body */}
                                            {isMobileOrTablet && hasPreviewImage && (
                                                <div className="mobile-project-image-reveal">
                                                    <img src={project.image} alt={`${project.title} Preview`} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="project-card-footer">
                                            <div className="project-tags">
                                                {project.tags.slice(0, 4).map((tag, i) => (
                                                    <span key={i} className="project-tag">{tag}</span>
                                                ))}
                                            </div>
                                            {project.year && <span className="project-year">{project.year}</span>}
                                        </div>
                                    </motion.div>

                                    {/* Desktop expanding project drawer panel */}
                                    {!isMobileOrTablet && hasPreviewImage && (
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    custom={isLeftColumn}
                                                    className={`project-preview-drawer ${isLeftColumn ? 'drawer-right' : 'drawer-left'}`}
                                                    variants={drawerVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                >
                                                    <div className="drawer-image-wrap">
                                                        <motion.img 
                                                            src={project.image} 
                                                            alt={`${project.title} Showcase`} 
                                                            className="drawer-image"
                                                            variants={imageVariants}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`work-alternative-wrapper view-fade-wrapper ${viewMode === 'alternative' ? 'show-desktop' : 'hide-desktop'}`}>
                    <div className="work-placeholder-container">
                        <span className="work-placeholder-text">Alternative Work View Coming Soon</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(SelectedWork);
