import React from 'react';
import { motion } from 'framer-motion';

const CaseStudies = () => {
    const caseStudiesData = [
        {
            id: 1,
            title: "Enterprise Design System",
            subtitle: "Scalable multi-product UI architecture, token systems, and cross-platform consistency workflows.",
            tags: ["Design Tokens", "Component Systems", "Scalability", "Enterprise UX"],
            status: "COMING SOON"
        },
        {
            id: 2,
            title: "AI-Native Product Workflow",
            subtitle: "Exploring AI-assisted interaction systems, automation-driven UX, and human + AI collaboration patterns.",
            tags: ["AI UX", "Automation", "Workflow Systems", "Future Interfaces"],
            status: "COMING SOON"
        }
    ];

    return (
        <section id="casestudies">
            <div className="container">
                <div className="section-title">
                    <h3>Case Studies</h3>
                </div>
                <div className="case-studies-list">
                    {caseStudiesData.map((study) => (
                        <motion.div
                            key={study.id}
                            className="case-study-card"
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                            }}
                            viewport={{ once: true }}
                        >
                            {/* Ambient subtle glow */}
                            <div className="case-study-glow" />
                            
                            <div className="case-study-content">
                                <h4 className="case-study-title">{study.title}</h4>
                                <p className="case-study-desc">{study.subtitle}</p>
                                <div className="case-study-footer">
                                    <div className="case-study-tags">
                                        {study.tags.map((tag, i) => (
                                            <span key={i} className="case-study-tag">{study.id === 1 ? tag : tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="case-study-status-wrap">
                                <span className="case-study-status-text">{study.status}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(CaseStudies);
