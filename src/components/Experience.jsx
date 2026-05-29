import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    // Parent orchestrates stagger children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.18, // Cinematic progressive stagger interval
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

    // Progressive timeline cards reveal (translateY + scale-in + soft ease-in-out)
    const cardVariants = {
        hidden: { opacity: 0, y: 25, scale: 0.985 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1] // Soft case-study ease-in-out curve
            }
        }
    };

    return (
        <motion.div 
            className="container section-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            <motion.div className="section-title" variants={titleVariants}>
                <h3>Experience</h3>
            </motion.div>
            <div className="experience-list">

                {/* Role 1 */}
                <motion.div className="experience-item" variants={cardVariants}>
                    <div className="experience-header">
                        <span className="exp-number">/01</span>
                        <h4 className="exp-title">UI/UX Designer — Freelance</h4>
                        <span className="exp-date">2024 — Present</span>
                    </div>
                    <div className="exp-body">
                        <p className="exp-desc">Designing product interfaces and UX solutions across domains like education, sustainability, and food delivery.</p>
                        <ul className="exp-bullets">
                            <li>Led wireframes to high-fidelity screens</li>
                            <li>User flows, prototypes, basic research synthesis</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Role 2 */}
                <motion.div className="experience-item" variants={cardVariants}>
                    <div className="experience-header">
                        <span className="exp-number">/02</span>
                        <h4 className="exp-title">3D Visualizer Intern — Inverted</h4>
                        <span className="exp-date">2024</span>
                    </div>
                    <div className="exp-body">
                        <p className="exp-desc">Created 20+ assets for a battery product launch, focusing on visual storytelling and brand alignment.</p>
                        <ul className="exp-bullets">
                            <li>Modeled and rendered product visuals</li>
                            <li>Collaborated with marketing for launch assets</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Role 3 */}
                <motion.div className="experience-item" variants={cardVariants}>
                    <div className="experience-header">
                        <span className="exp-number">/03</span>
                        <h4 className="exp-title">UI/UX Design Intern — Redtape</h4>
                        <span className="exp-date">2023</span>
                    </div>
                    <div className="exp-body">
                        <p className="exp-desc">Conducted research and usability testing to improve task completion.</p>
                        <ul className="exp-bullets">
                            <li>Created wireframes and prototypes</li>
                            <li>Reduced support queries through design improvements</li>
                        </ul>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Experience;
