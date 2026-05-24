import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';

const Projects = () => {
    return (
        <section id="projects">
            <div className="container section-grid">
                <div className="section-title">
                    <h3>Projects</h3>
                </div>
                
                <motion.div 
                    className="projects-grid-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="coming-soon-overlay">
                        <span className="coming-soon-text">Coming Soon</span>
                    </div>
                    
                    <div className="projects-grid">
                        {projectsData.map((project) => (
                            <div
                                key={project.id}
                                className="project-card"
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
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Projects);
