import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { navigateTo } from '../utils/router';

const Projects = () => {
    // Parent container coordinates staggers
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12, // elegant sequential flow
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
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    // Stagger reveal project cards: gentle scale-in + fade, subtle depth deceleration
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.98, // Very subtle scale-in
            y: 20 // 20px–40px range
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1] // Premium smooth deceleration curve
            }
        }
    };

    return (
        <motion.div
            className="container section-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="section-title" variants={titleVariants}>
                <h3>Projects</h3>
            </motion.div>

            <div className="projects-grid-wrapper">
                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={cardVariants}
                            onClick={() => navigateTo(`/projects/${project.slug}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="project-card-header">
                                <span className="project-category">{project.category}</span>
                                {project.status && (
                                    <span className="project-status-badge">{project.status}</span>
                                )}
                            </div>
                            <div className="project-card-body">
                                <h4 className="project-title">{project.title}</h4>
                                <p className="project-desc">{project.description}</p>
                            </div>
                            <div className="project-card-footer">
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                                {project.year && <span className="project-year">{project.year}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(Projects);
