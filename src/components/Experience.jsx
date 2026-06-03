import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    // Parent orchestrates stagger children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12, // Cinematic stagger interval between 100ms-150ms
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
                ease: [0.215, 0.610, 0.355, 1.000] // Premium cubic deceleration
            }
        }
    };

    // Progressive timeline cards reveal (opacity + soft translateY to avoid dramatic jumps)
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
        <motion.div 
            className="container section-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="section-title" variants={titleVariants}>
                <h3>Experience</h3>
            </motion.div>
            <div className="experience-list">

                {/* Role 1 */}
                <motion.div className="experience-item" variants={cardVariants}>
                    <div className="experience-header">
                        <span className="exp-number">/01</span>
                        <h4 className="exp-title">
                            <span className="role-title">UI/UX Designer</span>
                            <span className="company-separator"> — </span>
                            <span className="company-name">Freelance</span>
                        </h4>
                        <span className="exp-date">2024 — Present</span>
                    </div>
                    <div className="exp-body">
                        <p className="exp-desc">Designing end-to-end product experiences across education, sustainability, and consumer-facing products.</p>
                        <div className="exp-expertise">
                            Product Strategy • UX Architecture • Prototyping
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

            </div>
        </motion.div>
    );
};

export default Experience;
