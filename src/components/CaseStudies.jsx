import React from 'react';
import { motion } from 'framer-motion';
import { caseStudiesData } from '../data/caseStudies';
import { containerVariants, sectionTitleVariants, cardFadeVariants } from '../animations/variants';

const CaseStudies = () => {
    return (
        <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            <motion.div className="section-title" variants={sectionTitleVariants}>
                <h3>Case Studies</h3>
            </motion.div>
            <div className="case-studies-list">
                {caseStudiesData.map((study) => (
                    <motion.div
                        key={study.id}
                        className="case-study-card"
                        variants={cardFadeVariants}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                        }}
                    >
                        {/* Ambient subtle glow */}
                        <div className="case-study-glow" />

                        <div className="case-study-content">
                            <h4 className="case-study-title">{study.title}</h4>
                            <p className="case-study-desc">{study.subtitle}</p>
                            <div className="case-study-footer">
                                <div className="case-study-tags">
                                    {study.tags.map((tag, i) => (
                                        <span key={i} className="case-study-tag">{tag}</span>
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
        </motion.div>
    );
};

export default React.memo(CaseStudies);
