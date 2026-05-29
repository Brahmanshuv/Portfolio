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

    // Parent container coordinates staggers
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.28, // Slower cinematic stagger gaps
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
                ease: [0.22, 1, 0.36, 1] // Soft ease-in-out
            }
        }
    };

    // Slower cinematic reveal of card items (slight scale-in + translateY + soft ease-in-out)
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.98, // Subtle scale-in
            y: 35 // translateY within 20px-40px range
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 1.3, // Slower reveal for dramatic, cinematic weight
                ease: [0.22, 1, 0.36, 1] // Soft case-study ease-in-out curve
            }
        }
    };

    return (
        <motion.div 
            className="container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            <motion.div className="section-title" variants={titleVariants}>
                <h3>Case Studies</h3>
            </motion.div>
            <div className="case-studies-list">
                {caseStudiesData.map((study) => (
                    <motion.div
                        key={study.id}
                        className="case-study-card"
                        variants={cardVariants}
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
        </motion.div>
    );
};

export default React.memo(CaseStudies);
